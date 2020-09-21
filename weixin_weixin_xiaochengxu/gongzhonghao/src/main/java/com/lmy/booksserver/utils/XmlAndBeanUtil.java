package com.lmy.booksserver.utils;

import com.thoughtworks.xstream.XStream;

public class XmlAndBeanUtil {
    private static final String CLASS_NAME="XmlAndBeanUtil";
    public static String beanToXml(Object obj,Class clz){
        final String METHOD_NAME="beanToXml";
        XStream xStream=new XStream();
        xStream.processAnnotations(clz);
        xStream.autodetectAnnotations(true);
        xStream.setClassLoader(clz.getClassLoader());
        String result=xStream.toXML(obj);
        result=result.replace(clz.getName(),"xml");
        System.out.println(CLASS_NAME+METHOD_NAME +result);
        return result;
    }
}
