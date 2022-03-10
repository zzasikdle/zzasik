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
	
	/*공지사항 리스트 가져오기*/
	@GetMapping("/notice")
	public List<NoticeVO> listNotices() throws Exception{
		List<NoticeVO> noticesList = myhomeService.listNotices();
		return noticesList;
		
	}
	
	/*공지사항 글 작성*/
	@GetMapping("/notice/new")
	public void writeNotice(@RequestParam String title, @RequestParam String editorToHtml) throws Exception{
		NoticeVO noticeVO = new NoticeVO();
		noticeVO.setNotice_code(myhomeService.getNewNoticeNum()+1);
		noticeVO.setNotice_title(title);
		noticeVO.setNotice_content(mysqlSafe(editorToHtml));
		
		myhomeService.writeNotice(noticeVO);
		
	}
	/*공지사항 글 보기*/
	@GetMapping("/notice/view")
	public NoticeVO viewNotice(@RequestParam int notice_code) throws Exception{
		return myhomeService.viewNotice(notice_code);
	}
	
	/*공지사항 글 삭제*/
	@GetMapping("notice/del")
	public void delNotice(@RequestParam int notice_code) throws Exception{
		myhomeService.delNotice(notice_code);
	}
	
	/*공지사항 글 수*/
	@GetMapping("notice/edit")
	public void editNotice(@RequestParam int notice_code,@RequestParam String title, @RequestParam String editorToHtml) throws Exception{
		NoticeVO noticeVO = new NoticeVO();
		noticeVO.setNotice_code(notice_code);
		noticeVO.setNotice_title(title);
		noticeVO.setNotice_content(editorToHtml);
		
		myhomeService.editNotice(noticeVO);
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
	
	/* 이모지 추가 안되게 하는 함수*/
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
