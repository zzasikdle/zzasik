package com.zzasik.board.vo;

import java.sql.Date;
import java.sql.Timestamp;

import org.springframework.stereotype.Component;

@Component("BoardVO")
public class BoardVO {
	private String user_id;
	private int board_code;
	private String board_title;
	private String board_content;
	private String meal_type;
	private int board_price;
	private String teacher_name;
	private String imageFilename;
	private String teacher_id;
	private Date joindate;
	private String breakfast;
	private String Lunch;
	private String dinner;
	private String snack_1;
	private String snack_2;
	private String snack_3;
	private int calorie;
	private String coaching_answer;
	private String user_answer;
	private Date start_date;
	private int userstatus;
	private int board_period;
	
	
	
	

	private String user_name;
	private Date birth;
	private String phone;
	private String email;
	private String survey_code;
	private String coaching_num;
	 
	
	
	
	
	public String getCoaching_num() {
		return coaching_num;
	}
	public void setCoaching_num(String coaching_num) {
		this.coaching_num = coaching_num;
	}
	public String getUser_answer() {
		return user_answer;
	}
	public void setUser_answer(String user_answer) {
		this.user_answer = user_answer;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
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
	public String getSurvey_code() {
		return survey_code;
	}
	public void setSurvey_code(String survey_code) {
		this.survey_code = survey_code;
	}
	public int getBoard_period() {
		return board_period;
	}
	public void setBoard_period(int board_period) {
		this.board_period = board_period;
	}
	public int getUserstatus() {
		return userstatus;
	}
	public void setUserstatus(int userstatus) {
		this.userstatus = userstatus;
	}

	
	public Date getJoindate() {
		return joindate;
	}
	public void setJoindate(Date joindate) {
		this.joindate = joindate;
	}
	public String getTeacher_id() {
		return teacher_id;
	}
	public void setTeacher_id(String teacher_id) {
		this.teacher_id = teacher_id;
	}
	public String getImageFilename() {
		return imageFilename;
	}
	public void setImageFilename(String imageFilename) {
		this.imageFilename = imageFilename;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public int getBoard_code() {
		return board_code;
	}
	public void setBoard_code(int board_code) {
		this.board_code = board_code;
	}
	public String getBoard_title() {
		return board_title;
	}
	public void setBoard_title(String board_title) {
		this.board_title = board_title;
	}
	public String getBoard_content() {
		return board_content;
	}
	public void setBoard_content(String board_content) {
		this.board_content = board_content;
	}
	public String getMeal_type() {
		return meal_type;
	}
	public void setMeal_type(String meal_type) {
		this.meal_type = meal_type;
	}
	public int getBoard_price() {
		return board_price;
	}
	public void setBoard_price(int board_price) {
		this.board_price = board_price;
	}
	public String getTeacher_name() {
		return teacher_name;
	}
	public void setTeacher_name(String teacher_name) {
		this.teacher_name = teacher_name;
	}
	
	
	public String getBreakfast() {
		return breakfast;
	}
	public void setBreakfast(String breakfast) {
		this.breakfast = breakfast;
	}
	public String getLunch() {
		return Lunch;
	}
	public void setLunch(String lunch) {
		Lunch = lunch;
	}
	public String getDinner() {
		return dinner;
	}
	public void setDinner(String dinner) {
		this.dinner = dinner;
	}
	public String getSnack_1() {
		return snack_1;
	}
	public void setSnack_1(String snack_1) {
		this.snack_1 = snack_1;
	}
	public String getSnack_2() {
		return snack_2;
	}
	public void setSnack_2(String snack_2) {
		this.snack_2 = snack_2;
	}
	public String getSnack_3() {
		return snack_3;
	}
	public void setSnack_3(String snack_3) {
		this.snack_3 = snack_3;
	}
	public int getCalorie() {
		return calorie;
	}
	public void setCalorie(int calorie) {
		this.calorie = calorie;
	}
	public String getCoaching_answer() {
		return coaching_answer;
	}
	public void setCoaching_answer(String coaching_answer) {
		this.coaching_answer = coaching_answer;
	}
	public BoardVO() {
		// TODO Auto-generated constructor stub
	}
	public BoardVO(String user_id, int board_code, String board_title, String board_content, String meal_type,
			int board_price, String teacher_name) {
		super();
		this.user_id = user_id;
		this.board_code = board_code;
		this.board_title = board_title;
		this.board_content = board_content;
		this.meal_type = meal_type;
		this.board_price = board_price;
		this.teacher_name = teacher_name;
		
	}
	
	
	
	

	
	
}
