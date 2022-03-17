package com.zzasik.productCart.controller;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.zzasik.product.service.ProductService;
import com.zzasik.product.vo.ProductVO;
import com.zzasik.productCart.service.CartService;
import com.zzasik.productCart.vo.CartVO;

@CrossOrigin("http://localhost:3000")
@RestController("cartController")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CartVO cartVO;
	
	@Autowired
	private ProductVO productVO;
	
	@GetMapping(value="/cart/listProducts")
	public List<CartVO> openCart(@RequestParam("user_id") String user_id) {
		List<CartVO> cartList = cartService.getCartList(user_id);
		
		for(CartVO cart : cartList) {
			if(cart != null) {
				System.out.println(cart.getUser_id());
				System.out.println(cart.getPro_code());
				List<ProductVO> list = cart.getProductList();
				for(ProductVO product : list) {
					System.out.println(product.getPro_name());
				}
			}
		}
		return cartList;
	}
	
	@PostMapping(value="/cart/addProduct")
	public ResponseEntity registerCart(MultipartHttpServletRequest multipartRequest) throws Exception {		
		multipartRequest.setCharacterEncoding("utf-8");
		
		Map<String, Object> cartMap = new HashMap<String, Object>();
		Enumeration enu = multipartRequest.getParameterNames();
		while(enu.hasMoreElements()) {
			String name = (String) enu.nextElement();
			String value = multipartRequest.getParameter(name);
			System.out.printf("%s %s\n", name, value);
			cartMap.put(name, value);
		}
		
		Map<String, String> map = new HashMap<String, String>();
		ResponseEntity resEnt = null;
		HttpHeaders responseHeader = new HttpHeaders();
		responseHeader.add("Content-Type", "application/json; charset=utf-8");
		
		int count = cartService.countCart(cartMap);
		if(count == 0) {
			boolean isRegistered = cartService.registerCart(cartMap);
			System.out.println(isRegistered);
			
			if(isRegistered == false) {
				System.out.println("장바구니 실패");
				map.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
				map.put("path", "/shop/product");
			} else {
				System.out.println("장바구니 등록");
				map.put("message", "장바구니에 상품을 추가했습니다.");
				map.put("path", "/user/cart");
			}
		} else {
			boolean isUpdated = cartService.updateCart(cartMap);
			System.out.println(isUpdated);
			
			if(isUpdated == false) {
				System.out.println("장바구니 실패");
				map.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
				map.put("path", "/shop/product");
			} else {
				System.out.println("장바구니 등록");
				map.put("message", "장바구니에 상품을 추가했습니다.");
				map.put("path", "/user/cart");
			}
		}
		
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}
	
	@DeleteMapping(value="/cart/removeProduct")
	public ResponseEntity deleteCart(@RequestParam("user_id") String user_id, @RequestParam("pro_code") int pro_code,
			HttpServletRequest request, HttpServletResponse response) {
		
		ResponseEntity resEnt = null;
		
		HttpHeaders responseHeader = new HttpHeaders();
		responseHeader.add("Content-Type", "application/json; charset=utf-8");
		
		Map<String, String> map = new HashMap<String, String>();
		
		boolean isDeleted = cartService.deleteCart(user_id, pro_code);
		if(isDeleted == false) {
			System.out.println("장바구니 삭제 실패");
			map.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
			map.put("path", "/user/cart");
		} else {
			System.out.println("상품 장바구니 삭제");
			map.put("message", "글을 삭제했습니다.");
			map.put("path", "/user/cart");
		}
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}
	
	@PutMapping(value="/cart/modifyCart")
	public ResponseEntity modifyProduct(MultipartHttpServletRequest multipartRequest,
			@RequestParam("user_id") String user_id, @RequestParam("pro_code") int pro_code) throws Exception {
		multipartRequest.setCharacterEncoding("utf-8");
		System.out.println("수정");
		
		Map<String, Object> cartMap = new HashMap<String, Object>();
		Enumeration enu = multipartRequest.getParameterNames();
		while(enu.hasMoreElements()) {
			String name = (String) enu.nextElement();
			String value = multipartRequest.getParameter(name);
			System.out.printf("%s %s\n", name, value);
			cartMap.put(name, value);
		}
		
		Map<String, String> map = new HashMap<String, String>();
		ResponseEntity resEnt = null;
		HttpHeaders responseHeader = new HttpHeaders();
		responseHeader.add("Content-Type", "application/json; charset=utf-8");
		
		boolean isUpdated = cartService.modifyCart(cartMap);
		System.out.println(isUpdated);
		if(isUpdated == false) {
			System.out.println("수정 실패");
			map.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
		} else {
			System.out.println(pro_code + "번 상품 수량 수정");
			System.out.println("변경된 수량 : "+cartMap.get("quantity"));
			map.put("message", "상품을 수정했습니다.");
		}
		map.put("path", "/user/cart");
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}
}
