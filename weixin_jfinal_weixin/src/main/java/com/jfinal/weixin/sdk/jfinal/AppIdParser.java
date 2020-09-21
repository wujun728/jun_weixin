package com.jfinal.weixin.sdk.jfinal;

import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

/**
 * 从请求中解析 标识Key 并导出 appId。
 * 开发者可自行实现此接口，并在 JFinalConfig.configInterceptor 或在 JFinalConfig.afterJFinalStart等位置全局注入。
 *
 * Created by DuLerWeil on 2016/6/29.
 */
public interface AppIdParser {

    String getAppId(Invocation inv);

    String getAppId(Controller ctl);


    /**
     * 默认appId解析器，根据设置的标识Key名称，从请求parameterMap中直接取appId值
     *
     * 默认标识Key名称为"appId"
     */
    class DefaultParameterAppIdParser implements AppIdParser {
        private static final String DEFAULT_APP_ID_KEY = "appId";

        private final String appIdKey;

        public DefaultParameterAppIdParser() {
            this.appIdKey = DEFAULT_APP_ID_KEY;
        }

        public DefaultParameterAppIdParser(String appIdKey) {
            this.appIdKey = appIdKey;
        }

        @Override
        public String getAppId(Invocation inv) {
            return getAppId(inv.getController());
        }

        @Override
        public String getAppId(Controller ctl) {
            return ctl.getPara(appIdKey);
        }
    }
}
