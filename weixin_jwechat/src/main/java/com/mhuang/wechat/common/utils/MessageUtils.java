package com.mhuang.wechat.common.utils;

import java.io.Writer;
import java.util.AbstractMap;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.NameFilter;
import com.alibaba.fastjson.serializer.SerializeWriter;
import com.mhuang.common.utils.string.StringUtil;
import com.mhuang.wechat.common.consts.WechatConsts;
import com.mhuang.wechat.common.model.message.ArticleResMessage;
import com.mhuang.wechat.common.model.message.OtherResMessage;
import com.mhuang.wechat.common.model.message.TextResMessage;
import com.mhuang.wechat.common.model.message.child.Article;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.converters.Converter;
import com.thoughtworks.xstream.converters.MarshallingContext;
import com.thoughtworks.xstream.converters.UnmarshallingContext;
import com.thoughtworks.xstream.core.util.QuickWriter;
import com.thoughtworks.xstream.io.HierarchicalStreamReader;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.xml.PrettyPrintWriter;
import com.thoughtworks.xstream.io.xml.XppDriver;

import lombok.Getter;
import lombok.Setter;

/**
 * 
 * @Description 消息工具类
 * @author mHuang
 * @date 2015年6月4日 下午5:33:08
 * @version V1.0.0
 */
public class MessageUtils<T> {

	@SuppressWarnings("rawtypes")
	public static void main(String[] args) {
		//////////////////////////////////////////////XML//////////////////////////////////////
		// 响应文本消息测试
		TextResMessage text = new TextResMessage();
		text.setContent("saassa");
		text.setCreateTime(System.currentTimeMillis());
		text.setMsgType("text");
		MessageUtils<TextResMessage> texts = new MessageUtils<TextResMessage>();
		System.out.println("text====" + "\n" + texts.fromObjectToXml(text));
		// 响应图片消息测试
		OtherResMessage image = new OtherResMessage();
		image.setCreateTime(System.currentTimeMillis());
		image.saveImage("11111");
		MessageUtils<OtherResMessage> images = new MessageUtils<OtherResMessage>();
		System.out.println("image====\n" + images.fromObjectToXml(image));
		// 响应语音消息测试
		OtherResMessage voice = new OtherResMessage();
		voice.setCreateTime(System.currentTimeMillis());
		voice.saveVoice("11111");
		MessageUtils<OtherResMessage> voices = new MessageUtils<OtherResMessage>();
		System.out.println("voice====\n" + voices.fromObjectToXml(voice));
		// 响应视频消息测试
		OtherResMessage video = new OtherResMessage();
		video.setCreateTime(System.currentTimeMillis());
		video.saveVideo("11111", "视频", "说明");
		MessageUtils<OtherResMessage> videos = new MessageUtils<OtherResMessage>();
		System.out.println("video====\n" + videos.fromObjectToXml(video));
		// 响应音乐消息测试
		OtherResMessage music = new OtherResMessage();
		music.setCreateTime(System.currentTimeMillis());
		music.saveMusic("音乐", "说明", "音乐url", "高质量音乐链接", "缩略图的媒体id");
		MessageUtils<OtherResMessage> musics = new MessageUtils<OtherResMessage>();
		System.out.println("video====\n" + musics.fromObjectToXml(music));
		// 响应图文消息测试
		ArticleResMessage news = new ArticleResMessage("1111", "2222");
		news.setCreateTime(System.currentTimeMillis());

		news.addArticle("图文1", "11", "111", "111");
		news.addArticle(Article.getArticle("图文2", "descption", "picUrl", "url"));
		MessageUtils<ArticleResMessage> newses = new MessageUtils<ArticleResMessage>();
		System.out.println("news====\n" + newses.fromObjectToXml(news));
		////////////////////////////////JSON//////////////////////////////
		TextResMessage jsonText = new TextResMessage();
		MessageUtils<TextResMessage> jsonTexts = new MessageUtils<TextResMessage>();
		jsonText.saveJSON("111", "222");
		System.out.println(jsonTexts.fromObjectToJson(jsonText));
		System.out.println(images.fromObjectToJson(image));
		System.out.println(voices.fromObjectToJson(voice));
		System.out.println(videos.fromObjectToJson(video));
		System.out.println(musics.fromObjectToJson(music));
		news.addJSONArticle("图文1", "11", "111", "111");
		news.addJSONArticle(Article.getArticle("图文2", "descption", "picUrl", "url"));
		System.out.println(newses.fromObjectToJson(news));
	}

