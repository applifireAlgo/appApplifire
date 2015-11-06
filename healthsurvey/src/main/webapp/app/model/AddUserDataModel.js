Ext.define('Healthsurvey.model.AddUserDataModel', {
     "extend": "Ext.data.Model",
     "fields": [/*{
          "name": "versionId",
          "type": "int",
          "defaultValue": ""
     },  {
          "name": "serverAuthImage",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "serverAuthText",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "failedLoginAttempts",
          "type": "int",
          "defaultValue": ""
     },*/
     {
    	  "name": "loginId",
    	  "type": "string",
    	  "defaultValue": ""
     },{
          "name": "User",
          "reference": "UserModel"
     }, {
          "name": "CoreContacts",
          "reference": "CoreContactsModel"
     }/*, {
          "name": "entityAudit",
          "reference": "EntityAudit"
     }*/]
});