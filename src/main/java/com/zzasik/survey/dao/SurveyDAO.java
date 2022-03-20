package com.zzasik.survey.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import com.zzasik.member.vo.MemberVO;
import com.zzasik.survey.vo.SurveyVO;

@Mapper
@Repository("surveyDAO")
public interface SurveyDAO {
	
	public void addSurvey(SurveyVO surveyVO) throws DataAccessException;
	
	public SurveyVO selectSurvey(MemberVO memberVO)throws DataAccessException;
	
	public List surveylist(SurveyVO surveyVO) throws DataAccessException;
}
