package com.gs.common.bean;

import java.util.List;

/**
 * Created by Wang Genshen on 2017-07-04.
 */
public class Pager<T> {

    private int page;
    private int pageSize;

    private int total;
    private List<T> results;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<T> getResults() {
        return results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }

    public int getBeginIndex() {
        return (page - 1) * pageSize;
    }
}
