package com.hotlcc.wechat4j.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hotlcc.wechat4j.enums.LoginTip;
import com.hotlcc.wechat4j.enums.MediaType;
import com.hotlcc.wechat4j.model.BaseRequest;
import com.hotlcc.wechat4j.model.MediaMessage;
import com.hotlcc.wechat4j.model.WxMessage;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.http.*;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.XML;
import org.stringtemplate.v4.ST;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * web微信接口封装
 *
 * @author Allen
 */
@SuppressWarnings({"Duplicates", "unused"})
@Slf4j
public final class WebWeixinApiUtil {
    private WebWeixinApiUtil() {
    }

    /**
     * 预编译正则匹配
     */
    private static Pattern PATTERN_UUID_1 = Pattern.compile("window.QRLogin.code = (\\d+);");
    private static Pattern PATTERN_UUID_2 = Pattern.compile("window.QRLogin.code = (\\d+); window.QRLogin.uuid = \"(\\S+?)\";");
    private static Pattern PATTERN_REDIRECT_URI_1 = Pattern.compile("window.code=(\\d+);");
    private static Pattern PATTERN_REDIRECT_URI_2 = Pattern.compile("window.code=(\\d+);\\s*window.redirect_uri=\"(\\S+?)\";");
    private static Pattern PATTERN_REDIRECT_URI_3 = Pattern.compile("http(s*)://wx(\\d*)\\.qq\\.com/");

    /**
     * 上传媒体文件分片大小
     */
    private static final int UPLOAD_MEDIA_FILE_CHUNK_SIZE = 524288;

    /**
     * 获取微信uuid
     *
     * @param httpClient http客户端
     * @return 返回数据
     */
    public static JSONObject getWxUuid(HttpClient httpClient) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.uuid_url"))
                    .add("appid", PropertiesUtil.getProperty("webwx.appid"))
                    .add("_", System.currentTimeMillis())
                    .render();

            HttpGet httpGet = new HttpGet(url);
            httpGet.setConfig(RequestConfig.custom().setRedirectsEnabled(false).build());

            HttpResponse response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            Matcher matcher = PATTERN_UUID_1.matcher(res);
            if (!matcher.find()) {
                throw new RuntimeException("返回数据错误");
            }

            String code = matcher.group(1);
            JSONObject result = new JSONObject();
            result.put("code", code);
            if (!"200".equals(code)) {
                result.put("msg", "错误代码(" + code + ")，请确认appid是否有效");
                return result;
            }

            matcher = PATTERN_UUID_2.matcher(res);
            if (!matcher.find()) {
                throw new RuntimeException("没有匹配到uuid");
            }

            String uuid = matcher.group(2);
            result.put("uuid", uuid);
            if (StringUtil.isEmpty(uuid)) {
                throw new RuntimeException("获取的uuid为空");
            }

