package com.zzasik.member.controller;

import java.io.File;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	private MemberService memberService ;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	  
	public MemberController() {
		 
	}
	
	/* 로그인 */
	@PostMapping("/member/login")
	public  Map<String, Object> loginCheck(@RequestBody MemberVO memberVO , HttpServletRequest request) throws Exception {
		// json 형태로 받기위해서 RequestBody로 함. 
		// object로 한 이유: 다양한 형태의 값을받기위함.
		
		boolean success = true ;
		
		
		// 해시 비밀번호 일치 여부
		MemberVO hashedPwd = memberService.findPasswordById(memberVO);
		if(!passwordEncoder.matches(memberVO.getUser_pwd(), hashedPwd.getUser_pwd() )  ) {
			System.out.println("wrong password");
			success = false;
		}
		
		// id만 가지고 유저 정보 가져오기 . 어차피 비밀번호는 해시로 일치여부 걸렀음.
		MemberVO dto = memberService.login(memberVO);
		
		//boolean success =  dto != null ? true : false;
		
		//현수님 요청
		HttpSession session = request.getSession();
		session.setAttribute("survey_code", dto.getSurvey_code());
		//현수님 요청
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("user_id", memberVO.getUser_id());
		map.put("success", success);
		map.put("user_name", dto.getUser_name());
		map.put("phone", dto.getPhone());
		map.put("classification", dto.getClassification());
		map.put("survey_code", dto.getSurvey_code());
		
		if(success) {		  
		    map.put("user_name", dto.getUser_name());
		}		
		return map;
	}
	
	/* 회원가입 */
	
	@PostMapping("/member/join") 
	public  Map<String, Object> memberJoin(@RequestBody MemberVO memberVO ) throws Exception {
		// json 형태로 받기위해서 RequestBody로 함. 
		// object로 한 이유: 다양한 형태의 값을받기위함.
		
		int result = memberService.insertMember(memberVO); // 배송지 이외의 정보 저장.
		int addResult = memberService.insertAddress(memberVO); // 배송지 저장.
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user_id", memberVO.getUser_id());
			
		return map;  
	}
	
	/* 회원 아이디 중복 체크 */
	@PostMapping("/member/memberIdCheck")
	public  Map<String, Object> memberIdCheck(@RequestBody MemberVO memberVO ) throws Exception {
	
		
		String user_id = memberVO.getUser_id(); 
		
		
		int cnt = memberService.findMemberById(user_id); // 議댁옱�븯�뒗 id硫�  cnt =1 �씪 寃�.
		// 議댁옱�븯吏� �븡�쑝硫� null �뿉�윭媛� �굹踰꾨┝ . �뼱�뼸寃� �븯吏�? -> try ~ catch臾몄쑝濡� null �뿉�윭 諛쏄린.
		
		
		System.out.println("議댁옱�븯�뒗 �븘�씠�뵒 �엯�땲�떎. : "+ memberVO.getUser_name());
		
		boolean existing =  cnt != 0 ? true : false; // cnt媛� 1�씠硫� true(以묐났�맂�븘�씠�뵒) , 0�씠硫� false (�궗�슜媛��뒫�븘�씠�뵒 ) 
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("existing", existing);
			
		return map; 
	}
	
	/* 회원 정보 수정 ( 이름 )  */
	
	@PostMapping("/member/modMemberName")
	public  Map<String, Object> modMemberName(@RequestBody MemberVO memberVO ) throws Exception {
	
		// 로그인한 세션ID를 받아와서 그 아이디로 db검색 후 받아온 정보 수정. 
		// 받아오는 정보 input 창 name은 MemberVO와 같게 해야 알아서 매칭.
		// 바꾸지 않은 정보는 
		
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
	
		String user_id = memberVO.getUser_id();  // �꽭�뀡�뿉�꽌 諛쏆븘�삩 �븘�씠�뵒.
		String phone = memberVO.getPhone();// 諛붽씀怨좎옄 �븯�뒗 �씠由�.

		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			
			int modResult = memberService.modMemberPhone(memberVO);		//family�뿉 �뜲�씠�꽣 insert 
			map.put("message", "�쑕���쟾�솕踰덊샇媛� 蹂�寃� �릺�뿀�뒿�땲�떎."); 
			
		}catch (Exception e) {
			map.put("message", "�쑕���쟾�솕踰덊샇媛� 蹂�寃쎌뿉 �떎�뙣 �븯���뒿�땲�떎."); 
				e.printStackTrace();
			}
		return map; 
	}
	
	/* 諛곗넚吏� 由ъ뒪�듃 媛��졇�삤湲� */
	//@RequestParam("user_id") String user_id
	@GetMapping("/member/listAddress")
	public List<AddressVO> listAddress(@RequestParam("user_id") String user_id , HttpServletRequest request, HttpServletResponse response) throws Exception {
	  
		MemberVO memberVO = new MemberVO();
		memberVO.setUser_id(user_id);
		System.out.println("�뀒�뒪�듃以묒엯�땲�떎." + memberVO.getUser_id());
		List<AddressVO> AddressList = memberService.listAddress(memberVO);	
	    System.out.println(AddressList);
			
	   return AddressList;
		
	}
	
	/* 배송지 수정 */
	
	 // 기존의 배송지 리스트 가져오기 
	@GetMapping("/member/getAddress")
	public AddressVO getAddress(@RequestParam("user_id") String user_id , 
			@RequestParam("addr_receiver") String addr_receiver,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
	  
		MemberVO memberVO = new MemberVO();
		memberVO.setUser_id(user_id);
		memberVO.setAddr_receiver(addr_receiver);
		
		System.out.println(memberVO.getUser_id());
		System.out.println(memberVO.getAddr_receiver());

		AddressVO addressVO = new AddressVO();
		addressVO = memberService.getAddress(memberVO);
		System.out.println(addressVO.getAddr_receiver());
		
	   return addressVO;
	}
	
	 // 배송지 수정
	@PostMapping("/member/updateAddress") 
	public  Map<String, Object> updateAddress(@RequestBody AddressVO addressVO ) throws Exception {
		
		System.out.println(addressVO.getUser_id());
		System.out.println(addressVO.getAddr_receiver());
		System.out.println(addressVO.getAddr_Revisedreceiver());
		System.out.println(addressVO.getAddr_1());
		System.out.println(addressVO.getAddr_2());
		System.out.println(addressVO.getAddr_3());
		
		
		
		
		int addResult = memberService.updateAddress(addressVO); // 배송지 저장.
		
		
		System.out.println(addResult);
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("message", "배송지가 수정 되었습니다."); 
		//map.put("path", "/myhome/myAddress");
		
		return map;  
	}
	
	
	
	/* 배송지 추가 하기 */
	
	@PostMapping("/member/addAddress") 
	public  Map<String, Object> addAddress(@RequestBody AddressVO addressVO ) throws Exception {
		
		int addResult = memberService.addAddress(addressVO); // 배송지 저장.
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("message", "배송지가 추가 되었습니다."); 
		//map.put("path", "/myhome/myAddress");
		
		return map;  
	}
	
	/* 배송지 삭제 */
	@PostMapping("/member/deleteAddress")
	public void deleteAddress(@RequestBody AddressVO addressVO) throws Exception{
	  int delete = memberService.deleteAddress(addressVO); 
	}

	/* 회원 탈퇴 */
	@PostMapping("/member/deleteId")
	public void deleteId(@RequestBody MemberVO memberVO) throws Exception{
	  int delete = memberService.deleteId(memberVO); 
	  System.out.println(delete);
	}
	
	
}
