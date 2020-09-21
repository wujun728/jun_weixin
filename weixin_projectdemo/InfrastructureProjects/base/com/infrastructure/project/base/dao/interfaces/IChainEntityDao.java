package com.infrastructure.project.base.dao.interfaces;

import com.infrastructure.project.base.model.models.ChainEntity;

public interface IChainEntityDao<PKType extends Number, EntityType extends ChainEntity<PKType, EntityType>> extends IEnableEntityDao<PKType, EntityType> {
	
}
