package com.app.app.server.businessservice;
import com.app.app.server.repository.JobDetailsRepository;

import com.app.app.shared.jobs.JobDetails;

import java.util.Date;
import java.util.List;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import com.athena.framework.server.exception.repository.SpartanPersistenceException;


@Component
public class jobListeners implements JobListener {

	@Autowired
	JobDetailsRepository jobRepository;

	@Override
	public String getName() {
		return this.getClass().getSimpleName();
	}

	@Override
	public void jobToBeExecuted(JobExecutionContext context) {
		System.out.println("jobToBeExecuted has execute. " + new Date());
		try {
			List<JobDetails> job = jobRepository.getJobByBeanName(context.getJobDetail().getJobClass().getName());
			if (job.size() > 0) {
				job.get(0).setCurrentStatus("JOB_STARTED");
				jobRepository.updateJobDetails(job.get(0));
			}
		} catch (SpartanPersistenceException e) {
			e.printStackTrace();
		}

	}

	@Override
	public void jobExecutionVetoed(JobExecutionContext context) {
		System.out.println("jobExecutionVetoed has execute. " + new Date());
	}


	@Override
	public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {
		System.out.println("jobWasExecuted has execute. " + new Date() + "\r\n");
		try {
			List<JobDetails> job = jobRepository.getJobByBeanName(context.getJobDetail().getJobClass().getName());
			if (job.size() > 0) {
				if (jobException!=null) {
					job.get(0).setCurrentStatus("JOB_FINISHED");

				} else {

					job.get(0).setCurrentStatus("JOB_EXECUTION_FAILED");
					context.getTrigger().getTriggerBuilder().endAt(new Date(System.currentTimeMillis()));
				}
				jobRepository.updateJobDetails(job.get(0));

			}
		} catch (SpartanPersistenceException e) {
			e.printStackTrace();
		}

	}
}
