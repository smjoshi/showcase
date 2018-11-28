package com.cs.dms.service.intf;

import java.math.BigInteger;
import java.util.List;

import com.cs.dms.service.domain.model.Product;
import com.cs.dms.service.exception.DMSException;

public interface ProductService {
	
	public Product upsertProduct(Product product) throws DMSException;
	
	public List<Product> getProductsByOrg(BigInteger orgId) throws DMSException;
	

}
