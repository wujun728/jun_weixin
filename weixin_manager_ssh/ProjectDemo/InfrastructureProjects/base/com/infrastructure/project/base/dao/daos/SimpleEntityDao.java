package com.infrastructure.project.base.dao.daos;

import com.infrastructure.project.base.dao.interfaces.ISimpleEntityDao;
import com.infrastructure.project.base.model.models.SimpleEntity;

public abstract class SimpleEntityDao<PKType extends Number, EntityType extends SimpleEntity<PKType>> 
	extends EntityDao<PKType, EntityType> implements ISimpleEntityDao<PKType, EntityType> {

}
