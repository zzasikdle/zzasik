package com.zzasik.product.service;

import java.util.List;
import java.util.Map;

import com.zzasik.product.vo.ProductVO;

public interface ProductService {
	public List<ProductVO> getProductList();
	public boolean registerProduct(ProductVO params);
	public boolean registerProduct(Map<String, Object> productMap);
	public ProductVO getProductDetail(int pro_code);
	public boolean updateBoard(Map<String, Object> productMap);
	public boolean deleteProduct(int pro_code);
	public int updateCount(int pro_code);
	public int updateAvail(int pro_code);
}
