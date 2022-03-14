package com.zzasik.survey.controller;

import java.util.ArrayList;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;

import com.zzasik.survey.service.SurveyService;

public class test {
	
	public static void main(String[] args) {
		SurveyLogic surveyLogic = new SurveyLogic();
		Map<String, Object> infoMap = surveyLogic.Meta(170, 70, 25, "남성", 1);
		
		double BMI = (double)infoMap.get("BMI");
		int activity = (Integer)infoMap.get("activity");
		
		ArrayList<String> arrList = surveyLogic.Logic(BMI, 25, "남성", activity);
		
		System.out.println(arrList);
		
		surveyLogic.Logic3(arrList, "당뇨병",null,null);
		System.out.println(arrList);
	}
}
