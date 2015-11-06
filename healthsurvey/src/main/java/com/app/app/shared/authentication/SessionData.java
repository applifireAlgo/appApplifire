package com.app.app.shared.authentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.spartan.shield.server.authentication.interfaces.SessionDataInterface;
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
import java.sql.Timestamp;
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

@Table(name = "ast_SessionData_T")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "deleteAllSessionData", query = "delete from SessionData e where e.systemInfo.activeStatus=1 and e.appSessionId=:appSessionId"), @javax.persistence.NamedQuery(name = "findBySessionKey", query = "select e from SessionData e where e.systemInfo.activeStatus=1 and e.appSessionId=:appSessionId and e.sessionKey =:sessionKey"), @javax.persistence.NamedQuery(name = "SessionData.findByAppSessionId", query = "select e from SessionData e where e.systemInfo.activeStatus=1 and e.appSessionId=:appSessionId") })
public class SessionData implements Serializable, CommonEntityInterface, SessionDataInterface, Comparator<SessionData> {

    @Column(name = "customerId")
    @JsonProperty("customerId")
    @NotNull
    @Size(min = 0, max = 64)
    private String customerId;

    @Column(name = "userId")
    @JsonProperty("userId")
    @NotNull
    @Size(min = 0, max = 64)
    private String userId;

    @Column(name = "sessionKey")
    @JsonProperty("sessionKey")
    @NotNull
    @Size(min = 0, max = 64)
    private String sessionKey;

    @Column(name = "dataType")
    @JsonProperty("dataType")
    @NotNull
    @Min(0)
    @Max(2147483647)
    private Integer dataType;

    @Column(name = "numberValue")
    @JsonProperty("numberValue")
    @Min(0)
    @Max(2147483647)
    private Integer numberValue;

    @Column(name = "dateTimeValue")
    @JsonProperty("dateTimeValue")
    private Timestamp dateTimeValue;

    @Column(name = "stringValue")
    @JsonProperty("stringValue")
    @Size(min = 0, max = 64)
    private String stringValue;

    @Column(name = "booleanValue")
    @JsonProperty("booleanValue")
    private Boolean booleanValue;

    @Column(name = "jsonValue")
    @JsonProperty("jsonValue")
    private String jsonValue;

    @Column(name = "appSessionId")
    @JsonProperty("appSessionId")
    @NotNull
    @Size(min = 12, max = 256)
    private String appSessionId;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "dataId")
    @JsonProperty("dataId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 256)
    private String dataId;

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

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String _customerId) {
        if (_customerId != null) {
            this.customerId = _customerId;
        }
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String _userId) {
        if (_userId != null) {
            this.userId = _userId;
        }
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String _sessionKey) {
        if (_sessionKey != null) {
            this.sessionKey = _sessionKey;
        }
    }

    public Integer getDataType() {
        return dataType;
    }

    public void setDataType(Integer _dataType) {
        if (_dataType != null) {
            this.dataType = _dataType;
        }
    }

    public Integer getNumberValue() {
        return numberValue;
    }

    public void setNumberValue(Integer _numberValue) {
        this.numberValue = _numberValue;
    }

    public Timestamp getDateTimeValue() {
        return dateTimeValue;
    }

    public void setDateTimeValue(Timestamp _dateTimeValue) {
        this.dateTimeValue = _dateTimeValue;
    }

    public String getStringValue() {
        return stringValue;
    }

    public void setStringValue(String _stringValue) {
        this.stringValue = _stringValue;
    }

    public Boolean getBooleanValue() {
        return booleanValue;
    }

    public void setBooleanValue(Boolean _booleanValue) {
        this.booleanValue = _booleanValue;
    }

    public String getJsonValue() {
        return jsonValue;
    }

    public void setJsonValue(String _jsonValue) {
        this.jsonValue = _jsonValue;
    }

    public String getAppSessionId() {
        return appSessionId;
    }

    public void setAppSessionId(String _appSessionId) {
        if (_appSessionId != null) {
            this.appSessionId = _appSessionId;
        }
    }

    public String getPrimaryKey() {
        return dataId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return dataId;
    }

    public String getDataId() {
        return dataId;
    }

    public void setDataId(String _dataId) {
        this.dataId = _dataId;
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
    public int compare(SessionData object1, SessionData object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (dataId == null) {
            return super.hashCode();
        } else {
            return dataId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.SessionData other = (com.app.app.shared.authentication.SessionData) obj;
            if (dataId == null) {
                return false;
            } else if (!dataId.equals(other.dataId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
