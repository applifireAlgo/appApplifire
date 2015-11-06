package com.app.app.shared.authentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.spartan.shield.server.authentication.interfaces.UserDataInterface;
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
import com.spartan.shield.server.authentication.interfaces.UserInterface;
import javax.persistence.NamedQueries;

@Table(name = "ast_UserData_TP")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "UserData.findByUserId", query = "select e from UserData e where e.systemInfo.activeStatus=1 and e.user.userId=:userId"), @javax.persistence.NamedQuery(name = "UserData.findById", query = "select e from UserData e where e.systemInfo.activeStatus=1 and e.userDataId =:userDataId") })
public class UserData implements Serializable, CommonEntityInterface, UserDataInterface, Comparator<UserData> {

    @Column(name = "password")
    @JsonProperty("password")
    @NotNull
    @Size(min = 0, max = 512)
    private String password;

    @Column(name = "oneTimePassword")
    @JsonProperty("oneTimePassword")
    @Size(min = 0, max = 32)
    private String oneTimePassword;

    @Column(name = "oneTimePasswordExpiry")
    @JsonProperty("oneTimePasswordExpiry")
    @Min(0)
    @Max(11)
    private Integer oneTimePasswordExpiry;

    @Column(name = "oneTimePasswordGenDate")
    @JsonProperty("oneTimePasswordGenDate")
    private Timestamp oneTimePasswordGenDate;

    @Column(name = "last5Passwords")
    @JsonProperty("last5Passwords")
    @Size(min = 0, max = 5120)
    private String last5Passwords;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "userDataId")
    @JsonProperty("userDataId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String userDataId;

    @OneToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String _password) {
        if (_password != null) {
            this.password = _password;
        }
    }

    public String getOneTimePassword() {
        return oneTimePassword;
    }

    public void setOneTimePassword(String _oneTimePassword) {
        this.oneTimePassword = _oneTimePassword;
    }

    public Integer getOneTimePasswordExpiry() {
        return oneTimePasswordExpiry;
    }

    public void setOneTimePasswordExpiry(Integer _oneTimePasswordExpiry) {
        this.oneTimePasswordExpiry = _oneTimePasswordExpiry;
    }

    public Timestamp getOneTimePasswordGenDate() {
        return oneTimePasswordGenDate;
    }

    public void setOneTimePasswordGenDate(Timestamp _oneTimePasswordGenDate) {
        this.oneTimePasswordGenDate = _oneTimePasswordGenDate;
    }

    public String getLast5Passwords() {
        return last5Passwords;
    }

    public void setLast5Passwords(String _last5Passwords) {
        this.last5Passwords = _last5Passwords;
    }

    public String getPrimaryKey() {
        return userDataId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return userDataId;
    }

    public String getUserDataId() {
        return userDataId;
    }

    public void setUserDataId(String _userDataId) {
        this.userDataId = _userDataId;
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
    public int compare(UserData object1, UserData object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((user.getPrimaryDisplay().toString() == null ? " " : user.getPrimaryDisplay().toString()));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (userDataId == null) {
            return super.hashCode();
        } else {
            return userDataId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.UserData other = (com.app.app.shared.authentication.UserData) obj;
            if (userDataId == null) {
                return false;
            } else if (!userDataId.equals(other.userDataId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }

    public void setUser(UserInterface userInterface) {
        this.user = (User) userInterface;
    }
}
