package com.app.app.server.bean;
public class MessageBean extends BeanAdapter {
	private long id;
	private String name;
	private boolean hasError;
	private String message;

	public MessageBean() {
		super();
	}

	public MessageBean(long id, String name, boolean hasError, String message) {
		super();
		this.id = id;
		this.name = name;
		this.hasError = hasError;
		this.message = message;
	}

	@Override
	public String toString() {
		return "MessageBean [id=" + id + ", name=" + name + ", hasError=" + hasError + ", message=" + message + "]";
	}

	public MessageBean(String name, boolean hasError, String message) {
		this.name = name;
		this.hasError = hasError;
		this.message = message;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isHasError() {
		return hasError;
	}

	public void setHasError(boolean hasError) {
		this.hasError = hasError;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String toJson() {
		StringBuilder sb = new StringBuilder();
		sb.append("{");
		sb.append("\"id\":\"" + id + "\",");
		sb.append("\"name\":\"" + name + "\",");
		sb.append("\"hasError\":\"" + hasError + "\",");
		sb.append("\"message\":\"" + message + "\"");
		sb.append("}");

		return sb.toString();
	}
}
