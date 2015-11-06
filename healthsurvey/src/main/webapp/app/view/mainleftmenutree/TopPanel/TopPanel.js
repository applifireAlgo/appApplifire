/*
 
  Don't write single line comment in this file
 
 */ 

Ext.define('Healthsurvey.view.mainleftmenutree.TopPanel.TopPanel', {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'menuTopPanel',
	requires : [ 'Healthsurvey.view.mainleftmenutree.TopPanel.TopPanelController' ],
	controller : 'menuTopPanelController',

	style : {
		backgroundColor: "#f3f3f4"
	},
		
	margin : '0 0 5 0',
		
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
		
	items : [{
		xtype : 'button',
		icon : 'images/menu/mainmenutogglebtn.png', 
		style : {
			backgroundColor: "#1AB394",
			border : 0
		},
		scale : 'medium',		
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
	}, '-', /*{
		xtype : 'image',
		padding : 1,
		width : 100,
		height : 25,
		src : 'resources/css/images/logo.png'
	},*/ '->',/**Start search**/ '-', {
		xtype : 'image',
		src : 'images/menu/search.png',
		style : {
			cursor : 'pointer'
		},
		
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
	},/**End search**/
	/**Start cloud**/{
		xtype : 'image',
		src : 'images/menu/clouddrive.png',
		style : {
			cursor : 'pointer'
		},
		
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
	},/**End cloud**/ '-', {
		xtype : 'button',
		text : 'Logout',
		
		cls : 'topPanelElement topPanelElementInner',
		
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