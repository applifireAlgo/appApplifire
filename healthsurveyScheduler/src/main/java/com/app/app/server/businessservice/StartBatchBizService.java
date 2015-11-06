package com.app.app.server.businessservice;
import java.util.concurrent.Future;

import org.quartz.SchedulerException;
import org.springframework.batch.core.JobParametersInvalidException;

import com.athena.framework.server.exception.repository.SpartanPersistenceException;

public interface StartBatchBizService {

	public abstract Future<Object> initiateBatch() throws InterruptedException, JobParametersInvalidException, SpartanPersistenceException, SchedulerException, ClassNotFoundException;

}
