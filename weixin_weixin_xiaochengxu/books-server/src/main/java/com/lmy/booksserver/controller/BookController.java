package com.lmy.booksserver.controller;

import com.lmy.booksserver.pojo.Book;
import com.lmy.booksserver.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/getBooks")
    public List<Book> getBooks(){
        return bookService.getBooks();
    }

    @GetMapping("/queryBook")
    public Book getBookById(@RequestParam("id") int id,
                            @RequestParam("skey") String skey){
        return null;
    }
}
