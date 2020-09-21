package com.infrastructure.project.base.dao.daos;

import java.text.DecimalFormat;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import com.infrastructure.project.base.dao.interfaces.IChainEntityDao;
import com.infrastructure.project.base.model.models.ChainEntity;
import com.infrastructure.project.common.exception.EntityOperateException;
import com.infrastructure.project.common.exception.ValidatException;

public abstract class ChainEntityDao<PKType extends Number, EntityType extends ChainEntity<PKType, EntityType>> 
	extends EnableEntityDao<PKType, EntityType> implements IChainEntityDao<PKType, EntityType> {
	
	protected void setLevelCode(EntityType entity) throws ValidatException {
		/*PKType id=(PKType)super.getSession().save(entity);
		if(entity.getParent()==null){
			entity.setLevelCode(id.toString());
			super.getSession().update(entity);
		}
		else{
			EntityType parentEntity=super.get(entity.getParent().getId());
			if(parentEntity==null)
				throw new ValidatException("The parent does not exist!");
			else{
				entity.setLevelCode(parentEntity.getLevelCode()+","+id.toString());
				super.getSession().update(entity);
			}
		}*/
		
		DecimalFormat df = new DecimalFormat( "000" );
		EntityType maxLevelCodeEntity;
		if(entity.getParent()==null)
			maxLevelCodeEntity=getMaxLevelCodeExceCurrentEntity(null, entity.getId());
		else
			maxLevelCodeEntity=getMaxLevelCodeExceCurrentEntity(entity.getParent().getId(), entity.getId());
		
		if(maxLevelCodeEntity==null){
			if(entity.getParent()==null)
				entity.setLevelCode(df.format(1));
			else
				entity.setLevelCode(entity.getParent().getLevelCode()+df.format(1));
		}
		else{			
			String maxLevelCodeStr=maxLevelCodeEntity.getLevelCode();
			int maxLevelCode=Integer.parseInt(maxLevelCodeStr.substring(maxLevelCodeStr.length()-3, maxLevelCodeStr.length()));
			if(maxLevelCode+1>999)
				throw new ValidatException("The levelcode exceeds the maximum of 999!");
			else{
				if(entity.getParent()==null)
					entity.setLevelCode(df.format(maxLevelCode+1));
				else
					entity.setLevelCode(entity.getParent().getLevelCode()+df.format(maxLevelCode+1));
			}
		}		
	}
	
	/*protected int getChildrenCount(EntityType entity){
		Criteria criteria = getCriteria();
		//criteria.add(Restrictions.eq("parentId", entity.getId()));
		//criteria.createAlias("parent", "p").add(Restrictions.eq("p.id", entity.getId()));
		criteria.createCriteria("parent").add(Restrictions.eq("id", entity.getId()));
		criteria.setProjection(Projections.rowCount());      	  	
		return Integer.parseInt(criteria.uniqueResult().toString());
	}*/
	
	@SuppressWarnings("unchecked")
	public EntityType getMaxLevelCodeExceCurrentEntity(PKType parentId, PKType currentId) {
		List<EntityType> ret;	
		Criteria criteria=super.getCriteria().add(Restrictions.ne("id", currentId));	
		if(parentId==null)
			criteria.add(Restrictions.isNull("parent"));
		else
			criteria.createCriteria("parent").add(Restrictions.eq("id", parentId));
		criteria.setMaxResults(1);
		
		ret=criteria.list();	
		if(ret!=null && ret.size()>0)
			return ret.get(0);  
		return null;
	}
	
	private void updateLevelCode(EntityType entity){
		if(entity.getParent()==null)
			entity.setLevelCode(entity.getId().toString());
		else
			entity.setLevelCode(entity.getParent().getLevelCode()+","+entity.getId().toString());	
		super.getSession().update(entity);
	}
		
	@SuppressWarnings("unchecked")
	public List<EntityType> listByParentId(PKType parentId) {
		if(parentId==null)
			return super.getCriteria().add(Restrictions.isNull("parent")).list();
		else
			return super.getCriteria().createCriteria("parent").add(Restrictions.eq("id", parentId)).list();
		//return super.getCriteria().createAlias("parent", "p").add(Restrictions.eq("p.id", parentId)).list();
		//return super.getCriteria().add(Restrictions.sqlRestriction(" {alias}.parentId = ? ", parentId, Hibernate.STRING)).list();		
				
		//.add(Restrictions.eq("parentId", parentId)).list();
	}
	
	@SuppressWarnings("unchecked")
	public List<EntityType> listByParentIdExceCurrent(PKType parentId, PKType currentId) {
		if(parentId==null)
			return super.getCriteria().add(Restrictions.ne("id", currentId)).add(Restrictions.isNull("parent")).list();
		else
			return super.getCriteria().add(Restrictions.ne("id", currentId)).createCriteria("parent").add(Restrictions.eq("id", parentId)).list();
		//return super.getCriteria().createAlias("parent", "p").add(Restrictions.eq("p.id", parentId)).list();
		//return super.getCriteria().add(Restrictions.sqlRestriction(" {alias}.parentId = ? ", parentId, Hibernate.STRING)).list();	
				
		//.add(Restrictions.eq("parentId", parentId)).list();
	}
		
	@Override
	public void save(EntityType entity) throws EntityOperateException, ValidatException{	
		super.checkNull(entity);
		super.checkCreatable(entity);
		if(entity.getParent()!=null)
			entity.setParent(get(entity.getParent().getId()));
		//setLevelCode(entity);
		entity.setLevelCode("");
		super.getSession().save(entity);
		updateLevelCode(entity);
	}
	
	@Override
	public void update(EntityType entity) throws EntityOperateException, ValidatException{
		super.checkNull(entity);
		super.checkUpdatable(entity);
		if(entity.getParent()!=null)
			entity.setParent(get(entity.getParent().getId()));
		//setLevelCode(entity);
		super.getSession().update(entity);
		updateLevelCode(entity);
	}
	
	@Override
	public void delete(EntityType entity) throws EntityOperateException, ValidatException{
		super.checkNull(entity);
		super.checkUpdatable(entity);
		if(entity.getChildren()!=null || !entity.getChildren().isEmpty())
			throw new ValidatException("The entity has children can't be delete!");
		else
			super.getSession().delete(entity);
	}

}
