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
import javax.persistence.Id;
import java.util.List;
import javax.persistence.JoinTable;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
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

@Table(name = "ast_SurveyQuestion_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "SurveyQuestion.findBySurveyQuestionGroupId", query = "select e from SurveyQuestion e where e.systemInfo.activeStatus=1 and e.surveyQuestionGroupId=:surveyQuestionGroupId"), @javax.persistence.NamedQuery(name = "SurveyQuestion.findById", query = "select e from SurveyQuestion e where e.systemInfo.activeStatus=1 and e.surveyQuestionId =:surveyQuestionId"), @javax.persistence.NamedQuery(name = "ChdQuestions", query = "SELECT surveyQuestion FROM SurveyQuestion AS surveyQuestion WHERE surveyQuestion.surveyQuestionGroupId = 1 "), @javax.persistence.NamedQuery(name = "BehaviourQuestions", query = "SELECT surveyQuestion FROM SurveyQuestion AS surveyQuestion WHERE surveyQuestion.surveyQuestionGroupId = 3 "), @javax.persistence.NamedQuery(name = "GeneralQuestions", query = "SELECT surveyQuestion FROM SurveyQuestion AS surveyQuestion WHERE surveyQuestion.surveyQuestionGroupId = 4 "), @javax.persistence.NamedQuery(name = "LifeStyleQuestions", query = "SELECT surveyQuestion FROM SurveyQuestion AS surveyQuestion WHERE surveyQuestion.surveyQuestionGroupId = 2 ") })
public class SurveyQuestion implements Serializable, CommonEntityInterface, Comparator<SurveyQuestion> {

    @Column(name = "surveyQuestionName")
    @JsonProperty("surveyQuestionName")
    @NotNull
    @Size(min = 0, max = 256)
    private String surveyQuestionName;

    @Column(name = "surveyQuestionDesc")
    @JsonProperty("surveyQuestionDesc")
    @NotNull
    @Size(min = 0, max = 256)
    private String surveyQuestionDesc;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "surveyQuestionId")
    @JsonProperty("surveyQuestionId")
    @GeneratedValue(generator = "UUIDGenerator")
    private String surveyQuestionId;

    @Column(name = "surveyQuestionGroupId")
    @JsonProperty("surveyQuestionGroupId")
    private Integer surveyQuestionGroupId;

    @JoinTable(name = "ast_SurveyQueAnsBridge_B", joinColumns = { @javax.persistence.JoinColumn(name = "surveyQuestionId", referencedColumnName = "surveyQuestionId") }, inverseJoinColumns = { @javax.persistence.JoinColumn(name = "surveyAnswerId", referencedColumnName = "surveyAnswerId") })
    @OneToMany(cascade = CascadeType.ALL)
    private List<SurveyAnswer> surveyAnswer;

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

    public String getSurveyQuestionName() {
        return surveyQuestionName;
    }

    public void setSurveyQuestionName(String _surveyQuestionName) {
        if (_surveyQuestionName != null) {
            this.surveyQuestionName = _surveyQuestionName;
        }
    }

    public String getSurveyQuestionDesc() {
        return surveyQuestionDesc;
    }

    public void setSurveyQuestionDesc(String _surveyQuestionDesc) {
        if (_surveyQuestionDesc != null) {
            this.surveyQuestionDesc = _surveyQuestionDesc;
        }
    }

    public String getPrimaryKey() {
        return surveyQuestionId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return surveyQuestionId;
    }

    public String getSurveyQuestionId() {
        return surveyQuestionId;
    }

    public void setSurveyQuestionId(String _surveyQuestionId) {
        this.surveyQuestionId = _surveyQuestionId;
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

    public SurveyQuestion addSurveyAnswer(SurveyAnswer _surveyAnswer) {
        if (this.surveyAnswer == null) {
            this.surveyAnswer = new java.util.ArrayList<com.app.app.shared.health.SurveyAnswer>();
        }
        if (_surveyAnswer != null) {
            this.surveyAnswer.add(_surveyAnswer);
        }
        return this;
    }

    public SurveyQuestion removeSurveyAnswer(SurveyAnswer _surveyAnswer) {
        if (this.surveyAnswer != null) {
            this.surveyAnswer.remove(_surveyAnswer);
        }
        return this;
    }

    public SurveyQuestion addAllSurveyAnswer(List<SurveyAnswer> _surveyAnswer) {
        if (this.surveyAnswer == null) {
            this.surveyAnswer = new java.util.ArrayList<com.app.app.shared.health.SurveyAnswer>();
        }
        if (_surveyAnswer != null) {
            this.surveyAnswer.addAll(_surveyAnswer);
        }
        return this;
    }

    @JsonIgnore
    public Integer sizeOfSurveyAnswer() {
        if (this.surveyAnswer != null) {
            return this.surveyAnswer.size();
        }
        return 0;
    }

    public List<SurveyAnswer> getSurveyAnswer() {
        return surveyAnswer;
    }

    public void setSurveyAnswer(List<SurveyAnswer> _surveyAnswer) {
        this.surveyAnswer = _surveyAnswer;
    }

    @JsonIgnore
    public List<SurveyAnswer> getDeletedSurveyAnswerList() {
        List<SurveyAnswer> surveyanswerToRemove = new java.util.ArrayList<SurveyAnswer>();
        for (SurveyAnswer _surveyanswer : surveyAnswer) {
            if (_surveyanswer.isHardDelete()) {
                surveyanswerToRemove.add(_surveyanswer);
            }
        }
        surveyAnswer.removeAll(surveyanswerToRemove);
        return surveyanswerToRemove;
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
        setValidatorsurveyAnswer(_validateFactory);
    }

    private void setValidatorsurveyAnswer(EntityValidatorHelper<Object> _validateFactory) {
        for (int i = 0; i < surveyAnswer.size(); i++) {
            surveyAnswer.get(i).setEntityValidator(_validateFactory);
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
        if (this.surveyAnswer == null) {
            this.surveyAnswer = new java.util.ArrayList<SurveyAnswer>();
        }
        for (SurveyAnswer _surveyAnswer : surveyAnswer) {
            _surveyAnswer.setEntityAudit(customerId, userId, recordType);
            _surveyAnswer.setSystemInformation(recordType);
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
        if (this.surveyAnswer == null) {
            this.surveyAnswer = new java.util.ArrayList<SurveyAnswer>();
        }
        for (SurveyAnswer _surveyAnswer : surveyAnswer) {
            _surveyAnswer.setEntityAudit(customerId, userId);
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
    public int compare(SurveyQuestion object1, SurveyQuestion object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((surveyQuestionName == null ? " " : surveyQuestionName));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (surveyQuestionId == null) {
            return super.hashCode();
        } else {
            return surveyQuestionId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.health.SurveyQuestion other = (com.app.app.shared.health.SurveyQuestion) obj;
            if (surveyQuestionId == null) {
                return false;
            } else if (!surveyQuestionId.equals(other.surveyQuestionId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
