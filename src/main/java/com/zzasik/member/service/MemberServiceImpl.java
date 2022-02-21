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
	
	@Override
	public MemberVO login(MemberVO memberVO) throws Exception {
		
		return memberDAO.login(memberVO);
	}

}
