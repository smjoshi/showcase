package com.cs.dms.frontend.rest.exception;

import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlElement;

import org.springframework.beans.BeanUtils;

public class ErrorMessage {

	@XmlElement(name="status")
	int status;
	
	@XmlElement(name="message")
	String message;
	
	@XmlElement(name="href")
	String href;

	@XmlElement(name="developerMessage")
	private String developerMessage;

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public String getDeveloperMessage() {
		return developerMessage;
	}

	public void setDeveloperMessage(String developerMessage) {
		this.developerMessage = developerMessage;
	}

	public ErrorMessage(ApplicationRestException ex){
		BeanUtils.copyProperties(ex, this);
	}
	
	public ErrorMessage(NotFoundException nfe){
		this.status = Response.Status.NOT_FOUND.getStatusCode();
		this.message = nfe.getMessage();
		
	}
	
	public ErrorMessage(){
		//Default constructor
	}
}
