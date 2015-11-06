package com.app.app.shared.authorization;
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

@Table(name = "ast_AppMenus_M")
@Entity
@NamedQueries({ @javax.persistence.NamedQuery(name = "AppMenus.DefaultFinders", query = "select e from AppMenus e where e.systemInfo.activeStatus=1 and e.menuAccessRights BETWEEN :minmenuAccessRights AND :maxmenuAccessRights"), @javax.persistence.NamedQuery(name = "AppMenus.findById", query = "select e from AppMenus e where e.systemInfo.activeStatus=1 and e.menuId =:menuId") })
public class AppMenus implements Serializable, CommonEntityInterface, Comparator<AppMenus> {

    @Column(name = "menuTreeId")
    @JsonProperty("menuTreeId")
    @NotNull
    @Size(min = 2, max = 256)
    private String menuTreeId;

    @Column(name = "menuIcon")
    @JsonProperty("menuIcon")
    @NotNull
    @Size(min = 0, max = 256)
    private String menuIcon;

    @Column(name = "menuAction")
    @JsonProperty("menuAction")
    @NotNull
    @Size(min = 0, max = 256)
    private String menuAction;

    @Column(name = "menuCommands")
    @JsonProperty("menuCommands")
    @NotNull
    @Size(min = 0, max = 64)
    private String menuCommands;

    @Column(name = "menuDisplay")
    @JsonProperty("menuDisplay")
    @NotNull
    private Boolean menuDisplay;

    @Column(name = "menuHead")
    @JsonProperty("menuHead")
    @NotNull
    private Boolean menuHead;

    @Column(name = "menuLabel")
    @JsonProperty("menuLabel")
    @NotNull
    @Size(min = 0, max = 256)
    private String menuLabel;

    @Column(name = "uiType")
    @JsonProperty("uiType")
    @NotNull
    @Size(min = 0, max = 3)
    private String uiType;

    @Column(name = "RefObjectId")
    @JsonProperty("refObjectId")
    @Size(min = 0, max = 256)
    private String refObjectId;

    @Column(name = "menuAccessRights")
    @JsonProperty("menuAccessRights")
    @NotNull
    @Min(0)
    @Max(11)
    private Integer menuAccessRights;

    @Column(name = "appType")
    @JsonProperty("appType")
    @Min(1)
    @Max(2)
    private Integer appType;

    @Column(name = "appId")
    @JsonProperty("appId")
    @Size(min = 0, max = 256)
    private String appId;

    @Transient
    private String primaryKey;

    @Id
    @Column(name = "menuId")
    @JsonProperty("menuId")
    @GeneratedValue(generator = "UUIDGenerator")
    @Size(min = 3, max = 64)
    private String menuId;

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

    public String getMenuTreeId() {
        return menuTreeId;
    }

    public void setMenuTreeId(String _menuTreeId) {
        if (_menuTreeId != null) {
            this.menuTreeId = _menuTreeId;
        }
    }

    public String getMenuIcon() {
        return menuIcon;
    }

    public void setMenuIcon(String _menuIcon) {
        if (_menuIcon != null) {
            this.menuIcon = _menuIcon;
        }
    }

    public String getMenuAction() {
        return menuAction;
    }

    public void setMenuAction(String _menuAction) {
        if (_menuAction != null) {
            this.menuAction = _menuAction;
        }
    }

    public String getMenuCommands() {
        return menuCommands;
    }

    public void setMenuCommands(String _menuCommands) {
        if (_menuCommands != null) {
            this.menuCommands = _menuCommands;
        }
    }

    public Boolean getMenuDisplay() {
        return menuDisplay;
    }

    public void setMenuDisplay(Boolean _menuDisplay) {
        if (_menuDisplay != null) {
            this.menuDisplay = _menuDisplay;
        }
    }

    public Boolean getMenuHead() {
        return menuHead;
    }

    public void setMenuHead(Boolean _menuHead) {
        if (_menuHead != null) {
            this.menuHead = _menuHead;
        }
    }

    public String getMenuLabel() {
        return menuLabel;
    }

    public void setMenuLabel(String _menuLabel) {
        if (_menuLabel != null) {
            this.menuLabel = _menuLabel;
        }
    }

    public String getUiType() {
        return uiType;
    }

    public void setUiType(String _uiType) {
        if (_uiType != null) {
            this.uiType = _uiType;
        }
    }

    public String getRefObjectId() {
        return refObjectId;
    }

    public void setRefObjectId(String _refObjectId) {
        this.refObjectId = _refObjectId;
    }

    public Integer getMenuAccessRights() {
        return menuAccessRights;
    }

    public void setMenuAccessRights(Integer _menuAccessRights) {
        if (_menuAccessRights != null) {
            this.menuAccessRights = _menuAccessRights;
        }
    }

    public Integer getAppType() {
        return appType;
    }

    public void setAppType(Integer _appType) {
        this.appType = _appType;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String _appId) {
        this.appId = _appId;
    }

    public String getPrimaryKey() {
        return menuId;
    }

    public void setPrimaryKey(String _primaryKey) {
        this.primaryKey = _primaryKey;
    }

    public String _getPrimarykey() {
        return menuId;
    }

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String _menuId) {
        this.menuId = _menuId;
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
    public int compare(AppMenus object1, AppMenus object2) {
        return 0;
    }

    public String getPrimaryDisplay() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        sb.append((menuLabel == null ? " " : menuLabel));
        return sb.toString();
    }

    public String toString() {
        return getPrimaryDisplay();
    }

    public int hashCode() {
        if (menuId == null) {
            return super.hashCode();
        } else {
            return menuId.hashCode();
        }
    }

    public boolean equals(Object obj) {
        try {
            com.app.app.shared.authorization.AppMenus other = (com.app.app.shared.authorization.AppMenus) obj;
            if (menuId == null) {
                return false;
            } else if (!menuId.equals(other.menuId)) {
                return false;
            }
        } catch (java.lang.Exception ignore) {
            return false;
        }
        return true;
    }
}
