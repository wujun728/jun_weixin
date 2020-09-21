package com.pflm.modules.seckill.controller;
import com.pflm.modules.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *  秒杀
 * @author qinxuewu
 * @create 18/11/3上午9:39
 * @since 1.0.0
 */
@Controller
@RequestMapping("/seckill")
public class SeckillConroller extends BaseController {

    /**
     * 秒杀首页
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(){
        logger.debug("***************秒杀首页***********************");
        ModelAndView view=new ModelAndView();
        view.setViewName("seckill/login");
        return view;
    }
}
