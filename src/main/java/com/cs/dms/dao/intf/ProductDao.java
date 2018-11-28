package com.cs.dms.dao.intf;

import com.cs.dms.dao.base.BaseDao;
import com.cs.dms.dao.entity.ProductEntity;

import java.math.BigInteger;
import java.util.List;


public interface ProductDao extends BaseDao<ProductEntity> {

	public List<ProductEntity> getOrgProducts(BigInteger userId);

}
