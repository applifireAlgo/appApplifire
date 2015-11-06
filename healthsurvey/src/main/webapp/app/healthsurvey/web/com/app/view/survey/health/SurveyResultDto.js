Ext.define('Healthsurvey.healthsurvey.web.com.app.view.survey.health.SurveyResultDto', {
     "parentId": "5fc60469-8e63-4eaa-bc4d-366ea73f0c82",
     "customId": "6c462ae8-1a84-497f-a832-d011728e6f22",
     "uniqueId": "2617e96c-7313-4647-8425-c22de6cd6040",
     "title": "",
     "name": "SurveyResultDto",
     "xtype": "SurveyResultDto",
     "extend": "Ext.form.Panel",
     "customWidgetType": "vdColumnLayout",
     "itemId": "SurveyResultDto",
     "bodyPadding": 10,
     "layout": "column",
     "defaults": {
          "columnWidth": 0.5,
          "labelAlign": "left",
          "labelWidth": 200,
          "margin": "5 5 5 5"
     },
     "autoScroll": true,
     "requires": ["Healthsurvey.healthsurvey.shared.com.app.viewmodel.survey.health.SurveyResultDtoViewModel", "Healthsurvey.healthsurvey.web.com.app.controller.survey.health.SurveyResultDtoController", "Healthsurvey.healthsurvey.shared.com.app.model.survey.health.SurveyResultDtoModel.SurveyResultDtoModel"],
     "controller": "SurveyResultDtoController",
     "viewModel": "SurveyResultDtoViewModel",
     "items": [{
          "parentId": "6c462ae8-1a84-497f-a832-d011728e6f22",
          "customId": "b9143980-30cb-4b42-b3e6-ca71160df871",
          "uniqueId": "945b4fd0-b15f-45bf-a99d-1eb3fa173e93",
          "name": "surveyQuestionId",
          "itemId": "surveyQuestionId",
          "xtype": "textfield",
          "customWidgetType": "vdTextfield",
          "fieldLabel": "surveyQuestionId",
          "allowBlank": false,
          "bind": "{surveyQuestionId}",
          "errorMessage": ""
     }, {
          "parentId": "6c462ae8-1a84-497f-a832-d011728e6f22",
          "customId": "4bc81a9f-77b0-43e6-ab6f-29be8a1eadb1",
          "uniqueId": "0fbb2775-e27c-427e-8ea8-3b15bc1873cc",
          "name": "surveyAnswerId",
          "itemId": "surveyAnswerId",
          "xtype": "textfield",
          "customWidgetType": "vdTextfield",
          "fieldLabel": "surveyAnswerId",
          "allowBlank": false,
          "bind": "{surveyAnswerId}",
          "errorMessage": ""
     }],
     "dockedItems": [{
          "parentId": "6c462ae8-1a84-497f-a832-d011728e6f22",
          "customId": "8147cb12-eca5-469f-8758-22f972afbb0d",
          "uniqueId": "60b197d9-325a-461c-9f5d-3cf0d8634e80",
          "xtype ": "toolbar",
          "customWidgetType": "vdBBar",
          "dock": "bottom",
          "ui": "footer",
          "isDockedItem": true,
          "items": [{
               "parentId": "8147cb12-eca5-469f-8758-22f972afbb0d",
               "customId": "1e1935cc-b044-4100-af36-5d56790364ba",
               "uniqueId": "2b01eb29-e754-486b-9bc3-cf6def39ab7b",
               "xtype": "tbfill",
               "customWidgetType": "vdTbFill"
          }, {
               "parentId": "8147cb12-eca5-469f-8758-22f972afbb0d",
               "customId": "9d3c7bb6-a8ea-41e0-80d0-7d4b60005fa6",
               "uniqueId": "846dbeed-daa4-44b7-92ad-2363c65b66a2",
               "customWidgetType": "vdButton",
               "xtype": "button",
               "margin": "0 5 0 5",
               "text": "Save",
               "hiddenName": "button",
               "canHaveParent": false,
               "itemId": "saveFormButton",
               "listeners": {
                    "click": "saveForm"
               }
          }, {
               "parentId": "8147cb12-eca5-469f-8758-22f972afbb0d",
               "customId": "6b33b788-17e5-45ac-9c02-34539872db74",
               "uniqueId": "bc934b7e-b3a2-4ea3-a981-f8a1c09baf79",
               "customWidgetType": "vdButton",
               "xtype": "button",
               "margin": "0 5 0 5",
               "text": "Reset",
               "hiddenName": "button",
               "canHaveParent": false,
               "itemId": "resetFormButton",
               "listeners": {
                    "click": "resetForm"
               }
          }],
          "defaults": {}
     }]
});