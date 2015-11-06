package com.app.app.server.bean;
import java.util.ArrayList;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 
 */
public class ProjectBean {

	private int projectId;

	private String projectName;

	private String projectDesc;

	private String domainName;

	private int databaseId;

	private String schemaName;

	private String userId;

	private String password;

	private ArrayList<Integer> components;

	private String email;

	public ProjectBean() {
		super();
	}

	@Override
	public String toString() {
		return "ProjectBean [projectId=" + projectId + ", projectName=" + projectName + ", projectDesc=" + projectDesc + ", domainName=" + domainName + ", databaseId=" + databaseId + ", schemaName="
				+ schemaName + ", userId=" + userId + ", password=" + password + ", components=" + components + ", email=" + email + "]";
	}

	public ProjectBean(int projectId, String projectName, String projectDesc, String domainName, int databaseId, String schemaName, String userId, String password, ArrayList<Integer> components,
			String email) {
		super();
		this.projectId = projectId;
		this.projectName = projectName;
		this.projectDesc = projectDesc;
		this.domainName = domainName;
		this.databaseId = databaseId;
		this.schemaName = schemaName;
		this.userId = userId;
		this.password = password;
		this.components = components;
		this.email = email;
	}

	public int getDatabaseId() {
		return databaseId;
	}

	public void setDatabaseId(int databaseId) {
		this.databaseId = databaseId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectDesc() {
		return projectDesc;
	}

	public void setProjectDesc(String projectDesc) {
		this.projectDesc = projectDesc;
	}

	public String getDomainName() {
		return domainName;
	}

	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

	public String getSchemaName() {
		return schemaName;
	}

	public void setSchemaName(String schemaName) {
		this.schemaName = schemaName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ArrayList<Integer> getComponents() {
		return components;
	}

	public void setComponents(ArrayList<Integer> components) {
		this.components = components;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

}
