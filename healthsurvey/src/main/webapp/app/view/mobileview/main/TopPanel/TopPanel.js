Ext.define('Healthsurvey.view.mobileview.main.TopPanel.TopPanel', {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'customHeader',
	requires : [ 'Healthsurvey.view.mobileview.main.TopPanel.TopPanelController' ],
	controller : 'topPanelController',
	header:{
		height:32
	},
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	items : [ {
		
		xtype : 'button',
		//icon : 'resources/css/images/menu.png',
		width : 70,
		height : 40,
		scale :'large',
		icon : 'resources/images/mobile/ic_drawer_expand.png',
		style:{
			background:'#ffffff'
		},
		border:0,
		//handler:'onDrawerBtnClick',
		action : 'menuBtnToggle',
		itemId: 'appplicationMainMenuBtn',
		pressed : false,
		enableToggle : true,
	}, {
		xtype : 'image',
		padding : 1,
		width : 32,
		height : 32,
		border:0,
		hidden:true,
		src : 'resources/css/images/logo.png'
	}, '->', {
		xtype : 'image',
		src : 'images/menu/search.png',
		//margin :'5 2 0 5',
		height : 20,
		width : 28,
		hidden:true,
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
		hidden:true,
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
		text : '',
		border:0,
		width : 70,
		height : 40,
		scale :'large',
		style:{
			background:'#ffffff'
		},
		icon : 'resources/images/mobile/ic_logout.png',
		padding : 1,
		handler : 'onLogoutClick',
		/*plugins : 'responsive',
		responsiveConfig : {
			tall : {
				text : "",
				tooltip : 'Logout',
			},
			wide : {
				text : 'Logout',
			}
		}*/
	} ]
});
