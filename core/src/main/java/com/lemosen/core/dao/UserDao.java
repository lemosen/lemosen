package com.lemosen.core.dao;

import com.lemosen.core.entity.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends PagingAndSortingRepository<User, Integer>, JpaSpecificationExecutor<User> {

    User findByUserId(int userName);

}
