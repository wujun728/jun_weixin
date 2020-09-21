package com.weixinapi.handler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import com.weixinapi.contract.FieldContract;
import com.weixinapi.message.BaseMessage;
import com.weixinapi.message.ImageMessage;
import com.weixinapi.message.LinkMessage;
import com.weixinapi.message.LocationMessage;
import com.weixinapi.message.MessageHead;
import com.weixinapi.message.TextMessage;
import com.weixinapi.message.VideoMeaasge;
import com.weixinapi.message.VoiceMessage;

public abstract class BaseHandler {
	private InputStream inputStream;
	private OutputStream outputStream;
	
	private static DocumentBuilder documentBuilder;
	
	static{
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		try{
			documentBuilder = factory.newDocumentBuilder();
		}
		catch (ParserConfigurationException e){
			e.printStackTrace();
		}
	}
	
	public void process(InputStream inputStream, OutputStream outputStream)
	{
		this.inputStream = inputStream;
		this.outputStream=outputStream;
		try
		{
			org.w3c.dom.Document document = documentBuilder.parse(inputStream);
			MessageHead messageHead = new MessageHead();
			messageHead.read(document);
			String type = messageHead.getMsgType();
			if (FieldContract.MSG_TYPE_TEXT.equals(type)){
				TextMessage msg = new TextMessage(messageHead);
				msg.read(document);
				onTextMessage(msg);
			} 
			else if (FieldContract.MSG_TYPE_IMAGE.equals(type)){
				ImageMessage msg = new ImageMessage(messageHead);
				msg.read(document);
				onImageMessage(msg);
			} 
			else if (FieldContract.MSG_TYPE_LINK.equals(type)){
				LinkMessage msg = new LinkMessage(messageHead);
				msg.read(document);
				onLinkMessage(msg);
			} 
			else if (FieldContract.MSG_TYPE_LOCATION.equals(type)){
				LocationMessage msg = new LocationMessage(messageHead);
				msg.read(document);
				onLocationMessage(msg);
			} 
			else if (FieldContract.MSG_TYPE_VOICE.equals(type)){
				VoiceMessage msg = new VoiceMessage(messageHead);
				msg.read(document);
				onVoiceMessage(msg);
			} 
			else if (FieldContract.MSG_TYPE_VIDEO.equals(type)){
				VideoMeaasge msg = new VideoMeaasge(messageHead);
				msg.read(document);
				onVideoMeaasge(msg);
			} 
			else{
				onErrorMsg(-1);
			}
		}
		catch (SAXException e){
			e.printStackTrace();
		}
		catch (IOException e){
			e.printStackTrace();
		}
	}

	public void callback(BaseMessage baseMessage){
		Document document = documentBuilder.newDocument();
		baseMessage.write(document);
		try{
			Transformer transformer = TransformerFactory.newInstance().newTransformer();			
			transformer.transform(new DOMSource(document), new StreamResult(new OutputStreamWriter(outputStream, "utf-8")));
		}
		catch (Exception e){
			e.printStackTrace();
		}
	}

	public void close(){
		try{
			if (inputStream != null)
				inputStream.close();
			if (outputStream != null){
				outputStream.flush();
				outputStream.close();
			}
		}
		catch (IOException e){
			e.printStackTrace();
		}
	}

	public abstract void onTextMessage(TextMessage textMessage);

	public abstract void onImageMessage(ImageMessage imageMessage);

	public abstract void onLinkMessage(LinkMessage linkMessage);

	public abstract void onLocationMessage(LocationMessage locationMessage);

	public abstract void onVoiceMessage(VoiceMessage voiceMessage);

	public abstract void onVideoMeaasge(VideoMeaasge videoMeaasge);

	public abstract void onErrorMsg(int i);
}
