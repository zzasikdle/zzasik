package com.zzasik.survey.service;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.RequestBody;

import com.zzasik.member.vo.MemberVO;
import com.zzasik.survey.vo.SurveyVO;

public interface SurveyService {
	
	public void addSurvey(SurveyVO surveyVO) throws Exception;
	
	public SurveyVO selectSurvey(MemberVO memberVO)throws DataAccessException;
	
	public List surveylist(SurveyVO surveyVO) throws DataAccessException;
}
