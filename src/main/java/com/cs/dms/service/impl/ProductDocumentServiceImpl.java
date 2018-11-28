package com.cs.dms.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import com.cs.dms.dao.entity.ProductDocConfEntity;
import com.cs.dms.dao.entity.ProductDocumentEntity;
import com.cs.dms.dao.entity.ProductEntity;
import com.cs.dms.dao.exception.DMSDaoException;
import com.cs.dms.dao.intf.ProductDocumentDao;
import com.cs.dms.service.domain.model.ProductDocConfiguration;
import com.cs.dms.service.domain.model.ProductDocDetail;
import com.cs.dms.service.domain.model.ProductDocument;
import com.cs.dms.service.exception.DMSException;
import com.cs.dms.service.intf.ProductDocumentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service("documentService")
public class ProductDocumentServiceImpl implements ProductDocumentService {

    @Autowired
    private ProductDocumentDao productDocumentDao;


    @Override
    public ProductDocument upsertProductDocuments(ProductDocument pdd) throws DMSException {

        ProductDocument processedDocDetail = null;
        if (pdd != null) {
            ProductDocumentEntity docDetailEntity = prepareDocumentEntity(pdd);
            try {
                if (docDetailEntity.getProductDocumentId() == null) {
                    docDetailEntity = productDocumentDao.create(docDetailEntity);
                } else {
                    productDocumentDao.update(docDetailEntity);
                }
                processedDocDetail = populateDocumentModel(docDetailEntity);
            } catch (DMSDaoException e) {
                e.printStackTrace();
                throw new DMSException();
            }
        }
        return processedDocDetail;
    }

    @Override
    public List<ProductDocument> getProductDocuments(BigInteger productId) throws DMSException {

        List<ProductDocumentEntity> docDetails = productDocumentDao.getProductDocuments(productId);
        return populateDocumentModelList(docDetails);
    }


    @Override
        public List<ProductDocDetail> getProductDocuments(Integer customerId, Integer productId) throws DMSException {

        ProductEntity pe = productDocumentDao.getProductDocuments(customerId, productId);
        return retrieveDocumentDetails(pe);
    }


    /**
     * @param docDetail
     * @return
     */
    private ProductDocumentEntity prepareDocumentEntity(ProductDocument docDetail) {
        ProductDocumentEntity docDetailEntity = new ProductDocumentEntity();

        if (docDetail != null) {
            //docDetailEntity.setProductDocumentId(docDetail.getProductDocumentId());
            docDetailEntity.setProductId(docDetail.getProductId());
            docDetailEntity.setProductDocConfId(docDetail.getProductDocConfId());
            docDetailEntity.setDocUrl(docDetail.getDocUrl());
        }

        return docDetailEntity;

    }


    private ProductDocument populateDocumentModel(ProductDocumentEntity docDetailEntity) {

        ProductDocument docDetail = new ProductDocument();
        if (docDetailEntity != null) {
            docDetail.setProductDocumentId(docDetailEntity.getProductDocumentId());
            docDetail.setDocUrl(docDetailEntity.getDocUrl());
            docDetail.setProductDocConfId(docDetailEntity.getProductDocConfId());
            docDetail.setProductId(docDetailEntity.getProductId());

            if (docDetailEntity.getDocConfiguration() != null) {
                //TODO: populate document configuration as well.

            }


        }
        return docDetail;
    }


    private List<ProductDocument> populateDocumentModelList(List<ProductDocumentEntity> detailEntityList) {

        List<ProductDocument> productDocuments = new ArrayList<ProductDocument>();
        if (detailEntityList != null) {
            for (ProductDocumentEntity detailEntiry : detailEntityList) {
                productDocuments.add(populateDocumentModel(detailEntiry));
            }
        }

        return productDocuments;
    }


    private List<ProductDocDetail> retrieveDocumentDetails(ProductEntity pe) {

        //retrive document detail and configuration
        List<ProductDocConfEntity> configurations = pe.getDocConfigurations();

        List<ProductDocDetail> docDetails = new ArrayList<>();
        List<ProductDocConfiguration> productDocConfigurations = new ArrayList<ProductDocConfiguration>();
        ProductDocConfiguration docConfiguration = null;
        ProductDocDetail docDetail = null;
        for (ProductDocConfEntity confEntity : configurations) {
            //populate
            docConfiguration = new ProductDocConfiguration();
            docDetail = new ProductDocDetail();
            docConfiguration.copyFromEntiry(confEntity);

            //get Document detail Entity
            ProductDocumentEntity pde = confEntity.getDocDetail();
            ProductDocument pd = new ProductDocument();
            pd.copyFromEntity(pde);

            docConfiguration.setProductDocument(pd);

            docDetail.setDocConf(docConfiguration);
            docDetails.add(docDetail);
        }

        return docDetails;


    }


}
