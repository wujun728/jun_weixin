/*
 * FileName：DESCoder.java 
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
package com.wxmp.core.util.security.coder;

import com.wxmp.core.util.security.SecurityCoder;

import javax.crypto.*;
import javax.crypto.spec.DESKeySpec;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

/**
 * DES安全编码组件
 * 
 * @author ShenHuaJie
 * @version 1.0
 * @since 1.0
 */
public abstract class DESCoder extends SecurityCoder {

	/**
	 * 密钥算法 <br>
	 * Java 6 只支持56bit密钥 <br>
	 * Bouncy Castle 支持64bit密钥
	 */
	public static final String KEY_ALGORITHM = "DES";

	/**
	 * 加密/解密算法 / 工作模式 / 填充方式
	 */
	public static final String CIPHER_ALGORITHM = "DES/ECB/PKCS5PADDING";

	/**
	 * 转换密钥
	 * 
	 * @param key 二进制密钥
	 * @return Key 密钥
	 * @throws InvalidKeyException
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeySpecException
	 * @throws Exception
	 */
	private static Key toKey(byte[] key) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException {
		// 实例化DES密钥材料
		DESKeySpec dks = new DESKeySpec(key);
		// 实例化秘密密钥工厂
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(KEY_ALGORITHM);
		// 生成秘密密钥
		SecretKey secretKey = keyFactory.generateSecret(dks);
		return secretKey;
	}

	/**
	 * 解密
	 * 
	 * @param data 待解密数据
	 * @param key 密钥
	 * @return byte[] 解密数据
	 * @throws InvalidKeySpecException
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeyException
	 * @throws NoSuchPaddingException
	 * @throws BadPaddingException
	 * @throws IllegalBlockSizeException
	 * @throws Exception
	 */
	public static byte[] decrypt(byte[] data, byte[] key) throws InvalidKeyException, NoSuchAlgorithmException,
			InvalidKeySpecException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
		// 还原密钥
		Key k = toKey(key);
		// 实例化
		Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
		// 初始化，设置为解密模式
		cipher.init(Cipher.DECRYPT_MODE, k);
		// 执行操作
		return cipher.doFinal(data);
	}

	/**
	 * 加密
	 * 
	 * @param data 待加密数据
	 * @param key 密钥
	 * @return byte[] 加密数据
	 * @throws NoSuchPaddingException
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeyException
	 * @throws BadPaddingException
	 * @throws IllegalBlockSizeException
	 * @throws InvalidKeySpecException
	 * @throws Exception
	 */
	public static byte[] encrypt(byte[] data, byte[] key) throws NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, IllegalBlockSizeException, BadPaddingException, InvalidKeySpecException {
		// 还原密钥
		Key k = toKey(key);
		// 实例化
		Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
		// 初始化，设置为加密模式
		cipher.init(Cipher.ENCRYPT_MODE, k);
		// 执行操作
		return cipher.doFinal(data);
	}

	/**
	 * 生成密钥 <br>
	 * Java 6 只支持56bit密钥 <br>
	 * Bouncy Castle 支持64bit密钥 <br>
	 * 
	 * @return byte[] 二进制密钥
	 * @throws NoSuchAlgorithmException
	 * @throws Exception
	 */
	public static byte[] initKey() throws NoSuchAlgorithmException {
		/*
		 * 实例化密钥生成器
		 * 
		 * 若要使用64bit密钥注意替换 将下述代码中的KeyGenerator.getInstance(CIPHER_ALGORITHM);
		 * 替换为KeyGenerator.getInstance(CIPHER_ALGORITHM, "BC");
		 */
		KeyGenerator kg = KeyGenerator.getInstance(KEY_ALGORITHM);
		/*
		 * 初始化密钥生成器 若要使用64bit密钥注意替换 将下述代码kg.init(56); 替换为kg.init(64);
		 */
		kg.init(56, new SecureRandom());
		// 生成秘密密钥
		SecretKey secretKey = kg.generateKey();
		// 获得密钥的二进制编码形式
		return secretKey.getEncoded();
	}
}
