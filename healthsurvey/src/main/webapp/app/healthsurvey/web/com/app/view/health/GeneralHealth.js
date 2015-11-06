Ext.define('Healthsurvey.healthsurvey.web.com.app.view.health.GeneralHealth', {
     "xtype": "generalHealth",
     "items": [{
          "xtype": "listViewBaseView",
          "name": "generalHealth",
          "items": [],
          "isListPanel": true,
          "autoScroll": true,
          "border": false,
          "layout": "column",
          "defaults": {
               "columnWidth": "1.0"
          },
          "templateConfig": {
               "uiId": "281090C8-3DF5-4C0B-9039-97678712B554",
               "uiClass": "Healthsurvey.healthsurvey.web.com.app.view.health.SurveyQuestionTemplate",
               "uiType": 2,
               "url": "secure/GeneralQuestionsWS/retriveGeneralQuestions",
               "requestMethodType": "POST"
          },
          "title": "General Health",
          "padding": 0,
          "margin": 5,
          "itemId": "lnfjghi",
          "dockedItems": []
     }],
     "border": true,
     "margin": 5,
     "itemId": "phgccli",
     "dockedItems": [{
          "xtype": "toolbar",
          "dock": "bottom",
          "ui": "footer",
          "isToolBar": true,
          "isDockedItem": true,
          "items": [{
               "xtype": "tbfill",
               "itemId": "iidapji"
          }, {
               "xtype": "button",
               "text": "Submit",
               "isSubmitBtn": true,
               "margin": 5,
               "name": "submit",
               "itemId": "mdpeaai",
               "listeners": {
                    "click": "onsubmitclick"
               }
          }],
          "itemId": "bpekmdi",
          "dockedItems": []
     }],
     "extend": "Ext.form.Panel",
     "layout": "fit",
     "requires": ["Healthsurvey.healthsurvey.web.com.app.controller.health.GeneralHealthController", "Healthsurvey.healthsurvey.shared.com.app.viewmodel.health.GeneralHealthViewModel", "Healthsurvey.healthsurvey.shared.com.app.model.health.GeneralHealthModel", "Healthsurvey.view.fw.component.ListViewBaseView"],
     "viewModel": "GeneralHealthViewModel",
     "controller": "GeneralHealthController"
});