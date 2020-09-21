package com.javen.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.util.Streams;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.core.Controller;
import com.jfinal.kit.PathKit;
import com.jfinal.upload.UploadFile;
import com.oreilly.servlet.multipart.FilePart;
import com.oreilly.servlet.multipart.MultipartParser;
import com.oreilly.servlet.multipart.ParamPart;
import com.oreilly.servlet.multipart.Part;

public class AjaxFileContorlller extends Controller{
	public void index(){
		render("ajaxfile.jsp");
	}
	
	/**
     * 异步单文件上传
     */
    public void uploadImg(){
    	Date date = new Date();
		String strDate = new SimpleDateFormat("yyyyMMdd").format(date);
		int maxfile = 5 * 1024 * 1024;	
		 JSONObject json = new JSONObject();
		try{
			UploadFile uploadfile = getFile("imgsil","/temp/"+strDate,maxfile, "UTF-8");
			File f=uploadfile.getFile();
			String fileName="/myupload/temp/" +strDate+"/"+System.currentTimeMillis()+getFileExt(uploadfile.getFileName());
			f.renameTo(new File(PathKit.getWebRootPath()+fileName));

		    json.put("error", 0);
            json.put("src", fileName);
		}catch(Exception e){
			json.put("error", 1);
            json.put("message", e.getMessage()==null?"上传文件出错":e.getMessage());
		}		
        renderJson(json.toJSONString());
    }
	/**
     * 异步多文件上传
     */
    public void uploadImgMul(){
    	Map<String,String> paramMap=new HashMap<String, String>();  
//    	List<Map<String,String>> fileList=new ArrayList<Map<String, String>>(); 
    	
    	JSONObject json = new JSONObject();
		List<String> fileno=new ArrayList<String>();
    	
    	MultipartParser mp;
		try {
			mp = new MultipartParser(this.getRequest(),52428800,false,false,"UTF-8");
			Date date = new Date();
			String strDate = new SimpleDateFormat("yyyyMMdd").format(date);
	    	Part part=null;
	    	while((part=mp.readNextPart())!=null){
	    		if(part.isParam()){
	    			ParamPart param=(ParamPart) part;
	    			String name=param.getName();
	    			String value=param.getStringValue();
	    			if(paramMap.get(name)==null){
	    				paramMap.put(name, value);
	    			}
	    		}else if(part.isFile()){
	    			FilePart filePart=(FilePart) part;
//	    			Map<String,String> fileMap=new HashMap<String, String>();  
	    			
	    			String fileName="/myupload/temp/" +strDate+"/"+System.currentTimeMillis()+getFileExt(filePart.getFileName());
	    			
//	    			fileMap.put(filePart.getName(), fileName);
	    			FileOutputStream out =new FileOutputStream(PathKit.getWebRootPath()+fileName);
	    		    Streams.copy(filePart.getInputStream(),out,true);
	    		    fileno.add(fileName);
	    		    json.put("error", 0);
	                json.put("src", fileno);
//	    			fileList.add(fileMap);
	    		}
	    	}
		} catch (IOException e) {
			json.put("error", 1);
            json.put("message", e.getMessage()==null?"上传文件出错":e.getMessage());
			e.printStackTrace();
		}   	
    	renderJson(json.toJSONString());
    }
    /**
     * 获取文件后缀
     * @param @param fileName
     * @param @return 设定文件
     * @return String 返回类型
     */
    public static String getFileExt(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.'), fileName.length());
    }
   
}
