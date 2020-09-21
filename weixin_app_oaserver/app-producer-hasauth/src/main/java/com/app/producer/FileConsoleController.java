package com.app.producer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.util.ToolUtil;
import com.app.dao.FileConsoleDao;
import com.app.redis.JedisClientService;

import net.sf.json.JSONObject;

@RestController
public class FileConsoleController {
	
	@Autowired
	private JedisClientService jedisService;
	
	@Autowired
	private FileConsoleDao fileConsoleDao;
	
	@Value("${IMAGES_PATH}")
	private String tPath;
	
	/**
	 * 获取这个目录下的所有文件+目录
	 * @param response
	 * @param folderId 目录id
	 * @param userToken 用户token
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/queryFilesListByFolderId")
	public void queryFilesListByFolderId(HttpServletResponse response, String userToken, String folderId) throws Exception{
		Map<String, Object> map = new HashMap<>();
		Map<String, Object> user = JSONObject.fromObject(jedisService.get("userMation:" + userToken).toString());
		map.put("userId", user.get("id"));
		map.put("folderId", folderId);
		if("3".equals(folderId)){//企业网盘
			map.put("folderType", 1);//企业网盘
		}else{
			Map<String, Object> parentFolder = fileConsoleDao.queryFolderParentByFolderId(map);
			if(parentFolder != null && !parentFolder.isEmpty()){
				if(parentFolder.get("parentId").toString().indexOf("3,") == 0){
					map.put("folderType", 1);//企业网盘
				}else{
					map.put("folderType", 2);//私人
				}
			}else{
				map.put("folderType", 2);//私人
			}
		}
		List<Map<String, Object>> beans = fileConsoleDao.queryFilesListByFolderId(map);
		for(Map<String, Object> bean: beans){
			if(!"folder".equals(bean.get("fileType").toString())){//不是文件夹
				String size = ToolUtil.sizeFormatNum2String(Long.parseLong(bean.get("fileSize").toString()));
				bean.put("fileSize", size);
			}
		}
		ToolUtil.sendMessageToPageComJson(response, beans, beans.size());
	}

}
