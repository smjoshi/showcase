package com.cs.dms.dao.impl;


import com.cs.dms.dao.base.AbstractDmsDao;
import com.cs.dms.dao.entity.ProductEntity;
import com.cs.dms.dao.exception.DMSDaoException;
import com.cs.dms.dao.intf.ProductDao;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.TypedQuery;
import java.math.BigInteger;
import java.util.List;


@Repository
@Qualifier("productDao")
@Transactional
public class ProductDaoImpl extends AbstractDmsDao implements ProductDao {

    @Override
    public ProductEntity readByKey(ProductEntity product) throws DMSDaoException {
        return entityManager.find(ProductEntity.class, product.getProductId());
    }

    @Override
    public ProductEntity create(ProductEntity product) throws DMSDaoException {
        entityManager.persist(product);
        return product;
    }

    @Override
    public boolean update(ProductEntity product) throws DMSDaoException {
        entityManager.merge(product);
        return true;
    }

    @Override
    public List<ProductEntity> getOrgProducts(BigInteger orgId) {

        List<ProductEntity> productList = null;

        try {
            String queryStr = "SELECT p FROM ProductEntity p where p.orgId = ?1";
            TypedQuery<ProductEntity> query = entityManager.createQuery(queryStr,
                    ProductEntity.class);
            query.setParameter(1, orgId);
            productList = query.getResultList();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            productList = null;
        }

        return productList;
    }

    public boolean delete(ProductEntity productEntity) throws DMSDaoException {
        boolean deleted = true;

        entityManager.remove(entityManager.contains(productEntity) ? productEntity : entityManager.merge(productEntity));

        if (readByKey(productEntity) != null) {
            deleted = false;
        }
        return deleted;
    }
}
