Ext.define('Healthsurvey.view.mobileview.login.Login', {
		extend:'Ext.container.Viewport',
		bodyPadding : 5,
		closable : false,
		xtype : 'login',
		autoDestroy : true,
		requires : [
		            'Healthsurvey.view.mobileview.login.LoginController',
		            //'Healthsurvey.view.mobileview.login.LoginModel', 
		            'Ext.form.Panel',
		            'Ext.button.Button', 
		            'Ext.form.field.Text',
		            'Healthsurvey.view.mobileview.main.MainPanel'],

		//viewModel : 'login',
		
		controller : 'login',
		 style:{
		    	background:'#fff'
		    },
		    layout:{type: 'fit',
				align:'center',
				pack:'center'
			},
			items:[
	{
		xtype:'form',
		itemId : 'form1',
		title:'',
		height:'50%',
		width:'80%',
		layout:{type: 'vbox',
			align:'center',
			pack:'center'
		},
		defaults:{
			margin:'10 30 0 30',
        	width:'100%',
        	height:40,
		},
		items:[
            {
            	xtype:'image',
            	height:100,
            	width:100,
            	src:'resources/images/applifire_logo.png'
            },
            {
				xtype : 'textfield',
				itemId : 'loginId',
				name : 'loginId',
				emptyText:'Username',
            	margin:'10 30 0 30',
            	width:'100%',
            	height:40,
				allowBlank : false,
				enableKeyEvents : true,
				listeners : {
					specialKey : 'onSpecialKey'
				}
			}, {
				xtype : 'textfield',
				itemId : 'password',
				name : 'password',
				inputType : 'password',
				emptyText:'Password',
            	margin:'10 30 0 30',
            	width:'100%',
            	height:40,
				allowBlank : false,
				enableKeyEvents : true,
				cls : 'password',
				listeners : {
					specialKey : 'onSpecialKey'
				}
			},{
				xtype:'button',
				text : 'Login',
				margin:'10 30 0 30',
            	width:'100%',
            	height:40,
				listeners : {
					click : 'onLoginClick'
				}
			},{
				xtype:'button',
				
				text : 'Forget Password',
				hidden:true,
				listeners : {
					click : 'onForgetPasswordClick'
				}
			}]
	}
            ]
});