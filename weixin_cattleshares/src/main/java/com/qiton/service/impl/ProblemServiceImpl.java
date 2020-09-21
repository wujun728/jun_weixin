package com.qiton.service.impl;

import org.springframework.stereotype.Service;

import com.qiton.mapper.ProblemMapper;
import com.qiton.model.Problem;
import com.qiton.service.IProblemService;
import com.baomidou.framework.service.impl.SuperServiceImpl;

/**
 *
 * Problem 表数据服务层接口实现类
 *
 */
@Service
public class ProblemServiceImpl extends SuperServiceImpl<ProblemMapper, Problem> implements IProblemService {


}