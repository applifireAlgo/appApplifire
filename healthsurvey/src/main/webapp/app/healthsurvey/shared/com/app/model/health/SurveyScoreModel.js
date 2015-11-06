Ext.define('Healthsurvey.healthsurvey.shared.com.app.model.health.SurveyScoreModel', {
     "extend": "Ext.data.Model",
     "fields": [{
          "name": "primaryKey",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "surveyScoreId",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "userid",
          "reference": "User",
          "defaultValue": ""
     }, {
          "name": "groupType",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "score",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "points",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "surveyDate",
          "type": "date",
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