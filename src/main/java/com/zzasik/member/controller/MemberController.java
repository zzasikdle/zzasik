package com.zzasik.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.zzasik.member.service.MemberService;
import com.zzasik.member.vo.MemberVO;

@CrossOrigin("http://localhost:3000")
@RestController
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	public MemberController() {
		
	}
	
	/* 로그인 */
	@PostMapping("/member/login")
	public  Map<String, Object> loginCheck(@RequestBody MemberVO memberVO ) throws Exception {
		// json 형태로 받기위해서 RequestBody로 함. 
		// object로 한 이유: 다양한 형태의 값을받기위함.
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
	
	/* 회원가입 */
	
	@PostMapping("/member/join") 
	public  Map<String, Object> memberJoin(@RequestBody MemberVO memberVO ) throws Exception {
		// json 형태로 받기위해서 RequestBody로 함. 
		// object로 한 이유: 다양한 형태의 값을받기위함.
		System.out.printf("%s %s \n", memberVO.getUser_id(), memberVO.getUser_pwd(), memberVO.getUser_name());
		int result = memberService.insertMember(memberVO);
		//boolean success =  result != null ? true : false; // dto 값이 있으면 true(회원가입 성공) 없으면 false ( 회원가입 실패 ) 
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user_id", memberVO.getUser_id());
		//map.put("success", success);
			
		System.out.println(map);   
		return map;  
	}
	
	/* 회원 아이디 중복 체크 */
	@PostMapping("/member/memberIdCheck")
	public  Map<String, Object> memberIdCheck(@RequestBody MemberVO memberVO ) throws Exception {
	
		System.out.println(memberVO.getUser_id());
		MemberVO dto = memberService.findMemberById(memberVO); // 존재하는 id면 dto에 name이 담겼을것.
		boolean existing =  dto != null ? true : false; // dto 값이 있으면 true(중복된아이디) 없으면 false (사용가능아이디 ) 
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("existing", existing);
			
		System.out.println(map);   
		return map; 
	}
	
	
	
}
