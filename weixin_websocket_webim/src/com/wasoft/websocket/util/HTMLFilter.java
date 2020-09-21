package com.wasoft.websocket.util;

public class HTMLFilter {
    public static String filter(String message) {

        if (message == null)
            return (null);
        
        message = Tool.unescape(message);
        char content[] = new char[message.length()];
        message.getChars(0, message.length(), content, 0);
        StringBuilder result = new StringBuilder(content.length + 50);
        for (int i = 0; i < content.length; i++) {
            switch (content[i]) {
            case '<':
                result.append("&lt;");
                break;
            case '>':
                result.append("&gt;");
                break;
            case '&':
                result.append("&amp;");
                break;
            case '"':
                result.append("&quot;");
                break;
            case 10:
            	result.append("<br>");
            	break;
            default:
                result.append(content[i]);
            }
        }
        return (Tool.escape(result.toString()));

    }
}
