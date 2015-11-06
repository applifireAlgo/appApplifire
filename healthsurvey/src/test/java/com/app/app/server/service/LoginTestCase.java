package com.app.app.server.service;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import com.app.app.config.WebConfigExtended;
import org.springframework.test.context.ContextConfiguration;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.TestExecutionListeners;
import com.app.app.server.repository.LoginRepository;
import com.app.app.shared.authentication.Login;
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
import com.app.app.shared.contacts.CoreContacts;
import com.app.app.server.repository.CoreContactsRepository;
import com.app.app.shared.contacts.Gender;
import com.app.app.server.repository.GenderRepository;
import com.app.app.shared.location.Language;
import com.app.app.server.repository.LanguageRepository;
import com.app.app.shared.location.Timezone;
import com.app.app.server.repository.TimezoneRepository;
import com.app.app.shared.contacts.Title;
import com.app.app.server.repository.TitleRepository;
import com.app.app.shared.authentication.User;
import com.app.app.server.repository.UserRepository;
import com.app.app.shared.authentication.UserAccessDomain;
import com.app.app.server.repository.UserAccessDomainRepository;
import com.app.app.shared.authentication.UserAccessLevel;
import com.app.app.server.repository.UserAccessLevelRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = WebConfigExtended.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@TestExecutionListeners({ org.springframework.test.context.support.DependencyInjectionTestExecutionListener.class, org.springframework.test.context.support.DirtiesContextTestExecutionListener.class, org.springframework.test.context.transaction.TransactionalTestExecutionListener.class })
public class LoginTestCase {

