/*
 * FileName：MediaFiles.java 
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
package com.wxmp.wxcms.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wxmp.core.page.Page;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Transient;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author hermit
 * @version 2.0
 * @date 2018-04-17 10:54:58
 */
@Data
public class MediaFiles extends Page implements Serializable {

	private Long id;
   	private String mediaType;//素材类型
   	private String title;//视频标题
   	private String introduction;//视频描述
   	private String logicClass;//标签_逻辑分类
   	private String mediaId;//素材media_id
   	private String uploadUrl;//项目中上传路径
   	private String rmk;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm", iso = DateTimeFormat.ISO.DATE_TIME)
   	private Date createTime;
   	private Date updateTime;
   	private Long baseId;//消息主表id

	@Transient
	private String start;
	@Transient
	private String end;
	@Transient
	private String url;//文件绝对路径
}
