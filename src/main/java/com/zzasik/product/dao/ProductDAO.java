package com.zzasik.product.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import com.zzasik.product.vo.ProductVO;

@Mapper
@Repository("productDAO")
public interface ProductDAO {
	public List<ProductVO> selectProductList();
	public int insertProduct(@RequestBody ProductVO params);
	public int insertProduct(Map<String, Object> productMap);
	public ProductVO selectProductOne(int pro_code);
	public int updateProduct(Map<String, Object> productMap);
	public int deleteProduct(int pro_code);
	public int updateCount(int pro_code);
	public int updateAvail(int pro_code);
	public int selectTotalCount();
}
