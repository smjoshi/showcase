package com.cs.dms.service.intf;

import java.math.BigInteger;
import java.util.List;

import com.cs.dms.service.domain.model.Organization;
import com.cs.dms.service.exception.DMSException;


public interface OrganizationService {
	
	public Organization upsertOrginzation(Organization org) throws DMSException;
	
	public List<Organization> getUserOrganizations(BigInteger userId) throws DMSException;
	
	public Organization getOrganizationDetail(BigInteger orgId) throws DMSException;

}
