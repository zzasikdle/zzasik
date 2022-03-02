package com.zzasik.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzasik.member.dao.MemberDAO;
import com.zzasik.member.vo.MemberVO;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberDAO memberDAO;
	
	public MemberServiceImpl() {
		
	}
	/* 로그인 */
	@Override
	public MemberVO login(MemberVO memberVO) throws Exception {
		
		return memberDAO.login(memberVO);
	}
	
	/* 회원 가입 */
	
	@Override
	public int insertMember(MemberVO memberVO) throws Exception {
		return memberDAO.insertMember(memberVO);
	}
	
	/* 아이디 중복 체크 */
	@Override
	public int findMemberById(String user_id) throws Exception {
		
		return memberDAO.findMemberById(user_id);
	}
}
