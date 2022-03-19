package com.zzasik.order.vo;

import java.util.List;

import org.springframework.stereotype.Component;

import com.zzasik.product.vo.ProductVO;

@Component("orderDetailVO")
public class OrderDetailVO {
	private int quantity;
	private int order_code;
	private int pro_code;
	
	private List<ProductVO> productList;
	
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getOrder_code() {
		return order_code;
	}
	public void setOrder_code(int order_code) {
		this.order_code = order_code;
	}
	public int getPro_code() {
		return pro_code;
	}
	public void setPro_code(int pro_code) {
		this.pro_code = pro_code;
	}
	public List<ProductVO> getProductList() {
		return productList;
	}
	public void setProductList(List<ProductVO> productList) {
		this.productList = productList;
	}
}
