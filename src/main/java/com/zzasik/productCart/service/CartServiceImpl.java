package com.zzasik.productCart.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.zzasik.product.vo.ProductVO;
import com.zzasik.productCart.dao.CartDAO;
import com.zzasik.productCart.vo.CartVO;

@Service("cartService")
@Transactional(propagation = Propagation.REQUIRED)
public class CartServiceImpl implements CartService {

	@Autowired
	private CartDAO cartDAO;
	
	@Override
	public List getCartList(String user_id) {		
		return cartDAO.selectCartList(user_id);
	}

	@Override
	public boolean registerCart(Map<String, Object> CartMap) {
		int queryResult = 0;
		
		queryResult = cartDAO.insertCart(CartMap);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true : false;
	}

	@Override
	public boolean deleteCart(Map<String, Object> map) {
		int queryResult = 0;
		
		queryResult = cartDAO.deleteCart(map);
		System.out.println("queryResult : "+queryResult);
		
		return (queryResult == 1) ? true : false;
	}
	
	@Override
	public boolean deleteAllCart(String user_id) {
		int queryResult = 0;
		
		queryResult = cartDAO.deleteAllCart(user_id);
		System.out.println("queryResult : "+queryResult);
		
		return (queryResult > 0) ? true : false;
	}

	@Override
	public int countCart(Map<String, Object> CartMap) {
		return cartDAO.selectCountCart(CartMap);
	}

	@Override
	public boolean updateCart(Map<String, Object> CartMap) {	
		int queryResult = 0;
		
		queryResult = cartDAO.updateCart(CartMap);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true : false;
	}

	@Override
	public boolean modifyCart(Map<String, Object> CartMap) {
		int queryResult = 0;
		
		queryResult = cartDAO.modifyCart(CartMap);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true : false;
	}
}
