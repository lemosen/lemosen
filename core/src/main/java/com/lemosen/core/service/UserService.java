package com.lemosen.core.service;

import com.lemosen.core.dao.UserDao;
import com.lemosen.core.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserService implements IUserService{
    @Resource
    private UserDao dao;


    @Override
    public User findUser() {
        return dao.findByUserId(1);
    }
}
