package com.app.app.server.service;
import com.app.app.server.businessservice.StartBatchBizService;

import java.util.concurrent.Callable;
import java.util.concurrent.Future;

import org.springframework.web.context.request.async.WebAsyncTask;
import org.springframework.stereotype.Component;

import com.athena.framework.server.bean.ResponseBean;

@Component
public class InitiateBatchService {

	private StartBatchBizService startBatchService;

	private boolean initiated = false;

	public void setStartBatchService(StartBatchBizService startBatchBizService) {
		this.startBatchService = startBatchBizService;
	}

	public void init(){
		ResponseBean responseBean = initiate();
		System.out.println(responseBean.getResponse().get("message"));
	}

	private ResponseBean initiate() {

		ResponseBean responseBean = new ResponseBean();
		try {
			if (!initiated) {
				Future<Object> output = startBatchService.initiateBatch();
				responseBean.add("success", true);
				responseBean.add("message", "Batch service initiated.");
				initiated = true;
			} else {
				responseBean.add("success", false);
				responseBean.add("message", "Batch service already initiated...Doing nothing..");
			}
			System.out.println("Came out from batch initiate at " + new java.util.Date());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return responseBean;
	}

}
