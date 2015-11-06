Ext.define('Healthsurvey.view.login.LoginPage', {
	extend : 'Ext.panel.Panel',
	xtype : 'login',

	controller : 'login',
	requires : [ 'Healthsurvey.view.login.LoginPageController',
	             // 'Healthsurvey.view.login.LoginModel',
	             'Ext.form.Panel', 'Ext.button.Button', 'Ext.form.field.Text', 'Healthsurvey.view.main.MainPanel' ],

	             closable : false,
	             autoDestroy : true,
	             resizable : true,

	             // viewModel : 'login',

	             layout: 'fit',

	             items : {

	            	 layout: 'center',	
	            	 bodyStyle : {
	            		 backgroundColor: '#f3f3f4'
	            	 },	

	            	 items : {
	            		 width: '35%',
	            		 height: '80%',
	            		 xtype : 'panel',
	            		 bodyStyle : {
	            			 backgroundColor: '#f3f3f4'
	            		 },
	            		 layout : {
	            			 align : 'center',
	            			 pack : 'center',
	            			 type : 'vbox'
	            		 },

	            		 items : [ {

	            			 flex : 1,

	            			 xtype : 'form',
	            			 itemId : 'form1',
	            			 reference : 'form',
	            			 header : false,
	            			 width : "45%",

	            			 bodyStyle : {
	            				 backgroundColor: '#f3f3f4'
	            			 },

	            			 layout : 'anchor',

	            			 defaults : {
	            				 margin : '0 0 10 0',
	            			 },

	            			 items : [ {
	            				 anchor : '100% 30%',
	            				 xtype : 'image',
	            				 itemId : 'projectIcon',
	            				 name : 'projectIcon',
	            				 src : 'resources/css/images/logo.png'
	            			 }, {	
	            				 anchor : '100% 5%',
	            				 xtype : 'displayfield',
	            				 itemId : 'projectName',
	            				 name : 'projectName',
	            				 value : '#ProjectName#', 
	            				 fieldCls : 'loginProjectName'
	            			 }, { 
	            				 xtype : 'panel',         				 
	            				 itemId : 'projectDesc',
	            				 name : 'projectDesc',
	            				 hidden:true,
	            				 html : "#ProjectDesc#"	            				 
	            			 }, {	
	            				 anchor : '100% 6%',
	            				 xtype : 'textfield',
	            				 itemId : 'loginId',
	            				 name : 'loginId',
	            				 fieldBodyCls : 'loginTextfieldBody',
	            				 cls : 'loginTextfield',
	            				 emptyText : 'Username',
	            				 allowBlank : false,
	            				 enableKeyEvents : true,
	            				 listeners : {
	            					 specialKey : 'onSpecialKey'
	            				 }
	            			 }, {
	            				 anchor : '100% 6%',
	            				 xtype : 'textfield',
	            				 itemId : 'password',
	            				 name : 'password',
	            				 cls : 'loginTextfield',
	            				 fieldBodyCls : 'loginTextfieldBody',
	            				 inputType : 'password',
	            				 emptyText : 'Password',
	            				 allowBlank : false,
	            				 enableKeyEvents : true,
	            				 listeners : {
	            					 specialKey : 'onSpecialKey'
	            				 }
	            			 }, {
	            				 anchor : '100% 6%',
	            				 xtype : 'button',
	            				 text : 'Login',
	            				 style : {
	            					 backgroundColor : '#FF5050',
	            					 border : 0
	            				 },				
	            				 listeners : {
	            					 click : 'onLoginClick'
	            				 }
	            			 } ,{
	            				 anchor : '100% 6%',
	            				 xtype : 'button',
	            				 text : 'Forgot Password? Need Help',
	            				 style : {
	            					 backgroundColor : '#3892d3',
	            					 border : 0
	            				 },
	            				 listeners : {
	            					 click : 'onForgetPasswordClick'
	            				 }
	            			 } ]
	            		 } ],
	            	 }}, 
	            	 listeners : {
	            		 scope : 'controller',
	            		 afterrender : 'getLocation'
	            	 }
});