package com.zzkun.service;

import com.zzkun.dao.RedBagRecordDao;
import com.zzkun.dao.UserDao;
import com.zzkun.model.RedBagRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

/**
 * Created by Administrator on 2016/6/17.
 */
@Service
public class RedBagService {

    @Autowired
    private RedBagRecordDao redBagRecordDao;

    @Autowired
    private UserDao userDao;


    public List<RedBagRecord> getRecordList(String appid) {
        return redBagRecordDao.getAllRecordByAppid(appid);
    }

    public boolean hasTodayRecord(String appid) {
        return redBagRecordDao.hasTodayRecord(appid);
    }

    public double getTodayRedBagVal(String appid) {
        if(hasTodayRecord(appid))
            return 0;
        Random random = new Random();
        double value = Math.ceil(random.nextGaussian() * 100) / 100;
        value = Math.abs(value);
        if(value <= 0.01) value = 0.01;
        if(!redBagRecordDao.hasRadBagRecord(appid))
            value *= 20;
        if(value >= 100) value = 100.0;
        return value;
    }

    public void recordDayRedBag(String appid, double val) {
        RedBagRecord record = new RedBagRecord();
        record.setAppid(appid);
        record.setValue(val);
        record.setType(RedBagRecord.TYPE_DAILY);
        record.setTime(LocalDateTime.now());
        redBagRecordDao.addRecord(record);
    }

    public void recordCost(String appid, double det) {
        RedBagRecord record = new RedBagRecord();
        record.setTime(LocalDateTime.now());
        record.setType(RedBagRecord.TYPE_CONSUME);
        record.setValue(det);
        record.setAppid(appid);
        redBagRecordDao.addRecord(record);
    }
}
