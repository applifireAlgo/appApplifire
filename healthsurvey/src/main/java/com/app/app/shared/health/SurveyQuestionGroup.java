package com.app.app.shared.health;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.Transient;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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

@Table(name = "ast_SurveyQuestionGroup_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "SurveyQuestionGroup.findById", query = "select e from SurveyQuestionGroup e where e.systemInfo.activeStatus=1 and e.surveyQuestionGroupId =:surveyQuestionGroupId") })
public class SurveyQuestionGroup implements Serializable, CommonEntityInterface, Comparator<SurveyQuestionGroup> {

    @Column(name = "surveyQuestionGroupName")
    @JsonProperty("surveyQuestionGroupName")
    @NotNull
    @Size(min = 0, max = 256)
    private String surveyQuestionGroupName;

    @Column(name = "surveyQuestionGroupDesc")
    @JsonProperty("surveyQuestionGroupDesc")
    @NotNull
    private String surveyQuestionGroupDesc;

    @Transient
    private Integer primaryKey;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "surveyQuestionGroupId")
    @JsonProperty("surveyQuestionGroupId")
    private Integer surveyQuestionGroupId;

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

    public String getSurveyQuestionGroupName() {
        return surveyQuestionGroupName;
    }

    public void setSurveyQuestionGroupName(String _surveyQuestionGroupName) {
        if (_surveyQuestionGroupName != null) {
            this.surveyQuestionGroupName = _surveyQuestionGroupName;
        }
    }

    public String getSurveyQuestionGroupDesc() {
        return surveyQuestionGroupDesc;
    }

    public void setSurveyQuestionGroupDesc(String _surveyQuestionGroupDesc) {
        if (_surveyQuestionGroupDesc != null) {
            this.surveyQuestionGroupDesc = _surveyQuestionGroupDesc;
        }
    }

    public Integer getPrimaryKey() {
        return surveyQuestionGroupId;
    }

    public void setPrimaryKey(Integer _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public Integer _getPrimarykey() {
        return surveyQuestionGroupId;
    }

    public Integer getSurveyQuestionGroupId() {
        return surveyQuestionGroupId;
    }

    public void setSurveyQuestionGroupId(Integer _surveyQuestionGroupId) {
        this.surveyQuestionGroupId = _surveyQuestionGroupId;
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
    public int compare(SurveyQuestionGroup object1, SurveyQuestionGroup object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((surveyQuestionGroupName == null ? " " : surveyQuestionGroupName));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (surveyQuestionGroupId == null) {
            return super.hashCode();
        } else {
            return surveyQuestionGroupId;
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.health.SurveyQuestionGroup other = (com.app.app.shared.health.SurveyQuestionGroup) obj;
            if (surveyQuestionGroupId == null) {
                return false;
            } else if (!surveyQuestionGroupId.equals(other.surveyQuestionGroupId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
