package com.infrastructure.project.base.dao.interfaces;

import java.util.List;
import com.infrastructure.project.base.model.models.EnableEntity;
import com.infrastructure.project.common.exception.EntityOperateException;
import com.infrastructure.project.common.exception.ValidatException;

public interface IEnableEntityDao<PKType extends Number, EntityType extends EnableEntity<PKType>> extends ISimpleEntityDao<PKType, EntityType> {
	
	public List<EntityType> listEnable();
	public List<EntityType> listDisable();
	public void enable(EntityType entity) throws EntityOperateException, ValidatException;
	public void disable(EntityType entity) throws EntityOperateException, ValidatException;
	
}
