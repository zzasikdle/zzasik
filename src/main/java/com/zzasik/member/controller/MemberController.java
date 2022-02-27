package com.zzasik.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@PostMapping("/member/login")
	public  Map<String, Object> loginCheck(@RequestBody MemberVO memberVO ) throws Exception {
	
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
	
	/* �쉶�썝媛��엯 */
	
	@PostMapping("/member/join") 
	public  Map<String, Object> memberJoin(@RequestBody MemberVO memberVO ) throws Exception {
		// json �삎�깭濡� 諛쏄린�쐞�빐�꽌 RequestBody濡� �븿. 
		// object濡� �븳 �씠�쑀: �떎�뼇�븳 �삎�깭�쓽 媛믪쓣諛쏄린�쐞�븿.
		System.out.printf("%s %s \n", memberVO.getUser_id(), memberVO.getUser_pwd(), memberVO.getUser_name());
		int result = memberService.insertMember(memberVO);
		//boolean success =  result != null ? true : false; // dto 媛믪씠 �엳�쑝硫� true(�쉶�썝媛��엯 �꽦怨�) �뾾�쑝硫� false ( �쉶�썝媛��엯 �떎�뙣 ) 
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user_id", memberVO.getUser_id());
		//map.put("success", success);
			
		System.out.println(map);   
		return map;  
	}
	
	/* �쉶�썝 �븘�씠�뵒 以묐났 泥댄겕 */
	@PostMapping("/member/memberIdCheck")
	public  Map<String, Object> memberIdCheck(@RequestBody MemberVO memberVO ) throws Exception {
	
		System.out.println(memberVO.getUser_id());
		MemberVO dto = memberService.findMemberById(memberVO); // 議댁옱�븯�뒗 id硫� dto�뿉 name�씠 �떞寃쇱쓣寃�.
		boolean existing =  dto != null ? true : false; // dto 媛믪씠 �엳�쑝硫� true(以묐났�맂�븘�씠�뵒) �뾾�쑝硫� false (�궗�슜媛��뒫�븘�씠�뵒 ) 
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("existing", existing);
			
		System.out.println(map);   
		return map; 
	}
	
	
	
}
