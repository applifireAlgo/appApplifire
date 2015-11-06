package com.app.app.server.bean;
import java.util.LinkedHashMap;

public class ResponseBean extends BeanAdapter {
	private LinkedHashMap<String, String> response = null;

	public ResponseBean() {
		response = new LinkedHashMap<String, String>();
	}

	public void add(String key, String value) {
		response.put(key, value);
	}

	public LinkedHashMap<String, String> getResponse() {
		return response;
	}

	@Override
	public String toString() {
		return "ResponseBean [response=" + response + "]";
	}

}
