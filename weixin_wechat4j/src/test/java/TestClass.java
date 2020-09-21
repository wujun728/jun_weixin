import com.alibaba.fastjson.JSONObject;
import com.hotlcc.wechat4j.Wechat;
import com.hotlcc.wechat4j.handler.ReceivedMsgHandler;
import com.hotlcc.wechat4j.model.ReceivedMsg;
import com.hotlcc.wechat4j.model.UserInfo;
import com.hotlcc.wechat4j.util.CommonUtil;
import com.hotlcc.wechat4j.util.StringUtil;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class TestClass {
    private Wechat wechat;

    @Before
    public void initAndLogin() {
        wechat = new Wechat();
        wechat.addReceivedMsgHandler(new ReceivedMsgHandler() {
            @Override
            public void handleAllType(Wechat wechat, ReceivedMsg msg) {
                UserInfo contact = wechat.getContactByUserName(false, msg.getFromUserName());
                String name = StringUtil.isEmpty(contact.getRemarkName()) ? contact.getNickName() : contact.getRemarkName();
                System.out.println(name + ": " + msg.getContent());
            }
        });

        wechat.autoLogin();
    }

    public void testSendText() {
        JSONObject result = wechat.sendTextToUserName(null, "这是消息内容");
        System.out.println(result);
    }

    public void testSendImage() {
        File file = null;
        JSONObject result = null;
        file = new File("C:\\Users\\Administrator\\Pictures\\壁纸\\9e5f4981099bcf351e0ec18c3654aced.jpg");
        result = wechat.sendImageToUserName(null, file);
        file = new File("C:\\Users\\Administrator\\Videos\\手机QQ视频_20190416170016.mp4");
        result = wechat.sendVideoToUserName(null, file);
        System.out.println(result);
        while (true) CommonUtil.threadSleep(5000);
    }

    @Test
    public void testGetImageData() {
        byte[] data = wechat.getContactHeadImgByUserName(null);
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream("D:\\a.jpg");
            fos.write(data);
            fos.flush();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
