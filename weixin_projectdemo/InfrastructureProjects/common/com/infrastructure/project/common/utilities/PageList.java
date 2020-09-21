package com.infrastructure.project.common.utilities;

import java.util.List;

/**
 * 分页类实现
 * @author misswhen
 *
 * @param <Entity>
 */
public class PageList<Entity> implements IPageList<Entity>{
    /**
     * 总记录数
     */
	private int itemCount;
	/**
	 * 当前页码
	 */
    private int pageIndex;
    /**
     * 每页显示记录数
     */
    private int pageSize;
    /**
     * 总页数
     */
    private int pageCount;
    /**
     * 是否首页
     */
    private boolean hasPre;
    /**
     * 是否尾页
     */
    private boolean hasNext;
    /**
     * 数据内容
     */
    private List<Entity> items;
    
    public PageList(int itemCount, int pageIndex, int pageSize, List<Entity> items) {
        this.itemCount = itemCount;
        this.pageSize = pageSize;
        this.pageCount=(itemCount % pageSize == 0) ? itemCount/pageSize :itemCount/pageSize+1;
        this.pageIndex=pageIndex>pageCount?pageCount:pageIndex;
        this.hasPre=pageIndex>1;
        this.hasNext=pageIndex<pageCount;
        
        if (items != null)
            this.items = items;
    }
    
    public int getItemCount() {
        return this.itemCount;
    }
    
    public int getPageIndex(){
    	return this.pageIndex;
    }
    
    public int getPageSize() {
        return this.pageSize;
    }
    
    public int getPageCount() {
    	return this.pageCount;
    }
    
    public boolean getHasPre(){
    	return this.hasPre;
    }
    
    public boolean getHasNext(){
    	return this.hasNext;
    }
    
    public List<Entity> getItems(){
    	return this.items;
    }
    
    public String resolveUrl(String url, String queryString, Integer pageNo, Integer pageSize){
    	if(queryString==null)
    		queryString=new String();
    	else
    		queryString=queryString.replaceAll("&pageNo=\\d*", "").replaceAll("pageNo=\\d*", "").replaceAll("&pageSize=\\d*", "").replaceAll("pageSize=\\d*", "");
    	
    	if(pageNo!=null)
			queryString=queryString.isEmpty()?"pageNo="+pageNo.toString():queryString+"&pageNo="+pageNo.toString();
		if(pageSize!=null)
			queryString=queryString.isEmpty()?"pageSize="+pageSize.toString():queryString+"&pageSize="+pageSize.toString();
    	
    	return queryString.isEmpty()?url:url+"?"+queryString;
    }
}
