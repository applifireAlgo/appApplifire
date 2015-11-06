/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.mainscreen.AddLogAlarmController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.addLogAlarmController',
	
	moduleId : null,
	logModuleName : null,
	systemDefined : null,
	connectorOrder : null,
	connectorOrderSeverity : null,
	connectorOrderGrid : null,
	severity : null,
	idRangeStartsWith : null,
	appAlarmPanel : null,
	appAlarmPanelController : null,
	appAlarmGridPanel : null,
	appAlarmGridPanelController : null,
	
	init : function()
	{
		debugger;
		var currentObject = this;
		currentObject.moduleId = currentObject.view.down('#moduleId');
		currentObject.logModuleName = currentObject.view.down('#logModuleName');
		currentObject.systemDefined = currentObject.view.down('#systemDefined');
		
		currentObject.connectorOrder = currentObject.view.down('#connectorOrder');
		currentObject.connectorOrderSeverity = currentObject.view.down('#connectorOrderSeverity');
		
		currentObject.connectorOrderGrid = currentObject.view.down('#connectorOrderGrid');
		
		currentObject.severity = currentObject.view.down('#severity');
		currentObject.idRangeStartsWith = currentObject.view.down('#idRangeStartsWith');
		
		currentObject.appAlarmPanel = currentObject.view.down('#appAlarmPanel');
		currentObject.appAlarmPanelController = currentObject.appAlarmPanel.getController();
		
		currentObject.appAlarmGridPanel = currentObject.view.down('#appAlarmGridPanel');
		currentObject.appAlarmGridPanelController = currentObject.appAlarmGridPanel.getController();
	},
	
	loadLoggerData : function(logConfigData)
	{
		debugger;
		var currentObject = this;
		var connectorOrderStoreData = currentObject.buildConnectorOrderStore(logConfigData.connectorArray);
		var severityStoreData = currentObject.buildSeverityStore(logConfigData.alarmSeverity);
					
		currentObject.setConnectorOrder(connectorOrderStoreData);
		currentObject.setSeverities(severityStoreData);
		currentObject.appAlarmPanelController.setConnectorOrder(connectorOrderStoreData);
		currentObject.appAlarmPanelController.setSeverities(severityStoreData);
	},
	
	buildConnectorOrderStore : function(connectorData)
	{
		var storeData = [];
		for(var i = 0; i<connectorData.length; i++)
		{
			storeData.push({'cid':connectorData[i].cid, 'name' : connectorData[i].name});
		}
		return storeData;
	},
	
	buildSeverityStore : function(severityData)
	{
		var storeData = [];
		for(var i = 0; i<severityData.length; i++)
		{
			storeData.push({'severity':severityData[i].attributeName, 'label' : severityData[i].attributeValue});
		}
		return storeData;
	},
	
	setFormData : function(logModuleData)
	{
		debugger;
	
		var currentObject = this;
		this.clearFormData();
		
		currentObject.moduleId.setValue(logModuleData.id);
		currentObject.logModuleName.setValue(logModuleData.name);
		currentObject.systemDefined.setValue(logModuleData.systemDefined);
		
		currentObject.idRangeStartsWith.setValue(logModuleData.idRangeStartsWith);
		currentObject.severity.select(currentObject.severity.getStore().getAt(logModuleData.severity));
		
		var connector_orders = logModuleData.connectorOrder.split(',');
		
		for(i = 0;i<connector_orders.length;i++)
		{
			var connector_order = connector_orders[i];
			if(connector_order != -1)
			{
				currentObject.connectorOrder.select(currentObject.connectorOrder.getStore().getAt(i));
				currentObject.connectorOrderSeverity.select(currentObject.connectorOrderSeverity.getStore().getAt(connector_order));
				this.onConnectorAddButton();
			}
		}
		currentObject.appAlarmPanelController.setFormData(logModuleData);
	},
	
	clearConnectorOrderGrid : function()
	{
		this.connectorOrderGrid.store.removeAll();
	},
	
	clearFormData : function()
	{
		debugger;
		var logModuleForm = this.view.getForm();
		logModuleForm.reset();
		this.clearConnectorOrderGrid();
		this.appAlarmGridPanelController.clearGrid();
		this.appAlarmPanelController.onClearButton();
	},
	
	setConnectorOrder : function(connectorsData)
	{
		debugger;
		var store = this.connectorOrder.getStore();
		var connectorOrderStore = Ext.create('Ext.data.Store', {
					fields : ['cid', 'name'],
					data : connectorsData,
					
					sorters: [{
				         property: 'cid',
				         direction: 'ASC'
				     }],
				});

		this.connectorOrder.setStore(connectorOrderStore);
	},
	
	setSeverities : function(severityData)
	{
		debugger;
		var store = this.connectorOrder.getStore();
		var severityStore = Ext.create('Ext.data.Store', {
					fields : ['severity', 'label'],
					data : severityData,
					sorters: [{
				         property: 'severity',
				         direction: 'ASC'
				     }],
				});

		this.connectorOrderSeverity.setStore(severityStore);
		this.severity.setStore(severityStore);
	},
	
	onConnectorAddButton : function(but, evt)
	{
		debugger;
		var currentObject = this;
		
		var cid = this.connectorOrder.getValue();
		var name = this.connectorOrder.getRawValue();
		var severity = this.connectorOrderSeverity.getValue();
		var label = this.connectorOrderSeverity.getRawValue();
		var isPresent = false;
		if(cid==null || name == null || severity==null || label==null || cid=="" || name == "" || severity=="" || label=="")
		{
			Ext.Msg.alert("Error", "Connector Order is Not Selected");
		}
		else
		{
			var connectorObject = [{ 'cid' : cid, 'name': name, 'severity' : severity, 'label' : label }];
		
			var connectorOrderGridStore = this.connectorOrderGrid.store;
			connectorOrderGridStore.each(function(rec) {
			var cid = rec.get('cid');
			var name = rec.get('name')
			var severity = rec.get('severity');
			var label = rec.get('label')
			
			if(cid == currentObject.connectorOrder.getValue()){
				rec.set('name', currentObject.connectorOrder.getRawValue());
				rec.set('severity', currentObject.connectorOrderSeverity.getValue());
				rec.set('label', currentObject.connectorOrderSeverity.getRawValue());
				isPresent = true;
			}
			});
		
			if(!isPresent)
			{
				this.connectorOrderGrid.getStore().add(connectorObject);
			}
		}
	},
	
	onClearButton : function(but, evt) {
		debugger;
		this.clearFormData();
	},
	
	updateLogModules : function(logModuleJSON){
		debugger;
		var currentObject = this;
		
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/LogModule/update',
			jsonData : Ext.JSON.decode(logModuleJSON),
			method : 'PUT',
			success : function(response, opts) {
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
					//get newly updated log modules after update
					currentObject.clearFormData();
					currentObject.view.up().up().controller.getLogModules();
					Ext.Msg.alert("Info",responseJson.response.message);
				} 
				else 
				{
					Ext.Msg.alert("Error...",responseJson.response.message);
				}
			},
			failure : function(response,opts) 
			{
				var responseJson = Ext.JSON.decode(response.responseText);	
				Ext.Msg.alert("Error...",responseJson.response.message); 
			},
		}, this);
	},
	
	onSaveButton : function(but, evt) {
		debugger;
		var currentObject = this;
		var form = but.up('form').getForm();
		var formJSON = Ext.JSON.encode(form.getValues());
				
		var logModuleJSON = this.createLogModuleJSON(formJSON);
		
		if (form.isValid()) {
			this.waitWindow = Ext.MessageBox.wait('Please wait, request in process');
			currentObject.updateLogModules(logModuleJSON);
		} else {
			Ext.Msg.alert('Form Validation', "Form is not valid");
		}
	},
	
	getTranslatedConnectorOrder : function()
	{
		var connectorOrderStore = this.connectorOrder.getStore();
		var connector_order = new Array(connectorOrderStore.data.length);
		for(i = 0; i<connector_order.length ; i++)
		{
			connector_order[i] = -1;
		}
		
		var connectorOrderGridStore = this.connectorOrderGrid.getStore();
		connectorOrderGridStore.each(function(rec) {
			var cid = rec.get('cid');
			var name = rec.get('name')
			var severity = rec.get('severity');
			var label = rec.get('label')
			
			connector_order[cid - 1] = parseInt(severity);
		});
		return connector_order;
	},
	
	createLogModuleJSON : function(formJSON)
	{
		debugger;
		var currentObject = this;

		var connector_order = currentObject.getTranslatedConnectorOrder();
		var isSystemDefined =  currentObject.systemDefined.getValue() == "true" ? true : false;
		
		var alarmsJSON = this.appAlarmGridPanelController.toJson();
		var appAlarmJSON = '';
		appAlarmJSON = appAlarmJSON.concat("'appAlarm': [ ");
		appAlarmJSON = appAlarmJSON + alarmsJSON + "],";
		
		var logModuleJSON = '{';
		logModuleJSON = logModuleJSON.concat("'id': '"+  currentObject.moduleId.getValue() + "',");
		logModuleJSON = logModuleJSON.concat("'name': '"+ currentObject.logModuleName.getValue() + "',");
		logModuleJSON = logModuleJSON.concat("'connectorOrder': '"+ connector_order + "',");
		logModuleJSON = logModuleJSON.concat("'severity': "+ currentObject.severity.getValue() + ",");
		logModuleJSON = logModuleJSON.concat("'idRangeStartsWith': "+ currentObject.idRangeStartsWith.getValue() + ",");
		
		logModuleJSON = logModuleJSON.concat(appAlarmJSON);
		
		logModuleJSON = logModuleJSON.concat("'systemDefined': "+ isSystemDefined + "");
		logModuleJSON = logModuleJSON.concat("}")
		
		return logModuleJSON;
	}
});