package com.github.sd4324530.firePusher;

import java.io.Serializable;

/**
 * 推送消息接口
 *
 * @author peiyu
 */
public interface FMessage extends Serializable {
    /**
     * 获取接受者ID
     *
     * @return 接受者ID
     */
    String getTo();

    /**
     * 获取标题
     *
     * @return 标题
     */
    String getTitle();

    /**
     * 获取内容
     *
     * @return 内容
     */
    String getContext();
}
