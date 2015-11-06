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

@Table(name = "ast_UserAccessDomain_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "UserAccessDomain.findById", query = "select e from UserAccessDomain e where e.systemInfo.activeStatus=1 and e.userAccessDomainId =:userAccessDomainId") })
public class UserAccessDomain implements Serializable, CommonEntityInterface, Comparator<UserAccessDomain> {

    @Column(name = "userAccessDomain")
    @JsonProperty("userAccessDomain")
    @NotNull
    @Min(0)
    @Max(99999)
    private Integer userAccessDomain;

    @Column(name = "domainName")
    @JsonProperty("domainName")
    @NotNull
    @Size(min = 3, max = 256)
    private String domainName;

    @Column(name = "domainDescription")
    @JsonProperty("domainDescription")
    @NotNull
    @Size(min = 3, max = 256)
    private String domainDescription;

    @Column(name = "domainHelp")
    @JsonProperty("domainHelp")
    @Size(min = 3, max = 2048)
    private String domainHelp;

    @Column(name = "domainIcon")
    @JsonProperty("domainIcon")
    @Size(min = 3, max = 256)
    private String domainIcon;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "userAccessDomainId")
    @JsonProperty("userAccessDomainId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 3, max = 64)
    private String userAccessDomainId;

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

    public Integer getUserAccessDomain() {
        return userAccessDomain;
    }

    public void setUserAccessDomain(Integer _userAccessDomain) {
        if (_userAccessDomain != null) {
            this.userAccessDomain = _userAccessDomain;
        }
    }

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String _domainName) {
        if (_domainName != null) {
            this.domainName = _domainName;
        }
    }

    public String getDomainDescription() {
        return domainDescription;
    }

    public void setDomainDescription(String _domainDescription) {
        if (_domainDescription != null) {
            this.domainDescription = _domainDescription;
        }
    }

    public String getDomainHelp() {
        return domainHelp;
    }

    public void setDomainHelp(String _domainHelp) {
        this.domainHelp = _domainHelp;
    }

    public String getDomainIcon() {
        return domainIcon;
    }

    public void setDomainIcon(String _domainIcon) {
        this.domainIcon = _domainIcon;
    }

    public String getPrimaryKey() {
        return userAccessDomainId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return userAccessDomainId;
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
    public int compare(UserAccessDomain object1, UserAccessDomain object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((userAccessDomain == null ? " " : userAccessDomain) + ",");
        sb.append((domainName == null ? " " : domainName) + ",");
        sb.append((domainDescription == null ? " " : domainDescription));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (userAccessDomainId == null) {
            return super.hashCode();
        } else {
            return userAccessDomainId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.UserAccessDomain other = (com.app.app.shared.authentication.UserAccessDomain) obj;
            if (userAccessDomainId == null) {
                return false;
            } else if (!userAccessDomainId.equals(other.userAccessDomainId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
