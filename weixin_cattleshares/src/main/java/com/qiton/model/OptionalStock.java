package com.qiton.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.IdType;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 *
 * 
 *
 */
@TableName("optional_stock")
public class OptionalStock implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/**  */
	@TableId(value = "os_id", type = IdType.AUTO)
	private Long osId;

	/** 股票代码 */
	@TableField(value = "os_stockcode")
	private Long osStockcode;

	/** 股票名称 */
	@TableField(value = "os_stockname")
	private String osStockname;

	/** 记录哪个用户选择 */
	@TableField(value = "os_userId")
	private Long osUserid;


	public Long getOsId() {
		return this.osId;
	}

	public void setOsId(Long osId) {
		this.osId = osId;
	}

	public Long getOsStockcode() {
		return this.osStockcode;
	}

	public void setOsStockcode(Long osStockcode) {
		this.osStockcode = osStockcode;
	}

	public String getOsStockname() {
		return this.osStockname;
	}

	public void setOsStockname(String osStockname) {
		this.osStockname = osStockname;
	}

	public Long getOsUserid() {
		return this.osUserid;
	}

	public void setOsUserid(Long osUserid) {
		this.osUserid = osUserid;
	}

}
