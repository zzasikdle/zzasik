package com.zzasik.myhome.service;

import java.util.HashMap;
import java.util.List;

import com.zzasik.member.vo.MemberVO;

public interface MyHomeService {

	HashMap<String,Object> getUserInfo(String user_id) throws Exception;
	List<MemberVO> listMembers() throws Exception;
}
