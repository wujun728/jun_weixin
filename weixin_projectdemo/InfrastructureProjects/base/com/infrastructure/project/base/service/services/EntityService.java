package com.infrastructure.project.base.service.services;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import com.infrastructure.project.base.dao.interfaces.IEntityDao;
import com.infrastructure.project.base.model.models.Entity;
import com.infrastructure.project.base.service.interfaces.IEntityService;
import com.infrastructure.project.common.exception.EntityOperateException;
import com.infrastructure.project.common.exception.ValidatException;
import com.infrastructure.project.common.utilities.PageList;
import com.infrastructure.project.common.utilities.PageListUtil;

public abstract class EntityService<PKType extends Number, EntityType extends Entity<PKType>, IDaoType extends IEntityDao<PKType, EntityType>>
	implements IEntityService<PKType, EntityType, IDaoType> { 
	
	protected final Class<EntityType> entityClass;
	protected final IDaoType entityDao;
	
	@SuppressWarnings("unchecked")
	public EntityService(IDaoType dao) {
		this.entityClass = (Class<EntityType>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[1];
		this.entityDao=dao;
	}
	
	@Override
	public EntityType get(PKType id) throws ValidatException {
		return entityDao.get(id);
	}
	
	@Override
	public boolean exists(PKType id) {
	    return entityDao.exists(id);
	}
	
	@Override
	public int countAll() {
	    return entityDao.countAll();
	}
	
	@Override
	public void save(EntityType model) throws EntityOperateException, ValidatException {
	    entityDao.save(model);
	}
	
	@Override
	public void update(EntityType model) throws EntityOperateException, ValidatException  {
	    entityDao.update(model);
	}
	
	@Override
	public void merge(EntityType model) throws EntityOperateException  {
	    entityDao.merge(model);
	}
	
	@Override
	public void delete(PKType id) throws EntityOperateException, ValidatException {
		this.delete(this.get(id));
	}
	
	@Override
	public void delete(EntityType model) throws EntityOperateException, ValidatException  {
	    entityDao.delete(model);
	}
	
	@Override
	public void saveOrUpdate(EntityType model) throws EntityOperateException  {
	    entityDao.saveOrUpdate(model);
	}
	
	@Override
	public void evict(EntityType model) {
	    entityDao.evict(model);
	}  
	
	@Override
	public List<EntityType> listAll() {
	    return entityDao.listAll();
	}
	
	@Override
	public PageList<EntityType> listPage(int pageNo) {
	    return this.listPage(pageNo, PageListUtil.DEFAULT_PAGE_SIZE);
	}   
	
	@Override
	public PageList<EntityType> listPage(int pageNo, int pageSize) {
	    Integer count = countAll();
	    List<EntityType> items = entityDao.listPage((pageNo-1)*pageSize, pageSize);
	    return PageListUtil.getPageList(count, pageNo, items, pageSize);
	}
	
	/*public PageList<EntityType> listAllWithOptimize(int pn) {
	    return this.listAllWithOptimize(pn, Constants.DEFAULT_PAGE_SIZE);
	}
	
	public PageList<EntityType> listAllWithOptimize(int pn, int pageSize) {
	    Integer count = countAll();
	    List<EntityType> items = entityDao.listAll(pn, pageSize);
	    return PageUtil.getPage(count, pn, items, pageSize);
	}
	
	@Override
	public PageList<EntityType> prePage(PKType pk, int pn) {
	    return prePage(PKType, pn, Constants.DEFAULT_PAGE_SIZE);
	}
	
	@Override
	public PageList<EntityType> nextPage(PKType pk, int pn) {
	    return nextPage(PKType, pn, Constants.DEFAULT_PAGE_SIZE);
	}
	
	@Override
	public PageList<EntityType> prePage(PKType pk, int pn, int pageSize) {
	    Integer count = countAll();
	    List<EntityType> items = entityDao.pre(PKType, pn, pageSize);
	    return PageUtil.getPage(count, pn, items, pageSize);
	}
	
	@Override
	public PageList<EntityType> nextPage(PKType pk, int pn, int pageSize) {
	    Integer count = countAll();
	    List<EntityType> items = entityDao.next(PKType, pn, pageSize);
	    return PageUtil.getPage(count, pn, items, pageSize);
	}*/
 
}
