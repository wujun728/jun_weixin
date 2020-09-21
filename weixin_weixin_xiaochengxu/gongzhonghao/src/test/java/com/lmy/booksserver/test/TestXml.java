package com.lmy.booksserver.test;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.module.jaxb.JaxbAnnotationModule;

public class TestXml {
    public static void main(String[] args) {
        String xmlStr="<xml><appid>appId</appid><mch_id>mchId</mch_id></xml>";
        XmlMapper xmlMapper=new XmlMapper();
        xmlMapper.registerModule(new JaxbAnnotationModule());
        xmlMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }
}
