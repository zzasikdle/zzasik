package com.zzasik.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zzasik.member.service.MemberService;
import com.zzasik.member.vo.MemberVO;

@CrossOrigin("*")
@RestController
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	public MemberController() {
		
	}
	
	@PostMapping("/member/login")
	public Map<String,Object> loginCheck(@RequestBody MemberVO memberVO) throws Exception{
		
		System.out.printf("%s %s \n", memberVO.getUser_id(), memberVO.getUser_pwd());
		
		MemberVO dto = memberService.login(memberVO);
		
		boolean success =  dto != null ? true : false;
	
		Map<String, Object> map = new HashMap<String, Object>();
	
		map.put("user_id", memberVO.getUser_id());
		map.put("success", success);
		
		if(success) {		  
		    map.put("user_name", dto.getUser_name());
		}		
		System.out.println(map);   
		return map;
	}
	
}
