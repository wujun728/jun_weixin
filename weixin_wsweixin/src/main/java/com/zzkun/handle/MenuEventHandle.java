package com.zzkun.handle;

import com.github.sd4324530.fastweixin.handle.EventHandle;
import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.req.MenuEvent;

/**
 * 菜单事件处理类
 * Created by Administrator on 2016/6/20.
 */
public class MenuEventHandle implements EventHandle<MenuEvent> {

    @Override
    public BaseMsg handle(MenuEvent event) {
        return new TextMsg("你好" + event.getFromUserName());
    }

    @Override
    public boolean beforeHandle(MenuEvent event) {
        return true;
    }
}
