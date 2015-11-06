package com.app.app.shared.authentication;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import com.spartan.shield.server.authentication.interfaces.PassRecoveryInterface;
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
import javax.persistence.NamedQueries;

@Table(name = "ast_PassRecovery_TP")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "PassRecovery.findByUserId", query = "select e from PassRecovery e where e.systemInfo.activeStatus=1 and e.user.userId=:userId"), @javax.persistence.NamedQuery(name = "PassRecovery.findByQuestionId", query = "select e from PassRecovery e where e.systemInfo.activeStatus=1 and e.questionId=:questionId"), @javax.persistence.NamedQuery(name = "PassRecovery.findById", query = "select e from PassRecovery e where e.systemInfo.activeStatus=1 and e.passRecoveryId =:passRecoveryId") })
public class PassRecovery implements Serializable, CommonEntityInterface, PassRecoveryInterface, Comparator<PassRecovery> {

    @Column(name = "answer")
    @JsonProperty("answer")
    @NotNull
    @Size(min = 0, max = 256)
    private String answer;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "passRecoveryId")
    @JsonProperty("passRecoveryId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String passRecoveryId;

    @Column(name = "questionId")
    @JsonProperty("questionId")
    private String questionId;

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

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String _answer) {
        if (_answer != null) {
            this.answer = _answer;
        }
    }

    public String getPrimaryKey() {
        return passRecoveryId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return passRecoveryId;
    }

    public String getPassRecoveryId() {
        return passRecoveryId;
    }

    public void setPassRecoveryId(String _passRecoveryId) {
        this.passRecoveryId = _passRecoveryId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String _questionId) {
        this.questionId = _questionId;
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

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((questionId.toString() == null ? " " : questionId.toString()) + ",");
        sb.append((answer == null ? " " : answer));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (passRecoveryId == null) {
            return super.hashCode();
        } else {
            return passRecoveryId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authentication.PassRecovery other = (com.app.app.shared.authentication.PassRecovery) obj;
            if (passRecoveryId == null) {
                return false;
            } else if (!passRecoveryId.equals(other.passRecoveryId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }

    @Transient
    @JsonIgnore
    private String fieldName;

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String _fieldName) {
        this.fieldName = _fieldName;
    }

    @Override
    public int compare(PassRecovery object1, PassRecovery object2) {
        switch(((fieldName))) {
            case "passRecoveryId":
                return (object1.getPassRecoveryId().compareTo(object2.getPassRecoveryId()) == 0) ? 0 : ((object1.getPassRecoveryId().compareTo(object2.getPassRecoveryId()) > 0) ? 1 : -1);
        }
        return 0;
    }
}
