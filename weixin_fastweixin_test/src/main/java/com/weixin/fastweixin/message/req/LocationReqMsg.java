package com.weixin.fastweixin.message.req;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public final class LocationReqMsg extends BaseReqMsg {

	private double locationX;
	private double locationY;
	private int scale;
	private String label;

	public LocationReqMsg(double locationX, double locationY, int scale, String label) {
		super();
		this.locationX = locationX;
		this.locationY = locationY;
		this.scale = scale;
		this.label = label;
		setMsgType(ReqType.LOCATION);
	}

	public double getLocationX() {
		return locationX;
	}

	public double getLocationY() {
		return locationY;
	}

	public int getScale() {
		return scale;
	}

	public String getLabel() {
		return label;
	}

	@Override
	public String toString() {
		return "LocationReqMsg [locationX=" + locationX + ", locationY=" + locationY + ", scale=" + scale + ", label=" + label + ", toUserName="
				+ toUserName + ", fromUserName=" + fromUserName + ", createTime=" + createTime + ", msgType=" + msgType + ", msgId=" + msgId + "]";
	}

}
