Ext.define('Healthsurvey.healthsurvey.web.com.app.view.health.SurveyQuestionTemplate', {
     "xtype": "surveyQuestionTemplate",
     "items": [{
          "xtype": "hiddenfield",
          "fieldLabel": "surveyQuestionId",
          "bindable": "surveyQuestionId",
          "margin": 5,
          "name": "surveyQuestionId",
          "itemId": "onbbkbi",
          "bind": "{surveyQuestionId}"
     }, {
          "xtype": "displayfield",
          "fieldLabel": "Questions",
          "margin": 5,
          "bindable": "surveyQuestionName",
          "value": "TEXT",
          "name": "surveyQuestionName",
          "itemId": "eejloni",
          "bind": "{surveyQuestionName}"
     }, {
          "xtype": "radiogroup",
          "name": "surveyAnswerId",
          "fieldLabel": "Answers",
          "columns": 2,
          "vertical": true,
          "margin": 5,
          "groupData": "surveyAnswer",
          "isDynamic": true,
          "itemId": "elfoibi",
          "inputValue": "surveyAnswerId",
          "boxLabel": "surveyAnswerName",
          "bind": "{surveyAnswerId}",
          "bindable": "surveyAnswerId"
     }],
     "border": true,
     "autoScroll": true,
     "margin": 5,
     "itemId": "eacdihi",
     "dockedItems": [],
     "style": {
          "boxShadow": "1px 1px 7px #969696"
     },
     "extend": "Ext.form.Panel",
     "requires": ["Healthsurvey.healthsurvey.web.com.app.controller.health.SurveyQuestionTemplateController", "Healthsurvey.healthsurvey.shared.com.app.viewmodel.health.SurveyQuestionTemplateViewModel", "Healthsurvey.healthsurvey.shared.com.app.model.health.SurveyQuestionTemplateModel"],
     "viewModel": "SurveyQuestionTemplateViewModel",
     "controller": "SurveyQuestionTemplateController"
});