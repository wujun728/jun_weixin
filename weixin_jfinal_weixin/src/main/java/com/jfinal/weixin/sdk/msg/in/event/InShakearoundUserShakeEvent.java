package com.jfinal.weixin.sdk.msg.in.event;

import com.jfinal.weixin.sdk.msg.in.InMsg;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * 来自：http://my.oschina.net/u/1993676/blog/490124
 *
 * 用户进入摇一摇界面，在“周边”页卡下摇一摇时，
 * 微信会把这个事件推送到开发者填写的URL（登录公众平台进入开发者中心设置）。
 * 推送内容包含摇一摇时“周边”页卡展示出来的页面所对应的设备信息，
 * 以及附近最多五个属于该公众账号的设备的信息。
 <pre>
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[fromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1433332012&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[ShakearoundUserShake]]&gt;&lt;/Event&gt;
 &lt;ChosenBeacon&gt;
 &lt;Uuid&gt;&lt;![CDATA[uuid]]&gt;&lt;/Uuid&gt;
 &lt;Major&gt;major&lt;/Major&gt;
 &lt;Minor&gt;minor&lt;/Minor&gt;
 &lt;Distance&gt;0.057&lt;/Distance&gt;
 &lt;/ChosenBeacon&gt;
 &lt;AroundBeacons&gt;
 &lt;AroundBeacon&gt;
 &lt;Uuid&gt;&lt;![CDATA[uuid]]&gt;&lt;/Uuid&gt;
 &lt;Major&gt;major&lt;/Major&gt;
 &lt;Minor&gt;minor&lt;/Minor&gt;
 &lt;Distance&gt;166.816&lt;/Distance&gt;
 &lt;/AroundBeacon&gt;
 &lt;AroundBeacon&gt;
 &lt;Uuid&gt;&lt;![CDATA[uuid]]&gt;&lt;/Uuid&gt;
 &lt;Major&gt;major&lt;/Major&gt;
 &lt;Minor&gt;minor&lt;/Minor&gt;
 &lt;Distance&gt;15.013&lt;/Distance&gt;
 &lt;/AroundBeacon&gt;
 &lt;/AroundBeacons&gt;
 &lt;/xml&gt;
 </pre>
*/
@SuppressWarnings("serial")
public class InShakearoundUserShakeEvent extends InMsg {

    private String event;//事件
    private String uuid;
    private Integer major;
    private Integer minor;
    private Float distance;//设备与用户的距离（浮点数；单位：米）

    private List<AroundBeacon> aroundBeaconList = new ArrayList<AroundBeacon>();

    public InShakearoundUserShakeEvent(String toUserName, String fromUserName, Integer createTime, String msgType) {
        super(toUserName, fromUserName, createTime, msgType);
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Integer getMajor() {
        return major;
    }

    public void setMajor(Integer major) {
        this.major = major;
    }

    public Integer getMinor() {
        return minor;
    }

    public void setMinor(Integer minor) {
        this.minor = minor;
    }

    public Float getDistance() {
        return distance;
    }

    public void setDistance(Float distance) {
        this.distance = distance;
    }

    public List<AroundBeacon> getAroundBeaconList() {
        return aroundBeaconList;
    }

    public void setAroundBeaconList(List<AroundBeacon> aroundBeaconList) {
        this.aroundBeaconList = aroundBeaconList;
    }

    public static class AroundBeacon {
        private String uuid;
        private Integer major;
        private Integer minor;
        private Float distance;//设备与用户的距离（浮点数；单位：米）

        public String getUuid() {
            return uuid;
        }

        public void setUuid(String uuid) {
            this.uuid = uuid;
        }

        public Integer getMajor() {
            return major;
        }

        public void setMajor(Integer major) {
            this.major = major;
        }

        public Integer getMinor() {
            return minor;
        }

        public void setMinor(Integer minor) {
            this.minor = minor;
        }

        public Float getDistance() {
            return distance;
        }

        public void setDistance(Float distance) {
            this.distance = distance;
        }
    }
}
