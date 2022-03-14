package com.zzasik.myhome.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzasik.member.vo.MemberVO;
import com.zzasik.myhome.vo.NoticeVO;
import com.zzasik.myhome.dao.MyHomeDAO;

@Service
public class MyHomeServiceImpl implements MyHomeService {

	@Autowired
	private MyHomeDAO myhomeDAO;
	
	public MyHomeServiceImpl (){
		
	}
	@Override
	public HashMap<String,Object> getUserInfo(String user_id) throws Exception {
		
		return myhomeDAO.selectUserInfo(user_id);
	}
	@Override
	public List<MemberVO> listMembers() throws Exception {
		
		return myhomeDAO.selectAllMembersList();
	}
	@Override
	public List<NoticeVO> listNotices() throws Exception {
		
		return myhomeDAO.selectAllNoticesList();
	}
	@Override
	public void writeNotice(NoticeVO noticeVO) throws Exception {
		myhomeDAO.insertNotice(noticeVO);
		
	}
	@Override
	public int getNewNoticeNum() throws Exception {
		return myhomeDAO.maxNoticeNum();
	}
	@Override
	public NoticeVO viewNotice(int notice_code) throws Exception {
		
		return myhomeDAO.selectNotice(notice_code);
	}
	@Override
	public void delNotice(int notice_code) throws Exception {
		myhomeDAO.deleteNotice(notice_code);
		
	}
	@Override
	public void editNotice(NoticeVO noticeVO) throws Exception {
		myhomeDAO.updateNotice(noticeVO);
		
	}
	
	/* 회원 권한 수정*/
	@Override
	public int handleClassification(MemberVO memberVO) throws Exception {
		
		return myhomeDAO.handleClassification(memberVO);
	}

}
