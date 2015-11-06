package com.app.app.shared.jobs;
import java.sql.Timestamp;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.json.JSONException;
import org.json.JSONObject;

@Entity
@Table(name = "art_job_details")
public class JobDetails {

	@Id
	@GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "jobId")
	private String jobId;
	@Column(name = "jobName")
	private String jobName;
	@Column(name = "beanName")
	private String beanName;
	@Column(name = "currentStatus")
	private String currentStatus;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "jobDetails")
	private Scheduler scheduler;

	@Column(updatable = true)
	private Timestamp statusTime = new Timestamp(System.currentTimeMillis());
	@Transient
	private Map<String, Object> jobParams;
	@Transient
	private final String JOB_STARTED = "JOB_STARTED";
	@Transient
	private final String JOB_FINISHED = "JOB_FINISHED";
	@Transient
	private final String JOB_FAILED = "JOB_FAILED";
	@Transient
	private final String JOB_ALREADY_RUNNING = "JOB_ALREADY_RUNNING";

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getBeanName() {
		return beanName;
	}

	public void setBeanName(String beanName) {
		this.beanName = beanName;
	}

	public void setJobParams(Map<String, Object> jobParams) {
		this.jobParams = jobParams;
	}

	public String getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(String currentStatus) {
		this.currentStatus = currentStatus;
	}

	public void setJobStarted() {
		this.currentStatus = JOB_STARTED;
	}

	public void setJobFinished() {
		this.currentStatus = JOB_FINISHED;
	}

	public void setJobFailed() {
		this.currentStatus = JOB_FAILED;
	}

	public void setJobAlreadyRunning() {
		this.currentStatus = JOB_ALREADY_RUNNING;
	}

	public Scheduler getScheduler() {
		return scheduler;
	}

	public void setScheduler(Scheduler scheduler) {
		this.scheduler = scheduler;
	}

}
