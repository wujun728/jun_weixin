package com.github.sd4324530.firePusher.message;

import com.github.sd4324530.firePusher.FMessage;

/**
 * 简单实现的推送消息类
 * @author peiyu
 */
public class SimpleFMessage implements FMessage {

    /**
     * 接收者ID
     */
    private String to;
    /**
     * 标题
     */
    private String title;
    /**
     * 内容
     */
    private String context;

    @Override
    public String getTo() {
        return to;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getContext() {
        return context;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContext(String context) {
        this.context = context;
    }
}
