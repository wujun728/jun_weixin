package com.app.producer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.app.common.constans.Constants;
import com.app.common.util.ToolUtil;
import com.app.dao.AppMyNoteDao;
import com.app.redis.JedisClientService;

/**
 * 
 * @author 
 *
 */
@RestController
public class AppMyNoteController {
	
	@Autowired
	private JedisClientService jedisClient;
	
	@Autowired
	private AppMyNoteDao appMyNoteDao;
	
	/**
	 * 
	     * @Title: queryNoteAllFile
	     * @Description: 获取笔记目录
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppMyNoteController/queryNoteAllFile")
	@ResponseBody
	public void queryNoteAllFile(HttpServletResponse response, @RequestParam String userToken) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
        if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
        map.put("userId", userToken);
		List<Map<String, Object>> beans = appMyNoteDao.queryFileAndContentList(map);
		beans = ToolUtil.allFileToTreeNote(beans);
		ToolUtil.sendMessageToPageComJson(response, beans);
	}
	
	/**
	 * 
	     * @Title: queryNoteContent
	     * @Description: 获取笔记详情
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppMyNoteController/queryNoteContent")
	@ResponseBody
	public void queryNoteContent(HttpServletResponse response, @RequestParam String userToken, @RequestParam String id) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		Map<String, Object> bean = appMyNoteDao.queryMyNoteContentMationById(map);
		ToolUtil.sendMessageToPageComJson(response, bean);
	}
	
	/**
	 * 
	     * @Title: queryNewNote
	     * @Description: 获取最新笔记
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppMyNoteController/queryNewNote")
	@ResponseBody
	public void queryNewNote(HttpServletResponse response, @RequestParam String userToken) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
        map.put("userId", userToken);
        List<Map<String, Object>> beans = appMyNoteDao.queryNewNote(map);
		ToolUtil.sendMessageToPageComJson(response, beans);
	}
	
	/**
	 * 
	     * @Title: addNoteFile
	     * @Description: 新增文件夹
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppMyNoteController/addNoteFile")
	@ResponseBody
	public void addNoteFile(HttpServletResponse response, @RequestParam String userToken, @RequestParam String id, @RequestParam String name) throws Exception{
		Map<String, Object> map = new HashMap<>();
		if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
		String key = Constants.getSysFileMyNoteListMation(id, userToken);
		jedisClient.delKeys(key);//删除父文件夹的redis的key
		String parentId = setParentId(id);
		map.put("parentId", parentId);
		map.put("id", ToolUtil.getSurFaceId());
		map.put("catalogName", name);
		map.put("state", 1);
		map.put("createId", userToken);
		map.put("createTime", ToolUtil.getTimeAndToString());
		appMyNoteDao.insertFileFolderByUserId(map);
		ToolUtil.sendMessageToPageComJson(response, "添加成功", "0");
	}
	
	/**
	 * 
	     * @Title: addNoteContent
	     * @Description: 新增笔记
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppMyNoteController/addNoteContent")
	@ResponseBody
	public void addNoteContent(HttpServletResponse response, @RequestParam String userToken, @RequestParam String pid, @RequestParam String name, @RequestParam String type, @RequestParam String desc, @RequestParam String content) throws Exception{
		Map<String, Object> map = new HashMap<>();
		if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
		String parentId = setParentId(pid);
		map.put("parentId", parentId);
		map.put("id", ToolUtil.getSurFaceId());
		map.put("title", name);
		map.put("state", 1);
		map.put("type", type);
		if(desc.length() > 100){
			desc = desc.substring(0, 99);
        }
		map.put("desc", desc);
		map.put("content", content);
		map.put("createId", userToken);
		map.put("createTime", ToolUtil.getTimeAndToString());
		map.put("iconLogo", "../../assets/images/tpl.png");
		appMyNoteDao.insertMyNoteContentByUserId(map);
		ToolUtil.sendMessageToPageComJson(response, "添加成功", "0");
	}
	
	/**
	 * 
	     * @Title: editNoteFileName
	     * @Description: 编辑文件/笔记的名称
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppMyNoteController/editNoteFileName")
	@ResponseBody
	public void editNoteFileName(HttpServletResponse response, @RequestParam String userToken, @RequestParam String id, @RequestParam String name, @RequestParam String type) throws Exception{
		Map<String, Object> map = new HashMap<>();
		if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
		map.put("id", id);
		map.put("catalogName", name);
		map.put("userId", userToken);
		if("folder".equals(type)){//操作文件夹表
			Map<String, Object> fileParent = appMyNoteDao.quertFolderParentById(map);
			String[] str = fileParent.get("parentId").toString().split(",");
			String key = Constants.getSysFileMyNoteListMation(str[str.length - 1], userToken);
			jedisClient.delKeys(key);//删除父文件夹的redis的key
			appMyNoteDao.editFileFolderById(map);
		}else{//操作笔记表
			appMyNoteDao.editNoteContentNameById(map);
		}
		ToolUtil.sendMessageToPageComJson(response, "编辑成功", "0");
	}
	
	/**
	 * 
	     * @Title: editNoteContent
	     * @Description: 编辑笔记
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppMyNoteController/editNoteContent")
	@ResponseBody
	public void editNoteContent(HttpServletResponse response, @RequestParam String userToken, @RequestParam String id, @RequestParam String name, @RequestParam String desc, @RequestParam String content) throws Exception{
		Map<String, Object> map = new HashMap<>();
		if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
		map.put("id", id);
		map.put("title", name);
		map.put("userId", userToken);
		if(desc.length() > 100){
			desc = desc.substring(0, 99);
        }
		map.put("desc", desc);
		map.put("content", content);
		appMyNoteDao.editMyNoteContentById(map);
		ToolUtil.sendMessageToPageComJson(response, "编辑成功", "0");
	}
	
	/**
	 * 
	     * @Title: deleteFileFolderById
	     * @Description: 删除文件夹以及文件夹下的所有文件
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppMyNoteController/deleteFileFolderById")
	@ResponseBody
	public void deleteFileFolderById(HttpServletResponse response, @RequestParam String userToken, @RequestParam String id, @RequestParam String type) throws Exception{
		Map<String, Object> map = new HashMap<>();
		if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
		map.put("id", id);
		if("folder".equals(type)){//操作文件夹表
			Map<String, Object> fileParent = appMyNoteDao.quertFolderParentById(map);
			String[] str = fileParent.get("parentId").toString().split(",");
			String key = Constants.getSysFileMyNoteListMation(str[str.length - 1], userToken);
			jedisClient.delKeys(key);//删除父文件夹的redis的key
			appMyNoteDao.deleteFileFolderById(map);//删除自身文件夹
			appMyNoteDao.deleteFolderChildByFolderId(map);//删除子文件夹
			appMyNoteDao.deleteFilesByFolderId(map);//删除子文件
		}else{//操作笔记内容表
			appMyNoteDao.deleteNoteContentById(map);//删除自身文件
		}
		ToolUtil.sendMessageToPageComJson(response, "删除成功", "0");
	}
	
	/**
	 * 
	     * @Title: queryMoveToFile
	     * @Description: 获取文件/笔记移动时的选择树
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppMyNoteController/queryMoveToFile")
	@ResponseBody
	public void queryMoveToFile(HttpServletResponse response, @RequestParam String userToken, @RequestParam String id, @RequestParam String type) throws Exception{
		Map<String, Object> map = new HashMap<>();
		List<Map<String, Object>> beans = new ArrayList<>(); 
		if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
		map.put("userId", userToken);
		if(type.equals("folder")){
			map.put("moveId", id);
			beans = appMyNoteDao.queryTreeToMoveByMoveId(map);
		}else{
			beans = appMyNoteDao.queryTreeToMoveByUserId(map);
		}
		beans = ToolUtil.allFileToTreeNote(beans);
		ToolUtil.sendMessageToPageComJson(response, beans);
	}
	
	/**
	 * 
	     * @Title: editNoteToMoveById
	     * @Description: 保存文件/笔记移动后的信息
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/post/AppMyNoteController/editNoteToMoveById")
	@ResponseBody
	public void editNoteToMoveById(HttpServletResponse response, @RequestParam String userToken, @RequestParam String moveid, @RequestParam String toid, @RequestParam String type) throws Exception{
		Map<String, Object> map = new HashMap<>();
		if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
		map.put("userId", userToken);
		String key = Constants.getSysFileMyNoteListMation(toid, userToken);
		jedisClient.delKeys(key);//删除父文件夹的redis的key
		if(type.equals("folder")){
			String newParentId ="";
			if(toid.equals("2")){
				newParentId = "2";
			}else{
				map.put("id", toid);//目标文件夹的id
				Map<String, Object> endFileParent = appMyNoteDao.quertFolderParentById(map);//获取目标文件夹的父id
				newParentId = endFileParent.get("parentId").toString() + toid;//拖拽文件夹新的父id
			}
			String arrId = moveid;
			String arr[] = arrId.split(",");//拖拽文件夹的id数组
			List<Map<String, Object>> folderBeans = new ArrayList<>();
			Map<String, Object> bean;
			for(int i = 0; i < arr.length; i++){
				bean = new HashMap<>();
				bean.put("id", arr[i]);
				folderBeans.add(bean);
			}
			if(!folderBeans.isEmpty()){//选择保存的文件夹不为空
				List<Map<String, Object>> folderNew = appMyNoteDao.queryFileFolderListByList(folderBeans);
				if(!folderNew.isEmpty())//删除之前的信息
					appMyNoteDao.deleteFileFolderListByList(folderNew);
				List<Map<String, Object>> fileNew = appMyNoteDao.queryFileListByList(folderNew);
				if(!fileNew.isEmpty())//删除之前的信息
					appMyNoteDao.deleteFileListByList(fileNew);
				for(Map<String, Object> folder: folderNew){//重置父id
					String[] str = folder.get("parentId").toString().split(",");
					String thiskey = Constants.getSysFileMyNoteListMation(str[str.length - 1], userToken);
					jedisClient.delKeys(thiskey);//删除父文件夹的redis的key
					folder.put("directParentId", str[str.length - 1]);
					folder.put("newId", ToolUtil.getSurFaceId());
				}
				//将数据转化为树的形式，方便进行父id重新赋值
				JSONArray result = ToolUtil.listToTree(JSONArray.parseArray(JSON.toJSONString(folderNew)), "id", "directParentId", "children");
				folderNew = (List<Map<String, Object>>) JSON.parse(result.toJSONString());
				ToolUtil.FileListParentISEdit(folderNew, newParentId);//替换父id
				folderNew = ToolUtil.FileTreeTransList(folderNew);//将树转为list
				for(Map<String, Object> folder: folderNew){
					folder.put("createId", userToken);
					folder.put("createTime", ToolUtil.getTimeAndToString());
					folder.put("state", 1);
				}
				//为文件重置新parentId参数
				for(Map<String, Object> folder: folderNew){
					String parentId = folder.get("parentId").toString() + folder.get("id").toString() + ",";
					String nParentId = folder.get("newParentId").toString() + folder.get("newId").toString() + ",";
					for(Map<String, Object> file: fileNew){
						if(parentId.equals(file.get("parentId").toString())){
							file.put("newParentId", nParentId);
						}
					}
				}
				//为文件重置新参数
				for(Map<String, Object> file: fileNew){
					file.put("newId", ToolUtil.getSurFaceId());
					file.put("createId", userToken);
					file.put("createTime", ToolUtil.getTimeAndToString());
					file.put("state", 1);
				}
				if(!folderNew.isEmpty())
					appMyNoteDao.insertFileFolderListByList(folderNew);
				if(!fileNew.isEmpty())
					appMyNoteDao.insertFileListByList(fileNew);
			}
		}else{
			map.put("id", moveid);
			Map<String, Object> bean = appMyNoteDao.queryMyNoteContentMationById(map);//获取之前的信息
			appMyNoteDao.deleteNoteContentById(map);//删除笔记
			String parentId = setParentId(toid);
			if("0".equals(parentId)){
				ToolUtil.sendMessageToPageComJson(response, "错误的文件夹编码！", "-9999");
				return;
			}
			bean.put("parentId", parentId);
			bean.put("id", ToolUtil.getSurFaceId());
			bean.put("createId", userToken);
			bean.put("createTime", ToolUtil.getTimeAndToString());
			bean.put("state", 1);
			bean.put("iconLogo", "../../assets/images/tpl.png");
			appMyNoteDao.insertMyNoteContentByUserId(bean);//新增笔记
		}
		ToolUtil.sendMessageToPageComJson(response, "保存成功", "0");
	}
	
	/**
	 * 
	     * @Title: setParentId
	     * @Description: 根据节点id设置ParentId
	     * @param @param id
	     * @param @param ParentId
	     * @param @throws Exception    参数
	     * @return String    返回类型
	     * @throws
	 */
	public String setParentId(String id) throws Exception {
		if ("2".equals(id)) {
			return id + ",";
		} else {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("parentId", id);
			Map<String, Object> folderParent = appMyNoteDao.queryFolderParentByFolderId(map);// 查询该文件夹的父id
			if (folderParent != null && !folderParent.isEmpty()) {
				return folderParent.get("parentId").toString() + id + ",";
			} else {
				return "0";
			}
		}
	}
	
}