package com.cs.dms.dao.impl;

import com.cs.dms.dao.base.AbstractDmsDao;
import com.cs.dms.dao.entity.OrgEntity;
import com.cs.dms.dao.exception.DMSDaoException;
import com.cs.dms.dao.intf.OrganizationDao;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.TypedQuery;

import java.math.BigInteger;
import java.util.List;


@Repository
@Qualifier("OrganizationDao")
@Transactional
public class OrganizationDaoImpl extends AbstractDmsDao implements
        OrganizationDao {

    @Override
    public OrgEntity readByKey(OrgEntity org) throws DMSDaoException {
        return entityManager.find(OrgEntity.class, org.getOrgId());
    }

    @Override
    public OrgEntity create(OrgEntity org) throws DMSDaoException {
        entityManager.persist(org);
        return org;
    }

    @Override
    public boolean update(OrgEntity org) throws DMSDaoException {
        entityManager.merge(org);
        return true;
    }

    @Override
    public List<OrgEntity> getUserOrgnizations(BigInteger userId) {

        List<OrgEntity> userOrgs = null;
        String queryString = "SELECT o FROM OrgEntity o where o.userId = ?1";
        TypedQuery<OrgEntity> query = entityManager.createQuery(queryString,
                OrgEntity.class);
        query.setParameter(1, userId);
        userOrgs = query.getResultList();

        return userOrgs;
    }

    public boolean delete(OrgEntity orgEntity) throws DMSDaoException {
        boolean deleted = true;

        entityManager.remove(entityManager.contains(orgEntity) ? orgEntity : entityManager.merge(orgEntity));

        if (readByKey(orgEntity) != null) {
            deleted = false;
        }
        return deleted;
    }
}
