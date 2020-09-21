package com.zzkun.dao;

import com.zzkun.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Administrator on 2016/6/17.
 */
@Repository
public class UserDao {

    @Autowired
    private JdbcTemplate jdbc;

    private class UserInfoRowMapper implements RowMapper<UserInfo> {
        @Override
        public UserInfo mapRow(ResultSet resultSet, int i) throws SQLException {
            UserInfo userInfo = new UserInfo();
            userInfo.setAddress(resultSet.getString("address"));
            userInfo.setAppid(resultSet.getString("appid"));
            userInfo.setPhone(resultSet.getString("phone"));
            userInfo.setRedValue(resultSet.getDouble("redvalue"));
            userInfo.setUsername(resultSet.getString("username"));
            return userInfo;
        }
    }

    public UserInfo getUserInfoByUserAppid(String appid) {
        String sql = "SELECT * FROM userinfo WHERE userinfo.appid = ?";
        return jdbc.queryForObject(sql, new UserInfoRowMapper(), appid);
    }

    public void addUserInfo(UserInfo info) {
        String sql = "INSERT INTO `userinfo` (`appid`, `username`, `phone`, `address`, `redvalue`) VALUES (?, ?, ?, ?, ?)";
        jdbc.update(sql, info.getAppid(), info.getUsername(), info.getPhone(), info.getAddress(), info.getRedValue());
    }

    public boolean hasUserInfo(String appid) {
        String sql = "SELECT COUNT(*) FROM userinfo WHERE appid=?";
        int cnt = jdbc.queryForObject(sql, Integer.class, appid);
        return cnt >= 1;
    }

    public void modifyUserRedBagValue(String appid, double det) {
        double val = getUserInfoByUserAppid(appid).getRedValue() + det;
        String sql = "UPDATE userinfo SET userinfo.redvalue = ? WHERE appid = ?";
        jdbc.update(sql, val, appid);
    }
}
