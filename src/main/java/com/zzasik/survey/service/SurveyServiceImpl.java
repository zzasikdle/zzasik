package com.zzasik.survey.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.zzasik.survey.dao.SurveyDAO;
import com.zzasik.survey.vo.SurveyVO;

@Service("surveyService")
@Transactional(propagation = Propagation.REQUIRED)
public class SurveyServiceImpl implements SurveyService{

	@Autowired
	private SurveyDAO surveyDAO;
	
	@Override
	public void addSurvey(SurveyVO surveyVO) throws Exception {

		surveyDAO.addSurvey(surveyVO);
	}

	@Override
	public SurveyVO selectSurvey(int code) throws DataAccessException {
		// TODO Auto-generated method stub
		return surveyDAO.selectSurvey(code);
	}
	
	@Override
	public List surveylist(String keyword1, String keyword2, String keyword3) throws DataAccessException {
		List surveylist = null;
		surveylist = surveyDAO.surveylist(keyword1, keyword2, keyword3);
		return surveylist;
	}


}
