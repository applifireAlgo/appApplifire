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

@Table(name = "ast_District_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "District.DefaultFinders", query = "select e from District e where e.systemInfo.activeStatus=1 and e.countryId LIKE :countryId and e.stateId LIKE :stateId and e.regionId LIKE :regionId and e.code2 LIKE :code2"), @javax.persistence.NamedQuery(name = "District.findByCountryId", query = "select e from District e where e.systemInfo.activeStatus=1 and e.countryId=:countryId"), @javax.persistence.NamedQuery(name = "District.findByStateId", query = "select e from District e where e.systemInfo.activeStatus=1 and e.stateId=:stateId"), @javax.persistence.NamedQuery(name = "District.findByRegionId", query = "select e from District e where e.systemInfo.activeStatus=1 and e.regionId=:regionId"), @javax.persistence.NamedQuery(name = "District.findById", query = "select e from District e where e.systemInfo.activeStatus=1 and e.districtId =:districtId") })
public class District implements Serializable, CommonEntityInterface, Comparator<District> {

    @Column(name = "Name")
    @JsonProperty("name")
    @NotNull
    @Size(min = 0, max = 256)
    private String name;

    @Column(name = "code2")
    @JsonProperty("code2")
    @NotNull
    @Size(min = 0, max = 32)
    private String code2;

    @Column(name = "districtDescription")
    @JsonProperty("districtDescription")
    @Size(min = 0, max = 128)
    private String districtDescription;

    @Column(name = "districtFlag")
    @JsonProperty("districtFlag")
    @Size(min = 0, max = 128)
    private String districtFlag;

    @Column(name = "districtLatitude")
    @JsonProperty("districtLatitude")
    @Min(0)
    @Max(11)
    private Integer districtLatitude;

    @Column(name = "districtLongitude")
    @JsonProperty("districtLongitude")
    @Min(0)
    @Max(11)
    private Integer districtLongitude;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "districtId")
    @JsonProperty("districtId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String districtId;

    @Column(name = "countryId")
    @JsonProperty("countryId")
    private String countryId;

    @Column(name = "stateId")
    @JsonProperty("stateId")
    private String stateId;

    @Column(name = "regionId")
    @JsonProperty("regionId")
    private String regionId;

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

    public String getName() {
        return name;
    }

    public void setName(String _name) {
        if (_name != null) {
            this.name = _name;
        }
    }

    public String getCode2() {
        return code2;
    }

    public void setCode2(String _code2) {
        if (_code2 != null) {
            this.code2 = _code2;
        }
    }

    public String getDistrictDescription() {
        return districtDescription;
    }

    public void setDistrictDescription(String _districtDescription) {
        this.districtDescription = _districtDescription;
    }

    public String getDistrictFlag() {
        return districtFlag;
    }

    public void setDistrictFlag(String _districtFlag) {
        this.districtFlag = _districtFlag;
    }

    public Integer getDistrictLatitude() {
        return districtLatitude;
    }

    public void setDistrictLatitude(Integer _districtLatitude) {
        this.districtLatitude = _districtLatitude;
    }

    public Integer getDistrictLongitude() {
        return districtLongitude;
    }

    public void setDistrictLongitude(Integer _districtLongitude) {
        this.districtLongitude = _districtLongitude;
    }

    public String getPrimaryKey() {
        return districtId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return districtId;
    }

    public String getDistrictId() {
        return districtId;
    }

    public void setDistrictId(String _districtId) {
        this.districtId = _districtId;
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
    public int compare(District object1, District object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((name == null ? " " : name) + ",");
        sb.append((code2 == null ? " " : code2));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (districtId == null) {
            return super.hashCode();
        } else {
            return districtId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.location.District other = (com.app.app.shared.location.District) obj;
            if (districtId == null) {
                return false;
            } else if (!districtId.equals(other.districtId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
