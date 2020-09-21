package com.infrastructure.project.base.service.interfaces;

import java.util.Map;
import com.infrastructure.project.base.dao.interfaces.ISimpleEntityDao;
import com.infrastructure.project.base.model.models.SimpleEntity;

public interface ISimpleEntityService<PKType extends Number, EntityType extends SimpleEntity<PKType>, IDaoType extends ISimpleEntityDao<PKType, EntityType>> extends IEntityService<PKType, EntityType, IDaoType> {
    public Map<PKType, String> getSelectSource();
}
