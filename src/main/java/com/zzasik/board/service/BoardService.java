package com.zzasik.board.service;

import java.util.List;
import java.util.Map;

import com.zzasik.board.vo.BoardVO;

public interface BoardService {
	
	public List<BoardVO> listBoards() throws Exception;
	public void addNewBoard(BoardVO boardVO) throws Exception;
	
} 
