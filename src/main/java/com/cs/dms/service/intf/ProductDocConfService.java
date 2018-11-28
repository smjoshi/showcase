package com.cs.dms.service.intf;

import com.cs.dms.service.domain.model.ProductDocConfiguration;
import com.cs.dms.service.exception.DMSException;

import java.math.BigInteger;
import java.util.List;


/**
 * @author SJoshi
 *
 */
public interface ProductDocConfService {
	
	public ProductDocConfiguration upsertProductDocConfiguration(ProductDocConfiguration pdc) throws DMSException;
	
	public List<ProductDocConfiguration> getProductDocConfigurations(BigInteger productId) throws DMSException;
	
	public List<ProductDocConfiguration> upsertProductDocConfigurationsList(List<ProductDocConfiguration> confs) throws DMSException;
	

}
