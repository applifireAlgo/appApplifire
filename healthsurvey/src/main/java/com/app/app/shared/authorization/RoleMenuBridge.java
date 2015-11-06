package com.app.app.shared.authorization;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.persistence.Transient;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Size;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import com.athena.framework.server.helper.EntityValidatorHelper;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Version;
import com.app.app.shared.EntityAudit;
import javax.persistence.Embedded;
import com.app.app.shared.SystemInfo;
import com.athena.framework.server.exception.biz.SpartanConstraintViolationException;
import com.athena.framework.server.exception.biz.SpartanIncorrectDataException;
import java.lang.Override;
import javax.persistence.NamedQueries;

@Table(name = "ast_RoleMenuBridge_TP")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "RoleMenuBridge.findByRoleId", query = "select e from RoleMenuBridge e where e.systemInfo.activeStatus=1 and e.roles.roleId=:roleId"), @javax.persistence.NamedQuery(name = "RoleMenuBridge.findByMenuId", query = "select e from RoleMenuBridge e where e.systemInfo.activeStatus=1 and e.menuId=:menuId"), @javax.persistence.NamedQuery(name = "RoleMenuBridge.findById", query = "select e from RoleMenuBridge e where e.systemInfo.activeStatus=1 and e.roleMenuMapId =:roleMenuMapId") })
public class RoleMenuBridge implements Serializable, CommonEntityInterface, Comparator<RoleMenuBridge> {

    @Column(name = "isRead")
    @JsonProperty("isRead")
    @NotNull
    private Boolean isRead;

    @Column(name = "isWrite")
    @JsonProperty("isWrite")
    @NotNull
    private Boolean isWrite;

