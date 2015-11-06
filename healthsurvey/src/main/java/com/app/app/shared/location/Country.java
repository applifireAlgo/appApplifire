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

@Table(name = "ast_Country_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "Country.DefaultFinders", query = "select e from Country e where e.systemInfo.activeStatus=1 and e.countryName LIKE :countryName and e.countryCode1 LIKE :countryCode1"), @javax.persistence.NamedQuery(name = "Country.findById", query = "select e from Country e where e.systemInfo.activeStatus=1 and e.countryId =:countryId") })
public class Country implements Serializable, CommonEntityInterface, Comparator<Country> {

    @Column(name = "countryName")
    @JsonProperty("countryName")
    @NotNull
    @Size(min = 0, max = 128)
    private String countryName;

    @Column(name = "countryCode1")
    @JsonProperty("countryCode1")
    @Size(min = 0, max = 3)
    private String countryCode1;

    @Column(name = "countryCode2")
    @JsonProperty("countryCode2")
    @Size(min = 0, max = 3)
    private String countryCode2;

    @Column(name = "countryFlag")
    @JsonProperty("countryFlag")
    @Size(min = 0, max = 64)
    private String countryFlag;

    @Column(name = "capital")
    @JsonProperty("capital")
    @Size(min = 0, max = 32)
    private String capital;

    @Column(name = "currencyCode")
    @JsonProperty("currencyCode")
    @Size(min = 0, max = 3)
    private String currencyCode;

    @Column(name = "currencyName")
    @JsonProperty("currencyName")
    @Size(min = 0, max = 128)
    private String currencyName;

    @Column(name = "currencySymbol")
    @JsonProperty("currencySymbol")
    @Size(min = 0, max = 32)
    private String currencySymbol;

    @Column(name = "capitalLatitude")
    @JsonProperty("capitalLatitude")
    @Min(0)
    @Max(11)
    private Integer capitalLatitude;

    @Column(name = "capitalLongitude")
    @JsonProperty("capitalLongitude")
    @Min(0)
    @Max(11)
    private Integer capitalLongitude;

    @Column(name = "isoNumeric")
    @JsonProperty("isoNumeric")
    @Min(0)
    @Max(11)
    private Integer isoNumeric;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "countryId")
    @JsonProperty("countryId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String countryId;

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

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String _countryName) {
        if (_countryName != null) {
            this.countryName = _countryName;
        }
    }

    public String getCountryCode1() {
        return countryCode1;
    }

    public void setCountryCode1(String _countryCode1) {
        this.countryCode1 = _countryCode1;
    }

    public String getCountryCode2() {
        return countryCode2;
    }

    public void setCountryCode2(String _countryCode2) {
        this.countryCode2 = _countryCode2;
    }

    public String getCountryFlag() {
        return countryFlag;
    }

    public void setCountryFlag(String _countryFlag) {
        this.countryFlag = _countryFlag;
    }

    public String getCapital() {
        return capital;
    }

    public void setCapital(String _capital) {
        this.capital = _capital;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String _currencyCode) {
        this.currencyCode = _currencyCode;
    }

    public String getCurrencyName() {
        return currencyName;
    }

    public void setCurrencyName(String _currencyName) {
        this.currencyName = _currencyName;
    }

    public String getCurrencySymbol() {
        return currencySymbol;
    }

    public void setCurrencySymbol(String _currencySymbol) {
        this.currencySymbol = _currencySymbol;
    }

    public Integer getCapitalLatitude() {
        return capitalLatitude;
    }

    public void setCapitalLatitude(Integer _capitalLatitude) {
        this.capitalLatitude = _capitalLatitude;
    }

    public Integer getCapitalLongitude() {
        return capitalLongitude;
    }

    public void setCapitalLongitude(Integer _capitalLongitude) {
        this.capitalLongitude = _capitalLongitude;
    }

    public Integer getIsoNumeric() {
        return isoNumeric;
    }

    public void setIsoNumeric(Integer _isoNumeric) {
        this.isoNumeric = _isoNumeric;
    }

    public String getPrimaryKey() {
        return countryId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return countryId;
    }

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String _countryId) {
        this.countryId = _countryId;
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
    public int compare(Country object1, Country object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((countryName == null ? " " : countryName));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (countryId == null) {
            return super.hashCode();
        } else {
            return countryId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.location.Country other = (com.app.app.shared.location.Country) obj;
            if (countryId == null) {
                return false;
            } else if (!countryId.equals(other.countryId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
