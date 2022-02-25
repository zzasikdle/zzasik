package com.zzasik.product.vo;

public class ProductVO {
	private int pro_num;			//상품 번호
	private String pro_name;		//상품명
	private String pro_class;		//분류
	private int pro_available;		//재고수량
	private int pro_price;			//상품 가격
	private String pro_img;			//상품 이미지
	private String pro_detailimg;	//상품 상세 정보
	//private int sel_num;
	
	public int getPro_num() {
		return pro_num;
	}
	
	public void setPro_num(int pro_num) {
		this.pro_num = pro_num;
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
	
	public String getPro_detailimg() {
		return pro_detailimg;
	}
	
	public void setPro_detailimg(String pro_detailimg) {
		this.pro_detailimg = pro_detailimg;
	}
}
