package com.zzasik;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

	
	@RestController
	public class HelloController {
	    @GetMapping("/hello")
	    public List<String> hello() {
	        return Arrays.asList("hello1");
	    } 
	}


