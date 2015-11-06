package com.app.app.shared.location;
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

@Table(name = "ast_Timezone_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "Timezone.DefaultFinders", query = "select e from Timezone e where e.systemInfo.activeStatus=1 and e.utcdifference BETWEEN :minutcdifference AND :maxutcdifference"), @javax.persistence.NamedQuery(name = "Timezone.findById", query = "select e from Timezone e where e.systemInfo.activeStatus=1 and e.timeZoneId =:timeZoneId") })
public class Timezone implements Serializable, CommonEntityInterface, Comparator<Timezone> {

    @Column(name = "utcdifference")
    @JsonProperty("utcdifference")
    @NotNull
    @Min(0)
    @Max(11)
    private Integer utcdifference;

    @Column(name = "gmtLabel")
    @JsonProperty("gmtLabel")
    @Size(min = 0, max = 256)
    private String gmtLabel;

    @Column(name = "timeZoneLabel")
    @JsonProperty("timeZoneLabel")
    @Size(min = 0, max = 256)
    private String timeZoneLabel;

    @Column(name = "country")
    @JsonProperty("country")
    @Size(min = 0, max = 256)
    private String country;

    @Column(name = "cities")
    @JsonProperty("cities")
    @Size(min = 0, max = 256)
    private String cities;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "timeZoneId")
    @JsonProperty("timeZoneId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String timeZoneId;

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

    public Integer getUtcdifference() {
        return utcdifference;
    }

    public void setUtcdifference(Integer _utcdifference) {
        if (_utcdifference != null) {
            this.utcdifference = _utcdifference;
        }
    }

    public String getGmtLabel() {
        return gmtLabel;
    }

    public void setGmtLabel(String _gmtLabel) {
        this.gmtLabel = _gmtLabel;
    }

    public String getTimeZoneLabel() {
        return timeZoneLabel;
    }

    public void setTimeZoneLabel(String _timeZoneLabel) {
        this.timeZoneLabel = _timeZoneLabel;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String _country) {
        this.country = _country;
    }

    public String getCities() {
        return cities;
    }

    public void setCities(String _cities) {
        this.cities = _cities;
    }

    public String getPrimaryKey() {
        return timeZoneId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return timeZoneId;
    }

    public String getTimeZoneId() {
        return timeZoneId;
    }

    public void setTimeZoneId(String _timeZoneId) {
        this.timeZoneId = _timeZoneId;
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
    public int compare(Timezone object1, Timezone object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((utcdifference == null ? " " : utcdifference) + ",");
        sb.append((timeZoneLabel == null ? " " : timeZoneLabel));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (timeZoneId == null) {
            return super.hashCode();
        } else {
            return timeZoneId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.location.Timezone other = (com.app.app.shared.location.Timezone) obj;
            if (timeZoneId == null) {
                return false;
            } else if (!timeZoneId.equals(other.timeZoneId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
