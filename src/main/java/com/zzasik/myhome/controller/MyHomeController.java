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
	
	/*怨듭��궗�빆 由ъ뒪�듃 媛��졇�삤湲�*/
	@GetMapping("/notice")
	public List<NoticeVO> listNotices() throws Exception{
		List<NoticeVO> noticesList = myhomeService.listNotices();
		return noticesList;
		
	}
	
	/*怨듭��궗�빆 湲� �옉�꽦*/
	@GetMapping("/notice/new")
	public void writeNotice(@RequestParam String title, @RequestParam String editorToHtml) throws Exception{
		NoticeVO noticeVO = new NoticeVO();
		noticeVO.setNotice_code(myhomeService.getNewNoticeNum()+1);
		noticeVO.setNotice_title(title);
		noticeVO.setNotice_content(mysqlSafe(editorToHtml));
		
		myhomeService.writeNotice(noticeVO);
		
	}
	/*怨듭��궗�빆 湲� 蹂닿린*/
	@GetMapping("/notice/view")
	public NoticeVO viewNotice(@RequestParam int notice_code) throws Exception{
		return myhomeService.viewNotice(notice_code);
	}
	
	/*怨듭��궗�빆 湲� �궘�젣*/
	@GetMapping("notice/del")
	public void delNotice(@RequestParam int notice_code) throws Exception{
		myhomeService.delNotice(notice_code);
	}
	
	/*怨듭��궗�빆 湲� �닔*/
	@GetMapping("notice/edit")
	public void editNotice(@RequestParam int notice_code,@RequestParam String title, @RequestParam String editorToHtml) throws Exception{
		NoticeVO noticeVO = new NoticeVO();
		noticeVO.setNotice_code(notice_code);
		noticeVO.setNotice_title(title);
		noticeVO.setNotice_content(editorToHtml);
		
		myhomeService.editNotice(noticeVO);
	}
	
	/* �쉶�썝 沅뚰븳 �닔�젙  */
	@PostMapping("/admin/handleClassification")
	public void handleClassification(@RequestBody MemberVO memberVO ) throws Exception {
	
		System.out.println("沅뚰븳�쓣 �닔�젙�븷 user_id : " + memberVO.getUser_id());
		System.out.println("�뼱�뼡 沅뚰븳�쑝濡� 諛붽�嫄댁� : " + memberVO.getClassification());
		
		//String userId = memberVO.getUser_id();
		
		int cnt = myhomeService.handleClassification(memberVO); 
		// �뾽�뜲�씠�듃 �뿉 �꽦怨듯븯硫� �꽦怨듯븳 �뻾�씠 媛��닔瑜� 諛섑솚�븿 update荑쇰━
		//System.out.println(cnt);
		  
	}
	
	/* �씠紐⑥� 異붽� �븞�릺寃� �븯�뒗 �븿�닔*/
	 public static String mysqlSafe(String input) {
		
		if (input == null) return null;     
		StringBuilder sb = new StringBuilder();  
		for (int i = 0; i < input.length(); i++) {       
			if (i < (input.length() - 1)) { 
				// Emojis are two characters long in java, e.g. a rocket emoji is "\uD83D\uDE80";         
				if (Character.isSurrogatePair(input.charAt(i), input.charAt(i + 1))) {           
					i += 1; //also skip the second character of the emoji           
					continue;         
					}       
				}       
			sb.append(input.charAt(i));	
		}   	
		return sb.toString();	
	}
	
	
}
