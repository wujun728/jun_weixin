package com.infrastructure.project.base.dao.interfaces;

import com.infrastructure.project.base.model.models.SimpleEntity;

public interface ISimpleEntityDao<PKType extends Number, EntityType extends SimpleEntity<PKType>> extends IEntityDao<PKType, EntityType> {
	
}
