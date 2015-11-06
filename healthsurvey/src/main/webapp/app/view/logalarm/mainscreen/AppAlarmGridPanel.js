/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.mainscreen.AppAlarmGridPanel', {
	extend : 'Ext.grid.Panel',
	xtype : 'appAlarmGridPanel',
	requires : [ 'Healthsurvey.view.logalarm.mainscreen.AppAlarmGridPanelController',
			'Ext.grid.column.Action' ],
	controller : 'appAlarmGridPanelController',
	stateful : true,
	collapsible : true,
	collapsed : false,
	multiSelect : true,
	autoScroll : true,
	title : 'App Alarams',
	columnLines : true,
	viewConfig : {
		enableTextSelection : true
	},
	store : {
		fields : [ {
			name : 'alarmIndex',
			type : 'string'
		}, {
			name : 'alarmId',
			type : 'int'
		}, {
			name : 'connectorOrder',
			type : 'string'
		}, {
			name : 'message',
			type : 'string'
		}, {
			name : 'diagnose',
			type : 'string'
		}, {
			name : 'solution',
			type : 'string'
		}, ],
		data : [],
		sorters: [{
	         property: 'alarmId',
	         direction: 'ASC'
	     }],
	},
	initComponent : function() {
		debugger;
		var me = this;
		me.columns = [ {
			text : 'Alarm Index',
			width : '10%',
			sortable : false,
			dataIndex : 'alarmIndex',
			hidden : true
		}, {
			text : 'Alarm ID',
			width : '10%',
			sortable : false,
			dataIndex : 'alarmId'
		}, {
			text : 'Severity',
			width : '10%',
			sortable : false,
			dataIndex : 'severity'
		}, {
			text : 'Connector Order',
			width : '20%',
			sortable : false,
			dataIndex : 'connectorOrder'
		}, {
			text : 'Message',
			width : '20%',
			sortable : false,
			dataIndex : 'message'
		}, {
			text : 'Diagnose',
			width : '20%',
			sortable : false,
			dataIndex : 'diagnose'
		}, {
			text : 'Solution',
			width : '20%',
			dataIndex : 'solution'
		} ];

		me.callParent();
	},
	listeners : {
		select : function(selModel, record, index, options) {
			debugger;
			var appAlarm = record.getData();
			appAlarm.id = appAlarm.alarmIndex;
			this.up().down('#appAlarmPanel').getController().renderFormData(appAlarm);
		}
	}
});
