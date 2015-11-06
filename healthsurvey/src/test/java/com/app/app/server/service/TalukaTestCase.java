package com.app.app.server.service;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import com.app.app.config.WebConfigExtended;
import org.springframework.test.context.ContextConfiguration;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.TestExecutionListeners;
import com.app.app.server.repository.TalukaRepository;
import com.app.app.shared.location.Taluka;
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
import com.app.app.shared.location.Country;
import com.app.app.server.repository.CountryRepository;
import com.app.app.shared.location.District;
import com.app.app.server.repository.DistrictRepository;
import com.app.app.shared.location.Region;
import com.app.app.server.repository.RegionRepository;
import com.app.app.shared.location.State;
import com.app.app.server.repository.StateRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = WebConfigExtended.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@TestExecutionListeners({ org.springframework.test.context.support.DependencyInjectionTestExecutionListener.class, org.springframework.test.context.support.DirtiesContextTestExecutionListener.class, org.springframework.test.context.transaction.TransactionalTestExecutionListener.class })
public class TalukaTestCase {

    @Autowired
    private TalukaRepository<Taluka> talukaRepository;

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
            Country country = new Country();
            country.setCapital("Z0f3lLtUQas15u5IOyVc3HFsqwyeet14");
            country.setCapitalLatitude(6);
            country.setCapitalLongitude(4);
            country.setCountryCode1("Dkt");
            country.setCountryCode2("wjn");
            country.setCountryFlag("wGwsQVPn4t1KmyZjevgwlLSMbLvsbjAziq0o0qjKIBWZNXrctX");
            country.setCountryName("LPYA4mkgKM5ASTdeh4F9qqzlylrzGzM36fiVGpK8EYHEt20PM7");
            country.setCurrencyCode("NA4");
            country.setCurrencyName("5lRZsJxonEhIkShLMASCWm5xj4XH9Zd2ozmDs7tRheCli69ZKd");
            country.setCurrencySymbol("nLKnReYOkl1Y4Ntcrjx2BjPvBXj0lVvH");
            country.setIsoNumeric(0);
            Country CountryTest = countryRepository.save(country);
            map.put("CountryPrimaryKey", country._getPrimarykey());
            District district = new District();
            district.setCode2("lkHKzYoQdkTfyHiQzHE084mLST2tFrwQ");
            Region region = new Region();
            State state = new State();
            state.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            state.setStateCapital("z1pmx01djcQHEyFfOp7MTAAfbV1VfU4hYQlzHdP2NYANcErKcI");
            state.setStateCapitalLatitude(7);
            state.setStateCapitalLongitude(5);
            state.setStateCode(0);
            state.setStateCodeChar2("ikIdIVjhfLu5CmthyRvQDiYOqwGah6iC");
            state.setStateCodeChar3("DLQOCL5rfhh6J7hQJHScQ6tgRBj4CPzY");
            state.setStateDescription("LE7Gi1XFwu1Aeceb71rhYqj22IyriNh9uWTWuUytZBTN3nYIHF");
            state.setStateFlag("ueNWbrwnjaDNIlrTeBwDW1UACgRLNX4huxfxUEmVkMjE9Uudks");
            state.setStateName("CgRDMNMrmOByyjIvQZDzaBnSquECr7vYIwyomFAtkgBfaXsk7s");
            State StateTest = stateRepository.save(state);
            map.put("StatePrimaryKey", state._getPrimarykey());
            region.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            region.setRegionCode1(2);
            region.setRegionCodeChar2("kFmkDZ6KFF8zMjKl02slG3iPYPSGRDDv");
            region.setRegionDescription("6isruPQMg7cXJSv874RtJxQ0DmjqfxHMwHcy8DfuenwNjXghL0");
            region.setRegionFlag("Gipe9L3h7XXQabiezdsXvEAIQPqSYZHxA9m09Z5OcwJ6QIhlT5");
            region.setRegionLatitude(7);
            region.setRegionLongitude(8);
            region.setRegionName("9be9J8zURzXT9EQpKZ6ScZjuH3RKqJPEhHAxJXaQpFbHe8Tvc6");
            region.setStateId((java.lang.String) StateTest._getPrimarykey()); /* ******Adding refrenced table data */
            Region RegionTest = regionRepository.save(region);
            map.put("RegionPrimaryKey", region._getPrimarykey());
            district.setCode2("wgBnPhXeVh6lcOKlonXFsp7c4YltxbzJ");
            district.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            district.setDistrictDescription("ukcYPTQa68zPlOYYjqSodoKvEpdHPvQyoj9w1QrVbQoNJlyiJk");
            district.setDistrictFlag("areWY939XcQDwc0MbSMhX2V5lPsPxBuiBzF5C7DIsXuLe2goEy");
            district.setDistrictLatitude(10);
            district.setDistrictLongitude(10);
            district.setName("UcvSjgnVEaY4hJoT8dfvBC0FS7E0X3tUZ4VsnloDYJCQnUMlFX");
            district.setRegionId((java.lang.String) RegionTest._getPrimarykey()); /* ******Adding refrenced table data */
            district.setStateId((java.lang.String) StateTest._getPrimarykey()); /* ******Adding refrenced table data */
            District DistrictTest = districtRepository.save(district);
            map.put("DistrictPrimaryKey", district._getPrimarykey());
            Taluka taluka = new Taluka();
            taluka.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            taluka.setDistrictId((java.lang.String) DistrictTest._getPrimarykey()); /* ******Adding refrenced table data */
            taluka.setRegionId((java.lang.String) RegionTest._getPrimarykey()); /* ******Adding refrenced table data */
            taluka.setStateId((java.lang.String) StateTest._getPrimarykey());
            taluka.setTalukaCode("tt9Tlok6tVm0BKBhZgyxVfsX608AtvOm");
            taluka.setTalukaDescription("Mp4g41Z4zwfCKZ5PTQXBBUQiEJIYWdjrWRGfc94CuylsuPWbGs");
            taluka.setTalukaFlag("XZXSwCfgWUVFehwSEmgJfLwzminZIZE5248v6VtrqXvitIEUOn");
            taluka.setTalukaLatitude(1);
            taluka.setTalukaLongitude(6);
            taluka.setTalukaName("hg0QnwXp7RT4LbvjOmeM2ypXNBAxdqpxmXfv2UVGyWMW5CjlGk");
            taluka.setEntityAudit(1, "xyz", RECORD_TYPE.ADD);
            taluka.setEntityValidator(entityValidator);
            taluka.isValid();
            talukaRepository.save(taluka);
            map.put("TalukaPrimaryKey", taluka._getPrimarykey());
        } catch (com.athena.framework.server.exception.biz.SpartanConstraintViolationException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private CountryRepository<Country> countryRepository;

    @Autowired
    private DistrictRepository<District> districtRepository;

    @Autowired
    private RegionRepository<Region> regionRepository;

    @Autowired
    private StateRepository<State> stateRepository;

    @Test
    public void test2Update() {
        try {
            org.junit.Assert.assertNotNull(map.get("TalukaPrimaryKey"));
            Taluka taluka = talukaRepository.findById((java.lang.String) map.get("TalukaPrimaryKey"));
            taluka.setTalukaCode("QhBELb7lYvNSNz4cGqpNg1v6V75pC2NZ");
            taluka.setTalukaDescription("WyLzTIY3xHUxW57UACy6lBxSYOTKpWh9doYEyW16xA3rsAdWBF");
            taluka.setTalukaFlag("gb52g2DwysnMllJ5og6bQ3e15svkjPtLzeDcBOEHkXN3esYKnN");
            taluka.setTalukaLatitude(8);
            taluka.setTalukaLongitude(10);
            taluka.setTalukaName("wkcJ4avOcVHZK3p3UIKxF5NdGtGTKKbg3AQKMyq7D1r8sSjHbJ");
            taluka.setVersionId(1);
            taluka.setEntityAudit(1, "xyz", RECORD_TYPE.UPDATE);
            talukaRepository.update(taluka);
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBycountryId() {
        try {
            java.util.List<Taluka> listofcountryId = talukaRepository.findByCountryId((java.lang.String) map.get("CountryPrimaryKey"));
            if (listofcountryId.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBydistrictId() {
        try {
            java.util.List<Taluka> listofdistrictId = talukaRepository.findByDistrictId((java.lang.String) map.get("DistrictPrimaryKey"));
            if (listofdistrictId.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findByregionId() {
        try {
            java.util.List<Taluka> listofregionId = talukaRepository.findByRegionId((java.lang.String) map.get("RegionPrimaryKey"));
            if (listofregionId.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBystateId() {
        try {
            java.util.List<Taluka> listofstateId = talukaRepository.findByStateId((java.lang.String) map.get("StatePrimaryKey"));
            if (listofstateId.size() == 0) {
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
            org.junit.Assert.assertNotNull(map.get("TalukaPrimaryKey"));
            talukaRepository.findById((java.lang.String) map.get("TalukaPrimaryKey"));
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test4Delete() {
        try {
            org.junit.Assert.assertNotNull(map.get("TalukaPrimaryKey"));
            talukaRepository.delete((java.lang.String) map.get("TalukaPrimaryKey")); /* Deleting refrenced data */
            districtRepository.delete((java.lang.String) map.get("DistrictPrimaryKey")); /* Deleting refrenced data */
            regionRepository.delete((java.lang.String) map.get("RegionPrimaryKey")); /* Deleting refrenced data */
            stateRepository.delete((java.lang.String) map.get("StatePrimaryKey")); /* Deleting refrenced data */
            countryRepository.delete((java.lang.String) map.get("CountryPrimaryKey"));
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
