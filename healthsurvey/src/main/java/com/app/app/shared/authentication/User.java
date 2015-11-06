package com.app.app.shared.authentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.spartan.shield.server.authentication.interfaces.UserInterface;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
import java.sql.Timestamp;
import javax.validation.constraints.Size;
import javax.persistence.Transient;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import java.util.List;
import javax.persistence.OneToMany;
import com.athena.framework.server.helper.EntityValidatorHelper;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Version;
import com.app.app.shared.EntityAudit;
import javax.persistence.Embedded;
import com.app.app.shared.SystemInfo;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.PropertyGenerator;
import com.athena.framework.server.exception.biz.SpartanConstraintViolationException;
import com.athena.framework.server.exception.biz.SpartanIncorrectDataException;
import java.lang.Override;
import com.spartan.shield.server.authentication.interfaces.UserDataInterface;
import javax.persistence.NamedQueries;

@Table(name = "ast_User_T")
@Entity
@JsonIdentityInfo(generator = PropertyGenerator.class, property = "userId")
@NamedQueries({ @javax.persistence.NamedQuery(name = "User.findByUserAccessLevelId", query = "select e from User e where e.systemInfo.activeStatus=1 and e.userAccessLevelId=:userAccessLevelId"), @javax.persistence.NamedQuery(name = "User.findByUserAccessDomainId", query = "select e from User e where e.systemInfo.activeStatus=1 and e.userAccessDomainId=:userAccessDomainId"), @javax.persistence.NamedQuery(name = "User.findById", query = "select e from User e where e.systemInfo.activeStatus=1 and e.userId =:userId") })
public class User implements Serializable, CommonEntityInterface, UserInterface, Comparator<User> {

    @Column(name = "userAccessCode")
    @JsonProperty("userAccessCode")
    @Min(0)
    @Max(11)
    private Integer userAccessCode;

    @Column(name = "multiFactorAuthEnabled")
    @JsonProperty("multiFactorAuthEnabled")
    @Min(0)
    @Max(1)
    private Integer multiFactorAuthEnabled;

    @Column(name = "genTempOneTimePassword")
    @JsonProperty("genTempOneTimePassword")
    @Min(0)
    @Max(1)
    private Integer genTempOneTimePassword;

    @Column(name = "allowMultipleLogin")
    @JsonProperty("allowMultipleLogin")
    @Min(0)
    @Max(1)
    private Integer allowMultipleLogin;

    @Column(name = "isLocked")
    @JsonProperty("isLocked")
    @Min(0)
    @Max(1)
    private Integer isLocked;

    @Column(name = "isDeleted")
    @JsonProperty("isDeleted")
    @Min(0)
    @Max(1)
    private Integer isDeleted;

    @Column(name = "changePasswordNextLogin")
    @JsonProperty("changePasswordNextLogin")
    @Min(0)
    @Max(1)
    private Integer changePasswordNextLogin;

    @Column(name = "passwordExpiryDate")
    @JsonProperty("passwordExpiryDate")
    private Timestamp passwordExpiryDate;

    @Column(name = "passwordAlgo")
    @JsonProperty("passwordAlgo")
    @Size(min = 0, max = 64)
    private String passwordAlgo = "1";

    @Column(name = "lastPasswordChangeDate")
    @JsonProperty("lastPasswordChangeDate")
    private Timestamp lastPasswordChangeDate;

