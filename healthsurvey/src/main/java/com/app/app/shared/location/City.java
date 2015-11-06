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

@Table(name = "ast_City_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "City.findByCountryId", query = "select e from City e where e.systemInfo.activeStatus=1 and e.countryId=:countryId"), @javax.persistence.NamedQuery(name = "City.findByStateId", query = "select e from City e where e.systemInfo.activeStatus=1 and e.stateId=:stateId"), @javax.persistence.NamedQuery(name = "City.findById", query = "select e from City e where e.systemInfo.activeStatus=1 and e.cityId =:cityId") })
public class City implements Serializable, CommonEntityInterface, Comparator<City> {

    @Column(name = "cityName")
    @JsonProperty("cityName")
    @NotNull
    @Size(min = 0, max = 256)
    private String cityName;

    @Column(name = "cityCodeChar2")
    @JsonProperty("cityCodeChar2")
    @NotNull
    @Size(min = 0, max = 32)
    private String cityCodeChar2;

    @Column(name = "cityCode")
    @JsonProperty("cityCode")
    @NotNull
    @Min(0)
    @Max(3)
    private Integer cityCode;

    @Column(name = "cityDescription")
    @JsonProperty("cityDescription")
    @Size(min = 0, max = 128)
    private String cityDescription;

    @Column(name = "cityFlag")
    @JsonProperty("cityFlag")
    @Size(min = 0, max = 128)
    private String cityFlag;

    @Column(name = "cityLatitude")
    @JsonProperty("cityLatitude")
    @Min(0)
    @Max(11)
    private Integer cityLatitude;

    @Column(name = "cityLongitude")
    @JsonProperty("cityLongitude")
    @Min(0)
    @Max(11)
    private Integer cityLongitude;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "cityId")
    @JsonProperty("cityId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String cityId;

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

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String _cityName) {
        if (_cityName != null) {
            this.cityName = _cityName;
        }
    }

    public String getCityCodeChar2() {
        return cityCodeChar2;
    }

    public void setCityCodeChar2(String _cityCodeChar2) {
        if (_cityCodeChar2 != null) {
            this.cityCodeChar2 = _cityCodeChar2;
        }
    }

    public Integer getCityCode() {
        return cityCode;
    }

    public void setCityCode(Integer _cityCode) {
        if (_cityCode != null) {
            this.cityCode = _cityCode;
        }
    }

    public String getCityDescription() {
        return cityDescription;
    }

    public void setCityDescription(String _cityDescription) {
        this.cityDescription = _cityDescription;
    }

    public String getCityFlag() {
        return cityFlag;
    }

    public void setCityFlag(String _cityFlag) {
        this.cityFlag = _cityFlag;
    }

    public Integer getCityLatitude() {
        return cityLatitude;
    }

    public void setCityLatitude(Integer _cityLatitude) {
        this.cityLatitude = _cityLatitude;
    }

    public Integer getCityLongitude() {
        return cityLongitude;
    }

    public void setCityLongitude(Integer _cityLongitude) {
        this.cityLongitude = _cityLongitude;
    }

    public String getPrimaryKey() {
        return cityId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return cityId;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String _cityId) {
        this.cityId = _cityId;
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
    public int compare(City object1, City object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((cityName == null ? " " : cityName) + ",");
        sb.append((cityCodeChar2 == null ? " " : cityCodeChar2) + ",");
        sb.append((cityCode == null ? " " : cityCode));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (cityId == null) {
            return super.hashCode();
        } else {
            return cityId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.location.City other = (com.app.app.shared.location.City) obj;
            if (cityId == null) {
                return false;
            } else if (!cityId.equals(other.cityId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
