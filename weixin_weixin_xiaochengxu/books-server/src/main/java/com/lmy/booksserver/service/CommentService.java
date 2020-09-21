package com.lmy.booksserver.service;

import com.lmy.booksserver.mapper.CommentMapper;
import com.lmy.booksserver.pojo.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    CommentMapper commentMapper;

    public void writeComment(Comment comment){
        commentMapper.writeComment(comment);
    }
}
