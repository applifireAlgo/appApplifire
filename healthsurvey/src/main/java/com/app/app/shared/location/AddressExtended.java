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

@Table(name = "ast_AddressExtended_TP")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "AddressExtended.findByAddressId", query = "select e from AddressExtended e where e.systemInfo.activeStatus=1 and e.addressId=:addressId"), @javax.persistence.NamedQuery(name = "AddressExtended.findByVillageId", query = "select e from AddressExtended e where e.systemInfo.activeStatus=1 and e.villageId=:villageId"), @javax.persistence.NamedQuery(name = "AddressExtended.findByTalukaId", query = "select e from AddressExtended e where e.systemInfo.activeStatus=1 and e.talukaId=:talukaId"), @javax.persistence.NamedQuery(name = "AddressExtended.findByDistrictId", query = "select e from AddressExtended e where e.systemInfo.activeStatus=1 and e.districtId=:districtId"), @javax.persistence.NamedQuery(name = "AddressExtended.findByRegionId", query = "select e from AddressExtended e where e.systemInfo.activeStatus=1 and e.regionId=:regionId"), @javax.persistence.NamedQuery(name = "AddressExtended.findById", query = "select e from AddressExtended e where e.systemInfo.activeStatus=1 and e.addExtId =:addExtId") })
public class AddressExtended implements Serializable, CommonEntityInterface, Comparator<AddressExtended> {

    @Column(name = "villageName")
    @JsonProperty("villageName")
    @NotNull
    @Size(min = 0, max = 128)
    private String villageName;

    @Column(name = "talukaName")
    @JsonProperty("talukaName")
    @NotNull
    @Size(min = 0, max = 128)
    private String talukaName;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "addExtId")
    @JsonProperty("addExtId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 0, max = 64)
    private String addExtId;

    @Column(name = "addressId")
    @JsonProperty("addressId")
    private String addressId;

    @Column(name = "villageId")
    @JsonProperty("villageId")
    private String villageId;

    @Column(name = "talukaId")
    @JsonProperty("talukaId")
    private String talukaId;

    @Column(name = "districtId")
    @JsonProperty("districtId")
    private String districtId;

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

    public String getVillageName() {
        return villageName;
    }

    public void setVillageName(String _villageName) {
        if (_villageName != null) {
            this.villageName = _villageName;
        }
    }

    public String getTalukaName() {
        return talukaName;
    }

    public void setTalukaName(String _talukaName) {
        if (_talukaName != null) {
            this.talukaName = _talukaName;
        }
    }

    public String getPrimaryKey() {
        return addExtId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return addExtId;
    }

    public String getAddExtId() {
        return addExtId;
    }

    public void setAddExtId(String _addExtId) {
        this.addExtId = _addExtId;
    }

    public String getAddressId() {
        return addressId;
    }

    public void setAddressId(String _addressId) {
        this.addressId = _addressId;
    }

    public String getVillageId() {
        return villageId;
    }

    public void setVillageId(String _villageId) {
        this.villageId = _villageId;
    }

    public String getTalukaId() {
        return talukaId;
    }

    public void setTalukaId(String _talukaId) {
        this.talukaId = _talukaId;
    }

    public String getDistrictId() {
        return districtId;
    }

    public void setDistrictId(String _districtId) {
        this.districtId = _districtId;
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
    public int compare(AddressExtended object1, AddressExtended object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((villageName == null ? " " : villageName) + ",");
        sb.append((talukaName == null ? " " : talukaName));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (addExtId == null) {
            return super.hashCode();
        } else {
            return addExtId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.location.AddressExtended other = (com.app.app.shared.location.AddressExtended) obj;
            if (addExtId == null) {
                return false;
            } else if (!addExtId.equals(other.addExtId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
