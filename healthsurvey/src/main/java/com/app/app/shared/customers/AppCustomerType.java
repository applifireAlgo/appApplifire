package com.app.app.shared.customers;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
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

@Table(name = "ast_AppCustomerType_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "AppCustomerType.DefaultFinders", query = "select e from AppCustomerType e where e.systemInfo.activeStatus=1 and e.customerType LIKE :customerType"), @javax.persistence.NamedQuery(name = "AppCustomerType.findById", query = "select e from AppCustomerType e where e.systemInfo.activeStatus=1 and e.appcustTypeId =:appcustTypeId") })
public class AppCustomerType implements Serializable, CommonEntityInterface, Comparator<AppCustomerType> {

    @Column(name = "customerType")
    @JsonProperty("customerType")
    @NotNull
    @Size(min = 0, max = 65535)
    private String customerType;

    @Column(name = "defaults")
    @JsonProperty("defaults")
    @Min(0)
    @Max(1)
    private Integer defaults;

    @Column(name = "sequenceId")
    @JsonProperty("sequenceId")
    @Min(-2147483648L)
    @Max(2147483647)
    private Integer sequenceId;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "appcustTypeId")
    @JsonProperty("appcustTypeId")
    @GeneratedValue(generator = "UUIDGenerator")
    private String appcustTypeId;

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

    public String getCustomerType() {
        return customerType;
    }

    public void setCustomerType(String _customerType) {
        if (_customerType != null) {
            this.customerType = _customerType;
        }
    }

    public Integer getDefaults() {
        return defaults;
    }

    public void setDefaults(Integer _defaults) {
        this.defaults = _defaults;
    }

    public Integer getSequenceId() {
        return sequenceId;
    }

    public void setSequenceId(Integer _sequenceId) {
        this.sequenceId = _sequenceId;
    }

    public String getPrimaryKey() {
        return appcustTypeId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return appcustTypeId;
    }

    public String getAppcustTypeId() {
        return appcustTypeId;
    }

    public void setAppcustTypeId(String _appcustTypeId) {
        this.appcustTypeId = _appcustTypeId;
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
    public int compare(AppCustomerType object1, AppCustomerType object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((customerType == null ? " " : customerType));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (appcustTypeId == null) {
            return super.hashCode();
        } else {
            return appcustTypeId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.customers.AppCustomerType other = (com.app.app.shared.customers.AppCustomerType) obj;
            if (appcustTypeId == null) {
                return false;
            } else if (!appcustTypeId.equals(other.appcustTypeId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
