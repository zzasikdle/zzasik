package com.zzasik.survey.vo;

import org.springframework.stereotype.Component;

@Component("surveyVO")
public class SurveyVO {
	private int survey_code;
	private String survey_result1;
	private String survey_result2;
	private String survey_result3;
	
	public SurveyVO() {
		// TODO Auto-generated constructor stub
	}

	public int getSurvey_code() {
		return survey_code;
	}

	public void setSurvey_code(int survey_code) {
		this.survey_code = survey_code;
	}

	public String getSurvey_result1() {
		return survey_result1;
	}

	public void setSurvey_result1(String survey_result1) {
		this.survey_result1 = survey_result1;
	}

	public String getSurvey_result2() {
		return survey_result2;
	}

	public void setSurvey_result2(String survey_result2) {
		this.survey_result2 = survey_result2;
	}

	public String getSurvey_result3() {
		return survey_result3;
	}

	public void setSurvey_result3(String survey_result3) {
		this.survey_result3 = survey_result3;
	}
	
	
	
	
}
