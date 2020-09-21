package com.lmy.booksserver.pojo;

import java.io.Serializable;

public class Book implements Serializable {
    private int bkid;
    private int bkclass;
    private String bkname;
    private String bkauthor;
    private String bkpublisher;
    private String bkfile;
    private String bkcover;
    private int bkprice;

    public int getBkid() {
        return bkid;
    }

    public void setBkid(int bkid) {
        this.bkid = bkid;
    }

    public int getBkclass() {
        return bkclass;
    }

    public void setBkclass(int bkclass) {
        this.bkclass = bkclass;
    }

    public String getBkname() {
        return bkname;
    }

    public void setBkname(String bkname) {
        this.bkname = bkname;
    }

    public String getBkauthor() {
        return bkauthor;
    }

    public void setBkauthor(String bkauthor) {
        this.bkauthor = bkauthor;
    }

    public String getBkpublisher() {
        return bkpublisher;
    }

    public void setBkpublisher(String bkpublisher) {
        this.bkpublisher = bkpublisher;
    }

    public String getBkfile() {
        return bkfile;
    }

    public void setBkfile(String bkfile) {
        this.bkfile = bkfile;
    }

    public String getBkcover() {
        return bkcover;
    }

    public void setBkcover(String bkcover) {
        this.bkcover = bkcover;
    }

    public int getBkprice() {
        return bkprice;
    }

    public void setBkprice(int bkprice) {
        this.bkprice = bkprice;
    }


    @Override
    public String toString() {
        return "Book{" +
                "bkid=" + bkid +
                ", bkclass=" + bkclass +
                ", bkname='" + bkname + '\'' +
                ", bkauthor='" + bkauthor + '\'' +
                ", bkpublisher='" + bkpublisher + '\'' +
                ", bkfile='" + bkfile + '\'' +
                ", bkcover='" + bkcover + '\'' +
                ", bkprice=" + bkprice +
                '}';
    }
}
