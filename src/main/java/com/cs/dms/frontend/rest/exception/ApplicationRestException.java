package com.cs.dms.frontend.rest.exception;

public class ApplicationRestException extends Exception {

	private int status;
	private String message;
	private String href;
	private String developerMessage;


	public ApplicationRestException() {
		// Default Constructor
	}
	
	public ApplicationRestException(int status, String developerMessage, String message, String href){
		this.status = status;
		this.developerMessage = developerMessage;
		this.message = message;
		this.href = href;
	}

	public String getDeveloperMessage() {
		return developerMessage;
	}

	public ApplicationRestException setDeveloperMessage(String developerMessage) {
		this.developerMessage = developerMessage;
		return this;
	}


	public int getStatus() {
		return status;
	}

	public ApplicationRestException setStatus(int status) {
		this.status = status;
		return this;
	}

	public String getMessage() {
		return message;
	}

	public ApplicationRestException setMessage(String message) {
		this.message = message;
		return this;
	}

	public ApplicationRestException setHref(String href) {
		this.href = href;
		return this;
	}

	public String getHref() {
		return href;
	}
}
