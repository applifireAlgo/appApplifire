Ext.define('Healthsurvey.healthsurvey.web.com.app.controller.contacts.CoreContactsMainController', {
     extend: 'Healthsurvey.view.fw.frameworkController.AggregateViewController',
     alias: 'controller.CoreContactsMainController',
     init: function() {
          if (this.view.disableDB != null && this.view.disableDB) {
               this.hideDataBrowser();
          } else {
               this.renderTreeGridData();
          }
          this.addressTypeIdLoad();
          this.titleIdLoad();
          this.nativeLanguageCodeLoad();
          this.genderIdLoad();
          this.timeZoneLoad();
          this.commGroupIdLoad();
          this.countryIdLoad();
     },
     addressTypeIdLoad: function() {
          var scope = this.getView();
          Ext.Ajax.request({
               url: 'secure/AddressType/findAll',
               method: 'GET',
               sender: scope,
               jsonData: {},
               success: function(response, scope) {
                    var compRef = scope.sender.down('#addressTypeId');
                    scope.sender.controller.assignAllComboData(scope.sender, 'addressTypeId', response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, compRef);
               },
               failure: function(response, scope) {
                    var compRef = scope.sender.down('#addressTypeId');
                    scope.sender.controller.addCommunicationLog(response, false, compRef);
               }
          }, scope);
     },
     titleIdLoad: function() {
          var scope = this.getView();
          Ext.Ajax.request({
               url: 'secure/Title/findAll',
               method: 'GET',
               sender: scope,
               jsonData: {},
               success: function(response, scope) {
                    var compRef = scope.sender.down('#titleId');
                    scope.sender.controller.assignAllComboData(scope.sender, 'titleId', response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, compRef);
               },
               failure: function(response, scope) {
                    var compRef = scope.sender.down('#titleId');
                    scope.sender.controller.addCommunicationLog(response, false, compRef);
               }
          }, scope);
     },
     nativeLanguageCodeLoad: function() {
          var scope = this.getView();
          Ext.Ajax.request({
               url: 'secure/Language/findAll',
               method: 'GET',
               sender: scope,
               jsonData: {},
               success: function(response, scope) {
                    var compRef = scope.sender.down('#nativeLanguageCode');
                    scope.sender.controller.assignAllComboData(scope.sender, 'nativeLanguageCode', response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, compRef);
               },
               failure: function(response, scope) {
                    var compRef = scope.sender.down('#nativeLanguageCode');
                    scope.sender.controller.addCommunicationLog(response, false, compRef);
               }
          }, scope);
     },
     genderIdLoad: function() {
          var scope = this.getView();
          Ext.Ajax.request({
               url: 'secure/Gender/findAll',
               method: 'GET',
               sender: scope,
               jsonData: {},
               success: function(response, scope) {
                    var compRef = scope.sender.down('#genderId');
                    scope.sender.controller.assignAllComboData(scope.sender, 'genderId', response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, compRef);
               },
               failure: function(response, scope) {
                    var compRef = scope.sender.down('#genderId');
                    scope.sender.controller.addCommunicationLog(response, false, compRef);
               }
          }, scope);
     },
     timeZoneLoad: function() {
          var scope = this.getView();
          Ext.Ajax.request({
               url: 'secure/Timezone/findAll',
               method: 'GET',
               sender: scope,
               jsonData: {},
               success: function(response, scope) {
                    var compRef = scope.sender.down('#timeZone');
                    scope.sender.controller.assignAllComboData(scope.sender, 'timeZone', response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, compRef);
               },
               failure: function(response, scope) {
                    var compRef = scope.sender.down('#timeZone');
                    scope.sender.controller.addCommunicationLog(response, false, compRef);
               }
          }, scope);
     },
     commGroupIdLoad: function() {
          var scope = this.getView();
          Ext.Ajax.request({
               url: 'secure/CommunicationGroup/findAll',
               method: 'GET',
               sender: scope,
               jsonData: {},
               success: function(response, scope) {
                    var compRef = scope.sender.down('#commGroupId');
                    scope.sender.controller.assignAllComboData(scope.sender, 'commGroupId', response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, compRef);
               },
               failure: function(response, scope) {
                    var compRef = scope.sender.down('#commGroupId');
                    scope.sender.controller.addCommunicationLog(response, false, compRef);
               }
          }, scope);
     },
     countryIdLoad: function() {
          var scope = this.getView();
          Ext.Ajax.request({
               url: 'secure/Country/findAll',
               method: 'GET',
               sender: scope,
               jsonData: {},
               success: function(response, scope) {
                    var compRef = scope.sender.down('#countryId');
                    scope.sender.controller.assignAllComboData(scope.sender, 'countryId', response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, compRef);
               },
               failure: function(response, scope) {
                    var compRef = scope.sender.down('#countryId');
                    scope.sender.controller.addCommunicationLog(response, false, compRef);
               }
          }, scope);
     },
     onCommGroupIdChange: function(me, newValue, oldValue, eOpts) {
          this.onCommGroupIdChangeCommType(me, newValue, oldValue, eOpts);
     },
     onCountryIdChange: function(me, newValue, oldValue, eOpts) {
          this.onCountryIdChangeStateId(me, newValue, oldValue, eOpts);
          this.onCountryIdChangeCityId(me, newValue, oldValue, eOpts);
     },
     onStateIdChange: function(me, newValue, oldValue, eOpts) {
          this.onStateIdChangeCityId(me, newValue, oldValue, eOpts);
     },
     onCommGroupIdChangeCommType: function(me, newValue, oldValue, eOpts) {
          debugger;
          var scope = this.getView();
          Ext.Ajax.request({
               async: false,
               url: 'secure/CommunicationType/findByCommGroupId',
               method: 'POST',
               jsonData: {
                    findKey: newValue
               },
               sender: scope,
               element: me,
               success: function(response, scope) {
                    var commTypeCombo = scope.element.up('form').down('#commType');
                    scope.sender.controller.assignComboData(commTypeCombo, response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, commTypeCombo);
               },
               failure: function(response, scope) {
                    debugger;
                    scope.sender.controller.addCommunicationLog(response, false);
               }
          }, scope);
     },
     onCountryIdChangeStateId: function(me, newValue, oldValue, eOpts) {
          debugger;
          var scope = this.getView();
          Ext.Ajax.request({
               async: false,
               url: 'secure/State/findByCountryId',
               method: 'POST',
               jsonData: {
                    findKey: newValue
               },
               sender: scope,
               element: me,
               success: function(response, scope) {
                    var stateIdCombo = scope.element.up('form').down('#stateId');
                    scope.sender.controller.assignComboData(stateIdCombo, response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, stateIdCombo);
               },
               failure: function(response, scope) {
                    debugger;
                    scope.sender.controller.addCommunicationLog(response, false);
               }
          }, scope);
     },
     onCountryIdChangeCityId: function(me, newValue, oldValue, eOpts) {
          debugger;
          var scope = this.getView();
          Ext.Ajax.request({
               async: false,
               url: 'secure/City/findByCountryId',
               method: 'POST',
               jsonData: {
                    findKey: newValue
               },
               sender: scope,
               element: me,
               success: function(response, scope) {
                    var cityIdCombo = scope.element.up('form').down('#cityId');
                    scope.sender.controller.assignComboData(cityIdCombo, response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, cityIdCombo);
               },
               failure: function(response, scope) {
                    debugger;
                    scope.sender.controller.addCommunicationLog(response, false);
               }
          }, scope);
     },
     onStateIdChangeCityId: function(me, newValue, oldValue, eOpts) {
          debugger;
          var scope = this.getView();
          Ext.Ajax.request({
               async: false,
               url: 'secure/City/findByStateId',
               method: 'POST',
               jsonData: {
                    findKey: newValue
               },
               sender: scope,
               element: me,
               success: function(response, scope) {
                    var cityIdCombo = scope.element.up('form').down('#cityId');
                    scope.sender.controller.assignComboData(cityIdCombo, response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, cityIdCombo);
               },
               failure: function(response, scope) {
                    debugger;
                    scope.sender.controller.addCommunicationLog(response, false);
               }
          }, scope);
     },
     onCommGroupIdChange: function(me, newValue, oldValue, eOpts) {
          this.onCommGroupIdChangeCommType(me, newValue, oldValue, eOpts);
     },
     onCommGroupIdChangeCommType: function(me, newValue, oldValue, eOpts) {
          debugger;
          var scope = this.getView();
          Ext.Ajax.request({
               async: false,
               url: 'secure/CommunicationType/findByCommGroupId',
               method: 'POST',
               jsonData: {
                    findKey: newValue
               },
               sender: scope,
               element: me,
               success: function(response, scope) {
                    var commTypeCombo = scope.element.up('form').down('#commType');
                    scope.sender.controller.assignComboData(commTypeCombo, response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, commTypeCombo);
               },
               failure: function(response, scope) {
                    debugger;
                    scope.sender.controller.addCommunicationLog(response, false);
               }
          }, scope);
     },
     onCountryIdChange: function(me, newValue, oldValue, eOpts) {
          this.onCountryIdChangeStateId(me, newValue, oldValue, eOpts);
          this.onCountryIdChangeCityId(me, newValue, oldValue, eOpts);
     },
     onStateIdChange: function(me, newValue, oldValue, eOpts) {
          this.onStateIdChangeCityId(me, newValue, oldValue, eOpts);
     },
     onCountryIdChangeStateId: function(me, newValue, oldValue, eOpts) {
          debugger;
          var scope = this.getView();
          Ext.Ajax.request({
               async: false,
               url: 'secure/State/findByCountryId',
               method: 'POST',
               jsonData: {
                    findKey: newValue
               },
               sender: scope,
               element: me,
               success: function(response, scope) {
                    var stateIdCombo = scope.element.up('form').down('#stateId');
                    scope.sender.controller.assignComboData(stateIdCombo, response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, stateIdCombo);
               },
               failure: function(response, scope) {
                    debugger;
                    scope.sender.controller.addCommunicationLog(response, false);
               }
          }, scope);
     },
     onCountryIdChangeCityId: function(me, newValue, oldValue, eOpts) {
          debugger;
          var scope = this.getView();
          Ext.Ajax.request({
               async: false,
               url: 'secure/City/findByCountryId',
               method: 'POST',
               jsonData: {
                    findKey: newValue
               },
               sender: scope,
               element: me,
               success: function(response, scope) {
                    var cityIdCombo = scope.element.up('form').down('#cityId');
                    scope.sender.controller.assignComboData(cityIdCombo, response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, cityIdCombo);
               },
               failure: function(response, scope) {
                    debugger;
                    scope.sender.controller.addCommunicationLog(response, false);
               }
          }, scope);
     },
     onStateIdChangeCityId: function(me, newValue, oldValue, eOpts) {
          debugger;
          var scope = this.getView();
          Ext.Ajax.request({
               async: false,
               url: 'secure/City/findByStateId',
               method: 'POST',
               jsonData: {
                    findKey: newValue
               },
               sender: scope,
               element: me,
               success: function(response, scope) {
                    var cityIdCombo = scope.element.up('form').down('#cityId');
                    scope.sender.controller.assignComboData(cityIdCombo, response.responseText);
                    scope.sender.controller.addCommunicationLog(response, true, cityIdCombo);
               },
               failure: function(response, scope) {
                    debugger;
                    scope.sender.controller.addCommunicationLog(response, false);
               }
          }, scope);
     },
     renderTreeGridData: function(responseData) {
          if (responseData == null) {
               responseData = this.fetchDataAjaxCall();
          }
          if (responseData.response.success) {
               var data = responseData.response.data;
               var tree = this.view.down('#CoreContactsTree');
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
               var compRef = this.view.down('#CoreContactsTree');
          } else if (!sessionTimeOutFlag) {
               Ext.Msg.alert('Server Response', responseData.response.message);
          }
     },
     /*********************Main Controller Functions*********************************/
     onDeleteActionColumnClickMainGrid: function(grid, rowIndex) {
          var recordId = grid.store.data.items[rowIndex].data.contactId;
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
          } else {
               var but = this.view.down('#resetFormButton');
               this.resetForm(but);
          }
     },
     resetForm: function(but) {
          var form = but.up('form');
          form.reset();
          var data = form.viewModel.getData();
          for (var element in data) {
               data[element] = '';
          }
          var gridAddress = but.up('form').down('#AddressGrid');
          gridAddress.getStore().removeAll();
          var gridCommunicationData = but.up('form').down('#CommunicationDataGrid');
          gridCommunicationData.getStore().removeAll();
     },
     hideDataBrowser: function() {
          debugger;
          var form = this.view.down('#CoreContacts');
          var grid = this.view.down('#CoreContactsGrid');
          var tree = this.view.down('#CoreContactsTreeContainer');
          this.view.down('#addNewForm').destroy();
          grid.setHidden(true);
          tree.setHidden(true);
          if (this.view.primaryKey != null) {
               this.findById(this.view.primaryKey);
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
          var tree = this.view.down('#CoreContactsTree');
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
     /********************************Tree Controller Functions**********************************/
     onFilterClick: function(but, evt) {
          debugger;
          var currentObject = this.getView();
          var data = but.up('form').getForm().getValues();
          var searchData = {};
          for (key in data) {
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
                    currentObject.view.controller.renderTreeGridData(response);
               },
               failure: function(response, currentObject) {
                    Ext.MessageBox.show({
                         title: 'Error',
                         msg: response.statusText,
                         icon: Ext.MessageBox.ERROR
                    });
                    var currentView = currentObject.view;
                    var compRef = scope.sender.view.down('#CoreContactsTree');
                    currentView.controller.addCommunicationLog(response, false, compRef);
               }
          });
     },
     treeClick: function(me, record, item, index, e, eOpts) {
          if (record.data.leaf) {
               var CoreContacts = this.view.down('#CoreContactsForm');
               CoreContacts.reset();
               var gridPanel = this.view.down('#CoreContactsGrid');
               var foundRecord = gridPanel.store.findRecord('primaryKey', record.data.bConfig.primaryKey);
               if (gridPanel && foundRecord) {
                    gridPanel.setSelection(foundRecord);
               }
          }
          var formPanel = this.getView().up().down('#CoreContactsForm');
          var vm = formPanel.getViewModel();
          var data = record.data.bConfig;
          vm.setData(data);
          for (var key in data) {
               if (formPanel.down('#' + key) != null && formPanel.down('#' + key).xtype == 'datefield') {
                    formPanel.down('#' + key).setValue(new Date(data[key]));
               }
          }
          var AddressGrid = formPanel.down('#AddressGrid');
          AddressGrid.store.loadData(data.address);
          AddressGrid.setSelection(0);
          var CommunicationDataGrid = formPanel.down('#CommunicationDataGrid');
          CommunicationDataGrid.store.loadData(data.communicationData);
          CommunicationDataGrid.setSelection(0);
          this.showFirstCard(formPanel);
          tabPanel = formPanel.up('tabpanel');
          tabPanel.setActiveTab(0);
     },
     /********************************Grid Controller Functions***********************************/
     onGridItemClick: function(me, record, item, index, e, eOpts) {
          var treePanel = this.view.up().up().down('#CoreContactsTree');
          var foundNode = this.findChild(treePanel.getRootNode(), 'primaryKey', record.data.primaryKey);
          if (treePanel && foundNode) {
               treePanel.setSelection(foundNode);
          }
          var formPanel = this.getView().up().down('#CoreContactsForm');
          var vm = formPanel.getViewModel();
          var data = record.data;
          vm.setData(data);
          for (var key in data) {
               if (formPanel.down('#' + key) != null && formPanel.down('#' + key).xtype == 'datefield') {
                    formPanel.down('#' + key).setValue(new Date(data[key]));
               }
          }
          var AddressGrid = formPanel.down('#AddressGrid');
          AddressGrid.store.loadData(data.address);
          AddressGrid.setSelection(0);
          var CommunicationDataGrid = formPanel.down('#CommunicationDataGrid');
          CommunicationDataGrid.store.loadData(data.communicationData);
          CommunicationDataGrid.setSelection(0);
          this.showFirstCard(formPanel);
          tabPanel = formPanel.up('tabpanel');
          tabPanel.setActiveTab(0);
     },
     renderFormValue: function(val, me) {
          store = this.view.up().down('#CoreContacts').down('#' + me.column.dataIndex + '').store;
          if (store.data.length == 0) {
               return '';
          }
          var displayValue = store.findRecord('primaryKey', val).data.primaryDisplay;
          return displayValue != null ? displayValue : '';
     },
     setGridData: function(data) {
          var gridStore = this.view.down('#CoreContactsGrid').store;
          gridStore.removeAll();
          gridStore.add(data);
          gridStore.sort('primaryDisplay', 'ASC');
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
          this.view.down('#CoreContactsForm').getViewModel().setData(responseData.response.data);
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
     addAddress: function(but) {
          var formAddress = but.up();
          var gridAddress = but.up().up().down('#AddressGrid');
          if (formAddress.isValid()) {
               var values = formAddress.getValues();
               var duplicateRecordFound = false;
               var records = gridAddress.getStore().data.items;
               var duplicateRecordFound = false;
               for (var index = 0; index < records.length; index++) {
                    if (this.isDuplicateRecord(values, records[index].data)) {
                         duplicateRecordFound = true;
                         break;
                    }
               }
               if (!duplicateRecordFound) {
                    var modifiedValues = this.modifyFormValues(values, formAddress);
                    gridAddress.getStore().add(modifiedValues);
               }
               formAddress.reset();
          }
     },
     onAddressGridItemClick: function(cellModel, record, rowIndex, columnIndex, eOpts, comp) {
          var form;
          if (comp != null) {
               form = comp.up();
          } else {
               form = this.view.down('#AddressForm');
          }
          form.loadRecord(record)
     },
     addCommunicationData: function(but) {
          var formCommunicationData = but.up();
          var gridCommunicationData = but.up().up().down('#CommunicationDataGrid');
          if (formCommunicationData.isValid()) {
               var values = formCommunicationData.getValues();
               var duplicateRecordFound = false;
               var records = gridCommunicationData.getStore().data.items;
               var duplicateRecordFound = false;
               for (var index = 0; index < records.length; index++) {
                    if (this.isDuplicateRecord(values, records[index].data)) {
                         duplicateRecordFound = true;
                         break;
                    }
               }
               if (!duplicateRecordFound) {
                    var modifiedValues = this.modifyFormValues(values, formCommunicationData);
                    gridCommunicationData.getStore().add(modifiedValues);
               }
               formCommunicationData.reset();
          }
     },
     onCommunicationDataGridItemClick: function(cellModel, record, rowIndex, columnIndex, eOpts, comp) {
          var form;
          if (comp != null) {
               form = comp.up();
          } else {
               form = this.view.down('#CommunicationDataForm');
          }
          form.loadRecord(record)
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
          var firstCard = form.down('#form0');
          if (!firstCard.getForm().isValid()) {
               this.showCard(form, firstCard);
               return;
          }
          var AddressForm = form.down('#AddressForm');
          var Address = form.down('#AddressGrid');
          if (!(AddressForm.isValid() || Address.store.getCount() != 0)) {
               this.showCard(form, AddressForm);
               return;
          }
          this.addAddress(AddressForm.down('button'));
          var CommunicationDataForm = form.down('#CommunicationDataForm');
          var CommunicationData = form.down('#CommunicationDataGrid');
          if (!(CommunicationDataForm.isValid() || CommunicationData.store.getCount() != 0)) {
               this.showCard(form, CommunicationDataForm);
               return;
          }
          this.addCommunicationData(CommunicationDataForm.down('button'));
          var data = form.getViewModel().getData();
          var AddressBindLavel = Address.bindLevel;
          delete data[AddressBindLavel];
          this.createObject(data, AddressBindLavel, this.fetchDataFromStore(Address.getStore()));
          var CommunicationDataBindLavel = CommunicationData.bindLevel;
          delete data[CommunicationDataBindLavel];
          this.createObject(data, CommunicationDataBindLavel, this.fetchDataFromStore(CommunicationData.getStore()));
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