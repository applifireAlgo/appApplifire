package com.app.app.server.repository.aspect;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;
import java.util.TimeZone;
import com.spartan.sprinkler.core.RuntimeLogInfoImpl;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.spartan.healthmeter.entity.scheduler.ArtMethodCallStack;
import com.spartan.healthmeter.entity.scheduler.MethodCallDetails;
import com.spartan.healthmeter.msgWriter.config.HealthConstants;
import com.spartan.healthmeter.msgWriter.core.Healthmeter;
import com.spartan.sprinkler.core.Sprinkler;
import com.spartan.sprinkler.core.RuntimeLogUserInfo;
import com.athena.framework.server.exception.biz.SpartanConstraintViolationException;
import com.athena.framework.server.exception.biz.SpartanIncorrectDataException;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import com.athena.framework.server.helper.RuntimeLogInfoHelper;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import org.springframework.core.annotation.Order;
import com.athena.config.server.helper.ResourceFactoryManagerHelper;

@Aspect
@Component
public class RepositoryAspect {

    @Autowired
    private RuntimeLogInfoHelper runtimeLogInfoHelper;

    @Autowired
    private Sprinkler sprinkler;

    @Autowired
    private ArtMethodCallStack requestDetails;

    @Autowired
    private Healthmeter healthmeter;

    @Autowired
    private ResourceFactoryManagerHelper emfResource;

