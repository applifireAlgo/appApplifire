Ext.define('Healthsurvey.healthsurvey.web.com.app.view.health.SurveyQueAnsMapping', {
     "xtype": "surveyQueAnsMapping",
     "name": "surveyQueAnsMapping",
     "items": [{
          "xtype": "panel",
          "items": [{
               "xtype": "textfield",
               "fieldLabel": "Name",
               "margin": 5,
               "bindable": "surveyQuestionName",
               "name": "surveyQuestionName",
               "text": "Name",
               "fieldName": "surveyQuestionName",
               "displayName": "Name",
               "widget": "textfield",
               "min": "0",
               "max": "256",
               "isField": true,
               "itemId": "ejhcebi",
               "columnWidth": 0.5,
               "bind": "{surveyQuestionName}"
          }, {
               "xtype": "combo",
               "name": "surveyQuestionGroupId",
               "margin": 5,
               "bindable": "surveyQuestionGroupId",
               "typeAhead": true,
               "queryMode": "local",
               "minChars": 1,
               "fieldLabel": "Group",
               "displayField": "surveyQuestionGroupName",
               "valueField": "surveyQuestionGroupId",
               "text": "SurveyQuestionGroupId",
               "fieldName": "surveyQuestionGroupId",
               "displayName": "SurveyQuestionGroupId",
               "widget": "combo",
               "min": "-2147483648",
               "max": "2147483647",
               "isField": true,
               "columnWidth": 0.5,
               "itemId": "kobhfji",
               "store": {
                    "model": "Healthsurvey.healthsurvey.shared.com.app.model.health.SurveyQuestionGroupModel",
                    "autoLoad": true,
                    "autoSync": true,
                    "sorters": [{
                         "property": "surveyQuestionGroupName",
                         "direction": "ASC"
                    }],
                    "proxy": {
                         "type": "ajax",
                         "url": "secure/SurveyQuestionGroup/findAll",
                         "actionMethods": {
                              "read": "GET"
                         },
                         "headers": {
                              "Content-Type": "application/json"
                         },
                         "extraParams": {},
                         "reader": {
                              "type": "json",
                              "rootProperty": "response.data"
                         }
                    }
               },
               "bind": "{surveyQuestionGroupId}"
          }, {
               "xtype": "textareafield",
               "fieldLabel": "Desc",
               "name": "surveyQuestionDesc",
               "margin": 5,
               "bindable": "surveyQuestionDesc",
               "text": "Desc",
               "fieldName": "surveyQuestionDesc",
               "displayName": "Desc",
               "widget": "textareafield",
               "min": "0",
               "max": "256",
               "isField": true,
               "columnWidth": 0.5,
               "itemId": "bldifoi",
               "bind": "{surveyQuestionDesc}"
          }],
          "layout": "column",
          "autoScroll": true,
          "border": true,
          "margin": 5,
          "itemId": "hckcohi",
          "dockedItems": []
     }, {
          "xtype": "panel",
          "items": [{
               "xtype": "checkboxsgroups",
               "name": "surveyAnswer",
               "fieldLabel": "Answers",
               "columns": 2,
               "groupData": "surveyAnswer",
               "vertical": true,
               "margin": 5,
               "isDynamic": true,
               "columnWidth": 0.5,
               "itemId": "bpjajki",
               "boxLabel": "surveyAnswerName",
               "inputValue": "surveyAnswerId",
               "listeners": {
                    "added": "onsurveyAnsweradded"
               },
               "bind": "{surveyAnswer}",
               "bindable": "surveyAnswer"
          }],
          "layout": "column",
          "autoScroll": true,
          "border": true,
          "title": "Map possible answers",
          "margin": 5,
          "itemId": "jpihlgi",
          "dockedItems": []
     }],
     "border": true,
     "autoScroll": true,
     "title": "Survey Question-Answer Mapping",
     "margin": 5,
     "itemId": "kpijoii",
     "dockedItems": [{
          "xtype": "toolbar",
          "dock": "bottom",
          "ui": "footer",
          "isToolBar": true,
          "isDockedItem": true,
          "items": [{
               "xtype": "tbfill",
               "itemId": "ifgiahi"
          }, {
               "xtype": "button",
               "text": "Save",
               "isSubmitBtn": true,
               "margin": 5,
               "name": "save",
               "itemId": "pjmpkei",
               "listeners": {
                    "click": "onsaveclick"
               }
          }],
          "itemId": "injlndi",
          "dockedItems": []
     }],
     "requires": ["Healthsurvey.healthsurvey.shared.com.app.model.health.SurveyAnswerModel", "Healthsurvey.healthsurvey.shared.com.app.model.health.SurveyQuestionGroupModel", "Healthsurvey.healthsurvey.web.com.app.controller.health.SurveyQueAnsMappingController", "Healthsurvey.healthsurvey.shared.com.app.viewmodel.health.SurveyQueAnsMappingViewModel", "Healthsurvey.healthsurvey.shared.com.app.model.health.SurveyQueAnsMappingModel", "Healthsurvey.view.fw.component.CheckBoxGroups"],
     "extend": "Ext.form.Panel",
     "viewModel": "SurveyQueAnsMappingViewModel",
     "controller": "SurveyQueAnsMappingController"
});