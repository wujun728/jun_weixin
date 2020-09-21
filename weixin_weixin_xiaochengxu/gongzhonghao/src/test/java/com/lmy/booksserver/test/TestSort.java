package com.lmy.booksserver.test;

import java.util.Arrays;

public class TestSort {
    public static void main(String[] args) {
        String[] params={"fsdg","f123","ghaq2"};
        Arrays.sort(params);
        for(String str:params){
            System.out.println(str);
        }
    }
}
