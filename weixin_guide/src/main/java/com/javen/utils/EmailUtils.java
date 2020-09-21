package com.javen.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

import org.apache.commons.lang3.ArrayUtils;

import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.jfinal.kit.StrKit;
import com.jfinal.log.Log;

/**
 *  邮件工具类，处理自定义邮件，附件发送等
 */
public class EmailUtils {

	private static final Log logger = Log.getLog(EmailUtils.class);

	/* 邮箱配置资源 */
	private static final Prop prop = PropKit.use("mail.properties");

	/* 邮箱配置详情 */
	private static final String MAIL_SMTP_AUTH 			= prop.get("mail.smtp.auth");
	private static final String MAIL_HOST 				= prop.get("mail.host");
	private static final String MAIL_TRANSPORT_PROTOCOL = prop.get("mail.transport.protocol");
	private static final String MAIL_SMTP_PORT 			= prop.get("mail.smtp.port");
	private static final String MAIL_AUTH_NAME 			= prop.get("mail.auth.name");
	private static final String MAIL_AUTH_PASSWORD 		= prop.get("mail.auth.password");
	private static final String MAIL_DISPLAY_SENDNAME 	= prop.get("mail.display.sendname");
	private static final String MAIL_DISPLAY_SENDMAIL 	= prop.get("mail.display.sendmail");
	private static final String MAIL_SEND_CHARSET 		= prop.get("mail.send.charset");
	private static final boolean MAIL_IS_DEBUG 			= prop.getBoolean("mail.is.debug", false);

	/* 函数共用字段 */
	private static final Message message = initMessage();

	// 初始化邮箱配置
	private static final Message initMessage() {
		// 基本配置
		Properties props = new Properties();
		props.setProperty("mail.smtp.auth", 			MAIL_SMTP_AUTH);
		props.setProperty("mail.host", 					MAIL_HOST);
		props.setProperty("mail.transport.protocol", 	MAIL_TRANSPORT_PROTOCOL);
		props.setProperty("mail.smtp.port", 			MAIL_SMTP_PORT);
		// error:javax.mail.MessagingException: 501 Syntax: HELO hostname
		props.setProperty("mail.smtp.localhost", 		"127.0.0.1");

		Session session = Session.getInstance(props, new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(MAIL_AUTH_NAME, MAIL_AUTH_PASSWORD);
			}
		});

		// debug模式
		session.setDebug(MAIL_IS_DEBUG);
		Message message = new MimeMessage(session);

		try {
			message.setFrom(new InternetAddress(MimeUtility.encodeText(MAIL_DISPLAY_SENDNAME)+ '<' + MAIL_DISPLAY_SENDMAIL + '>'));
		} catch (AddressException e) {
			logger.error(e.getMessage(), e);
			throw new RuntimeException(e.getMessage());
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage(), e);
			throw new RuntimeException(e.getMessage());
		} catch (MessagingException e) {
			logger.error(e.getMessage(), e);
			throw new RuntimeException(e.getMessage());
		}
		return message;
	}

	/**
	 * 发送邮件
	 * @param data
	 * @throws MessagingException 
	 * @throws IOException 
	 */
	private static void send(MailData mailData) throws MessagingException, IOException {
		// 主题
		message.setSubject(mailData.subject);
		// 对于不含文件
		if (StrKit.isBlank(mailData.attachfile)) {
			message.setContent( mailData.content, "text/html;charset=" + MAIL_SEND_CHARSET );
		} else {
			Multipart part = new MimeMultipart();
			// 文本的内容
			MimeBodyPart txtPart  = new MimeBodyPart(); 
			txtPart.setContent( mailData.content, "text/html;charset=" + MAIL_SEND_CHARSET );
			part.addBodyPart(txtPart);
			// 附件
			MimeBodyPart filePart = new MimeBodyPart();  
			filePart.attachFile( mailData.attachfile );
			part.addBodyPart(filePart);
			message.setContent(part);
		}
		// 发送的用户
		message.setRecipients(Message.RecipientType.TO, toAddress(mailData.to));
		// 抄送的用户
		message.setRecipients(Message.RecipientType.CC, toAddress(mailData.cc));
		Transport.send(message);
	}

	// 解决多线程问题，由于共享的message
	private static Lock lock = new ReentrantLock();

	/**
	 * 邮件发送
	 * @param mailData
	 * @return boolean
	 */
	public static boolean sendMail(MailData mailData) {
		lock.lock();
		try {
			send(mailData);
			return true;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			lock.unlock();
		}
		return false;
	}

	/**
	 * 异步发送mail
	 * @param mailData
	 */
	public static void asynMail(final MailData mailData) {
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					EmailUtils.sendMail(mailData);
				} catch (Exception e) {
					Thread.currentThread().interrupt();
				}
			}
		}).start();
	}

	/**
	 * 将邮件地址转换
	 * @param emails
	 * @return Address[]
	 */
	private static Address[] toAddress(String... emails) {
		if (ArrayUtils.isEmpty(emails)) {
			return null;
		}
		// 过滤非正常的email
		Set<Address> addSet = new HashSet<Address>();
		for (String email : emails) {
			boolean result = RegexUtils.match(RegexUtils.EMAIL, email);
			if (!result) {
				continue;
			}
			try {
				addSet.add(new InternetAddress(email));
			} catch (AddressException e) {
				continue;
			}
		}
		return addSet.toArray(new Address[0]);
	}

	/**
	 * 功能描述: 内部类，用于邮件数据的封装
	 */
	public static class MailData {
		// 发送给
		private String[] to 		= null;
		// 抄送
		private String[] cc 		= null;
		// 主题
		private String subject		= null;
		// 内容
		private String content		= null;
		// 文件，预设一个附件，貌似暂时用不到多附件，多附件稍微改改就好，哈哈哈...
		private String attachfile	= null;

		private MailData() {};
		public static MailData New(){
			return new MailData();
		}

		public MailData to(String... toEmails) {
			this.to = toEmails;
			return this;
		}
		public MailData cc(String... ccEmails) {
			this.cc = ccEmails;
			return this;
		}
		public MailData subject(String subject) {
			this.subject = subject;
			return this;
		}
		public MailData content(String content) {
			this.content = content;
			return this;
		}
		public MailData file(String filePath) {
			this.attachfile = filePath;
			return this;
		}
	}

}
