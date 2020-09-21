package com.javen.model;

import java.util.List;
import java.util.Map;

import com.jfinal.kit.StrKit;
import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.ehcache.CacheKit;
import com.jfinal.plugin.ehcache.IDataLoader;

/**
 * 授权获取到的用户信息
 * @author Javen
 */
public class TUser extends Model<TUser> {

	private static final long serialVersionUID = 6204222383226990020L;
	
	static Log log = Log.getLog(TUser.class);
	
	public static final TUser dao = new TUser();
	
	
	public List<TUser> getAll(){
		return dao.find("select * from Tuser");
	}
	
	public TUser getTUserByOpenId(String openId){
		return dao.findFirstByCache("tenMinute", "getTUserByOpenId"+openId,"select * from Tuser where openId=?",openId);
	}

	/**
	 * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
	 */
	public Page<TUser> paginate(int pageNumber, int pageSize) {
		return paginate(pageNumber, pageSize, "select *", "from Tuser order by id asc");
	}
	
	public TUser findByEmail(String email){
		return this.findFirst("select * from Tuser where email=?", email);
	}
	
	public TUser findByTel(String tel){
		return this.findFirst("select * from Tuser where tel=?", tel);
	}
	public TUser findByOpenId(String openId){
		return this.findFirst("select * from Tuser where openId=?", openId);
	}
	
	public boolean addjifen(String openId,int jifen){
		TUser tUser = getTUserByOpenId(openId);
		if (null!=tUser) {
			tUser.set("level", tUser.getInt("level")+jifen);
		}
		return tUser.update();
		
	}
	
	/**
	 * 从缓存中加载用户信息
	 * @param userId
	 * @return
	 */
	public TUser loadInSession(String userId) {
		// 传入的userId为空直接返回null
		if (StrKit.isBlank(userId)) {
			return null;
		}
		return loadInSession(Long.parseLong(userId));
	}
	
	/**
	 * 根据map参数查找
	 * @param paras
	 * @return 
	 */
	public List<TUser> findByMap(Map<String, Object> paras) {
		StringBuilder sql = new StringBuilder("select * from Tuser ");
		if (paras.containsKey("order")) {
			sql.append(" ORDER BY ");
			sql.append(paras.get("order"));
			sql.append(" ");
		}
		if (paras.containsKey("limit")) {
			sql.append(" LIMIT ");
			sql.append(paras.get("limit"));
		}
		return this.findByCache("tenMinute", "Tuser", sql.toString());
	}

	
	private static final String USER_CACHE_NAME = "session";

	/**
	 * 从缓存中加载用户信息
	 * @param userId
	 * @return
	 */
	public TUser loadInSession(final long userId) {
		return CacheKit.get(USER_CACHE_NAME, userId, new IDataLoader() {

			@Override
			public Object load() {
				return findById(userId);
			}
		});
	}
}
