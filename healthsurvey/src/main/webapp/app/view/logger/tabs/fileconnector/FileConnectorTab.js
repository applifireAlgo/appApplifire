/**
 * 
 */
Ext.define('Healthsurvey.view.logger.tabs.fileconnector.FileConnectorTab', {
	extend : 'Ext.panel.Panel',
	xtype : 'fileConnectorTab',
	title : 'File Connector',
	layout : 'anchor',
	defaults : {
		anchor : '70% ',
		labelWidth : 150,
		margin : 10,
		allowBlank : false,
	},
	requires : ['Healthsurvey.view.logger.tabs.fileconnector.FileConnectorTabController'],
	controller : 'fileConnectorTabController',
	items : [{
			xtype : 'hidden',
			name : 'attributeId',
			itemId : 'attributeId',
			value : ''
			},
			{
				xtype : 'combobox',
				fieldLabel : 'System Defined',
				name : 'systemDefined',
				itemId : 'systemDefined',
				valueField : 'systemDefinedId',
				displayField : 'systemDefined',
				disabled : true,
				store : {
					fields : [ 'systemDefinedId', 'systemDefined' ],
					data : [ [ 'true' , 'true' ], [ 'false', 'false' ]],
				},
			},
	         {
	        			xtype : 'hidden',
	        			name : 'fileConnectorId',
	        			value : 'file.connector'
	         }, {
	        			xtype : 'hidden',
	        			name : 'fileConnectorLogLevel',
	        			value : '4'
	        }, {
	        			xtype : 'hidden',
	        			name : 'fileConnectorName',
	        			value : 'FileConnector'
	        }, {
	        			xtype : 'hidden',
	        			name : 'fileConnectorClassName',
	        			value : 'com.spartan.sprinkler.connectors.file.FileConnector'
	        }, {
	        			xtype : 'hidden',
	        			name : 'fileConnectorCid',
	        			itemId : 'fileConnectorCid',
	        			value : '1'
	        },
	        {
				xtype : 'radio',
				itemId : 'fileConnectorEnabled',
				name : 'fileConnectorEnabled',
				fieldLabel : 'File Connector',
				displayField : 'fileConnectorEnabled',
				valueField : 'fileConnectorEnabledId',
				emptyText : 'Choose File Connector',
				disabled : true,
			},
			{
				xtype : 'textfield',
				name : 'outPath',
				itemId : 'outPath',
				fieldLabel : 'Out Path',
				blankText : 'Out Path should not be blank!',
				emptyText : 'Absolute path for logs',
				attributeId : ''
			},
			{
				xtype : 'textfield',
				name : 'backupPath',
				itemId : 'backupPath',
				fieldLabel : 'Backup Path',
				blankText : 'Backup Path should not be blank!',
				emptyText : 'Absolute path for logs backup',
				attributeId : ''
			},
			{
				xtype : 'combobox',
				name : 'backupDatePattern',
				itemId : 'backupDatePattern',
				fieldLabel : 'Backup Date Pattern',
				displayField : 'backupDate',
				valueField : 'backupDateId',
				emptyText : 'Choose Date Pattern',
				attributeId : '',
				store : {
					fields : [ 'backupDateId', 'backupDate' ],
					data : [ [ 'yyyyMMddHHmmss', 'yyyyMMddHHmmss' ], [ 'yyyyMMdd', 'yyyyMMdd' ], [ 'dd/MM/yyyy', 'dd/MM/yyyy' ] ],
				},
			},
			{
				xtype : 'numberfield',
				name : 'bufferSize',
				itemId : 'bufferSize',
				fieldLabel : 'Buffer Size',
				blankText : 'Buffer Size should not be blank!',
				emptyText : 'Size In KB',
				attributeId : '',
				minValue: 0,
				tip: '',
				
				  listeners: {
				    render: function(c) {
				      Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip 
				      });
				    }}
			},
			{
				xtype : 'numberfield',
				name : 'flushPeriod',
				itemId : 'flushPeriod',
				fieldLabel : 'Flush Period',
				blankText : 'Flush Period should not be blank!',
				emptyText : 'Flush time in seconds',
				attributeId : '',
				minValue: 0,
				tip: '',
				  listeners: {
				    render: function(c) {
				      Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip 
				      });
				    }}
			},
			{
				xtype : 'numberfield',
				name : 'backupAfterNoOfFiles',
				itemId : 'backupAfterNoOfFiles',
				fieldLabel : 'Backup After No Of Files',
				blankText : 'Backup After No Of Files should not be blank!',
				emptyText : 'Keep Latest X number of Backup Files. Choose -1 to keep all the files',
				attributeId : '',
				minValue: -1,
				tip: '',
				  listeners: {
				    render: function(c) {
				      Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip 
				      });
				    }}
			},
			{
				xtype : 'numberfield',
				name : 'rolloverTime',
				itemId : 'rolloverTime',
				fieldLabel : 'Rollover Time',
				blankText : 'Rollover Time should not be blank!',
				emptyText : 'File Roll Over Time',
				attributeId : '',
				minValue: 0,
				tip: '',
				  listeners: {
				    render: function(c) {
				      Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip 
				      });
				    }}
			},
			{
				xtype : 'combobox',
				itemId : 'rolloverTimeUnit',
				name : 'rolloverTimeUnit',
				fieldLabel : 'Rollover Time Unit',
				displayField : 'timeUnit',
				valueField : 'rolloverTimeUnitId',
				emptyText : 'Choose File Rollover Time Unit',
				attributeId : '',
				store : {
					fields : [ 'rolloverTimeUnitId', 'timeUnit' ],
					data : [ [ 'Hours', 'Hours' ], [ 'Days', 'Days' ], [ 'Months', 'Months' ] ],
				},
				tip: '',
				  listeners: {
				    render: function(c) {
				        Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip 
				      });
				    }}
			},
			{
				xtype : 'numberfield',
				name : 'rolloverSize',
				itemId : 'rolloverSize',
				fieldLabel : 'Rollover Size',
				blankText : 'Rollover Size should not be blank!',
				emptyText : 'Rollover File Size',
				attributeId : '',
				minValue: 0,
				tip: '',
				  listeners: {
				    render: function(c) {
				      Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip 
				      });
				    }}
			},
			{
				xtype : 'combobox',
				itemId : 'rolloverSizeUnit',
				name : 'rolloverSizeUnit',
				fieldLabel : 'Rollover Size Unit',
				displayField : 'rolloverSizeUnit',
				valueField : 'rolloverSizeId',
				emptyText : 'Choose File Size Unit',
				attributeId : '',
				store : {
					fields : ['rolloverSizeId', 'rolloverSizeUnit'],
					data : [ [ 'MB', 'MB' ], [ 'GB', 'GB' ], ],
				},
				tip: '',
				  listeners: {
				    render: function(c) {
				      Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip 
				      });
				    }}
			},
			{
				xtype : 'combobox',
				itemId : 'rolloverPolicy',
				name : 'rolloverPolicy',
				fieldLabel : 'Rollover Policy Unit',

				displayField : 'policy',
				valueField : 'policyId',
				emptyText : 'Choose Policy Unit',
				attributeId : '',
				store : {
					fields : [ 'policyId', 'policy' ],
					data : [ [ 0, 'Based on Time ONLY' ],
							[ 1, 'Based on Size ONLY' ],
							[ 2, 'Based on Time or Size' ] ],
				},
				tip: '',
				  listeners: {
				    render: function(c) {
				      Ext.create('Ext.tip.ToolTip', {
				        target: c.getEl(),
				        html: c.tip 
				      });
				    }}
			} ],
});