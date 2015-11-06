Ext.define('Healthsurvey.healthsurvey.shared.com.app.model.health.SurveyQuestionModel', {
     "extend": "Ext.data.Model",
     "fields": [{
          "name": "primaryKey",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "surveyQuestionId",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "surveyQuestionName",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "surveyQuestionDesc",
          "type": "string",
          "defaultValue": ""
     }, {
          "name": "surveyquestiongroupid",
          "reference": "SurveyQuestionGroup",
          "defaultValue": ""
     }, {
          "name": "versionId",
          "type": "int",
          "defaultValue": ""
     }, {
          "name": "SurveyAnswer",
          "reference": "SurveyAnswerModel"
     }, {
          "name": "entityAudit",
          "reference": "EntityAudit"
     }, {
          "name": "primaryDisplay",
          "type": "string",
          "defaultValue": ""
     }]
});