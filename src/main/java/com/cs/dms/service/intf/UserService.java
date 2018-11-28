package com.cs.dms.service.intf;

import com.cs.dms.service.domain.model.User;
import com.cs.dms.service.exception.DMSException;
import com.cs.dms.service.exception.DuplicateUserException;


/**
 * @author SJoshi
 */
public interface UserService {

    public User registerUser(User user) throws DMSException, DuplicateUserException;

    public User getUserByLogin(User user) throws DMSException;

    public User getUserByCredentials(User user) throws DMSException;

    public User addUser(User user) throws DMSException;

    public User deleteUser(User user) throws DMSException;

    public User upsertUser(User user) throws DMSException;

}
