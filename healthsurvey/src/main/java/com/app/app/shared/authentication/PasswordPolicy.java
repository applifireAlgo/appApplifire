package com.app.app.shared.authentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.spartan.shield.server.authentication.interfaces.PasswordPolicyInterface;
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

@Table(name = "ast_PasswordPolicy_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "PasswordPolicy.DefaultFinders", query = "select e from PasswordPolicy e where e.systemInfo.activeStatus=1 and e.policyName LIKE :policyName"), @javax.persistence.NamedQuery(name = "PasswordPolicy.findById", query = "select e from PasswordPolicy e where e.systemInfo.activeStatus=1 and e.policyId =:policyId") })
public class PasswordPolicy implements Serializable, CommonEntityInterface, PasswordPolicyInterface, Comparator<PasswordPolicy> {

    @Column(name = "policyName")
    @JsonProperty("policyName")
    @NotNull
    @Size(min = 0, max = 256)
    private String policyName;

    @Column(name = "policyDescription")
    @JsonProperty("policyDescription")
    @Size(min = 0, max = 256)
    private String policyDescription;

    @Column(name = "maxPwdLength")
    @JsonProperty("maxPwdLength")
    @Min(0)
    @Max(32)
    private Integer maxPwdLength;

    @Column(name = "minPwdLength")
    @JsonProperty("minPwdLength")
    @NotNull
    @Min(0)
    @Max(11)
    private Integer minPwdLength;

    @Column(name = "minCapitalLetters")
    @JsonProperty("minCapitalLetters")
    @Min(0)
    @Max(11)
    private Integer minCapitalLetters;

    @Column(name = "minSmallLetters")
    @JsonProperty("minSmallLetters")
    @Min(0)
    @Max(11)
    private Integer minSmallLetters;

    @Column(name = "minNumericValues")
    @JsonProperty("minNumericValues")
    @Min(0)
    @Max(11)
    private Integer minNumericValues;

    @Column(name = "minSpecialLetters")
    @JsonProperty("minSpecialLetters")
    @Min(0)
    @Max(11)
    private Integer minSpecialLetters;

    @Column(name = "allowedSpecialLetters")
    @JsonProperty("allowedSpecialLetters")
    @Size(min = 0, max = 256)
    private String allowedSpecialLetters;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "policyId")
    @JsonProperty("policyId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String policyId;

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

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String _policyName) {
        if (_policyName != null) {
            this.policyName = _policyName;
        }
    }

    public String getPolicyDescription() {
        return policyDescription;
    }

    public void setPolicyDescription(String _policyDescription) {
        this.policyDescription = _policyDescription;
    }

    public Integer getMaxPwdLength() {
        return maxPwdLength;
    }

    public void setMaxPwdLength(Integer _maxPwdLength) {
        this.maxPwdLength = _maxPwdLength;
    }

    public Integer getMinPwdLength() {
        return minPwdLength;
    }

    public void setMinPwdLength(Integer _minPwdLength) {
        if (_minPwdLength != null) {
            this.minPwdLength = _minPwdLength;
        }
    }

    public Integer getMinCapitalLetters() {
        return minCapitalLetters;
    }

    public void setMinCapitalLetters(Integer _minCapitalLetters) {
        this.minCapitalLetters = _minCapitalLetters;
    }

    public Integer getMinSmallLetters() {
        return minSmallLetters;
    }

    public void setMinSmallLetters(Integer _minSmallLetters) {
        this.minSmallLetters = _minSmallLetters;
    }

    public Integer getMinNumericValues() {
        return minNumericValues;
    }

    public void setMinNumericValues(Integer _minNumericValues) {
        this.minNumericValues = _minNumericValues;
    }

    public Integer getMinSpecialLetters() {
        return minSpecialLetters;
    }

    public void setMinSpecialLetters(Integer _minSpecialLetters) {
        this.minSpecialLetters = _minSpecialLetters;
    }

    public String getAllowedSpecialLetters() {
        return allowedSpecialLetters;
    }

    public void setAllowedSpecialLetters(String _allowedSpecialLetters) {
        this.allowedSpecialLetters = _allowedSpecialLetters;
    }

    public String getPrimaryKey() {
        return policyId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return policyId;
    }

    public String getPolicyId() {
        return policyId;
    }

    public void setPolicyId(String _policyId) {
        this.policyId = _policyId;
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
    public int compare(PasswordPolicy object1, PasswordPolicy object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((policyName == null ? " " : policyName));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (policyId == null) {
            return super.hashCode();
        } else {
            return policyId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.PasswordPolicy other = (com.app.app.shared.authentication.PasswordPolicy) obj;
            if (policyId == null) {
                return false;
            } else if (!policyId.equals(other.policyId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
