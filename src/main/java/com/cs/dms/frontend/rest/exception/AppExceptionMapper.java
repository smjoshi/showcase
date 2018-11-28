package com.cs.dms.frontend.rest.exception;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;


@Provider
public class AppExceptionMapper implements ExceptionMapper<ApplicationRestException> {

	@Override
	public Response toResponse(ApplicationRestException restException) {
		return Response.status(restException.getStatus()).entity(new com.cs.dms.frontend.rest.exception.ErrorMessage(restException))
				.type(MediaType.APPLICATION_JSON).build();
	}

}
