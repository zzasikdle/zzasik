package com.zzasik.survey.vo;

import org.springframework.stereotype.Component;

@Component("answerVO")
public class AnswerVO {

	private int height;
	private int weight;
	private int age;
	private String gender;
	private String activity;
	private String frequency;
	private String goal;
	private String sickness;
	private String p_sickness;
	
	public AnswerVO() {
		// TODO Auto-generated constructor stub
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getActivity() {
		return activity;
	}

	public void setActivity(String activity) {
		this.activity = activity;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getGoal() {
		return goal;
	}

	public void setGoal(String goal) {
		this.goal = goal;
	}

	public String getSickness() {
		return sickness;
	}

	public void setSickness(String sickness) {
		this.sickness = sickness;
	}

	public String getP_sickness() {
		return p_sickness;
	}

	public void setP_sickness(String p_sickness) {
		this.p_sickness = p_sickness;
	}
	
	
}
