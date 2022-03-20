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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.zzasik.member.service.MemberService;
import com.zzasik.member.vo.AddressVO;
import com.zzasik.member.vo.MemberVO;
import com.zzasik.survey.service.SurveyService;
import com.zzasik.survey.vo.AnswerVO;
import com.zzasik.survey.vo.SurveyVO;

@RestController("surveyController")
@CrossOrigin(origins = "http://49.50.160.29:3000")
public class SurveyController {

	@Autowired
	private SurveyService surveyService;

	@Autowired
	private MemberService memberService;

	@Autowired
	private SurveyVO surveyVO;

	@Autowired
	private AnswerVO answerVO;

	@PostMapping("/survey1")
	public Map<String,Object> survey1(@RequestBody AnswerVO answerVO,HttpServletRequest request,
			HttpServletResponse response)throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		System.out.println(answerVO.getHeight());
		System.out.println(answerVO.getActivity());
		System.out.println(answerVO.getGender());
		System.out.println(answerVO.getAge());
		System.out.println(answerVO.getWeight());
		System.out.println(answerVO.getFrequency());
		System.out.println(answerVO.getGoal());
		System.out.println(answerVO.getSickness());
		System.out.println(answerVO.getP_sickness());
		
		double height = answerVO.getHeight();
		double weight = answerVO.getWeight();
		int age = answerVO.getAge();
		String gender = answerVO.getGender();
		String activity = answerVO.getActivity();
		String frequency = answerVO.getFrequency();
		String goal = answerVO.getGoal();
		String sickness = answerVO.getSickness();
		String p_sickness = answerVO.getP_sickness();
		
		String sick1 = null;
		String sick2 = null;
		String sick3 = null;
		
		String p_sick1 = null;
		String p_sick2 = null;
		String p_sick3 = null;
		
		String[] arr = sickness.split(" ");
		
		sick1 = arr[0];
		
		try {
			if (arr[1] != null) {
				sick2 = arr[1];
				try {
					if (arr[2] != null) {
						sick3 = arr[2];
					}
				} catch (ArrayIndexOutOfBoundsException e) {
					sick3 = "nothing";
				}
			}
		}catch(ArrayIndexOutOfBoundsException e) {
			sick2 = "nothing";
			sick3 = "nothing";
		}
		
		
		String[] arr1 = p_sickness.split(" ");
		
		p_sick1 = arr1[0];
		
		try {
			if (arr1[1] != null) {
				p_sick2 = arr[1];
				try {
					if (arr1[2] != null) {
						p_sick3 = arr1[2];
					}
				} catch (ArrayIndexOutOfBoundsException e) {
					p_sick3 = "nothing";
				}
			}
		}catch(ArrayIndexOutOfBoundsException e) {
			p_sick2 = "nothing";
			p_sick3 = "nothing";
		}

		System.out.println(sick1);
		System.out.println(sick2);
		System.out.println(sick3);
		
		
		double act = 0.0;

		if(activity.equals("가벼운 활동")) {
			act = 1.0;
		}else if(activity.equals("보통 활동")) {
			act = 2.0;
		}else if(activity.equals("힘든 활동")) {
			act = 3.0;
		}
		System.out.println(act);
		SurveyLogic surveyLogic = new SurveyLogic();
		Map<String, Object> infoMap = surveyLogic.Meta(height, weight, age, gender, act);
		
		double BMI = (double)infoMap.get("BMI");
		act = (double)infoMap.get("activity");
		
		System.out.println(BMI);
		
		ArrayList<String> arrList = surveyLogic.Logic(BMI, age, gender, act);
		
		arrList = surveyLogic.Logic1(arrList, frequency, BMI);
		
		arrList = surveyLogic.Logic2(arrList, goal);
		
		arrList = surveyLogic.Logic3(arrList, sick1, sick2, sick3);
		
		arrList = surveyLogic.Logic4(arrList, p_sick1, p_sick2, p_sick3);
		
		System.out.println(arrList);
		
		double c = Math.random();
		
		int code = (int)(c*100000);
		
		String result1 = null;
		String result2 = null;
		String result3 = null;
		
		try {
			if (arrList.get(0) != null) {
				result1 = (String) arrList.get(0);
				try {
					if (arrList.get(1) != null) {
						result2 = (String) arrList.get(1);
						try {
							if(arrList.get(2) !=null) {
								result3 = (String) arrList.get(2);
							}
						}catch (IndexOutOfBoundsException e) {
							result3 = null;
						}
					}
				} catch (IndexOutOfBoundsException e) {
					result2 = null;
					result3 = null;
				}
			}
		}catch(IndexOutOfBoundsException e) {
			result1 = "없음";
		}

		System.out.println(code);
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("survey_code", code);
		resultMap.put("survey_result1", result1);
		resultMap.put("survey_result2", result2);
		resultMap.put("survey_result3", result3);
		
		SurveyVO surveyVO = new SurveyVO();
		
		surveyVO.setSurvey_code(code);
		surveyVO.setSurvey_result1(result1);
		surveyVO.setSurvey_result2(result2);
		surveyVO.setSurvey_result3(result3);
		
