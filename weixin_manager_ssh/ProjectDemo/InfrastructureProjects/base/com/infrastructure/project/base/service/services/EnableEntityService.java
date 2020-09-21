package com.infrastructure.project.base.service.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.infrastructure.project.base.dao.interfaces.IEnableEntityDao;
import com.infrastructure.project.base.model.models.EnableEntity;
import com.infrastructure.project.base.service.interfaces.IEnableEntityService;
import com.infrastructure.project.common.exception.EntityOperateException;
import com.infrastructure.project.common.exception.ValidatException;

public abstract class EnableEntityService<PKType extends Number, EntityType extends EnableEntity<PKType>, IDaoType extends IEnableEntityDao<PKType, EntityType>> 
	extends SimpleEntityService<PKType, EntityType, IDaoType> implements IEnableEntityService<PKType, EntityType, IDaoType> { 
	
	public EnableEntityService(IDaoType dao){
		super(dao);
	}
	
	@Override
	public List<EntityType> listEnable() {
		return entityDao.listEnable();
	}
	
	@Override
	public List<EntityType> listDisable() {
		return entityDao.listDisable();
	}
	
	@Override
	public void enable(EntityType model) throws EntityOperateException, ValidatException  {
	    entityDao.enable(model);
	}
	
	@Override
	public void disable(EntityType model) throws EntityOperateException, ValidatException  {
	    entityDao.disable(model);
	}
	
	@Override
	public Map<PKType, String> getEnableSelectSource(){
		Map<PKType, String> ret=new HashMap<PKType, String>();
		List<EntityType> entities=listEnable();
		for(EntityType entity : entities){
			ret.put(entity.getId(), entity.getName());
		}
		return ret;
	}

}
