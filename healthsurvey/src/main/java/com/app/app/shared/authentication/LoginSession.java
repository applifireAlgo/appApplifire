package com.app.app.shared.authentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.spartan.shield.server.authentication.interfaces.LoginSessionInterface;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
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

@Table(name = "ast_LoginSession_T")
@Entity
public class LoginSession implements Serializable, CommonEntityInterface, LoginSessionInterface, Comparator<LoginSession> {

    @Column(name = "AppServerSessionId")
    @JsonProperty("appServerSessionId")
    @NotNull
    @Size(min = 12, max = 256)
    private String appServerSessionId;

    @Column(name = "loginTime")
    @JsonProperty("loginTime")
    @NotNull
    private Timestamp loginTime;

    @Column(name = "logoutTime")
    @JsonProperty("logoutTime")
    @NotNull
    private Timestamp logoutTime;

    @Column(name = "lastAccessTime")
    @JsonProperty("lastAccessTime")
    @NotNull
    private Timestamp lastAccessTime;

    @Column(name = "clientIPAddress")
    @JsonProperty("clientIPAddress")
    @NotNull
    @Size(min = 0, max = 128)
    private String clientIPAddress;

    @Column(name = "clientIPAddressInt")
    @JsonProperty("clientIPAddressInt")
    @Min(0)
    private Long clientIPAddressInt;

    @Column(name = "clientNetworkAddress")
    @JsonProperty("clientNetworkAddress")
    @Min(0)
    @Max(11)
    private Integer clientNetworkAddress;

    @Column(name = "clientBrowser")
    @JsonProperty("clientBrowser")
    @NotNull
    @Size(min = 0, max = 256)
    private String clientBrowser;

    @Column(name = "sessionData")
    @JsonProperty("sessionData")
    @Size(min = 0, max = 5120)
    private String sessionData;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "AppSessionId")
    @JsonProperty("appSessionId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 12, max = 256)
    private String appSessionId;

    @Column(name = "userId")
    @JsonProperty("userId")
    private String userId;

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

    public String getAppServerSessionId() {
        return appServerSessionId;
    }

    public void setAppServerSessionId(String _appServerSessionId) {
        if (_appServerSessionId != null) {
            this.appServerSessionId = _appServerSessionId;
        }
    }

    public Timestamp getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Timestamp _loginTime) {
        if (_loginTime != null) {
            this.loginTime = _loginTime;
        }
    }

    public Timestamp getLogoutTime() {
        return logoutTime;
    }

    public void setLogoutTime(Timestamp _logoutTime) {
        if (_logoutTime != null) {
            this.logoutTime = _logoutTime;
        }
    }

    public Timestamp getLastAccessTime() {
        return lastAccessTime;
    }

    public void setLastAccessTime(Timestamp _lastAccessTime) {
        if (_lastAccessTime != null) {
            this.lastAccessTime = _lastAccessTime;
        }
    }

    public String getClientIPAddress() {
        return clientIPAddress;
    }

    public void setClientIPAddress(String _clientIPAddress) {
        if (_clientIPAddress != null) {
            this.clientIPAddress = _clientIPAddress;
        }
    }

    public Long getClientIPAddressInt() {
        return clientIPAddressInt;
    }

    public void setClientIPAddressInt(Long _clientIPAddressInt) {
        this.clientIPAddressInt = _clientIPAddressInt;
    }

    public Integer getClientNetworkAddress() {
        return clientNetworkAddress;
    }

    public void setClientNetworkAddress(Integer _clientNetworkAddress) {
        this.clientNetworkAddress = _clientNetworkAddress;
    }

    public String getClientBrowser() {
        return clientBrowser;
    }

    public void setClientBrowser(String _clientBrowser) {
        if (_clientBrowser != null) {
            this.clientBrowser = _clientBrowser;
        }
    }

    public String getSessionData() {
        return sessionData;
    }

    public void setSessionData(String _sessionData) {
        this.sessionData = _sessionData;
    }

    public String getPrimaryKey() {
        return appSessionId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return appSessionId;
    }

    public String getAppSessionId() {
        return appSessionId;
    }

    public void setAppSessionId(String _appSessionId) {
        this.appSessionId = _appSessionId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String _userId) {
        this.userId = _userId;
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
    public int compare(LoginSession object1, LoginSession object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((appServerSessionId == null ? " " : appServerSessionId) + ",");
        sb.append((loginTime == null ? " " : loginTime) + ",");
        sb.append((logoutTime == null ? " " : logoutTime) + ",");
        sb.append((lastAccessTime == null ? " " : lastAccessTime));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (appSessionId == null) {
            return super.hashCode();
        } else {
            return appSessionId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.LoginSession other = (com.app.app.shared.authentication.LoginSession) obj;
            if (appSessionId == null) {
                return false;
            } else if (!appSessionId.equals(other.appSessionId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }

    @Override
    public Integer getActiveStatus() {
        return this.systemInfo.getActiveStatus();
    }
}
