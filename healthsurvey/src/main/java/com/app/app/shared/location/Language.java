package com.app.app.shared.location;
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

@Table(name = "ast_Language_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "Language.findById", query = "select e from Language e where e.systemInfo.activeStatus=1 and e.languageId =:languageId") })
public class Language implements Serializable, CommonEntityInterface, Comparator<Language> {

    @Column(name = "language")
    @JsonProperty("language")
    @NotNull
    @Size(min = 0, max = 256)
    private String language;

    @Column(name = "languageType")
    @JsonProperty("languageType")
    @Size(min = 0, max = 32)
    private String languageType;

    @Column(name = "languageDescription")
    @JsonProperty("languageDescription")
    @Size(min = 0, max = 256)
    private String languageDescription;

    @Column(name = "languageIcon")
    @JsonProperty("languageIcon")
    @Size(min = 0, max = 128)
    private String languageIcon;

    @Column(name = "alpha2")
    @JsonProperty("alpha2")
    @Size(min = 0, max = 2)
    private String alpha2;

    @Column(name = "alpha3")
    @JsonProperty("alpha3")
    @Size(min = 0, max = 3)
    private String alpha3;

    @Column(name = "alpha4")
    @JsonProperty("alpha4")
    @Size(min = 0, max = 4)
    private String alpha4;

    @Column(name = "alpha4parentid")
    @JsonProperty("alpha4parentid")
    @Min(0)
    @Max(11)
    private Integer alpha4parentid;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "languageId")
    @JsonProperty("languageId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String languageId;

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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String _language) {
        if (_language != null) {
            this.language = _language;
        }
    }

    public String getLanguageType() {
        return languageType;
    }

    public void setLanguageType(String _languageType) {
        this.languageType = _languageType;
    }

    public String getLanguageDescription() {
        return languageDescription;
    }

    public void setLanguageDescription(String _languageDescription) {
        this.languageDescription = _languageDescription;
    }

    public String getLanguageIcon() {
        return languageIcon;
    }

    public void setLanguageIcon(String _languageIcon) {
        this.languageIcon = _languageIcon;
    }

    public String getAlpha2() {
        return alpha2;
    }

    public void setAlpha2(String _alpha2) {
        this.alpha2 = _alpha2;
    }

    public String getAlpha3() {
        return alpha3;
    }

    public void setAlpha3(String _alpha3) {
        this.alpha3 = _alpha3;
    }

    public String getAlpha4() {
        return alpha4;
    }

    public void setAlpha4(String _alpha4) {
        this.alpha4 = _alpha4;
    }

    public Integer getAlpha4parentid() {
        return alpha4parentid;
    }

    public void setAlpha4parentid(Integer _alpha4parentid) {
        this.alpha4parentid = _alpha4parentid;
    }

    public String getPrimaryKey() {
        return languageId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return languageId;
    }

    public String getLanguageId() {
        return languageId;
    }

    public void setLanguageId(String _languageId) {
        this.languageId = _languageId;
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
    public int compare(Language object1, Language object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((language == null ? " " : language));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (languageId == null) {
            return super.hashCode();
        } else {
            return languageId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.location.Language other = (com.app.app.shared.location.Language) obj;
            if (languageId == null) {
                return false;
            } else if (!languageId.equals(other.languageId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
