package com.cs.dms.dao.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;

@Entity
@Table(name = "PRODUCT_DOC_CONF")
@NamedQuery(name = "ProductDocConfEntity.findAll", query = "SELECT pdc FROM ProductDocConfEntity pdc")
public class ProductDocConfEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PR_DOC_CONF_ID")
    private BigInteger productDocConfId;

    @Column(name = "PRODUCT_ID")
    private BigInteger productId;

    @Column(name = "PRODUCT_DOC_TYPE_CODE")
    private String docTypeCode;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "IS_MANDATORY")
    private boolean isMandatory;

    @Column(name = "GROUP_ID")
    private String grouPId;

    @OneToOne(mappedBy = "docConfiguration")
    private ProductDocumentEntity docDetail;

    public BigInteger getProductDocConfId() {
        return productDocConfId;
    }

    public void setProductDocConfId(BigInteger productDocConfId) {
        this.productDocConfId = productDocConfId;
    }

    public BigInteger getProductId() {
        return productId;
    }

    public void setProductId(BigInteger productId) {
        this.productId = productId;
    }

    public String getDocTypeCode() {
        return docTypeCode;
    }

    public void setDocTypeCode(String docTypeCode) {
        this.docTypeCode = docTypeCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isMandatory() {
        return isMandatory;
    }

    public void setMandatory(boolean isMandatory) {
        this.isMandatory = isMandatory;
    }

    public String getGrouPId() {
        return grouPId;
    }

    public void setGrouPId(String grouPId) {
        this.grouPId = grouPId;
    }

    public ProductDocumentEntity getDocDetail() {
        return docDetail;
    }

    public void setDocDetail(ProductDocumentEntity docDetail) {
        this.docDetail = docDetail;
    }

}
