package com.zzasik.myhome.vo;

import java.sql.Date;
/*
 * 테이블 추가
use zzasikdb;
create table noticetbl (
notice_code INT PRIMARY KEY,
notice_title VARCHAR(50),
notice_content VARCHAR(1000),
notice_regdate DATETIME default(current_date())
);
 * */
public class NoticeVO {
	 private int notice_code;
	 private String notice_title;
	 private String notice_content;
	 private Date notice_regdate;
	public int getNotice_code() {
		return notice_code;
	}
	public void setNotice_code(int notice_code) {
		this.notice_code = notice_code;
	}
	public String getNotice_title() {
		return notice_title;
	}
	public void setNotice_title(String notice_title) {
		this.notice_title = notice_title;
	}
	public String getNotice_content() {
		return notice_content;
	}
	public void setNotice_content(String notice_content) {
		this.notice_content = notice_content;
	}
	public Date getNotice_regdate() {
		return notice_regdate;
	}
	public void setNotice_regdate(Date notice_regdate) {
		this.notice_regdate = notice_regdate;
	}
	 
	 

}
