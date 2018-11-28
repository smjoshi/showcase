package com.cs.dms.frontend.web.controller;

import javax.annotation.PostConstruct;

import com.cs.dms.frontend.web.utils.RestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;



@Component
public class WebAppConfigurer {

	@Value("${restapi.url}")
	private String restApiURL = null;

	@PostConstruct
	public void initializeApp() {
		RestUtils.setApiRootContextURL(restApiURL);
	}
}
