package com.pflm.utils;
import java.io.File;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.http.HttpStatus;
public class Test {

    public static final String UPLOAD_IMAGE_MEDIA_URL = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE";// 上传临时多媒体文件
    public static final String UPLOAD_IMAGE_URL = "https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=ACCESS_TOKEN";// 上传永久素材图



    /**
     * 上传临时多媒体文件
     *
     * @param url
     *            访问url
     * @param access_token
     *            access_token
     * @param type
     *            文件类型
     * @param file
     *            文件对象
     * @return
     */
    public static JSONObject uploadImage(String url, String access_token, String type, File file)
    {
        HttpClient client = new HttpClient();
        String uploadurl =url.replaceAll("ACCESS_TOKEN",access_token).replaceAll("TYPE",type);
        PostMethod post = new PostMethod(uploadurl);
        post.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:30.0) Gecko/20100101 Firefox/30.0");
        post.setRequestHeader("Host", "file.api.weixin.qq.com");
        post.setRequestHeader("Connection", "Keep-Alive");
        post.setRequestHeader("Cache-Control", "no-cache");
        try {
            if (file != null && file.exists()) {
                FilePart filepart = new FilePart("media", file, "image/jpeg", "UTF-8");
                Part[] parts = new Part[] { filepart };
                MultipartRequestEntity entity = new MultipartRequestEntity(parts, post.getParams());
                post.setRequestEntity(entity);
                int status = client.executeMethod(post);
                if (status == HttpStatus.SC_OK) {
                    String responseContent = post.getResponseBodyAsString();
                    System.err.println("**********result******"+responseContent);
                    return     JSONObject.parseObject(responseContent);
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return  null;
    }

    public static void main(String[] args) throws Exception {
            String accessToken ="15_PJBtJnXTTqjNf_7StOzQnifx86s1sxbSmKvrbIcYkmB5lV3svpPTHorTYFcwayyevL2PGoiLPzfskmhPZpnBLT9Ra1TgUQSDWgFftW_VtYtKGkmEM1Ns1V-chfza3j_vqpnyv-DxhnUz3zx6QPZjAGALKU";// 获取token在微信接口之一中的方法获取token
            File file = new File("/Users/qinxuewu/Desktop/1111.jpg"); // 获取本地文件
//          uploadImage(UPLOAD_IMAGE_MEDIA_URL, accessToken, "image", file);// 上传文件
            String result=HttpUtil.uploadImage(UPLOAD_IMAGE_URL, accessToken, "image", file);// 上传文件
            System.err.println(result);
    }

}