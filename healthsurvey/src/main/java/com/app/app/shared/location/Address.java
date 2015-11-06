package com.app.app.shared.location;
import com.athena.framework.shared.entity.web.entityInterface.CommonEntityInterface;
import java.io.Serializable;
import java.util.Comparator;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.validation.constraints.Size;
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

@Table(name = "ast_Address_T")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "Address.DefaultFinders", query = "select e from Address e where e.systemInfo.activeStatus=1 and e.addressTypeId LIKE :addressTypeId"), @javax.persistence.NamedQuery(name = "Address.findByAddressTypeId", query = "select e from Address e where e.systemInfo.activeStatus=1 and e.addressTypeId=:addressTypeId"), @javax.persistence.NamedQuery(name = "Address.findByCountryId", query = "select e from Address e where e.systemInfo.activeStatus=1 and e.countryId=:countryId"), @javax.persistence.NamedQuery(name = "Address.findByStateId", query = "select e from Address e where e.systemInfo.activeStatus=1 and e.stateId=:stateId"), @javax.persistence.NamedQuery(name = "Address.findByCityId", query = "select e from Address e where e.systemInfo.activeStatus=1 and e.cityId=:cityId"), @javax.persistence.NamedQuery(name = "Address.findById", query = "select e from Address e where e.systemInfo.activeStatus=1 and e.addressId =:addressId") })
public class Address implements Serializable, CommonEntityInterface, Comparator<Address> {

    @Column(name = "addressLabel")
    @JsonProperty("addressLabel")
    @Size(min = 0, max = 11)
    private String addressLabel;

    @Column(name = "address1")
    @JsonProperty("address1")
    @Size(min = 0, max = 56)
    private String address1;

    @Column(name = "address2")
    @JsonProperty("address2")
    @Size(min = 0, max = 56)
    private String address2;

    @Column(name = "address3")
    @JsonProperty("address3")
    @Size(min = 0, max = 56)
    private String address3;

    @Column(name = "zipcode")
    @JsonProperty("zipcode")
    @NotNull
    @Size(min = 0, max = 6)
    private String zipcode;

    @Column(name = "latitude")
    @JsonProperty("latitude")
    @Size(min = 0, max = 64)
    private String latitude;

    @Column(name = "longitude")
    @JsonProperty("longitude")
    @Size(min = 0, max = 64)
    private String longitude;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "addressId")
    @JsonProperty("addressId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String addressId;

    @Column(name = "addressTypeId")
    @JsonProperty("addressTypeId")
    private String addressTypeId;

    @Column(name = "countryId")
    @JsonProperty("countryId")
    private String countryId;

    @Column(name = "stateId")
    @JsonProperty("stateId")
    private String stateId;

    @Column(name = "cityId")
    @JsonProperty("cityId")
    private String cityId;

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

    public String getAddressLabel() {
        return addressLabel;
    }

    public void setAddressLabel(String _addressLabel) {
        this.addressLabel = _addressLabel;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String _address1) {
        this.address1 = _address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String _address2) {
        this.address2 = _address2;
    }

    public String getAddress3() {
        return address3;
    }

    public void setAddress3(String _address3) {
        this.address3 = _address3;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String _zipcode) {
        if (_zipcode != null) {
            this.zipcode = _zipcode;
        }
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String _latitude) {
        this.latitude = _latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String _longitude) {
        this.longitude = _longitude;
    }

    public String getPrimaryKey() {
        return addressId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return addressId;
    }

    public String getAddressId() {
        return addressId;
    }

    public void setAddressId(String _addressId) {
        this.addressId = _addressId;
    }

    public String getAddressTypeId() {
        return addressTypeId;
    }

    public void setAddressTypeId(String _addressTypeId) {
        this.addressTypeId = _addressTypeId;
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

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String _cityId) {
        this.cityId = _cityId;
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
    public int compare(Address object1, Address object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((zipcode == null ? " " : zipcode));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (addressId == null) {
            return super.hashCode();
        } else {
            return addressId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.location.Address other = (com.app.app.shared.location.Address) obj;
            if (addressId == null) {
                return false;
            } else if (!addressId.equals(other.addressId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
