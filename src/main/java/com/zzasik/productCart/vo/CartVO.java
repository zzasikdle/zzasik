package com.zzasik.productCart.vo;

import org.springframework.stereotype.Component;

import com.zzasik.product.vo.ProductVO;

@Component("cartVO")
public class CartVO {
	private String user_id;
	private int pro_code;
	private int quantity;
	
	private ProductVO productVO;
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public int getPro_code() {
		return pro_code;
	}
	public void setPro_code(int pro_code) {
		this.pro_code = pro_code;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
