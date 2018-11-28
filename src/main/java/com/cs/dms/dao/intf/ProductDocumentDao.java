package com.cs.dms.dao.intf;

import java.math.BigInteger;
import java.util.List;

import com.cs.dms.dao.base.BaseDao;
import com.cs.dms.dao.entity.ProductDocumentEntity;
import com.cs.dms.dao.entity.ProductEntity;

public interface ProductDocumentDao extends BaseDao<ProductDocumentEntity> {
	
	public List<ProductDocumentEntity> getProductDocuments(
            BigInteger productId);

	public ProductEntity getProductDocuments(Integer orgId, Integer productId);

}
