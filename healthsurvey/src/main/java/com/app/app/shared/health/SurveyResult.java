package com.app.app.shared.health;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.sql.Date;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
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

@Table(name = "ast_SurveyResult_T")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "SurveyResult.findBySurveyQuestionId", query = "select e from SurveyResult e where e.systemInfo.activeStatus=1 and e.surveyQuestionId=:surveyQuestionId"), @javax.persistence.NamedQuery(name = "SurveyResult.findBySurveyAnswerId", query = "select e from SurveyResult e where e.systemInfo.activeStatus=1 and e.surveyAnswerId=:surveyAnswerId"), @javax.persistence.NamedQuery(name = "SurveyResult.findByContactId", query = "select e from SurveyResult e where e.systemInfo.activeStatus=1 and e.contactId=:contactId"), @javax.persistence.NamedQuery(name = "SurveyResult.findById", query = "select e from SurveyResult e where e.systemInfo.activeStatus=1 and e.surveyResultId =:surveyResultId") })
public class SurveyResult implements Serializable, CommonEntityInterface, Comparator<SurveyResult> {

    @Column(name = "surveyDate")
    @JsonProperty("surveyDate")
    @NotNull
    private Date surveyDate;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "surveyResultId")
    @JsonProperty("surveyResultId")
    @GeneratedValue(generator = "UUIDGenerator")
    private String surveyResultId;

    @Column(name = "surveyQuestionId")
    @JsonProperty("surveyQuestionId")
    private String surveyQuestionId;

    @Column(name = "surveyAnswerId")
    @JsonProperty("surveyAnswerId")
    private String surveyAnswerId;

    @Column(name = "contactId")
    @JsonProperty("contactId")
    private String contactId;

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

    public Date getSurveyDate() {
        return surveyDate;
    }

    public void setSurveyDate(Date _surveyDate) {
        if (_surveyDate != null) {
            this.surveyDate = _surveyDate;
        }
    }

    public String getPrimaryKey() {
        return surveyResultId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return surveyResultId;
    }

    public String getSurveyResultId() {
        return surveyResultId;
    }

    public void setSurveyResultId(String _surveyResultId) {
        this.surveyResultId = _surveyResultId;
    }

    public String getSurveyQuestionId() {
        return surveyQuestionId;
    }

    public void setSurveyQuestionId(String _surveyQuestionId) {
        this.surveyQuestionId = _surveyQuestionId;
    }

    public String getSurveyAnswerId() {
        return surveyAnswerId;
    }

    public void setSurveyAnswerId(String _surveyAnswerId) {
        this.surveyAnswerId = _surveyAnswerId;
    }

    public String getContactId() {
        return contactId;
    }

    public void setContactId(String _contactId) {
        this.contactId = _contactId;
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
    public int compare(SurveyResult object1, SurveyResult object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (surveyResultId == null) {
            return super.hashCode();
        } else {
            return surveyResultId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.health.SurveyResult other = (com.app.app.shared.health.SurveyResult) obj;
            if (surveyResultId == null) {
                return false;
            } else if (!surveyResultId.equals(other.surveyResultId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
