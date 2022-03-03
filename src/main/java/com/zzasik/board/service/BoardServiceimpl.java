package com.zzasik.board.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.zzasik.board.dao.BoardDAO;
import com.zzasik.board.vo.BoardVO;
import com.zzasik.mapper.AdminMapper;

@Service
public class BoardServiceimpl implements BoardService {
 
	@Autowired
	private BoardDAO boardDAO;
	
	@Autowired
	private AdminMapper adminMapper;
	
	public BoardServiceimpl() {
		
	}

	@Override
	public List<BoardVO> listBoards() throws Exception {
		List<BoardVO> BoardList = boardDAO.selectAllBoardsList();
		return BoardList;
	}
	
	
	
	@Override
	public int addNewBoard(Map boardMap) throws Exception {
		int board_code = boardDAO.selectNewBoardCode();
		boardMap.put("board_code", board_code);
		 boardDAO.addNewBoard(boardMap);
		 return board_code;
		
	}
	
	@Override
	public BoardVO viewBoard(int board_code) throws Exception {
			BoardVO boardvo =boardDAO.selectBoard(board_code);
		return boardvo;
	}
	
	@Override
	public void joinBoard(Map joinMap) throws Exception {
		boardDAO.joinBoard(joinMap);
		
	}
	
	
	
	
	
}
