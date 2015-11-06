package com.app.app.shared.authentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.spartan.shield.server.authentication.interfaces.PasswordAlgoInterface;
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

@Table(name = "ast_PasswordAlgo_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "PasswordAlgo.DefaultFinders", query = "select e from PasswordAlgo e where e.systemInfo.activeStatus=1 and e.algoName LIKE :algoName"), @javax.persistence.NamedQuery(name = "PasswordAlgo.findById", query = "select e from PasswordAlgo e where e.systemInfo.activeStatus=1 and e.algoId =:algoId") })
public class PasswordAlgo implements Serializable, CommonEntityInterface, PasswordAlgoInterface, Comparator<PasswordAlgo> {

    @Column(name = "algorithm")
    @JsonProperty("algorithm")
    @NotNull
    @Min(0)
    @Max(11)
    private Integer algorithm;

    @Column(name = "algoName")
    @JsonProperty("algoName")
    @NotNull
    @Size(min = 0, max = 256)
    private String algoName;

    @Column(name = "algoDescription")
    @JsonProperty("algoDescription")
    @Size(min = 0, max = 256)
    private String algoDescription;

    @Column(name = "algoIcon")
    @JsonProperty("algoIcon")
    @Size(min = 0, max = 64)
    private String algoIcon;

    @Column(name = "algoHelp")
    @JsonProperty("algoHelp")
    @Size(min = 0, max = 256)
    private String algoHelp;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "algoId")
    @JsonProperty("algoId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String algoId;

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

    public Integer getAlgorithm() {
        return algorithm;
    }

    public void setAlgorithm(Integer _algorithm) {
        if (_algorithm != null) {
            this.algorithm = _algorithm;
        }
    }

    public String getAlgoName() {
        return algoName;
    }

    public void setAlgoName(String _algoName) {
        if (_algoName != null) {
            this.algoName = _algoName;
        }
    }

    public String getAlgoDescription() {
        return algoDescription;
    }

    public void setAlgoDescription(String _algoDescription) {
        this.algoDescription = _algoDescription;
    }

    public String getAlgoIcon() {
        return algoIcon;
    }

    public void setAlgoIcon(String _algoIcon) {
        this.algoIcon = _algoIcon;
    }

    public String getAlgoHelp() {
        return algoHelp;
    }

    public void setAlgoHelp(String _algoHelp) {
        this.algoHelp = _algoHelp;
    }

    public String getPrimaryKey() {
        return algoId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return algoId;
    }

    public String getAlgoId() {
        return algoId;
    }

    public void setAlgoId(String _algoId) {
        this.algoId = _algoId;
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
    public int compare(PasswordAlgo object1, PasswordAlgo object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((algoName == null ? " " : algoName));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (algoId == null) {
            return super.hashCode();
        } else {
            return algoId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.PasswordAlgo other = (com.app.app.shared.authentication.PasswordAlgo) obj;
            if (algoId == null) {
                return false;
            } else if (!algoId.equals(other.algoId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
