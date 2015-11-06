package com.app.app.server.repository;
import com.athena.server.repository.SearchInterface;
import com.athena.annotation.Complexity;
import com.athena.annotation.SourceCodeAuthorClass;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import java.util.List;
import com.athena.framework.server.exception.biz.SpartanConstraintViolationException;

@SourceCodeAuthorClass(createdBy = "john.doe", updatedBy = "john.doe", versionNumber = "4", comments = "Repository for SurveyResult Transaction table", complexity = Complexity.MEDIUM)
public interface SurveyResultRepository<T> extends SearchInterface {

    public List<T> findAll() throws SpartanPersistenceException;

    public T save(T entity) throws SpartanPersistenceException;

    public List<T> save(List<T> entity) throws SpartanPersistenceException;

    public void delete(String id) throws SpartanPersistenceException;

    public void update(T entity) throws SpartanConstraintViolationException, SpartanPersistenceException;

    public void update(List<T> entity) throws SpartanPersistenceException;

    public List<T> findBySurveyQuestionId(String surveyQuestionId) throws Exception, SpartanPersistenceException;

    public List<T> findBySurveyAnswerId(String surveyAnswerId) throws Exception, SpartanPersistenceException;

    public List<T> findByContactId(String contactId) throws Exception, SpartanPersistenceException;

    public T findById(String surveyResultId) throws Exception, SpartanPersistenceException;
}
