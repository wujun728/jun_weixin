/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.model
 *
 *    Filename:    Shares.java
 *
 *    Description: TODO(用一句话描述该文件做什么)
 *
 *    Copyright:   Copyright (c) 2001-2014
 *
 *    Company:     fzqblog
 *
 *    @author:     抽离
 *
 *    @version:    1.0.0
 *
 *    Create at:   2016年10月31日 上午10:23:27
 *
 *    Revision:
 *
 *    2016年10月31日 上午10:23:27
 *        - first revision
 *
 *****************************************************************/
package com.qiton.model;

/**
 * @ClassName Shares
 * @Description API股票类
 * @author 抽离
 * @Date 2016年10月31日 上午10:23:27
 * @version 1.0.0
 */
public class Shares {
	
	private String showapiResCode;
	
	private String showapiResError;
	
	private ShowapiResBody showapiResBody;

	/**
	 * @return the showapiResCode
	 */
	public String getShowapiResCode() {
		return showapiResCode;
	}

	/**
	 * @param showapiResCode the showapiResCode to set
	 */
	public void setShowapiResCode(String showapiResCode) {
		this.showapiResCode = showapiResCode;
	}

	/**
	 * @return the showapiResError
	 */
	public String getShowapiResError() {
		return showapiResError;
	}

	/**
	 * @param showapiResError the showapiResError to set
	 */
	public void setShowapiResError(String showapiResError) {
		this.showapiResError = showapiResError;
	}

	/**
	 * @return the showapiResBody
	 */
	public ShowapiResBody getShowapiResBody() {
		return showapiResBody;
	}

	/**
	 * @param showapiResBody the showapiResBody to set
	 */
	public void setShowapiResBody(ShowapiResBody showapiResBody) {
		this.showapiResBody = showapiResBody;
	}

	/* (非 Javadoc)
	 * Description:
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Shares [showapiResCode=" + showapiResCode + ", showapiResError=" + showapiResError + ", showapiResBody="
				+ showapiResBody + "]";
	}


	

	
	
	
	
}