            return result;
        } catch (Exception e) {
            log.error("获取uuid异常", e);
            return null;
        }
    }

    /**
     * 获取二维码
     *
     * @param httpClient http客户端
     * @param uuid       uuid
     * @return 二维码图片字节数据
     */
    public static byte[] getQR(HttpClient httpClient,
                               String uuid) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.qrcode_url"))
                    .add("uuid", uuid)
                    .render();

            HttpGet httpGet = new HttpGet(url);
            httpGet.setConfig(RequestConfig.custom().setRedirectsEnabled(false).build());

            HttpResponse response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            byte[] data = EntityUtils.toByteArray(entity);
            if (data == null || data.length <= 0) {
                throw new RuntimeException("二维码数据为空");
            }

            return data;
        } catch (Exception e) {
            log.error("获取二维码异常", e);
            return null;
        }
    }

    /**
     * 获取跳转uri（等待扫码认证）
     *
     * @param httpClient http客户端
     * @param tip        登录tip
     * @param uuid       uuid
     * @return 返回数据
     */
    public static JSONObject getRedirectUri(HttpClient httpClient,
                                            LoginTip tip,
                                            String uuid) {
        try {
            long millis = System.currentTimeMillis();
            String url = new ST(PropertiesUtil.getProperty("webwx-url.redirect_uri"))
                    .add("tip", tip.getCode())
                    .add("uuid", uuid)
                    .add("r", millis / 1252L)
                    .add("_", millis)
                    .render();

            HttpGet httpGet = new HttpGet(url);
            httpGet.setConfig(RequestConfig.custom().setRedirectsEnabled(false).build());

            HttpResponse response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            Matcher matcher = PATTERN_REDIRECT_URI_1.matcher(res);
            if (!matcher.find()) {
                throw new RuntimeException("返回数据错误");
            }

            String code = matcher.group(1);
            JSONObject result = new JSONObject();
            result.put("code", code);
            if ("408".equals(code)) {
                result.put("msg", "请扫描二维码");
            } else if ("400".equals(code)) {
                result.put("msg", "二维码失效");
            } else if ("201".equals(code)) {
                result.put("msg", "请在手机上点击确认");
            } else if ("200".equals(code)) {
                matcher = PATTERN_REDIRECT_URI_2.matcher(res);
                if (!matcher.find()) {
                    throw new RuntimeException("没有匹配到跳转uri");
                }
                String redirectUri = matcher.group(2);
                result.put("msg", "手机确认成功");
                result.put("redirectUri", redirectUri);

                matcher = PATTERN_REDIRECT_URI_3.matcher(redirectUri);
                if (!matcher.find()) {
                    throw new RuntimeException("从跳转uri中没有匹配到url版本号");
                }
                String urlVersion = matcher.group(2);
                result.put("urlVersion", urlVersion);
            } else {
                throw new RuntimeException("返回code错误");
            }

            return result;
        } catch (Exception e) {
            log.error("获取跳转uri异常", e);
            return null;
        }
    }

    /**
     * 获取登录认证码
     * 此方法执行后，其它web端微信、pc端都会下线
     *
     * @param httpClient  http客户端
     * @param redirectUri 调整uri
     * @return 返回数据
     */
    public static JSONObject getLoginCode(HttpClient httpClient,
                                          String redirectUri) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.newlogin_url"))
                    .add("redirectUri", redirectUri)
                    .render();

            HttpGet httpGet = new HttpGet(url);
            httpGet.setConfig(RequestConfig.custom().setRedirectsEnabled(false).build());

            HttpResponse response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(XML.toJSONObject(res).toString()).getJSONObject("error");
        } catch (Exception e) {
            log.error("获取登录认证码异常", e);
            return null;
        }
    }

    /**
     * 退出登录
     *
     * @param httpClient  http客户端
     * @param urlVersion  url版本号
     * @param baseRequest BaseRequest
     */
    public static void logout(HttpClient httpClient,
                              String urlVersion,
                              BaseRequest baseRequest) {
        try {
            List<NameValuePair> pairList = new ArrayList<>();
            pairList.add(new BasicNameValuePair("sid", baseRequest.getSid()));
            pairList.add(new BasicNameValuePair("uin", baseRequest.getUin()));

            //分两步进行
            for (int i = 0; i <= 1; i++) {
                String url = new ST(PropertiesUtil.getProperty("webwx-url.logout_url"))
                        .add("urlVersion", urlVersion)
                        .add("type", i)
                        .add("skey", StringUtil.encodeURL(baseRequest.getSkey(), Consts.UTF_8.name()))
                        .render();

                HttpPost httpPost = new HttpPost(url);
                httpPost.setHeader("Content-type", ContentType.APPLICATION_FORM_URLENCODED.toString());

                HttpEntity paramEntity = new UrlEncodedFormEntity(pairList);
                httpPost.setEntity(paramEntity);

                httpClient.execute(httpPost);
            }
        } catch (Exception e) {
            log.error("退出登录异常", e);
        }
    }

    /**
     * push登录
     *
     * @param httpClient http客户端
     * @param urlVersion url版本号
     * @param wxuin      uin
     * @return 返回数据
     */
    public static JSONObject pushLogin(HttpClient httpClient,
                                       String urlVersion,
                                       String wxuin) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.pushlogin_url"))
                    .add("urlVersion", urlVersion)
                    .add("uin", wxuin)
                    .render();

            HttpGet httpGet = new HttpGet(url);
            httpGet.setConfig(RequestConfig.custom().setRedirectsEnabled(false).build());

            HttpResponse response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(res);
        } catch (Exception e) {
            log.error("push登录异常", e);
            return null;
        }
    }

    /**
     * 获取初始化数据
     *
     * @param httpClient  http客户端
     * @param urlVersion  url版本号
     * @param passticket  passticket
     * @param baseRequest BaseRequest
     * @return 返回数据
     */
    public static JSONObject webWeixinInit(HttpClient httpClient,
                                           String urlVersion,
                                           String passticket,
                                           BaseRequest baseRequest) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.webwxinit_url"))
                    .add("urlVersion", urlVersion)
                    .add("pass_ticket", StringUtil.encodeURL(passticket, Consts.UTF_8.name()))
                    .add("r", System.currentTimeMillis() / 1252L)
                    .render();

            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Content-type", ContentType.APPLICATION_JSON.toString());

            JSONObject paramJson = new JSONObject();
            paramJson.put("BaseRequest", baseRequest);
            HttpEntity paramEntity = new StringEntity(paramJson.toJSONString(), Consts.UTF_8);
            httpPost.setEntity(paramEntity);

            HttpResponse response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(res);
        } catch (Exception e) {
            log.error("获取初始化数据异常", e);
            return null;
        }
    }

    /**
     * 开启消息状态通知
     *
     * @param httpClient    http客户端
     * @param urlVersion    url版本号
     * @param passticket    passticket
     * @param baseRequest   BaseRequest
     * @param loginUserName 当前登录账号用户名
     * @return 返回数据
     */
    public static JSONObject statusNotify(HttpClient httpClient,
                                          String urlVersion,
                                          String passticket,
                                          BaseRequest baseRequest,
                                          String loginUserName) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.statusnotify_url"))
                    .add("urlVersion", urlVersion)
                    .add("pass_ticket", StringUtil.encodeURL(passticket, Consts.UTF_8.name()))
                    .render();

            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Content-type", ContentType.APPLICATION_JSON.toString());

            JSONObject paramJson = new JSONObject();
            paramJson.put("BaseRequest", baseRequest);
            paramJson.put("ClientMsgId", System.currentTimeMillis());
            paramJson.put("Code", 3);
            paramJson.put("FromUserName", loginUserName);
            paramJson.put("ToUserName", loginUserName);
            HttpEntity paramEntity = new StringEntity(paramJson.toJSONString(), Consts.UTF_8);
            httpPost.setEntity(paramEntity);

            HttpResponse response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(res);
        } catch (Exception e) {
            log.error("开启消息状态通知异常", e);
            return null;
        }
    }

    /**
     * 服务端状态同步心跳
     *
     * @param httpClient  http客户端
     * @param urlVersion  url版本号
     * @param baseRequest BaseRequest
     * @param syncKeyList SyncKeyList
     * @return 返回数据
     */
    public static JSONObject syncCheck(HttpClient httpClient,
                                       String urlVersion,
                                       BaseRequest baseRequest,
                                       JSONArray syncKeyList) {
        try {
            long millis = System.currentTimeMillis();
            String url = new ST(PropertiesUtil.getProperty("webwx-url.synccheck_url"))
                    .add("urlVersion", urlVersion)
                    .add("r", millis)
                    .add("skey", StringUtil.encodeURL(baseRequest.getSkey(), Consts.UTF_8.name()))
                    .add("sid", baseRequest.getSid())
                    .add("uin", baseRequest.getUin())
                    .add("deviceid", WechatUtil.createDeviceID())
                    .add("synckey", StringUtil.encodeURL(WechatUtil.syncKeyListToString(syncKeyList), Consts.UTF_8.name()))
                    .add("_", millis)
                    .render();

            HttpGet httpGet = new HttpGet(url);
            RequestConfig config = RequestConfig.custom()
                    .setRedirectsEnabled(false)
                    .build();
            httpGet.setConfig(config);
            httpGet.addHeader("Connection", "Keep-Alive");

            HttpResponse response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            String regExp = "window.synccheck=\\{retcode:\"(\\d+)\",selector:\"(\\d+)\"}";
            Matcher matcher = Pattern.compile(regExp).matcher(res);
            if (!matcher.find()) {
                throw new RuntimeException("返回数据错误");
            }

            JSONObject result = new JSONObject();
            result.put("retcode", matcher.group(1));
            result.put("selector", matcher.group(2));

            return result;
        } catch (Exception e) {
            log.error("服务端状态同步异常", e);
            return null;
        }
    }

    /**
     * 获取全部联系人列表
     *
     * @param httpClient http客户端
     * @param urlVersion url版本号
     * @param passticket passticket
     * @param skey       skey
     * @return 返回数据
     */
    public static JSONObject getContact(HttpClient httpClient,
                                        String urlVersion,
                                        String passticket,
                                        String skey) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.getcontact_url"))
                    .add("urlVersion", urlVersion)
                    .add("pass_ticket", StringUtil.encodeURL(passticket, Consts.UTF_8.name()))
                    .add("r", System.currentTimeMillis())
                    .add("skey", StringUtil.encodeURL(skey, Consts.UTF_8.name()))
                    .render();

            HttpGet httpGet = new HttpGet(url);
            httpGet.setConfig(RequestConfig.custom().setRedirectsEnabled(false).build());
            HttpResponse response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(res);
        } catch (Exception e) {
            log.error("获取全部联系人列表异常", e);
            return null;
        }
    }

    /**
     * 批量获取指定用户信息
     *
     * @param httpClient       http客户端
     * @param urlVersion       url版本号
     * @param passticket       passticket
     * @param baseRequest      BaseRequest
     * @param batchContactList 联系人列表
     * @return 返回数据
     */
    public static JSONObject batchGetContact(HttpClient httpClient,
                                             String urlVersion,
                                             String passticket,
                                             BaseRequest baseRequest,
                                             JSONArray batchContactList) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.batchgetcontact_url"))
                    .add("urlVersion", urlVersion)
                    .add("pass_ticket", StringUtil.encodeURL(passticket, Consts.UTF_8.name()))
                    .add("r", System.currentTimeMillis())
                    .render();

            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Content-type", ContentType.APPLICATION_JSON.toString());

            JSONObject paramJson = new JSONObject();
            paramJson.put("BaseRequest", baseRequest);
            paramJson.put("Count", batchContactList.size());
            paramJson.put("List", batchContactList);
            HttpEntity paramEntity = new StringEntity(paramJson.toJSONString(), Consts.UTF_8);
            httpPost.setEntity(paramEntity);

            HttpResponse response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(res);
        } catch (Exception e) {
            log.error("批量获取指定联系人信息异常", e);
            return null;
        }
    }

    /**
     * 获取联系人头像
     *
     * @param httpClient http客户端
     * @param urlVersion url版本号
     * @param username   用户名
     * @return 头像图片数据
     */
    public static byte[] getContactHeadImg(HttpClient httpClient,
                                           String urlVersion,
                                           String username) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.webwxgetheadimg_url"))
                    .add("urlVersion", urlVersion)
                    .add("seq", System.currentTimeMillis())
                    .add("username", username)
                    .render();

            HttpGet httpGet = new HttpGet(url);

            HttpResponse response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            byte[] headImgData = EntityUtils.toByteArray(entity);

            return headImgData;
        } catch (Exception e) {
            log.error("获取联系人头像图片异常", e);
            return null;
        }
    }

    /**
     * 从服务端同步新数据
     *
     * @param httpClient  http客户端
     * @param urlVersion  url版本号
     * @param passticket  passticket
     * @param baseRequest BaseRequest
     * @param syncKey     syncKey
     * @return 返回数据
     */
    public static JSONObject webWxSync(HttpClient httpClient,
                                       String urlVersion,
                                       String passticket,
                                       BaseRequest baseRequest,
                                       JSONObject syncKey) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.webwxsync_url"))
                    .add("urlVersion", urlVersion)
                    .add("skey", baseRequest.getSkey())
                    .add("sid", baseRequest.getSid())
                    .add("pass_ticket", StringUtil.encodeURL(passticket, Consts.UTF_8.name()))
                    .render();

            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Content-type", ContentType.APPLICATION_JSON.toString());

            JSONObject paramJson = new JSONObject();
            paramJson.put("BaseRequest", baseRequest);
            paramJson.put("SyncKey", syncKey);
            HttpEntity paramEntity = new StringEntity(paramJson.toJSONString(), Consts.UTF_8);
            httpPost.setEntity(paramEntity);

            HttpResponse response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(res);
        } catch (Exception e) {
            log.error("从服务端同步新数据异常", e);
            return null;
        }
    }

    /**
     * 发送消息
     *
     * @param httpClient  http客户端
     * @param urlVersion  url版本号
     * @param passticket  passticket
     * @param baseRequest BaseRequest
     * @param message     消息
     * @return 返回数据
     */
    public static JSONObject sendMsg(HttpClient httpClient,
                                     String urlVersion,
                                     String passticket,
                                     BaseRequest baseRequest,
                                     WxMessage message) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.webwxsendmsg_url"))
                    .add("urlVersion", urlVersion)
                    .add("pass_ticket", StringUtil.encodeURL(passticket, Consts.UTF_8.name()))
                    .render();

            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Content-type", ContentType.APPLICATION_JSON.toString());

            JSONObject paramJson = new JSONObject();
            paramJson.put("BaseRequest", baseRequest);
            paramJson.put("Msg", message);
            paramJson.put("Scene", 0);
            HttpEntity paramEntity = new StringEntity(paramJson.toJSONString(), Consts.UTF_8);
            httpPost.setEntity(paramEntity);

            HttpResponse response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(res);
        } catch (Exception e) {
            log.error("发送消息异常", e);
            return null;
        }
    }

    /**
     * 上传媒体文件(支持大文件自动分片上传)
     *
     * @param httpClient   http客户端
     * @param urlVersion   url版本号
     * @param passticket   passticket
     * @param baseRequest  BaseRequest
     * @param fromUserName 发送者用户名
     * @param toUserName   接受者用户名
     * @param dataTicket   dataTicket
     * @param mediaData    媒体文件二进制数据
     * @param mediaName    媒体文件名称
     * @param contentType  媒体文件类型
     * @param mediaType    媒体类型
     * @return 返回数据
     */
    public static JSONObject uploadMedia(HttpClient httpClient,
                                         String urlVersion,
                                         String passticket,
                                         BaseRequest baseRequest,
                                         String fromUserName,
                                         String toUserName,
                                         String dataTicket,
                                         byte[] mediaData,
                                         String mediaName,
                                         ContentType contentType,
                                         MediaType mediaType) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.uploadmedia_url"))
                    .add("urlVersion", urlVersion)
                    .render();

            long millis = System.currentTimeMillis();
            int mediaLength = mediaData.length;

            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Content-type", ContentType.MULTIPART_FORM_DATA.toString());

            JSONObject uploadmediarequest = new JSONObject();
            uploadmediarequest.put("UploadType", 2);
            uploadmediarequest.put("BaseRequest", baseRequest);
            uploadmediarequest.put("ClientMediaId", millis);
            uploadmediarequest.put("TotalLen", mediaLength);
            uploadmediarequest.put("StartPos", 0);
            uploadmediarequest.put("DataLen", mediaLength);
            uploadmediarequest.put(MediaType.REQUEST_JSON_KEY, mediaType.getCode());
            uploadmediarequest.put("FromUserName", fromUserName);
            uploadmediarequest.put("ToUserName", toUserName);
            uploadmediarequest.put("FileMd5", DigestUtils.md5Hex(mediaData));

            // 分片数量
            int chunks = new BigDecimal(mediaLength).divide(new BigDecimal(UPLOAD_MEDIA_FILE_CHUNK_SIZE), 0, BigDecimal.ROUND_UP).intValue();

            JSONObject result = null;
            for (int chunk = 0; chunk < chunks; chunk++) {
                int from = chunk * UPLOAD_MEDIA_FILE_CHUNK_SIZE;
                int to = (chunk + 1) * UPLOAD_MEDIA_FILE_CHUNK_SIZE;
                to = Math.min(to, mediaLength);
                byte[] temp = Arrays.copyOfRange(mediaData, from, to);

                HttpEntity paramEntity = MultipartEntityBuilder.create()
                        .setMode(HttpMultipartMode.BROWSER_COMPATIBLE)
                        .addTextBody("chunks", String.valueOf(chunks))
                        .addTextBody("chunk", String.valueOf(chunk))
                        .addTextBody(MediaType.REQUEST_KEY, mediaType.getValue(), ContentType.TEXT_PLAIN)
                        .addTextBody("uploadmediarequest", uploadmediarequest.toJSONString(), ContentType.TEXT_PLAIN)
                        .addTextBody("webwx_data_ticket", dataTicket, ContentType.TEXT_PLAIN)
                        .addTextBody("pass_ticket", passticket, ContentType.TEXT_PLAIN)
                        .addBinaryBody("filename", temp, contentType, mediaName)
                        .build();
                httpPost.setEntity(paramEntity);

                HttpResponse response = httpClient.execute(httpPost);
                int statusCode = response.getStatusLine().getStatusCode();
                if (HttpStatus.SC_OK != statusCode) {
                    throw new RuntimeException("响应失败(" + statusCode + ")");
                }

                HttpEntity entity = response.getEntity();
                String res = EntityUtils.toString(entity, Consts.UTF_8);

                result = JSONObject.parseObject(res);
                if (result == null) {
                    break;
                }

                JSONObject baseResponse = result.getJSONObject("BaseResponse");
                if (baseResponse == null) {
                    break;
                }
                int ret = baseResponse.getIntValue("Ret");
                if (ret != 0) {
                    break;
                }
            }

            return result;
        } catch (Exception e) {
            log.error("上传媒体文件异常", e);
            return null;
        }
    }

    /**
     * 发送图片消息
     *
     * @param httpClient  http客户端
     * @param urlVersion  url版本号
     * @param passticket  passticket
     * @param baseRequest BaseRequest
     * @param message     消息
     * @return 返回数据
     */
    public static JSONObject sendImageMsg(HttpClient httpClient,
                                          String urlVersion,
                                          String passticket,
                                          BaseRequest baseRequest,
                                          MediaMessage message) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.webwxsendmsgimg_url"))
                    .add("urlVersion", urlVersion)
                    .add("pass_ticket", StringUtil.encodeURL(passticket, Consts.UTF_8.name()))
                    .render();

            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Content-type", ContentType.APPLICATION_JSON.toString());

            JSONObject paramJson = new JSONObject();
            paramJson.put("BaseRequest", baseRequest);
            paramJson.put("Msg", message);
            paramJson.put("Scene", 0);
            HttpEntity paramEntity = new StringEntity(paramJson.toJSONString(), Consts.UTF_8);
            httpPost.setEntity(paramEntity);

            HttpResponse response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(res);
        } catch (Exception e) {
            log.error("发送图片消息异常", e);
            return null;
        }
    }

    /**
     * 发送视频消息
     *
     * @param httpClient  http客户端
     * @param urlVersion  url版本号
     * @param baseRequest BaseRequest
     * @param message     消息
     * @return 返回数据
     */
    public static JSONObject sendVideoMsg(HttpClient httpClient,
                                          String urlVersion,
                                          BaseRequest baseRequest,
                                          MediaMessage message) {
        try {
            String url = new ST(PropertiesUtil.getProperty("webwx-url.webwxsendvideomsg_url"))
                    .add("urlVersion", urlVersion)
                    .render();

            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Content-type", ContentType.APPLICATION_JSON.toString());

            JSONObject paramJson = new JSONObject();
            paramJson.put("BaseRequest", baseRequest);
            paramJson.put("Msg", message);
            paramJson.put("Scene", 0);
            HttpEntity paramEntity = new StringEntity(paramJson.toJSONString(), Consts.UTF_8);
            httpPost.setEntity(paramEntity);

            HttpResponse response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();
            if (HttpStatus.SC_OK != statusCode) {
                throw new RuntimeException("响应失败(" + statusCode + ")");
            }

            HttpEntity entity = response.getEntity();
            String res = EntityUtils.toString(entity, Consts.UTF_8);

            return JSONObject.parseObject(res);
        } catch (Exception e) {
            log.error("发送视频消息异常", e);
            return null;
        }
    }
}
