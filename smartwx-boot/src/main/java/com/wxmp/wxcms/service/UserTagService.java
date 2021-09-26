/*
 * FileName：UserTagService.java 
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
package com.wxmp.wxcms.service;

import com.wxmp.wxcms.domain.UserTag;

import java.util.List;

/**
 *
 * @author fuzi Kong
 * @version 2.0
 * @date 2018-05-30 10:54:58
 */
public interface UserTagService {

	public UserTag getById(Integer id);

	public List<UserTag> listForPage(UserTag searchEntity);

	public void add(UserTag entity);

	public void update(UserTag entity);

	public void delete(UserTag entity);

	public Integer deleteBatchIds(String[] ids);
	//获取数据库中用户标签的最大值，判断是否同步
	public Integer getMaxId();
}
