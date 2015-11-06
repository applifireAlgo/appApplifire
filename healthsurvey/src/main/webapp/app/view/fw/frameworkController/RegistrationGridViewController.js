Ext.define('Healthsurvey.view.fw.frameworkController.RegistrationGridViewController', {
     extend: 'Ext.app.ViewController',
     /*********************Main Controller Functions*********************************/
     
     
     //To add server calls in communication array
     addCommunicationLog: function(response, success, compRef) {
          try {
               if (success) {
                    var responseData = Ext.JSON.decode(response.responseText);
               }
               if (compRef == null) {
                    responseObj = {
                         name: '',
                         status: response.status,
                         statusText: response.statusText,
                         success: success,
                         message: success ? responseData.response.message : 'Failed'
                    };
               } else {
                    responseObj = {
                         name: (compRef.fieldLabel != null) ? compRef.fieldLabel : compRef.title,
                         status: response.status,
                         statusText: response.statusText,
                         success: success,
                         message: success ? responseData.response.message : 'Failed'
                    };
               }
               this.view.communicationLog.push(responseObj);
          } catch (addCommunicationLogException) {}
     },

     //To create the final json to save
     createFinalJson : function(data){
     	if (data.id != null) {
               delete data.id;
          }
          var jsonData = {};
          for (key in data) {
               if (data[key] != null) {
                    jsonData[key] = data[key];
               }
          }
          this.modifyData(jsonData);
          return jsonData;
     },
     
     //To remove the unwanted code from final json creation
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
     
     /********************************Form Controller Functions***********************************/

     //To add the store to combo 
     assignComboData: function(component, data) {
          var storedata = Ext.JSON.decode(data);
          storedata = storedata.response.data;
          var myStore = Ext.create('Ext.data.Store', {
               fields: [],
               data: storedata,
               autoLoad: true
          });
          component.setValue('');
          component.setStore(myStore);
          component.getStore().sort('primaryDisplay', 'ASC');
     },
     
     //To find all the combos from container and assign the data to each 
     assignAllComboData: function(container, itemId, data) {
          var allForms = container.up().query('form');
          for (var index = 0; index < allForms.length; index++) {
               if (allForms[index].down('#' + itemId) != null) {
                    container.controller.assignComboData(allForms[index].down('#' + itemId), data);
               }
          }
     },
     
     //To show the window with the server call log
     onConsoleClick: function() {
          var window = Ext.create('Healthsurvey.view.console.ConsoleWindow');
          var store = window.down('grid').store;
          store.loadData(this.view.communicationLog);
          window.show();
     },
     
     //To delete the record from the grid in froms
     onDeleteActionColumnClick: function(grid, rowIndex) {
          grid.store.removeAt(rowIndex);
     },
     
     //To find the records from store
     fetchDataFromStore: function(store) {
          storeItems = store.data.items;
          obj = {};
          arr = [];
          for (counter in storeItems) {
               arr.push(storeItems[counter].data);
          }
          return obj['objArr'] = arr;
     },

     //To remove the id from the data 
     removeId: function(data) {
          for (var int = 0; int < data.length; int++) {
               delete data[int]['id'];
          }
     },

     //Crated the json object by the bindLevel setted to the components
     createObject: function(data, dataLevel, assignValue) {
          this.removeId(assignValue);
          var dataLevels = dataLevel.split('.');
          var currentObject = data;
          for (var iterable_element in dataLevels) {
               var element = dataLevels[iterable_element];
               var elementValue = currentObject[element];
               if (currentObject[element]) {
                    currentObject = elementValue;
               } else {
                    currentObject[element] = assignValue;
                    return currentObject;
               }
          }
          return data;
     },
     
     //To display the date in form
     modifyFormValues: function(values, form) {
          for (var key in values) {
               if (form.down('#' + key).dataType == 'DATE' || form.down('#' + key).dataType == 'DATETIME') {
                    if (form.down('#' + key).getValue() != null) {
                         values[key] = form.down('#' + key).getValue().getTime();
                    }
               }
               if (typeof values[key] === 'object') {
                    values[key] = this.modifyFormValues(values[key], form);
               }
          }
          return values;
     }
});