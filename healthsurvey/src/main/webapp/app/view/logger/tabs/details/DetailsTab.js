/**
 * 
 */
Ext.define('Healthsurvey.view.logger.tabs.details.DetailsTab', {
	extend : 'Ext.panel.Panel',
	xtype : 'detailsTab',
	title : 'Details',
	layout : 'anchor',
	defaults : {
		anchor : '70% ',
		labelWidth : 150,
		margin : 10,
		allowBlank : false,
	},
	requires : ['Healthsurvey.view.logger.tabs.details.DetailsTabConnector'],
	controller : 'detailsTabConnector',
	items : [
	        {
	    		xtype : 'hidden',
	    		name : 'detailsId',
	    		value : 'details'
	        },
			{
				xtype : 'combobox',
				itemId : 'alarmQueueType',
				name : 'alarmQueueType',
				fieldLabel : 'Alarm Queue Type',
				displayField : 'queueType',
				valueField : 'queueId',
				emptyText : '',
				attributeId : '',
				store : {
					fields : [ 'queueId', 'queueType' ],
					data : [ [ 0, 'Circular Queue (RECOMMENDED)' ],
							[ 1, 'Infinite Queue' ],
							[ 2, 'Infinite Queue (NOT RECOMMENDED)' ] ],
				},
				tip: 'Logging Framework is Asynchronous in nature. Log Events goes to the Queue first and connectors takes the event from the queue for processing. Event Queue Type 0 - Circular Queue (RECOMMENDED) 1 - Infinite Queue with Initial Capacity and events will be wrapped in Soft References (JVM will garbage collect these soft references when it runs out of memory). 2 - Infinite Queue (NOT RECOMMENDED)',
				listeners: {
				    render: function(c) {
				      Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip,
				      });
				    },
				  }
			}, {
				xtype : 'numberfield',
				name : 'alarmVolume',
				itemId : 'alarmVolume',
				fieldLabel : 'Alarm Size',
				blankText : 'Alarm Size should not be blank!',
				attributeId : '',
				minValue: 0,
		    }, {
				xtype : 'numberfield',
				name : 'refreshFrequency',
				itemId : 'refreshFrequency',
				fieldLabel : 'Refresh Frequency',
				emptyText : 'In Minutes',
				blankText : 'Refresh Frequency should not be blank!',
				attributeId : '',
				minValue: 0,
				tip: 'Refresh Time to reload this configuration file In a production environment, if you want to debug a specific component you can change the Alarm Log Levels (for specific Target like File, DB etc) of that specific components. Once the configuration is refreshed new Log Events will be written to the configured Target (File, DB etc). This will help to isolate and troubleshoot a production environment without shutting down the application.',
				  listeners: {
				    render: function(c) {
				      Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip,
				      });
				    }}
			}, {
				xtype : 'fieldset',
				title : 'Alarm Saverity',
				defaultType : 'textfield',
				name : 'alarmSaverity',
				itemId : 'alarmSaverity',
				collapsible : false,
				layout : 'anchor',
				defaults : {
					anchor : '100% ',
					allowBlank : false,
					labelWidth : 150,
				},
				items : [ {
					xtype : 'textfield',
					name : 'saverity0',
					itemId : 'saverity0',
					fieldLabel : '0  ',
					blankText : 'Alarm Saverity 0 should not be blank!',
					attributeId : '',
					value : 'Debug',
					vtype : 'alphanum',
				}, {
					xtype : 'textfield',
					name : 'saverity1',
					itemId : 'saverity1',
					fieldLabel : '1  ',
					blankText : 'Alarm Saverity 1 should not be blank!',
					attributeId : '',
					value : 'Trace',
					vtype : 'alphanum',

				}, {
					xtype : 'textfield',
					name : 'saverity2',
					itemId : 'saverity2',
					fieldLabel : '2  ',
					blankText : 'Alarm Saverity 2 should not be blank!',
					attributeId : '',
					value : 'Info',
					vtype : 'alphanum',
				}, {
					xtype : 'textfield',
					name : 'saverity3',
					itemId : 'saverity3',
					fieldLabel : '3  ',
					blankText : 'Alarm Saverity 3 should not be blank!',
					attributeId : '',
					value : 'Warning',
					vtype : 'alphanum',
				}, {
					xtype : 'textfield',
					name : 'saverity4',
					itemId : 'saverity4',
					fieldLabel : '4  ',
					blankText : 'Alarm Saverity 4 should not be blank!',
					attributeId : '',
					value : 'Critical',
					vtype : 'alphanum',
				}, {
					xtype : 'textfield',
					name : 'saverity5',
					itemId : 'saverity5',
					fieldLabel : '5  ',
					blankText : 'Alarm Saverity 5 should not be blank!',
					attributeId : '',
					value : 'Fatal',
					vtype : 'alphanum',
				} ]

			} ],
});