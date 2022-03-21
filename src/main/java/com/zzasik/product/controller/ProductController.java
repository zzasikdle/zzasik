package com.zzasik.product.controller;

import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.zzasik.member.service.MemberService;
import com.zzasik.member.vo.AddressVO;
import com.zzasik.member.vo.MemberVO;
import com.zzasik.myhome.service.MyHomeService;
import com.zzasik.product.service.ProductService;
import com.zzasik.product.vo.ProductVO;

@CrossOrigin("*")
@RestController("productController")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductVO productVO;
	
	/* 상품 목록 */
	@GetMapping(value="/product/listProducts")
	@PostMapping(value="/product/listProducts")
	public List<ProductVO> listProduct() {
		List<ProductVO> productList = productService.getProductList();
		for(ProductVO product : productList) {
			if(product != null) {
				System.out.println(product.getPro_name());
			}
		}
		return productList;
	}
	
	@PostMapping(value="/product/addProduct")
	public ResponseEntity registerProduct(MultipartHttpServletRequest multipartRequest) throws Exception {		
		multipartRequest.setCharacterEncoding("utf-8");
		
		Map<String, Object> productMap = new HashMap<String, Object>();
		Enumeration enu = multipartRequest.getParameterNames();
		while(enu.hasMoreElements()) {
			String name = (String) enu.nextElement();
			String value = multipartRequest.getParameter(name);
			System.out.printf("%s %s\n", name, value);
			productMap.put(name, value);
		}
		
		Map<String, String> map = new HashMap<String, String>();
		ResponseEntity resEnt = null;
		HttpHeaders responseHeader = new HttpHeaders();
		responseHeader.add("Content-Type", "application/json; charset=utf-8");
		
		//boolean isRegistered = productService.registerProduct(params);
		boolean isRegistered = productService.registerProduct(productMap);
		System.out.println(isRegistered);
		
		if(isRegistered == false) {
			System.out.println("상품 등록 실패");
			map.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
			map.put("path", "/product/new");
		} else {
			System.out.println("새 상품 등록");
			map.put("message", "상품을 추가했습니다.");
			map.put("path", "/product");
		}
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}
	
	@PutMapping(value="/product/modifyProduct")
	public ResponseEntity modifyProduct(MultipartHttpServletRequest multipartRequest, @RequestParam("pro_code") int pro_code) throws Exception {
		multipartRequest.setCharacterEncoding("utf-8");
		System.out.println("수정");
		
		Map<String, Object> productMap = new HashMap<String, Object>();
		Enumeration enu = multipartRequest.getParameterNames();
		while(enu.hasMoreElements()) {
			String name = (String) enu.nextElement();
			String value = multipartRequest.getParameter(name);
			System.out.printf("%s %s\n", name, value);
			productMap.put(name, value);
		}
		
		//String pro_code = (String) productMap.get("pro_code");
		//System.out.println("pro_code :" + pro_code);
		Map<String, String> map = new HashMap<String, String>();
		ResponseEntity resEnt = null;
		HttpHeaders responseHeader = new HttpHeaders();
		responseHeader.add("Content-Type", "application/json; charset=utf-8");
		
		boolean isUpdated = productService.updateBoard(productMap);
		System.out.println(isUpdated);
		if(isUpdated == false) {
			System.out.println("상품 수정 실패");
			map.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
			map.put("path", "/product/view/"+pro_code);
		} else {
			System.out.println(pro_code + "번 상품 수정");
			map.put("message", "상품을 수정했습니다.");
			map.put("path", "/product");
		}
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}
	
	@DeleteMapping(value="/product/removeProduct")
	public ResponseEntity deleteProduct(@RequestParam("pro_code") int pro_code,
			HttpServletRequest request, HttpServletResponse response) {
		
		ResponseEntity resEnt = null;
		
		HttpHeaders responseHeader = new HttpHeaders();
		responseHeader.add("Content-Type", "application/json; charset=utf-8");
		
		Map<String, String> map = new HashMap<String, String>();
		
		boolean isDeleted = productService.deleteProduct(pro_code);
		if(isDeleted == false) {
			System.out.println("상품 삭제 실패");
			map.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
			map.put("path", "/product/view/"+pro_code);
		} else {
			System.out.println(pro_code + "번 상품 삭제");
			map.put("message", "상품을 삭제했습니다.");
			map.put("path", "/product");
		}
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}
	
	@GetMapping(value="/admin/product/viewProduct")
	public ProductVO openProductDetailAdmin(@RequestParam("pro_code") int pro_code) {
		ProductVO product = productService.getProductDetail(pro_code);
		//System.out.println("pro_code : "+pro_code);
		//Map<String, Object> map = new HashMap<String, Object>();
		//map.put("product", product);
		return product;
	}
	
	@GetMapping(value="/user/product/viewProduct")
	public ProductVO openProductDetailClient(@RequestParam("pro_code") int pro_code) {
		ProductVO product = productService.getProductDetail(pro_code);
		productService.updateCount(pro_code);
		//productService.updateAvail(pro_code);
		return product;
	}
	
}
