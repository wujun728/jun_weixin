package lenve;

import java.util.List;

/**
 * Created by wangsong on 16-7-14.
 */
public class MenuEntity {
    //    button 	是 	一级菜单数组，个数应为1~3个
//    sub_button 	否 	二级菜单数组，个数应为1~5个
//    type 	是 	菜单的响应动作类型
//    name 	是 	菜单标题，不超过16个字节，子菜单不超过40个字节
//    key 	click等点击类型必须 	菜单KEY值，用于消息接口推送，不超过128字节
//    url 	view类型必须 	网页链接，用户点击菜单可打开链接，不超过1024字节
//            media_id
    private String button;
    private String type;
    private String name;
    private String key;
    private String url;
    private List<MenuEntity> sub_button;

    public String getButton() {
        return button;
    }

    public void setButton(String button) {
        this.button = button;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<MenuEntity> getSub_button() {
        return sub_button;
    }

    public void setSub_button(List<MenuEntity> sub_button) {
        this.sub_button = sub_button;
    }
}
