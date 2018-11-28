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
import com.cs.dms.service.domain.model.Organization;
import com.cs.dms.service.exception.DMSException;
import com.cs.dms.service.intf.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;




@Component
@Path("/orgs")
public class OrgnizationResource {

	@Autowired
	OrganizationService orgService;
	
	@GET
	@Path("/{orgId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Organization getOrgDetails(@PathParam("orgId") BigInteger orgId) throws ApplicationRestException {
		Organization org = null;
		try {
			org = orgService.getOrganizationDetail(orgId);
		} catch (DMSException e) {
			e.printStackTrace();
			throw new ApplicationRestException(500, "Error while retrieve orgnization details", "Error while retrieve orgnization details", null );
		}
		return org;
	}
	
	@GET
	@Path("/user/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Organization> getOrganizations(@PathParam("userId") BigInteger userId) throws ApplicationRestException{
		List<Organization> orgs = null;
		try {
			orgs = orgService.getUserOrganizations(userId);
			if (orgs == null || orgs.isEmpty()){
				throw new ApplicationRestException(404, "No Organization Details Found", "No Organization Details Found", null);
			}
		} catch (DMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			throw new ApplicationRestException(500,  "Error while retrieve orgnization details" , "Error while retrieve orgnization details", null );
		}
		return orgs;
	}
	
	@POST
	@Path("/org")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Organization addOrUpdateOrganization(Organization org) throws ApplicationRestException{
		
		try {
			org = orgService.upsertOrginzation(org);
		} catch (DMSException e) {
			e.printStackTrace();
			throw new ApplicationRestException(500, "Organization creation or updation Error" , "Organization creation or updation Error", null );
		}
		return org;
	}
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteOrganization(BigInteger orgId) throws ApplicationRestException{
		throw new UnsupportedOperationException();
	}
	
	
	
	
}
