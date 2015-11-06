package com.app.app.server.repository;
import com.app.app.shared.authentication.LoginSession;
import com.athena.server.repository.SearchInterfaceImpl;
import org.springframework.stereotype.Repository;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import com.athena.annotation.Complexity;
import com.athena.annotation.SourceCodeAuthorClass;
import com.athena.config.server.helper.ResourceFactoryManagerHelper;
import org.springframework.beans.factory.annotation.Autowired;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import com.spartan.shield.server.authentication.interfaces.LoginSessionInterface;
import com.spartan.shield.server.authentication.interfaces.UserAuthentication;
import java.lang.Override;
import java.sql.Timestamp;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
@SourceCodeAuthorClass(createdBy = "john.doe", updatedBy = "", versionNumber = "1", comments = "Repository for LoginSession Transaction table", complexity = Complexity.MEDIUM)
public class LoginSessionRepositoryImpl extends SearchInterfaceImpl implements LoginSessionRepository<LoginSession> {

    @Autowired
    private ResourceFactoryManagerHelper emfResource;

    @Override
    @Transactional
    public void updateUserSession(LoginSessionInterface loginSession, String SessionData) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createQuery("update LoginSession l set l.sessionData=:sessionData where l.appSessionId=:AppSessionId");
            query.setParameter("AppSessionId", loginSession.getAppSessionId());
            query.setParameter("SessionData", SessionData);
            int updateVal = query.executeUpdate();
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in Updating sessions", e);
        }
    }

    @Override
    @Transactional
    public void saveSession(UserAuthentication userAuthentication, String appSessionId, String appServerSessinId, Timestamp loginTime, Timestamp logOutTime, String ClientIPAddress, Long ClientIPAddressInt, int ClientNetworkAddress, String ClientBrowser) throws SpartanPersistenceException {
        com.app.app.shared.authentication.LoginSession loginSession = new com.app.app.shared.authentication.LoginSession();
        loginSession.setAppServerSessionId(appServerSessinId);
        loginSession.setAppSessionId(appSessionId);
        loginSession.setClientBrowser(ClientBrowser);
        loginSession.setClientIPAddress(ClientIPAddress);
        loginSession.setClientIPAddressInt(ClientIPAddressInt);
        loginSession.setClientNetworkAddress(ClientNetworkAddress);
        loginSession.setLoginTime(loginTime);
        loginSession.setLogoutTime(logOutTime);
        loginSession.setUserId(userAuthentication.getUserId());
        loginSession.setSystemInformation(com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface.RECORD_TYPE.ADD);
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            emanager.persist(loginSession);
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        }
    }

    @Override
    @Transactional
    public void updateSession(LoginSessionInterface loginSession) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createQuery("update LoginSession l set l.loginTime=:loginTime, l.logoutTime=:logoutTime where l.appSessionId=:AppSessionId");
            query.setParameter("loginTime", loginSession.getLoginTime());
            query.setParameter("logoutTime", loginSession.getLogoutTime());
            query.setParameter("AppSessionId", loginSession.getAppSessionId());
            int updateVal = query.executeUpdate();
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in updating session Entity", e);
        }
    }

    @Override
    @Transactional
    public LoginSessionInterface findById(String AppSessionId) throws SpartanPersistenceException, Exception {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createQuery("select l from LoginSession l where l.appSessionId=:AppSessionId");
            query.setParameter("AppSessionId", AppSessionId);
            return (LoginSessionInterface) query.getSingleResult();
        } catch (java.lang.Exception e) {
            throw e;
        }
    }

    @Override
    @Transactional
    public void updateLastAccessTime(String userId, String appSessionId, Timestamp timestamp) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createQuery("update LoginSession l set l.lastAccessTime=:lastAccessTime where l.appSessionId=:appSessionId and l.userId=:userId");
            query.setParameter("lastAccessTime", timestamp);
            query.setParameter("userId", userId);
            query.setParameter("appSessionId", appSessionId);
            int updateVal = query.executeUpdate();
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity updation", e);
        }
    }
}
