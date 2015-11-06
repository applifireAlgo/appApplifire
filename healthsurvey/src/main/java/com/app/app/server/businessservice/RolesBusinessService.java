package com.app.app.server.businessservice;
import com.app.app.server.repository.RolesRepository;
import com.app.app.shared.authorization.Roles;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class RolesBusinessService {

    @Autowired
    private RolesRepository rolesRepository;

    public void update(Roles entity) throws SpartanPersistenceException {
        try {
            if (entity.isHardDelete()) {
                rolesRepository.delete(entity.getRoleId());
            } else {
                rolesRepository.deleteRoleMenuBridge(entity.getDeletedRoleMenuBridgeList());
                rolesRepository.update(entity);
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in entity creation", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }

    public void update(List<Roles> entity) throws SpartanPersistenceException {
        try {
            for (Roles _roles : entity) {
                if (_roles.isHardDelete()) {
                    rolesRepository.delete(_roles.getRoleId());
                } else {
                    rolesRepository.deleteRoleMenuBridge(_roles.getDeletedRoleMenuBridgeList());
                    rolesRepository.update(_roles);
                }
            }
        } catch (javax.persistence.PersistenceException e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error in updating Entity", e);
        } catch (Exception e) {
            throw new com.athena.framework.server.exception.repository.SpartanPersistenceException("Error while updating entity", e);
        }
    }
}
