package com.app.app.shared.authentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
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

@Table(name = "ast_UserAccessLevel_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "UserAccessLevel.findById", query = "select e from UserAccessLevel e where e.systemInfo.activeStatus=1 and e.userAccessLevelId =:userAccessLevelId") })
public class UserAccessLevel implements Serializable, CommonEntityInterface, Comparator<UserAccessLevel> {

    @Column(name = "userAccessLevel")
    @JsonProperty("userAccessLevel")
    @NotNull
    @Min(0)
    @Max(99999)
    private Integer userAccessLevel;

    @Column(name = "levelName")
    @JsonProperty("levelName")
    @NotNull
    @Size(min = 3, max = 256)
    private String levelName;

    @Column(name = "levelDescription")
    @JsonProperty("levelDescription")
    @NotNull
    @Size(min = 3, max = 256)
    private String levelDescription;

    @Column(name = "levelHelp")
    @JsonProperty("levelHelp")
    @Size(min = 3, max = 2048)
    private String levelHelp;

    @Column(name = "levelIcon")
    @JsonProperty("levelIcon")
    @Size(min = 3, max = 256)
    private String levelIcon;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "userAccessLevelId")
    @JsonProperty("userAccessLevelId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 3, max = 64)
    private String userAccessLevelId;

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

    public Integer getUserAccessLevel() {
        return userAccessLevel;
    }

    public void setUserAccessLevel(Integer _userAccessLevel) {
        if (_userAccessLevel != null) {
            this.userAccessLevel = _userAccessLevel;
        }
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String _levelName) {
        if (_levelName != null) {
            this.levelName = _levelName;
        }
    }

    public String getLevelDescription() {
        return levelDescription;
    }

    public void setLevelDescription(String _levelDescription) {
        if (_levelDescription != null) {
            this.levelDescription = _levelDescription;
        }
    }

    public String getLevelHelp() {
        return levelHelp;
    }

    public void setLevelHelp(String _levelHelp) {
        this.levelHelp = _levelHelp;
    }

    public String getLevelIcon() {
        return levelIcon;
    }

    public void setLevelIcon(String _levelIcon) {
        this.levelIcon = _levelIcon;
    }

    public String getPrimaryKey() {
        return userAccessLevelId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return userAccessLevelId;
    }

    public String getUserAccessLevelId() {
        return userAccessLevelId;
    }

    public void setUserAccessLevelId(String _userAccessLevelId) {
        this.userAccessLevelId = _userAccessLevelId;
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
    public int compare(UserAccessLevel object1, UserAccessLevel object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((userAccessLevel == null ? " " : userAccessLevel) + ",");
        sb.append((levelName == null ? " " : levelName) + ",");
        sb.append((levelDescription == null ? " " : levelDescription));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (userAccessLevelId == null) {
            return super.hashCode();
        } else {
            return userAccessLevelId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.UserAccessLevel other = (com.app.app.shared.authentication.UserAccessLevel) obj;
            if (userAccessLevelId == null) {
                return false;
            } else if (!userAccessLevelId.equals(other.userAccessLevelId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
