/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.mainscreen.AppAlarmPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.appAlarmPanelController',
	
	alarmIndex : null,
	alarmId : null,
	severity : null,
	connectorOrder : null,
	connectorOrderSeverity : null,
	connectorOrderGrid : null,
	
	idCounter : null,
	message : null,
	diagnose : null,
	solution : null,
	
	init : function(){
		debugger;
		var currentObject = this;
		currentObject.alarmIndex = currentObject.view.down('#alarmIndex');
		currentObject.alarmId = currentObject.view.down('#alarmId');
		currentObject.severity = currentObject.view.down('#severity');
		currentObject.connectorOrder = currentObject.view.down('#connectorOrder');
		currentObject.connectorOrderSeverity = currentObject.view.down('#connectorOrderSeverity');
		currentObject.connectorOrderGrid = currentObject.view.down('#connectorOrderGrid');
		
		currentObject.message = currentObject.view.down('#message');
		currentObject.diagnose = currentObject.view.down('#diagnose');
		currentObject.solution = currentObject.view.down('#solution');
		currentObject.idCounter = currentObject.view.down('#idCounter');
	},
	
	setFormData : function(logModuleData)
	{
		debugger;
		var currentObject = this;
		var appAlarmGridPanelController = this.view.up().down('#appAlarmGridPanel').getController();
		appAlarmGridPanelController.clearGrid();
		
		currentObject.view.down('#addButton').setText('Update Alarm');
		
		for(var i = 0; i<logModuleData.appAlarm.length; i++)
		{
			var appAlarm = logModuleData.appAlarm[i];
			this.renderFormData(appAlarm);
				
			var appAlarmGridPanelController = this.view.up().down('#appAlarmGridPanel').getController();
				
			appAlarmGridPanelController.addDataToGrid({
				"alarmIndex" : appAlarm.id,
			    "alarmId": appAlarm.alarmId,
			    "severity": appAlarm.severity,
			    "connectorOrder": appAlarm.connectorOrder,
			    "message": appAlarm.message,
			    "diagnose": appAlarm.diagnose,
			    "solution": appAlarm.solution
			});
		}
	},
	
	renderFormData : function(appAlarm)
	{
		debugger;
		var currentObject = this;
		currentObject.clearConnectorOrderGrid();
		currentObject.alarmIndex.setValue(appAlarm.id);
		currentObject.alarmId.setValue(appAlarm.alarmId);
		currentObject.severity.select(currentObject.severity.getStore().getAt(appAlarm.severity));
		
		var connector_orders = appAlarm.connectorOrder.split(',');
		
		this.connectorOrderGrid.getStore()
		for(var j = 0;j<connector_orders.length;j++)
		{
			var connector_order = connector_orders[j];
			if(connector_order != -1)
			{
				currentObject.connectorOrder.select(currentObject.connectorOrder.getStore().getAt(j));
				currentObject.connectorOrderSeverity.select(currentObject.connectorOrderSeverity.getStore().getAt(connector_order));
				this.onConnectorAddButton();
			}
		}
	
		currentObject.message.setValue(this.getFormattedMessage(appAlarm.message));
		currentObject.diagnose.setValue(appAlarm.diagnose);
		currentObject.solution.setValue(appAlarm.solution);
	},
	
	getFormattedMessage : function(message)
	{
		debugger;
		message = message.replace(/%s/ig, "<string>");
		message = message.replace(/%c/ig, "<character>");
		message = message.replace(/%d/ig, "<decimal>");
		message = message.replace(/%f/ig, "<float>");
		return message;
	},
	
	getFormatSpecifiedMessage : function(message)
	{
		debugger;
		message = message.replace(/<string>/ig, "%s");
		message = message.replace(/<character>/ig, "%c");
		message = message.replace(/<decimal>/ig,"%d");
		message = message.replace(/<float>/ig,"%f");
		return message;
	},
	
	clearConnectorOrderGrid : function()
	{
		this.connectorOrderGrid.store.removeAll();
	},
	
	onClearButton : function() {
		debugger;
		var appAlarmForm = this.view.getForm();
		appAlarmForm.reset();
		this.clearConnectorOrderGrid();
	},
	
	onResetButton : function(but,evt){
		debugger;
		this.onClearButton();
		
		var appAlarmGridPanelController = this.view.up().down('#appAlarmGridPanel').getController();
		var alarm_id = appAlarmGridPanelController.getAlarmId();
		this.alarmId.setValue(alarm_id);
		this.view.down('#addButton').setText('Add Alarm');
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
	
	onAddAppAlarm : function(but, evt){		
		debugger;
		var form = but.up('form').getForm();
		var formData = form.getValues();
		formData.alarmId = this.alarmId.getValue();
		
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
		
		formData.connectorOrder = connector_order
		formData.message = this.getFormatSpecifiedMessage(formData.message);
		var appAlarmGridPanelController = this.view.up().down('#appAlarmGridPanel').getController();
		appAlarmGridPanelController.addDataToGrid(formData);
		but.setText('Update Alarm');
	}
});