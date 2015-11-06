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

@Table(name = "ast_Region_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "Region.DefaultFinders", query = "select e from Region e where e.systemInfo.activeStatus=1 and e.countryId LIKE :countryId and e.stateId LIKE :stateId and e.regionName LIKE :regionName and e.regionCode1 BETWEEN :minregionCode1 AND :maxregionCode1 and e.regionCodeChar2 LIKE :regionCodeChar2"), @javax.persistence.NamedQuery(name = "Region.findByCountryId", query = "select e from Region e where e.systemInfo.activeStatus=1 and e.countryId=:countryId"), @javax.persistence.NamedQuery(name = "Region.findByStateId", query = "select e from Region e where e.systemInfo.activeStatus=1 and e.stateId=:stateId"), @javax.persistence.NamedQuery(name = "Region.findById", query = "select e from Region e where e.systemInfo.activeStatus=1 and e.regionId =:regionId") })
public class Region implements Serializable, CommonEntityInterface, Comparator<Region> {

    @Column(name = "regionName")
    @JsonProperty("regionName")
    @NotNull
    @Size(min = 0, max = 256)
    private String regionName;

    @Column(name = "regionCode1")
    @JsonProperty("regionCode1")
    @NotNull
    @Min(0)
    @Max(3)
    private Integer regionCode1;

    @Column(name = "regionCodeChar2")
    @JsonProperty("regionCodeChar2")
    @NotNull
    @Size(min = 0, max = 32)
    private String regionCodeChar2;

    @Column(name = "regionDescription")
    @JsonProperty("regionDescription")
    @Size(min = 0, max = 256)
    private String regionDescription;

    @Column(name = "regionFlag")
    @JsonProperty("regionFlag")
    @Size(min = 0, max = 128)
    private String regionFlag;

    @Column(name = "regionLatitude")
    @JsonProperty("regionLatitude")
    @Min(0)
    @Max(11)
    private Integer regionLatitude;

    @Column(name = "regionLongitude")
    @JsonProperty("regionLongitude")
    @Min(0)
    @Max(11)
    private Integer regionLongitude;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "regionId")
    @JsonProperty("regionId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String regionId;

    @Column(name = "countryId")
    @JsonProperty("countryId")
    private String countryId;

    @Column(name = "stateId")
    @JsonProperty("stateId")
    private String stateId;

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

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String _regionName) {
        if (_regionName != null) {
            this.regionName = _regionName;
        }
    }

    public Integer getRegionCode1() {
        return regionCode1;
    }

    public void setRegionCode1(Integer _regionCode1) {
        if (_regionCode1 != null) {
            this.regionCode1 = _regionCode1;
        }
    }

    public String getRegionCodeChar2() {
        return regionCodeChar2;
    }

    public void setRegionCodeChar2(String _regionCodeChar2) {
        if (_regionCodeChar2 != null) {
            this.regionCodeChar2 = _regionCodeChar2;
        }
    }

    public String getRegionDescription() {
        return regionDescription;
    }

    public void setRegionDescription(String _regionDescription) {
        this.regionDescription = _regionDescription;
    }

    public String getRegionFlag() {
        return regionFlag;
    }

    public void setRegionFlag(String _regionFlag) {
        this.regionFlag = _regionFlag;
    }

    public Integer getRegionLatitude() {
        return regionLatitude;
    }

    public void setRegionLatitude(Integer _regionLatitude) {
        this.regionLatitude = _regionLatitude;
    }

    public Integer getRegionLongitude() {
        return regionLongitude;
    }

    public void setRegionLongitude(Integer _regionLongitude) {
        this.regionLongitude = _regionLongitude;
    }

    public String getPrimaryKey() {
        return regionId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return regionId;
    }

    public String getRegionId() {
        return regionId;
    }

    public void setRegionId(String _regionId) {
        this.regionId = _regionId;
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
    public int compare(Region object1, Region object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((regionName == null ? " " : regionName) + ",");
        sb.append((regionCode1 == null ? " " : regionCode1) + ",");
        sb.append((regionCodeChar2 == null ? " " : regionCodeChar2));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (regionId == null) {
            return super.hashCode();
        } else {
            return regionId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.location.Region other = (com.app.app.shared.location.Region) obj;
            if (regionId == null) {
                return false;
            } else if (!regionId.equals(other.regionId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
