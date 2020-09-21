package com.javen.controller;

import java.io.File;
import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.upload.UploadFile;

/**
 * @author Javen
 */
public class FileController extends Controller {
	public void index(){
		render("file.jsp");
	}
	
	public void add(){
		StringBuffer sbf=new StringBuffer();
		List<UploadFile> files = getFiles();
		String uploadPath = null;
		if (null!=files && files.size()>0) {
			//获取长传文件的路径
			uploadPath=files.get(0).getUploadPath();
		}
		for (int i = 0; i < files.size(); i++) {
			sbf.append(files.get(i).getFileName());
			files.get(i).getFile().renameTo(new File(uploadPath+File.separator+"javen"+i+".jpg"));
		}
//		for (UploadFile uploadFile : files) {
//			sbf.append(uploadFile.getFileName());
//			
//		}
		
		UploadFile uploadFile = getFile("img");
		//获取文件名称
		String fileName=uploadFile.getFileName();
		//获取长传文件的路径
		uploadPath=uploadFile.getUploadPath();
		//文件重命名
		uploadFile.getFile().renameTo(new File(uploadPath+File.separator+"javen.jpg"));
		renderText(uploadPath+" "+fileName+"  "+sbf.toString());
	}
}
