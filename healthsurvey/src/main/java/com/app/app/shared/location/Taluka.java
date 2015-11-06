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

@Table(name = "ast_Taluka_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "Taluka.DefaultFinders", query = "select e from Taluka e where e.systemInfo.activeStatus=1 and e.countryId LIKE :countryId and e.stateId LIKE :stateId and e.regionId LIKE :regionId and e.districtId LIKE :districtId and e.talukaName LIKE :talukaName and e.talukaCode LIKE :talukaCode"), @javax.persistence.NamedQuery(name = "Taluka.findByCountryId", query = "select e from Taluka e where e.systemInfo.activeStatus=1 and e.countryId=:countryId"), @javax.persistence.NamedQuery(name = "Taluka.findByStateId", query = "select e from Taluka e where e.systemInfo.activeStatus=1 and e.stateId=:stateId"), @javax.persistence.NamedQuery(name = "Taluka.findByRegionId", query = "select e from Taluka e where e.systemInfo.activeStatus=1 and e.regionId=:regionId"), @javax.persistence.NamedQuery(name = "Taluka.findByDistrictId", query = "select e from Taluka e where e.systemInfo.activeStatus=1 and e.districtId=:districtId"), @javax.persistence.NamedQuery(name = "Taluka.findById", query = "select e from Taluka e where e.systemInfo.activeStatus=1 and e.talukaId =:talukaId") })
public class Taluka implements Serializable, CommonEntityInterface, Comparator<Taluka> {

    @Column(name = "talukaName")
    @JsonProperty("talukaName")
    @NotNull
    @Size(min = 0, max = 256)
    private String talukaName;

    @Column(name = "talukaCode")
    @JsonProperty("talukaCode")
    @NotNull
    @Size(min = 0, max = 32)
    private String talukaCode;

    @Column(name = "talukaDescription")
    @JsonProperty("talukaDescription")
    @Size(min = 0, max = 128)
    private String talukaDescription;

    @Column(name = "talukaFlag")
    @JsonProperty("talukaFlag")
    @Size(min = 0, max = 128)
    private String talukaFlag;

    @Column(name = "talukaLatitude")
    @JsonProperty("talukaLatitude")
    @Min(0)
    @Max(11)
    private Integer talukaLatitude;

    @Column(name = "talukaLongitude")
    @JsonProperty("talukaLongitude")
    @Min(0)
    @Max(11)
    private Integer talukaLongitude;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "talukaId")
    @JsonProperty("talukaId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String talukaId;

    @Column(name = "countryId")
    @JsonProperty("countryId")
    private String countryId;

    @Column(name = "stateId")
    @JsonProperty("stateId")
    private String stateId;

    @Column(name = "regionId")
    @JsonProperty("regionId")
    private String regionId;

    @Column(name = "districtId")
    @JsonProperty("districtId")
    private String districtId;

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

    public String getTalukaName() {
        return talukaName;
    }

    public void setTalukaName(String _talukaName) {
        if (_talukaName != null) {
            this.talukaName = _talukaName;
        }
    }

    public String getTalukaCode() {
        return talukaCode;
    }

    public void setTalukaCode(String _talukaCode) {
        if (_talukaCode != null) {
            this.talukaCode = _talukaCode;
        }
    }

    public String getTalukaDescription() {
        return talukaDescription;
    }

    public void setTalukaDescription(String _talukaDescription) {
        this.talukaDescription = _talukaDescription;
    }

    public String getTalukaFlag() {
        return talukaFlag;
    }

    public void setTalukaFlag(String _talukaFlag) {
        this.talukaFlag = _talukaFlag;
    }

    public Integer getTalukaLatitude() {
        return talukaLatitude;
    }

    public void setTalukaLatitude(Integer _talukaLatitude) {
        this.talukaLatitude = _talukaLatitude;
    }

    public Integer getTalukaLongitude() {
        return talukaLongitude;
    }

    public void setTalukaLongitude(Integer _talukaLongitude) {
        this.talukaLongitude = _talukaLongitude;
    }

    public String getPrimaryKey() {
        return talukaId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return talukaId;
    }

    public String getTalukaId() {
        return talukaId;
    }

    public void setTalukaId(String _talukaId) {
        this.talukaId = _talukaId;
    }

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String _countryId) {
        this.countryId = _countryId;
    }

    public String getStateId() {
        return stateId;
    }

    public void setStateId(String _stateId) {
        this.stateId = _stateId;
    }

    public String getRegionId() {
        return regionId;
    }

    public void setRegionId(String _regionId) {
        this.regionId = _regionId;
    }

    public String getDistrictId() {
        return districtId;
    }

    public void setDistrictId(String _districtId) {
        this.districtId = _districtId;
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
    public int compare(Taluka object1, Taluka object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((talukaName == null ? " " : talukaName) + ",");
        sb.append((talukaCode == null ? " " : talukaCode));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (talukaId == null) {
            return super.hashCode();
        } else {
            return talukaId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.location.Taluka other = (com.app.app.shared.location.Taluka) obj;
            if (talukaId == null) {
                return false;
            } else if (!talukaId.equals(other.talukaId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
