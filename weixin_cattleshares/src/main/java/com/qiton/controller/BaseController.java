/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.controller
 *
 *    Filename:    BaseController.java
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
 *    Create at:   2016年10月20日 下午2:28:48
 *
 *    Revision:
 *
 *    2016年10月20日 下午2:28:48
 *        - first revision
 *
 *****************************************************************/
package com.qiton.controller;

import com.qiton.model.vo.Result;

/**
 * @ClassName BaseController
 * @Description 基础控制层
 * @author 抽离
 * @Date 2016年10月20日 下午2:28:48
 * @version 1.0.0
 */
public class BaseController {


    /**
     * ajax失败
     * @param msg 失败的消息
     * @return {Object}
     */
    public Object renderError(String msg) {
        Result result = new Result();
        result.setMsg(msg);
        return result;
    }

    /**
     * ajax成功
     * @return {Object}
     */
    public Object renderSuccess() {
        Result result = new Result();
        result.setSuccess(true);
        return result;
    }

    /**
     * ajax成功
     * @param msg 消息
     * @return {Object}
     */
    public Object renderSuccess(String msg) {
        Result result = new Result();
        result.setSuccess(true);
        result.setMsg(msg);
        return result;
    }

    /**
     * ajax成功
     * @param obj 成功时的对象
     * @return {Object}
     */
    public Object renderSuccess(Object obj) {
        Result result = new Result();
        result.setSuccess(true);
        result.setObj(obj);
        return result;
    }
    
    /**
     * ajax成功
     * @param obj 成功时的对象
     * @return {Object}
     */
    public Object renderVipSuccess(Object obj) {
        Result result = new Result();
        result.setSuccess(true);
        result.setVip(true);
        result.setObj(obj);
        return result;
    }
    
}
