package com.cs.dms.service.impl;


import com.cs.dms.dao.entity.UserEntity;
import com.cs.dms.dao.exception.DMSDaoException;
import com.cs.dms.dao.intf.UserDao;
import com.cs.dms.service.domain.model.User;
import com.cs.dms.service.exception.DMSException;
import com.cs.dms.service.exception.DuplicateUserException;
import com.cs.dms.service.intf.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    UserDao userDao = null;

    @Override
    public User registerUser(User user) throws DMSException, DuplicateUserException {

        logger.info("UserServiceImpl.registerUser is invoked ");
        logger.debug("{componentName:UserServiceImpl, methodName:registerUser, parameters{user.toString()}}");
        try {

            UserEntity userToBeCreated = prepareUserEntity(user);

            // get user details to check if user is already exists
            User returnedUser = getUserByCredentials(user);

            if (returnedUser == null) {
                logger.debug("{debug:User is going to be created }");
                userToBeCreated = userDao.create(userToBeCreated);
                user.setUserId(userToBeCreated.getUserId());
            } else {
                logger.debug("{debug: Duplicate user }");
                // user already exists , throw duplicate registration exception
                throw new DuplicateUserException();
            }

        } catch (DMSDaoException e) {
            e.printStackTrace();
            logger.debug("{componentName:UserServiceImpl, methodName:registerUser , Exception:" + e.getCause() + "}");
            throw new DMSException(101, "Error while creating user");
        }
        return user;
    }

    @Override
    public User getUserByLogin(User user) throws DMSException {
        UserEntity fetchedUser = null;

        try {
            fetchedUser = userDao.getUserByLoginId(user.getLoginId());
            user = populateUserModel(fetchedUser);
        } catch (DMSDaoException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            throw new DMSException(102, "No such user found");
        }
        return user;
    }

    @Override
    public User getUserByCredentials(User user) throws DMSException {

        logger.debug("{componentName:UserServiceImpl, methodName:getUserByCredentials, parameters{user.toString()}}");
        UserEntity fetchedUser = null;

        try {
            UserEntity tobeFetched = prepareUserEntity(user);
            fetchedUser = userDao.getUserByCredentials(tobeFetched);
            user = populateUserModel(fetchedUser);
        } catch (DMSDaoException e) {
            logger.debug("{componentName:UserServiceImpl, methodName:getUserByCredentials,message:No such user found!}");
            throw new DMSException(102, "No Such user found");
        }

        if (fetchedUser == null){
            throw new DMSException(102, "No Such user found");
        }

        return user;
    }

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    private UserEntity prepareUserEntity(User user) {
        UserEntity userEntity = new UserEntity();

        userEntity.setEmail(user.getEmail());
        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userEntity.setLoginId(user.getLoginId());
        userEntity.setOrgName(user.getOrgName());
        userEntity.setPassword(user.getPassword());
        userEntity.setUserId(user.getUserId());

        return userEntity;

    }

    private User populateUserModel(UserEntity userEntity) {
        User user = null;

        if (userEntity != null) {
            user = new User();

            user.setEmail(userEntity.getEmail());
            user.setFirstName(userEntity.getFirstName());
            user.setLastName(userEntity.getLastName());
            user.setLoginId(userEntity.getLoginId());
            user.setOrgName(user.getOrgName());
            user.setPassword(userEntity.getPassword());
            user.setUserId(userEntity.getUserId());
        }

        return user;

    }

    @Override
    public User addUser(User user) throws DMSException {

        try {
            UserEntity userEntity = prepareUserEntity(user);
            userEntity = userDao.create(userEntity);
            user = populateUserModel(userEntity);
        } catch (DMSDaoException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            throw new DMSException();
        }

        return user;
    }

    @Override
    public User deleteUser(User user) throws DMSException {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.dc.dms.UserService#upsertUser(com.dc.dms.domain.User)
     */
    @Override
    public User upsertUser(User user) throws DMSException {

        UserEntity userEntity = prepareUserEntity(user);

        try {
            if (userEntity.getUserId() != null) {
                // update user Entity
                userDao.update(userEntity);
            } else {
                userDao.create(userEntity);
            }
        } catch (DMSDaoException e) {
            throw new DMSException(101, "Error while creating / updating User Entity");
        }

        return user;
    }

}
