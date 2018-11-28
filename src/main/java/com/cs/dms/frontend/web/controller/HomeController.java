package com.cs.dms.frontend.web.controller;

import java.math.BigInteger;
import java.util.List;


import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;

import com.cs.dms.frontend.web.utils.RestUtils;
import com.cs.dms.service.domain.model.Product;
import com.cs.dms.service.domain.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;



@Controller
@SessionAttributes("user")
public class HomeController {

	private static String USER_PRODUCT_RESOURCE = "/products/org/{orgId}";
	String MANAGE_PRODUCT_VIEW = "manageProduct";
	
	
	@RequestMapping(value="/users/product" , method=RequestMethod.GET)
	public ModelAndView getUserProducts(@RequestParam(value = "userId", required = true) Long userId, @ModelAttribute("user") User user){
		
		//get user products 
		BigInteger orgId = user.getOrganizations().get(0).getOrgId();
		List<Product> products = getProducts(orgId);
		ModelAndView mv = new ModelAndView(MANAGE_PRODUCT_VIEW);
		mv.getModel().put("products", products);
		
		return mv;
	}
	
	
	
	private List<Product> getProducts(BigInteger orgId){

		List<Product> userProducts = null;
		
		UriComponents uriComponents = UriComponentsBuilder.newInstance().path(USER_PRODUCT_RESOURCE).build().expand(orgId).encode();
		String uri = uriComponents.getPath();
		Response response = RestUtils.callGetRestService(uri);
		
		if (response.getStatus() == 200){
			userProducts = response.readEntity(new GenericType<List<Product>>(){});
		} 
		
		return userProducts;
	}
}
