package com.cs.dms.dao.intf;

import java.math.BigInteger;

import java.util.List;

import com.cs.dms.dao.base.BaseDao;
import com.cs.dms.dao.entity.OrgEntity;

public interface OrganizationDao extends BaseDao<OrgEntity> {

	public List<OrgEntity> getUserOrgnizations(BigInteger userId);
}
