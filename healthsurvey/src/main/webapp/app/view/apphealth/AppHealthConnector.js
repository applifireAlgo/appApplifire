/**
 * 
 */
Ext.define('Healthsurvey.view.apphealth.AppHealthConnector', {
	extend : 'Ext.form.Panel',
	xtype : 'appHealthConnector',

	requires : [ 'Healthsurvey.view.apphealth.AppHealthConnectorController',
			'Ext.form.field.Hidden', 'Ext.form.field.ComboBox',
			'Ext.form.FieldSet' ],
	controller : 'appHealthConnectorController',

	autoScroll : true,
	layout : 'anchor',
	margin : 20,
	defaults : {
		bodyPadding : 25,
		anchor : '70%',
		margin : 10,
		allowBlank : false,
		labelWidth : 150,
	},

	items : [ {
		xtype : 'hidden',
		name : 'schedulerVersionId',
		itemId : 'schedulerVersionId',
		value : '',
		allowBlank : true
	}, {
		xtype : 'hidden',
		name : 'statusVersionId',
		itemId : 'statusVersionId',
		value : '',
		allowBlank : true
	}, {
		xtype : 'hidden',
		name : 'connectorId',
		itemId : 'connectorId',
		value : ''
	}, {
		xtype : 'textfield',
		name : 'connectorName',
		itemId : 'connectorName',
		fieldLabel : 'Connector Name',
		blankText : 'Connector Name should not be blank!',
		readOnly : true
	}, {
		xtype : 'checkbox',
		fieldLabel : 'Enabled',
		itemId : 'isEnabled',
		name : 'isEnabled',
		checked : true
	}, {
		xtype : 'hidden',
		name : 'connectorClass',
		itemId : 'connectorClass',
		value : ''
	}, {
		xtype : 'hidden',
		name : 'dataModel',
		itemId : 'dataModel',
		value : ''
	}, {
		xtype : 'fieldset',
		title : 'Configuration',
		defaults : {
			anchor : '100% 100%',
			margin : 10,
			labelWidth : 150,
			allowBlank : false,
		},
		items : [ {
			xtype : 'fieldset',
			title : 'Disk Status',
			itemId : 'diskProperties',
			defaults : {
				anchor : '100% 100%',
				margin : 10,
				labelWidth : 150,
				allowBlank : false,
			},
			items : [ {
				xtype : 'textfield',
				name : 'diskPath',
				itemId : 'diskPath',
				fieldLabel : 'Monitor Disk Path',
				blankText : 'Monitor Disk Path Size should not be blank!',
			}, {
				xtype : 'textfield',
				name : 'diskThreshold',
				itemId : 'diskThreshold',
				fieldLabel : 'Disk Threshold',
				blankText : 'Disk Threshold should not be blank!',
			} ]
		}, {
			xtype : 'fieldset',
			title : 'Database Status',
			itemId : 'databaseProperties',
			defaults : {
				anchor : '100% 100%',
				margin : 10,
				labelWidth : 150,
				allowBlank : false,
			},
			items : [ {
				xtype : 'textfield',
				name : 'executeSql',
				itemId : 'executeSql',
				fieldLabel : 'Execute SQL',
				blankText : 'Execute SQL should not be blank!',
			} ]
		}, {
			xtype : 'hidden',
			name : 'statusConfigId',
			itemId : 'statusConfigId',
			fieldLabel : 'Status Config ID',
			blankText : 'Status Config ID should not be blank!',
			disabled : true
		}, {
			xtype : 'hidden',
			name : 'threadPoolSize',
			itemId : 'threadPoolSize',
			fieldLabel : 'Thread Pool Size',
			blankText : 'Thread Pool Size should not be blank!',
		}, {
			xtype : 'textfield',
			name : 'batchSize',
			itemId : 'batchSize',
			fieldLabel : 'Batch Size',
			blankText : 'Batch Size should not be blank!'
		}, {
			xtype : 'textfield',
			name : 'refreshTime',
			itemId : 'refreshTime',
			fieldLabel : 'Refresh Time',
			blankText : 'Refresh Time should not be blank!',
		}, {
			xtype : 'textfield',
			name : 'refreshUnit',
			itemId : 'refreshUnit',
			fieldLabel : 'Refresh Unit',
			blankText : 'Refresh Unit should not be blank!',
		} ]
	} ]
});