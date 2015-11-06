package com.app.app.server.service;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import com.app.app.config.WebConfigExtended;
import org.springframework.test.context.ContextConfiguration;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.TestExecutionListeners;
import com.app.app.server.repository.CoreContactsRepository;
import com.app.app.shared.contacts.CoreContacts;
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
import com.app.app.shared.contacts.Gender;
import com.app.app.server.repository.GenderRepository;
import com.app.app.shared.location.Language;
import com.app.app.server.repository.LanguageRepository;
import com.app.app.shared.location.Timezone;
import com.app.app.server.repository.TimezoneRepository;
import com.app.app.shared.contacts.Title;
import com.app.app.server.repository.TitleRepository;
import com.app.app.shared.contacts.CommunicationData;
import com.app.app.shared.contacts.CommunicationGroup;
import com.app.app.server.repository.CommunicationGroupRepository;
import com.app.app.shared.contacts.CommunicationType;
import com.app.app.server.repository.CommunicationTypeRepository;
import com.app.app.shared.location.Address;
import com.app.app.server.repository.AddressRepository;
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
public class CoreContactsTestCase {

    @Autowired
    private CoreContactsRepository<CoreContacts> corecontactsRepository;

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
            Gender gender = new Gender();
            gender.setGender("3vK71bTretNzaP5gMoWio7SSy08vKFQsRhrBxxuRXqQ1isYppT");
            Gender GenderTest = genderRepository.save(gender);
            map.put("GenderPrimaryKey", gender._getPrimarykey());
            Language language = new Language();
            language.setAlpha2("Xn");
            language.setAlpha3("RyH");
            language.setAlpha4("zd7S");
            language.setAlpha4parentid(7);
            language.setLanguage("yeVVKR33EPe1B2BhKZLfoPDRA1u5bJlk7VwWoeYQHESyQBc344");
            language.setLanguageDescription("KNiEwRll4wGvJBnoB8cTGGiIORgElAwVN4UyHJAM5rhB99SGZk");
            language.setLanguageIcon("9MEdONi90becG5CkQTbBZl7ZT6h2Kjluu6U5gxaqS7Guss7PGz");
            language.setLanguageType("xKRWOSsMuHf27fTzUzWovVRNEQah0LhX");
            Language LanguageTest = languageRepository.save(language);
            map.put("LanguagePrimaryKey", language._getPrimarykey());
            Timezone timezone = new Timezone();
            timezone.setCities("91M8ZuFesm2lqb3GtO4WcWHTzk3MsQZp3mCRFu53bqv3PFdndL");
            timezone.setCountry("UmxsZMnEM6NnKXnLtymajKfOwwPriZ89z6l7OigpE829qUXFxc");
            timezone.setGmtLabel("UGWwcbr34KE8K8rKpR2kgBgFMIhsdrhGknslw4u16SCwNBLHSU");
            timezone.setTimeZoneLabel("narri18C2nSWUQjXjz3Uoscgq7xr8G8pv2fPin1lEZwt4pGTsX");
            timezone.setUtcdifference(0);
            Timezone TimezoneTest = timezoneRepository.save(timezone);
            map.put("TimezonePrimaryKey", timezone._getPrimarykey());
            Title title = new Title();
            title.setTitles("7Y8JH8WOvVUiAy294Alq2erhmQ1y64xXmG6PEHdHawRrYDwDCF");
            Title TitleTest = titleRepository.save(title);
            map.put("TitlePrimaryKey", title._getPrimarykey());
            CoreContacts corecontacts = new CoreContacts();
            corecontacts.setAge(16);
            corecontacts.setApproximateDOB(new java.sql.Date(123456789));
            corecontacts.setDateofbirth(new java.sql.Date(123456789));
            corecontacts.setEmailId("vDYY6uuSN9DuRNHmI7YtAAxgVF2LIE8h4Z2Yv0XFvXeDjdwbg6");
            corecontacts.setFirstName("6EIKtYfNipOp0yOgPWwKiNQSYq3F6zsxh1x33u12yyKg6g0xfO");
            corecontacts.setGenderId((java.lang.String) GenderTest._getPrimarykey()); /* ******Adding refrenced table data */
            corecontacts.setLastName("aWlW2DFKwdhdKlidMZfv1zoDeD6djOI6ATXGJVdwrz0Ea4u9i1");
            corecontacts.setMiddleName("vcKX3eEKAOGJrIsQFDjaI3zxSpW5AWMdS7xnaBzxCw1cnXrGjs");
            corecontacts.setNativeFirstName("sQ189YRdDAUKTPb3eP24OrOOgOVs5R0rbhwdknPpIOUYZQCxjC");
            corecontacts.setNativeLanguageCode((java.lang.String) LanguageTest._getPrimarykey()); /* ******Adding refrenced table data */
            corecontacts.setNativeLastName("rMH0WdIcHGJkHQ40ZZvKk71VeUYmqOjlN1fqxji0XPHJv7Woot");
            corecontacts.setNativeMiddleName("esh2oiItcjdaQn7g6PdlHphZoUj1wDvQPk2hF9Bhv4al5R2tKE");
            corecontacts.setNativeTitle("PQIoxIcYJtZriMbxWRX2Vs3xwjFXP0cYja7l5dKCgZFj63ss0I");
            corecontacts.setPhoneNumber("ZPuThT5D5pgvIt8PTKRS");
            corecontacts.setTimeZone((java.lang.String) TimezoneTest._getPrimarykey()); /* ******Adding refrenced table data */
            corecontacts.setTitleId((java.lang.String) TitleTest._getPrimarykey()); /* ******Adding refrenced table data */
            java.util.List<CommunicationData> listOfCommunicationData = new java.util.ArrayList<CommunicationData>();
            CommunicationData communicationdata = new CommunicationData();
            communicationdata.setCommData("A8S");
            CommunicationGroup communicationgroup = new CommunicationGroup();
            communicationgroup.setCommGroupDescription("SEYggQ3JiZXt5G2A8dotZ63UrgXzYfpQ2oFOjBGJB649hxp8N9");
            communicationgroup.setCommGroupName("MCrpL1KUsYz35pgB1mkWcoLahU7GKdnAOn7IaQ3fMFui5dx6Nu");
            CommunicationGroup CommunicationGroupTest = communicationgroupRepository.save(communicationgroup);
            map.put("CommunicationGroupPrimaryKey", communicationgroup._getPrimarykey());
            CommunicationType communicationtype = new CommunicationType();
            communicationtype.setCommGroupId((java.lang.String) CommunicationGroupTest._getPrimarykey()); /* ******Adding refrenced table data */
            communicationtype.setCommTypeDescription("K9GAQ4oR6eiWQtmwSewrndYqmkkWhUflECfDxs0ICXZ7znYB1D");
            communicationtype.setCommTypeName("gqkFNRqLzh9zeKHDJ2gdgGvzAGbtf7ZFOCdIFOAZ6Q7os472Oj");
            CommunicationType CommunicationTypeTest = communicationtypeRepository.save(communicationtype);
            map.put("CommunicationTypePrimaryKey", communicationtype._getPrimarykey());
            communicationdata.setCommData("lfW");
            communicationdata.setCommGroupId((java.lang.String) CommunicationGroupTest._getPrimarykey()); /* ******Adding refrenced table data */
            communicationdata.setCommType((java.lang.String) CommunicationTypeTest._getPrimarykey()); /* ******Adding refrenced table data */
            listOfCommunicationData.add(communicationdata);
            corecontacts.addAllCommunicationData(listOfCommunicationData);
            java.util.List<Address> listOfAddress = new java.util.ArrayList<Address>();
            Address address = new Address();
            address.setAddress1("OeiOkUz96MGyLJerAgKrf2b7VSssnnr0qeLwGmM0dmNyYoLxew");
            address.setAddress2("TKdKvDHChQzkeK6iaFwtqu4Q8zVW2dMdj1tLaQGvN5OA9xJVdQ");
            address.setAddress3("H9WDaJ7WHiXFYqIuldrzg3uHYHnn01iPRRE2zgImrC00Bi9tkF");
            address.setAddressLabel("ECcnz5i73zF");
            AddressType addresstype = new AddressType();
            addresstype.setAddressType("6iqulGNXj3cVYpSOD8BX0PhjApwp8HE1w7aXs3YfDRgLf8yMh4");
            addresstype.setAddressTypeDesc("jGmKMdIDCbEcYB7OsltWv33tPigmwLVEOY0f4cZBcbrZYY13oR");
            addresstype.setAddressTypeIcon("oJyc4wenBnPWPX9DA3jWX0B8Zgnxw0JT1XzTNPiO4JzMeOJoSm");
            AddressType AddressTypeTest = addresstypeRepository.save(addresstype);
            map.put("AddressTypePrimaryKey", addresstype._getPrimarykey());
            City city = new City();
            city.setCityCode(0);
            city.setCityCodeChar2("f6PqneBeXqIjatvusvWcShorPuTqxZXa");
            city.setCityDescription("0oL9lv5TWUjkyj4CH3f4jSMRplxTdS92DGoBfEgBpImzITS0dX");
            city.setCityFlag("XCS28yOTYD4jDg0ivccsVTcqXMb9KwG2FSGD6KyjE3auYmUQMk");
            city.setCityLatitude(0);
            city.setCityLongitude(9);
            city.setCityName("crqzalvLQp9M9rMRqjVv1enUs0EeTh23UgFTVLriO2JDYCGOTQ");
            Country country = new Country();
            country.setCapital("Db5oR9TqlEG3aGaY4irquch5Lg71Q822");
            country.setCapitalLatitude(11);
            country.setCapitalLongitude(10);
            country.setCountryCode1("wXx");
            country.setCountryCode2("T1M");
            country.setCountryFlag("KnaqFv3k1OEyxM1DHkrwbamYc7YflSkQtt5WvbGUlQOcMGocRM");
            country.setCountryName("EaziwpWDyaGNKo0ppsGVLSDq5tcsNrP4AIkcztdJEcYJJzjcvb");
            country.setCurrencyCode("7uT");
            country.setCurrencyName("k8QsZTJQzXOm0VcBb4uf6yHzRR6LKqUEgrxjUSUX3tBSaRWZZ3");
            country.setCurrencySymbol("R8d7gfr9s9Gvr7ffazkqqu8PVfKFi9a3");
            country.setIsoNumeric(9);
            Country CountryTest = countryRepository.save(country);
            map.put("CountryPrimaryKey", country._getPrimarykey());
            State state = new State();
            state.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            state.setStateCapital("FAoUjYvLX0LV4CNumytNpMdpFDOT4QD4G0asrGM9tZauLpUYUT");
            state.setStateCapitalLatitude(1);
            state.setStateCapitalLongitude(6);
            state.setStateCode(2);
            state.setStateCodeChar2("nhtFZ02jT2fBYV6n56bMY7VzhEYUEPig");
            state.setStateCodeChar3("VyIGIHqdHE2uklsKYv02X3SbsZruLcI2");
            state.setStateDescription("1ZBoHzcKuVTFCwU45INuShDVrpTCC1Car5m5pExeTs48Xxg0qK");
            state.setStateFlag("AGLOyH6o2sHp2DN0zCVoceUKJ9ieKQB1p5LVgoWligVpoM5yZm");
            state.setStateName("EB3tOXeMSfjZsqLPWwuC7kUjLFGewk2PkgtgthqLpz6XeOq70V");
            State StateTest = stateRepository.save(state);
            map.put("StatePrimaryKey", state._getPrimarykey());
            city.setCityCode(0);
            city.setCityCodeChar2("3jJ5BnwDVi4bFQswsiV2JLQcYdSnFfeM");
            city.setCityDescription("WmMD497pD9fJbZr5C2Ifny87JY3rargOnVGstcci360If8X2xp");
            city.setCityFlag("KR4Hn4E7ZWQVZtf1N3qzsv9pXk2yFj9kVyJjzbnuapnccZYaVX");
            city.setCityLatitude(11);
            city.setCityLongitude(5);
            city.setCityName("mOCwV84QOKm1YfLiAyBndNo19yPtO2cXEYtulfhIwwLwCMWZkg");
            city.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            city.setStateId((java.lang.String) StateTest._getPrimarykey()); /* ******Adding refrenced table data */
            City CityTest = cityRepository.save(city);
            map.put("CityPrimaryKey", city._getPrimarykey());
            address.setAddress1("NMd8bIZSYRw4tRQ0AzKl1DrpEJgVLZBuuWTHhZSl7rojPpxfMv");
            address.setAddress2("5Dz5Ej5cwMCJdjwW2lg1c4MTNhvfJ6XaZfGplyDHXi6Q90Dvax");
            address.setAddress3("19fD2LwOQtSgmnTGc5DeYhdEmmmbIlfJSVTMKp3f0Hh0grdhjL");
            address.setAddressLabel("lUzKoVs50Ul");
            address.setAddressTypeId((java.lang.String) AddressTypeTest._getPrimarykey()); /* ******Adding refrenced table data */
            address.setCityId((java.lang.String) CityTest._getPrimarykey()); /* ******Adding refrenced table data */
            address.setCountryId((java.lang.String) CountryTest._getPrimarykey()); /* ******Adding refrenced table data */
            address.setLatitude("UazzAMc7HwEVMrSwN6XpjtWT4dbW3XJ4VAczyvj4lTT702yKjq");
            address.setLongitude("6tVfo2D3niU5YnOLM8MaCl0ABcqkGaanrdntcWiM6qzslCXj4g");
            address.setStateId((java.lang.String) StateTest._getPrimarykey());
            address.setZipcode("nTSup6");
            listOfAddress.add(address);
            corecontacts.addAllAddress(listOfAddress);
            corecontacts.setEntityAudit(1, "xyz", RECORD_TYPE.ADD);
            corecontacts.setEntityValidator(entityValidator);
            corecontacts.isValid();
            corecontactsRepository.save(corecontacts);
            map.put("CoreContactsPrimaryKey", corecontacts._getPrimarykey());
        } catch (com.athena.framework.server.exception.biz.SpartanConstraintViolationException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private GenderRepository<Gender> genderRepository;

    @Autowired
    private LanguageRepository<Language> languageRepository;

    @Autowired
    private TimezoneRepository<Timezone> timezoneRepository;

    @Autowired
    private TitleRepository<Title> titleRepository;

    @Autowired
    private CommunicationGroupRepository<CommunicationGroup> communicationgroupRepository;

    @Autowired
    private CommunicationTypeRepository<CommunicationType> communicationtypeRepository;

    @Autowired
    private AddressRepository<Address> addressRepository;

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
            org.junit.Assert.assertNotNull(map.get("CoreContactsPrimaryKey"));
            CoreContacts corecontacts = corecontactsRepository.findById((java.lang.String) map.get("CoreContactsPrimaryKey"));
            corecontacts.setAge(99);
            corecontacts.setApproximateDOB(new java.sql.Date(123456789));
            corecontacts.setDateofbirth(new java.sql.Date(123456789));
            corecontacts.setEmailId("Waezww9dE8NWxZE1vSOShAdNC5UnBcpSbyDTMkeww39jVGVXK4");
            corecontacts.setFirstName("1O1mh8qHJ6BTJ58d5HFqMbbm26zEa6yzH0A8rjMecrACv0F98i");
            corecontacts.setLastName("VwwIrtaU4zSaMbVyC8qTsLxsKUOLqqMyzxQfzoZFJoVq7rn4Y3");
            corecontacts.setMiddleName("7PGOE2Mpx5Pgw2SdTZzq4hpIEvW3Vjt4k6FdH5EWQYlMAp4bIa");
            corecontacts.setNativeFirstName("CCN8n005r5jrSe83xy3dCZaYpbw5Wyl5KUqEdjvkB4lPs54NII");
            corecontacts.setNativeLastName("JAocq0xNvdpo9Tv8SSIPSh24E8Wbwd4YpIryBgWF9jsANffHpc");
            corecontacts.setNativeMiddleName("n2wjOeSCxZLQne93TidMz3s5ada3hsdqJM7lTBO2FYYVOVnRPf");
            corecontacts.setNativeTitle("mPEDBbmvFjfl3eFGaN4wcpDSYRTr0o2btuAc0xheimGMdFrmyg");
            corecontacts.setPhoneNumber("ZICNaF6mGM2sjK8MsQJd");
            corecontacts.setVersionId(1);
            corecontacts.setEntityAudit(1, "xyz", RECORD_TYPE.UPDATE);
            corecontactsRepository.update(corecontacts);
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3FindById() {
        try {
            org.junit.Assert.assertNotNull(map.get("CoreContactsPrimaryKey"));
            corecontactsRepository.findById((java.lang.String) map.get("CoreContactsPrimaryKey"));
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBygenderId() {
        try {
            java.util.List<CoreContacts> listofgenderId = corecontactsRepository.findByGenderId((java.lang.String) map.get("GenderPrimaryKey"));
            if (listofgenderId.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBynativeLanguageCode() {
        try {
            java.util.List<CoreContacts> listofnativeLanguageCode = corecontactsRepository.findByNativeLanguageCode((java.lang.String) map.get("LanguagePrimaryKey"));
            if (listofnativeLanguageCode.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBytimeZone() {
        try {
            java.util.List<CoreContacts> listoftimeZone = corecontactsRepository.findByTimeZone((java.lang.String) map.get("TimezonePrimaryKey"));
            if (listoftimeZone.size() == 0) {
                org.junit.Assert.fail("Query did not return any records.");
            }
        } catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
            org.junit.Assert.fail(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3findBytitleId() {
        try {
            java.util.List<CoreContacts> listoftitleId = corecontactsRepository.findByTitleId((java.lang.String) map.get("TitlePrimaryKey"));
            if (listoftitleId.size() == 0) {
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
            org.junit.Assert.assertNotNull(map.get("CoreContactsPrimaryKey"));
            corecontactsRepository.delete((java.lang.String) map.get("CoreContactsPrimaryKey")); /* Deleting refrenced data */
            cityRepository.delete((java.lang.String) map.get("CityPrimaryKey")); /* Deleting refrenced data */
            stateRepository.delete((java.lang.String) map.get("StatePrimaryKey")); /* Deleting refrenced data */
            countryRepository.delete((java.lang.String) map.get("CountryPrimaryKey")); /* Deleting refrenced data */
            addresstypeRepository.delete((java.lang.String) map.get("AddressTypePrimaryKey")); /* Deleting refrenced data */
            communicationtypeRepository.delete((java.lang.String) map.get("CommunicationTypePrimaryKey")); /* Deleting refrenced data */
            communicationgroupRepository.delete((java.lang.String) map.get("CommunicationGroupPrimaryKey")); /* Deleting refrenced data */
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
