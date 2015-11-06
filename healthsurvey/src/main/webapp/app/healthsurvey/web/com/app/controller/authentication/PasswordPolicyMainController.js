Ext.define('Healthsurvey.healthsurvey.web.com.app.controller.authentication.PasswordPolicyMainController', {
     extend: 'Healthsurvey.view.fw.frameworkController.FrameworkViewController',
     alias: 'controller.PasswordPolicyMainController',
     /*********************Main Controller Functions*********************************/
     init: function() {
          if (this.view.disableDB != null && this.view.disableDB) {
               this.hideDataBrowser();
          } else {
               this.renderTreeGridData();
          }
     },
     fetchDataAjaxCall: function() {
          var url = this.getView().restURL;
          var me = this;
          var data = null;
          Ext.Ajax.request({
               url: 'secure' + url + '/findAll',
               method: 'GET',
               maskEnable: true,
               async: false,
               jsonData: {},
               success: function(response, scope) {
                    var responseData = Ext.JSON.decode(response.responseText);
                    data = responseData;
                    me.addCommunicationLog(response, true);
               },
               failure: function(response, scope) {
                    debugger;
                    var responseData = Ext.JSON.decode(response.responseText);
                    Ext.Msg.alert('Server Response', responseData.response.message);
                    me.addCommunicationLog(response, false);
               }
          }, this);
          return data;
     },
     onTreeRefreshClick: function(event, toolEl, panelHeader) {
          var responseData = this.fetchDataAjaxCall();
          var data = responseData.response.data;
          var tree = this.view.down('#PasswordPolicyTree');
          var rootNode = tree.getRootNode();
          rootNode.removeAll();
          for (var int = 0; int < data.length; int++) {
               var childNode = {
                    text: data[int].primaryDisplay,
                    bConfig: data[int],
                    leaf: true,
                    icon: 'images/table_icon.png'
               };
               rootNode.appendChild(childNode);
          }
          tree.getStore().sort('text', 'ASC');
     },
     onGridRefreshClick: function(event, toolEl, panelHeader) {
          var responseData = this.fetchDataAjaxCall();
          var data = responseData.response.data;
          this.setGridData(data);
     },
     refreshMainForm: function(but) {
          if (but != null) {
               this.resetForm(but);
          } else {
               var but = this.view.down('#resetFormButton');
               this.resetForm(but);
          }
     },
     hideDataBrowser: function() {
          debugger;
          var form = this.view.down('#PasswordPolicy');
          var grid = this.view.down('#PasswordPolicyGrid');
          var tree = this.view.down('#PasswordPolicyTreeContainer');
          grid.setHidden(true);
          this.view.down('#addNewForm').destroy();
          tree.setHidden(true);
          if (this.view.primaryKey != null) {
               this.findById(this.view.primaryKey);
          }
     },
     renderTreeGridData: function(responseData) {
          debugger;
          if (responseData == null) {
               responseData = this.fetchDataAjaxCall();
          }
          if (responseData.response.success) {
               var data = responseData.response.data;
               var tree = this.view.down('#PasswordPolicyTree');
               var rootNode = tree.getRootNode();
               rootNode.removeAll();
               for (var int = 0; int < data.length; int++) {
                    var childNode = {
                         text: data[int].primaryDisplay,
                         bConfig: data[int],
                         leaf: true,
                         icon: 'images/table_icon.png'
                    };
                    rootNode.appendChild(childNode);
               }
               tree.getStore().sort('text', 'ASC');
               this.setGridData(data);
          } else if (!sessionTimeOutFlag) {
               Ext.Msg.alert('Server Response', responseData.response.message);
          }
     },
     /********************************Tree Controller Functions**********************************/
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
               maskMsg: 'Filtering data ...',
               view: currentObject,
               jsonData: Ext.JSON.encode(searchData),
               success: function(response, currentObject) {
                    var responseData = Ext.JSON.decode(response.responseText);
                    currentObject.view.controller.renderTreeGridData(responseData);
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
     treeClick: function(me, record, item, index, e, eOpts) {
          if (record.data.leaf) {
               var gridPanel = this.view.up().down('#PasswordPolicyGrid');
               var foundRecord = gridPanel.store.findRecord('primaryKey', record.data.bConfig.primaryKey);
               if (gridPanel && foundRecord) {
                    gridPanel.setSelection(foundRecord);
               }
               var formPanel = this.getView().up().down("#PasswordPolicy");
               var vm = formPanel.getViewModel();
               var data = record.data.bConfig;
               vm.setData(data);
               for (var key in data) {
                    if (formPanel.down('#' + key) != null && formPanel.down('#' + key).xtype == 'datefield') {
                         formPanel.down('#' + key).setValue(new Date(data[key]));
                    }
               }
          }
     },
     /********************************Grid Controller Functions***********************************/
     onGridItemClick: function(me, record, item, index, e, eOpts) {
          var treePanel = this.view.up().up().down('#PasswordPolicyTree');
          var foundNode = this.findChild(treePanel.getRootNode(), 'primaryKey', record.data.primaryKey);
          if (treePanel && foundNode) {
               treePanel.setSelection(foundNode);
          } else {
               var formPanel = this.getView().up().down('#PasswordPolicy');
               var vm = formPanel.getViewModel();
               var data = record.data;
               vm.setData(data);
               for (var key in data) {
                    if (formPanel.down('#' + key) != null && formPanel.down('#' + key).xtype == 'datefield') {
                         formPanel.down('#' + key).setValue(new Date(data[key]));
                    }
               }
          }
     },
     renderFormValue: function(val, me) {
          store = this.view.up().down('#PasswordPolicy').down('#' + me.column.dataIndex + '').store;
          if (store.data.length == 0) {
               return '';
          }
          var displayValue = store.findRecord('primaryKey', val).data.primaryDisplay;
          return displayValue != null ? displayValue : '';
     },
     setGridData: function(data) {
          var gridStore = this.view.down('#PasswordPolicyGrid').store;
          gridStore.removeAll();
          gridStore.setData(data);
          gridStore.sort('primaryDisplay', 'ASC');
     },
     findChild: function(node, key, value) {
          var dNode = node;
          if (node.data.bConfig != null && node.data.bConfig[key] == value) {
               return node;
          } else if (node.childNodes) {
               for (var index = 0; index < node.childNodes.length; index++) {
                    dNode = this.findChild(node.childNodes[index], key, value);
                    if (dNode) {
                         return dNode;
                    }
               }
          } else {
               return null;
          }
     },
     onDeleteActionColumnClickMainGrid: function(grid, rowIndex) {
          var recordId = grid.store.data.items[rowIndex].data.policyId;
          me = this;
          Ext.MessageBox.confirm({
               title: 'Confirm',
               msg: 'Delete Feature',
               buttons: Ext.MessageBox.YESNO,
               fn: function(clickedButtonId) {
                    if (clickedButtonId == 'yes') {
                         debugger;
                         me.deleteRecord(recordId)
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
     /********************************Form Controller Functions***********************************/
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
          this.view.down('#PasswordPolicy').getViewModel().setData(responseData.response.data);
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
     resetForm: function(but) {
          var form = but.up('form');
          form.reset();
          var data = form.viewModel.getData();
          for (var element in data) {
               data[element] = '';
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
               maskMsg: 'Data saving ...',
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
});