package com.zzasik.order.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.zzasik.order.vo.OrderDetailVO;
import com.zzasik.order.vo.OrderVO;

@Mapper
@Repository("orderDAO")
public interface OrderDAO {
	public int insertOrder(Map<String, Object> orderMap);
	public int insertOrderDetail(Map<String, Object> orderMap);
	public OrderVO selectOrderOne(int order_code);
	public int selectOrderCode();
	public List<OrderVO> selectOrderList(String user_id);
	public List<OrderDetailVO> selectOrderDetail(Map<String, Object> orderMap);
	public int deleteOrder(int order_code);
	public int updateOrderDetail(Map<String, Object> orderMap);
	public int insertPay(Map<String, Object> orderMap);
	public int updateStatus1(int order_code);
}