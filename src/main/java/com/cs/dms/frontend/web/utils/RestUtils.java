package com.cs.dms.frontend.web.utils;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation.Builder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.client.ClientConfig;
import org.glassfish.jersey.jackson.JacksonFeature;

public class RestUtils {

	//static String apiRootContextURL = "http://localhost:8080/dms-web/api/";
	static String apiRootContextURL = null;

	public static Response callPostRestService(String resourceUrl, Form form) {
		ClientConfig clientConfig = new ClientConfig();
		clientConfig.register(JacksonFeature.class);

		Client client = ClientBuilder.newClient(clientConfig);

		WebTarget target = client.target(resourceUrl);

		Builder request = target.request();
		Response response = request.post(Entity.form(form));

		return response;
	}

	public static Response callPostJsonRestService(String resourcePath,
			Object requestObject, Object type) {
		
		
		ClientConfig clientConfig = new ClientConfig();
		clientConfig.register(JacksonFeature.class);

		Client client = ClientBuilder.newClient(clientConfig);

		WebTarget target = client.target(apiRootContextURL).path(resourcePath);

		Response response = target.request(MediaType.APPLICATION_JSON_TYPE)
				.post(Entity.entity(requestObject,
						MediaType.APPLICATION_JSON_TYPE));

		return response;
	}
	
	
	public static Response callGetRestService(String resourcePath){
		
		ClientConfig clientConfig = new ClientConfig();
		clientConfig.register(JacksonFeature.class);

		Client client = ClientBuilder.newClient(clientConfig);

		WebTarget target = client.target(apiRootContextURL).path(resourcePath);

		Response response = target.request().get();

		return response;
		
	}

	public static String getApiRootContextURL() {
		return apiRootContextURL;
	}

	public static void setApiRootContextURL(String apiRootContextURL) {
		RestUtils.apiRootContextURL = apiRootContextURL;
	}
	
	

}
