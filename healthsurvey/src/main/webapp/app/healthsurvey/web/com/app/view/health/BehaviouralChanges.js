Ext.define('Healthsurvey.healthsurvey.web.com.app.view.health.BehaviouralChanges', {
     "xtype": "behaviouralChanges",
     "items": [{
          "xtype": "listViewBaseView",
          "name": "behaviouralChanges",
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
               "url": "secure/BehaviourQuestionsWS/retriveBehaviour",
               "requestMethodType": "POST"
          },
          "title": "Behavioural Changes",
          "padding": 0,
          "margin": 5,
          "itemId": "kjccabi",
          "dockedItems": []
     }],
     "border": true,
     "margin": 5,
     "itemId": "inbjjhi",
     "dockedItems": [{
          "xtype": "toolbar",
          "dock": "bottom",
          "ui": "footer",
          "isToolBar": true,
          "isDockedItem": true,
          "items": [{
               "xtype": "tbfill",
               "itemId": "kobflhi"
          }, {
               "xtype": "button",
               "text": "Submit",
               "isSubmitBtn": true,
               "margin": 5,
               "name": "Submit",
               "itemId": "jphacci",
               "listeners": {
                    "click": "onSubmitclick"
               }
          }],
          "itemId": "cfnmlci",
          "dockedItems": []
     }],
     "extend": "Ext.form.Panel",
     "layout": "fit",
     "requires": ["Healthsurvey.healthsurvey.web.com.app.controller.health.BehaviouralChangesController", "Healthsurvey.healthsurvey.shared.com.app.viewmodel.health.BehaviouralChangesViewModel", "Healthsurvey.healthsurvey.shared.com.app.model.health.BehaviouralChangesModel", "Healthsurvey.view.fw.component.ListViewBaseView"],
     "viewModel": "BehaviouralChangesViewModel",
     "controller": "BehaviouralChangesController"
});