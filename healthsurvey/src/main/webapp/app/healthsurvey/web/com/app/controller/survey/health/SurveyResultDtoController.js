Ext.define('Healthsurvey.healthsurvey.web.com.app.controller.survey.health.SurveyResultDtoController', {
     extend: 'Ext.app.ViewController',
     alias: 'controller.SurveyResultDtoController',
     saveForm: function(but, evt) {
          debugger;
          if (!but.up('form').isValid()) {
               return;
          }
          var data = but.up('form').getViewModel().getData();
          if (data.id != null) {
               delete data.id;
          }
          var jsonData = {};
          for (key in data) {
               console.log(key, data[key]);
               if (data[key] != null) {
                    jsonData[key] = data[key];
               }
          }
          this.modifyData(jsonData);
          console.log(Ext.JSON.encode(jsonData));
          var me = this;
          Ext.Ajax.request({
               url: 'secure/SurveyResultProcessingWS/process',
               method: 'POST',
               jsonData: jsonData,
               success: function(response, opts) {
                    responseData = Ext.JSON.decode(response.responseText);
                    if (responseData.response.success) {
                         Ext.Msg.alert('Server Response', responseData.response.message);
                    } else {
                         Ext.Msg.alert('Server Response', responseData.response.message);
                    }
                    me.resetForm();
               },
               failure: function(response, scope) {
                    Ext.Msg.alert('Server Response', response.statusText);
               }
          }, this);
     },
     resetForm: function() {
          this.view.getForm().reset();
     },
     modifyData: function(config) {
          if (!config) {
               return null;
          }
          for (i in config) {
               if (config[i]) {
                    config[i] = config[i].valueOf();
                    if (typeof config[i] == 'object') {
                         this.modifyData(config[i]);
                    }
               }
          }
     },
     onDeleteActionColumnClick: function(grid, rowIndex) {
          debugger;
          grid.store.removeAt(rowIndex);
     },
     fetchDataFromStore: function(store) {
          storeItems = store.data.items;
          obj = {};
          arr = [];
          for (counter in storeItems) {
               arr.push(storeItems[counter].data);
          }
          return obj['objArr'] = arr;
     },
     removeId: function(data) {
          for (var int = 0; int < data.length; int++) {
               delete data[int]['id'];
          }
     },

     createObject: function(data, dataLevel, assignValue) {
          debugger;
          this.removeId(assignValue);
          var dataLevels = dataLevel.split('.');
          var currentObject = data;
          for (var iterable_element in dataLevels) {
               console.log(dataLevels[iterable_element]);
               var element = dataLevels[iterable_element];
               var elementValue = currentObject[element];
               if (currentObject[element]) {
                    console.log(elementValue);
                    currentObject = elementValue;
               } else {
                    currentObject[element] = assignValue;
                    return currentObject;
               }
          }
          return data;
     }
});