		surveyService.addSurvey(surveyVO);
		
		resultMap.remove("survey_result1");
		resultMap.remove("survey_result2");
		resultMap.remove("survey_result3");
		
		
		
		return resultMap;
	}

//	@PostMapping("/survey2")
//	public Map<String,Object> survey2(@RequestBody AnswerVO answerVO,HttpServletRequest request,
//			HttpSession session,
//			HttpServletResponse response)throws Exception {
//		request.setCharacterEncoding("utf-8");
//		response.setContentType("text/html;charset=utf-8");
//		
//		String frequency = answerVO.getFrequency();
//		System.out.println(frequency);
//		
////		HttpSession session = request.getSession();
//		
//		System.out.println("테스트"+session.getAttribute("BMI"));
//		double BMI = (double)session.getAttribute("BMI");
//		
//		@SuppressWarnings("unchecked")
//		ArrayList<String> arrList = (ArrayList<String>) session.getAttribute("arrList");
//		
//		SurveyLogic surveyLogic = new SurveyLogic();
//		arrList = surveyLogic.Logic1(arrList, frequency, BMI);
//		
//		session.setAttribute("arrList", arrList);
//			
//		return null;
//	}
//	
//	@PostMapping("/survey3")
//	public Map<String,Object> survey3(@RequestBody AnswerVO answerVO,HttpServletRequest request,
//			HttpServletResponse response)throws Exception {
//		String goal = answerVO.getGoal();
//		System.out.println(goal);
//		
//		HttpSession session = request.getSession();
//		@SuppressWarnings("unchecked")
//		ArrayList<String> arrList = (ArrayList<String>) session.getAttribute("arrList");
//		
//		SurveyLogic surveyLogic = new SurveyLogic();
//		arrList = surveyLogic.Logic2(arrList, goal);
//		
//		session.setAttribute("arrList", arrList);
//		
//		return null;
//	}
//	
//	@PostMapping("/survey4")
//	public Map<String,Object> survey4(@RequestBody AnswerVO answerVO,HttpServletRequest request,
//			HttpServletResponse response)throws Exception {
//		String sickness = answerVO.getSickness();
//		System.out.println(sickness);
//		
//		String[] arr = sickness.split(" ");
//		
//		String sick1 = arr[0];
//		String sick2 = arr[1];
//		String sick3 = arr[2];
//		
//		HttpSession session = request.getSession();
//		@SuppressWarnings("unchecked")
//		ArrayList<String> arrList = (ArrayList<String>) session.getAttribute("arrList");
//		
//		SurveyLogic surveyLogic = new SurveyLogic();
//		arrList = surveyLogic.Logic3(arrList, sick1, sick2, sick3);
//		
//		session.setAttribute("arrList", arrList);
//		
//		return null;
//	}
//	
//	@PostMapping("/survey5")
//	public Map<String,Object> survey5(@RequestBody AnswerVO answerVO,HttpServletRequest request,
//			HttpServletResponse response)throws Exception {
//		String p_sickness = answerVO.getP_sickness();
//		System.out.println(p_sickness);
//		
//		String[] arr = p_sickness.split(" ");
//		
//		String p_sick1 = arr[0];
//		String p_sick2 = arr[1];
//		String p_sick3 = arr[2];
//		
//		HttpSession session = request.getSession();
//		@SuppressWarnings("unchecked")
//		ArrayList<String> arrList = (ArrayList<String>) session.getAttribute("arrList");
//		
//		SurveyLogic surveyLogic = new SurveyLogic();
//		arrList = surveyLogic.Logic4(arrList, p_sick1, p_sick2, p_sick3);
//		
//		double c = Math.random();
//		
//		int code = (int)(c*100000);
//		String result1 = (String)arrList.get(0);
//		String result2 = (String)arrList.get(1);
//		String result3 = (String)arrList.get(2);
//		
//		Map<String,Object> resultMap = new HashMap<String,Object>();
//		resultMap.put("survey_code", code);
//		resultMap.put("survey_result1", result1);
//		resultMap.put("survey_result2", result2);
//		resultMap.put("survey_result3", result3);
//		
//		surveyService.addSurvey(resultMap); 
//		
//		resultMap.remove("survey_result1");
//		resultMap.remove("survey_result2");
//		resultMap.remove("survey_result3");
//		
//		
//		return resultMap;
//	}

	@GetMapping("/mypage/surveyresult")
	public List result(@RequestParam("survey_code") String survey_code , @RequestParam("user_id") String user_id)
			throws Exception {
		
		MemberVO memberVO = new MemberVO();
		
		memberVO.setSurvey_code(Integer.parseInt(survey_code));
		memberVO.setUser_id(user_id);
		
		System.out.println(memberVO.getSurvey_code());
		System.out.println(memberVO.getUser_id());
		
		
		
		memberService.modSurveyCode(memberVO); // 7 

		SurveyVO sur = surveyService.selectSurvey(memberVO);

		List surveylist = surveyService.surveylist(sur);

		
		return surveylist;
	}
	
}
