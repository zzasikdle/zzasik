package com.zzasik.board.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.sql.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.zzasik.board.service.BoardService;
import com.zzasik.board.vo.BoardVO;
  
@CrossOrigin("*")
@RestController("boardController")
public class BoardController {
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	private static final String ARTICLE_IMAGE_REPO = "D:\\ddd\\zzasik\\board_image";
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private BoardVO boardVO;
	
	public BoardController() { 
		
	}
  

	@GetMapping(value = "/board/listBoards")
	@PostMapping(value = "/board/listBoards")
	public List<BoardVO> listBoards(HttpServletRequest request, HttpServletResponse response) throws Exception {

		List<BoardVO> BoardsList = boardService.listBoards();
		System.out.println(BoardsList);
		return BoardsList;
	}
	  
	@PostMapping(value = "/board/addNewBoard")
	public ResponseEntity addNewBoard(MultipartHttpServletRequest multipartRequest,  HttpServletResponse response) throws Exception {
		multipartRequest.setCharacterEncoding("utf-8");
		Map<String,Object> boardMap = new HashMap<String,Object>();
		Enumeration enu = multipartRequest.getParameterNames();
		while (enu.hasMoreElements()) {
			String name = (String) enu.nextElement();
			String value = multipartRequest.getParameter(name);
			System.out.printf("%s %s\n", name, value);
			boardMap.put(name, value);
		}
		  
		String imageFilename = upload(multipartRequest);
		boardMap.put("board_code", 0);
		boardMap.put("imageFilename", imageFilename);
		Map<String, String> map = new HashMap<String, String>();
		ResponseEntity resEnt = null;
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("Content-Type", "application/json; charset=utf-8");
		
		try {
			int board_code = boardService.addNewBoard(boardMap);
			if (imageFilename != null && imageFilename.length() != 0) {
				File srcFile = new File(ARTICLE_IMAGE_REPO + "\\" + "temp" + "\\" + imageFilename);
				File destDir = new File(ARTICLE_IMAGE_REPO + "\\" + board_code);
				FileUtils.moveFileToDirectory(srcFile, destDir, true);
			}
			map.put("message", "글쓰기 완료");
			map.put("path", "/board/list");
			resEnt = new ResponseEntity(map, responseHeaders, HttpStatus.CREATED);
		} catch (Exception e) {
			File srcFile = new File(ARTICLE_IMAGE_REPO + "\\" + "temp" + "\\" + imageFilename);
			srcFile.delete();
			map.put("message", "오류발생");
			map.put("path", "/");
			resEnt = new ResponseEntity(map, responseHeaders, HttpStatus.CREATED);
			e.printStackTrace();
		}
		return resEnt;
		
	 }

// 占싱뱄옙占쏙옙 占쏙옙占싸듸옙占싹깍옙
	private String upload(MultipartHttpServletRequest multipartRequest) throws Exception {
		String imageFilename = null;
		Iterator<String> fileNames = multipartRequest.getFileNames();

		while (fileNames.hasNext()) {
			String fileName = fileNames.next();
			MultipartFile mFile = multipartRequest.getFile(fileName);
			imageFilename = mFile.getOriginalFilename();
			File file = new File(ARTICLE_IMAGE_REPO + "\\" + "temp" + "\\" + fileName);
			if (mFile.getSize() != 0) { // File Null Check
				if (!file.exists()) { 
					file.getParentFile().mkdirs(); 
					mFile.transferTo(new File(ARTICLE_IMAGE_REPO + "\\" + "temp" + "\\" + imageFilename)); // 占쌈시뤄옙 占쏙옙占쏙옙占�
																											// multipartFile占쏙옙
																											// 占쏙옙占쏙옙 占쏙옙占싹뤄옙 占쏙옙占쏙옙
				}
			}

		}
		return imageFilename;
	}
//占쏢세븝옙占쏙옙 占쏙옙占쏙옙占쏙옙
@GetMapping(value="/board/viewBoard")
public BoardVO viewBoard(@RequestParam("board_code")int board_code, HttpServletRequest request, 
		HttpServletResponse response) throws Exception {
	
	return boardService.viewBoard(board_code);
}

//占쏙옙占쌉쏙옙청 占싹깍옙
@GetMapping(value="/board/joinBoard")
public Map<String, Object> joinBoard(@RequestParam("board_code") String board_code, @RequestParam("user_id") String user_id ,@RequestParam("teacher_id") String teacher_id) throws Exception {
	System.out.println("board_code:"+board_code);
	System.out.println("user_id:"+user_id);
	System.out.println("**********************************joinBoard ����*********************************");
	Map<String,Object> checkmap = new HashMap<String,Object>();
	
	checkmap.put("user_id", user_id);
	checkmap.put("board_code", board_code);
	int resultCheck=boardService.joincheck(checkmap);
	System.out.println(resultCheck);
	Map<String,Object> joinMap = new HashMap<String,Object>();
	if (resultCheck==0){

		joinMap.put("user_id", user_id);
		joinMap.put("board_code",board_code);
		joinMap.put("teacher_id", teacher_id);	
		boardService.joinBoard(joinMap);
		joinMap.put("message", "신청완료 ^^");
		
	}else {
		joinMap.put("message", "이미 신청한 프로그램입니다.");
	
		
	}
	return joinMap;
	
}

//teacherBoard 占쏙옙占쏙옙
@GetMapping(value="/board/teacherBoard")
public List<BoardVO> teacherBoard(@RequestParam("user_id") String user_id ,HttpServletRequest request, 
		HttpServletResponse response) throws Exception {
	System.out.println("user_id="+user_id);
	
	List<BoardVO> teahcerList =  boardService.viewTeacherBoard(user_id);
	
	return teahcerList;
}
 
//占쌉시깍옙 占쏙옙占쏙옙占싹깍옙
@GetMapping(value="/board/delBoard")
public void delBoard(@RequestParam("board_code") String board_code )throws Exception {
	System.out.println("board_code="+board_code);
	Map<String,Object> delMap = new HashMap<String,Object>();
	delMap.put("board_code", board_code);
	boardService.delBoard(delMap);

}
 
//占쏙옙占쏙옙占싹깍옙
@PostMapping(value = "/board/modifyBoard")
public ResponseEntity modifyBoard(MultipartHttpServletRequest multipartRequest,  HttpServletResponse response) throws Exception {
	multipartRequest.setCharacterEncoding("utf-8");
	System.out.println("----------------占쏙옙占쏙옙 占쏙옙트占싼뤄옙 -------------------");
	Map<String,Object> boardMap = new HashMap<String,Object>();
	Enumeration enu = multipartRequest.getParameterNames();
	while (enu.hasMoreElements()) {
		String name = (String) enu.nextElement();
		String value = multipartRequest.getParameter(name);
		System.out.printf("%s %s\n", name, value);
		boardMap.put(name, value);
	}
	 
	String imageFilename = upload(multipartRequest);
	String board_code = (String) boardMap.get("board_code");
	boardMap.put("imageFilename", imageFilename);
	Map<String, String> map = new HashMap<String, String>();
	ResponseEntity resEnt = null;
	HttpHeaders responseHeaders = new HttpHeaders();
	responseHeaders.add("Content-Type", "application/json; charset=utf-8");
	
	try {
		boardService.modifyBoard(boardMap);
		if (imageFilename != null && imageFilename.length() != 0) {
			File srcFile = new File(ARTICLE_IMAGE_REPO + "\\" + "temp" + "\\" + imageFilename);
			File destDir = new File(ARTICLE_IMAGE_REPO + "\\" + board_code);
			FileUtils.moveFileToDirectory(srcFile, destDir, true);
			
			String originalFileName = (String) boardMap.get("originalFileName");
			File oldFile = new File(ARTICLE_IMAGE_REPO + "\\" + board_code + "\\" + originalFileName);
			oldFile.delete();
		}
		map.put("message", "占쏙옙占쏙옙占싹뤄옙 .");
		map.put("path", "/board/list/"+Integer.parseInt(board_code));
		resEnt = new ResponseEntity(map, responseHeaders, HttpStatus.CREATED);
	} catch (Exception e) {
		File srcFile = new File(ARTICLE_IMAGE_REPO + "\\" + "temp" + "\\" + imageFilename);
		srcFile.delete();
		map.put("message", "占쏙옙占쏙옙占쏙옙 占쌩삼옙占쌩쏙옙占싹댐옙. 占쌕쏙옙 占시듸옙占쏙옙 占쌍쇽옙占쏙옙.");
		map.put("path", "/");
		resEnt = new ResponseEntity(map, responseHeaders, HttpStatus.CREATED);
		e.printStackTrace();
	}
	return resEnt;
	
 }


//占쏙옙占쏙옙회占쏙옙占싯삼옙
@GetMapping("/board/searchboard")
public List<BoardVO> searchboard(@RequestParam("board_code")String  board_code, HttpServletRequest request, 
		HttpServletResponse response) throws Exception {
	System.out.println(board_code);
	
	List<BoardVO> TeacheruserList =  boardService.TeacheruserList(board_code);
	
	return TeacheruserList;
}


//占쏙옙占실쇽옙占쏙옙 占쏙옙튼
@GetMapping(value="/board/subinsert")
public void subinsert(@RequestParam("user_id") String user_id , @RequestParam("board_code") int board_code) throws Exception {
	System.out.println("user_id:"+user_id);
	Map<String,Object> joinMap = new HashMap<String,Object>();
	joinMap.put("user_id", user_id);
	joinMap.put("board_code", board_code);
	System.out.println(joinMap);
	boardService.suganginsert(joinMap);
	System.out.println("----------------占싹뤄옙 -------------");

}

//占쏙옙占쏙옙占쏙옙칭占싯삼옙
@GetMapping("/board/coachingList")
public List<BoardVO> coachingList(@RequestParam("board_code")String  board_code ,HttpServletRequest request, 
		HttpServletResponse response) throws Exception {
	System.out.println("board_code:" +board_code);
	List<BoardVO> coachingList = boardService.CoachingList(board_code);

	return coachingList;
}


//占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 占싯삼옙
@GetMapping("/board/userdetail")
public List<BoardVO> userdetail(@RequestParam("user_id")String  user_id ,@RequestParam("board_code") String board_code ,HttpServletRequest request, 
		HttpServletResponse response) throws Exception {
	
	System.out.println("#####################userdetail##########################################");
	System.out.println("user_id:"+ user_id);
	System.out.println("board_code:"+ board_code);
	
	Map<String,Object> map = new HashMap<String,Object>();
	map.put("user_id", user_id);
	map.put("board_code", board_code);
	System.out.println("user_detail"+map);
	
	List<BoardVO> userdetailList = boardService.userdetailList(map);


	return userdetailList;

}

@PostMapping(value = "/board/coachingAnswer")
public Map<String,Object> coachingAnswer(MultipartHttpServletRequest multipartRequest,  HttpServletResponse response) throws Exception {
	multipartRequest.setCharacterEncoding("utf-8");

	Map<String,Object> CoachingMap = new HashMap<String,Object>();
	Enumeration enu = multipartRequest.getParameterNames();
	while (enu.hasMoreElements()) {
		String name = (String) enu.nextElement();
		String value = multipartRequest.getParameter(name);
		System.out.printf("name:%s value:%s\n", name, value);
		CoachingMap.put(name, value);
		
		
	}
	System.out.println(CoachingMap.get("coaching_num"));
	if (CoachingMap.get("coaching_num").equals("1") ) {
		System.out.println("1입니다 ");
		boardService.addcoachingAnswer(CoachingMap);
		
	}else {
		System.out.println("1이상입니다 ");
		boardService.addSeocndcoachingAnswer(CoachingMap);
		}
	
	
return CoachingMap;


}

//�쑀��媛� �떊泥��븳 board �젙蹂� 紐⑤몢 媛��졇�삤�뒗 �븿�닔
@GetMapping(value="/board/userBoardList")
public List<BoardVO> userBoardList(@RequestParam("user_id") String user_id) throws Exception {
	
	List<BoardVO> boardlist =  boardService.getUserBoardList(user_id);
	
	return boardlist;
}

//식단 정보 모두 가져오기
@GetMapping(value="/board/mealinfo")
public List<BoardVO> getCoachingContents(@RequestParam("user_id") String user_id,@RequestParam("board_code") int board_code) throws Exception {
	if(board_code==-1) return null;
	
	Map<String,Object> map = new HashMap<String,Object>();
	map.put("user_id", user_id);
	map.put("board_code", board_code);
	List<BoardVO> mealinfo =  boardService.getCoachingContents(map);
	
	return mealinfo;
}

//�꽌鍮꾩뒪 �떆�옉 �궇吏� 媛��졇�삤湲�
@GetMapping(value="/board/startdate")
public BoardVO getStartDate(@RequestParam("user_id") String user_id,@RequestParam("board_code") int board_code) throws Exception {
	Map<String,Object> map = new HashMap<String,Object>();
	map.put("user_id", user_id);
	map.put("board_code", board_code);
	
	return boardService.getStartDate(map);
}

//유저 -> 코치 메시지 보내기 
@GetMapping(value="/board/sendtocoach")
public void sendMessageToCoach(@RequestParam("user_id") String user_id,@RequestParam("board_code") int board_code,@RequestParam("coaching_num") int coaching_num,@RequestParam("useranswer") String useranswer) throws Exception {
	Map<String,Object> map = new HashMap<String,Object>();
	map.put("user_id", user_id);
	map.put("board_code", board_code);
	map.put("coaching_num", coaching_num);
	map.put("useranswer", useranswer);
	
	boardService.sendMessageToCoach(map);
	
}

@GetMapping(value="/board/userMessage")
public List<BoardVO> userMessage(@RequestParam("user_id") String user_id,@RequestParam("board_code") int board_code, @RequestParam("coaching_num") int coaching_num) throws Exception {
	Map<String,Object> map = new HashMap<String,Object>();
	map.put("user_id", user_id);
	map.put("board_code", board_code);
	map.put("coaching_num", coaching_num);
	System.out.println(map);
	List<BoardVO> userMessage =  boardService.getuserMessage(map);
	System.out.println(userMessage);	
	return userMessage;
} 



 
} // end class()
	
	

	
