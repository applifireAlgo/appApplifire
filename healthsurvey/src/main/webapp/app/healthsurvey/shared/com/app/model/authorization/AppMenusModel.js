Ext.define('Healthsurvey.healthsurvey.shared.com.app.model.authorization.AppMenusModel', {
     "extend": "Ext.data.Model",
     "fields": [{
          "name": "primaryKey",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "menuId",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "menuTreeId",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "menuIcon",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "menuAction",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "menuCommands",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "menuDisplay",
          "type": "boolean",
          "defaultValue": ""
     }, {
          "name": "menuHead",
          "type": "boolean",
          "defaultValue": ""
     }, {
          "name": "menuLabel",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "uiType",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "refObjectId",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "menuAccessRights",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "appType",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "appId",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "versionId",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "entityAudit",
          "reference": "EntityAudit"
     }, {
          "name": "primaryDisplay",
          "type": "string",
          "defaultValue": ""
     }]
});