package com.zzasik.myhome.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zzasik.member.vo.MemberVO;
import com.zzasik.myhome.vo.NoticeVO;
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
	
	@GetMapping("/notice")
	public List<NoticeVO> listNotices() throws Exception{
		List<NoticeVO> noticesList = myhomeService.listNotices();
		return noticesList;
		
	}
	
	/* 회원 권한 수정  */
	@PostMapping("/admin/handleClassification")
	public void handleClassification(@RequestBody MemberVO memberVO ) throws Exception {
	
		System.out.println("권한을 수정할 user_id : " + memberVO.getUser_id());
		System.out.println("어떤 권한으로 바꿀건지 : " + memberVO.getClassification());
		
		//String userId = memberVO.getUser_id();
		
		int cnt = myhomeService.handleClassification(memberVO); 
		// 업데이트 에 성공하면 성공한 행이 갯수를 반환함 update쿼리
		//System.out.println(cnt);
		  
	}
	
	
}
