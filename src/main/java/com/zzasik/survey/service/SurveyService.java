package com.zzasik.survey.service;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.RequestBody;

import com.zzasik.survey.vo.SurveyVO;

public interface SurveyService {
	
	public void addSurvey(SurveyVO surveyVO) throws Exception;
	
	public SurveyVO selectSurvey(int code)throws DataAccessException;
	
	public List surveylist(String keyword1, String keyword2, String keyword3) throws DataAccessException;
}
