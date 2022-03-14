package com.zzasik.product.vo;

import org.springframework.stereotype.Component;

@Component("productVO")
public class ProductVO {
	private int pro_code;			//상품 번호
	private String pro_name;		//상품명
	private String pro_class;		//분류
	private int pro_available;		//재고수량
	private int pro_price;			//상품 가격
	private String pro_img;			//상품 이미지
	private String pro_detail;		//상품 상세 정보
	private int pro_count;			//상품 조회수
	
	public int getPro_code() {
		return pro_code;
	}
	
	public void setPro_code(int pro_code) {
		this.pro_code = pro_code;
	}
	
	public String getPro_name() {
		return pro_name;
	}
	
	public void setPro_name(String pro_name) {
		this.pro_name = pro_name;
	}
	
	public String getPro_class() {
		return pro_class;
	}
	
	public void setPro_class(String pro_class) {
		this.pro_class = pro_class;
	}
	
	public int getPro_available() {
		return pro_available;
	}
	
	public void setPro_available(int pro_available) {
		this.pro_available = pro_available;
	}
	
	public int getPro_price() {
		return pro_price;
	}
	
	public void setPro_price(int pro_price) {
		this.pro_price = pro_price;
	}
	
	public String getPro_img() {
		return pro_img;
	}
	
	public void setPro_img(String pro_img) {
		this.pro_img = pro_img;
	}
	
	public String getPro_detail() {
		return pro_detail;
	}
	
	public void setPro_detail(String pro_detail) {
		this.pro_detail = pro_detail;
	}

	public int getPro_count() {
		return pro_count;
	}

	public void setPro_count(int pro_count) {
		this.pro_count = pro_count;
	}
	
}
