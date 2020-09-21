package com.infrastructure.project.base.dao.interfaces;

import java.util.List;
import org.hibernate.Criteria;
import com.infrastructure.project.base.model.models.Entity;
import com.infrastructure.project.common.exception.EntityOperateException;
import com.infrastructure.project.common.exception.ValidatException;

public interface IEntityDao<PKType extends Number, EntityType extends Entity<PKType>> {
	/**
	 * 根据id获取对应的对象
	 * @param id
	 * @return
	 * @throws ValidatException 
	 */
	public EntityType get(PKType id) throws ValidatException;
	
	/**
	 * 检查对应的id的对象是否存在
	 * @param id
	 * @return
	 */
	boolean exists(PKType id);
    
	/**
	 * 得到所有记录的个数
	 * @return
	 */
    public int countAll();
	
    /**
     * 保存对象并返回对应的id
     * @param model
     * @return
     * @throws ValidatException 
     */
    public void save(EntityType model) throws EntityOperateException, ValidatException;

    /**
     * 更新对象
     * @param model
     * @throws ValidatException 
     */
    public void update(EntityType model) throws EntityOperateException, ValidatException;

    /**
     * 直接删除对象
     * @param model
     * @throws ValidatException 
     */
    public void delete(EntityType model) throws EntityOperateException, ValidatException;
    
    /**
     * 保存或更新对象
     * @param model
     */
    public void saveOrUpdate(EntityType model) throws EntityOperateException;
    
    /**
     * 先查询是否有对应记录，再根据查询结果保存或更新对象，具体请搜索update和merge的区别
     * @param model
     */
    public void merge(EntityType model) throws EntityOperateException;
    
    /**
     * 获取Criteria
     * @return
     */
    public Criteria getCriteria();
    
    /**
     * 查询所有对象
     * @return
     */
    public List<EntityType> listAll();

    /**
     * 查询所有对象并排序
     * @param orderName
     * @param orderASC
     * @return
     */
    public List<EntityType> listAll(String orderName, boolean orderASC);
    
    /**
     * 分页查询对象
     * @param start
     * @param limit
     * @return
     */
    public List<EntityType> listPage(int start, int limit);
    
    /**
     * 分页查询对象并排序
     * @param start
     * @param limit
     * @param orderName
     * @param orderASC
     * @return
     */
    public List<EntityType> listPage(int start, int limit, String orderName, boolean orderASC);
    
    /**
     * 清除缓存中对应的对象，使对象变为托管态
     * @param model
     */
    public void evict(EntityType model);
    
    /**
     * 强制缓存中所有对象与数据库数据同步
     */
    public void flush();
    
    /**
     * 强制刷新一级缓存中所有的对象
     */
    public void clear();
}
