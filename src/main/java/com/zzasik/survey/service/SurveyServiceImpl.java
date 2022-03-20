package com.zzasik.survey.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.zzasik.member.vo.MemberVO;
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
	public SurveyVO selectSurvey(MemberVO memberVO) throws DataAccessException {
		// TODO Auto-generated method stub
		return surveyDAO.selectSurvey(memberVO);
	}
	
	@Override
	public List surveylist(SurveyVO surveyVO) throws DataAccessException {
		List surveylist = surveyDAO.surveylist(surveyVO);
		return surveylist;
	}


}
