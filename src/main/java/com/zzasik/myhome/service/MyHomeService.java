package com.zzasik.myhome.service;

import java.util.HashMap;
import java.util.List;

import com.zzasik.member.vo.MemberVO;
import com.zzasik.myhome.vo.NoticeVO;

public interface MyHomeService {

	HashMap<String,Object> getUserInfo(String user_id) throws Exception;
	List<MemberVO> listMembers() throws Exception;
	List<NoticeVO> listNotices() throws Exception;
}
