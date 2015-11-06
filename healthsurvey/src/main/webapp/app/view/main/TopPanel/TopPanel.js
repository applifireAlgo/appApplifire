Ext.define('Healthsurvey.view.main.TopPanel.TopPanel', {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'customHeader',
	requires : [ 'Healthsurvey.view.main.TopPanel.TopPanelController' ],
	controller : 'topPanelController',

	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	items : [ {
		xtype : 'button',
		icon : 'resources/css/images/menu.png',

		action : 'menuBtnToggle',
		itemId: 'appplicationMainMenuBtn',
		pressed : true,
		tooltip : 'Menu',
		enableToggle : true,
	/* plugins: 'responsive',
	     responsiveConfig: {
	         tall:{
	             visible: false
	         },
	         wide:{
	             visible: true
	         }
	     }*/
	}, {
		xtype : 'image',
		padding : 1,
		width : 100,
		height : 25,
		src : 'resources/css/images/logo.png'
	}, '->', {
		xtype : 'image',
		src : 'images/menu/search.png',
		//margin :'5 2 0 5',
		height : 20,
		width : 28,
		listeners : {
			'afterrender' : function(comp) {
				comp.getEl().on('click', function(el) {
					this.fireEvent('onSearchClick');
				}, this);
			},
			onSearchClick : 'onSearchClick'
		}
	},{
		xtype : 'image',
		src : 'images/menu/clouddrive.png',
		//margin :'5 2 0 5',
		height : 20,
		width : 28,
		listeners : {
			'afterrender' : function(comp) {
				comp.getEl().on('click', function(el) {
					this.fireEvent('onCloudClick');
				}, this);
			},
			onCloudClick : 'onCloudClick'
		}
	}, {
		xtype : 'button',
		text : 'Logout',
		icon : 'resources/css/images/logout.png',
		padding : 1,
		handler : 'onLogoutClick',
		plugins : 'responsive',
		responsiveConfig : {
			tall : {
				text : "",
				tooltip : 'Logout',
			},
			wide : {
				text : 'Logout',
			}
		}
	} ]
});
