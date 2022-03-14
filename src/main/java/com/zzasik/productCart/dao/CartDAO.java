package com.zzasik.productCart.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.zzasik.product.vo.ProductVO;
import com.zzasik.productCart.vo.CartVO;

@Mapper
@Repository("cartDAO")
public interface CartDAO {
	public List selectCartList(String user_id);
	public int insertCart(Map<String, Object> cartMap);
	public int deleteCart(String user_id, int pro_code);
	public int selectTotalCount();
}
