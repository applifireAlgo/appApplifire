Ext.define('Healthsurvey.healthsurvey.shared.com.app.model.health.SurveyQueAnsBridgeModel', {
     "extend": "Ext.data.Model",
     "fields": [{
          "name": "primaryKey",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "surveyqueansbridgePkey",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "surveyquestionid",
          "reference": "SurveyQuestion",
          "defaultValue": ""
     }, {
          "name": "surveyanswerid",
          "reference": "SurveyAnswer",
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