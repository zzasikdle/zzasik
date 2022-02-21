package com.zzasik.member.vo;

import java.sql.Date;

public class MemberVO {
	private String user_id;
	private String user_name;
	private String user_pwd;
	private Date birth;
	private String addr_1;
	private String addr_2;
	private String addr_3;
	private String phone;
	private String email;
	private String classification;
	private int survey_code;
	
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_pwd() {
		return user_pwd;
	}
	public void setUser_pwd(String user_pwd) {
		this.user_pwd = user_pwd;
	}
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
	}
	public String getAddr_1() {
		return addr_1;
	}
	public void setAddr_1(String addr_1) {
		this.addr_1 = addr_1;
	}
	public String getAddr_2() {
		return addr_2;
	}
	public void setAddr_2(String addr_2) {
		this.addr_2 = addr_2;
	}
	public String getAddr_3() {
		return addr_3;
	}
	public void setAddr_3(String addr_3) {
		this.addr_3 = addr_3;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getClassification() {
		return classification;
	}
	public void setClassification(String classification) {
		this.classification = classification;
	}
	public int getSurvey_code() {
		return survey_code;
	}
	public void setSurvey_code(int survey_code) {
		this.survey_code = survey_code;
	}
	
	
}
