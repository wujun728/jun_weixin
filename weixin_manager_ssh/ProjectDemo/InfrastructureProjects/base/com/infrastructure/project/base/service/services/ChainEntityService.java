package com.infrastructure.project.base.service.services;

import java.util.List;
import org.hibernate.criterion.Restrictions;
import com.infrastructure.project.base.dao.interfaces.IChainEntityDao;
import com.infrastructure.project.base.model.models.ChainEntity;
import com.infrastructure.project.base.service.interfaces.IChainEntityService;

public abstract class ChainEntityService<PKType extends Number, EntityType extends ChainEntity<PKType, EntityType>, IDaoType extends IChainEntityDao<PKType, EntityType>>
	extends EnableEntityService<PKType, EntityType, IDaoType> implements IChainEntityService<PKType, EntityType, IDaoType>{ 
	
	public ChainEntityService(IDaoType dao){
		super(dao);
	}
	
	@SuppressWarnings("unchecked")
	public List<EntityType> listChain(){
		return entityDao.getCriteria().add(Restrictions.isNull("parent")).list();
	}

}
