package com.wasoft.websocket.mail;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

public class sendMail {

	private MimeMessage mimeMsg; // MIME邮件对象

	private Session session; // 邮件会话对象
	private Properties props; // 系统属性
	private static boolean needAuth = false; // smtp是否需要认证

	private String username = ""; // smtp认证用户名和密码
	private String passWord = "";

	private Multipart mp; // Multipart对象,邮件内容,标题,附件等内容均添加到其中后再生成MimeMessage对象

	/**
	 * 默认构造器，当不提供邮件服务器调用
	 */
	public sendMail() {
		setSmtpHost(Config.hostname);// 假如没有指定邮件服务器,就从getConfig类中获取
		createMimeMessage();
	}
	public sendMail(String smtp) {
		setSmtpHost(smtp);
		createMimeMessage();
	}

	public void setSmtpHost(String hostName) {
		System.out.println("设置系统属性：mail.smtp.host = " + hostName);
		if (props == null)
			props = System.getProperties(); // 获得系统属性对象

		props.put("mail.smtp.host", hostName); // 设置SMTP主机
	}

	public boolean createMimeMessage() {
		try {
			System.out.println("预备获取邮件会话对象！");
			session = Session.getDefaultInstance(props, null); // 获得邮件会话对象
		} catch (Exception e) {
			System.err.println("获取邮件会话对象时发生错误！" + e);
			return false;
		}

		System.out.println("预备创建MIME邮件对象！");
		try {
			mimeMsg = new MimeMessage(session); // 创建MIME邮件对象
			mp = new MimeMultipart();

			return true;
		} catch (Exception e) {
			System.err.println("创建MIME邮件对象失败！" + e);
			return false;
		}
	}

	/**
	 * 设置smtp的身份认证，将结果放入系统属性
	 * 
	 * @param need
	 *            boolean 是否需要进行身份认证
	 */
	public void setNeedAuth(boolean need) {
		System.out.println("设置smtp身份认证：mail.smtp.auth = " + need);
		if (props == null)
			props = System.getProperties();

		if (need) {
			props.put("mail.smtp.auth", "true");
		} else {
			props.put("mail.smtp.auth", "false");
		}
	}

	/**
	 * 设置smtp登录的用户和密码
	 * 
	 * @param name
	 *            String 用户名
	 * @param pass
	 *            String 密码
	 */
	public void setNamePass(String name, String pass) {
		username = name;
		passWord = pass;
	}

	/**
	 * 设置邮件主题
	 * 
	 * @param mailSubject
	 *            String 邮件主题
	 * @return boolean 设置成功，返回true，否则返回false
	 */
	public boolean setSubject(String mailSubject) {
		System.out.println("设置邮件主题！");
		boolean b = false;
		try {
			mimeMsg.setSubject(mailSubject);
			b = true;
		} catch (Exception e) {
			System.err.println("设置邮件主题发生错误！");
			b = false;
		}
		return b;
	}

	/**
	 * 设置邮件正文内容
	 * 
	 * @param mailBody
	 *            String 邮件内容
	 * @return 设置成功返回true，否则返回false
	 */
	public boolean setBody(String mailBody) {
		try {
			BodyPart bp = new MimeBodyPart();
			bp.setContent("" + mailBody, "text/html;charset=GB2312");
			mp.addBodyPart(bp);

			return true;
		} catch (Exception e) {
			System.err.println("设置邮件正文时发生错误！" + e);
			return false;
		}
	}

	/**
	 * 设置邮件附件内容
	 * 
	 * @param filename
	 *            附件的文件名
	 * @return 成功返回true，否则返回false
	 */
	public boolean addFileAffix(String filename) {

		System.out.println("增加邮件附件：" + filename);
		try {
			BodyPart bp = new MimeBodyPart();
			FileDataSource fileds = new FileDataSource(filename);
			bp.setDataHandler(new DataHandler(fileds));
			bp.setFileName(fileds.getName());

			mp.addBodyPart(bp);

			return true;
		} catch (Exception e) {
			System.err.println("增加邮件附件：" + filename + "发生错误！" + e);
			return false;
		}
	}

	/**
	 * 设置发件人
	 * 
	 * @param from
	 *            发件人邮箱地址
	 * @return 设置成功返回ture，否则返回false
	 */
	public boolean setFrom(String from) {
		System.out.println("设置发信人！");
		try {
			mimeMsg.setFrom(new InternetAddress(from)); // 设置发信人
			return true;
		} catch (Exception e) {
			System.out.println("设置发件人邮箱失败");
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * 设置收件人邮箱地址
	 * 
	 * @param to
	 *            收件人邮箱
	 * @return 操作成功返回true，否则返回false
	 */
	public boolean setTo(String to) {
		if (to == null)
			return false;
		try {
			mimeMsg.setRecipients(Message.RecipientType.TO, InternetAddress
					.parse(to));
			return true;
		} catch (Exception e) {
			System.out.println("设置收件人邮箱地址失败。");
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * 转发邮件
	 * 
	 * @param copyto
	 *            转发邮件的收件人地址，可以是多个
	 * @return 转发成功，返回ture，否则返回false
	 */
	public boolean setCopyTo(String copyto) {
		if (copyto == null)
			return false;
		try {
			mimeMsg.setRecipients(Message.RecipientType.CC,
					(Address[]) InternetAddress.parse(copyto));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 发送邮件
	 * 
	 * @return 成功返回ture，否则返回false
	 */
	public boolean sendout() {
		try {
			mimeMsg.setContent(mp);
			mimeMsg.saveChanges();
			System.out.println("正在发送邮件....");

			Session mailSession = Session.getInstance(props, null);
			Transport transport = mailSession.getTransport("smtp");
			transport.connect((String) props.get("mail.smtp.host"), username, passWord);
			transport.sendMessage(mimeMsg, mimeMsg.getRecipients(Message.RecipientType.TO));
			//Transport.send(mimeMsg);

			System.out.println("发送邮件成功！");
			transport.close();

			return true;
		} catch (Exception e) {
			System.err.println("邮件发送失败！" + e);
			return false;
		}
	}	
}
