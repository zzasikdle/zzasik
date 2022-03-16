package com.zzasik.order.service;

import java.util.List;
import java.util.Map;

import com.zzasik.order.vo.OrderVO;

public interface OrderService {
	public boolean AddOrder(Map<String, Object> orderMap);
	public OrderVO CheckProduct(int order_id);
	public String GetMaxOrderCode();
	public List<OrderVO> getOrderList(String user_id);
}