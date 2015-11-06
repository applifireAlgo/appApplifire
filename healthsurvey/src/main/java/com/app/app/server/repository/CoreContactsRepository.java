package com.app.app.server.repository;
import com.athena.server.repository.SearchInterface;
import com.athena.annotation.Complexity;
import com.athena.annotation.SourceCodeAuthorClass;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import java.util.List;
import com.app.app.shared.contacts.CommunicationData;
import com.app.app.shared.location.Address;
import com.athena.framework.server.exception.biz.SpartanConstraintViolationException;

@SourceCodeAuthorClass(createdBy = "john.doe", updatedBy = "", versionNumber = "1", comments = "Repository for CoreContacts Transaction table", complexity = Complexity.MEDIUM)
public interface CoreContactsRepository<T> extends SearchInterface {

    public List<T> findAll() throws SpartanPersistenceException;

    public T save(T entity) throws SpartanPersistenceException;

    public List<T> save(List<T> entity) throws SpartanPersistenceException;

    public void delete(String id) throws SpartanPersistenceException;

    public void deleteCommunicationData(List<CommunicationData> communicationdata) throws SpartanPersistenceException;

    public void deleteAddress(List<Address> address) throws SpartanPersistenceException;

    public void update(T entity) throws SpartanConstraintViolationException, SpartanPersistenceException;

    public void update(List<T> entity) throws SpartanPersistenceException;

    public List<T> findByTitleId(String titleId) throws Exception, SpartanPersistenceException;

    public List<T> findByNativeLanguageCode(String nativeLanguageCode) throws Exception, SpartanPersistenceException;

    public List<T> findByGenderId(String genderId) throws Exception, SpartanPersistenceException;

    public List<T> findByTimeZone(String timeZone) throws Exception, SpartanPersistenceException;

    public T findById(String contactId) throws Exception, SpartanPersistenceException;
}
