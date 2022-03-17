package com.zzasik.survey.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class SurveyLogic {
	
	public Map<String,Object> Meta(double height, double weight, int age, String gender, double activity) {
		double BMI = (weight/(height*height)) * 10000;
		double metabolism;
		double totalmetabolism = 0;
		

		if(gender.equals("남성")) {
			if(activity==1.0) {
				activity = 6 * weight;
			}else if(activity==2.0) {
				activity = 9 * weight;
			}else if (activity==3.0) {
				activity = 12 * weight;
			}
		}else if(gender.equals("여성")) {
			if(activity==1.0) {
				activity = 5 * weight;
			}else if(activity==2.0) {
				activity = 8 * weight;
			}else if (activity==3.0) {
				activity = 11 * weight;
			}
		}
		
		
		if(gender.equals("남성")) {
			metabolism = 66.47 + (13.75 * weight) + (5 * height) - (6.76 * age);
			totalmetabolism = metabolism + activity;
		}else if(gender.equals("여성")) {
			metabolism = 655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age);
			totalmetabolism = metabolism + activity;
		}
		
		Map<String, Object> infoMap = new HashMap<String, Object>();
		
		infoMap.put("BMI", BMI);
		infoMap.put("activity", activity);
		infoMap.put("totalmetabolism", totalmetabolism);
		
		return infoMap;
	}
	
	public ArrayList<String> Logic (double BMI, int age, String gender, double activity){
		
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
		
		if(gender.equals("남성")) {
			if(BMI >= 25 && activity<=420) {
				arrList.remove(String.valueOf("저탄고지"));
				arrList.remove(String.valueOf("고칼로리식단"));
			}else if (BMI >= 25) {
				arrList.remove(String.valueOf("저탄고지"));
			}else if (BMI <= 18.5) {
				arrList.remove(String.valueOf("다이어트식단"));
				arrList.remove(String.valueOf("저칼로리식단"));
			}
		}else if(gender.equals("여성")) {
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
		
		if(frequency.equals("하지 않음") && BMI >= 25) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency.equals("주1~2회") && BMI >= 25) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency.equals("주1~2회") && BMI < 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("저염식"));
		}else if(frequency.equals("주1~2회") && BMI < 23 && BMI >= 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if(frequency.equals("주1~2회") && BMI < 25 && 23.5 <= BMI) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency.equals("주3~4회") && BMI >= 30) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency.equals("주3~4회") && BMI >= 25 && BMI < 30) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency.equals("주3~4회") && BMI < 25 && 23.5 <= BMI) {
			arrList.remove(String.valueOf("저칼로리식단"));
		}else if(frequency.equals("주3~4회") && BMI < 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("저염식"));
		}else if(frequency.equals("주3~4회") && BMI < 23 && BMI >= 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if(frequency.equals("주5회 이상") && BMI < 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if(frequency.equals("주5회 이상") && BMI < 23 && BMI >= 18.5) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
			arrList.remove(String.valueOf("저염식"));
		}else if(frequency.equals("주5회 이상") && BMI < 25 && 23.5 <= BMI) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if(frequency.equals("주5회 이상") && BMI >= 25 && BMI < 30) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(frequency.equals("주5회 이상") && BMI >= 30) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}
		
		return arrList;
	}
	
	public ArrayList<String> Logic2 (ArrayList<String> arrList, String goal){
		
		if(goal.equals("다이어트")) {
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if (goal.equals("근력증진")) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("저지방"));
		}else if (goal.equals("건강유지")) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if (goal.equals("질병치료")) {
			arrList.remove(String.valueOf("저칼로리식단"));
			arrList.remove(String.valueOf("다이어트식단"));
			arrList.remove(String.valueOf("고칼로리식단"));
			arrList.remove(String.valueOf("저지방"));
			arrList.remove(String.valueOf("저탄고지"));
		}
		
		
		return arrList;
	}
	
	public ArrayList<String> Logic3 (ArrayList<String> arrList, String sickness, String sickness2, String sickness3){
		
		if(sickness.equals("당뇨병")) {
			arrList.removeAll(arrList);
			arrList.add("당뇨식");
		}else if(sickness.equals("저혈압")) {
			arrList.removeAll(arrList);
			arrList.add("저혈압식단");
		}else if(sickness.equals("고혈압")) {
			arrList.removeAll(arrList);
			arrList.add("고혈압식단");
			if(sickness2.equals("빈혈")) {
				arrList.add("저염식");
			}else if(sickness3.equals("빈혈")) {
				arrList.add("저염식");
			}
		}else if(sickness.equals("신장질환")) {
			arrList.removeAll(arrList);
			arrList.add("신장질환식단");
		}else if(sickness.equals("빈혈")) {
			arrList.removeAll(arrList);
			arrList.add("빈혈맞춤식단");
		}else if(sickness.equals("해당없음")) {
			arrList.remove(String.valueOf("당뇨식"));
			arrList.remove(String.valueOf("고혈압식단"));
			arrList.remove(String.valueOf("저혈압식단"));
			arrList.remove(String.valueOf("신장질환식단"));
			arrList.remove(String.valueOf("빈혈맞춤식단"));
		}
		
		if(sickness2.equals("당뇨병")) {
			arrList.add("당뇨식");
		}else if(sickness2.equals("저혈압")) {
			arrList.add("저혈압식단");
		}else if(sickness2.equals("고혈압")) {
			arrList.add("고혈압식단");
			if(sickness.equals("빈혈")) {
				arrList.add("저염식");
			}else if(sickness3.equals("빈혈")) {
				arrList.add("저염식");
			}
		}else if(sickness2.equals("신장질환")) {
			arrList.add("신장질환식단");
		}else if(sickness2.equals("빈혈")) {
			arrList.add("빈혈맞춤식단");
		}
		
		if(sickness3.equals("당뇨병")) {
			arrList.add("당뇨식");
		}else if(sickness3.equals("저혈압")) {
			arrList.add("저혈압식단");
		}else if(sickness3.equals("고혈압")) {
			arrList.add("고혈압식단");
			if(sickness.equals("빈혈")) {
				arrList.add("저염식");
			}else if(sickness2.equals("빈혈")) {
				arrList.add("저염식");
			}
		}else if(sickness3.equals("신장질환")) {
			arrList.add("신장질환식단");
		}else if(sickness3.equals("빈혈")) {
			arrList.add("빈혈맞춤식단");
		}
		
		return arrList;
	}
	
	public ArrayList<String> Logic4 (ArrayList<String> arrList, String p_sickness,  String p_sickness2,  String p_sickness3){
		
		if(p_sickness.equals("당뇨병")) {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness.equals("저혈압")) {
			arrList.remove(String.valueOf("고칼로리식단"));
			arrList.remove(String.valueOf("저염식"));
		}else if(p_sickness.equals("고혈압")) {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness.equals("신장질환")) {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness.equals("심장병")) {
			arrList.remove(String.valueOf("저염식"));
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness.equals("빈혈")) {
			arrList.remove(String.valueOf("저염식"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}
		
		if(p_sickness2.equals("당뇨병")) {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness2.equals("저혈압")) {
			arrList.remove(String.valueOf("고칼로리식단"));
			arrList.remove(String.valueOf("저염식"));
		}else if(p_sickness2.equals("고혈압")) {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness2.equals("신장질환")) {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness2.equals("심장병")) {
			arrList.remove(String.valueOf("저염식"));
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness2.equals("빈혈")) {
			arrList.remove(String.valueOf("저염식"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}
		
		if(p_sickness3.equals("당뇨병")) {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness3.equals("저혈압")) {
			arrList.remove(String.valueOf("고칼로리식단"));
			arrList.remove(String.valueOf("저염식"));
		}else if(p_sickness3.equals("고혈압")) {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness3.equals("신장질환")) {
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness3.equals("심장병")) {
			arrList.remove(String.valueOf("저염식"));
			arrList.remove(String.valueOf("저탄고지"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}else if(p_sickness3.equals("빈혈")) {
			arrList.remove(String.valueOf("저염식"));
			arrList.remove(String.valueOf("고칼로리식단"));
		}
		
		return arrList;
	}
	
}

