package com.infrastructure.project.base.service.interfaces;

import java.util.List;
import com.infrastructure.project.base.dao.interfaces.IEntityDao;
import com.infrastructure.project.base.model.models.Entity;
import com.infrastructure.project.common.exception.EntityOperateException;
import com.infrastructure.project.common.exception.ValidatException;
import com.infrastructure.project.common.utilities.PageList;

public interface IEntityService<PKType extends Number, EntityType extends Entity<PKType>, IDaoType extends IEntityDao<PKType, EntityType>> {
	public EntityType get(PKType id) throws ValidatException;
	
	boolean exists(PKType id);
	
	public int countAll();
	
    public void save(EntityType model) throws EntityOperateException, ValidatException;
    
    public void update(EntityType model) throws EntityOperateException, ValidatException ;
    
    public void merge(EntityType model) throws EntityOperateException ;

    public void delete(PKType id) throws EntityOperateException, ValidatException;

    public void delete(EntityType model) throws EntityOperateException, ValidatException ;

    public void saveOrUpdate(EntityType model) throws EntityOperateException ;
    
    public void evict(EntityType model);
    
    public List<EntityType> listAll();
    
    public PageList<EntityType> listPage(int pn);
    
    public PageList<EntityType> listPage(int pn, int pageSize);
    
    /*public PageList<EntityType> prePage(PKType pk, int pn);
    
    public PageList<EntityType> nextPage(PKType pk, int pn);
    
    public PageList<EntityType> prePage(PKType pk, int pn, int pageSize);
    
    public PageList<EntityType> nextPage(PKType pk, int pn, int pageSize);*/
    
    /*public void flush();
    
    public void clear();*/ 
}
