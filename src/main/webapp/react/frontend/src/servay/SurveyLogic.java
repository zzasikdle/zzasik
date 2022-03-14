package com.zzasik.survey.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class SurveyLogic {
	
	public Map<String,Object> Meta(int height, int weight, int age, String se, double activity) {
		double BMI = (weight/(height*height)) * 10000;
		double metabolism;
		double totalmetabolism = 0;
		

		if(se == "남성") {
			if(activity==1) {
				activity = 6 * weight;
			}else if(activity==2) {
				activity = 9 * weight;
			}else if (activity==3) {
				activity = 12 * weight;
			}
		}else if(se == "여성") {
			if(activity==1) {
				activity = 5 * weight;
			}else if(activity==2) {
				activity = 8 * weight;
			}else if (activity==3) {
				activity = 11 * weight;
			}
		}
		
		
		if(se == "남성") {
			metabolism = 66.47 + (13.75 * weight) + (5 * height) - (6.76 * age);
			totalmetabolism = metabolism + activity;
		}else if(se == "여성") {
			metabolism = 655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age);
			totalmetabolism = metabolism + activity;
		}
		
		Map<String, Object> infoMap = new HashMap<String, Object>();
		
		infoMap.put("BMI", BMI);
		infoMap.put("activity", activity);
		infoMap.put("totalmetabolism", totalmetabolism);
		
		return infoMap;
	}
	
	public ArrayList<String> Logic (double BMI, int age, String se, int activity){
		
		ArrayList <String> arrList = new ArrayList<String>();
		arrList.add("다이어트식단");
		arrList.add("저염식");
		arrList.add("고단백");
		arrList.add("저탄고지");
		arrList.add("40~50대 맞춤식단");
		arrList.add("60대 맞춤식단");
		arrList.add("저지방");
		arrList.add("당뇨식");
		arrList.add("고혈압식단");
		arrList.add("저혈압식단");
		arrList.add("빈혈맞춤식단");
		arrList.add("신장질환식단");
		arrList.add("고칼로리식단");
		arrList.add("저칼로리식단");
		
		if(se == "남성") {
			if(BMI >= 25 && activity<=420) {
				arrList.remove(String.valueOf("저탄고지"));
				arrList.remove(String.valueOf("고칼로리식단"));
			}else if (BMI >= 25) {
				arrList.remove(String.valueOf("저탄고지"));
			}else if (BMI <= 18.5) {
				arrList.remove(String.valueOf("다이어트식단"));
				arrList.remove(String.valueOf("저칼로리식단"));
			}
		}else if(se == "여성") {
			if(BMI >= 25 && activity<=300) {
				arrList.remove(String.valueOf("저탄고지"));
				arrList.remove(String.valueOf("고칼로리식단"));
			}else if (BMI >= 25) {
				arrList.remove(String.valueOf("저탄고지"));
			}else if (BMI <= 18.5) {
				arrList.remove(String.valueOf("다이어트식단"));
				arrList.remove(String.valueOf("저칼로리식단"));
			}
		}
		
		if(age<40) {
			arrList.remove(String.valueOf("40~50대 맞춤식단"));
			arrList.remove(String.valueOf("60대 맞춤식단"));
		}else if(age >= 40 && age <60) {
			arrList.remove(String.valueOf("60대 맞춤식단"));
			arrList.remove(String.valueOf("고칼로리식단"));
			arrList.remove(String.valueOf("저탄고지"));
		}else if(age >= 60) {
			arrList.remove(String.valueOf("40~50대 맞춤식단"));
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저칼로리식단"));
		}
		
		
		return arrList;
	}
	
	
	public ArrayList<String> Logic1 (ArrayList<String> arrList, String frequency, double BMI) {
		
		if(frequency == "안함" && BMI >= 25) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency == "주1~2회" && BMI >= 25) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency == "주1~2회" && BMI < 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("저염식"));
		}else if(frequency == "주1~2회" && BMI < 23 && BMI >= 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if(frequency == "주1~2회" && BMI < 25 && 23.5 <= BMI) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency == "주3~4회" && BMI >= 30) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency == "주3~4회" && BMI >= 25 && BMI < 30) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency == "주3~4회" && BMI < 25 && 23.5 <= BMI) {
			arrList.remove(String.valueOf("저칼로리식단"));
		}else if(frequency == "주3~4회" && BMI < 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("저염식"));
		}else if(frequency == "주3~4회" && BMI < 23 && BMI >= 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if(frequency == "주5회 이상" && BMI < 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if(frequency == "주5회 이상" && BMI < 23 && BMI >= 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
			arrList.remove(String.valueOf("저염식"));
		}else if(frequency == "주5회 이상" && BMI < 25 && 23.5 <= BMI) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if(frequency == "주5회 이상" && BMI >= 25 && BMI < 30) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency == "주5회 이상" && BMI >= 30) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}
		
		return arrList;
	}
	
	public ArrayList<String> Logic2 (ArrayList<String> arrList, String goal){
		
		if(goal == "다이어트") {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if (goal == "근력증진") {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if (goal == "건강유지") {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if (goal == "질병치료") {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("고칼로리식단"));
			arrList.remove(String.valueOf("저지방"));
			arrList.remove(String.valueOf("저탄고지"));
		}
		
		
		return arrList;
	}
	
	public ArrayList<String> Logic3 (ArrayList<String> arrList, String sickness, String sickness2, String sickness3){
		
		if(sickness == "당뇨병") {
			arrList.removeAll(arrList);
			arrList.add("당뇨식");
		}else if(sickness == "저혈압") {
			arrList.removeAll(arrList);
			arrList.add("저혈압식단");
		}else if(sickness == "고혈압") {
			arrList.removeAll(arrList);
			arrList.add("고혈압식단");
			if(sickness2 != "빈혈") {
				arrList.add("저염식");
			}else if(sickness3 != "빈혈") {
				arrList.add("저염식");
			}
		}else if(sickness == "신장질환") {
			arrList.removeAll(arrList);
			arrList.add("신장질환식단");
		}else if(sickness == "빈혈") {
			arrList.removeAll(arrList);
			arrList.add("빈혈맞춤식단");
		}else if(sickness == "해당 없음") {
			arrList.remove(String.valueOf("당뇨식"));
			arrList.remove(String.valueOf("고혈압식단"));
			arrList.remove(String.valueOf("저혈압식단"));
			arrList.remove(String.valueOf("신장질환식단"));
			arrList.remove(String.valueOf("빈혈맞춤식단"));
		}
		
		if(sickness2 == "당뇨병") {
			arrList.add("당뇨식");
		}else if(sickness2 == "저혈압") {
			arrList.add("저혈압식단");
		}else if(sickness2 == "고혈압") {
			arrList.add("고혈압식단");
			if(sickness != "빈혈") {
				arrList.add("저염식");
			}else if(sickness3 != "빈혈") {
				arrList.add("저염식");
			}
		}else if(sickness2 == "신장질환") {
			arrList.add("신장질환식단");
		}else if(sickness2 == "빈혈") {
			arrList.add("빈혈맞춤식단");
		}
		
		if(sickness3 == "당뇨병") {
			arrList.add("당뇨식");
		}else if(sickness3 == "저혈압") {
			arrList.add("저혈압식단");
		}else if(sickness3 == "고혈압") {
			arrList.add("고혈압식단");
			if(sickness != "빈혈") {
				arrList.add("저염식");
			}else if(sickness2 != "빈혈") {
				arrList.add("저염식");
			}
		}else if(sickness3 == "신장질환") {
			arrList.add("신장질환식단");
		}else if(sickness3 == "빈혈") {
			arrList.add("빈혈맞춤식단");
		}
		
		return arrList;
	}
	
	public ArrayList<String> Logic4 (ArrayList<String> arrList, String p_sickness){
		
		if(p_sickness == "당뇨병") {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness == "저혈압") {
			arrList.remove(String.valueOf("고칼로리식단"));
			arrList.remove(String.valueOf("저염식"));
		}else if(p_sickness == "고혈압") {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness == "신장질환") {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness == "심장병") {
			arrList.remove(String.valueOf("저염식"));
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness == "빈혈") {
			arrList.remove(String.valueOf("저염식"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}
		
		return arrList;
	}

}
