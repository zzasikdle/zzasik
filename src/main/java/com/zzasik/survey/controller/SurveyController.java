package com.zzasik.survey.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zzasik.survey.service.SurveyService;
import com.zzasik.survey.vo.SurveyVO;

@RestController("surveyController")
@CrossOrigin(origins = "http://localhost:3000")
public class SurveyController {

	@Autowired
	private SurveyService surveyService;
	
	@Autowired
	private SurveyVO surveyVO;

	@PostMapping("/survey1.do")
	public Map<String,Object> survey1(@RequestBody Map<String,Object> paramMap,HttpServletRequest request,
			HttpServletResponse response)throws Exception {
		int height = (Integer)paramMap.get("height");
		int weight = (Integer)paramMap.get("weight");
		int age = (Integer)paramMap.get("age");
		String gender = (String)paramMap.get("gender");
		int activity = (Integer)paramMap.get("activity");
		
		SurveyLogic surveyLogic = new SurveyLogic();
		Map<String, Object> infoMap = surveyLogic.Meta(height, weight, age, gender, activity);
		
		double BMI = (double)infoMap.get("BMI");
		activity = (Integer)infoMap.get("activity");
		
		ArrayList<String> arrList = surveyLogic.Logic(BMI, age, gender, activity);
		
		HttpSession session = request.getSession();
		session.setAttribute("BMI", BMI);
		session.setAttribute("arrList", arrList);
		
		return null;
	}
	
	@PostMapping("/survey2.do")
	public Map<String,Object> survey2(@RequestBody Map<String,Object> paramMap,HttpServletRequest request,
			HttpServletResponse response)throws Exception {
		String frequency = (String)paramMap.get("frequency");
		
		HttpSession session = request.getSession();
		
		double BMI = (double)session.getAttribute("BMI");
		
		@SuppressWarnings("unchecked")
		ArrayList<String> arrList = (ArrayList<String>) session.getAttribute("arrList");
		
		SurveyLogic surveyLogic = new SurveyLogic();
		arrList = surveyLogic.Logic1(arrList, frequency, BMI);
		
		session.setAttribute("arrList", arrList);
			
		return null;
	}
	
	@PostMapping("/survey3.do")
	public Map<String,Object> survey3(@RequestBody Map<String,Object> paramMap,HttpServletRequest request,
			HttpServletResponse response)throws Exception {
		String goal = (String)paramMap.get("goal");
		
		HttpSession session = request.getSession();
		@SuppressWarnings("unchecked")
		ArrayList<String> arrList = (ArrayList<String>) session.getAttribute("arrList");
		
		SurveyLogic surveyLogic = new SurveyLogic();
		arrList = surveyLogic.Logic2(arrList, goal);
		
		session.setAttribute("arrList", arrList);
		
		return null;
	}
	
	@PostMapping("/survey4.do")
	public Map<String,Object> survey4(@RequestBody Map<String,Object> paramMap,HttpServletRequest request,
			HttpServletResponse response)throws Exception {
		String sickness = (String)paramMap.get("sickness");
		String sickness2 = (String)paramMap.get("sickness2");
		String sickness3 = (String)paramMap.get("sickness3");
		
		HttpSession session = request.getSession();
		@SuppressWarnings("unchecked")
		ArrayList<String> arrList = (ArrayList<String>) session.getAttribute("arrList");
		
		SurveyLogic surveyLogic = new SurveyLogic();
		arrList = surveyLogic.Logic3(arrList, sickness, sickness2, sickness3);
		
		session.setAttribute("arrList", arrList);
		
		return null;
	}
	
	@PostMapping("/survey5.do")
	public Map<String,Object> survey5(@RequestBody Map<String,Object> paramMap,HttpServletRequest request,
			HttpServletResponse response)throws Exception {
		String p_sickness = (String)paramMap.get("p_sickness");
		String p_sickness2 = (String)paramMap.get("p_sickness2");
		String p_sickness3 = (String)paramMap.get("p_sickness3");
		
		HttpSession session = request.getSession();
		@SuppressWarnings("unchecked")
		ArrayList<String> arrList = (ArrayList<String>) session.getAttribute("arrList");
		
		SurveyLogic surveyLogic = new SurveyLogic();
		arrList = surveyLogic.Logic4(arrList, p_sickness, p_sickness2, p_sickness3);
		
		double c = Math.random();
		
		int code = (int)(c*100000);
		String result1 = (String)arrList.get(0);
		String result2 = (String)arrList.get(1);
		String result3 = (String)arrList.get(2);
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("survey_code", code);
		resultMap.put("survey_result1", result1);
		resultMap.put("survey_result2", result2);
		resultMap.put("survey_result3", result3);
		
		surveyService.addSurvey(resultMap); 
		
		resultMap.remove("survey_result1");
		resultMap.remove("survey_result2");
		resultMap.remove("survey_result3");
		
		
		return resultMap;
	}
	
	@GetMapping("/mypage/surveyresult")
	public List result(@RequestBody Map<String,Object> paramMap,HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		HttpSession session = request.getSession();
		int code = (int)session.getAttribute("survey_code");
		//목록가져오는 서비스 필요
		SurveyVO sur = surveyService.selectSurvey(code);
		String keyword1 = sur.getSurvey_result1();
		String keyword2 = sur.getSurvey_result2();
		String keyword3 = sur.getSurvey_result3();
		
		List surveylist = surveyService.surveylist(keyword1, keyword2, keyword3);
		
		return surveylist;
	}
}
