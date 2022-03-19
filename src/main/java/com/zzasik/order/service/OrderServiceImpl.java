package com.zzasik.order.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zzasik.order.dao.OrderDAO;
import com.zzasik.order.vo.OrderDetailVO;
import com.zzasik.order.vo.OrderVO;

@Service("orderService")
@Transactional(propagation = Propagation.REQUIRED)
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderDAO orderDAO;
	
	@Override
	public boolean AddOrder(Map<String, Object> orderMap) {
		int queryResult = 0;
		
		queryResult = orderDAO.insertOrder(orderMap);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true: false ;
	}
	
	@Override
	public boolean AddOrderDetail(Map<String, Object> orderMap) {
		int queryResult = 0;
		
		queryResult = orderDAO.insertOrderDetail(orderMap);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true: false ;
	}

	@Override
	public OrderVO CheckProduct(int order_code) {
		return orderDAO.selectOrderOne(order_code);
	}

	@Override
	public String GetMaxOrderCode() {
		int code = orderDAO.selectOrderCode();
		String maxCode = Integer.toString(code);
		return maxCode;
	}

	@Override
	public List<OrderVO> getOrderList(String user_id) {
		List<OrderVO> orderList = orderDAO.selectOrderList(user_id);		
		return orderList;
	}
	
	@Override
	public List selectOrderDetail(Map<String, Object> orderMap) {
		List detailList = orderDAO.selectOrderDetail(orderMap);		
		return detailList;
	}

	@Override
	public boolean deleteProduct(int order_code) {
		int queryResult = 0;
		
		OrderVO order = orderDAO.selectOrderOne(order_code);
		
		if(order != null) {
			queryResult = orderDAO.deleteOrder(order_code);
		}
		
		return (queryResult == 1) ? true : false;
	}

	@Override
	public boolean AddPay(Map<String, Object> orderMap) {
		int queryResult = 0;
		
		queryResult = orderDAO.insertPay(orderMap);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true: false ;
	}

	@Override
	public boolean updateStatus1(int order_code) {
		int queryResult = 0;
		
		queryResult = orderDAO.updateStatus1(order_code);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true: false ;
	}
}
