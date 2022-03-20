package com.zzasik.product.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.zzasik.product.dao.ProductDAO;
import com.zzasik.product.vo.ProductVO;

@Service("productService")
@Transactional(propagation = Propagation.REQUIRED)
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductDAO productDAO;
	
	@Override
	public List<ProductVO> getProductList() {
		List<ProductVO> productList = Collections.emptyList();
		
		int productTotalCount = productDAO.selectTotalCount();
		
		if(productTotalCount >= 0) {
			productList = productDAO.selectProductList();
		}
		
		return productList;
	}

	@Override
	public boolean registerProduct(ProductVO params) {
		int queryResult = 0;
		
		queryResult = productDAO.insertProduct(params);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true : false;
	}
	
	@Override
	public boolean registerProduct(Map<String, Object> productMap) {
		int queryResult = 0;
		
		queryResult = productDAO.insertProduct(productMap);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true: false ;
	}

	@Override
	public ProductVO getProductDetail(int pro_code) {		
		return productDAO.selectProductOne(pro_code);
	}

	@Override
	public boolean updateBoard(Map<String, Object> productMap) {
		int queryResult = 0;
		
		queryResult = productDAO.updateProduct(productMap);
		
		return (queryResult == 1) ? true : false;
	}

	@Override
	public boolean deleteProduct(int pro_code) {
		int queryResult = 0;
		
		ProductVO product = productDAO.selectProductOne(pro_code);
		
		if(product != null) {
			queryResult = productDAO.deleteProduct(pro_code);
		}
		
		return (queryResult == 1) ? true : false;
	}

	@Override
	public int updateCount(int pro_code) {
		return productDAO.updateCount(pro_code);
	}

	@Override
	public boolean updateAvail(Map<String, Object> map) {
		int queryResult = 0;
		
		queryResult = productDAO.updateAvail(map);
		System.out.println(queryResult);
		
		return (queryResult == 1) ? true : false;
	}

}
