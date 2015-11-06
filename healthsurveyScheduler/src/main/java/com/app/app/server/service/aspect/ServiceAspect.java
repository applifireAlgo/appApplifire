package com.app.app.server.service.aspect;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;
import java.util.UUID;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.metrics.CounterService;
import org.springframework.boot.actuate.metrics.GaugeService;
import org.springframework.boot.actuate.metrics.Metric;
import org.springframework.boot.actuate.metrics.repository.MetricRepository;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import com.spartan.healthmeter.entity.scheduler.ArtMethodCallStack;
import com.spartan.healthmeter.entity.scheduler.MethodCallDetails;
import com.spartan.healthmeter.msgWriter.config.ExecutionTimer;
import com.spartan.healthmeter.msgWriter.config.HealthConstants;
import com.spartan.healthmeter.msgWriter.core.Healthmeter;
import com.spartan.sprinkler.core.Sprinkler;
import com.athena.framework.server.bean.ResponseBean;
import com.athena.framework.server.exception.biz.SpartanConstraintViolationException;
import com.athena.framework.server.exception.biz.SpartanIncorrectDataException;
import com.athena.framework.server.exception.security.SpartanAccessDeniedException;
import com.athena.framework.server.helper.EntityValidatorHelper;
import com.athena.framework.server.helper.RuntimeLogInfoHelper;
//import com.spartan.shield.server.config.CookieValidation;
//import com.spartan.shield.server.config.SessionValidation;
//import com.spartan.shield.server.authentication.interfaces.UserAuthentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface.RECORD_TYPE;

@Aspect
@Component
public class ServiceAspect {

	@Autowired
	private RuntimeLogInfoHelper runtimeLogInfoHelper;

	@Autowired
	private EntityValidatorHelper<Object> entityValidator;

	@Autowired
	private Sprinkler sprinkler;

	@Autowired
	private Healthmeter healthmeter;

	private HttpStatus httpStatusCode;

	@Autowired
	private CounterService counterService;

	@Autowired
	private GaugeService gaugeservice;

	@Autowired
	private ArtMethodCallStack methodCallStack;

	@Autowired
	private ExecutionTimer executionTimer;

	private AtomicLong autoRequestId = new AtomicLong(1);

	@Autowired
	private MetricRepository repository;

