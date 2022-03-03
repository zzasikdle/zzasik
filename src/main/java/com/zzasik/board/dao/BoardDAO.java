package com.zzasik.board.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;


import com.zzasik.board.vo.BoardVO;

@Repository
@Mapper
public interface BoardDAO {
	
	public BoardVO writeBoard(BoardVO boardDTO) throws DataAccessException;
	public List selectAllBoardsList() throws DataAccessException;
	public BoardVO addNewBoard(Map boardMap) throws DataAccessException;
	public void joinBoard(Map joinMap) throws DataAccessException;
	public int selectNewBoardCode() throws DataAccessException;
	public BoardVO selectBoard(int board_code) throws DataAccessException;
	
}
