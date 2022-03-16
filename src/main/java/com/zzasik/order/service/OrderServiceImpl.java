package com.zzasik.order.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zzasik.order.dao.OrderDAO;
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
	public OrderVO CheckProduct(int order_id) {
		return orderDAO.selectOrderOne(order_id);
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

}
