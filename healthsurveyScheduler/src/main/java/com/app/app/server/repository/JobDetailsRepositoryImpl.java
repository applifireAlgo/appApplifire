package com.app.app.server.repository;
import com.app.app.shared.jobs.JobDetails;

import java.util.List;

import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import com.athena.config.server.helper.ResourceFactoryManagerHelper;

@Repository
public class JobDetailsRepositoryImpl implements JobDetailsRepository {

	@Autowired
	private ResourceFactoryManagerHelper emfResource;

	@Override
	public List<JobDetails> getAllJobs() throws SpartanPersistenceException {
		return emfResource.getResource().createQuery("Select e from JobDetails e").getResultList();
	}

	@Override
	@Transactional
	public void updateJobDetails(JobDetails jobDetails) throws SpartanPersistenceException {
		emfResource.getResource().merge(jobDetails);
	}
	
	@Override
	public List<JobDetails> getJobByBeanName(String beanName) throws SpartanPersistenceException {
		try
		{
		String selectQuery = "select u from JobDetails u where u.beanName=:beanName";
		Query query = emfResource.getResource().createQuery(selectQuery);
		query.setParameter("beanName", beanName);
		return query.getResultList();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}

}
