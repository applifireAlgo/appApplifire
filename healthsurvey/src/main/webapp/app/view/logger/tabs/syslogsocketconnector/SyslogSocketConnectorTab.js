/**
 * 
 */
Ext.define('Healthsurvey.view.logger.tabs.syslogsocketconnector.SyslogSocketConnectorTab', {
	extend : 'Ext.panel.Panel',
	xtype : 'syslogSocketConnectorTab',
	title : 'Syslog Socket Connector',
	layout : 'anchor',
	defaults : {
		anchor : '70% ',
		margin : 10,
		labelWidth : 150,
		allowBlank : false,
	},
	requires : ['Healthsurvey.view.logger.tabs.syslogsocketconnector.SyslogSocketConnectorTabController'],
	controller : 'syslogSocketConnectorTabController',
	items : [{
		xtype : 'hidden',
		name : 'attributeId',
		itemId : 'attributeId',
		value : ''
	},{
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
	},{
		xtype : 'hidden',
		name : 'syslogId',
		value : 'socket.udp.syslog'
	},{
		xtype : 'hidden',
		name : 'syslogLogLevel',
		value : '3'
	},
	{
		xtype : 'hidden',
		name : 'syslogName',
		value : 'SyslogConnector'
	},{
		xtype : 'hidden',
		name : 'syslogClassName',
		value : 'com.spartan.sprinkler.connectors.syslog.SyslogConnector'
	},{
		xtype : 'hidden',
		name : 'syslogCid',
		itemId : 'syslogCid',
		value : '3'
	}, {
		xtype : 'radio',
		itemId : 'syslogEnabled',
		name : 'syslogEnabled',
		fieldLabel : 'Syslog Socket Connector',
		displayField : 'syslogEnabled',
		valueField : 'syslogEnabledId',
		emptyText : 'Choose Syslog Connector',
		disabled : true
	}, {
		xtype : 'textfield',
		name : 'syslogDatabaseHost',
		itemId : 'syslogDatabaseHost',
		fieldLabel : 'Host',
		emptyText : 'Syslog Receiver IP Address',
		regex : /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,
		regexText : 'invalid host name',
		blankText : 'Syslog Receiver IP Address should not be blank!',
		attributeId : '',
		maxLength : 64,
		tip: '',
		  listeners: {
		    render: function(c) {
		      Ext.create('Ext.tip.ToolTip', {
		        target: c.getEl(),
		        html: c.tip 
		      });
		    }}
	}, {
		xtype : 'textfield',
		name : 'syslogDatabasePort',
		itemId : 'syslogDatabasePort',
		fieldLabel : 'Port',
		emptyText : 'Syslog Receiver Port Number',
		blankText : 'Syslog Receiver Port Number should not be blank!',
		attributeId : '',
		maskRe : /[0-9]/,
		maxLength : 4,
		tip: '',
		  listeners: {
		    render: function(c) {
		      Ext.create('Ext.tip.ToolTip', {
		        target: c.getEl(),
		        html: c.tip 
		      });
		    }}
	},

	]
});