package com.app.app.server.service;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import com.app.app.config.WebConfigExtended;
import org.springframework.test.context.ContextConfiguration;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.TestExecutionListeners;
import com.app.app.server.repository.AddressRepository;
import com.app.app.shared.location.Address;
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
import com.app.app.shared.location.AddressType;
import com.app.app.server.repository.AddressTypeRepository;
import com.app.app.shared.location.City;
import com.app.app.server.repository.CityRepository;
import com.app.app.shared.location.Country;
import com.app.app.server.repository.CountryRepository;
import com.app.app.shared.location.State;
import com.app.app.server.repository.StateRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = WebConfigExtended.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@TestExecutionListeners({ org.springframework.test.context.support.DependencyInjectionTestExecutionListener.class, org.springframework.test.context.support.DirtiesContextTestExecutionListener.class, org.springframework.test.context.transaction.TransactionalTestExecutionListener.class })
public class AddressTestCase {

    @Autowired
    private AddressRepository<Address> addressRepository;

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
            AddressType addresstype = new AddressType();
            addresstype.setAddressType("J47OTIscWY30YKuPkBlJCWHEpTP22gqoyt3VVgE4nAcCn2p8gC");
            addresstype.setAddressTypeDesc("ZJM4BkmKzxYJvztF4B04yM1K2Z83lhUl4C5NpPUrbEQ7a00G4u");
            addresstype.setAddressTypeIcon("6WnFoqrQeW9zVquWKoYq10L95RGi46vqP1FcOGowp8nnh37hx7");
            AddressType AddressTypeTest = addresstypeRepository.save(addresstype);
            map.put("AddressTypePrimaryKey", addresstype._getPrimarykey());
            City city = new City();
            city.setCityCode(2);
            city.setCityCodeChar2("14xdGQl8rInmuLGS9ZdVv5qljCvjmzvn");
            city.setCityDescription("PqFZNJr853ruLFt1ObAL4rST6qjV4YDjQv1oVu5UIgAsc7XnMW");
            city.setCityFlag("fceC3xNMJL5h5jxmwjTv5pxisxPFwVyhuL9AaSdyXlxIO0tKra");
            city.setCityLatitude(5);
            city.setCityLongitude(9);
            city.setCityName("LY55GQU2Nm4xLcYdXzJuKwY8Z8iwOstbzVlJV13FcaVBsCMiSH");
            Country country = new Country();
            country.setCapital("H3MwJ7s9IRlzNix1aWYuVqds1xFfYSD9");
            country.setCapitalLatitude(4);
            country.setCapitalLongitude(7);
            country.setCountryCode1("k3U");
            country.setCountryCode2("8Lu");
            country.setCountryFlag("uvn7sTJesZrXNrRQAMCxAU09iMDrGN8SqasDVn2VrORUoqmdzI");
            country.setCountryName("BssiknUtScR0VGaQlbE2kqaOYp5uTHEJynWsVbb8dDu5OimNmh");
            country.setCurrencyCode("J5t");
            country.setCurrencyName("vHZImhNhpmmM3hZtSoc0Rvuc1lHSLbeFqfqkLv8Qih9H4bQIXX");
            country.setCurrencySymbol("Rud1wufVjXBNzBOk2GU6Obntyx8xegvi");
            country.setIsoNumeric(3);
            Country CountryTest = countryRepository.save(country);
            map.put("CountryPrimaryKey", country._getPrimarykey());
            State state = new State();
            state.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            state.setStateCapital("l9voukPO64bHkA1OVaRLBJ1KSVlSOfpppRNYSZPWy15rbNoK1H");
            state.setStateCapitalLatitude(0);
            state.setStateCapitalLongitude(1);
            state.setStateCode(0);
            state.setStateCodeChar2("3i8hBYbR1HYLqfwN1TXuy1tCBKoitSXr");
            state.setStateCodeChar3("NI1l8TwPRjYsrWmLo5oeuBamn4iiCFrC");
            state.setStateDescription("PGnomZ14kzOYphz9KtdH01ImBID4AJMhg7mDbdGCKJeLUdqQYT");
            state.setStateFlag("vSEvlhNBoyheisUuDIQTSjPC8dbjHeQomI7JBQ3XEvrWNPeULg");
            state.setStateName("rT7DDZxmMGzJDnrFiL0owp7Wz0UqutwAb309NaXoM05OrLhKCx");
            State StateTest = stateRepository.save(state);
            map.put("StatePrimaryKey", state._getPrimarykey());
            city.setCityCode(0);
            city.setCityCodeChar2("finFKokdflHHqzLgEPf27u4lVU6EyKgv");
            city.setCityDescription("ujXFP9AXP7BKyBYRORl8tmYWyJzLjLuKgvAWNsQpysKJ3vRyAn");
            city.setCityFlag("EHAOaXFSriVC5Ug11Xoq5Zhydb1lj27Z92aoAJh0vccyv4s5Zl");
            city.setCityLatitude(9);
            city.setCityLongitude(2);
            city.setCityName("DNiGs1vqeMAfCHiVMKtV0lS09R0ZE3TPe5tvEPonwAgigSEBde");
            city.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            city.setStateId((java.lang.String) StateTest._getPrimarykey()); /* ******Adding refrenced table data */
            City CityTest = cityRepository.save(city);
            map.put("CityPrimaryKey", city._getPrimarykey());
            Address address = new Address();
            address.setAddress1("63oe3KQwXYQKOO60CULBjUPSBYe3NfPW9yAIRknYohOTJUE3lX");
            address.setAddress2("Ip0ycetoV7TQj75TmrYh4jsKYc595rx6oPqOsfJc1b6xiUEPSh");
            address.setAddress3("cgR5oDef8m1fFPcAOHvcyi03nLHETQV7QYwZzYqJJV3VIZvCiX");
            address.setAddressLabel("9zo9J7cPsKC");
            address.setAddressTypeId((java.lang.String) AddressTypeTest._getPrimarykey()); /* ******Adding refrenced table data */
            address.setCityId((java.lang.String) CityTest._getPrimarykey()); /* ******Adding refrenced table data */
            address.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            address.setLatitude("PeocSuea7e9ibQQtgdpDBrRIOxEPVIQqzSqNAfk57xraEdjAFD");
            address.setLongitude("eD6nMkXM0dADQcsmatDndpThiVb0sU7YS8YZR63GvCXQw1wVRx");
            address.setStateId((java.lang.String) StateTest._getPrimarykey());
            address.setZipcode("J6QuzN");
            address.setEntityAudit(1, "xyz", RECORD_TYPE.ADD);
            address.setEntityValidator(entityValidator);
            address.isValid();
            addressRepository.save(address);
            map.put("AddressPrimaryKey", address._getPrimarykey());
        } catch (com.athena.framework.server.exception.biz.SpartanConstraintViolationException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private AddressTypeRepository<AddressType> addresstypeRepository;

    @Autowired
    private CityRepository<City> cityRepository;

    @Autowired
    private CountryRepository<Country> countryRepository;

    @Autowired
    private StateRepository<State> stateRepository;

    @Test
    public void test2Update() {
        try {
            org.junit.Assert.assertNotNull(map.get("AddressPrimaryKey"));
            Address address = addressRepository.findById((java.lang.String) map.get("AddressPrimaryKey"));
            address.setAddress1("GbjnCnyikbEljyXNLv1WrPpvTUXR9nVDnZVjg5XCmnNlEdE34Z");
            address.setAddress2("VUT2mzy8wiIMbtFL8bJ93EW1nMhvxXulLimwO3MM6N0dwyMm0C");
            address.setAddress3("Kl2SuTIjfmiDFt7KtM5zgjRnpSbOsV5wgOuCSCt1lAIB9Y4W0m");
            address.setAddressLabel("TaTtcLwnW5l");
            address.setLatitude("Uk6sv7gqKYIMjOBs1GtYijcIlg47itWuAQDlGkR69slUcPmkJo");
            address.setLongitude("vNuazeLJG9BGHZ7UDej8notyzB3FcINVehKIXVnmSkd8mB3m6e");
            address.setVersionId(1);
            address.setZipcode("DRjk9W");
            address.setEntityAudit(1, "xyz", RECORD_TYPE.UPDATE);
            addressRepository.update(address);
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3FindById() {
        try {
            org.junit.Assert.assertNotNull(map.get("AddressPrimaryKey"));
            addressRepository.findById((java.lang.String) map.get("AddressPrimaryKey"));
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findByaddressTypeId() {
        try {
            java.util.List<Address> listofaddressTypeId = addressRepository.findByAddressTypeId((java.lang.String) map.get("AddressTypePrimaryKey"));
            if (listofaddressTypeId.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBycityId() {
        try {
            java.util.List<Address> listofcityId = addressRepository.findByCityId((java.lang.String) map.get("CityPrimaryKey"));
            if (listofcityId.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBycountryId() {
        try {
            java.util.List<Address> listofcountryId = addressRepository.findByCountryId((java.lang.String) map.get("CountryPrimaryKey"));
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
    public void test3findBystateId() {
        try {
            java.util.List<Address> listofstateId = addressRepository.findByStateId((java.lang.String) map.get("StatePrimaryKey"));
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
    public void test4Delete() {
        try {
            org.junit.Assert.assertNotNull(map.get("AddressPrimaryKey"));
            addressRepository.delete((java.lang.String) map.get("AddressPrimaryKey")); /* Deleting refrenced data */
            cityRepository.delete((java.lang.String) map.get("CityPrimaryKey")); /* Deleting refrenced data */
            stateRepository.delete((java.lang.String) map.get("StatePrimaryKey")); /* Deleting refrenced data */
            countryRepository.delete((java.lang.String) map.get("CountryPrimaryKey")); /* Deleting refrenced data */
            addresstypeRepository.delete((java.lang.String) map.get("AddressTypePrimaryKey"));
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
