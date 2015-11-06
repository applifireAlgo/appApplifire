package com.app.app.server.repository;
import com.athena.server.repository.SearchInterfaceImpl;
import org.springframework.stereotype.Repository;
import com.athena.config.server.helper.ResourceFactoryManagerHelper;
import org.springframework.beans.factory.annotation.Autowired;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import com.spartan.shield.server.authentication.interfaces.UserInterface;
import com.spartan.shield.server.authentication.interfaces.UserRepositoryInterface;
import java.lang.Override;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import com.athena.framework.server.helper.RuntimeLogInfoHelper;
import com.app.app.shared.authentication.User;
import com.app.app.shared.authentication.PassRecovery;

@Repository
public class UserRepositoryImpl extends SearchInterfaceImpl implements UserRepository<User> {

    @Autowired
    private ResourceFactoryManagerHelper emfResource;

    @Transactional
    @Override
    public void update(List<UserInterface> entity) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            for (int i = 0; i < entity.size(); i++) {
                com.spartan.shield.server.authentication.interfaces.UserInterface obj = entity.get(i);
                emanager.merge(obj);
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity updation", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }

    @Override
    @Transactional
    public UserInterface getByUserId(String userId) throws SpartanPersistenceException, Exception {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("User.findById");
            query.setParameter("userId", userId);
            return (com.spartan.shield.server.authentication.interfaces.UserInterface) query.getSingleResult();
        } catch (javax.persistence.PersistenceException e) {
            e.printStackTrace();
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Autowired
    private RuntimeLogInfoHelper runtimeLogInfoHelper;

    @Override
    @Transactional
    public List<User> findAll() throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            java.util.List<com.app.app.shared.authentication.User> query = emanager.createQuery("select u from User u where u.systemInfo.activeStatus=1").getResultList();
            return query;
        } catch (javax.persistence.PersistenceException e) {
            throw new SpartanPersistenceException("Error in retrieving entity", e);
        }
    }

    @Override
    @Transactional
    public User save(User entity) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            emanager.persist(entity);
            return entity;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        }
    }

    @Override
    @Transactional
    public List<User> save(List<User> entity) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            for (int i = 0; i < entity.size(); i++) {
                com.app.app.shared.authentication.User obj = entity.get(i);
                emanager.persist(obj);
            }
            return entity;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity Saving", e);
        }
    }

    @Transactional
    @Override
    public void delete(String id) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            com.app.app.shared.authentication.User s = emanager.find(com.app.app.shared.authentication.User.class, id);
            emanager.remove(s);
        } catch (javax.persistence.PersistenceException e) {
            throw new SpartanPersistenceException("Error in deleting entity", e);
        }
    }

    @Override
    @Transactional
    public void deletePassRecovery(List<PassRecovery> passrecovery) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            for (com.app.app.shared.authentication.PassRecovery _passrecovery : passrecovery) {
                com.app.app.shared.authentication.PassRecovery s = emanager.find(com.app.app.shared.authentication.PassRecovery.class, _passrecovery.getPassRecoveryId());
                emanager.remove(s);
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new SpartanPersistenceException("Error in deleting entity", e);
        }
    }

    @Override
    @Transactional
    public void update(User entity) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            emanager.merge(entity);
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }

    @Transactional
    public List<User> findByUserAccessLevelId(String userAccessLevelId) throws Exception, SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("User.findByUserAccessLevelId");
            query.setParameter("userAccessLevelId", userAccessLevelId);
            java.util.List<com.app.app.shared.authentication.User> listOfUser = query.getResultList();
            return listOfUser;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Transactional
    public List<User> findByUserAccessDomainId(String userAccessDomainId) throws Exception, SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("User.findByUserAccessDomainId");
            query.setParameter("userAccessDomainId", userAccessDomainId);
            java.util.List<com.app.app.shared.authentication.User> listOfUser = query.getResultList();
            return listOfUser;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Transactional
    public User findById(String userId) throws Exception, SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("User.findById");
            query.setParameter("userId", userId);
            com.app.app.shared.authentication.User listOfUser = (com.app.app.shared.authentication.User) query.getSingleResult();
            return listOfUser;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }
}
