Ext.define('Healthsurvey.view.mobileview.login.SessionLogin', {
			extend : 'Ext.window.Window',
			bodyPadding : 10,
			closable : false,
			layout : 'ux.center',
			closeAction : 'destroy',
			modal: true,
			cls : 'login',
			autoDestroy : true,
			requires : ['Healthsurvey.view.mobileview.login.LoginController',
					'Healthsurvey.view.mobileview.login.LoginModel', 'Ext.form.Panel',
					'Ext.button.Button', 'Ext.form.field.Text'],

			viewModel : 'login',
			controller : 'login',
			layout : 'ux.center',
			items : [{
						xtype : 'form',
						width : "30%",
						itemId : 'form1',
						reference : 'form',
						title : 'Session Timeout please login again',
						layout : {
							type : "vbox",
							pack : "center",
							align : "center"
						},

						items : [{
									xtype : 'textfield',
									itemId : 'loginId',
									name : 'loginId',
									fieldLabel : 'Username',
									allowBlank : false,
									enableKeyEvents : true,
									listeners : {
										specialKey : 'onSpecialKey'
									}
								}, {
									xtype : 'textfield',
									itemId : 'passwordtext',
									name : 'password',
									inputType : 'password',
									fieldLabel : 'Password',
									allowBlank : false,
									enableKeyEvents : true,
									cls : 'password',
									listeners : {
										specialKey : 'onSpecialKey'
									}
								}],
						buttons : [{
									text : 'Login',
									listeners : {
										click : 'onSessionLoginClick'
									}
								}]
					}]

		});
