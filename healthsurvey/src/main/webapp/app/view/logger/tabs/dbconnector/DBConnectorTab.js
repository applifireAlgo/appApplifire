/**
 * 
 */
Ext
		.define(
				'Healthsurvey.view.logger.tabs.dbconnector.DBConnectorTab',
				{
					extend : 'Ext.panel.Panel',
					xtype : 'dbConnectorTab',
					title : 'DB Connector',
					layout : 'anchor',
					defaults : {
						anchor : '70% ',
						margin : 10,
						allowBlank : false,
						labelWidth : 150,
					},
					requires : [ 'Healthsurvey.view.logger.tabs.dbconnector.DBConnectorTabController' ],
					controller : 'dbConnectorTabController',

					items : [
							{
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
								name : 'dbConnectorId',
								itemId : 'dbConnectorId',
								value : 'db.connector'
							},
							{
								xtype : 'hidden',
								name : 'dbConnectorLogLevel',
								itemId : 'dbConnectorLogLevel',
								value : '5'
							},
							{
								xtype : 'hidden',
								name : 'dbConnectorName',
								itemId : 'dbConnectorName',
								value : 'DatabaseConnector'
							},
							{
								xtype : 'hidden',
								name : 'dbConnectorClassName',
								itemId : 'dbConnectorClassName',
								value : 'com.spartan.sprinkler.connectors.db.DBConnector'
							},
							{
								xtype : 'hidden',
								name : 'dbConnectorCid',
								itemId : 'dbConnectorCid',
								value : '2'
							},
							{
								xtype : 'hidden',
								name : 'dbTablename',
								itemId : 'dbTablename',
								value : 'buzzor_log_events_t'
							},
							{
								xtype : 'radio',
								fieldLabel : 'DB Connector',
								itemId : 'rDBConnectorEnabled',
								name : 'rDBConnectorEnabled',
								displayField : 'dbConnectorEnabled',
								valueField : 'dbConnectorEnabledId',
								emptyText : 'Choose DB Connector',
								disabled : true,
							}, {
									xtype : 'checkbox',	
									fieldLabel : 'Same As Project Creation',
									itemId : 'rSameAsProjectCreation',
									name : 'rSameAsProjectCreation',
									checked : true,
									disabled : true,
							},
							{
								xtype : 'textfield',
								name : 'rBatchSize',
								itemId : 'rBatchSize',
								fieldLabel : 'Batch Size',
								blankText : 'Batch Size should not be blank!',
								attributeId : '',
								maskRe : /[0-9]/,
								maxLength : 4,
								tip : '',
								listeners : {
									render : function(c) {
										Ext.create('Ext.tip.ToolTip', {
											target : c.getEl(),
											html : c.tip
										});
									}
								}
							},
							{
								xtype : 'textfield',
								name : 'rThreadTimeout',
								itemId : 'rThreadTimeout',
								fieldLabel : 'Thread Timeout',
								blankText : 'Thread Timeout should not be blank!',
								attributeId : '',
								maskRe : /[0-9]/,
								maxLength : 4,
								tip : '',
								listeners : {
									render : function(c) {
										Ext.create('Ext.tip.ToolTip', {
											target : c.getEl(),
											html : c.tip
										});
									}
								}
							}, {
								xtype : 'textfield',
								name : 'rThreadPool',
								itemId : 'rThreadPool',
								fieldLabel : 'Thread Pool',
								blankText : 'Thread Pool should not be blank!',
								attributeId : '',
								maskRe : /[0-9]/,
								maxLength : 4,
								tip : '',
								listeners : {
									render : function(c) {
										Ext.create('Ext.tip.ToolTip', {
											target : c.getEl(),
											html : c.tip
										});
									}
								}
							}],
				});