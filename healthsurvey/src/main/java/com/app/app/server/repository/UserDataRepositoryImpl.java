package com.app.app.server.repository;
import com.athena.config.server.helper.ResourceFactoryManagerHelper;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import com.athena.server.repository.SearchInterfaceImpl;
import com.spartan.shield.server.authentication.interfaces.UserAuthentication;
import com.spartan.shield.server.authentication.interfaces.UserDataInterface;
import com.spartan.shield.server.authentication.interfaces.UserDataRepositoryInterface;
import java.lang.Override;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserDataRepositoryImpl extends SearchInterfaceImpl implements UserDataRepositoryInterface {

    @Autowired
    private ResourceFactoryManagerHelper emfResource;

    @Transactional
    @Override
    public void save(UserAuthentication userAuthentication, String password) throws SpartanPersistenceException, Exception {
        try {
            com.app.app.shared.authentication.UserData entity = new com.app.app.shared.authentication.UserData();
            entity.setPassword(password);
            entity.setUser(userAuthentication.getUser());
            entity.setSystemInformation(com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface.RECORD_TYPE.ADD);
            javax.persistence.EntityManager emanager = emfResource.getResource();
            emanager.persist(entity);
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        }
    }

    @Override
    @Transactional
    public void update(UserDataInterface userData) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createQuery("update UserData u set u.password=:password, u.oneTimePassword=:oneTimePassword, u.oneTimePasswordExpiry=:oneTimePasswordExpiry, u.oneTimePasswordGenDate=:oneTimePasswordGenDate, u.last5Passwords=:last5Passwords where u.userDataId=:userDataId");
            query.setParameter("password", userData.getPassword());
            query.setParameter("oneTimePassword", userData.getOneTimePassword());
            query.setParameter("oneTimePasswordExpiry", userData.getOneTimePasswordExpiry());
            query.setParameter("oneTimePasswordGenDate", userData.getOneTimePasswordGenDate());
            query.setParameter("last5Passwords", userData.getLast5Passwords());
            query.setParameter("userDataId", userData.getUserDataId());
            int updateVal = query.executeUpdate();
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        }
    }

    @Override
    @Transactional
    public UserDataInterface findById(String userDataId) throws SpartanPersistenceException, Exception {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("UserData.findById");
            query.setParameter("userDataId", userDataId);
            return (UserDataInterface) query.getSingleResult();
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Override
    @Transactional
    public UserDataInterface findByUserId(String userId) throws SpartanPersistenceException, Exception {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("UserData.findByUserId");
            query.setParameter("userId", userId);
            return (UserDataInterface) query.getSingleResult();
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }
}
