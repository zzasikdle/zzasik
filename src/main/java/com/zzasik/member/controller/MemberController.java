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
	private MemberService memberService ;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	public MemberController() {
		
	}
	
	/* 濡쒓렇�씤 */
	@PostMapping("/member/login")
	public  Map<String, Object> loginCheck(@RequestBody MemberVO memberVO ) throws Exception {
		// json �삎�깭濡� 諛쏄린�쐞�빐�꽌 RequestBody濡� �븿. 
		// object濡� �븳 �씠�쑀: �떎�뼇�븳 �삎�깭�쓽 媛믪쓣諛쏄린�쐞�븿.
		System.out.printf("%s %s \n", memberVO.getUser_id(), memberVO.getUser_pwd());
		
		boolean success = true ;
		
		
		// �빐�떆 鍮꾨�踰덊샇 �씪移� �뿬遺�
		MemberVO hashedPwd = memberService.findPasswordById(memberVO);
		//System.out.println(hashedPwd.getUser_pwd());
		if(!passwordEncoder.matches(memberVO.getUser_pwd(), hashedPwd.getUser_pwd() )  ) {
			System.out.println("wrong password");
			success = false;
			System.out.println(success);
		}
		
		// id留� 媛�吏�怨� �쑀�� �젙蹂� 媛��졇�삤湲� . �뼱李⑦뵾 鍮꾨�踰덊샇�뒗 �빐�떆濡� �씪移섏뿬遺� 嫄몃��쓬.
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
	
	/* �쉶�썝媛��엯 */
	
	@PostMapping("/member/join") 
	public  Map<String, Object> memberJoin(@RequestBody MemberVO memberVO ) throws Exception {
		// json �삎�깭濡� 諛쏄린�쐞�빐�꽌 RequestBody濡� �븿. 
		// object濡� �븳 �씠�쑀: �떎�뼇�븳 �삎�깭�쓽 媛믪쓣諛쏄린�쐞�븿.
		System.out.printf("%s %s \n", memberVO.getUser_id(), memberVO.getUser_pwd(), memberVO.getUser_name());
		
		int result = memberService.insertMember(memberVO); // 諛곗넚吏� �씠�쇅�쓽 �젙蹂� ���옣.
		int addResult = memberService.insertAddress(memberVO); // 諛곗넚吏� ���옣.
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user_id", memberVO.getUser_id());
			
		System.out.println(map);   
		return map;  
	}
	
	/* �쉶�썝 �븘�씠�뵒 以묐났 泥댄겕 */
	@PostMapping("/member/memberIdCheck")
	public  Map<String, Object> memberIdCheck(@RequestBody MemberVO memberVO ) throws Exception {
	
		System.out.println(memberVO.getUser_id());
		
		String user_id = memberVO.getUser_id(); 
		
		System.out.println(user_id);
		
		int cnt = memberService.findMemberById(user_id); // 議댁옱�븯�뒗 id硫�  cnt =1 �씪 寃�.
		// 議댁옱�븯吏� �븡�쑝硫� null �뿉�윭媛� �굹踰꾨┝ . �뼱�뼸寃� �븯吏�? -> try ~ catch臾몄쑝濡� null �뿉�윭 諛쏄린.
		
		
		System.out.println("議댁옱�븯�뒗 �븘�씠�뵒 �엯�땲�떎. : "+ memberVO.getUser_name());
		
		boolean existing =  cnt != 0 ? true : false; // cnt媛� 1�씠硫� true(以묐났�맂�븘�씠�뵒) , 0�씠硫� false (�궗�슜媛��뒫�븘�씠�뵒 ) 
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("existing", existing);
			
		System.out.println(map);   
		return map; 
	}
	
	/* �쉶�썝 �젙蹂� �닔�젙 ( �씠由� )  */
	
	@PostMapping("/member/modMemberName")
	public  Map<String, Object> modMemberName(@RequestBody MemberVO memberVO ) throws Exception {
	
		// 濡쒓렇�씤�븳 �꽭�뀡ID瑜� 諛쏆븘���꽌 洹� �븘�씠�뵒濡� db寃��깋 �썑 諛쏆븘�삩 �젙蹂� �닔�젙. 
		// 諛쏆븘�삤�뒗 �젙蹂� input 李� name�� MemberVO�� 媛숆쾶 �빐�빞 �븣�븘�꽌 留ㅼ묶.
		// 諛붽씀吏� �븡�� �젙蹂대뒗 
		System.out.println(memberVO.getUser_id());
		System.out.println(memberVO.getUser_name());
		
		String user_id = memberVO.getUser_id();  // �꽭�뀡�뿉�꽌 諛쏆븘�삩 �븘�씠�뵒.
		String user_name = memberVO.getUser_name(); // 諛붽씀怨좎옄 �븯�뒗 �씠由�.

		try {
			
			int modResult = memberService.modMemberName(memberVO);		//family�뿉 �뜲�씠�꽣 insert 
			
		}catch (Exception e) {
				e.printStackTrace();
			}
		
		Map<String, Object> map = new HashMap<String, Object>();
			
		return map; 
	}
	
	/* �쉶�썝 �젙蹂� �닔�젙 ( �쑕���쟾�솕 )  */
	
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
	
	
}
