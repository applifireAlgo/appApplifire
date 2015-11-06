package com.app.app.server.service;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import com.app.app.config.WebConfigExtended;
import org.springframework.test.context.ContextConfiguration;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.TestExecutionListeners;
import com.app.app.server.repository.SurveyResultRepository;
import com.app.app.shared.health.SurveyResult;
import org.springframework.beans.factory.annotation.Autowired;
import com.athena.framework.server.helper.RuntimeLogInfoHelper;
import com.athena.framework.server.helper.EntityValidatorHelper;
import com.athena.framework.server.test.RandomValueGenerator;
import java.util.HashMap;
import com.spartan.healthmeter.entity.scheduler.ArtMethodCallStack;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.junit.Before;
import org.junit.After;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface.RECORD_TYPE;
import org.junit.Test;
import com.app.app.shared.authentication.User;
import com.app.app.server.repository.UserRepository;
import com.app.app.shared.authentication.UserAccessDomain;
import com.app.app.server.repository.UserAccessDomainRepository;
import com.app.app.shared.authentication.UserAccessLevel;
import com.app.app.server.repository.UserAccessLevelRepository;
import com.app.app.shared.health.SurveyAnswer;
import com.app.app.server.repository.SurveyAnswerRepository;
import com.app.app.shared.health.SurveyQuestion;
import com.app.app.server.repository.SurveyQuestionRepository;
import com.app.app.shared.health.SurveyQuestionGroup;
import com.app.app.server.repository.SurveyQuestionGroupRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = WebConfigExtended.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@TestExecutionListeners({ org.springframework.test.context.support.DependencyInjectionTestExecutionListener.class, org.springframework.test.context.support.DirtiesContextTestExecutionListener.class, org.springframework.test.context.transaction.TransactionalTestExecutionListener.class })
public class SurveyResultTestCase {

    @Autowired
    private SurveyResultRepository<SurveyResult> surveyresultRepository;

    @Autowired
    private RuntimeLogInfoHelper runtimeLogInfoHelper;

    @Autowired
    private EntityValidatorHelper<Object> entityValidator;

    private RandomValueGenerator valueGenerator = new RandomValueGenerator();

    private static HashMap<String, Object> map = new HashMap<String, Object>();

    @Autowired
    private ArtMethodCallStack methodCallStack;

    protected MockHttpSession session;

    protected MockHttpServletRequest request;

    protected MockHttpServletResponse response;

    protected void startSession() {
        session = new MockHttpSession();
    }

    protected void endSession() {
        session.clearAttributes();
        session.invalidate();
        session = null;
    }

    protected void startRequest() {
        request = new MockHttpServletRequest();
        request.setSession(session);
        org.springframework.web.context.request.RequestContextHolder.setRequestAttributes(new org.springframework.web.context.request.ServletRequestAttributes(request));
    }

    protected void endRequest() {
        ((org.springframework.web.context.request.ServletRequestAttributes) org.springframework.web.context.request.RequestContextHolder.getRequestAttributes()).requestCompleted();
        org.springframework.web.context.request.RequestContextHolder.resetRequestAttributes();
        request = null;
    }

    @Before
    public void before() {
        startSession();
        startRequest();
        setBeans();
    }

    @After
    public void after() {
        endSession();
        endRequest();
    }

    private void setBeans() {
        runtimeLogInfoHelper.createRuntimeLogUserInfo(1, "AAAAA", request.getRemoteHost());
        org.junit.Assert.assertNotNull(runtimeLogInfoHelper);
        methodCallStack.setRequestId(java.util.UUID.randomUUID().toString().toUpperCase());
    }

