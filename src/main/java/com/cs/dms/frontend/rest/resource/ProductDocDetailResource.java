package com.cs.dms.frontend.rest.resource;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;


import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import javax.ws.rs.core.MediaType;


import com.cs.dms.frontend.rest.exception.ApplicationRestException;
import com.cs.dms.service.domain.model.ProductDocConfiguration;
import com.cs.dms.service.domain.model.ProductDocDetail;
import com.cs.dms.service.domain.model.ProductDocument;
import com.cs.dms.service.exception.DMSException;
import com.cs.dms.service.intf.ProductDocConfService;
import com.cs.dms.service.intf.ProductDocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;




@Component
@Path("/details")
public class ProductDocDetailResource {

	@Autowired
	private ProductDocumentService documentService = null;

	@Autowired
	private ProductDocConfService confService = null;

	private static final Logger logger = LoggerFactory.getLogger(ProductDocDetailResource.class);

	/**
	 * @param productId
	 * @return
	 */
	@GET
	@Path("/product/{productId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ProductDocDetail> getProductDocDetails(@PathParam("productId") BigInteger productId)
			throws ApplicationRestException {

		List<ProductDocument> docList = null;
		List<ProductDocConfiguration> docConfig = null;
		List<ProductDocDetail> docDetailList = new ArrayList<>();

		try {

			// get document configuration details
			docConfig = confService.getProductDocConfigurations(productId);

			// get document details
			docList = documentService.getProductDocuments(productId);

			ProductDocDetail pd = null;
			for (ProductDocConfiguration config : docConfig) {

				pd = new ProductDocDetail();
				pd.setDocConf(config);
				for (ProductDocument prodDocDetail : docList) {

					if (config.getDocConfId() == prodDocDetail.getProductDocConfId()) {
						pd.setDocument(prodDocDetail);
					}
				}
				docDetailList.add(pd);
			}

		} catch (DMSException e) {
			e.printStackTrace();
			docDetailList = null;
			throw new ApplicationRestException();
		}
		return docDetailList;
	}


	@GET
	@Path("/product/{orgId}/{productId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ProductDocDetail> getProductDocuments(@PathParam("orgId") BigInteger orgId, @PathParam("productId") BigInteger productId) throws ApplicationRestException
	{
		logger.debug("{ComponentName :ProductDocDetailResource , methodName:getProductDocuments, parameters{orgId:" + orgId + " productId:"+ productId + " }}");
		List<ProductDocDetail> docDetails = null;
		try {
			docDetails =   documentService.getProductDocuments(orgId.intValue(), productId.intValue());
		} catch (DMSException e) {
			e.printStackTrace();
		}

		return  docDetails;
	}

	@POST
	@Path("/product/doc")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ProductDocument addOrUpdateProductDocDetail(ProductDocument pd) throws ApplicationRestException {

		ProductDocument dbProdDoc = null;
		try {
			dbProdDoc = documentService.upsertProductDocuments(pd);
		} catch (DMSException e) {
			e.printStackTrace();
			dbProdDoc = null;
			throw new ApplicationRestException();
		}
		return dbProdDoc;
	}

	public ProductDocConfService getConfService() {
		return confService;
	}

	public void setConfService(ProductDocConfService confService) {
		this.confService = confService;
	}

	public ProductDocumentService getDocDetailService() {
		return documentService;
	}

	public void setDocDetailService(ProductDocumentService docDetailService) {
		this.documentService = docDetailService;
	}

}