	@Around(value = "allOperation()||athenaServiceOperation()||spartanServiceOperation()")
	@Order(1)
	public Object aroundAdvice1(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		System.out.println("In aroundAdvice Order 1 : Calling method : " + proceedingJoinPoint.getSignature().getName());
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		long nextAutoNum = autoRequestId.getAndIncrement();
		methodCallStack.setRequestId(UUID.randomUUID().toString().toUpperCase());
		MethodCallDetails methodCallDetails = new MethodCallDetails(methodCallStack.getRequestId(), HealthConstants.CLASS_TYPE.SERVICE, request.getRemoteHost(),
				request.getMethod(), proceedingJoinPoint.getTarget().getClass().toString(), proceedingJoinPoint.getSignature().getName(), "", getSessionId(request));
		String entityName = incrementUricounter(proceedingJoinPoint.getSignature().getDeclaringType().getSimpleName(), proceedingJoinPoint.getSignature().getName());
		Object responseEntity = null;
		/*
		 * Needs to get user id from request header and pass it to entityAudit
		 * and RuntimeLogInfo
		 */
		/* create logging info object (Needs to call from login service only */
		runtimeLogInfoHelper.createRuntimeLogUserInfo(1, "", request.getRemoteHost());
		/* validate request */
		try {
			Object obj = proceedingJoinPoint.proceed();
			responseEntity = obj;
		} catch (SpartanAccessDeniedException e) {
			sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 4005, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint
					.getSignature().getName(), request.getRemoteHost(), e);
			ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), " Access Denied " + e.getMessage());
		} catch (SpartanPersistenceException e) {
			sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), e.getExceptionId(), proceedingJoinPoint.getSignature().getDeclaringTypeName(),
					proceedingJoinPoint.getSignature().getName(), request.getRemoteHost(), e);
			ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(),
					" Can not perform Operation on entity:" + e.getMessage());
		} catch (Exception e) {
			sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 4005, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint
					.getSignature().getName(), request.getRemoteHost(), e);
			ResponseBean responseBean = new ResponseBean();
			responseBean.add("success", false);
			responseBean.add("message", " Access Denied:" + e.getMessage());
		} finally {
			methodCallStack.addServiceMethodCallDetails(methodCallDetails);
			healthmeter.apphealth.writeHealthLog((ArtMethodCallStack) methodCallStack.clone());
			Integer existingValue = 0;
			Metric metric = repository.findOne("gauge." + "total.Time " + entityName + "");
			if (metric != null) {
				existingValue = metric.getValue().intValue();
			}
			gaugeservice.submit("total.Time " + entityName + "", executionTimer.getSystemTime + existingValue);
		}
		return responseEntity;
	}

	@Around(value = "saveOperation()")
	@Order(2)
	public Object aroundAdvice2Save(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		System.out.println("In aroundAdvice Order 2 Save: Calling method : " + proceedingJoinPoint.getSignature().getName());
		boolean isValidEntity = true;
		Object returnObject = new Object();
		if (proceedingJoinPoint.getArgs().length > 0) {
			Object methodInputParam = proceedingJoinPoint.getArgs()[0];
			if (methodInputParam != null && methodInputParam instanceof CommonEntityInterface) {
				CommonEntityInterface entity = (CommonEntityInterface) methodInputParam;
				try {
					preSaveUpdateOperation(entity, CommonEntityInterface.RECORD_TYPE.ADD);
				} catch (SpartanConstraintViolationException e) {
					isValidEntity = false;
					sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 2008, e);
					ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), "Constraints violated by input "
							+ methodInputParam.getClass().getSimpleName());
					return new ResponseEntity<ResponseBean>(exceptionbean, e.getHttpStatus());
				}
			} else if (methodInputParam != null && methodInputParam instanceof List) {
				List listOfEntities = (List) methodInputParam;
				if (listOfEntities.size() > 0) {
					/*
					 * Checking 0th element type. So no need to check type for
					 * each element in the loop.
					 */
					if (listOfEntities.get(0) instanceof CommonEntityInterface) {
						for (Object object : listOfEntities) {
							CommonEntityInterface entity = (CommonEntityInterface) object;
							try {
								preSaveUpdateOperation(entity, CommonEntityInterface.RECORD_TYPE.ADD);
							} catch (SpartanConstraintViolationException e) {
								isValidEntity = false;
								sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 2008, e);
								ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), "Constraints violated by input "
										+ methodInputParam.getClass().getSimpleName());
								return new ResponseEntity<ResponseBean>(exceptionbean, e.getHttpStatus());
							}
						}
					}
				}
			}
		}
		if (isValidEntity) {
			sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1000, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint
					.getSignature().getName(), proceedingJoinPoint.getArgs()[0].getClass().getSimpleName(), proceedingJoinPoint.getArgs()[0].toString());
			returnObject = proceedingJoinPoint.proceed();
			sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1001, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint
					.getSignature().getName(), proceedingJoinPoint.getArgs()[0].toString());
			return returnObject;
		}
		return returnObject;
	}

	@Around(value = "updateOperation()")
	@Order(2)
	public Object aroundAdvice2Update(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		System.out.println("In aroundAdvice Order 2 Update: Calling method : " + proceedingJoinPoint.getSignature().getName());
		boolean isValidEntity = true;
		Object returnObject = new Object();
		if (proceedingJoinPoint.getArgs().length > 0) {
			Object methodInputParam = proceedingJoinPoint.getArgs()[0];
			if (methodInputParam != null && methodInputParam instanceof CommonEntityInterface) {
				CommonEntityInterface entity = (CommonEntityInterface) methodInputParam;
				try {
					preSaveUpdateOperation(entity, CommonEntityInterface.RECORD_TYPE.UPDATE);
				} catch (SpartanConstraintViolationException e) {
					isValidEntity = false;
					sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 2008, e);
					ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), "Constraints violated by input "
							+ methodInputParam.getClass().getSimpleName());
					return new ResponseEntity<ResponseBean>(exceptionbean, e.getHttpStatus());
				}
			} else if (methodInputParam != null && methodInputParam instanceof List) {
				List listOfEntities = (List) methodInputParam;
				if (listOfEntities.size() > 0) {
					/*
					 * Checking 0th element type. So no need to check type for
					 * each element in the loop.
					 */
					if (listOfEntities.get(0) instanceof CommonEntityInterface) {
						for (Object object : listOfEntities) {
							CommonEntityInterface entity = (CommonEntityInterface) object;
							try {
								preSaveUpdateOperation(entity, CommonEntityInterface.RECORD_TYPE.UPDATE);
							} catch (SpartanConstraintViolationException e) {
								isValidEntity = false;
								sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 2008, e);
								ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), "Constraints violated by input "
										+ methodInputParam.getClass().getSimpleName());
								return new ResponseEntity<ResponseBean>(exceptionbean, e.getHttpStatus());
							}
						}
					}
				}
			}
		}
		if (isValidEntity) {
			sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1000, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint
					.getSignature().getName(), proceedingJoinPoint.getArgs()[0].getClass().getSimpleName(), proceedingJoinPoint.getArgs()[0].toString());
			returnObject = proceedingJoinPoint.proceed();
			sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1001, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint
					.getSignature().getName(), proceedingJoinPoint.getArgs()[0].toString());
			return returnObject;
		}
		return returnObject;
	}

	@Around(value = "deleteOperation()")
	@Order(2)
	public Object aroundAdvice2Delete(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		System.out.println("In aroundAdvice Order 2 Delete: Calling method : " + proceedingJoinPoint.getSignature().getName());
		Object returnObject = new Object();
		if (proceedingJoinPoint.getArgs().length > 0) {
			sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1000, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint
					.getSignature().getName(), proceedingJoinPoint.getArgs()[0].getClass().getSimpleName(), proceedingJoinPoint.getArgs()[0].toString());
			returnObject = proceedingJoinPoint.proceed();
			sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1001, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint
					.getSignature().getName(), proceedingJoinPoint.getArgs()[0].toString());
			return returnObject;
		}
		return returnObject;
	}

	private boolean validateEntity(CommonEntityInterface entity) throws SpartanConstraintViolationException, SpartanIncorrectDataException {
		boolean isValidEntity = true;
		/* set entity validator */
		entity.setEntityValidator(this.entityValidator);
		/* validates the entity */
		isValidEntity = entity.isValid();
		System.out.println("Entity is valid :" + isValidEntity);
		return isValidEntity;
	}


	public String incrementUricounter(String className, String methodName) {
		// meter.printMeter(meter);
		counterService.increment(className + "." + methodName);
		Metric metric = repository.findOne("gauge." + className + "." + methodName + "");
		if (metric != null) {
			gaugeservice.submit(className + "." + methodName, (Double) metric.getValue() + 1);
		} else {
			gaugeservice.submit(className + "." + methodName, 1);
		}
		return className + "." + methodName;
	}

	
	
	public String getSessionId(HttpServletRequest request) {
		HttpSession session = request.getSession();
		System.out.println(session.getAttribute("usidHash"));
		if (session.getAttribute("usidHash") != null) {
			return (String) session.getAttribute("usidHash").toString();
		} else {
			return "";
		}
	}

	private void prepareEntityAuditInfo(CommonEntityInterface entity, RECORD_TYPE recordType) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		String userId = "";// loggedInUserId(request);
		entity.setEntityAudit(1, userId, recordType);
	}

	@Pointcut("execution(* com.athena..service..*(..))")
	protected void athenaServiceOperation() {
	}
	
	@Pointcut("execution(* com.spartan..service..*(..))")
	protected void spartanServiceOperation() {
	}


	private void preSaveUpdateOperation(CommonEntityInterface entity, RECORD_TYPE recordType) throws SpartanConstraintViolationException, SpartanIncorrectDataException {
		prepareEntityAuditInfo(entity, recordType);
		// preparedSystemInformation(entity, recordType);
		/* validates the entity */
		validateEntity(entity);
	}

	@Pointcut("execution(* x.app.server.service..save*(..))")
	protected void saveOperation() {
	}

	@Pointcut("execution(* x.app.server.service..delete*(..))")
	protected void deleteOperation() {
	}

	@Pointcut("execution(* x.app.server.service..update*(..))")
	protected void updateOperation() {
	}

	@Pointcut("execution(* x.app.server.service..*..*(..))")
	protected void allOperation() {
	}

	@Pointcut("execution(* x.app.server.service..find*(..))")
	protected void findOperation() {
	}

	@Pointcut("execution(* x.app.server.service..get*(..))")
	protected void getOperation() {
	}
}
