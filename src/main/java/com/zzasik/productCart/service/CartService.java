package com.zzasik.productCart.service;

import java.util.List;
import java.util.Map;

import com.zzasik.product.vo.ProductVO;
import com.zzasik.productCart.vo.CartVO;

public interface CartService {
	public List getCartList(String user_id);
	public boolean registerCart(Map<String, Object> CartMap);
	public boolean deleteCart(String user_id, int pro_code);
	public int countCart(Map<String, Object> CartMap);
	public boolean updateCart(Map<String, Object> CartMap);
	public boolean modifyCart(Map<String, Object> CartMap);
}
