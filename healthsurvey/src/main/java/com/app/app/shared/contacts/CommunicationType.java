package com.app.app.shared.contacts;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.Transient;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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

@Table(name = "ast_CommunicationType_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "CommunicationType.DefaultFinders", query = "select e from CommunicationType e where e.systemInfo.activeStatus=1 and e.commTypeName LIKE :commTypeName"), @javax.persistence.NamedQuery(name = "CommunicationType.findByCommGroupId", query = "select e from CommunicationType e where e.systemInfo.activeStatus=1 and e.commGroupId=:commGroupId"), @javax.persistence.NamedQuery(name = "CommunicationType.findById", query = "select e from CommunicationType e where e.systemInfo.activeStatus=1 and e.commType =:commType") })
public class CommunicationType implements Serializable, CommonEntityInterface, Comparator<CommunicationType> {

    @Column(name = "commTypeName")
    @JsonProperty("commTypeName")
    @NotNull
    @Size(min = 0, max = 128)
    private String commTypeName;

    @Column(name = "commTypeDescription")
    @JsonProperty("commTypeDescription")
    @Size(min = 0, max = 256)
    private String commTypeDescription;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "commType")
    @JsonProperty("commType")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String commType;

    @Column(name = "commGroupId")
    @JsonProperty("commGroupId")
    private String commGroupId;

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

    public String getCommTypeName() {
        return commTypeName;
    }

    public void setCommTypeName(String _commTypeName) {
        if (_commTypeName != null) {
            this.commTypeName = _commTypeName;
        }
    }

    public String getCommTypeDescription() {
        return commTypeDescription;
    }

    public void setCommTypeDescription(String _commTypeDescription) {
        this.commTypeDescription = _commTypeDescription;
    }

    public String getPrimaryKey() {
        return commType;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return commType;
    }

    public String getCommType() {
        return commType;
    }

    public void setCommType(String _commType) {
        this.commType = _commType;
    }

    public String getCommGroupId() {
        return commGroupId;
    }

    public void setCommGroupId(String _commGroupId) {
        this.commGroupId = _commGroupId;
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

    @Override
    public int compare(CommunicationType object1, CommunicationType object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((commTypeName == null ? " " : commTypeName) + ",");
        sb.append((commGroupId.toString() == null ? " " : commGroupId.toString()));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (commType == null) {
            return super.hashCode();
        } else {
            return commType.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.contacts.CommunicationType other = (com.app.app.shared.contacts.CommunicationType) obj;
            if (commType == null) {
                return false;
            } else if (!commType.equals(other.commType)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
