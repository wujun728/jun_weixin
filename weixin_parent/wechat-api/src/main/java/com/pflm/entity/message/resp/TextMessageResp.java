package com.pflm.entity.message.resp;
/**
 * 文本消息
 * @author qinxuewu
 * @version 1.00
 * @time 6/11/2018下午 7:31
 */
public class TextMessageResp extends BaseMessageResp {
	 // 回复的消息内容  
    private String Content;  
  
    public String getContent() {  
        return Content;  
    }  
  
    public void setContent(String content) {  
        Content = content;  
    }  
}
