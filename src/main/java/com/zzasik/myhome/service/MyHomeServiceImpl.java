package com.zzasik.myhome.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzasik.member.vo.MemberVO;
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

}
