package com.zzasik.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.zzasik.board.vo.BoardVO;


@Mapper
public interface AdminMapper {
	public void writeBoard(BoardVO boardVO);

}
