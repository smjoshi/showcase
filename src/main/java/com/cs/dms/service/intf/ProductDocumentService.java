package com.cs.dms.service.intf;

import java.math.BigInteger;
import java.util.List;

import com.cs.dms.service.domain.model.ProductDocDetail;
import com.cs.dms.service.domain.model.ProductDocument;
import com.cs.dms.service.exception.DMSException;


/**
 * @author sacjoshi
 *
 */
public interface ProductDocumentService {

	public ProductDocument upsertProductDocuments(ProductDocument pdd) throws DMSException;

	public List<ProductDocument> getProductDocuments(BigInteger productId) throws DMSException;

	public List<ProductDocDetail> getProductDocuments(Integer customerId, Integer productId) throws DMSException;

}
