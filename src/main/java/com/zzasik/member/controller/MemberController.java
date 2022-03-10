package com.zzasik.member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zzasik.member.service.MemberService;
import com.zzasik.member.vo.AddressVO;
import com.zzasik.member.vo.MemberVO;

@CrossOrigin("http://localhost:3000")
@RestController
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	 
	public MemberController() {
		
	}
	
	/* 로그인 */
	@PostMapping("/member/login")
	public  Map<String, Object> loginCheck(@RequestBody MemberVO memberVO ) throws Exception {
		// json 형태로 받기위해서 RequestBody로 함. 
		// object로 한 이유: 다양한 형태의 값을받기위함.
		System.out.printf("%s %s \n", memberVO.getUser_id(), memberVO.getUser_pwd());
		
		boolean success = true ;
		
		
		// 해시 비밀번호 일치 여부
		MemberVO hashedPwd = memberService.findPasswordById(memberVO);
		//System.out.println(hashedPwd.getUser_pwd());
		if(!passwordEncoder.matches(memberVO.getUser_pwd(), hashedPwd.getUser_pwd() )  ) {
			System.out.println("wrong password");
			success = false;
			System.out.println(success);
		}
		
		// id만 가지고 유저 정보 가져오기 . 어차피 비밀번호는 해시로 일치여부 걸렀음.
		MemberVO dto = memberService.login(memberVO);
		
		//boolean success =  dto != null ? true : false;
		
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("user_id", memberVO.getUser_id());
		map.put("success", success);
		map.put("user_name", dto.getUser_name());
		map.put("phone", dto.getPhone());
		map.put("classification", dto.getClassification());
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
		
		int result = memberService.insertMember(memberVO); // 배송지 이외의 정보 저장.
		int addResult = memberService.insertAddress(memberVO); // 배송지 저장.
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user_id", memberVO.getUser_id());
			
		System.out.println(map);   
		return map;  
	}
	
	/* 회원 아이디 중복 체크 */
	@PostMapping("/member/memberIdCheck")
	public  Map<String, Object> memberIdCheck(@RequestBody MemberVO memberVO ) throws Exception {
	
		System.out.println(memberVO.getUser_id());
		
		String user_id = memberVO.getUser_id(); 
		
		System.out.println(user_id);
		
		int cnt = memberService.findMemberById(user_id); // 존재하는 id면  cnt =1 일 것.
		// 존재하지 않으면 null 에러가 나버림 . 어떻게 하지? -> try ~ catch문으로 null 에러 받기.
		
		
		System.out.println("존재하는 아이디 입니다. : "+ memberVO.getUser_name());
		
		boolean existing =  cnt != 0 ? true : false; // cnt가 1이면 true(중복된아이디) , 0이면 false (사용가능아이디 ) 
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("existing", existing);
			
		System.out.println(map);   
		return map; 
	}
	
	/* 회원 정보 수정 ( 이름 )  */
	
	@PostMapping("/member/modMemberName")
	public  Map<String, Object> modMemberName(@RequestBody MemberVO memberVO ) throws Exception {
	
		// 로그인한 세션ID를 받아와서 그 아이디로 db검색 후 받아온 정보 수정. 
		// 받아오는 정보 input 창 name은 MemberVO와 같게 해야 알아서 매칭.
		// 바꾸지 않은 정보는 
		System.out.println(memberVO.getUser_id());
		System.out.println(memberVO.getUser_name());
		
		String user_id = memberVO.getUser_id();  // 세션에서 받아온 아이디.
		String user_name = memberVO.getUser_name(); // 바꾸고자 하는 이름.

		try {
			
			int modResult = memberService.modMemberName(memberVO);		//family에 데이터 insert 
			
		}catch (Exception e) {
				e.printStackTrace();
			}
		
		Map<String, Object> map = new HashMap<String, Object>();
			
		return map; 
	}
	
	/* 회원 정보 수정 ( 휴대전화 )  */
	
	@PostMapping("/member/modMemberPhone")
	public  Map<String, Object> modMemberPhone(@RequestBody MemberVO memberVO ) throws Exception {
	
		String user_id = memberVO.getUser_id();  // 세션에서 받아온 아이디.
		String phone = memberVO.getPhone();// 바꾸고자 하는 이름.

		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			
			int modResult = memberService.modMemberPhone(memberVO);		//family에 데이터 insert 
			map.put("message", "휴대전화번호가 변경 되었습니다."); 
			
		}catch (Exception e) {
			map.put("message", "휴대전화번호가 변경에 실패 하였습니다."); 
				e.printStackTrace();
			}
		return map; 
	}
	
	/* 배송지 리스트 가져오기 */
	//@RequestParam("user_id") String user_id
	@GetMapping("/member/listAddress")
	public List<AddressVO> listAddress(@RequestParam("user_id") String user_id , HttpServletRequest request, HttpServletResponse response) throws Exception {
	  
		MemberVO memberVO = new MemberVO();
		memberVO.setUser_id(user_id);
		System.out.println("테스트중입니다." + memberVO.getUser_id());
		List<AddressVO> AddressList = memberService.listAddress(memberVO);	
	    System.out.println(AddressList);
			
	   return AddressList;
		
	}
	
	
}
