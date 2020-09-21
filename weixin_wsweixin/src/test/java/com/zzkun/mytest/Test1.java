package com.zzkun.mytest;

import org.junit.Test;

import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by Administrator on 2016/6/18.
 */

public class Test1 {

    @Test
    public void test() {
        Logger logger = Logger.getLogger("codekun");
        logger.setLevel(Level.CONFIG);
        logger.warning("heheda");
        logger.config("nihao");
        logger.info("lalala");
    }

}
