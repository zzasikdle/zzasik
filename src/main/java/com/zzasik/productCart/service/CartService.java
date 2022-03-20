package com.zzasik.productCart.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestParam;

import com.zzasik.product.vo.ProductVO;
import com.zzasik.productCart.vo.CartVO;

public interface CartService {
	public List getCartList(String user_id);
	public boolean registerCart(Map<String, Object> CartMap);
	public boolean deleteCart(Map<String, Object> map);
	public boolean deleteAllCart(String user_id);
	public int countCart(Map<String, Object> CartMap);
	public boolean updateCart(Map<String, Object> CartMap);
	public boolean modifyCart(Map<String, Object> CartMap);
}
