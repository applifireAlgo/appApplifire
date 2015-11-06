package com.app.app.server.businessservice.aspect;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.athena.framework.server.exception.biz.SpartanConstraintViolationException;
import com.athena.framework.server.helper.EntityValidatorHelper;
import com.athena.config.server.helper.ResourceFactoryManagerHelper;

@Aspect
@Component
public class BusinessAspect {

    @Autowired
    private EntityValidatorHelper<Object> entityValidator;

    @Autowired
    private ResourceFactoryManagerHelper emfResource;

    @Before("execution(* com.app.app.server.repository.*Impl.save(..))")
    public void beforeSaveAdvice(JoinPoint joinPoint) throws SpartanConstraintViolationException {
        Object obj[] = joinPoint.getArgs();
    }

    @After("execution(* com.app.app.server.businessservice..*(..))")
    public void afterAllMethodCalls(JoinPoint joinPoint) {
        System.out.println("closing em from biz aop");
        emfResource.closeResource();
    }
}
