Ext.define('Healthsurvey.view.usermanagement.admin.UserPasswordReset', {
	extend : 'Ext.form.Panel',
	requires : [ 'Healthsurvey.view.usermanagement.admin.UserPasswordResetController' ],
	controller : 'userPwdResetController',
	xtype : 'userPwdResetView',
	layout : {
		type : 'vbox',
		align : 'stretch',
	},
	bodyPadding : '5',
	items : [ {

	}, {
		flex : 1,
		title : 'Users',
		xtype : 'grid',
		border : true,
		itemId : 'userPwdGrid',
		selType : 'checkboxmodel',
		multiColumnSort : true,
		// plugins: 'gridfilters',
		store : new Ext.create('Ext.data.Store', {
			fields : [ 'firstName', 'middleName', 'lastName', 'loginId', 'userId', 'isLocked' ],
			data : [],
			sorters : [ {
				property : 'firstName',
				direction : 'ASC'
			}, 'lastName' ],
		}),
		columns : [ {
			text : 'First Name',
			flex : 0.33,
			dataIndex : 'firstName',
		/*
		 * filter: { type: 'string', itemDefaults: { emptyText: 'Search for
		 * Users...' } }
		 */
		}, {
			text : 'Middle Name',
			flex : 0.33,
			dataIndex : 'middleName'
		}, {
			text : 'Last Name',
			flex : 0.33,
			dataIndex : 'lastName'
		} ],
		listeners : {
			afterrender : 'afterUserGridRender'
		},
		tbar : [ {
			xtype : "textfield",
			emptyText : "Search Users..",
			emptyCls : "emptyTextField",
			margin : '3',
			listeners : {
				change : "onGridTextFieldChange",
				buffer : 250
			}
		}, '->', {
			xtype : 'numberfield',
			fieldLabel : 'Session TimeOut',
			emptyText : 'Set Session Time Out In Seconds',
			minValue : 120,
			margin : '3',
			itemId : 'sessionTimeFieldId',
			labelAlign : 'left',
			labelWidth : 110
		} ],
		dockedItems : [ {
			xtype : 'pagingtoolbar',
			// store: store, // same store GridPanel is using
			dock : 'bottom',
			displayInfo : true
		} ],
	} ],
	buttons : [ {
		text : 'Reset Password',
		icon : 'images/user/modifyPwd.png',
		tooltip : 'Reset',
		listeners : {
			click : 'onResetPwdClick'
		}
	}, /*{
		text : 'Generate One Time Password',
		icon : 'images/user/pwdReset.png',
		tooltip : 'Generate One Time Password',
		listeners : {
			click : 'onGenerateOneTimePasswordClick'
		}
	},*/ {
		text : 'Change Password in Next Login',
		icon : 'images/user/pwdReset.png',
		tooltip : 'Change Password in Next Login',
		listeners : {
			click : 'onChangePasswordInNextLoginClick'
		}
	}, {
		text : 'Lock Account',
		icon : 'images/user/lock.png',
		tooltip : 'Lock Account',
		listeners : {
			click : 'onLockAccountClick'
		}
	}, {
		text : 'Unlock Account',
		icon : 'images/user/unlock.png',
		tooltip : 'Unlock Account',
		listeners : {
			click : 'onUnLockAccountClick'
		}
	}, {
		text : 'Save Session TimeOuts',
		icon : 'images/user/timeouts.png',
		tooltip : 'Save Session TimeOuts',
		listeners : {
			click : 'onSaveSessionTimeoutsClick'
		}
	} ]
});