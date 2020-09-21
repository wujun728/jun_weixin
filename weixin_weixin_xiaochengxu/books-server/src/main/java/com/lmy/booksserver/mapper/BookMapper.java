package com.lmy.booksserver.mapper;

import com.lmy.booksserver.pojo.Book;

import java.util.List;

public interface BookMapper {
    List<Book> getBooks();
    Book getBookById(int id);
}
