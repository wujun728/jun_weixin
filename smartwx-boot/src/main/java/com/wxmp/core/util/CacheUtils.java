/*
 * FileName：CacheUtils.java 
 * <p>
 * Copyright (c) 2017-2020, <a href="http://www.webcsn.com">hermit (794890569@qq.com)</a>.
 * <p>
 * Licensed under the GNU General Public License, Version 3 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.gnu.org/licenses/gpl-3.0.html
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
package com.wxmp.core.util;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @author hermit
 * @version 2.0
 * @date 2018-04-17 10:54:58
 */
@Component
public class CacheUtils {

	private static CacheManager cacheManager;

	private static final String WX_CACHE = "wxCache";

	private static final byte[] _lock = new byte[0];

	/**
	 * 获取WX_CACHE缓存
	 * @param key
	 * @return
	 */
	public static Object get(String key) {
		return get(WX_CACHE, key);
	}

	/**
	 * 写入WX_CACHE缓存
	 * @param key
	 * @return
	 */
	public static void put(String key, Object value) {
		put(WX_CACHE, key, value);
	}

	/**
	 * 从WX_CACHE缓存中移除
	 * @param key
	 * @return
	 */
	public static void remove(String key) {
		remove(WX_CACHE, key);
	}

	/**
	 * 获取缓存
	 * @param cacheName
	 * @param key
	 * @return
	 */
	public static Object get(String cacheName, String key) {
		if (null == getCache(cacheName).get(key)) {
			return null;
		}else {
			return getCache(cacheName).get(key).get();
		}
	}

	/**
	 * 写入缓存
	 * @param cacheName
	 * @param key
	 * @param value
	 */
	public static void put(String cacheName, String key, Object value) {
		getCache(cacheName).put(key,value);
	}

	/**
	 * 从缓存中移除
	 * @param cacheName
	 * @param key
	 */
	public static void remove(String cacheName, String key) {
		getCache(cacheName).evict(key);
	}

	/**
	 * 获得一个Cache，没有则创建一个。
	 * @param cacheName
	 * @return
	 */
	private static Cache getCache(String cacheName){
		return cacheManager.getCache(cacheName);
	}

	@Resource
	public void setCacheManager(CacheManager cacheManager) {
		this.cacheManager = cacheManager;
	}
}
