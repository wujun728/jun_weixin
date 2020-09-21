package com.app.dao;

import java.util.List;
import java.util.Map;

public interface AppMyNoteDao {
	
	public List<Map<String, Object>> queryFileAndContentList(Map<String, Object> map) throws Exception;
	
	public Map<String, Object> queryMyNoteContentMationById(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> queryNewNote(Map<String, Object> map) throws Exception;
	
	public int insertFileFolderByUserId(Map<String, Object> map) throws Exception;
	
	public int insertMyNoteContentByUserId(Map<String, Object> map) throws Exception;
	
	public Map<String, Object> queryFolderParentByFolderId(Map<String, Object> map) throws Exception;
	
	public int editFileFolderById(Map<String, Object> map) throws Exception;
	
	public int editNoteContentNameById(Map<String, Object> map) throws Exception;
	
	public int editMyNoteContentById(Map<String, Object> map) throws Exception;
	
    public int deleteFileFolderById(Map<String, Object> map) throws Exception;
	
	public int deleteFilesByFolderId(Map<String, Object> map) throws Exception;
	
	public int deleteFolderChildByFolderId(Map<String, Object> map) throws Exception;
	
	public int deleteNoteContentById(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> queryTreeToMoveByMoveId(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> queryTreeToMoveByUserId(Map<String, Object> map) throws Exception;
	
	public Map<String, Object> quertFolderParentById(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> queryFileFolderListByList(List<Map<String, Object>> folderBeans) throws Exception;
	
	public int deleteFileFolderListByList(List<Map<String, Object>> folderBeans) throws Exception;
	
	public List<Map<String, Object>> queryFileListByList(List<Map<String, Object>> folderNew) throws Exception;
	
	public int deleteFileListByList(List<Map<String, Object>> folderNew) throws Exception;
	
	public int insertFileFolderListByList(List<Map<String, Object>> folderNew) throws Exception;

	public int insertFileListByList(List<Map<String, Object>> fileNew) throws Exception;
	
}
