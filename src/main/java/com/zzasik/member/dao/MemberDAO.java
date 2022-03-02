package com.zzasik.member.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.zzasik.member.vo.MemberVO;

@Repository
@Mapper
public interface MemberDAO {
	
public MemberVO login(MemberVO memberVO) throws DataAccessException;
	
	public int insertMember(MemberVO memberVO) throws Exception;
	
	public int findMemberById(String user_id) throws DataAccessException;
	
}
