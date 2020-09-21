/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.controller
 *
 *    Filename:    IndexController.java
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
 *    Create at:   2016年11月8日 上午10:50:51
 *
 *    Revision:
 *
 *    2016年11月8日 上午10:50:51
 *        - first revision
 *
 *****************************************************************/
package com.qiton.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @ClassName IndexController
 * @Description TODO(这里用一句话描述这个类的作用)
 * @author 抽离
 * @Date 2016年11月8日 上午10:50:51
 * @version 1.0.0
 */
@Controller
public class IndexController extends BaseController{

	@RequestMapping("/")
	public String index() {
		return "index";
	}
}
