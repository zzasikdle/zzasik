package com.zzasik.order.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.zzasik.order.vo.OrderVO;

@Mapper
@Repository("orderDAO")
public interface OrderDAO {
	public int insertOrder(Map<String, Object> orderMap);
	public OrderVO selectOrderOne(int order_code);
	public int selectOrderCode();
	public List<OrderVO> selectOrderList(String user_id);
	public int deleteOrder(int order_code);
}
package com.zzasik.order.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.zzasik.order.vo.OrderVO;

@Mapper
@Repository("orderDAO")
public interface OrderDAO {
	public int insertOrder(Map<String, Object> orderMap);
	public OrderVO selectOrderOne(int order_id);
	public int selectOrderCode();
	public List<OrderVO> selectOrderList(String user_id);
}
