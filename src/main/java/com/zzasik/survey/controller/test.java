package com.zzasik.survey.controller;

import java.util.ArrayList;
import java.util.Random;

public class test {
	public static void main(String[] args) {
		ArrayList <String> arrList = new ArrayList<String>();
		
		arrList.add("테스트");
		
		System.out.println(arrList);
		
		arrList.remove(String.valueOf("저탄고지"));
		
		System.out.println(arrList);
		
		double i = Math.random();
		
		int ii = (int)(i*100000);
		System.out.println(ii);
		System.out.println(ii);
	}
}
