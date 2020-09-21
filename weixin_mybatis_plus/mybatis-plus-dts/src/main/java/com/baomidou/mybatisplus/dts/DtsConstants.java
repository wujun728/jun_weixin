/*
 * Copyright (c) 2011-2020, baomidou (jobob@qq.com).
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * <p>
 * https://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.baomidou.mybatisplus.dts;

/**
 * <p>
 * 常量类
 * </p>
 *
 * @author hubin
 * @since 2019-04-20
 */
public interface DtsConstants {
    /**
     * 队列配置
     */
    String RABBIT_EXCHANGE = "dts-rmt-exchange";
    String RABBIT_QUEUE = "dts-rmt-queue";
    String RABBIT_ROUTINGKEY = "dts-rmt-routingkey";
    /**
     * 死信队列配置
     */
    String RABBIT_DEADLETTER_EXCHANGE = "dts-rmt-deadletter-exchange";
    String RABBIT_DEADLETTER_QUEUE = "dts-rmt-deadletter-queue";
    String RABBIT_DEADLETTER_ROUTINGKEY = "dts-rmt-deadletter-routingkey";

}
