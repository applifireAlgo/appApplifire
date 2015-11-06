Ext.define('Healthsurvey.healthsurvey.shared.com.app.model.location.AddressExtendedModel', {
     "extend": "Ext.data.Model",
     "fields": [{
          "name": "primaryKey",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "addExtId",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "addressid",
          "reference": "Address",
          "defaultValue": ""
     }, {
          "name": "villageid",
          "reference": "Village",
          "defaultValue": ""
     }, {
          "name": "talukaid",
          "reference": "Taluka",
          "defaultValue": ""
     }, {
          "name": "districtid",
          "reference": "District",
          "defaultValue": ""
     }, {
          "name": "regionid",
          "reference": "Region",
          "defaultValue": ""
     }, {
          "name": "villageName",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "talukaName",
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