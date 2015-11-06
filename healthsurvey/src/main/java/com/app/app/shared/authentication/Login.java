package com.app.app.shared.authentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.spartan.shield.server.authentication.interfaces.UserAuthentication;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.NamedNativeQuery;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Transient;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import com.app.app.shared.contacts.CoreContacts;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import com.athena.framework.server.helper.EntityValidatorHelper;
import javax.persistence.Version;
import com.app.app.shared.EntityAudit;
import javax.persistence.Embedded;
import com.app.app.shared.SystemInfo;
import com.athena.framework.server.exception.biz.SpartanConstraintViolationException;
import com.athena.framework.server.exception.biz.SpartanIncorrectDataException;
import java.lang.Override;
import javax.persistence.NamedQueries;

@Table(name = "ast_Login_T")
@Entity
@NamedNativeQuery(name = "complexQuery", query = "SELECT login.appCreatorId FROM ast_Login_T AS login,`ast_CoreContacts_T` AS corecontact,`ast_User_T` AS userinfo, `ast_UserData_TP` AS userdata WHERE loginId=? AND login.`contactId`=corecontact.`contactId` AND login.`userId`=userinfo.`userId` AND userinfo.`userId`=userdata.userId")
@NamedQueries({ @javax.persistence.NamedQuery(name = "Login.DefaultFinders", query = "select e from Login e where e.systemInfo.activeStatus=1 and e.serverAuthImage LIKE :serverAuthImage"), @javax.persistence.NamedQuery(name = "Login.findByUserId", query = "select e from Login e where e.systemInfo.activeStatus=1 and e.user.userId=:userId"), @javax.persistence.NamedQuery(name = "Login.findByContactId", query = "select e from Login e where e.systemInfo.activeStatus=1 and e.coreContacts.contactId=:contactId"), @javax.persistence.NamedQuery(name = "Login.findById", query = "select e from Login e where e.systemInfo.activeStatus=1 and e.loginPk =:loginPk"), @javax.persistence.NamedQuery(name = "FindMappedUser", query = "SELECT u FROM Login u WHERE u.systemInfo.activeStatus=1 AND u.user.userId IN (SELECT ub.userId FROM UserRoleBridge ub)"), @javax.persistence.NamedQuery(name = "FindUnMappedUser", query = "SELECT u FROM Login u WHERE u.systemInfo.activeStatus=1 AND u.user.userId NOT IN (SELECT ub.userId FROM UserRoleBridge ub)") })
public class Login implements Serializable, CommonEntityInterface, UserAuthentication, Comparator<Login> {

    @Column(name = "loginId")
    @JsonProperty("loginId")
    @NotNull
    @Size(min = 0, max = 200)
    private String loginId;

    @Column(name = "serverAuthImage")
    @JsonProperty("serverAuthImage")
    @Size(min = 0, max = 32)
    private String serverAuthImage;

    @Column(name = "serverAuthText")
    @JsonProperty("serverAuthText")
    @Size(min = 0, max = 16)
    private String serverAuthText;

    @Column(name = "failedLoginAttempts")
    @JsonProperty("failedLoginAttempts")
    @Min(0)
    @Max(11)
    private Integer failedLoginAttempts;

    @Transient
    @JsonIgnore
    private Boolean isAuthenticated;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "loginPk")
    @JsonProperty("loginPk")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String loginPk;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "contactId", referencedColumnName = "contactId")
    private CoreContacts coreContacts;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;

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

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String _loginId) {
        if (_loginId != null) {
            this.loginId = _loginId;
        }
    }

    public String getServerAuthImage() {
        return serverAuthImage;
    }

    public void setServerAuthImage(String _serverAuthImage) {
        this.serverAuthImage = _serverAuthImage;
    }

    public String getServerAuthText() {
        return serverAuthText;
    }

    public void setServerAuthText(String _serverAuthText) {
        this.serverAuthText = _serverAuthText;
    }

    public Integer getFailedLoginAttempts() {
        return failedLoginAttempts;
    }

    public void setFailedLoginAttempts(Integer _failedLoginAttempts) {
        this.failedLoginAttempts = _failedLoginAttempts;
    }

    public Boolean getIsAuthenticated() {
        return isAuthenticated;
    }

    public void setIsAuthenticated(Boolean _isAuthenticated) {
        this.isAuthenticated = _isAuthenticated;
    }

    public String getPrimaryKey() {
        return loginPk;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return loginPk;
    }

    public String getLoginPk() {
        return loginPk;
    }

    public void setLoginPk(String _loginPk) {
        this.loginPk = _loginPk;
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

    public CoreContacts getCoreContacts() {
        return coreContacts;
    }

    public void setCoreContacts(CoreContacts _coreContacts) {
        this.coreContacts = _coreContacts;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User _user) {
        this.user = _user;
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
    public int compare(Login object1, Login object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((serverAuthImage == null ? " " : serverAuthImage));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (loginPk == null) {
            return super.hashCode();
        } else {
            return loginPk.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.Login other = (com.app.app.shared.authentication.Login) obj;
            if (loginPk == null) {
                return false;
            } else if (!loginPk.equals(other.loginPk)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }

    public String toJsonString() {
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            return mapper.writeValueAsString(this);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Transient
    private String sessionId;

    @Transient
    private String userHash;

    @Transient
    private String qKeHash;

    @Transient
    private boolean isCheckCookie;

    @Override
    public int getSessionTimeout() {
        return this.getUser().getSessionTimeout();
    }

    @Override
    public String getQKeHash() {
        return this.qKeHash;
    }

    @Override
    public boolean isCheckCookie() {
        return true;
    }

    @Override
    public void setContainerSessionId(String _sessionId) {
        this.sessionId = _sessionId;
    }

    @Override
    public void setUserHash(String _userHash) {
        this.userHash = _userHash;
    }

    @Override
    public void setQKeHash(String _qKeHash) {
        this.qKeHash = _qKeHash;
    }

    @JsonIgnore
    @Override
    public String getCredential() {
        return user.getUserData().getPassword();
    }

    @Override
    public boolean isDisabled() {
        return false;
    }

    @Override
    public boolean isPasswordExpired() {
        return false;
    }

    @Override
    public String getUserId() {
        return user.getUserId();
    }

    @Override
    public int getuserAccessCode() {
        return this.user.getUserAccessCode();
    }
}
