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
	void insertNotice(NoticeVO noticeVO) throws DataAccessException;
	int maxNoticeNum() throws DataAccessException;
	NoticeVO selectNotice(int notice_code) throws DataAccessException;
	void deleteNotice(int notice_code) throws DataAccessException;
	void updateNotice(NoticeVO noticeVO) throws DataAccessException;
	
	public int handleClassification(MemberVO memberVO) throws Exception;
}
