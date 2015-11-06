Ext.define('Healthsurvey.view.login.ChangePasswordScreen', {
	extend : 'Ext.window.Window',
	bodyPadding : 5,
	closable : false,
	title : 'Change Password',
	requires : [ 'Healthsurvey.view.login.ChangePasswordScreenController' ],
	xtype : 'changePasswordScreen',
	autoDestroy : true,
	controller : 'changePasswordScreenController',
	layout : {
		type : 'anchor',
		align : 'center'
	},
	resizable : true,

	/*items : [ {
		xtype : 'panel',
		layout : {
			align : 'middle',
			pack : 'center',
			type : 'hbox'
		},*/
		items : [ {
			xtype : 'form',
			width : "30%",
			itemId:'changePwdForm',
			reference : 'form',
			//title : 'Change Password',
			layout : {
				type : "vbox",
				pack : "center",
				align : "center"
			},

			margin : '10 0 0 0',
			items : [ {
				xtype : 'textfield',
				name : 'oldPassword',
				itemId : 'oldPassword',
				fieldLabel : 'Old Password<font color="red">*</font>',
				inputType : 'password',
			}, {
				xtype : 'textfield',
				name : 'newPassword',
				itemId : 'newPassword',
				fieldLabel : 'New Password<font color="red">*</font>',
				inputType : 'password',
			}, {
				xtype : 'textfield',
				name : 'reTypeNewPassword',
				fieldLabel : 'Re-Type New Password<font color="red">*</font>',
				inputType : 'password',
				validator : function(value) {
					if (value == this.up().up().down('#newPassword').getValue()) {
						return true;
					} else {
						return 'new password is not matched'
					}
				}
			}, {
				xtype : 'hidden',
				name : 'changePasswordInNextLogin',
				value : true
			} ],
			buttons : [ {
				text : 'Change Password',
				icon : 'images/user/pwdReset.png',
				handler : 'onChangePasswordClick'
			}, {
				text : 'Reset',
				icon : 'images/reset1.png',
				handler : 'onResetClick'
			} ]
		} ]
	//} ]
});