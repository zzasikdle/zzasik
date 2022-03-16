package com.zzasik.order.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.zzasik.member.service.MemberService;
import com.zzasik.member.vo.AddressVO;
import com.zzasik.member.vo.MemberVO;
import com.zzasik.myhome.service.MyHomeService;
import com.zzasik.order.service.OrderService;
import com.zzasik.order.vo.OrderVO;
import com.zzasik.product.vo.ProductVO;

@CrossOrigin("http://localhost:3000")
@RestController("orderController")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private MyHomeService myhomeService;
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping(value="/order/userInfo")
	public Map<String,Object> getBuyerInfo(@RequestParam("user_id") String user_id) throws Exception {		
		Map<String, Object> memInfomap = new HashMap<String, Object>();
		memInfomap = myhomeService.getUserInfo(user_id);
		System.out.println(memInfomap);
		
		MemberVO memberVO = new MemberVO();
		memberVO.setUser_id(user_id);
		List<AddressVO> addressList = memberService.listAddress(memberVO);
		
		memInfomap.put("addressList", addressList);
		System.out.println(memInfomap);
		
		return memInfomap;
	}
	
	@PostMapping(value="/order/addProduct")
	public ResponseEntity AddOrder(MultipartHttpServletRequest multipartRequest) throws Exception {		
		multipartRequest.setCharacterEncoding("utf-8");
		
		Map<String, Object> orderMap = new HashMap<String, Object>();
		Enumeration enu = multipartRequest.getParameterNames();
		while(enu.hasMoreElements()) {
			String name = (String) enu.nextElement();
			String value = multipartRequest.getParameter(name);
			System.out.printf("%s %s\n", name, value);
			orderMap.put(name, value);
		}
		
		Map<String, String> map = new HashMap<String, String>();
		ResponseEntity resEnt = null;
		HttpHeaders responseHeader = new HttpHeaders();
		responseHeader.add("Content-Type", "application/json; charset=utf-8");
		
		boolean isRegistered = orderService.AddOrder(orderMap);
		System.out.println(isRegistered);
		
		if(isRegistered == false) {
			System.out.println("실패");
			map.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
			map.put("path", "/user/cart");
		} else {
			System.out.println("성공");
			map.put("message", "상품 정보를 확인해주세요.");
			map.put("path", "/order/check");
			String order_code = orderService.GetMaxOrderCode();
			map.put("order_code", order_code);
		}
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}
	
	@GetMapping(value="/order/checkProduct")
	public OrderVO CheckProduct(@RequestParam("order_code") String order_code) {
		System.out.println(order_code);
		int code = Integer.parseInt(order_code);
		OrderVO order = orderService.CheckProduct(code);
		System.out.println("=========");
		System.out.println(order.getOrder_code());
		System.out.println(order.getOrder_price());
		System.out.println("=========");
		return order;
	}
}
