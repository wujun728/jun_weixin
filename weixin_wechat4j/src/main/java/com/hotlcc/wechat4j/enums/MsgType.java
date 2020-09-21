package com.hotlcc.wechat4j.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 消息类型enum
 *
 * @author Allen
 */
@SuppressWarnings({"unused"})
@AllArgsConstructor
@Getter
public enum MsgType {
    TEXT_MSG(1, "文本消息"),
    IMAGE_MSG(3, "图片消息"),
    VOICE_MSG(34, "语音消息"),
    VERIFY_MSG(37, "验证消息"),
    POSSIBLE_FRIEND_MSG(40, "可能的朋友的消息"),
    SHARE_CARD_MSG(42, "共享名片"),
    VIDEO_CALL_MSG(43, "视频通话消息"),
    ANIMATED_STICKER_MSG(47, "动画表情"),
    LOCATION_MSG(48, "位置消息"),
    SHARE_LINK_MSG(49, "分享链接"),
    VOIP_MSG(50, "VoIP消息"),
    INIT_MSG(51, "初始化消息"),
    VOIP_NOTIFY_MSG(52, "VoIP通知"),
    VOIP_INVITE_MSG(53, "VoIP邀请"),
    VIDEO_MSG(62, "小视频"),
    SYS_NOTICE_MSG(9999, "系统通知"),
    SYSTEM_MSG(10000, "系统消息"),
    WITHDRAW_MSG(10002, "撤回消息");

    private int code;
    private String desc;
}
