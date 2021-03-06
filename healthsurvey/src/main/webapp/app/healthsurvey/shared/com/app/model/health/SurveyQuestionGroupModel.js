Ext.define('Healthsurvey.healthsurvey.shared.com.app.model.health.SurveyQuestionGroupModel', {
     "extend": "Ext.data.Model",
     "fields": [{
          "name": "primaryKey",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "surveyQuestionGroupId",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "surveyQuestionGroupName",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "surveyQuestionGroupDesc",
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