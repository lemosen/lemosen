package com.lemosen.web.action;

import com.lemosen.core.entity.User;
import com.lemosen.core.service.IUserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
@RequestMapping(value = "/")
public class MainController  {
    @Resource
    private IUserService userService;

    @RequestMapping(value = "lemosen", method = RequestMethod.GET)
    public String getAttachments(ModelMap modelMap) {
        modelMap.addAttribute("loginUser",userService.getUserById(1));
        return "index";
    }
}
