package com.lmy.booksserver.service;

import com.lmy.booksserver.mapper.BookMapper;
import com.lmy.booksserver.pojo.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    BookMapper bookMapper;

    public List<Book> getBooks(){
        return bookMapper.getBooks();
    }

    public Book getBookById(int id){
        return bookMapper.getBookById(id);
    }
}
