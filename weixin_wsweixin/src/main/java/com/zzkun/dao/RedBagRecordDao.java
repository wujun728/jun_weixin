package com.zzkun.dao;

import com.zzkun.model.RedBagRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

/**
 * Created by Administrator on 2016/6/17.
 */
@Repository
public class RedBagRecordDao {

    @Autowired
    private JdbcTemplate jdbc;

    private class RedRecordRowMapper implements RowMapper<RedBagRecord> {
        @Override
        public RedBagRecord mapRow(ResultSet resultSet, int i) throws SQLException {
            RedBagRecord record = new RedBagRecord();
            record.setAppid(resultSet.getString("appid"));
            record.setId(resultSet.getInt("id"));
            record.setTime(resultSet.getTimestamp("time").toLocalDateTime());
            record.setType(resultSet.getString("type"));
            record.setValue(resultSet.getDouble("value"));
            return record;
        }
    }

    public List<RedBagRecord> getAllRecordByAppid(String appid) {
        String sql = "SELECT * FROM redrecord WHERE redrecord.appid = ? ORDER BY redrecord.time DESC";
        return jdbc.query(sql, new RedRecordRowMapper(), appid);
    }

    public void addRecord(RedBagRecord record) {
        String sql = "INSERT INTO `redrecord` (`appid`, `time`, `value`, `type`) VALUES (?, ?, ?, ?)";
        jdbc.update(sql, record.getAppid(), record.getTime(), record.getValue(), record.getType());
    }

    public boolean hasTodayRecord(String appid) {
        String sql = "SELECT COUNT(*) FROM redrecord WHERE redrecord.time >= ? AND redrecord.appid = ? AND redrecord.type = ?";
        int cnt = jdbc.queryForObject(sql, Integer.class, LocalDate.now(), appid, RedBagRecord.TYPE_DAILY);
        return cnt >= 1;
    }

    public boolean hasRadBagRecord(String appid) {
        String sql = "SELECT COUNT(*) FROM redrecord WHERE redrecord.appid = ? AND redrecord.type = ?";
        int cnt = jdbc.queryForObject(sql, Integer.class, appid, RedBagRecord.TYPE_DAILY);
        return cnt >= 1;
    }
}
