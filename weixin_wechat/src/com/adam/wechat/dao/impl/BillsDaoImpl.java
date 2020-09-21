package com.adam.wechat.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.adam.wechat.bean.Bill;
import com.adam.wechat.dao.BillsDao;
import com.adam.wechat.util.DBHelper;

public class BillsDaoImpl implements BillsDao {

	private Bill bill;
	public Bill getBill() {
		return bill;
	}

	public void setBill(Bill bill) {
		this.bill = bill;
	}

	public boolean saveBill(Bill bill) {
		// TODO Auto-generated method stub
		String sql = "INSERT INTO Bills VALUES(?,?,?,?,?)";
		
		DBHelper dBhelper = new DBHelper();
		Connection conn = dBhelper.getDBhelper();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(sql);
			ps.setString(1, bill.getGoods());
			ps.setString(2, bill.getTel());
			ps.setString(3, bill.getName());
			ps.setString(4, bill.getDate());
			ps.setString(5, bill.getOrdertime());
			int i = ps.executeUpdate();
			System.out.println(i);
			if (i > 0) {
				return true;
			}
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally {
			try {
				conn.close();
			}
			catch (SQLException e) {
				// TODO Auto-generated catch block
				conn = null;
				e.printStackTrace();
			}
		}
		
		return false;
	}

	public List<Bill> queryBills(Map<String, String> map) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("select * from Bills where 1=1 ");
		String goods = map.get("goods");
		if (goods != null && !"".equalsIgnoreCase(goods)) {
			sb.append(" and goods like '%" + goods + "%'");
		}
		String name = map.get("name");
		if (name != null && !"".equalsIgnoreCase(name)) {
			sb.append(" and name like '%" + name + "%'");
		}
		String tel = map.get("tel");
		if (tel != null && !"".equalsIgnoreCase(tel)) {
			sb.append(" and tel like '%" + tel + "%'");
		}
		String date = map.get("date");
		if (date != null && !"".equalsIgnoreCase(date)) {
			sb.append(" and date like '%" + date + "%'");
		}
		String ordertime = map.get("ordertime");
		if (ordertime != null && !"".equalsIgnoreCase(ordertime)) {
			sb.append(" and ordertime like '%" + ordertime + "%'");
		}
		
		DBHelper dBhelper = new DBHelper();
		Connection conn = dBhelper.getDBhelper();
		List list = new ArrayList();

		Statement stat;
		try {
			stat = conn.createStatement();
			ResultSet rs = stat.executeQuery(sb.toString());
			Bill bill = new Bill();
			bill.setId(rs.getString(1));
			bill.setGoods(rs.getString(2));
			bill.setTel(rs.getString(3));
			bill.setName(rs.getString(4));
			bill.setDate(rs.getString(5));
			bill.setOrdertime(rs.getString(6));
			list.add(bill);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally {
			try {
				conn.close();
			}
			catch (SQLException e) {
				// TODO Auto-generated catch block
				conn = null;
				e.printStackTrace();
			}
		}
		
		return list;
	}

}
