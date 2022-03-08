package com.zzasik.board.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
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
		map.put("message", "새글을 추가했습니다.");
		map.put("path", "/board/list");
		resEnt = new ResponseEntity(map, responseHeaders, HttpStatus.CREATED);
	} catch (Exception e) {
		File srcFile = new File(ARTICLE_IMAGE_REPO + "\\" + "temp" + "\\" + imageFilename);
		srcFile.delete();
		map.put("message", "오류가 발생했습니다. 다시 시도해 주세요.");
		map.put("path", "/");
		resEnt = new ResponseEntity(map, responseHeaders, HttpStatus.CREATED);
		e.printStackTrace();
	}
	return resEnt;
	
 }

// 이미지 업로드하기
	private String upload(MultipartHttpServletRequest multipartRequest) throws Exception {
		String imageFilename = null;
		Iterator<String> fileNames = multipartRequest.getFileNames();

		while (fileNames.hasNext()) {
			String fileName = fileNames.next();
			MultipartFile mFile = multipartRequest.getFile(fileName);
			imageFilename = mFile.getOriginalFilename();
			File file = new File(ARTICLE_IMAGE_REPO + "\\" + "temp" + "\\" + fileName);
			if (mFile.getSize() != 0) { // File Null Check
				if (!file.exists()) { // 경로상에 파일이 존재하지 않을 경우
					file.getParentFile().mkdirs(); // 경로에 해당하는 디렉토리들을 생성
					mFile.transferTo(new File(ARTICLE_IMAGE_REPO + "\\" + "temp" + "\\" + imageFilename)); // 임시로 저장된
																											// multipartFile을
																											// 실제 파일로 전송
				}
			}

		}
		return imageFilename;
	}
//상세보기 페이지
@GetMapping(value="/board/viewBoard")
public BoardVO viewBoard(@RequestParam("board_code")int board_code, HttpServletRequest request, 
		HttpServletResponse response) throws Exception {
	
	return boardService.viewBoard(board_code);
}

//가입신청 하기
@GetMapping(value="/board/joinBoard")
public void joinBoard(@RequestParam("board_code") String board_code, @RequestParam("user_id") String user_id ,@RequestParam("teacher_id") String teacher_id) throws Exception {
	System.out.println("board_code:"+board_code);
	System.out.println("user_id:"+user_id);
	Map<String,Object> joinMap = new HashMap<String,Object>();
	
	joinMap.put("user_id", user_id);
	joinMap.put("board_code", board_code);
	joinMap.put("teacher_id", teacher_id);
	
	System.out.println(joinMap);
	
	boardService.joinBoard(joinMap);
}





	
	
} // end class()
	
	

	
