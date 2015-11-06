package com.app.app.server.repository;
import com.app.app.shared.health.SurveyQuestion;
import com.athena.server.repository.SearchInterfaceImpl;
import org.springframework.stereotype.Repository;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import com.athena.annotation.Complexity;
import com.athena.annotation.SourceCodeAuthorClass;
import com.athena.config.server.helper.ResourceFactoryManagerHelper;
import org.springframework.beans.factory.annotation.Autowired;
import com.athena.framework.server.helper.RuntimeLogInfoHelper;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import java.lang.Override;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import com.app.app.shared.health.SurveyAnswer;

@Repository
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
@SourceCodeAuthorClass(createdBy = "john.doe", updatedBy = "john.doe", versionNumber = "2", comments = "Repository for SurveyQuestion Master table Entity", complexity = Complexity.LOW)
public class SurveyQuestionRepositoryImpl extends SearchInterfaceImpl implements SurveyQuestionRepository<SurveyQuestion> {

    @Autowired
    private ResourceFactoryManagerHelper emfResource;

    @Autowired
    private RuntimeLogInfoHelper runtimeLogInfoHelper;

    @Override
    @Transactional
    public List<SurveyQuestion> findAll() throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            java.util.List<com.app.app.shared.health.SurveyQuestion> query = emanager.createQuery("select u from SurveyQuestion u where u.systemInfo.activeStatus=1").getResultList();
            return query;
        } catch (javax.persistence.PersistenceException e) {
            throw new SpartanPersistenceException("Error in retrieving entity", e);
        }
    }

    @Override
    @Transactional
    public SurveyQuestion save(SurveyQuestion entity) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            java.util.List<com.app.app.shared.health.SurveyAnswer> surveyanswer = new java.util.ArrayList<com.app.app.shared.health.SurveyAnswer>();
            for (java.util.Iterator iterator = entity.getSurveyAnswer().iterator(); iterator.hasNext(); ) {
                com.app.app.shared.health.SurveyAnswer childEntity = (com.app.app.shared.health.SurveyAnswer) iterator.next();
                if (childEntity.getPrimaryKey() != null) {
                    com.app.app.shared.health.SurveyAnswer ans = emanager.find(SurveyAnswer.class, childEntity.getPrimaryKey());
                    surveyanswer.add(ans);
                } else {
                    surveyanswer.add(childEntity);
                }
            }
            entity.setSurveyAnswer(surveyanswer);
            emanager.persist(entity);
            return entity;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        }
    }

    @Override
    @Transactional
    public List<SurveyQuestion> save(List<SurveyQuestion> entity) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            for (int i = 0; i < entity.size(); i++) {
                com.app.app.shared.health.SurveyQuestion obj = entity.get(i);
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
            com.app.app.shared.health.SurveyQuestion s = emanager.find(com.app.app.shared.health.SurveyQuestion.class, id);
            emanager.remove(s);
        } catch (javax.persistence.PersistenceException e) {
            throw new SpartanPersistenceException("Error in deleting entity", e);
        }
    }

    @Override
    @Transactional
    public void deleteSurveyAnswer(List<SurveyAnswer> surveyanswer) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            for (com.app.app.shared.health.SurveyAnswer _surveyanswer : surveyanswer) {
                com.app.app.shared.health.SurveyAnswer s = emanager.find(com.app.app.shared.health.SurveyAnswer.class, _surveyanswer.getSurveyAnswerId());
                emanager.remove(s);
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new SpartanPersistenceException("Error in deleting entity", e);
        }
    }

    @Override
    @Transactional
    public void update(SurveyQuestion entity) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            emanager.merge(entity);
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }

    @Override
    @Transactional
    public void update(List<SurveyQuestion> entity) throws SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            for (int i = 0; i < entity.size(); i++) {
                com.app.app.shared.health.SurveyQuestion obj = entity.get(i);
                emanager.merge(obj);
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity updation", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }

    @Transactional
    public List<SurveyQuestion> findBySurveyQuestionGroupId(Integer surveyQuestionGroupId) throws Exception, SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("SurveyQuestion.findBySurveyQuestionGroupId");
            query.setParameter("surveyQuestionGroupId", surveyQuestionGroupId);
            java.util.List<com.app.app.shared.health.SurveyQuestion> listOfSurveyQuestion = query.getResultList();
            return listOfSurveyQuestion;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Transactional
    public SurveyQuestion findById(String surveyQuestionId) throws Exception, SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("SurveyQuestion.findById");
            query.setParameter("surveyQuestionId", surveyQuestionId);
            com.app.app.shared.health.SurveyQuestion listOfSurveyQuestion = (com.app.app.shared.health.SurveyQuestion) query.getSingleResult();
            return listOfSurveyQuestion;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Transactional
    public List<SurveyQuestion> ChdQuestions() throws Exception, SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("ChdQuestions");
            List<SurveyQuestion> listOfSurveyQuestion = query.getResultList();
            return listOfSurveyQuestion;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Transactional
    public List<SurveyQuestion> BehaviourQuestions() throws Exception, SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("BehaviourQuestions");
            List<SurveyQuestion> listOfSurveyQuestion = query.getResultList();
            return listOfSurveyQuestion;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Transactional
    public List<SurveyQuestion> GeneralQuestions() throws Exception, SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("GeneralQuestions");
            List<SurveyQuestion> listOfSurveyQuestion = query.getResultList();
            return listOfSurveyQuestion;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }

    @Transactional
    public List<SurveyQuestion> LifeStyleQuestions() throws Exception, SpartanPersistenceException {
        try {
            javax.persistence.EntityManager emanager = emfResource.getResource();
            javax.persistence.Query query = emanager.createNamedQuery("LifeStyleQuestions");
            List<SurveyQuestion> listOfSurveyQuestion = query.getResultList();
            return listOfSurveyQuestion;
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in executing query", e);
        }
    }
}
