package com.jfinal.weixin.iot.protocol;

import java.nio.ByteBuffer;
import java.nio.charset.Charset;

import com.jfinal.log.Log;
import com.jfinal.weixin.sdk.utils.Charsets;

/**
 * 蓝牙灯泡自定义协议结构解析
 */
public class BlueLight {
	private static final Log log = Log.getLog(BlueLight.class);
	
	/**
	 * <pre>
	 * 包 由包头+包体组成，包头如：
	 * struct BlueDemoHead
	 * {
	 *     unsigned char  m_magicCode[2];
	 *     unsigned short m_version;
	 *     unsigned short m_totalLength;
	 *     unsigned short m_cmdId;  
	 *     unsigned short m_seq;  
	 *     unsigned short m_errorCode;
	 * };
	 * 包体为字符串 utf-8编码
	 * </pre>
	 */

	public static class Head {
		public char magic;// 固定为 0xFECF
		public short version;
		public short length;// 包头+包体总长度
		public short cmdId;// 命令字
		public short seq;// 序列号 resp时为参数 push时为0
		public short errorCode;// 错误代码 0表示成功

		@Override
		public String toString() {
			return "Head [magic=" + magic + ", version=" + version
					+ ", length=" + length + ", cmdId=" + cmdId + ", seq="
					+ seq + ", errorCode=" + errorCode + "]";
		}
	}

	public Head head;
	public String body;

	/**
	 * 构造类型
	 * 
	 * @param cmdId
	 *            命令
	 * @param respText
	 *            包体内容
	 * @param seq
	 *            序列号 响应包同传入参数值；push包为0
	 * @return {BlueLight}
	 */
	public static BlueLight build(CmdId cmdId, String respText, short seq) {
		BlueLight light = new BlueLight();
		light.body = respText;
		light.head = new Head();

		byte[] b = respText == null ? new byte[0] : respText.getBytes(CHARSET);

		light.head.magic = MAGIC;
		light.head.version = 1;
		light.head.length = (short) (HEAD_LENGTH + b.length);
		light.head.cmdId = cmdId.value();
		light.head.seq = seq;
		light.head.errorCode = 0;
		return light;
	}

	/**
	 * 转为二进制
	 * @return {byte[]}
	 */
	public byte[] toBytes() {
		byte[] b = body == null ? new byte[0] : body.getBytes(CHARSET);

		ByteBuffer buf = ByteBuffer.allocate(head.length);
		buf.putChar(head.magic);
		buf.putShort(head.version);
		buf.putShort(head.length);
		buf.putShort(head.cmdId);
		buf.putShort(head.seq);
		buf.putShort(head.errorCode);
		buf.put(b);

		buf.flip();
		return buf.array();
	}

	/**
	 * 二进制转对象
	 * @param reqBytes 二进制
	 * @return {BlueLight}
	 */
	public static BlueLight parse(byte[] reqBytes) {
		ByteBuffer buf = ByteBuffer.wrap(reqBytes);
		char magic = buf.getChar();
		// magic校验
		if (magic != MAGIC) {
			log.error("magic not valid " + magic);
		}

		Head h = new Head();
		h.magic = MAGIC;
		h.version = buf.getShort();
		h.length = buf.getShort();
		h.cmdId = buf.getShort();
		h.seq = buf.getShort();
		h.errorCode = buf.getShort();

		int bodyLen = h.length - HEAD_LENGTH;
		byte[] bodyBytes = new byte[bodyLen];
		buf.get(bodyBytes);
		String b = new String(bodyBytes, CHARSET);

		BlueLight light = new BlueLight();
		light.head = h;
		light.body = b;
		return light;
	}

	// magic code
	private static final char MAGIC = 0xFECF;
	// 包头长度
	private static final short HEAD_LENGTH = 12;
	private static Charset CHARSET = Charsets.UTF_8;

	/**
	 * 命令
	 */
	public static enum CmdId {
		/**
		 * 请求
		 */
		SEND_TEXT_REQ(0x01),
		/**
		 * 响应
		 */
		SEND_TEXT_RESP(0x1001),
		/**
		 * 点灯
		 */
		OPEN_LIGHT_PUSH(0x2001),
		/**
		 * 灭灯
		 */
		CLOSE_LIGHT_PUSH(0x2002);

		private short value;

		private CmdId(int v) {
			this.value = (short) v;
		}

		public short value() {
			return value;
		}
	}

	@Override
	public String toString() {
		return "BlueLight [body=" + body + ", head=" + head + "]";
	}
	
	static char[] bytesToChars(byte[] bytes) {
		char[] cs = new char[bytes.length];
		for (int i = 0; i < bytes.length; i++) {
			cs[i] = (char) bytes[i];
		}
		return cs;
	}
	
	static byte[] charsToBytes(char[] chars) {
		byte[] bs = new byte[chars.length];
		for (int i = 0; i < chars.length; i++) {
			bs[i] = (byte) chars[i];
		}
		return bs;
	}
	
	protected static String bytesToHex(byte[] b) {
		char hexDigit[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
		StringBuilder buf = new StringBuilder();
		for (int j = 0; j < b.length; j++) {
			buf.append(hexDigit[(b[j] >> 4) & 0x0f]);
			buf.append(hexDigit[b[j] & 0x0f]);
		}
		return buf.toString();
	}

}
