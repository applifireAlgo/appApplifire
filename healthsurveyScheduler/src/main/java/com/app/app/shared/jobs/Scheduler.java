package com.app.app.shared.jobs;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="art_schedule_config")
public class Scheduler {
	
	@Id
	@GeneratedValue(generator = "UUIDGenerator")
	@Column(name="schedule_id")
	private String schedulerId;
	
	@Column(name="scheduler_expression")
	private String schedulerExpression;
	
	 @OneToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	    @JoinColumn(name = "schedule_job", referencedColumnName = "jobId")
	private JobDetails jobDetails;

	public String getSchedulerId() {
		return schedulerId;
	}

	public void setSchedulerId(String schedulerId) {
		this.schedulerId = schedulerId;
	}

	public String getSchedulerExpression() {
		return schedulerExpression;
	}

	public void setSchedulerExpression(String schedulerExpression) {
		this.schedulerExpression = schedulerExpression;
	}

	public JobDetails getJobDetails() {
		return jobDetails;
	}

	public void setJobDetails(JobDetails jobDetails) {
		this.jobDetails = jobDetails;
	}
	 
	 
	

}
