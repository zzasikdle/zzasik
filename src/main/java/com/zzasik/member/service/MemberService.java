package com.zzasik.member.service;

import com.zzasik.member.vo.MemberVO;

public interface MemberService {

public MemberVO login(MemberVO memberVO) throws Exception;
	
	public int insertMember(MemberVO memberVO) throws Exception;
	
	public int findMemberById(String user_id) throws Exception;
}
