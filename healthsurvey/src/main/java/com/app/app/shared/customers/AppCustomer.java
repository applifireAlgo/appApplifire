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

@Table(name = "ast_AppCustomer_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "AppCustomer.DefaultFinders", query = "select e from AppCustomer e where e.systemInfo.activeStatus=1 and e.customerName LIKE :customerName"), @javax.persistence.NamedQuery(name = "AppCustomer.findByContactId", query = "select e from AppCustomer e where e.systemInfo.activeStatus=1 and e.contactId=:contactId"), @javax.persistence.NamedQuery(name = "AppCustomer.findByAppCustomerType", query = "select e from AppCustomer e where e.systemInfo.activeStatus=1 and e.appCustomerType=:appCustomerType"), @javax.persistence.NamedQuery(name = "AppCustomer.findByAppCustomerCategory", query = "select e from AppCustomer e where e.systemInfo.activeStatus=1 and e.appCustomerCategory=:appCustomerCategory"), @javax.persistence.NamedQuery(name = "AppCustomer.findById", query = "select e from AppCustomer e where e.systemInfo.activeStatus=1 and e.appCustomerId =:appCustomerId") })
public class AppCustomer implements Serializable, CommonEntityInterface, Comparator<AppCustomer> {

    @Column(name = "customerName")
    @JsonProperty("customerName")
    @NotNull
    @Size(min = 0, max = 65535)
    private String customerName;

    @Column(name = "deploymentModel")
    @JsonProperty("deploymentModel")
    @NotNull
    private Boolean deploymentModel = true;

    @Column(name = "customerStatus")
    @JsonProperty("customerStatus")
    @NotNull
    @Min(0)
    @Max(1)
    private Integer customerStatus = 1;

    @Column(name = "userRequested")
    @JsonProperty("userRequested")
    @NotNull
    @Min(-2147483648L)
    @Max(2147483647)
    private Integer userRequested = 1;

    @Column(name = "evalTimePeriod")
    @JsonProperty("evalTimePeriod")
    @NotNull
    @Min(-2147483648L)
    @Max(2147483647)
    private Integer evalTimePeriod = 60;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "appCustomerId")
    @JsonProperty("appCustomerId")
    @GeneratedValue(generator = "UUIDGenerator")
    private String appCustomerId;

    @Column(name = "contactId")
    @JsonProperty("contactId")
    private String contactId;

    @Column(name = "appCustomerType")
    @JsonProperty("appCustomerType")
    private String appCustomerType;

    @Column(name = "appCustomerCategory")
    @JsonProperty("appCustomerCategory")
    private String appCustomerCategory;

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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String _customerName) {
        if (_customerName != null) {
            this.customerName = _customerName;
        }
    }

    public Boolean getDeploymentModel() {
        return deploymentModel;
    }

    public void setDeploymentModel(Boolean _deploymentModel) {
        if (_deploymentModel != null) {
            this.deploymentModel = _deploymentModel;
        }
    }

    public Integer getCustomerStatus() {
        return customerStatus;
    }

    public void setCustomerStatus(Integer _customerStatus) {
        if (_customerStatus != null) {
            this.customerStatus = _customerStatus;
        }
    }

    public Integer getUserRequested() {
        return userRequested;
    }

    public void setUserRequested(Integer _userRequested) {
        if (_userRequested != null) {
            this.userRequested = _userRequested;
        }
    }

    public Integer getEvalTimePeriod() {
        return evalTimePeriod;
    }

    public void setEvalTimePeriod(Integer _evalTimePeriod) {
        if (_evalTimePeriod != null) {
            this.evalTimePeriod = _evalTimePeriod;
        }
    }

    public String getPrimaryKey() {
        return appCustomerId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return appCustomerId;
    }

    public String getAppCustomerId() {
        return appCustomerId;
    }

    public void setAppCustomerId(String _appCustomerId) {
        this.appCustomerId = _appCustomerId;
    }

    public String getContactId() {
        return contactId;
    }

    public void setContactId(String _contactId) {
        this.contactId = _contactId;
    }

    public String getAppCustomerType() {
        return appCustomerType;
    }

    public void setAppCustomerType(String _appCustomerType) {
        this.appCustomerType = _appCustomerType;
    }

    public String getAppCustomerCategory() {
        return appCustomerCategory;
    }

    public void setAppCustomerCategory(String _appCustomerCategory) {
        this.appCustomerCategory = _appCustomerCategory;
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
    public int compare(AppCustomer object1, AppCustomer object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((customerName == null ? " " : customerName));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (appCustomerId == null) {
            return super.hashCode();
        } else {
            return appCustomerId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.customers.AppCustomer other = (com.app.app.shared.customers.AppCustomer) obj;
            if (appCustomerId == null) {
                return false;
            } else if (!appCustomerId.equals(other.appCustomerId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
