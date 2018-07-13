package com.lemosen.admin.rest;

import com.lemosen.core.service.IUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/")
public class MainRest {
    @Resource
    private IUserService userService;

    @GetMapping("/index")
    public String getUserList() {

        return userService.findUser().getUserName();
    }
}
