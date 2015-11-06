package com.app.app.server.businessservice;
import com.app.app.server.repository.JobDetailsRepository;

import com.app.app.shared.jobs.JobDetails;

import java.util.List;
import java.util.concurrent.Future;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Component;

import com.athena.framework.server.exception.repository.SpartanPersistenceException;

@Component
// @Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class StartBatchBizServiceImpl implements StartBatchBizService {

	@Autowired
	private JobInitiator jobInitiator;
	@Autowired
	private JobDetailsRepository jobDetailsRepository;

	@Override
	@Async
	public Future<Object> initiateBatch() throws InterruptedException,

	JobParametersInvalidException, SpartanPersistenceException, SchedulerException, ClassNotFoundException {
		System.out.println("Came in batch initiate at " + new java.util.Date());

		Thread.sleep(60000);
		boolean initiate=true;
		SchedulerFactory factory = new StdSchedulerFactory();
		Scheduler scheduler = factory.getScheduler();
			// read from tbl_job and tbl_job_scheduler if any job is scheduled
			// or not
		while (initiate){
			List<JobDetails> jobList = jobDetailsRepository.getAllJobs();

			for (JobDetails job : jobList) {
				try {
					jobInitiator.runJob(job,scheduler);
					/* Set current failed status of job */
					job.setJobStarted();
					jobDetailsRepository.updateJobDetails(job);
					System.out.println("CURRENT STATUS :" + job.getCurrentStatus());
				} catch (JobRestartException | JobInstanceAlreadyCompleteException e) {
					/* Set current failed status of job */
					job.setJobFailed();
					jobDetailsRepository.updateJobDetails(job);
					System.out.println("CURRENT STATUS :" + job.getCurrentStatus());
					e.printStackTrace();
				} catch (JobExecutionAlreadyRunningException ex) {
					/* Set current failed status of job */
					job.setJobAlreadyRunning();
					jobDetailsRepository.updateJobDetails(job);
					System.out.println("CURRENT STATUS :" + job.getCurrentStatus());
				}

			}
		//	if (jobList.size() > 0) {
				Thread.sleep(300000);
	//		}	
		}
		
		return new AsyncResult<Object>("");
	}

}
