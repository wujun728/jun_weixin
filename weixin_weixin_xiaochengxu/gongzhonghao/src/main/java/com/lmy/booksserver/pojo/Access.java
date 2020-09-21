package com.lmy.booksserver.pojo;

public class Access {
    private int id;
    private String token;
    private int expires;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getExpires() {
        return expires;
    }

    public void setExpires(int expires) {
        this.expires = expires;
    }

    @Override
    public String toString() {
        return "Access{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", expires=" + expires +
                '}';
    }
}
