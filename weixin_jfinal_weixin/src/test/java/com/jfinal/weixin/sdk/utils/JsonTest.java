package com.jfinal.weixin.sdk.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jfinal.weixin.sdk.api.shakearound.bean.DeviceIdentifier;

public class JsonTest {

    public static void main(String[] args) throws Exception {
        List<DeviceIdentifier> deviceIdentifierList = new ArrayList<DeviceIdentifier>();
        DeviceIdentifier dd = new DeviceIdentifier();
        dd.setDevice_id(10100);
        dd.setUuid("FDA50693-A4E2-4FB1-AFCF-C6EB07647825");
        dd.setMajor(10001);
        dd.setMinor(10002);
        deviceIdentifierList.add(dd);
        deviceIdentifierList.add(dd);

        System.out.println(JsonUtils.toJson(deviceIdentifierList));

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
        mapper.configure(JsonParser.Feature.ALLOW_BACKSLASH_ESCAPING_ANY_CHARACTER, true);
        String json = "{\"city\":\"😂TÈ\\nè\",\"province\":\"Ñl_\"}";

        System.out.println(mapper.readValue(json, Map.class));

        System.out.println(JsonUtils.parse(json, Map.class));
    }
}
