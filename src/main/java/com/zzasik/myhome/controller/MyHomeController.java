package com.zzasik.myhome.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zzasik.member.vo.MemberVO;
import com.zzasik.myhome.service.MyHomeService;

@CrossOrigin("http://localhost:3000")
@RestController
public class MyHomeController {
	@Autowired
	private MyHomeService myhomeService;
	
	@GetMapping("/myhome")
	public  Map<String,Object> userInfo(@RequestParam String user_id) throws Exception{
		return myhomeService.getUserInfo(user_id);
		
	}
	
	@GetMapping("/admin/listMembers")
	public List<MemberVO> listMembers() throws Exception{
		List<MemberVO> membersList = myhomeService.listMembers();
		return membersList;
	}
	
}
