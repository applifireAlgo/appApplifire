/**
 * 
 */
Ext.define('Healthsurvey.view.mobileview.login.ForgetPasswordWindow', {
	extend : 'Ext.window.Window',
	xtype : 'forgetPasswordWindow',
	requires : [ 'Healthsurvey.view.mobileview.login.ForgetPasswordWindowController' ],
	controller : 'forgetPasswordWindowController',
	title : 'Security Question',
	layout : 'anchor',
	width : '30%',
	height : 250,
	closeAction : 'hide',
	resizable : true,
	defaults : {
		anchor : '100%',
		allowBlank : false,
		margin : 10,
		labelWidth : 80
	},
	items : [ {
		xtype : 'hidden',
		itemId : 'loginId',
		name : 'loginId'
	}, {
		xtype : 'combo',
		itemId : 'secQuestion',
		emptyText : 'Select Questions',
		fieldLabel : 'Security Question<font color="red">*</font>',
		store : {
			fields : [ 'question', 'passRecoveryId' ],
			data : []
		},
		queryMode : 'local',
		forceSelection : true,
		displayField : 'question',
		valueField : 'passRecoveryId',
	}, {
		xtype : 'textarea',
		name : 'answer',
		itemId : 'secAnswer',
		emptyText : 'Enter Your Answer',
		fieldLabel : 'Security Answer<font color="red">*</font>'
	} ],
	buttons : [ {
		text : 'Submit',
		icon : 'images/greenFlopy_save.png',
		listeners : {
			click : 'onSubmitClick'
		}
	}, {
		text : 'Reset',
		icon : 'images/reset1.png',
		listeners : {
			click : 'onResetClick'
		}
	} ]
});