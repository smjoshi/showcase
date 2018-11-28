package com.cs.dms.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;


import com.cs.dms.dao.entity.ProductEntity;
import com.cs.dms.dao.exception.DMSDaoException;
import com.cs.dms.dao.intf.ProductDao;
import com.cs.dms.service.domain.model.Product;
import com.cs.dms.service.exception.DMSException;
import com.cs.dms.service.intf.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service("productService")
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductDao productDao = null;

	@Override
	public Product upsertProduct(Product product) throws DMSException {
		Product processedProduct = null;
		if (product != null){
			ProductEntity productEntity = prepareProductEntity(product);
			try {
				if (productEntity.getProductId() == null){
					productEntity = productDao.create(productEntity);
				}else
				{
					productDao.update(productEntity);
				}
				processedProduct = populateProductModel(productEntity);
			} catch (DMSDaoException e) {
				e.printStackTrace();
				throw new DMSException(203, e.getMessage());
			}
		}
		return processedProduct;
	}
	

	@Override
	public List<Product> getProductsByOrg(BigInteger orgId) throws DMSException {
		List<ProductEntity> products = productDao.getOrgProducts(orgId);
		return pupulateModelList(products);
	}
	
	
	
	/**
	 * @param org
	 * @return
	 */
	private ProductEntity prepareProductEntity(Product product){
		ProductEntity productEntity = new ProductEntity();
		
		if (product != null){
			productEntity.setOrgId(product.getOrgId());
			productEntity.setProductName(product.getProductName());
			productEntity.setProductCode(product.getProductCode());
			productEntity.setProductDesc(product.getDescription());
			productEntity.setProductId(product.getProductId());
		}

		return productEntity;
		
	}
	
	
	/**
	 * @param orgEntity
	 * @return
	 */
	private Product populateProductModel(ProductEntity productEntity){

		Product product = new Product();
		if (productEntity != null){
			product.setOrgId(productEntity.getOrgId());
			product.setProductId(productEntity.getProductId());
			product.setProductCode(productEntity.getProductCode());
			product.setProductName(productEntity.getProductName());
			product.setDescription(productEntity.getProductDesc());
			
		}
		return product;
	}
	
	
	/**
	 * @param orgs
	 * @return
	 */
	private List<Product> pupulateModelList(List<ProductEntity> products){
		
		List<Product> productList = new ArrayList<>();
		if (products != null && !products.isEmpty()){
			for (ProductEntity product : products){
				productList.add(populateProductModel(product));
			}
		}
		return productList;
	}


}