    @Test
    public void test1Save() {
        try {
            User user = new User();
            user.setAllowMultipleLogin(0);
            user.setChangePasswordNextLogin(1);
            user.setGenTempOneTimePassword(1);
            user.setIsDeleted(1);
            user.setIsLocked(1);
            user.setLastPasswordChangeDate(new java.sql.Timestamp(123456789));
            user.setMultiFactorAuthEnabled(1);
            user.setPasswordAlgo("D8v7aJRxjnxgEjNNOPBQq59R9PhAKtn8nxaRtgNOVjLfng3r2g");
            user.setPasswordExpiryDate(new java.sql.Timestamp(123456789));
            user.setSessionTimeout(1215);
            user.setUserAccessCode(8);
            UserAccessDomain useraccessdomain = new UserAccessDomain();
            useraccessdomain.setDomainDescription("tCf2QIhKsGVO3lPxt1eIZa249K8biEk6KDDzKnuhCv3p918K9S");
            useraccessdomain.setDomainHelp("GOXqOlT1h48HI3XLYvjkySbxC2ErDU1z8gt2owzcAhDyq1BDTg");
            useraccessdomain.setDomainIcon("PEfEgav6ofDl8ztB5mCsa4Epuu2hqfXaq5jpzTXZle064xyvwI");
            useraccessdomain.setDomainName("8mRerdC7ZrdVJQtfwYbJ8CPkGfKYex8Kz2TQti573iHfvX23IZ");
            useraccessdomain.setUserAccessDomain(valueGenerator.getRandomInteger(99999, 0));
            UserAccessDomain UserAccessDomainTest = useraccessdomainRepository.save(useraccessdomain);
            map.put("UserAccessDomainPrimaryKey", useraccessdomain._getPrimarykey());
            UserAccessLevel useraccesslevel = new UserAccessLevel();
            useraccesslevel.setLevelDescription("lupZ3grtIVQxijx64SHRGXfqVdipVpvKYxvNDKPSfTwgTega1n");
            useraccesslevel.setLevelHelp("yZFiFOAZJ12IWNc4qBbyxxjSNAgdlmrAFN6G9EKUelR6GwymrM");
            useraccesslevel.setLevelIcon("3huPDAIqFGwYWhr57D4wGDQ4pJAzmOn8N42KoNlPVZAcI8ayUB");
            useraccesslevel.setLevelName("WCVOaTmG86AEPlwZhsIsDUIHJAq2HkMRdeUFEjsKKnQgd6EOxF");
            useraccesslevel.setUserAccessLevel(valueGenerator.getRandomInteger(99999, 0));
            UserAccessLevel UserAccessLevelTest = useraccesslevelRepository.save(useraccesslevel);
            map.put("UserAccessLevelPrimaryKey", useraccesslevel._getPrimarykey());
            user.setAllowMultipleLogin(0);
            user.setChangePasswordNextLogin(0);
            user.setGenTempOneTimePassword(1);
            user.setIsDeleted(1);
            user.setIsLocked(1);
            user.setLastPasswordChangeDate(new java.sql.Timestamp(123456789));
            user.setMultiFactorAuthEnabled(1);
            user.setPasswordAlgo("dhKPO9zK8vThQZLxkx5bXxBdVnSBInmDs8sP4mBLGVEJiFsk8a");
            user.setPasswordExpiryDate(new java.sql.Timestamp(123456789));
            user.setSessionTimeout(1207);
            user.setUserAccessCode(3);
            user.setUserAccessDomainId((java.lang.String) UserAccessDomainTest._getPrimarykey()); /* ******Adding refrenced table data */
            user.setUserAccessLevelId((java.lang.String) UserAccessLevelTest._getPrimarykey()); /* ******Adding refrenced table data */
            User UserTest = userRepository.save(user);
            map.put("UserPrimaryKey", user._getPrimarykey());
            SurveyAnswer surveyanswer = new SurveyAnswer();
            surveyanswer.setSurveyAnswerDesc("iCdEsdhyucjQhcDCcQG2PjGccBmIHKGTbe5cn3Zl7Z0gTYbCrX");
            surveyanswer.setSurveyAnswerName("3jPPAovYPPnZpSURydoQty2PMPydHUKwJtphHUX56fOkZuc9RA");
            SurveyAnswer SurveyAnswerTest = surveyanswerRepository.save(surveyanswer);
            map.put("SurveyAnswerPrimaryKey", surveyanswer._getPrimarykey());
            SurveyQuestion surveyquestion = new SurveyQuestion();
            surveyquestion.setSurveyQuestionDesc("tCXxaueBzGdY1yI5371mrn0ZRBl7pAUsz5XVq1UgU7Oo4WqxVt");
            SurveyQuestionGroup surveyquestiongroup = new SurveyQuestionGroup();
            surveyquestiongroup.setSurveyQuestionGroupDesc("Vtk");
            surveyquestiongroup.setSurveyQuestionGroupName("PQN1WImOeHDUCWno2CprcszQ7itXqCDyjlAITm1dZbYClSo8Mp");
            SurveyQuestionGroup SurveyQuestionGroupTest = surveyquestiongroupRepository.save(surveyquestiongroup);
            map.put("SurveyQuestionGroupPrimaryKey", surveyquestiongroup._getPrimarykey().toString());
            surveyquestion.setSurveyQuestionDesc("SBghTM0oNXUMOnyctpulyp060cVC7HhwXnT12dTqtjkoecQNKr");
            surveyquestion.setSurveyQuestionGroupId((java.lang.Integer) SurveyQuestionGroupTest._getPrimarykey()); /* ******Adding refrenced table data */
            surveyquestion.setSurveyQuestionName("QEAtgD7UMcUltmSA7zpr02NC1bqOTZfbk7iGTKKr0lN3M2zj4e");
            SurveyQuestion SurveyQuestionTest = surveyquestionRepository.save(surveyquestion);
            map.put("SurveyQuestionPrimaryKey", surveyquestion._getPrimarykey());
            SurveyResult surveyresult = new SurveyResult();
            surveyresult.setContactId((java.lang.String) UserTest._getPrimarykey()); /* ******Adding refrenced table data */
            surveyresult.setSurveyAnswerId((java.lang.String) SurveyAnswerTest._getPrimarykey()); /* ******Adding refrenced table data */
            surveyresult.setSurveyDate(new java.sql.Date(123456789));
            surveyresult.setSurveyQuestionId((java.lang.String) SurveyQuestionTest._getPrimarykey());
            surveyresult.setEntityAudit(1, "xyz", RECORD_TYPE.ADD);
            surveyresult.setEntityValidator(entityValidator);
            surveyresult.isValid();
            surveyresultRepository.save(surveyresult);
            map.put("SurveyResultPrimaryKey", surveyresult._getPrimarykey());
        } catch (com.athena.framework.server.exception.biz.SpartanConstraintViolationException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private UserRepository<User> userRepository;

    @Autowired
    private UserAccessDomainRepository<UserAccessDomain> useraccessdomainRepository;

    @Autowired
    private UserAccessLevelRepository<UserAccessLevel> useraccesslevelRepository;

    @Autowired
    private SurveyAnswerRepository<SurveyAnswer> surveyanswerRepository;

    @Autowired
    private SurveyQuestionRepository<SurveyQuestion> surveyquestionRepository;

    @Autowired
    private SurveyQuestionGroupRepository<SurveyQuestionGroup> surveyquestiongroupRepository;

    @Test
    public void test2Update() {
        try {
            org.junit.Assert.assertNotNull(map.get("SurveyResultPrimaryKey"));
            SurveyResult surveyresult = surveyresultRepository.findById((java.lang.String) map.get("SurveyResultPrimaryKey"));
            surveyresult.setSurveyDate(new java.sql.Date(123456789));
            surveyresult.setVersionId(1);
            surveyresult.setEntityAudit(1, "xyz", RECORD_TYPE.UPDATE);
            surveyresultRepository.update(surveyresult);
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBycontactId() {
        try {
            java.util.List<SurveyResult> listofcontactId = surveyresultRepository.findByContactId((java.lang.String) map.get("UserPrimaryKey"));
            if (listofcontactId.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBysurveyAnswerId() {
        try {
            java.util.List<SurveyResult> listofsurveyAnswerId = surveyresultRepository.findBySurveyAnswerId((java.lang.String) map.get("SurveyAnswerPrimaryKey"));
            if (listofsurveyAnswerId.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBysurveyQuestionId() {
        try {
            java.util.List<SurveyResult> listofsurveyQuestionId = surveyresultRepository.findBySurveyQuestionId((java.lang.String) map.get("SurveyQuestionPrimaryKey"));
            if (listofsurveyQuestionId.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3FindById() {
        try {
            org.junit.Assert.assertNotNull(map.get("SurveyResultPrimaryKey"));
            surveyresultRepository.findById((java.lang.String) map.get("SurveyResultPrimaryKey"));
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test4Delete() {
        try {
            org.junit.Assert.assertNotNull(map.get("SurveyResultPrimaryKey"));
            surveyresultRepository.delete((java.lang.String) map.get("SurveyResultPrimaryKey")); /* Deleting refrenced data */
            surveyquestionRepository.delete((java.lang.String) map.get("SurveyQuestionPrimaryKey")); /* Deleting refrenced data */
            surveyquestiongroupRepository.delete((java.lang.Integer) map.get("SurveyQuestionGroupPrimaryKey")); /* Deleting refrenced data */
            surveyanswerRepository.delete((java.lang.String) map.get("SurveyAnswerPrimaryKey")); /* Deleting refrenced data */
            userRepository.delete((java.lang.String) map.get("UserPrimaryKey")); /* Deleting refrenced data */
            useraccesslevelRepository.delete((java.lang.String) map.get("UserAccessLevelPrimaryKey")); /* Deleting refrenced data */
            useraccessdomainRepository.delete((java.lang.String) map.get("UserAccessDomainPrimaryKey"));
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
