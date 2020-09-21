package lenve;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by wangsong on 16-7-12.
 */
@Controller(value = "user")
public class UserController {
    @RequestMapping("/add")
    public String add(User user) {
        return "add";
    }
    @RequestMapping("/delete")
    public String delete() {
        return "delete";
    }
    @RequestMapping("/update")
    public String update() {
        return "update";
    }
    @RequestMapping("/list")
    public String list() {
        return "list";
    }
}
