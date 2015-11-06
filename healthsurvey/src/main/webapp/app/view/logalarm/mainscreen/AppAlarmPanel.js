/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.mainscreen.AppAlarmPanel', {
	extend : 'Ext.form.Panel',
	xtype : 'appAlarmPanel',
	requires : [ 'Healthsurvey.view.logalarm.mainscreen.AppAlarmPanelController' ],
	controller : 'appAlarmPanelController',
	items : [ {
		xtype : 'fieldset',
		title : 'App Alarm',
		collapsible : true,
		defaults : {
			anchor : '100% 100%',
			margin : 10,
			labelWidth : 150,
			allowBlank : false,
		},
		items : [{
			xtype : 'hidden',
			name : 'idCounter',
			itemId : 'idCounter',
			value : ''
		},{
			xtype : 'hidden',
			name : 'alarmIndex',
			itemId : 'alarmIndex',
			value : ''
		}, {
			xtype : 'textfield',
			name : 'alarmId',
			itemId : 'alarmId',
			fieldLabel : 'ID',
			emptyText : 'App Alarm ID',
			blankText : 'App Alarm ID should not be blank!',
			disabled : true
		},{
			xtype : 'fieldcontainer',
			fieldLabel : 'Connector Order',
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
				emptyText : 'Connector Order',
				blankText : 'Connector Order should not be blank!',
				margin : '0 10 0 0',
				flex : 1
			}, {
				xtype : 'combobox',
				name : 'connectorOrderSeverity',
				displayField : 'label',
				valueField : 'severity',
				itemId : 'connectorOrderSeverity',
				emptyText : 'Connector Order Severity',
				blankText : 'Connector Order Severity should not be blank!',
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
			emptyText : 'App Alarm Severity',
			blankText : 'App Alarm Severity should not be blank!'
		}, {
			xtype : "textarea",
			name : 'message',
			itemId : 'message',
			fieldLabel : "Message Description",
			emptyText : 'Message should be format specified',
			blankText : 'Message should not be blank!',
			allowBlank : true,
			tip: "Message should be format specified using &lt;string&gt;, &lt;character&gt;, &lt;decimal&gt; and &lt;float&gt; specifiers, e.g &lt;string&gt; Saved Successfully, Error in &lt;string&gt; entity &lt;string&gt; on line &lt;decimal&gt;",
			listeners: {
			    render: function(c) {
			      Ext.create('Ext.tip.ToolTip', {
			        target: c.getEl(),
			        html: c.tip,
			      });
			    },
			  }
			
		}, {
			xtype : "textarea",
			name : 'diagnose',
			itemId : 'diagnose',
			fieldLabel : "Diagnose",
			emptyText : 'Diagnose',
			blankText : 'Diagnose should not be blank!',
			allowBlank : true
		}, {
			xtype : "textarea",
			name : 'solution',
			itemId : 'solution',
			fieldLabel : "Solution",
			emptyText : 'Solution',
			blankText : 'Solution should not be blank!',
			allowBlank : true
		}, {
			xtype : 'fieldcontainer',
			layout : {
				type : 'hbox',
			},
			defaults : {
				margin : '0 0 0 10',
			},
			items : [ {
				flex : 6.5
			}, {
				xtype : "button",
				text : 'Set New',
				name : 'resetButton',
				itemId : 'resetButton',
				flex : 1.5,
				handler : 'onResetButton'
			}, {
				xtype : "button",
				text : 'Update Alarm',
				name : 'addButton',
				itemId : 'addButton',
				formBind : true,
				flex : 2,
				handler : 'onAddAppAlarm'
			} ],
		} ],

	} ],

});