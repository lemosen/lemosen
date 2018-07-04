package com.lemosen.web.rest;

import com.alibaba.fastjson.JSON;
import com.lemosen.core.utils.JsonUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class MainRestCtrl {

    List<UserMessage> messages;
//    String jsonFilePath = "/Users/hfy/message.json";
    String jsonFilePath = "/Users/hfy/message.json";

    public MainRestCtrl() {
        String datafromFile = JsonUtil.getDatafromFile(jsonFilePath);
        this.messages = JSON.parseArray(datafromFile, UserMessage.class);
    }

    @GetMapping(path = "index")
    public String index() {
        return "Hello welcome lemosen word =_=";
    }

    @GetMapping(path = "message")
    public String message(@RequestParam("name") String name, @RequestParam("message") String message, @RequestParam("img") String img) {
        UserMessage userMessage = new UserMessage();
        userMessage.setMessage(message);
        userMessage.setName(name);
        userMessage.setImg(img);
        this.messages.add(userMessage);
        String jsonString = JSON.toJSONString(this.messages);
        JsonUtil.saveDataToFile(jsonFilePath,jsonString);
        return "success";
    }

    @GetMapping(path = "getMessage")
    public List<UserMessage> getMessage() {
        return messages;
    }

}

class UserMessage {
    private String name;
    private String message;
    private String img;

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
