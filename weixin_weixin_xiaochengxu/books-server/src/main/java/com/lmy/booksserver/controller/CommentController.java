package com.lmy.booksserver.controller;

import com.lmy.booksserver.pojo.Comment;
import com.lmy.booksserver.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @RequestMapping(value="/write",method = RequestMethod.POST)
    public void writeComment(@RequestBody Comment comment){
        System.out.println("write comment "+comment);
        commentService.writeComment(comment);
    }
}
