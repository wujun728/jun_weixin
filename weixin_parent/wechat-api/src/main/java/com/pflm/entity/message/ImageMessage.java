package com.pflm.entity.message;

/**
 * 图片消息
 * @author qinxuewu
 * @version 1.00
 * @time 6/11/2018下午 7:31
 */
public class ImageMessage extends BaseMessage{
	 // 图片链接  
    private String PicUrl;  
  
    public String getPicUrl() {  
        return PicUrl;  
    }  
  
    public void setPicUrl(String picUrl) {  
        PicUrl = picUrl;  
    }  
}
