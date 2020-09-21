package com.lmy.booksserver.mapper;

import com.lmy.booksserver.pojo.Access;

public interface AccessMapper {
    Access getAccessByToken(String token);
    int addAccess(Access access);
}
