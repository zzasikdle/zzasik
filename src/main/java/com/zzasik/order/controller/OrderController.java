package com.zzasik.order.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.zzasik.member.service.MemberService;
import com.zzasik.member.vo.AddressVO;
import com.zzasik.member.vo.MemberVO;
import com.zzasik.myhome.service.MyHomeService;
import com.zzasik.order.service.OrderService;
import com.zzasik.order.vo.OrderDetailVO;
import com.zzasik.order.vo.OrderVO;
import com.zzasik.product.vo.ProductVO;
import com.zzasik.productCart.service.CartService;
import com.zzasik.productCart.vo.CartVO;

@CrossOrigin("*")
@RestController("orderController")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private CartService cartService;
	
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
	
	@GetMapping(value="/order/listOrder")
	public List<OrderVO> getOrderList(@RequestParam("user_id") String user_id) {
		List<OrderVO> orderList = orderService.getOrderList(user_id);
		return orderList;
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
		
		String user_id = (String) orderMap.get("user_id");
		String order_code = orderService.GetMaxOrderCode();
		orderMap.put("order_code", order_code);
		System.out.println(order_code);
		
		System.out.println("==="+orderMap.containsKey("pro_code"));
		
		boolean isRegistered = orderService.AddOrder(orderMap);
		System.out.println(isRegistered);
		
		if(isRegistered == false) {
			System.out.println("실패");
			map.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
			map.put("path", "/user/cart");
		} else {
			System.out.println("성공");
			map.put("message", "구매자 정보를 확인해주세요.");
			map.put("path", "/order/check");
			map.put("order_code", order_code);
			
			if(orderMap.containsKey("pro_code")) {
				boolean isis = orderService.AddOrderDetail(orderMap);
				System.out.println("=="+isis);
			} else {
				List<CartVO> list = cartService.getCartList(user_id);
				System.out.println(list);
				
				for(int i=0; i<list.size(); i++) {
					Map<String, Object> detailMap = new HashMap<String, Object>();
					detailMap.put("order_code", order_code);
					detailMap.put("pro_code", list.get(i).getPro_code());
					detailMap.put("quantity", list.get(i).getQuantity());
					
					boolean isis = orderService.AddOrderDetail(detailMap);
					System.out.println(isis);
				}
			}
			
			cartService.deleteAllCart(user_id);
		}
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}

	@GetMapping(value="/order/checkProduct")
	public OrderVO CheckProduct(@RequestParam("order_code") int order_code) {
		OrderVO order = orderService.CheckProduct(order_code);
		System.out.println("=========");
		System.out.println(order.getOrder_code());
		System.out.println(order.getOrder_price());
		System.out.println("=========");
		return order;
	}
	
	@GetMapping(value="/order/payOrder")
	public ResponseEntity PayProduct(@RequestParam("order_code") int order_code, @RequestParam("user_id") String user_id,
			HttpServletRequest request, HttpServletResponse response) {
				
		ResponseEntity resEnt = null;
		
		HttpHeaders responseHeader = new HttpHeaders();
		responseHeader.add("Content-Type", "application/json; charset=utf-8");
		
		Map<String, Object> pmap = new HashMap<String, Object>();
		pmap.put("user_id", user_id);
		pmap.put("order_code", order_code);
		
		Map<String, String> map = new HashMap<String, String>();
		
		boolean IsAdd = orderService.AddPay(pmap);
		System.out.println(IsAdd);
		
		if(IsAdd == false) {
			System.out.println("상품 결제 실패");
			map.put("path", "/");
		} else {
			System.out.println(order_code + "번 주문 결제 완료");
			orderService.updateStatus1(order_code);
			map.put("path", "/myhome/myOrder");
		}
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}
	
	@GetMapping(value="/order/viewOrder")
	public List PayProduct(@RequestParam("user_id") String user_id, @RequestParam("order_code") int order_code) {		
		Map<String, Object> dmap = new HashMap<String, Object>();
		dmap.put("user_id", user_id);
		dmap.put("order_code", order_code);
		
		List detailList = orderService.selectOrderDetail(dmap);
		return detailList;
	}
	
	@DeleteMapping(value="/order/removeOrder")
	public ResponseEntity deleteOrder(@RequestParam("order_code") int order_code,
			HttpServletRequest request, HttpServletResponse response) {
		
		ResponseEntity resEnt = null;
		
		HttpHeaders responseHeader = new HttpHeaders();
		responseHeader.add("Content-Type", "application/json; charset=utf-8");
		
		Map<String, String> map = new HashMap<String, String>();
		
		boolean isDeleted = orderService.deleteProduct(order_code);
		if(isDeleted == false) {
			System.out.println("상품 삭제 실패");
			map.put("path", "/");
		} else {
			System.out.println(order_code + "번 주문 삭제");
			map.put("path", "/");
		}
		resEnt = new ResponseEntity(map, responseHeader, HttpStatus.CREATED);
		return resEnt;
	}
}