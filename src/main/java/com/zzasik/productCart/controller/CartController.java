package com.zzasik.productCart.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.zzasik.product.vo.ProductVO;

public class CartController {
	
	@GetMapping(value="/user/cart")
	public List<ProductVO> openCart() {
		List<ProductVO> list = null;
		return list;
	}
}
