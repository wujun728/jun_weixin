package com.zzkun.dao;

import com.zzkun.model.RedBagRecord;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by Administrator on 2016/6/17.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:springmvc-servlet.xml")
public class RedBagRecordDaoTest {

    @Autowired
    public RedBagRecordDao dao;

    @Test
    public void getAllRedRecordByUserAppid() throws Exception {
        List<RedBagRecord> list = dao.getAllRecordByAppid("abc");
        System.out.println(list);
    }

    @Test
    public void addRedRecord() throws Exception {
        List<RedBagRecord> list = dao.getAllRecordByAppid("abc");
        dao.addRecord(list.get(0));
    }

    @Test
    public void hasTodayRedRecord() throws Exception {
        System.out.println(dao.hasTodayRecord("abc"));
    }
}