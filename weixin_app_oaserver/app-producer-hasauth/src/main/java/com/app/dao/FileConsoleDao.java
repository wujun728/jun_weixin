package com.app.dao;

import java.util.List;
import java.util.Map;

public interface FileConsoleDao {

	public Map<String, Object> queryFolderParentByFolderId(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryFilesListByFolderId(Map<String, Object> map) throws Exception;

}
