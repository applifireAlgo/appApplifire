package com.app.app.server.repository;
import com.athena.server.repository.SearchInterface;
import com.athena.annotation.Complexity;
import com.athena.annotation.SourceCodeAuthorClass;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import java.util.List;
import com.app.app.shared.health.SurveyAnswer;
import com.athena.framework.server.exception.biz.SpartanConstraintViolationException;

@SourceCodeAuthorClass(createdBy = "john.doe", updatedBy = "john.doe", versionNumber = "2", comments = "Repository for SurveyQuestion Master table Entity", complexity = Complexity.LOW)
public interface SurveyQuestionRepository<T> extends SearchInterface {

    public List<T> findAll() throws SpartanPersistenceException;

    public T save(T entity) throws SpartanPersistenceException;

    public List<T> save(List<T> entity) throws SpartanPersistenceException;

    public void delete(String id) throws SpartanPersistenceException;

    public void deleteSurveyAnswer(List<SurveyAnswer> surveyanswer) throws SpartanPersistenceException;

    public void update(T entity) throws SpartanConstraintViolationException, SpartanPersistenceException;

    public void update(List<T> entity) throws SpartanPersistenceException;

    public List<T> findBySurveyQuestionGroupId(Integer surveyQuestionGroupId) throws Exception, SpartanPersistenceException;

    public T findById(String surveyQuestionId) throws Exception, SpartanPersistenceException;

    public List<T> ChdQuestions() throws Exception, SpartanPersistenceException;

    public List<T> BehaviourQuestions() throws Exception, SpartanPersistenceException;

    public List<T> GeneralQuestions() throws Exception, SpartanPersistenceException;

    public List<T> LifeStyleQuestions() throws Exception, SpartanPersistenceException;
}