    @Column(name = "isExecute")
    @JsonProperty("isExecute")
    @NotNull
    private Boolean isExecute;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "roleMenuMapId")
    @JsonProperty("roleMenuMapId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 3, max = 64)
    private String roleMenuMapId;

    @Column(name = "menuId")
    @JsonProperty("menuId")
    private String menuId;

    @OneToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinColumn(name = "roleId", referencedColumnName = "roleId")
    private Roles roles;

    @Transient
    @JsonIgnore
    private EntityValidatorHelper<Object> entityValidator;

    @Version
    @Column(name = "versionId")
    @JsonProperty("versionId")
    private int versionId;

    @Embedded
    @JsonIgnore
    private EntityAudit entityAudit = new EntityAudit();

    @Embedded
    private SystemInfo systemInfo = new SystemInfo();

    @Transient
    private String primaryDisplay;

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean _isRead) {
        if (_isRead != null) {
            this.isRead = _isRead;
        }
    }

    public Boolean getIsWrite() {
        return isWrite;
    }

    public void setIsWrite(Boolean _isWrite) {
        if (_isWrite != null) {
            this.isWrite = _isWrite;
        }
    }

    public Boolean getIsExecute() {
        return isExecute;
    }

    public void setIsExecute(Boolean _isExecute) {
        if (_isExecute != null) {
            this.isExecute = _isExecute;
        }
    }

    public String getPrimaryKey() {
        return roleMenuMapId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return roleMenuMapId;
    }

    public String getRoleMenuMapId() {
        return roleMenuMapId;
    }

    public void setRoleMenuMapId(String _roleMenuMapId) {
        this.roleMenuMapId = _roleMenuMapId;
    }

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String _menuId) {
        this.menuId = _menuId;
    }

    public int getVersionId() {
        return versionId;
    }

    public void setVersionId(int _versionId) {
        this.versionId = _versionId;
    }

    public void setPrimaryDisplay(String _primaryDisplay) {
        this.primaryDisplay = _primaryDisplay;
    }

    public SystemInfo getSystemInfo() {
        return systemInfo;
    }

    public void setSystemInfo(SystemInfo _systemInfo) {
        this.systemInfo = _systemInfo;
    }

    public Roles getRoles() {
        return roles;
    }

    public void setRoles(Roles _roles) {
        this.roles = _roles;
    }

    @JsonIgnore
    public boolean isHardDelete() {
        if (this.systemInfo == null) {
            this.systemInfo = new SystemInfo();
        }
        if (this.systemInfo.getActiveStatus() == -1) {
            return true;
        } else {
            return false;
        }
    }

    @JsonIgnore
    @Override
    public boolean isValid() throws SpartanConstraintViolationException, SpartanIncorrectDataException {
        boolean isValid = false;
        if (this.entityValidator != null) {
            isValid = this.entityValidator.validateEntity(this);
        } else {
            throw new SpartanIncorrectDataException("Entity validator is not set");
        }
        return isValid;
    }

    @Override
    public void setEntityValidator(EntityValidatorHelper<Object> _validateFactory) {
        this.entityValidator = _validateFactory;
    }

    @Override
    public void setEntityAudit(int customerId, String userId, RECORD_TYPE recordType) {
        System.out.println("Setting logged in user info for " + recordType);
        if (entityAudit == null) {
            entityAudit = new EntityAudit();
        }
        if (recordType == RECORD_TYPE.ADD) {
            this.entityAudit.setCreatedBy(userId);
        } else {
            this.entityAudit.setUpdatedBy(userId);
        }
        setSystemInformation(recordType);
    }

    @Override
    public void setEntityAudit(int customerId, String userId) {
        if (entityAudit == null) {
            entityAudit = new EntityAudit();
        }
        if (getPrimaryKey() == null) {
            this.entityAudit.setCreatedBy(userId);
            this.systemInfo.setActiveStatus(1);
        } else {
            this.entityAudit.setUpdatedBy(userId);
        }
    }

    @JsonIgnore
    public String getLoggedInUserInfo() {
        String auditInfo = "";
        if (this.entityAudit != null) {
            auditInfo = entityAudit.toString();
        }
        return auditInfo;
    }

    @Override
    @JsonIgnore
    public void setSystemInformation(RECORD_TYPE recordType) {
        if (systemInfo == null) {
            systemInfo = new SystemInfo();
        }
        if (recordType == RECORD_TYPE.DELETE) {
            this.systemInfo.setActiveStatus(0);
        } else {
            this.systemInfo.setActiveStatus(1);
        }
    }

    @JsonIgnore
    public void setSystemInformation(Integer activeStatus) {
        this.systemInfo.setActiveStatus(activeStatus);
    }

    @JsonIgnore
    public String getSystemInformation() {
        String systemInfo = "";
        if (this.systemInfo != null) {
            systemInfo = systemInfo.toString();
        }
        return systemInfo;
    }

    @Override
    @JsonIgnore
    public void setSystemTxnCode(Integer transactionAccessCode) {
        if (systemInfo == null) {
            systemInfo = new SystemInfo();
        }
        this.systemInfo.setTxnAccessCode(transactionAccessCode);
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((roles.getPrimaryDisplay().toString() == null ? " " : roles.getPrimaryDisplay().toString()) + ",");
        sb.append((menuId.toString() == null ? " " : menuId.toString()) + ",");
        sb.append((isRead == null ? " " : isRead) + ",");
        sb.append((isWrite == null ? " " : isWrite) + ",");
        sb.append((isExecute == null ? " " : isExecute));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (roleMenuMapId == null) {
            return super.hashCode();
        } else {
            return roleMenuMapId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authorization.RoleMenuBridge other = (com.app.app.shared.authorization.RoleMenuBridge) obj;
            if (roleMenuMapId == null) {
                return false;
            } else if (!roleMenuMapId.equals(other.roleMenuMapId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }

    @Transient
    @JsonIgnore
    private String fieldName;

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String _fieldName) {
        this.fieldName = _fieldName;
    }

    @Override
    public int compare(RoleMenuBridge object1, RoleMenuBridge object2) {
        switch(((fieldName))) {
            case "roleMenuMapId":
                return (object1.getRoleMenuMapId().compareTo(object2.getRoleMenuMapId()) == 0) ? 0 : ((object1.getRoleMenuMapId().compareTo(object2.getRoleMenuMapId()) > 0) ? 1 : -1);
        }
        return 0;
    }
}