    @Column(name = "sessionTimeout")
    @JsonProperty("sessionTimeout")
    @Min(0)
    @Max(3600)
    private Integer sessionTimeout = 1800;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "userId")
    @JsonProperty("userId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String userId;

    @Column(name = "userAccessLevelId")
    @JsonProperty("userAccessLevelId")
    private String userAccessLevelId;

    @Column(name = "userAccessDomainId")
    @JsonProperty("userAccessDomainId")
    private String userAccessDomainId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
    private UserData userData;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
    private List<PassRecovery> passRecovery;

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

    public Integer getUserAccessCode() {
        return userAccessCode;
    }

    public void setUserAccessCode(Integer _userAccessCode) {
        this.userAccessCode = _userAccessCode;
    }

    public Integer getMultiFactorAuthEnabled() {
        return multiFactorAuthEnabled;
    }

    public void setMultiFactorAuthEnabled(Integer _multiFactorAuthEnabled) {
        this.multiFactorAuthEnabled = _multiFactorAuthEnabled;
    }

    public Integer getGenTempOneTimePassword() {
        return genTempOneTimePassword;
    }

    public void setGenTempOneTimePassword(Integer _genTempOneTimePassword) {
        this.genTempOneTimePassword = _genTempOneTimePassword;
    }

    public Integer getAllowMultipleLogin() {
        return allowMultipleLogin;
    }

    public void setAllowMultipleLogin(Integer _allowMultipleLogin) {
        this.allowMultipleLogin = _allowMultipleLogin;
    }

    public Integer getIsLocked() {
        return isLocked;
    }

    public void setIsLocked(Integer _isLocked) {
        this.isLocked = _isLocked;
    }

    public Integer getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Integer _isDeleted) {
        this.isDeleted = _isDeleted;
    }

    public Integer getChangePasswordNextLogin() {
        return changePasswordNextLogin;
    }

    public void setChangePasswordNextLogin(Integer _changePasswordNextLogin) {
        this.changePasswordNextLogin = _changePasswordNextLogin;
    }

    public Timestamp getPasswordExpiryDate() {
        return passwordExpiryDate;
    }

    public void setPasswordExpiryDate(Timestamp _passwordExpiryDate) {
        this.passwordExpiryDate = _passwordExpiryDate;
    }

    public String getPasswordAlgo() {
        return passwordAlgo;
    }

    public void setPasswordAlgo(String _passwordAlgo) {
        this.passwordAlgo = _passwordAlgo;
    }

    public Timestamp getLastPasswordChangeDate() {
        return lastPasswordChangeDate;
    }

    public void setLastPasswordChangeDate(Timestamp _lastPasswordChangeDate) {
        this.lastPasswordChangeDate = _lastPasswordChangeDate;
    }

    public Integer getSessionTimeout() {
        return sessionTimeout;
    }

    public void setSessionTimeout(Integer _sessionTimeout) {
        this.sessionTimeout = _sessionTimeout;
    }

    public String getPrimaryKey() {
        return userId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String _userId) {
        this.userId = _userId;
    }

    public String getUserAccessLevelId() {
        return userAccessLevelId;
    }

    public void setUserAccessLevelId(String _userAccessLevelId) {
        this.userAccessLevelId = _userAccessLevelId;
    }

    public String getUserAccessDomainId() {
        return userAccessDomainId;
    }

    public void setUserAccessDomainId(String _userAccessDomainId) {
        this.userAccessDomainId = _userAccessDomainId;
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

    public UserData getUserData() {
        return userData;
    }

    public void setUserData(UserData _userData) {
        if (_userData.getUser() == null) {
            _userData.setUser(this);
        }
        this.userData = _userData;
    }

    public User addPassRecovery(PassRecovery _passRecovery) {
        if (this.passRecovery == null) {
            this.passRecovery = new java.util.ArrayList<com.app.app.shared.authentication.PassRecovery>();
        }
        if (_passRecovery != null) {
            _passRecovery.setUser(this);
            this.passRecovery.add(_passRecovery);
        }
        return this;
    }

    public User removePassRecovery(PassRecovery _passRecovery) {
        if (this.passRecovery != null) {
            this.passRecovery.remove(_passRecovery);
        }
        return this;
    }

    public User addAllPassRecovery(List<PassRecovery> _passRecovery) {
        if (this.passRecovery == null) {
            this.passRecovery = new java.util.ArrayList<com.app.app.shared.authentication.PassRecovery>();
        }
        if (_passRecovery != null) {
            for (int i = 0; i < _passRecovery.size(); i++) {
                _passRecovery.get(i).setUser(this);
            }
            this.passRecovery.addAll(_passRecovery);
        }
        return this;
    }

    @JsonIgnore
    public Integer getTotalNumberOfPassRecovery() {
        if (this.passRecovery != null) {
            return this.passRecovery.size();
        }
        return 0;
    }

    public List<PassRecovery> getPassRecovery() {
        return passRecovery;
    }

    public void setPassRecovery(List<PassRecovery> _passRecovery) {
        for (int i = 0; i < _passRecovery.size(); i++) {
            if (_passRecovery.get(i).getUser() == null) {
                _passRecovery.get(i).setUser(this);
            }
        }
        this.passRecovery = _passRecovery;
    }

    @JsonIgnore
    public List<PassRecovery> getDeletedPassRecoveryList() {
        List<PassRecovery> passrecoveryToRemove = new java.util.ArrayList<PassRecovery>();
        for (PassRecovery _passrecovery : passRecovery) {
            if (_passrecovery.isHardDelete()) {
                passrecoveryToRemove.add(_passrecovery);
            }
        }
        passRecovery.removeAll(passrecoveryToRemove);
        return passrecoveryToRemove;
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
        setValidatorpassRecovery(_validateFactory);
    }

    private void setValidatorpassRecovery(EntityValidatorHelper<Object> _validateFactory) {
        for (int i = 0; i < passRecovery.size(); i++) {
            passRecovery.get(i).setEntityValidator(_validateFactory);
        }
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
        if (this.passRecovery == null) {
            this.passRecovery = new java.util.ArrayList<PassRecovery>();
        }
        for (PassRecovery _passRecovery : passRecovery) {
            _passRecovery.setEntityAudit(customerId, userId, recordType);
            _passRecovery.setSystemInformation(recordType);
        }
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
        if (this.passRecovery == null) {
            this.passRecovery = new java.util.ArrayList<PassRecovery>();
        }
        for (PassRecovery _passRecovery : passRecovery) {
            _passRecovery.setEntityAudit(customerId, userId);
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
            this.systemInfo.setActiveStatus(-1);
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
    public int compare(User object1, User object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((passwordAlgo == null ? " " : passwordAlgo));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (userId == null) {
            return super.hashCode();
        } else {
            return userId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.User other = (com.app.app.shared.authentication.User) obj;
            if (userId == null) {
                return false;
            } else if (!userId.equals(other.userId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }

    public void setUserData(UserDataInterface userDataInterface) {
        this.userData = (UserData) userDataInterface;
    }
}
