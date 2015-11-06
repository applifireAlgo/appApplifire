/**
 * 
 */
Ext.define('Healthsurvey.view.securityconfig.SecurityConfig', {
	extend : 'Ext.form.Panel',
	xtype : 'securityConfig',
	requires : [ 'Healthsurvey.view.securityconfig.SecurityConfigController',
			'Healthsurvey.view.securityconfig.SecurityQuestion', 'Ext.form.FieldSet',
			'Ext.form.field.Number', 'Ext.form.field.ComboBox' ],
	controller : 'securityConfigController',
	autoScroll : true,

	title : 'Details',
	layout : 'anchor',
	defaults : {
		anchor : '70% ',
		labelWidth : 150,
		margin : 10,
		allowBlank : false,
	},

	items : [ {
		xtype : 'fieldset',
		title : 'Session',
		name : 'sessionConfig',
		itemId : 'sessionConfig',
		layout : 'anchor',
		defaults : {
			anchor : '100%',
			allowBlank : false,
			labelWidth : 150,
			margin : 10,
		},
		items : [ {
			xtype : 'hidden',
			name : 'configId',
			itemId : 'configId',
			allowBlank : true
		}, {
			xtype : 'hidden',
			name : 'selectedPolicyId',
			itemId : 'selectedPolicyId',
			allowBlank : true
		}, {
			xtype : 'hidden',
			name : 'id',
			itemId : 'id',
			allowBlank : true
		},{
			xtype : 'hidden',
			name : 'policyVersionId',
			itemId : 'policyVersionId',
			allowBlank : true
		}, {
			xtype : 'numberfield',
			name : 'timeout',
			itemId : 'timeout',
			fieldLabel : 'Timeout (in sec.)',
			blankText : 'Timeout should not be blank!',
			minValue : 60
		},{
			xtype : 'hidden',
			name : 'algoPK',
			itemId : 'algoPK',
			allowBlank : true
		},{
			xtype : 'hidden',
			name : 'algoVersionId',
			itemId : 'algoVersionId',
			allowBlank : true
		},{
			xtype : 'hidden',
			name : 'algorithm',
			itemId : 'algorithm',
			allowBlank : true
		},{
			xtype : 'hidden',
			name : 'algoName',
			itemId : 'algoName',
			allowBlank : true
		},{
			xtype : 'hidden',
			name : 'algoDescription',
			itemId : 'algoDescription',
			allowBlank : true
		} ]
	}, {
		xtype : 'fieldset',
		title : 'Password',
		name : 'passwordConfig',
		itemId : 'passwordConfig',
		layout : 'anchor',
		defaults : {
			anchor : '100%',
			allowBlank : false,
			labelWidth : 150,
			margin : 10,
		},
		items : [ {
			xtype : 'hidden',
			name : 'policyId',
			itemId : 'policyId',
			allowBlank : true
		}, {
			xtype : 'combobox',
			name : 'encryption',
			itemId : 'encryption',
			fieldLabel : 'Encryption',
			blankText : 'Encryption should not be blank!',
			displayField : 'value',
			valueField : 'id',
			listeners : {
				select : 'onAlgorithmSelection'
			}
		}, {
			xtype : 'numberfield',
			name : 'passwordExpireDays',
			itemId : 'passwordExpireDays',
			fieldLabel : 'Password Expire Days',
			blankText : 'Password Expire Days should not be blank!',
			minValue : 0
		}, {
			xtype : 'numberfield',
			name : 'noOfReuseOfPassword',
			itemId : 'noOfReuseOfPassword',
			fieldLabel : 'No Of Reused Of Password',
			blankText : 'No Of Reused Of Password should not be blank!',
			minValue : 0
		}, {
			xtype : 'combobox',
			name : 'strength',
			itemId : 'strength',
			fieldLabel : 'Strength',
			blankText : 'Strength should not be blank!',
			displayField : 'strength',
			valueField : 'strengthId',
			listeners : {
				select : 'onStrengthSelection'
			}
		}, {
			xtype : 'displayfield',
			name : 'strengthDisplayField',
			itemId : 'strengthDisplayField',
			fieldLabel : '',
			allowBlank : true
		}, {
			xtype : 'fieldset',
			title : 'Custom Password Policy',
			name : 'customPasswordPolicy',
			itemId : 'customPasswordPolicy',
			layout : 'anchor',
			defaults : {
				anchor : '100%',
				allowBlank : false,
				labelWidth : 150,
				margin : 10,
				disabled : true
			},
			items : [ {
				xtype : 'numberfield',
				name : 'minLength',
				itemId : 'minLength',
				fieldLabel : 'Min Length',
				blankText : 'Min Length should not be blank!',
				minValue : 3,
				maxValue : 20
			}, {
				xtype : 'numberfield',
				name : 'maxLength',
				itemId : 'maxLength',
				fieldLabel : 'Max Length',
				blankText : 'Max Length should not be blank!',
				minValue : 3,
				maxValue : 20
			}, {
				xtype : 'numberfield',
				name : 'minCapitalLetters',
				itemId : 'minCapitalLetters',
				fieldLabel : 'Min Capital Letters',
				blankText : 'Min Capital Letters should not be blank!',
				minValue : 0,
				maxValue : 5
			}, {
				xtype : 'numberfield',
				name : 'minSmallLetters',
				itemId : 'minSmallLetters',
				fieldLabel : 'Min Small Letters',
				blankText : 'Min Small Letters should not be blank!',
				minValue : 0,
				maxValue : 5
			}, {
				xtype : 'numberfield',
				name : 'minNumericValues',
				itemId : 'minNumericValues',
				fieldLabel : 'Min Numeric Values',
				blankText : 'Min Numeric Values should not be blank!',
				minValue : 0,
				maxValue : 5
			}, {
				xtype : 'numberfield',
				name : 'minSpecialLetters',
				itemId : 'minSpecialLetters',
				fieldLabel : 'Min Special Letters',
				blankText : 'Min Special Letters should not be blank!',
				minValue : 0,
				maxValue : 5
			}, {
				xtype : 'textfield',
				name : 'allowedSpecialLetters',
				itemId : 'allowedSpecialLetters',
				fieldLabel : 'Allowed Special Letters',
				blankText : 'Allowed Special Letters should not be blank!',
				maskRe : /^[^A-Za-z0-9]+$/
			} ]
		} ]
	}, {
		xtype : 'securityQuestion',
		itemId : 'securityQuestion'
	} ],

	buttons : [ {
		text : 'Reset',
		itemId : 'resetButton',
		handler : 'onResetClick'
	}, {
		text : 'Update',
		formBind : true,
		itemId : 'submitButton',
		handler : 'onSubmitClick'
	} ]
});