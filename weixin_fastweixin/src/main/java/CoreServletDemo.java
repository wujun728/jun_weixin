

 
import java.io.IOException;
import java.io.PrintWriter;
 
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
/**
 * 请求处理的核心类
 *
 */
@WebServlet("/bind")
public class CoreServletDemo extends HttpServlet {
 
    private static final long serialVersionUID = 4440739483644821986L;
    MainServernSupport support = new MainServernSupport();
 
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        System.err.println(request.getParameter("signature"));
        System.err.println(request.getParameter("timestamp"));
        System.err.println(request.getParameter("nonce"));
        System.err.println(request.getParameter("echostr"));
        support.bindServer(request, response);
    }
 
    /**
     * 重写servlet中的post方法，用于接收微信服务器发来的消息，置为final方法，用户已经无需重写这个方法啦
     *
     * @param request http请求对象
     * @param response http响应对象
     * @throws ServletException servlet异常
     * @throws IOException IO异常
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 将请求、响应的编码均设置为UTF-8（防止中文乱码）
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        String resp = support.processRequest(request);
        PrintWriter out = response.getWriter();
        out.print(resp);
        out.close();
    }
}