package com.zzasik.productCart.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.zzasik.product.vo.ProductVO;
import com.zzasik.productCart.vo.CartVO;

@Mapper
@Repository("cartDAO")
public interface CartDAO {
	public List selectCartList(String user_id);
	public int insertCart(Map<String, Object> cartMap);
	public int deleteCart(Map<String, Object> map);
	public int deleteAllCart(String user_id);
	public int selectTotalCount();
	public int selectCountCart(Map<String, Object> CartMap);
	public int updateCart(Map<String, Object> cartMap);
	public int modifyCart(Map<String, Object> cartMap);
}
