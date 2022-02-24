package com.zzasik.board.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
	
/*	@GetMapping(value = "/board/addNewBoard")
	@PostMapping(value = "/board/addNewBoard")
	public void addNewBoard(MultipartHttpServletRequest multipartRequest, HttpServletResponse resp) throws Exception{
		multipartRequest.setCharacterEncoding("utf-8");
		Map<String, Object> boardMap = new HashMap<String, Object>();
		Enumeration enu = multipartRequest.getParameterNames();
		while (enu.hasMoreElements()) {

			String name = (String) enu.nextElement();
			String value = multipartRequest.getParameter(name);
			System.out.printf("%s %s\n", name, value);
			boardMap.put(name, value);
			boardService.addNewBoard(boardMap);
	}
	
	
	}*/

/* 후기게시판 게시물 작성 */

@PostMapping(value = "/board/addNewBoard")
public String addNewBoard(BoardVO boardVO, RedirectAttributes rttr, HttpServletRequest request) throws Exception {
	logger.info("게시판 작성");

	boardService.addNewBoard(boardVO);

	rttr.addFlashAttribute("result", "write success");

	return "redirect:/board/listBoards";
}
	
	
	
	} // end class()
	
	

	
