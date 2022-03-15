package com.zzasik.board.service;

import java.util.List;
import java.util.Map;

import com.zzasik.board.vo.BoardVO;

public interface BoardService {
	
	public List<BoardVO> listBoards() throws Exception;
	public int addNewBoard(Map boardMap) throws Exception;
	public void joinBoard(Map joinMap) throws Exception;
	public BoardVO viewBoard(int board_code) throws Exception;
	public List<BoardVO> viewTeacherBoard(String user_id) throws Exception;
	public void delBoard(Map delMap) throws Exception;
	public void modifyBoard(Map boardMap) throws Exception;
	public List<BoardVO> TeacheruserList(String board_code) throws Exception;
	public void suganginsert(Map joinMap) throws Exception;
	
	
	
} 