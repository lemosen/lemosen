package com.lemosen.web.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class MainRestCtrl {

    @GetMapping(path="index")
    public String index(){
        return "Hello welcome lemosen word =_=";
    }

}