    @Around(value = "saveOperation()||deleteOperation()||updateOperation()||findOperation()||getOperation()||allOperation()")
    public Object aroundfindAll(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("In around repository aspect");
        MethodCallDetails methodCallDetails = new MethodCallDetails(requestDetails.getRequestId(), HealthConstants.CLASS_TYPE.REPOSITORY, runtimeLogInfoHelper.getRuntimeLogInfo().getUserIpAddress(), "", joinPoint.getTarget().getClass().toString(), joinPoint.getSignature().getName(), runtimeLogInfoHelper.getRuntimeLogInfo().getUserId(), "");
        setCustomerIdInEntityManager();
        Object object = null;
        if (joinPoint.getArgs().length > 0) {
            Object methodInputParam = joinPoint.getArgs()[0];
            if (methodInputParam != null && methodInputParam instanceof CommonEntityInterface) {
                CommonEntityInterface entity = (CommonEntityInterface) methodInputParam;
                preSaveUpdateOperation(entity);
            } else if (methodInputParam != null && methodInputParam instanceof List) {
                List listOfEntities = (List) methodInputParam;
                if (listOfEntities.size() > 0) {
                    /*
                     * Checking 0th element type. So no need to check type for
                     * each element in the loop.
                     */
                    if (listOfEntities.get(0) instanceof CommonEntityInterface) {
                        for (Object object1 : listOfEntities) {
                            CommonEntityInterface entity = (CommonEntityInterface) object1;
                            preSaveUpdateOperation(entity);
                        }
                    }
                }
            }
        }
        try {
            object = handleRepositoryCall(joinPoint, runtimeLogInfoHelper.getRuntimeLogInfo());
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_NORMAL_EXECUTION);
        } catch (SpartanPersistenceException e) {
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_EXCEPTION, e.getExceptionId());
            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            methodCallDetails.setPostCallDetails(HealthConstants.METHOD_EXCEPTION, HealthConstants.DEFAULT_EXCEPTION_ID);
            e.printStackTrace();
            throw e;
        } finally {
            requestDetails.addRepositoryMethodCallDetails(methodCallDetails);
        }
        return object;
    }

    @Around(value = "applifireRepositoryOperation()")
    @Order(2)
    public Object aroundApplifire(ProceedingJoinPoint joinPoint) throws Throwable {
        setCustomerIdInEntityManager();
        return handleRepositoryCall(joinPoint, runtimeLogInfoHelper.getRuntimeLogInfo());
    }

    @Around(value = "applifireJPQLToSQLConverter()")
    @Order(1)
    public Object aroundApplifireJPQLToSQLConverter(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("In around applifire repository aspect");
        RuntimeLogUserInfo localRuntimeLogInfo = createLocalRuntimeLogInfo();
        return handleRepositoryCall(joinPoint, localRuntimeLogInfo);
    }

    private Object handleRepositoryCall(ProceedingJoinPoint joinPoint, RuntimeLogUserInfo runtimeLogInfoHelper) throws Throwable {
        try {
            if (joinPoint.getArgs().length > 0) {
                if (joinPoint.getArgs()[0] != null) {
                    sprinkler.logger.log(runtimeLogInfoHelper, 2000, joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(), joinPoint.getArgs()[0]);
                    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
                    Object returnObject = joinPoint.proceed();
                    TimeZone.setDefault(TimeZone.getTimeZone("IST"));
                    sprinkler.logger.log(runtimeLogInfoHelper, 2001, joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName());
                    return returnObject;
                }
            } else {
                sprinkler.logger.log(runtimeLogInfoHelper, 2000, joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(), "none");
                TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
                Object returnObject = joinPoint.proceed();
                TimeZone.setDefault(TimeZone.getTimeZone("IST"));
                sprinkler.logger.log(runtimeLogInfoHelper, 2001, joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName());
                return returnObject;
            }
            return null;
        } catch (SpartanPersistenceException e) {
            e.printStackTrace();
            sprinkler.logger.log(runtimeLogInfoHelper, e.getExceptionId(), joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(), e, "fetching", "Entity");
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            sprinkler.logger.log(runtimeLogInfoHelper, 2007, joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(), e, "fetching", "Entity");
            throw e;
        }
    }

    private void preSaveUpdateOperation(CommonEntityInterface entity) throws SpartanConstraintViolationException, SpartanIncorrectDataException {
        entity.setEntityAudit(1, runtimeLogInfoHelper.getRuntimeLogInfo().getUserId());
    }

    private RuntimeLogUserInfo createLocalRuntimeLogInfo() {
        String ipAddress = "localhost";
        try {
            InetAddress ip = InetAddress.getLocalHost();
            ipAddress = ip.getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return new RuntimeLogInfoImpl(1, "DEFAULT", ipAddress);
    }

    public void setCustomerIdInEntityManager() {
        if (runtimeLogInfoHelper.getCustomerId() != "" && runtimeLogInfoHelper.getCustomerId() != null) {
            HashMap<String, Object> map = new HashMap<String, Object>();
            map.put("tenant.id", runtimeLogInfoHelper.getCustomerId());
            emfResource.setResourceAttributes(map);
            runtimeLogInfoHelper.setMultitenantFields(map);
        }
    }

    @Pointcut("(execution(* com.athena..repository..*(..)) || execution(* com.spartan..repository..*(..))) && !within(com.athena.server.repository.ArtQueryRepository+) && !within(com.athena.search.repository.SearchEngineRepository+)")
    protected void applifireRepositoryOperation() {
    }

    @Pointcut("execution(* com.athena.server.repository.ArtQueryRepository.findSqlFromJPQL()) || execution(* com.athena.search.repository.SearchEngineRepository..*(..)))")
    protected void applifireJPQLToSQLConverter() {
    }

    @Pointcut("execution(* com.athena..repository..*(..))")
    protected void athenaServiceOperation() {
    }

    @Pointcut("execution(* com.spartan..repository..*(..))")
    protected void spartanServiceOperation() {
    }

    @Pointcut("execution(* com.app.app.server.repository..save*(..))")
    protected void saveOperation() {
    }

    @Pointcut("execution(* com.app.app.server.repository..update*(..))")
    protected void updateOperation() {
    }

    @Pointcut("execution(* com.app.app.server.repository..delete*(..))")
    protected void deleteOperation() {
    }

    @Pointcut("execution(* com.app.app.server.repository..find*(..))")
    protected void findOperation() {
    }

    @Pointcut("execution(* com.app.app.server.repository..get*(..))")
    protected void getOperation() {
    }

    @Pointcut("execution(* com.app.app.server.repository..*(..))")
    protected void allOperation() {
    }
}
