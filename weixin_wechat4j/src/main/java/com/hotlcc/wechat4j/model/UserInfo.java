package com.hotlcc.wechat4j.model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.annotation.JSONField;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 微信用户信息
 *
 * @author Allen
 */
@Getter
@Setter
public final class UserInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    private UserInfo() {
    }

    @JSONField(name = "Uin")
    private Long uin;
    @JSONField(name = "NickName")
    private String nickName;
    @JSONField(name = "HeadImgUrl")
    private String headImgUrl;
    @JSONField(name = "ContactFlag")
    private Integer contactFlag;
    @JSONField(name = "MemberCount")
    private Integer memberCount;
    @JSONField(name = "MemberList")
    private List<UserInfo> memberList;
    @JSONField(name = "RemarkName")
    private String remarkName;
    @JSONField(name = "HideInputBarFlag")
    private Integer hideInputBarFlag;
    @JSONField(name = "Sex")
    private Integer sex;
    @JSONField(name = "Signature")
    private String signature;
    @JSONField(name = "VerifyFlag")
    private Integer verifyFlag;
    @JSONField(name = "OwnerUin")
    private Long ownerUin;
    @JSONField(name = "PYInitial")
    private String pyInitial;
    @JSONField(name = "PYQuanPin")
    private String pyQuanPin;
    @JSONField(name = "RemarkPYInitial")
    private String remarkPYInitial;
    @JSONField(name = "RemarkPYQuanPin")
    private String remarkPYQuanPin;
    @JSONField(name = "StarFriend")
    private Integer starFriend;
    @JSONField(name = "AppAccountFlag")
    private Integer appAccountFlag;
    @JSONField(name = "Statues")
    private Integer statues;
    @JSONField(name = "AttrStatus")
    private Integer attrStatus;
    @JSONField(name = "Province")
    private String province;
    @JSONField(name = "City")
    private String city;
    @JSONField(name = "Alias")
    private String alias;
    @JSONField(name = "SnsFlag")
    private Integer snsFlag;
    @JSONField(name = "UniFriend")
    private Integer uniFriend;
    @JSONField(name = "DisplayName")
    private String displayName;
    @JSONField(name = "ChatRoomId")
    private Long chatRoomId;
    @JSONField(name = "KeyWord")
    private String keyWord;
    @JSONField(name = "EncryChatRoomId")
    private String encryChatRoomId;
    @JSONField(name = "IsOwner")
    private Integer isOwner;
    @JSONField(name = "UserName")
    private String userName;

    public static UserInfo valueOf(JSONObject info) {
        if (info == null) {
            return null;
        }

        return JSON.toJavaObject(info, UserInfo.class);
    }

    public static List<UserInfo> valueOf(JSONArray infos) {
        if (infos == null) {
            return null;
        }

        List<UserInfo> userList = new ArrayList<>();
        for (int i = 0, len = infos.size(); i < len; i++) {
            JSONObject info = infos.getJSONObject(i);
            userList.add(UserInfo.valueOf(info));
        }
        return userList;
    }
}