	/**
	 * 对象转JSON
	 * @Description 
	 * @author mHuang
	 * @param obj
	 * @return
	 */
	public String fromObjectToJson(T obj){
		SerializeWriter sw = new SerializeWriter();  
        JSONSerializer serializer = new JSONSerializer(sw);
        
        NameFilter nameFilter = new NameFilter() { //名字重定义
			public String process(Object source, String name, Object value) {
				String msgType = "";
				if(StringUtils.equals(name, WechatConsts.MSGTYPE)){
					msgType = value.toString();
				}else if(StringUtils.equals(name, WechatConsts.OTHERMESSAGE)){
					name = msgType;
				}
				return name;
			}
		};
		serializer.getNameFilters().add(nameFilter);
        serializer.write(obj);
        return sw.toString();
	}
	
	/**
	 * 对象转xml
	 * @Description 
	 * @author mHuang
	 * @param obj
	 * @return
	 */
	public synchronized String fromObjectToXml(T obj) {
		return fromObjectToXml(obj,true);
	}
	
	/**
	 * 对象转XML
	 * @param obj
	 * 		转换对象
	 * @param retUp
	 * 		是否首字母转大写
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public synchronized String fromObjectToXml(T obj,boolean retUp){
		boolean applyRetUp = upret;
		upret = retUp;
		xstream.autodetectAnnotations(true);
		xstream.aliasSystemAttribute(null, WechatConsts.CLASS);
		if (obj instanceof OtherResMessage) {
			xstream.aliasField(((OtherResMessage) obj).getMsgType(),
					OtherResMessage.class, WechatConsts.OTHERMESSAGE);// 冲定义字段
		}else if(obj instanceof Map){
			xstream.registerConverter(new MapEntryConverter());
		}
		xstream.alias("xml", obj.getClass());
		
		String retStr =  xstream.toXML(obj);
		upret = applyRetUp;
		return retStr;
	}
	
	@Setter
	@Getter
	private static boolean upret = true;
	
	/**
	 * 扩展xstream，使其支持CDATA块
	 * 
	 */
	private static XStream xstream = new XStream(new XppDriver() {
		
		public HierarchicalStreamWriter createWriter(Writer out) {
			return new PrettyPrintWriter(out) {
				// 对所有xml节点的转换都增加CDATA标记
				boolean cdata = false;;

				@SuppressWarnings("rawtypes")
				public void startNode(String name, Class clazz) {
					if (clazz.equals(String.class)) {
						cdata = true;
					}
					if(upret){
						if (!StringUtils.equals(name, WechatConsts.XML)
								&& !StringUtils.equals(name, WechatConsts.ITEM)) { // 判断开头是否是xml！如果是不是转更改首字母为大写
							name = StringUtil.toUpperCaseFirstOne(name);
						}
					}
					
					super.startNode(name, clazz); // 首字母转大写
				}

				@Override
				public String encodeNode(String name) {
					return name;
				}
							  
				protected void writeText(QuickWriter writer, String text) {
					if (cdata) {
						writer.write("<![CDATA[");
						writer.write(text);
						writer.write("]]>");
						cdata = false;
					} else {
						writer.write(text);
					}
				}
			};
		}
	});
	
	/**
	 * 
	 * @Package: com.mhuang.wechat.common.utils
	 * @Description Map转换器
	 * @author huang.miao
	 * @date 2017年2月8日 下午2:21:53  
	 * @since 1.0.0
	 * @group skiper-opensource
	 */
	public static class MapEntryConverter implements Converter {
	        @SuppressWarnings("rawtypes")
			public boolean canConvert(Class clazz) {
	            return AbstractMap.class.isAssignableFrom(clazz);
	        }

	        @SuppressWarnings("rawtypes")
	        public void marshal(Object value, HierarchicalStreamWriter writer, MarshallingContext context) {
				AbstractMap map = (AbstractMap) value;
	            for (Object obj : map.entrySet()) {
	                Entry entry = (Entry) obj;
	                writer.startNode(entry.getKey().toString());
	                if(entry.getValue() instanceof String){
	                	writer.setValue("<![CDATA["+entry.getValue()+"]]>");
	                }else{
	                	writer.setValue(entry.getValue().toString());
	                }
	                
	                writer.endNode();
	            }
	        }

	        public Object unmarshal(HierarchicalStreamReader reader, UnmarshallingContext context) {
	            Map<String, String> map = new HashMap<String, String>();
	            while(reader.hasMoreChildren()) {
	                reader.moveDown();
	                map.put(reader.getNodeName(), reader.getValue());
	                reader.moveUp();
	            }
	            return map;
	        }
	}
}
