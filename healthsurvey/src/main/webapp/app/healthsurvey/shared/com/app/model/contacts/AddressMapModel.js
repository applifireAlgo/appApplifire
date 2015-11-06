Ext.define('Healthsurvey.healthsurvey.shared.com.app.model.contacts.AddressMapModel', {
     "extend": "Ext.data.Model",
     "fields": [{
          "name": "primaryKey",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "addMapId",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "contactid",
          "reference": "CoreContacts",
          "defaultValue": ""
     }, {
          "name": "addressid",
          "reference": "Address",
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