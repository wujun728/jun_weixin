package lenve;

import com.google.gson.Gson;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
public class MyController {
    //大家好，我是中文哈哈哈哈哈哈哈
//    @RequestMapping(value = "/hello")
//    public String hello(String username, Map<String,Object> map) {
//        System.out.println("hello " + username);
//        map.put("username", username);
//        return "hello";
//    }
    @RequestMapping(value = "/hello")
    public String hello(String username, Model model) {
        User user = new User();
        user.setNickname("赵六");
        user.setUsername("zhaoliu");
        user.setPassword("123456");
        model.addAttribute("username", username);
        model.addAttribute(user);
        return "hello";
    }

    @RequestMapping(value = "/lenve")
    public String lenve() {
        return "lenve";
    }

    @RequestMapping(value = "/getdata")
    @ResponseBody
    public void getData(HttpServletResponse response, HttpServletRequest request) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        User user = new User();
        user.setNickname("赵六");
        user.setUsername("zhaoliu");
        user.setPassword("123456");
        Gson gson = new Gson();
        String json = gson.toJson(user, User.class);
        System.out.println(json);
        PrintWriter out = null;
        try {
            out = response.getWriter();
//            out.print(json);
            out.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
//        return json;
    }
//    public static final String TOKEN = "ws584991843";
//
//    @RequestMapping("/wget")
//    public void wget(HttpServletRequest req,HttpServletResponse resp) throws IOException {
//        System.out.println("来了！！！");
//		signature	微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
//		timestamp	时间戳
//		nonce	随机数
//		echostr
//        String signature = req.getParameter("signature");
//        String timestamp = req.getParameter("timestamp");
//        String nonce = req.getParameter("nonce");
//        String echostr = req.getParameter("echostr");
//        String[] arr = {TOKEN,timestamp,nonce};
//        Arrays.sort(arr);
//        StringBuffer sb = new StringBuffer();
//        for(String a:arr) {
//            sb.append(a);
//        }
//        String sha1Msg = SecurityKit.sha1(sb.toString());
//        if(signature.equals(sha1Msg)) {
//            resp.getWriter().println(echostr);
//        }
//    }
}
