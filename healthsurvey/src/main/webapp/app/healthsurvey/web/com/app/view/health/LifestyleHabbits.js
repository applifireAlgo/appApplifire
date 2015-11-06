Ext.define('Healthsurvey.healthsurvey.web.com.app.view.health.LifestyleHabbits', {
     "xtype": "lifestyleHabbits",
     "name": "lifeStyleHabbitsPanel",
     "items": [{
          "xtype": "listViewBaseView",
          "name": "lifeStyleHabbits",
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
               "url": "secure/LifeStyleQuestionsWS/retriveLifeStyle",
               "requestMethodType": "POST"
          },
          "title": "Lifestyle Habbits",
          "padding": 0,
          "margin": 5,
          "itemId": "ccdndki",
          "dockedItems": []
     }],
     "border": true,
     "margin": 5,
     "itemId": "dlbmaii",
     "dockedItems": [{
          "xtype": "toolbar",
          "dock": "bottom",
          "ui": "footer",
          "isToolBar": true,
          "isDockedItem": true,
          "items": [{
               "xtype": "tbfill",
               "itemId": "gojhgfi"
          }, {
               "xtype": "button",
               "text": "Submit",
               "isSubmitBtn": true,
               "margin": 5,
               "name": "Submit",
               "itemId": "acgnodi",
               "listeners": {
                    "click": "onSubmitclick"
               }
          }],
          "itemId": "apaglhi",
          "dockedItems": []
     }],
     "extend": "Ext.form.Panel",
     "layout": "fit",
     "requires": ["Healthsurvey.healthsurvey.web.com.app.controller.health.LifestyleHabbitsController", "Healthsurvey.healthsurvey.shared.com.app.viewmodel.health.LifestyleHabbitsViewModel", "Healthsurvey.healthsurvey.shared.com.app.model.health.LifestyleHabbitsModel", "Healthsurvey.view.fw.component.ListViewBaseView"],
     "viewModel": "LifestyleHabbitsViewModel",
     "controller": "LifestyleHabbitsController"
});