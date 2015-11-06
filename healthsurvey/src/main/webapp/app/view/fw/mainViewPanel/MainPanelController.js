Ext.define('Healthsurvey.view.fw.mainViewPanel.MainPanelController', {
	extend : 'Ext.app.ViewController',
	requires : ['Ext.util.Cookies',
	            'Healthsurvey.view.login.ChangePasswordScreen'],
	alias : 'controller.mainViewPanelController',
	
	afterRender:function()
	{
		debugger;
		var cookieChangePwd = Ext.util.Cookies.get('changePwd');
		var pathName= location.pathname;
		var initialPath=pathName.slice(0,pathName.lastIndexOf("/"));
		Ext.util.Cookies.clear('changePwd',initialPath);
		if(cookieChangePwd=="true"){
			 var component = Ext.create("Healthsurvey.view.login.ChangePasswordScreen",
							{
								modal:true,
							});
			 component.show();
		}
	},
	aftrAppMainTabPanelRender:function(tabpanel)
	{
		debugger;
		contextMenu = new Ext.menu.Menu({
			  items: [{
			    text: 'Close All',
			    icon: 'images/closable.png',
			    listeners:{
					click:'onCloseAllClick',
					scope:this
				}
			  }]
			});

		tabpanel.tabBar.getEl().on('contextmenu', function(e) {
			     e.stopEvent();
			     contextMenu.showAt(e.getXY());
			});
	},
	onCloseAllClick:function()
	{
		var tabpanel=this.getView().down('#appMainTabPanel');
		while(tabpanel.items.items.length>0){
			tabpanel.items.items[0].close();
		}
	}
});