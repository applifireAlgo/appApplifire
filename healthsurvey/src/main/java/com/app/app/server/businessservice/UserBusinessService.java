package com.app.app.server.businessservice;
import com.app.app.server.repository.UserRepository;
import com.app.app.shared.authentication.User;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class UserBusinessService {

    @Autowired
    private UserRepository userRepository;

    public void update(User entity) throws SpartanPersistenceException {
        try {
            if (entity.isHardDelete()) {
                userRepository.delete(entity.getUserId());
            } else {
                userRepository.deletePassRecovery(entity.getDeletedPassRecoveryList());
                userRepository.update(entity);
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }

    public void update(List<User> entity) throws SpartanPersistenceException {
        try {
            for (User _user : entity) {
                if (_user.isHardDelete()) {
                    userRepository.delete(_user.getUserId());
                } else {
                    userRepository.deletePassRecovery(_user.getDeletedPassRecoveryList());
                    userRepository.update(_user);
                }
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in updating Entity", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }
}
