/*
 * FileName：AccountMenuServiceImpl.java 
 * <p>
 * Copyright (c) 2017-2020, <a href="http://www.webcsn.com">hermit (794890569@qq.com)</a>.
 * <p>
 * Licensed under the GNU General Public License, Version 3 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.gnu.org/licenses/gpl-3.0.html
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
package com.wxmp.wxcms.service.impl;

import com.wxmp.wxcms.domain.AccountMenu;
import com.wxmp.wxcms.mapper.AccountMenuDao;
import com.wxmp.wxcms.service.AccountMenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 *
 * @author hermit
 * @version 2.0
 * @date 2018-04-17 10:54:58
 */
@Service
public class AccountMenuServiceImpl implements AccountMenuService{

	@Resource
	private AccountMenuDao entityDao;

	public AccountMenu getById(String id) {
		return entityDao.getById(id);
	}

	public List<AccountMenu> listWxMenus(AccountMenu entity) {
		return entityDao.listWxMenus(entity);
	}

	public List<AccountMenu> listParentMenu(AccountMenu entity) {
		return entityDao.listParentMenu(entity);
	}

	public void add(AccountMenu entity) {
		entityDao.add(entity);
	}

	public void update(AccountMenu entity) {
		entityDao.update(entity);
	}

	public void delete(AccountMenu entity) {
		entityDao.delete(entity);
	}



}
