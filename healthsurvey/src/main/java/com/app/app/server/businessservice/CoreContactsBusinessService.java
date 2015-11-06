package com.app.app.server.businessservice;
import com.app.app.server.repository.CoreContactsRepository;
import com.app.app.shared.contacts.CoreContacts;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class CoreContactsBusinessService {

    @Autowired
    private CoreContactsRepository coreContactsRepository;

    public void update(CoreContacts entity) throws SpartanPersistenceException {
        try {
            if (entity.isHardDelete()) {
                coreContactsRepository.delete(entity.getContactId());
            } else {
                coreContactsRepository.deleteCommunicationData(entity.getDeletedCommunicationDataList());
                coreContactsRepository.deleteAddress(entity.getDeletedAddressList());
                coreContactsRepository.update(entity);
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }

    public void update(List<CoreContacts> entity) throws SpartanPersistenceException {
        try {
            for (CoreContacts _corecontacts : entity) {
                if (_corecontacts.isHardDelete()) {
                    coreContactsRepository.delete(_corecontacts.getContactId());
                } else {
                    coreContactsRepository.deleteCommunicationData(_corecontacts.getDeletedCommunicationDataList());
                    coreContactsRepository.deleteAddress(_corecontacts.getDeletedAddressList());
                    coreContactsRepository.update(_corecontacts);
                }
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in updating Entity", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }
}
