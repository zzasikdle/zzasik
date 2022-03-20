package com.zzasik.board.service;

import java.sql.Date;
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
	public int joincheck(Map checkmap) throws Exception;
	public List<BoardVO> CoachingList(String board_code) throws Exception;
	public List<BoardVO> userdetailList(Map map) throws Exception;
	public void addcoachingAnswer(Map CoachingMap)throws Exception;
	public void addSeocndcoachingAnswer(Map CoachingMap)throws Exception;
	public List<BoardVO> getUserBoardList(String user_id) throws Exception;
	public List<BoardVO> getCoachingContents(Map map) throws Exception;
	public Date getStartDate(Map map) throws Exception;
	
	public List<BoardVO> getuserMessage(Map map) throws Exception;
	
} 