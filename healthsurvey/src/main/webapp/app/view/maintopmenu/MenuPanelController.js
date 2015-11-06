
Ext.define('Healthsurvey.view.maintopmenu.MenuPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.menuPanelController',

	loadMenus : function(toolbar, eOpts) {

		debugger;
		var currentObject = this;
		var loadMask = new Ext.LoadMask({
			msg    : 'Loading data...',
			target : currentObject.getView()
		}).show();
		Ext.Ajax.request({
			url : "secure/MenuService/fetchmenus",
			method:'POST', 
			jsonData:{
			},
			success : function(response,opts){
				debugger;
				loadMask.hide();
				var responseJson = Ext.JSON.decode(response.responseText);
				if(responseJson.response.success!=false){
					var menuData = Ext.JSON.decode(responseJson.response.data);
					currentObject.createMenuTree(currentObject.getView(),menuData);
				}else{
					//Redirect to Login.html
					var pathName=location.pathname;
					var initialPath=pathName.slice(0,pathName.lastIndexOf("/"));
					location.href=location.origin+initialPath+"/";
				}
			},
			failure : function(response,opts){
				loadMask.hide();
				Ext.MessageBox.show({title: 'Error',msg: "Cannot connect to server.",icon: Ext.MessageBox.ERROR});
			}
		}); 

	},

	createMenuTree:function(menuPanel,data)
	{
		debugger;
		for(var i=0;i<data.length;i++)
		{
			if(data[i].hasOwnProperty("children")&& data[i].children!=null) {

				var splitButton={   
						xtype : 'button',

//						cls: data[i].cls,        				
//						icon: data[i].icon,
						leaf: data[i].leaf,
						menuAction: data[i].menuAction,
						menuCommands: data[i].menuCommands,
						menuIcon: data[i].menuIcon,
						menuId: data[i].menuId,
						menuLabel: data[i].menuLabel,
						menuName: data[i].menuName,
						menuTreeId: data[i].menuTreeId,
						refId: data[i].refId,
						text: data[i].text, 
						userId: data[i].userId,

						menu : [],
						cls : 'menuPanelElementInner',
						baseCls : 'menuPanelElement'
				};

				/** leaf's value is defining menu is clickable or not 
				 * HERE its having children so it can't be leaf **/

				var mainmenu = menuPanel.add(splitButton);

				var subMenus = data[i].children;
				for(var j=0; j<subMenus.length; j++)
				{
					this.addMenu(mainmenu,subMenus[j]);
				}			

			} else {

				var button = {   
						xtype : 'button',

//						cls: data[i].cls,        				
//						icon: data[i].icon,
						leaf: data[i].leaf,
						menuAction: data[i].menuAction,
						menuCommands: data[i].menuCommands,
						menuIcon: data[i].menuIcon,
						menuId: data[i].menuId,
						menuLabel: data[i].menuLabel,
						menuName: data.menuName,
						menuTreeId: data[i].menuTreeId,
						refId: data[i].refId,
						text: data[i].text,
						userId: data[i].userId,

						baseCls : 'menuPanelElement',
						cls : 'menuPanelElementInner'						
				};

				/** leaf's value is defining menu is clickable or not **/
				if(data[i].leaf){
					button['handler'] = 'onMenuClick';
				}

				menuPanel.add(button);
			}			
		}

		debugger;
		var currentObject = this;
		Ext.Ajax.request({
			url : "secure/MenuService/fetchStoreMenu",
			method:'POST', 
			controller:currentObject,
			success : function(response,currentObject){
				debugger;
				var menus = Ext.decode(response.responseText);
				var data = Ext.decode(menus.response.data);

				for (var i = 0; i < data.length; i++) {
					debugger;
					var respData = data[i];

					var tabs =  Ext.getCmp('appMainTabPanel');
					var allMainMenus = tabs.up().down('#topToolbar').down('#menuPanel').items.items;

					for(var j=0; j<allMainMenus.length; j++){

						var parentMenu = allMainMenus[j].menu;

						var menuItems = null;
						menuItems = parentMenu.queryBy(function(comp){ 							
							if(comp.menuId == respData.menuId) 
								return true; 
							else 
								return false;
						});

						if(menuItems != null && menuItems.length > 0) {
							var menuItem = menuItems[0];

							debugger;
							var component = Ext.create(menuItem.menuAction, { closable: true, title: menuItem.text, refId: menuItem.refId, menuId: respData.menuId, listeners:{ close: function(me, eopts) {
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

							}} });

							var tab = tabs.add({
								xtype : component,
							});
							tabs.setActiveTab(tab);
						}						
					}

					debugger;
				}

			},
			failure : function(response,currentObject){
			}
		},currentObject);		

	},

	addMenu:function(parentMenu,data)
	{
		if(data.hasOwnProperty("children")&& data.children!=null)
		{
			var menu={ 					
//					icon: data.icon,
					leaf: data.leaf,
					menuAction: data.menuAction,
					menuCommands: data.menuCommands,
					menuIcon: data.menuIcon,
					menuId: data.menuId,
					menuLabel: data.menuLabel,
					menuName: data.menuName,
					menuTreeId: data.menuTreeId,
					refId: data.refId,
					text: data.text, 
					userId: data.userId,

					menu : []					
			};

			/** leaf's value is defining menu is clickable or not 
			 * HERE its having children so it can't be a leaf **/

			var newMenu = parentMenu.menu.add(menu);

			for(var x=0;x<data.children.length;x++)
			{	
				this.addMenu(newMenu,data.children[x]);
			}

		}else{

			var menu={					
//					icon: data.icon,
					leaf: data.leaf,
					menuAction: data.menuAction,
					menuCommands: data.menuCommands,
					menuIcon: data.menuIcon,
					menuId: data.menuId,
					menuLabel: data.menuLabel,
					menuName: data.menuName,
					menuTreeId: data.menuTreeId,
					refId: data.refId,
					text: data.text, 
					userId: data.userId
			};

			/** leaf's value is defining menu is clickable or not **/
			if(data.leaf){
				menu['handler'] = 'onMenuClick';
			}

			parentMenu.menu.add(menu);
		}   	
	},

	onMenuClick : function(menuItem, e){
		debugger;

		if(menuItem.menuAction == null || menuItem.menuAction == ""){
			Ext.Msg.alert('Error...', 'No view available');
			return;
		}

		var loadMask = new Ext.LoadMask({
			msg    : 'Loading data...',
			target : this.getView().up().up()//.up() 
		}).show();

		try
		{
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
		catch (e) {
			loadMask.hide();
		}
	}

});