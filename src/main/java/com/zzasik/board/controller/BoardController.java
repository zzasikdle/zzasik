package com.zzasik.board.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.zzasik.board.service.BoardService;
import com.zzasik.board.vo.BoardVO;

@CrossOrigin("*")
@RestController("boardController")
public class BoardController {
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
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
public void addNewBoard(MultipartHttpServletRequest multipartRequest) throws Exception {
	multipartRequest.setCharacterEncoding("utf-8");
	Map<String,Object> boardMap = new HashMap<String,Object>();
	Enumeration enu = multipartRequest.getParameterNames();
	while (enu.hasMoreElements()) {
		String key = (String) enu.nextElement();
		String value = multipartRequest.getParameter(key);
		System.out.printf("%s %s\n", key, value);
		boardMap.put(key, value);
	}
	logger.info("게시판 작성");
	boardService.addNewBoard(boardMap);
 }

@GetMapping(value="/board/viewBoard")
public BoardVO viewBoard(@RequestParam("board_code")int board_code, HttpServletRequest request, 
		HttpServletResponse response) throws Exception {
	
	return boardService.viewBoard(board_code);
}

	
	
	
} // end class()
	
	

	
