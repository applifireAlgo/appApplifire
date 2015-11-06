/*
 
  Don't write single line comment in this file
 
 */
Ext.define('Healthsurvey.view.maintopmenu.TopPanel', {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'topToolbar',
	
	requires : [ 'Healthsurvey.view.maintopmenu.TopPanelController',
	             'Healthsurvey.view.maintopmenu.MenuPanel' ],
	controller : 'topToolbarController',

	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	
	margin : '0 0 5 0',
	
	style : {
		backgroundColor: "#000000"
	},
	
	items : [{
		xtype : 'image',
		padding : 1,
		width : 100,
		height : 25,
		src : 'resources/css/images/logo.png'
	}, '-', {
		xtype : 'menuPanel'
	}, '->', /**Start search**/'-', {
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
	},/**End search**/
/**Start cloud**/{
		xtype : 'image',
		src : 'images/menu/clouddrive.png',
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
		text :  'Logout',

		baseCls : 'menuPanelElement',
		cls : 'menuPanelElementInner',
				
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