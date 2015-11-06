package com.app.app.server.service.aspect;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;
import java.util.UUID;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.json.JSONObject;
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
import com.spartan.shield.server.config.CookieValidation;
import com.spartan.shield.server.config.SessionValidation;
import com.spartan.shield.server.authentication.interfaces.UserAuthentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface.RECORD_TYPE;
import com.athena.framework.server.exception.repository.SpartanTransactionException;
import com.spartan.shield.server.authentication.interfaces.LoginSessionRepositoryInterface;
import org.springframework.web.context.request.ServletWebRequest;
import javax.servlet.http.HttpServletResponse;
import com.athena.framework.server.exception.biz.SpartanDataNotFoundException;

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
    private SessionValidation sessionValidation;

    @Autowired
    private CookieValidation cookieValidation;

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

    @Autowired
    private LoginSessionRepositoryInterface loginSessionRepo;

    @Around(value = "allOperation()||athenaServiceOperation()||spartanServiceOperation()")
    @Order(1)
    public Object aroundAdvice1(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("In aroundAdvice Order 1 : Calling method : " + proceedingJoinPoint.getSignature().getName());
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        ServletWebRequest servletWebRequest = new ServletWebRequest(request);
        HttpServletResponse response = servletWebRequest.getResponse();
        HttpSession session = request.getSession();
        long nextAutoNum = autoRequestId.getAndIncrement();
        methodCallStack.setRequestId(UUID.randomUUID().toString().toUpperCase());
        MethodCallDetails methodCallDetails = new MethodCallDetails(methodCallStack.getRequestId(), HealthConstants.CLASS_TYPE.SERVICE, request.getRemoteHost(), request.getMethod(), proceedingJoinPoint.getTarget().getClass().toString(), proceedingJoinPoint.getSignature().getName(), loggedInUserId(request), getSessionId(request));
        String entityName = incrementUricounter(proceedingJoinPoint.getSignature().getDeclaringType().getSimpleName(), proceedingJoinPoint.getSignature().getName());
        ResponseEntity<ResponseBean> responseEntity = new ResponseEntity<>(HttpStatus.OK);
        /*
         * Needs to get user id from request header and pass it to entityAudit
         * and RuntimeLogInfo
         */
        /* create logging info object (Needs to call from login service only */
        runtimeLogInfoHelper.setCustomerId(getCustomerId(request));
        runtimeLogInfoHelper.createRuntimeLogUserInfo(1, loggedInUserId(request), request.getRemoteHost());
        /* validate request */
        try {
            if (request.getHeader("Job-Execution") == null) {
                if (request.getHeader("isBeforeSession") == null) {
                    validateRequest(session, request, response);
                    if (!sessionValidation.checkIgnoreURL(request)) {
                        /** Sets user's last access time in table */
                        java.sql.Timestamp currentTime = new java.sql.Timestamp(System.currentTimeMillis());
                        loginSessionRepo.updateLastAccessTime(loggedInUserId(request), session.getAttribute("usidHash").toString(), currentTime);
                        runtimeLogInfoHelper.setUserAccessCode(Integer.parseInt(session.getAttribute("userAccessCode").toString()));
                    }
                }
            }
            Object obj = proceedingJoinPoint.proceed();
            responseEntity = (ResponseEntity<ResponseBean>) obj;
            httpStatusCode = responseEntity.getStatusCode();
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_NORMAL_EXECUTION, responseEntity.getStatusCode().name());
        } catch (SpartanAccessDeniedException e) {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 4005, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), request.getRemoteHost(), e);
            ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), " Access Denied " + e.getMessage());
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_EXCEPTION, e.getExceptionId(), responseEntity.getStatusCode().name());
            return new ResponseEntity<ResponseBean>(exceptionbean, responseEntity.getStatusCode());
        } catch (SpartanPersistenceException e) {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), e.getExceptionId(), proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), request.getRemoteHost(), e);
            ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), " Can not perform Operation on entity:" + e.getMessage());
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_EXCEPTION, e.getExceptionId(), responseEntity.getStatusCode().name());
            return new ResponseEntity<ResponseBean>(exceptionbean, responseEntity.getStatusCode());
        } catch (SpartanTransactionException e) {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), e.getExceptionId(), proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), request.getRemoteHost(), e);
            ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo());
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_EXCEPTION, e.getExceptionId(), responseEntity.getStatusCode().name());
            return new ResponseEntity<ResponseBean>(exceptionbean, responseEntity.getStatusCode());
        } catch (SpartanDataNotFoundException e) {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), e.getExceptionId(), proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), request.getRemoteHost(), e);
            ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo());
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_EXCEPTION, e.getExceptionId(), responseEntity.getStatusCode().name());
            return new ResponseEntity<ResponseBean>(exceptionbean, responseEntity.getStatusCode());
        } catch (com.athena.framework.server.exception.biz.SpartanBusinessValidationFailedException e) {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), e.getExceptionId(), proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), request.getRemoteHost(), e);
            ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo());
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_EXCEPTION, e.getExceptionId(), responseEntity.getStatusCode().name());
            return new ResponseEntity<ResponseBean>(exceptionbean, responseEntity.getStatusCode());
        } catch (Exception e) {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 4005, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), request.getRemoteHost(), e);
            ResponseBean responseBean = new ResponseBean();
            responseBean.add("success", false);
            responseBean.add("message", " Access Denied:" + e.getMessage());
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_EXCEPTION, HealthConstants.DEFAULT_EXCEPTION_ID, responseEntity.getStatusCode().name());
            return new ResponseEntity<ResponseBean>(responseBean, responseEntity.getStatusCode());
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

    @Around(value = "saveOperation()||athenaServiceOperation()||spartanServiceOperation()")
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
                    preSaveUpdateOperation(entity);
                    entity.setSystemTxnCode(51000);
                } catch (SpartanConstraintViolationException e) {
                    isValidEntity = false;
                    sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 2008, e);
                    ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), "Constraints violated by input " + methodInputParam.getClass().getSimpleName());
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
                                preSaveUpdateOperation(entity);
                                entity.setSystemTxnCode(51000);
                            } catch (SpartanConstraintViolationException e) {
                                isValidEntity = false;
                                sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 2008, e);
                                ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), "Constraints violated by input " + methodInputParam.getClass().getSimpleName());
                                return new ResponseEntity<ResponseBean>(exceptionbean, e.getHttpStatus());
                            }
                        }
                    }
                }
            }
        }
        if (isValidEntity) {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1000, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), proceedingJoinPoint.getArgs()[0].getClass().getSimpleName(), proceedingJoinPoint.getArgs()[0].toString());
            returnObject = proceedingJoinPoint.proceed();
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1001, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), proceedingJoinPoint.getArgs()[0].toString());
            return returnObject;
        }
        return returnObject;
    }

    private void preSaveUpdateOperation(CommonEntityInterface entity) throws SpartanConstraintViolationException, SpartanIncorrectDataException {
        prepareEntityAuditInfo(entity);
        /* validates the entity */
        validateEntity(entity);
    }

    @Around(value = "updateOperation()||athenaAndSpartanUpdateServiceOperation()")
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
                    preSaveUpdateOperation(entity);
                    entity.setSystemTxnCode(51000);
                } catch (SpartanConstraintViolationException e) {
                    isValidEntity = false;
                    sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 2008, e);
                    ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), "Constraints violated by input " + methodInputParam.getClass().getSimpleName());
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
                                preSaveUpdateOperation(entity);
                                entity.setSystemTxnCode(51000);
                            } catch (SpartanConstraintViolationException e) {
                                isValidEntity = false;
                                sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 2008, e);
                                ResponseBean exceptionbean = e.prepareExceptionBean(sprinkler, runtimeLogInfoHelper.getRuntimeLogInfo(), "Constraints violated by input " + methodInputParam.getClass().getSimpleName());
                                return new ResponseEntity<ResponseBean>(exceptionbean, e.getHttpStatus());
                            }
                        }
                    }
                }
            }
        }
        if (isValidEntity) {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1000, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), proceedingJoinPoint.getArgs()[0].getClass().getSimpleName(), proceedingJoinPoint.getArgs()[0].toString());
            returnObject = proceedingJoinPoint.proceed();
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1001, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), proceedingJoinPoint.getArgs()[0].toString());
            return returnObject;
        }
        return returnObject;
    }

    @Around(value = "deleteOperation()||athenaServiceOperation()||spartanServiceOperation()")
    @Order(2)
    public Object aroundAdvice2Delete(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("In aroundAdvice Order 2 Delete: Calling method : " + proceedingJoinPoint.getSignature().getName());
        Object returnObject = new Object();
        if (proceedingJoinPoint.getArgs().length > 0) {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1000, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), proceedingJoinPoint.getArgs()[0].getClass().getSimpleName(), proceedingJoinPoint.getArgs()[0].toString());
            returnObject = proceedingJoinPoint.proceed();
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1001, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), proceedingJoinPoint.getArgs()[0].toString());
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

    @Around(value = "findOperation()||getOperation()||athenaServiceOperation()||spartanServiceOperation()")
    @Order(2)
    protected Object aroundAdvicefindOperation(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("In aroundOperation Order 2 find*: Calling method : " + proceedingJoinPoint.getSignature().getName());
        Object returnObject = new Object();
        if (proceedingJoinPoint.getArgs().length > 0) {
            Object methodInputParam = proceedingJoinPoint.getArgs()[0];
            if (methodInputParam != null) {
                sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1000, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), methodInputParam.getClass().getSimpleName(), methodInputParam.toString());
                returnObject = proceedingJoinPoint.proceed();
                sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1001, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), methodInputParam.toString());
            }
        } else {
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1000, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), "none", "none");
            returnObject = proceedingJoinPoint.proceed();
            sprinkler.logger.log(runtimeLogInfoHelper.getRuntimeLogInfo(), 1001, proceedingJoinPoint.getSignature().getDeclaringTypeName(), proceedingJoinPoint.getSignature().getName(), "none");
        }
        return returnObject;
    }

    private boolean validateRequest(HttpSession session, HttpServletRequest request, HttpServletResponse response) throws SpartanAccessDeniedException {
        if (!sessionValidation.checkIgnoreURL(request)) {
            sessionValidation.validateSession(session, request, response);
            cookieValidation.validateSessionCookie(session, request);
        }
        return true;
    }

    @AfterReturning(value = "allOperation()||athenaServiceOperation()||spartanServiceOperation()")
    public void afterReturning(JoinPoint join) throws IOException {
        counterService.increment("counter.HttpStatus." + httpStatusCode.name() + "." + join.getSignature().getDeclaringType().getSimpleName() + "." + join.getSignature().getName() + ".calls");
        counterService.increment("counter.numberof.calls");
    }

    public String incrementUricounter(String className, String methodName) {
        counterService.increment(className + "." + methodName);
        Metric metric = repository.findOne("gauge." + className + "." + methodName + "");
        if (metric != null) {
            gaugeservice.submit(className + "." + methodName, (Double) metric.getValue() + 1);
        } else {
            gaugeservice.submit(className + "." + methodName, 1);
        }
        return className + "." + methodName;
    }

    public String loggedInUserId(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("usidHash") != null) {
            String loggedInObject = (String) session.getAttribute(session.getAttribute("usidHash").toString());
            try {
                JSONObject json = new JSONObject(loggedInObject);
                JSONObject userJSON = json.getJSONObject("user");
                return userJSON.getString("userId");
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } else {
            return "";
        }
        return null;
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

    private void prepareEntityAuditInfo(CommonEntityInterface entity) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String userId = loggedInUserId(request);
        entity.setEntityAudit(1, userId);
    }

    public String getCustomerId(HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println(session.getAttribute("customerId"));
        if (session.getAttribute("customerId") != null) {
            return (String) session.getAttribute("customerId").toString();
        } else {
            return "";
        }
    }

    @Pointcut("execution(* com.athena..service..update*(..)) || execution(* com.spartan..service..update*(..))")
    protected void athenaAndSpartanUpdateServiceOperation() {
    }

    @Pointcut("execution(* com.athena..service..*(..))")
    protected void athenaServiceOperation() {
    }

    @Pointcut("execution(* com.spartan..service..*(..))")
    protected void spartanServiceOperation() {
    }

    @Pointcut("execution(* com.app.app.server.service..save*(..))")
    protected void saveOperation() {
    }

    @Pointcut("execution(* com.app.app.server.service..delete*(..))")
    protected void deleteOperation() {
    }

    @Pointcut("execution(* com.app.app.server.service..update*(..))")
    protected void updateOperation() {
    }

    @Pointcut("execution(* com.app.app.server.service..*..*(..)) && !within(com.spartan.shield.sessionService.SessionDataMgtService+)")
    protected void allOperation() {
    }

    @Pointcut("execution(* com.app.app.server.service..find*(..))")
    protected void findOperation() {
    }

    @Pointcut("execution(* com.app.app.server.service..get*(..))")
    protected void getOperation() {
    }
}
