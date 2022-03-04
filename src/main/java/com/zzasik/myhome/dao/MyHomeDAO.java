package com.zzasik.myhome.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.zzasik.member.vo.MemberVO;
import com.zzasik.myhome.vo.NoticeVO;

@Repository
@Mapper
public interface MyHomeDAO {

	HashMap<String,Object> selectUserInfo(String user_info) throws DataAccessException;
	List<MemberVO> selectAllMembersList();
	List<NoticeVO> selectAllNoticesList();
}
