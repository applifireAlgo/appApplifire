/**
 * 
 */
Ext
		.define(
				'Healthsurvey.view.logger.tabs.tcpsocketconnector.TCPSocketConnectorTab',
				{
					extend : 'Ext.panel.Panel',
					xtype : 'tcpSocketConnectorTab',
					title : 'TCP Socket Connector',
					layout : 'anchor',
					defaults : {
						anchor : '70% ',
						margin : 10,
						labelWidth : 150,
						allowBlank : false,
					},
					requires : [ 'Healthsurvey.view.logger.tabs.tcpsocketconnector.TCPSocketConnectorTabController' ],
					controller : 'tcpSocketConnectorTabController',
					items : [
							{
								xtype : 'combobox',
								fieldLabel : 'System Defined',
								name : 'systemDefined',
								itemId : 'systemDefined',
								valueField : 'systemDefinedId',
								displayField : 'systemDefined',
								disabled : true,
								store : {
									fields : [ 'systemDefinedId',
											'systemDefined' ],
									data : [ [ 'true', 'true' ],
											[ 'false', 'false' ] ],
								},
							},
							{
								xtype : 'hidden',
								name : 'attributeId',
								itemId : 'attributeId',
								value : ''
							},
							{
								xtype : 'hidden',
								name : 'tcpId',
								value : 'socket.tcp.server'
							},
							{
								xtype : 'hidden',
								name : 'tcpLogLevel',
								value : '4'
							},
							{
								xtype : 'hidden',
								name : 'tcpName',
								value : 'TCPSocketConnector'
							},
							{
								xtype : 'hidden',
								name : 'tcpClassName',
								value : 'com.spartan.sprinkler.connectors.socket.SocketConnector'
							},
							{
								xtype : 'hidden',
								name : 'tcpCid',
								itemId : 'tcpCid',
								value : '4'
							},
							{
								xtype : 'radio',
								itemId : 'tcpEnabled',
								name : 'tcpEnabled',
								fieldLabel : 'TCP Socket Connector',
								displayField : 'tcpEnabled',
								valueField : 'tcpEnabledId',
								disabled : true
							},
							{
								xtype : 'textfield',
								name : 'tcpDatabaseHost',
								itemId : 'tcpDatabaseHost',
								fieldLabel : 'Host',
								emptyText : 'Server IP Address / Host Name',
								regex : /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})$|^((([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][-_\.a-zA-Z0-9]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,13}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3}))$/,
								regexText : 'invalid host name',
								blankText : 'Server IP Address / Host Name should not be blank!',
								attributeId : '',
								maxLength : 64,
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
								name : 'tcpDatabasePort',
								itemId : 'tcpDatabasePort',
								fieldLabel : 'Port',
								emptyText : 'Server Port Number',
								blankText : 'Server Port Number should not be blank!',
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

					]
				});