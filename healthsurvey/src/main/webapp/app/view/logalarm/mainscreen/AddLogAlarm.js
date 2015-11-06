/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.mainscreen.AddLogAlarm', {
	extend : 'Ext.form.Panel',
	xtype : 'addLogAlarm',
	requires : [ 'Healthsurvey.view.logalarm.mainscreen.AddLogAlarmController',
			'Healthsurvey.view.logalarm.mainscreen.AppAlarmGridPanel',
			'Healthsurvey.view.logalarm.mainscreen.AppAlarmPanel',
			'Ext.form.FieldSet', 'Ext.form.field.ComboBox',
			'Ext.form.FieldContainer' ],
	controller : 'addLogAlarmController',
	title : 'Add Alarm',
	layout : 'anchor',
	autoScroll : true,
	defaults : {
		anchor : '100% 100%',
		margin : 10,
		labelWidth : 150,
		allowBlank : false,
	},
	
	items : [ {
		xtype : 'fieldset',
		title : 'Log Module',
		collapsible : true,
		defaults : {
			anchor : '100% 100%',
			margin : 10,
			labelWidth : 150,
			allowBlank : false,
		},
		items : [ {
			xtype : 'hidden',
			name : 'moduleId',
			itemId : 'moduleId',
			value : ''
		},{
			xtype : 'hidden',
			name : 'systemDefined',
			itemId : 'systemDefined',
			value : ''
		},{
			xtype : 'textfield',
			name : 'logModuleName',
			itemId : 'logModuleName',
			fieldLabel : 'Log Module Name',
			emptyText : 'Log Module Name',
			blankText : 'Log Module Name should not be blank!'
		}, {
			xtype : 'fieldcontainer',
			fieldLabel : 'Default Connector Order',
			defaults : {
				labelWidth : 150,
				allowBlank : false,
			},
			layout : 'hbox',
			items : [ {
				xtype : 'combobox',
				name : 'connectorOrder',
				itemId : 'connectorOrder',
				displayField : 'name',
				valueField : 'cid',
				emptyText : 'Default Connector Order',
				blankText : 'Default Connector Order should not be blank!',
				margin : '0 10 0 0',
				flex : 1
			}, {
				xtype : 'combobox',
				name : 'connectorOrderSeverity',
				displayField : 'label',
				valueField : 'severity',
				itemId : 'connectorOrderSeverity',
				emptyText : 'Default Connector Order Severity',
				blankText : 'Default Connector Order Severity should not be blank!',
				margin : '0 10 0 0',
				flex : 1
			}, {
				xtype : 'button',
				text : 'Add',
				itemId : 'connectorAddButton',
				handler : 'onConnectorAddButton',
				flex : 1
			} ]
		}, {
			xtype : 'fieldcontainer',
			fieldLabel : 'Selected Default Connector Order',
			defaults : {
				labelWidth : 150,
				allowBlank : false,
			},
			items : [{
				xtype : 'grid',
				name : 'connectorOrderGrid',
				itemId : 'connectorOrderGrid',
				height : 150,
				stateful : true,
				collapsed : false,
				multiSelect : true,
				autoScroll : true,
				fieldLabel : 'Connector Order',
				columnLines : true,
				viewConfig : {
					enableTextSelection : true
				},
				store : {
					fields : [],
					data : []
				},
				columns : [ {
					text : 'Connector ID',
					width : '25%',
					sortable : true,
//					hidden : true,
					dataIndex : 'cid'
				}, {
					text : 'Connector Name',
					width : '25%',
					dataIndex : 'name'
				}, {
					text : 'Severity ID',
					width : '25%',
//					hidden : true,
					dataIndex : 'severity'
				}, {
					text : 'Severity',
					width : '25%',
					dataIndex : 'label'
				}]
			} ]
		}, {
			xtype : 'combobox',
			name : 'severity',
			itemId : 'severity',
			fieldLabel : 'Severity',
			displayField : 'label',
			valueField : 'severity',
			emptyText : 'Log Severity',
			blankText : 'Severity should not be blank!'
		},{
			xtype : 'numberfield',
			name : 'idRangeStartsWith',
			itemId : 'idRangeStartsWith',
			fieldLabel : 'Alarm ID Start Range',
			minValue : 0,
			value : 5000,
			disabled : true,
			emptyText : 'Alarm ID Range Starts With Mentioned Number',
			blankText : 'Alarm ID Range Starts With should not be blank!'
		} ]

	}, {
		xtype : 'appAlarmPanel',
		itemId : 'appAlarmPanel'
	}, {
		xtype : 'appAlarmGridPanel',
		itemId : 'appAlarmGridPanel'
	} ],
});