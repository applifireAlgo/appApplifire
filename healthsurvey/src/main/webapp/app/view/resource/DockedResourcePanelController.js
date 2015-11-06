Ext.define('Healthsurvey.view.resource.DockedResourcePanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.dockedResourcePanelController',

	onMenuItemClick : function(menuItem, e) {
		debugger;

		if(menuItem.menuAction == null || menuItem.menuAction == ""){
			Ext.Msg.alert('Error...', 'No view available');
			return;
		}

		var loadMask = new Ext.LoadMask({
			msg    : 'Loading data...',
			target : this.getView().up().up()
		}).show();

		if(menuItem.leaf)
		{
			var flag = false;
			var tabs =  Ext.getCmp('appMainTabPanel');
			var tabBarLength = tabs.tabBar.items.items.length;
			if(tabBarLength>0)
			{
				for(var i = 0;i<tabBarLength;i++)
				{
					if(menuItem.menuName == tabs.tabBar.items.items[i].text)//we can change this condition for better code
					{
						flag = true;
						tabs.setActiveTab(tabs.tabBar.items.items[i].config.card);
						break;
					}
				}
			}

			if(!flag)
			{
				var component = Ext.create(menuItem.menuAction, { closable: true, title: menuItem.text, refId: menuItem.refId, menuId: menuItem.menuId, listeners: { close: function(me, eopts) {
					debugger;

					var json = {};
					json.id = me.menuId;

					Ext.Ajax.request({
						url : "secure/MenuService/deleteMenu",
						method:'POST', 
						jsonData: json,
						success : function(response){
							debugger;
						},
						failure : function(response){
						}
					});	
				} } });

				var tab = tabs.add({
					xtype : component,
					title: menuItem.text
				});
				tabs.setActiveTab(tab);

				debugger;
				var json = {};
				json.id = menuItem.menuId;
				json.value = menuItem.menuAction;

				Ext.Ajax.request({
					url : "secure/MenuService/storeMenu",
					method:'POST', 
					jsonData: json,
					success : function(response){
						debugger;
					},
					failure : function(response){
					}
				});	    			
			}
		}

		loadMask.hide();
	}

});