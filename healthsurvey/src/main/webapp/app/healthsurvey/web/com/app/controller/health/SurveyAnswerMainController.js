Ext.define('Healthsurvey.healthsurvey.web.com.app.controller.health.SurveyAnswerMainController', {
     extend: 'Healthsurvey.view.fw.frameworkController.RegistrationGridViewController',
     alias: 'controller.SurveyAnswerMainController',
     init: function() {
          if (this.view.disableDB != null && this.view.disableDB) {
               this.hideDataBrowser();
          } else {
               this.fetchData();
          }
     },
     /*********************Main Controller Functions*********************************/
     onGridRefreshClick: function(event, toolEl, panelHeader) {
          this.fetchData();
     },
     onDeleteActionColumnClickMainGrid: function(grid, rowIndex) {
          var recordId = grid.store.data.items[rowIndex].data.surveyAnswerId;
          me = this;
          Ext.MessageBox.confirm({
               title: 'Confirm',
               msg: 'Delete Record',
               buttons: Ext.MessageBox.YESNO,
               fn: function(clickedButtonId) {
                    if (clickedButtonId == 'yes') {
                         me.deleteRecord(recordId);
                    }
               },
               animateTarget: this,
               icon: Ext.MessageBox.QUESTION
          })
     },
     deleteRecord: function(recordId) {
          var restURL = this.view.restURL;
          var url = 'secure' + restURL + '/' + recordId;
          Ext.Ajax.request({
               url: url,
               method: 'DELETE',
               jsonData: {},
               success: function(response, opts) {
                    if (response.status == 204) {
                         Ext.Msg.alert('Server Response', 'Record Deleted Sucessfully');
                         me.refreshMainForm();
                    } else {
                         responseData = Ext.JSON.decode(response.responseText);
                         Ext.Msg.alert('Server Response', responseData.response.message);
                    }
               },
               failure: function(response, scope) {
                    Ext.Msg.alert('Server Response', response.statusText);
                    me.addCommunicationLog(response, false);
               }
          }, this);
     },
     refreshMainForm: function(but) {
          this.fetchData();
          if (but != null) {
               this.resetForm(but);
          }
     },
     resetForm: function(but) {
          but.up('form').reset();
     },
     onFilterClick: function(but, evt) {
          debugger;
          var currentObject = this.getView();
          var data = but.up('form').getForm().getValues();
          var searchData = {};
          for (key in data) {
               console.log(key, data[key]);
               if (data[key] != null && data[key] != '') {
                    searchData[key] = data[key];
               }
          }
          Ext.Ajax.request({
               url: 'secure' + currentObject.restURL + '/search',
               method: 'POST',
               maskEnable: true,
               maskEle: currentObject,
               view: currentObject,
               jsonData: Ext.JSON.encode(searchData),
               success: function(response, currentObject) {
                    debugger;
                    var jsonRespone = Ext.JSON.decode(response.responseText);
                    if (jsonRespone.response.success) {
                         debugger;
                         var jsonRespone = Ext.JSON.decode(response.responseText);
                         var data = jsonRespone.response.data;
                         var currentView = currentObject.view;
                         currentView.controller.setGridData(data);
                    }
               },
               failure: function(response, eopts) {
                    Ext.MessageBox.show({
                         title: 'Error',
                         msg: response.statusText,
                         icon: Ext.MessageBox.ERROR
                    });
               }
          });
     },
     fetchData: function() {
          var url = this.getView().restURL;
          var scope = this;
          var me = this;
          debugger;
          Ext.Ajax.request({
               url: 'secure' + url + '/findAll',
               method: 'GET',
               sender: scope,
               maskEnable: true,
               jsonData: {},
               success: function(response, scope) {
                    debugger;
                    var responseData = Ext.JSON.decode(response.responseText);
                    if (responseData.response.success) {
                         var data = responseData.response.data;
                         var currentView = scope.sender.getView();
                         me.setGridData(data);
                         scope.sender.addCommunicationLog(response, true);
                    } else if (!sessionTimeOutFlag) {
                         Ext.Msg.alert('Server Response', responseData.response.message);
                    }
               },
               failure: function(response, scope) {
                    debugger;
                    scope.sender.addCommunicationLog(response, false);
                    var responseData = Ext.JSON.decode(response.responseText);
                    Ext.Msg.alert('Server Response', responseData.response.message);
               }
          }, scope);
     },
     /********************************Grid Controller Functions***********************************/
     onGridItemClick: function(me, record, item, index, e, eOpts) {
          debugger;
          var formPanel = this.getView().down('#SurveyAnswer');
          var vm = formPanel.getViewModel();
          vm.setData(record.data);
     },
     onTriggerfieldChange: function(me) {
          debugger;
          var grid = me.up().up();
          var v;
          try {
               grid.store.filter('primaryDisplay', new RegExp(me.value, 'i'));
          } catch (e) {
               me.markInvalid('Invalid regular expression');
          }
     },
     renderFormValue: function(val, me) {
          store = this.view.up().down('#SurveyAnswer').down('#' + me.column.dataIndex + '').store;
          if (store.data.length == 0) {
               return '';
          }
          var displayValue = store.findRecord('primaryKey', val).data.primaryDisplay;
          return displayValue != null ? displayValue : '';
     },
     setGridData: function(data) {
          var gridStore = this.view.down('#SurveyAnswerGrid').store;
          gridStore.removeAll();
          gridStore.setData(data);
          gridStore.sort('primaryDisplay', 'ASC');
     },
     /********************************Form Controller Functions***********************************/
     afterFormRender: function(view) {
          if (view.primaryKey != null) {
               this.findById(view.primaryKey);
          }
     },
     findById: function(primaryKey) {
          var me = this;
          var restURL = this.view.restURL;
          Ext.Ajax.request({
               url: 'secure' + restURL + '/findById',
               method: 'POST',
               controller: me,
               jsonData: {
                    'findKey': primaryKey
               },
               success: function(response, request) {
                    responseData = Ext.JSON.decode(response.responseText);
                    if (responseData.response.success) {
                         request.controller.loadData(responseData);
                    } else if (!sessionTimeOutFlag) {
                         Ext.Msg.alert('Server Response', responseData.response.message);
                    }
               },
               failure: function(response, scope) {
                    Ext.Msg.alert('Server Response', response.statusText);
               }
          }, this);
     },
     loadData: function(responseData) {
          this.view.getViewModel().setData(responseData.response.data);
     },
     renderFormValue: function(value, metaData, record, row, col, store, gridView) {
          try {
               var comboStore = this.getView().down('#' + metaData.column.dataIndex).getStore();
               var index = comboStore.findExact('primaryKey', value);
               return comboStore.getAt(index).data.primaryDisplay;
          } catch (e) {
               return value;
          }
     },
     saveForm: function(but, evt) {
          debugger;
          var form = but.up('form');
          if (!form.isValid()) {
               return;
          }
          var data = but.up('form').getViewModel().getData();
          var jsonData = this.createFinalJson(data);
          console.log(Ext.JSON.encode(jsonData));
          var method;
          if (jsonData.primaryKey == null) {
               method = 'POST'
          } else {
               method = 'PUT'
          }
          restURL = this.view.restURL;
          var me = this;
          Ext.Ajax.request({
               url: 'secure' + restURL + '/',
               but: but,
               method: method,
               maskEnable: true,
               maskEle: form,
               jsonData: jsonData,
               success: function(response, opts) {
                    responseData = Ext.JSON.decode(response.responseText);
                    if (responseData.response.success) {
                         me.refreshMainForm(but);
                         Ext.Msg.alert('Server Response', responseData.response.message);
                    } else if (!sessionTimeOutFlag) {
                         Ext.Msg.alert('Server Response', responseData.response.message);
                    }
               },
               failure: function(response, scope) {
                    Ext.Msg.alert('Server Response', response.statusText);
                    me.addCommunicationLog(response, false);
               }
          }, this);
     },
     refreshMainForm: function(but) {
          this.onGridRefreshClick();
          this.resetForm(but);
     },
     resetForm: function(but) {
          but.up('form').reset();
     },
});