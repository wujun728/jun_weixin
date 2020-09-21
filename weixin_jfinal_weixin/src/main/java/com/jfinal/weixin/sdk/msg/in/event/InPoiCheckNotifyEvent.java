package com.jfinal.weixin.sdk.msg.in.event;

/**
 * 新创建的门店在审核通过后,会以事件形式推送给商户填写的回调 URL(登陆公众平台进 入“开发者中心”设置)
 * 微信服务器在五秒内收不到响应会断掉连接,并且重新发起请求,总共重试三次。
 * 关于重试的消息排重,推荐使用 FromUserName + CreateTime 排重。
 * 假如服务器无法保证在五秒内处理并回复,可以直接回复空串,微信服务器不会对此作任何 处理,并且不会发起重试。
 * <pre>
 * &lt;xml&gt;
 * &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 * &lt;FromUserName&gt;&lt;![CDATA[fromUser]]&gt;&lt;/FromUserName&gt;
 * &lt;CreateTime&gt;1408622107&lt;/CreateTime&gt;
 * &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 * &lt;Event&gt;&lt;![CDATA[poi_check_notify]]&gt;&lt;/Event&gt;
 * &lt;UniqId&gt;&lt;![CDATA[123adb]]&gt;&lt;/UniqId&gt;
 * &lt;PoiId&gt;&lt;![CDATA[123123]]&gt;&lt;/PoiId&gt;
 * &lt;Result&gt;&lt;![CDATA[fail]]&gt;&lt;/Result&gt;
 * &lt;Msg&gt;&lt;![CDATA[xxxxxx]]&gt;&lt;/Msg&gt;
 * &lt;/xml&gt;
 * </pre>
 */
@SuppressWarnings("serial")
public class InPoiCheckNotifyEvent extends EventInMsg {

//    UniqId商户自己内部 ID,即字段中的 sid
//    PoiId 微信的门店 ID,微信内门店唯一标示 ID
//    Result 审核结果,成功 succ 或失败 fail
//    Msg 成功的通知信息,或审核失败的驳回理由

    private String uniqId;
    private String poiId;
    private String result;
    private String msg;

    public InPoiCheckNotifyEvent(String toUserName, String fromUserName, Integer createTime, String event)
    {
        //unas update at 2016-1-29,add event param & extends EventInMsg
        super(toUserName, fromUserName, createTime, event);
    }

    public String getUniqId()
    {
        return uniqId;
    }

    public void setUniqId(String uniqId)
    {
        this.uniqId = uniqId;
    }

    public String getPoiId()
    {
        return poiId;
    }

    public void setPoiId(String poiId)
    {
        this.poiId = poiId;
    }

    public String getResult()
    {
        return result;
    }

    public void setResult(String result)
    {
        this.result = result;
    }

    public String getMsg()
    {
        return msg;
    }

    public void setMsg(String msg)
    {
        this.msg = msg;
    }

}
