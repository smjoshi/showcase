package com.cs.dms.frontend.rest.resource;

import java.math.BigInteger;
import java.util.List;


import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import javax.ws.rs.core.MediaType;

import com.cs.dms.frontend.rest.exception.ApplicationRestException;
import com.cs.dms.service.domain.model.Product;
import com.cs.dms.service.exception.DMSException;
import com.cs.dms.service.intf.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
@Path("/products")
public class ProductResource {
	
	@Autowired
	private ProductService productService = null;
	
	/**
	 * @param orgId
	 * @return
	 */
	@GET
	@Path("/org/{orgId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Product> getAllProducts(@PathParam("orgId") BigInteger orgId){
		
		List<Product> productList = null;
		
		try {
			productList = productService.getProductsByOrg(orgId);
		} catch (DMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return productList;
	}
	
	
	/**
	 * @param productId
	 * @return
	 */
	@GET
	@Path("/{productId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Product getProduct(@PathParam("productId") BigInteger productId){
		
		Product product = null;
		throw new UnsupportedOperationException(" getProduct - Operation not yet implemented");
	}
	
	
	/**
	 * @param product
	 * @return
	 */
	@POST
	@Path("/product")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Product addOrUpdateProduct(Product product) throws ApplicationRestException {
		
		Product dbReturnedProduct = null;
		try {
		     dbReturnedProduct = productService.upsertProduct(product);
		} catch (DMSException e) {
			e.printStackTrace();
			dbReturnedProduct = null;
			throw new ApplicationRestException();
		}
		return dbReturnedProduct;
	}
	
	/**
	 * @param product
	 * @return
	 */
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public boolean deleteProduct(Product product){
		throw new UnsupportedOperationException("deleteProduct - Operation not yet implemented");
	}
	

}
