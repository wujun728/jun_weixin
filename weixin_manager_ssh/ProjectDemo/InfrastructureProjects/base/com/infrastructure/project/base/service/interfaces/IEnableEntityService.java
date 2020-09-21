package com.infrastructure.project.base.service.interfaces;

import java.util.List;
import java.util.Map;
import com.infrastructure.project.base.dao.interfaces.IEnableEntityDao;
import com.infrastructure.project.base.model.models.EnableEntity;
import com.infrastructure.project.common.exception.EntityOperateException;
import com.infrastructure.project.common.exception.ValidatException;

public interface IEnableEntityService<PKType extends Number, EntityType extends EnableEntity<PKType>, IDaoType extends IEnableEntityDao<PKType, EntityType>> extends ISimpleEntityService<PKType, EntityType, IDaoType> {
	
	public List<EntityType> listEnable();
	public List<EntityType> listDisable();
	public void enable(EntityType model) throws EntityOperateException, ValidatException;
	public void disable(EntityType model) throws EntityOperateException, ValidatException;
	public Map<PKType, String> getEnableSelectSource();
	
}
