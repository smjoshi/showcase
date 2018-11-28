package com.cs.dms.dao.intf;

import com.cs.dms.dao.base.BaseDao;
import com.cs.dms.dao.exception.DMSDaoException;
import com.cs.dms.dao.entity.UserEntity;

/**
 * Created by SJoshi on 6/24/2015.
 */
public interface UserDao extends BaseDao<UserEntity> {

    public UserEntity getUserByLoginId(String loginId) throws DMSDaoException;
    
    public UserEntity getUserByCredentials(UserEntity user) throws DMSDaoException;


}
