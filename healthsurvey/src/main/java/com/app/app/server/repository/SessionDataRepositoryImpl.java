package com.app.app.server.repository;
import com.app.app.shared.authentication.SessionData;
import com.athena.server.repository.SearchInterfaceImpl;
import org.springframework.stereotype.Repository;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import com.athena.annotation.Complexity;
import com.athena.annotation.SourceCodeAuthorClass;
import com.athena.config.server.helper.ResourceFactoryManagerHelper;
import org.springframework.beans.factory.annotation.Autowired;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import com.spartan.shield.server.authentication.interfaces.SessionDataInterface;
import java.lang.Override;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
@SourceCodeAuthorClass(createdBy = "john.doe", updatedBy = "", versionNumber = "1", comments = "Repository for SessionData Transaction table", complexity = Complexity.MEDIUM)
public class SessionDataRepositoryImpl extends SearchInterfaceImpl implements SessionDataRepository<SessionData> {

    @Autowired
    private ResourceFactoryManagerHelper emfResource;

    @Transactional
    @Override
    public SessionDataInterface saveSessionData(String userId, String customerId, int dataType, Integer numberValue, String stringValue, String jsonValue, Boolean booleanValue, Timestamp dateTimeValue, String appSessionId, String sessionKey) throws SpartanPersistenceException {
        SessionData sessionData = new SessionData();
        sessionData.setUserId(userId);
        sessionData.setCustomerId(customerId);
        sessionData.setDataType(dataType);
        sessionData.setNumberValue(numberValue);
        sessionData.setStringValue(stringValue);
        sessionData.setJsonValue(jsonValue);
        sessionData.setBooleanValue(booleanValue);
        sessionData.setDateTimeValue(dateTimeValue);
        sessionData.setAppSessionId(appSessionId);
        sessionData.setSessionKey(sessionKey);
        sessionData.setVersionId(1);
        sessionData.setSystemInformation(1);
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            emanager.persist(sessionData);
            return (SessionDataInterface) sessionData;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        }
    }

    @Transactional
    @Override
    public void update(SessionDataInterface entity) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            emanager.merge(entity);
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        }
    }

    @Transactional
    @Override
    public void delete(String id) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            com.app.app.shared.authentication.SessionData s = emanager.find(com.app.app.shared.authentication.SessionData.class, id);
            emanager.remove(s);
        } catch (javax.persistence.PersistenceException e) {
            throw new SpartanPersistenceException("Error in deleting entity", e);
        }
    }

    @Transactional
    @Override
    public List<SessionDataInterface> findAll() throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            java.util.List<SessionDataInterface> query = emanager.createQuery("select u from SessionData u where u.systemInfo.activeStatus=1").getResultList();
            return query;
        } catch (javax.persistence.PersistenceException e) {
            throw new SpartanPersistenceException("Error in retrieving entity", e);
        }
    }

    @Transactional
    @Override
    public List<SessionDataInterface> findByAppSessionId(String appSessionId) throws SpartanPersistenceException, Exception {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("SessionData.findByAppSessionId");
            query.setParameter("appSessionId", appSessionId);
            java.util.List<SessionDataInterface> listOfSessionData = query.getResultList();
            return listOfSessionData;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Transactional
    @Override
    public SessionDataInterface findBySessionKey(String appSessionId, String sessionKey) throws SpartanPersistenceException, Exception {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("findBySessionKey");
            query.setParameter("sessionKey", sessionKey);
            query.setParameter("appSessionId", appSessionId);
            try {
                SessionData sessionData = (SessionData) query.getSingleResult();
                return (SessionDataInterface) sessionData;
            } catch (Exception e) {
                return null;
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Transactional
    @Override
    public void deleteAll(String appSessionId) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("deleteAllSessionData");
            query.setParameter("appSessionId", appSessionId);
            query.executeUpdate();
        } catch (javax.persistence.PersistenceException e) {
            throw new SpartanPersistenceException("Error in deleting entity", e);
        }
    }
}
