package com.cs.dms.dao.intf;

import java.math.BigInteger;
import java.util.List;

import com.cs.dms.dao.base.BaseDao;
import com.cs.dms.dao.entity.ProductDocConfEntity;


public interface ProductDocConfDao extends BaseDao<ProductDocConfEntity> {

	public List<ProductDocConfEntity> getProductDocConfigurations(
            BigInteger productId);
}
