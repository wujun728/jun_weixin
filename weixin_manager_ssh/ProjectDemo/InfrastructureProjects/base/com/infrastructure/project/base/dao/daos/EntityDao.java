package com.infrastructure.project.base.dao.daos;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import com.infrastructure.project.base.dao.interfaces.IEntityDao;
import com.infrastructure.project.base.model.interfaces.ICreatable;
import com.infrastructure.project.base.model.interfaces.IDeletable;
import com.infrastructure.project.base.model.interfaces.IUpdatable;
import com.infrastructure.project.base.model.models.Entity;
import com.infrastructure.project.common.exception.EntityOperateException;
import com.infrastructure.project.common.exception.ValidatException;

public abstract class EntityDao<PKType extends Number, EntityType extends Entity<PKType>> implements IEntityDao<PKType, EntityType> {
    protected final Class<EntityType> entityClass;

    @SuppressWarnings("unchecked")
	public EntityDao() {
    	this.entityClass = (Class<EntityType>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[1];
    }
    
    @Autowired
    @Qualifier("sessionFactory")
    protected SessionFactory sessionFactory;

    protected Session getSession() {
        //事务必须是开启的(Required)，否则获取不到
        return sessionFactory.getCurrentSession();
    }
    
    protected void checkNull(EntityType entity){
    	if(entity==null)
    		throw new NullPointerException("entity is null!");
    }
    
    protected void checkCreatable(EntityType entity) throws EntityOperateException{
    	if(!(entity instanceof ICreatable))
    		throw new EntityOperateException("the entity not support ICreatable!");
    }
    
    protected void checkUpdatable(EntityType entity) throws EntityOperateException{
    	if(!(entity instanceof IUpdatable))
    		throw new EntityOperateException("the entity not support IUpdatable!");
    }
    
    protected void checkDeletable(EntityType entity) throws EntityOperateException{
    	if(!(entity instanceof IDeletable))
    		throw new EntityOperateException("the entity not support IDeletable!");
    }
    
    protected void checkCreatableOrUpdatable(EntityType entity) throws EntityOperateException{
    	if(!(entity instanceof ICreatable) && !(entity instanceof IUpdatable))
    		throw new EntityOperateException("the entity not support ICreatable or IUpdatable throw by merge!");
    }
    
    @Override
    public Criteria getCriteria(){
    	return getSession().createCriteria(this.entityClass);
    }
        
    @SuppressWarnings("unchecked")
	@Override
    public EntityType get(PKType id) throws ValidatException {
    	EntityType entity=(EntityType) getSession().get(this.entityClass, id);
    	if(entity==null)
    		throw new ValidatException("no entity has found!");
        return entity;
    }
    
    @Override
    public boolean exists(PKType id) {
        return getSession().get(this.entityClass, id) != null;
    }
    
    @Override
    public int countAll() {
    	Criteria criteria = getCriteria();
    	criteria.setProjection(Projections.rowCount());      	  	
    	return Integer.parseInt(criteria.uniqueResult().toString());
    }

	@Override
    public void save(EntityType entity) throws EntityOperateException, ValidatException {
    	checkNull(entity);
    	checkCreatable(entity);
        getSession().save(entity);
    }
    
    @Override
    public void update(EntityType entity) throws EntityOperateException, ValidatException {
    	checkNull(entity);
    	checkUpdatable(entity);
        getSession().update(entity);
    }

    @Override
    public void delete(EntityType entity) throws EntityOperateException, ValidatException {
    	checkNull(entity);
    	checkDeletable(entity);
        getSession().delete(entity);
    }
    
    @Override
    public void saveOrUpdate(EntityType entity) throws EntityOperateException {
    	checkNull(entity);
    	checkCreatableOrUpdatable(entity);
        getSession().saveOrUpdate(entity);
    }
    
    @Override
    public void merge(EntityType entity) throws EntityOperateException {
    	checkNull(entity);
    	checkCreatableOrUpdatable(entity);
        getSession().merge(entity);
    }
    
	@Override
    public List<EntityType> listAll() {
    	return listAll(null, true);
    } 
	
	@Override
    @SuppressWarnings("unchecked")
	public List<EntityType> listAll(String orderName, boolean orderASC) {
    	Criteria criteria = getCriteria();
    	if(orderName!=null) {
	    	if(orderASC)
	    		criteria.addOrder(Order.asc(orderName));
	    	else
	    		criteria.addOrder(Order.desc(orderName));
    	}
    	return criteria.list();
    }
    
	@Override
	public List<EntityType> listPage(int start, int limit) {  	
    	return listPage(start, limit, null, true);
    }
    
	@Override
    @SuppressWarnings("unchecked")
	public List<EntityType> listPage(int start, int limit, String orderName, boolean orderASC) {
    	Criteria criteria = getCriteria();
    	if(orderName!=null) {
	    	if(orderASC)
	    		criteria.addOrder(Order.asc(orderName));
	    	else
	    		criteria.addOrder(Order.desc(orderName));   
    	}
    	criteria.setFirstResult(start);  
        criteria.setMaxResults(limit);
    	return criteria.list();
    }
	
	@Override
    public void evict(EntityType entity) {
        getSession().evict(entity);
    }

    @Override
    public void flush() {
        getSession().flush();
    }

    @Override
    public void clear() {
        getSession().clear();
    }
}
