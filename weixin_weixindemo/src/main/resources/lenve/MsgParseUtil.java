package lenve;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;
import org.xmlpull.v1.XmlSerializer;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * Created by wangsong on 16-7-13.
 */
public class MsgParseUtil {
    public static Map<String, String> reqMsg2Map(HttpServletRequest req) {
        String xml = req2Xml(req);
        if (xml != null) {
            Map<String, String> map = parseXml2Map(xml);
            return map;
        }
        return null;
    }

    public static String map2Xml(Map<String, String> map) {
        StringWriter result = new StringWriter();
        try {
            XmlSerializer serializer = XmlPullParserFactory.newInstance().newSerializer();
            serializer.setOutput(result);
            serializer.startDocument("UTF-8", true);
            serializer.startTag(null, "xml");
            Set<String> keySet = map.keySet();
            Iterator<String> iterator = keySet.iterator();
            while (iterator.hasNext()) {
                String next = iterator.next();
                serializer.startTag(null, next);
                serializer.text(map.get(next));
                serializer.endTag(null, next);
            }
            serializer.endTag(null, "xml");
            serializer.endDocument();
        } catch (XmlPullParserException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result.toString();
    }

    private static Map<String, String> parseXml2Map(String xml) {
        Map<String, String> map = new HashMap<>();
        try {
            XmlPullParserFactory factory = XmlPullParserFactory.newInstance();
            XmlPullParser parser = factory.newPullParser();
            parser.setInput(new StringReader(xml));
            int eventType = parser.getEventType();
            while (eventType != XmlPullParser.END_DOCUMENT) {
                switch (eventType) {
                    case XmlPullParser.START_DOCUMENT:
                        break;
                    case XmlPullParser.START_TAG:
                        String tagName = parser.getName();
                        if ("ToUserName".equals(tagName)) {
                            map.put("ToUserName", parser.nextText());
                        } else if ("FromUserName".equals(tagName)) {
                            map.put("FromUserName", parser.nextText());
                        } else if ("CreateTime".equals(tagName)) {
                            map.put("CreateTime", parser.nextText());
                        } else if ("MsgType".equals(tagName)) {
                            map.put("MsgType", parser.nextText());
                        } else if ("Content".equals(tagName)) {
                            map.put("Content", parser.nextText());
                        } else if ("MsgId".equals(tagName)) {
                            map.put("MsgId", parser.nextText());
                        } else if ("PicUrl".equals(tagName)) {
                            map.put("PicUrl", parser.nextText());
                        } else if ("MediaId".equals(tagName)) {
                            map.put("MediaId", parser.nextText());
                        } else if ("Format".equals(tagName)) {
                            map.put("Format", parser.nextText());
                        } else if ("ThumbMediaId".equals(tagName)) {
                            map.put("ThumbMediaId", parser.nextText());
                        } else if ("Location_X".equals(tagName)) {
                            map.put("Location_X", parser.nextText());
                        } else if ("Location_Y".equals(tagName)) {
                            map.put("Location_Y", parser.nextText());
                        } else if ("Scale".equals(tagName)) {
                            map.put("Scale", parser.nextText());
                        } else if ("Label".equals(tagName)) {
                            map.put("Label", parser.nextText());
                        } else if ("Title".equals(tagName)) {
                            map.put("Title", parser.nextText());
                        } else if ("Description".equals(tagName)) {
                            map.put("Description", parser.nextText());
                        } else if ("Url".equals(tagName)) {
                            map.put("Url", parser.nextText());
                            //语音识别结果
                        } else if ("Recognition".equals(tagName)) {
                            map.put("Recognition", parser.nextText());
                        } else if ("EventKey".equals(tagName)) {
                            map.put("EventKey", parser.nextText());
                        } else if ("Event".equals(tagName)) {
                            map.put("Event", parser.nextText());
                        }
                        break;
                    case XmlPullParser.END_TAG:
                        break;
                }
                eventType = parser.next();
            }
        } catch (XmlPullParserException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }


    /**
     * 将请求传来的req转为String字符串
     *
     * @param req
     * @return
     */
    private static String req2Xml(HttpServletRequest req) {
        StringBuffer result = new StringBuffer();
        BufferedReader br = null;
        try {
            br = new BufferedReader(new InputStreamReader(req.getInputStream()));
            String str;
            while ((str = br.readLine()) != null) {
                result.append(str);
            }
            return result.toString();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

    public static void extFromAndTo(Map<String, String> map) {
        String fromUserName = map.get("FromUserName");
        String toUserName = map.get("ToUserName");
        map.put("FromUserName", toUserName);
        map.put("ToUserName", fromUserName);
    }
}
