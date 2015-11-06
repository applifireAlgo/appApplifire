Ext.define('Healthsurvey.healthsurvey.web.com.app.view.health.CHDSurvey', {
     "xtype": "cHDSurvey",
     "items": [{
          "xtype": "listViewBaseView",
          "name": "chdListPanel",
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
               "url": "secure/CHDServiceWS/retriveChdQuestions",
               "requestMethodType": "POST"
          },
          "title": "Cornary Health Disease",
          "padding": 0,
          "margin": 5,
          "itemId": "ihdebbi",
          "dockedItems": []
     }],
     "border": true,
     "margin": 5,
     "itemId": "lephani",
     "dockedItems": [{
          "xtype": "toolbar",
          "dock": "bottom",
          "ui": "footer",
          "isToolBar": true,
          "isDockedItem": true,
          "items": [{
               "xtype": "tbfill",
               "itemId": "negliki"
          }, {
               "xtype": "button",
               "name": "submit",
               "text": "Submit",
               "margin": 5,
               "isSubmitBtn": true,
               "itemId": "plpafni",
               "listeners": {
                    "click": "onsubmitclick"
               }
          }],
          "itemId": "cnigpni",
          "dockedItems": []
     }],
     "extend": "Ext.form.Panel",
     "layout": "fit",
     "requires": ["Healthsurvey.healthsurvey.web.com.app.controller.health.CHDSurveyController", "Healthsurvey.healthsurvey.shared.com.app.viewmodel.health.CHDSurveyViewModel", "Healthsurvey.healthsurvey.shared.com.app.model.health.CHDSurveyModel", "Healthsurvey.view.fw.component.ListViewBaseView"],
     "viewModel": "CHDSurveyViewModel",
     "controller": "CHDSurveyController"
});