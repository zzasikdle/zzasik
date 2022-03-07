package com.zzasik.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zzasik.member.dao.MemberDAO;
import com.zzasik.member.vo.MemberVO;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberDAO memberDAO;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
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
		
		
		// 비밀번호 해싱
		String user_pwd = memberVO.getUser_pwd();
		String encodePassword = passwordEncoder.encode(user_pwd);
		
		memberVO.setUser_pwd(encodePassword);
		
		return memberDAO.insertMember(memberVO);
	}
	
	/* 아이디 중복 체크 */
	@Override
	public int findMemberById(String user_id) throws Exception {
		
		return memberDAO.findMemberById(user_id);
	}
	
	/* 해시 비밀번호 가져오기*/
	@Override
	public MemberVO findPasswordById(MemberVO memberVO) throws Exception {
		
		return memberDAO.findPasswordById(memberVO);
	}
}
