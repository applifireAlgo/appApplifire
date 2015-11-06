/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.mainscreen.AppAlarmGridPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.appAlarmGridPanelController',
	dataGrid : null,
	init : function()
	{
		debugger;
		this.dataGrid = this.view.getStore();
	},
	
	clearGrid : function()
	{
		debugger;
		this.view.store.removeAll();
	},
	
	onRowSelection : function(selModel, record, index, options){
		debugger;
		alert(index);
    },
    
	getAlarmId : function()
	{
		debugger;
		
		var currentObject = this;
		var newAlarmId = 0;
		var isRecFound = false;
		
		currentObject.dataGrid.each(function(rec) {
			debugger;
			isRecFound = true;
			var alarmId = rec.get('alarmId');
			
			if(alarmId > newAlarmId)
			{
				newAlarmId = alarmId;
			}
		});
		if(!isRecFound)
		{
			newAlarmId = this.view.up().down('#idRangeStartsWith').getValue();
		}
		newAlarmId = newAlarmId + 1;
		return newAlarmId;
	},
	
	addDataToGrid : function(formData){
		debugger;
		
		var currentObject = this;
		var isPresent = false;
		
		currentObject.dataGrid.each(function(rec) {
			debugger;
			var alarmId = rec.get('alarmId');
			if(alarmId == formData.alarmId)
			{
				rec.set('severity', formData.severity);
				rec.set('connectorOrder', formData.connectorOrder);
				rec.set('message', formData.message);
				rec.set('diagnose', formData.diagnose);
				rec.set('solution', formData.solution);
				isPresent = true;
			}
		});
		
		if(!isPresent)
		{
			this.dataGrid.add(formData);
		}
	},
	
	toJson : function()
	{
		debugger;
		var appAlarmsJSON = '';
		var appAlarmsGridStore = this.view.getStore();
		
		appAlarmsGridStore.each(function(rec) {
			debugger;
			var id = rec.get('alarmIndex');
			var alarmId = rec.get('alarmId');
			var severity = rec.get('severity')
			var connectorOrder = rec.get('connectorOrder');
			var message = rec.get('message');
			var diagnose = rec.get('diagnose');
			var solution = rec.get('solution');
			
			var alarmJSON = '{';
			alarmJSON = alarmJSON.concat("'id': '"+  id + "',");
			alarmJSON = alarmJSON.concat("'alarmId': "+ alarmId + ",");
			alarmJSON = alarmJSON.concat("'severity': "+ severity + ",");
			alarmJSON = alarmJSON.concat("'connectorOrder': '"+ connectorOrder + "',");
			alarmJSON = alarmJSON.concat("'message': '"+ message + "',");
			alarmJSON = alarmJSON.concat("'diagnose': '"+ diagnose + "',");
			alarmJSON = alarmJSON.concat("'solution': '"+ solution + "'");
			alarmJSON = alarmJSON.concat("},")

			appAlarmsJSON = appAlarmsJSON.concat(alarmJSON);
		});
		appAlarmsJSON = appAlarmsJSON.substring(0,appAlarmsJSON.lastIndexOf(','));
		return appAlarmsJSON;
	}
});
