package com.qiton.service.impl;

import org.springframework.stereotype.Service;

import com.qiton.mapper.GoldRecordMapper;
import com.qiton.model.GoldRecord;
import com.qiton.service.IGoldRecordService;
import com.baomidou.framework.service.impl.SuperServiceImpl;

/**
 *
 * GoldRecord 表数据服务层接口实现类
 *
 */
@Service
public class GoldRecordServiceImpl extends SuperServiceImpl<GoldRecordMapper, GoldRecord> implements IGoldRecordService {


}