package com.pflm.entity.message;
/**
 * 音频消息
 * @author qinxuewu
 * @version 1.00
 * @time 6/11/2018下午 7:31
 */
public class VoiceMessage extends BaseMessage{
	// 媒体ID  
    private String MediaId;  
    // 语音格式  
    private String Format;  
  
    public String getMediaId() {  
        return MediaId;  
    }  
  
    public void setMediaId(String mediaId) {  
        MediaId = mediaId;  
    }  
  
    public String getFormat() {  
        return Format;  
    }  
  
    public void setFormat(String format) {  
        Format = format;  
    }  
}