    @Autowired
    private LoginRepository<Login> loginRepository;

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
            CoreContacts corecontacts = new CoreContacts();
            corecontacts.setAge(14);
            corecontacts.setApproximateDOB(new java.sql.Date(123456789));
            corecontacts.setDateofbirth(new java.sql.Date(123456789));
            corecontacts.setEmailId("g5cspD3HHkoYdK6rIoR7f0zfi30CAfzyDyKhaKBXtYhn9JotTz");
            corecontacts.setFirstName("jFEzngxFNG7L9c2yav95kZfFxnaFyraFdQ7msV0AJ5FBUzLL2l");
            Gender gender = new Gender();
            gender.setGender("1y2lWFjWgHn2y6aPBmrrilldQysVjKe02u6OXPQ5MHdKJZnIfM");
            Gender GenderTest = genderRepository.save(gender);
            map.put("GenderPrimaryKey", gender._getPrimarykey());
            Language language = new Language();
            language.setAlpha2("PK");
            language.setAlpha3("QI0");
            language.setAlpha4("8vBI");
            language.setAlpha4parentid(7);
            language.setLanguage("mf4iXbjvtGGF5GmcNyxUatxxyvA2arJpLXkXMrDA0ttaDbLiwT");
            language.setLanguageDescription("V7zwDCuCaVrbvT9dnTd0YUn99peUFzzQXJiv3kpmVebRnOBONB");
            language.setLanguageIcon("HunjzMsP1y56g0PtBi9Zh0fze1WTOuS4dNbzjeYE8D5rOfEwon");
            language.setLanguageType("M7X8vcWdsXwLuUMqG4nRobYOMmSnxrtZ");
            Language LanguageTest = languageRepository.save(language);
            map.put("LanguagePrimaryKey", language._getPrimarykey());
            Timezone timezone = new Timezone();
            timezone.setCities("d0YHCirbnQGoKhNB4jfjuJeLol5WKQknjrMiqSJJuqvufKcmXX");
            timezone.setCountry("zO2S4ajndnj1GrfYkalrdRI4EYc2DKwPSBed0rVc3o7fM8gpiC");
            timezone.setGmtLabel("NiA1WPefwSe15PZH43qpFZqFGkm8d5jRodAsiAzL9MRcazF1a3");
            timezone.setTimeZoneLabel("4ZVk268Ty8dxKSF9lJrS6NxGF9cHoAhP8vuYaitDAJYtagjq6W");
            timezone.setUtcdifference(8);
            Timezone TimezoneTest = timezoneRepository.save(timezone);
            map.put("TimezonePrimaryKey", timezone._getPrimarykey());
            Title title = new Title();
            title.setTitles("PveLAXocMpZm1LaqNec83O1pNn4We8NceZRUxPWaGGn6PdTTW2");
            Title TitleTest = titleRepository.save(title);
            map.put("TitlePrimaryKey", title._getPrimarykey());
            corecontacts.setAge(73);
            corecontacts.setApproximateDOB(new java.sql.Date(123456789));
            corecontacts.setDateofbirth(new java.sql.Date(123456789));
            corecontacts.setEmailId("VYERSk0JbjbLTfbTanU9xlbBT54bud9WVZJQU6NhhjFF4Ps3Lt");
            corecontacts.setFirstName("JUEnxQL0IEbxYRqTEmVhhGzDKmnQQ7pW8ea3ZjiAlZqKgAdIZD");
            corecontacts.setGenderId((java.lang.String) GenderTest._getPrimarykey()); /* ******Adding refrenced table data */
            corecontacts.setLastName("vZQm8aylWWZlhdi2CCL3RYw14wh5fjym3pEDjLMbym0DQ6XVJA");
            corecontacts.setMiddleName("Ra3f6Eq5GWD4dB6AdA8FD5eHR75Ak8jUqiJuHrJl7YbQc4ddTj");
            corecontacts.setNativeFirstName("4hUuNN6nkji1NRwfPEgG1l0O7TTqGP5OHvbWI9Yd8H5zacMbjT");
            corecontacts.setNativeLanguageCode((java.lang.String) LanguageTest._getPrimarykey()); /* ******Adding refrenced table data */
            corecontacts.setNativeLastName("smLoegF9fGWeohAZJKKk4iYZdQtdnS0jHgXx6JDRrLXs4IQ2bR");
            corecontacts.setNativeMiddleName("1dcs4WqVO6Gjwt0xOay18KHTQj6PECwF1n0ab05yU2RX5PzFAH");
            corecontacts.setNativeTitle("3l7gKYIfn2MqO8Dzh1ujONxS51FTokshqx0vheODma2ejyEdAc");
            corecontacts.setPhoneNumber("XkFQE3ky6QpYSZPSN0y9");
            corecontacts.setTimeZone((java.lang.String) TimezoneTest._getPrimarykey()); /* ******Adding refrenced table data */
            corecontacts.setTitleId((java.lang.String) TitleTest._getPrimarykey()); /* ******Adding refrenced table data */
            User user = new User();
            user.setAllowMultipleLogin(1);
            user.setChangePasswordNextLogin(1);
            user.setGenTempOneTimePassword(1);
            user.setIsDeleted(0);
            user.setIsLocked(0);
            user.setLastPasswordChangeDate(new java.sql.Timestamp(123456789));
            user.setMultiFactorAuthEnabled(1);
            user.setPasswordAlgo("B19OUI7o7tY8ikSZBsebQsNeSbzPm5iY1wqY8BIZc8suH6OGvL");
            user.setPasswordExpiryDate(new java.sql.Timestamp(123456789));
            user.setSessionTimeout(1227);
            user.setUserAccessCode(1);
            UserAccessDomain useraccessdomain = new UserAccessDomain();
            useraccessdomain.setDomainDescription("K5NnfzCmE2MajX95LKNJRePG8krEi1BcIUDnb061Pf2XUZbZHO");
            useraccessdomain.setDomainHelp("OuGSPZjrzJW7taPDI68uk8nqiCmYfrZ8iKhP53mltGkEE8saqG");
            useraccessdomain.setDomainIcon("ak3lOdlYKXh4d2xWldzJVePbSxPwMOJ2sE6t51NKaQAEPMlIAI");
            useraccessdomain.setDomainName("bdFf99BiMLWYRz89gXV8OOVvsjikIy2FgYIltrIryZVAwSWLVx");
            useraccessdomain.setUserAccessDomain(valueGenerator.getRandomInteger(99999, 0));
            UserAccessDomain UserAccessDomainTest = useraccessdomainRepository.save(useraccessdomain);
            map.put("UserAccessDomainPrimaryKey", useraccessdomain._getPrimarykey());
            UserAccessLevel useraccesslevel = new UserAccessLevel();
            useraccesslevel.setLevelDescription("OnFPA35VKCypvIMUSP7I1Wcf9uAEW0XIoXLXRIp7QzzLX2FFZn");
            useraccesslevel.setLevelHelp("XjwZ01P3vkJXU8cChXKNLK5kCDddq8PJpX4ygBTYpzT81bgHyr");
            useraccesslevel.setLevelIcon("KfjoxpHBz5LNtHDtoNeMrwRWkCTtTEq0b0fAJocsvPYzhsT8EP");
            useraccesslevel.setLevelName("aGbHxoI2vqQBdAnIK632O6PUDuyalX9tLg7nnIxGxaVFK3AlK4");
            useraccesslevel.setUserAccessLevel(valueGenerator.getRandomInteger(99999, 0));
            UserAccessLevel UserAccessLevelTest = useraccesslevelRepository.save(useraccesslevel);
            map.put("UserAccessLevelPrimaryKey", useraccesslevel._getPrimarykey());
            user.setAllowMultipleLogin(0);
            user.setChangePasswordNextLogin(0);
            user.setGenTempOneTimePassword(1);
            user.setIsDeleted(1);
            user.setIsLocked(1);
            user.setLastPasswordChangeDate(new java.sql.Timestamp(123456789));
            user.setMultiFactorAuthEnabled(0);
            user.setPasswordAlgo("OsfrWo5WS6iOPxMISsHsUpqTCMYmtoNmVSYurqsSjP685iByv0");
            user.setPasswordExpiryDate(new java.sql.Timestamp(123456789));
            user.setSessionTimeout(3085);
            user.setUserAccessCode(4);
            user.setUserAccessDomainId((java.lang.String) UserAccessDomainTest._getPrimarykey()); /* ******Adding refrenced table data */
            user.setUserAccessLevelId((java.lang.String) UserAccessLevelTest._getPrimarykey());
            Login login = new Login();
            login.setCoreContacts(corecontacts);
            login.setFailedLoginAttempts(8);
            login.setIsAuthenticated(true);
            login.setLoginId("yqVUIzV9irDc4EjgeGM3f1o9BDms26KeYu9kVJzT9YOmlkrp8k");
            login.setServerAuthImage("Jt0e0BjQKvWD8z7p4nOegV7Cn7gIUaDM");
            login.setServerAuthText("wrbKlE4RPqi2B6iR");
            login.setUser(user);
            login.setEntityAudit(1, "xyz", RECORD_TYPE.ADD);
            login.setEntityValidator(entityValidator);
            login.isValid();
            loginRepository.save(login);
            map.put("LoginPrimaryKey", login._getPrimarykey());
            map.put("CoreContactsPrimaryKey", login.getCoreContacts()._getPrimarykey());
            map.put("UserPrimaryKey", login.getUser()._getPrimarykey());
        } catch (com.athena.framework.server.exception.biz.SpartanConstraintViolationException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private CoreContactsRepository<CoreContacts> corecontactsRepository;

    @Autowired
    private GenderRepository<Gender> genderRepository;

    @Autowired
    private LanguageRepository<Language> languageRepository;

    @Autowired
    private TimezoneRepository<Timezone> timezoneRepository;

    @Autowired
    private TitleRepository<Title> titleRepository;

    @Autowired
    private UserRepository<User> userRepository;

    @Autowired
    private UserAccessDomainRepository<UserAccessDomain> useraccessdomainRepository;

    @Autowired
    private UserAccessLevelRepository<UserAccessLevel> useraccesslevelRepository;

    @Test
    public void test2Update() {
        try {
            org.junit.Assert.assertNotNull(map.get("LoginPrimaryKey"));
            Login login = loginRepository.findById((java.lang.String) map.get("LoginPrimaryKey"));
            login.setFailedLoginAttempts(8);
            login.setLoginId("pOKIbaRgdfZPbknJ8hohyItRv9wWEQ3mnPshrfdJZ7pdLtJBWa");
            login.setServerAuthImage("9TkwVtdqA3HmsYp3d6OMRfXj4tPtFi48");
            login.setServerAuthText("w9rZNW2yRwyRjEeO");
            login.setVersionId(1);
            login.setEntityAudit(1, "xyz", RECORD_TYPE.UPDATE);
            loginRepository.update(login);
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3FindById() {
        try {
            org.junit.Assert.assertNotNull(map.get("LoginPrimaryKey"));
            loginRepository.findById((java.lang.String) map.get("LoginPrimaryKey"));
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testNQFindMappedUser() {
        try {
            loginRepository.FindMappedUser();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testNQFindUnMappedUser() {
        try {
            loginRepository.FindUnMappedUser();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test4Delete() {
        try {
            org.junit.Assert.assertNotNull(map.get("LoginPrimaryKey"));
            loginRepository.delete((java.lang.String) map.get("LoginPrimaryKey")); /* Deleting refrenced data */
            useraccesslevelRepository.delete((java.lang.String) map.get("UserAccessLevelPrimaryKey")); /* Deleting refrenced data */
            useraccessdomainRepository.delete((java.lang.String) map.get("UserAccessDomainPrimaryKey")); /* Deleting refrenced data */
            titleRepository.delete((java.lang.String) map.get("TitlePrimaryKey")); /* Deleting refrenced data */
            timezoneRepository.delete((java.lang.String) map.get("TimezonePrimaryKey")); /* Deleting refrenced data */
            languageRepository.delete((java.lang.String) map.get("LanguagePrimaryKey")); /* Deleting refrenced data */
            genderRepository.delete((java.lang.String) map.get("GenderPrimaryKey"));
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
