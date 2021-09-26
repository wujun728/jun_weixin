/*
 * FileName：PasswordUtil.java 
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

import org.apache.commons.codec.binary.Base64;

import java.security.MessageDigest;

public class PasswordUtil {
	public static String encryptPassword(String strPasswd) {
		if (strPasswd == null || strPasswd.equals("")) {
			return "";
		}
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			return Base64.encodeBase64String(md.digest(strPasswd.getBytes()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	public static void main(String[] args) {
		System.out.println(encryptPassword("jeeweixin"));//5RpuDkfdbTs1ctwfT6MurA==
	}
}
