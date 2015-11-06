Ext.define('Healthsurvey.view.mobileview.resource.ResourcePanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.resourcePanelController',
	formResourcePanel :null,
	
	init : function() 
	{
		this.formResourcePanel = this.getView();
		this.callParent();
	},
	onHide:function(resourcePanel){
		debugger;
		
		menuBtn = this.formResourcePanel.up().down('#appplicationMainMenuBtn');
		menuBtn.setIcon('resources/images/mobile/ic_drawer_expand.png');
	/*	resourcePanel.el.slideOut('r', {
	         easing: 'easeOut',
	         duration: 300,
	         remove: false,
	         useDisplay: false
	     });*/
		
	},
	onShow:function(resourcePanel){
		debugger;
		menuBtn = this.formResourcePanel.up().down('#appplicationMainMenuBtn');
		menuBtn.setIcon('resources/images/mobile/ic_drawer_collapse.png');
		/*resourcePanel.el.slideIn('l', {
	         easing: 'easeIn',
	         duration: 300,
	         remove: false,
	         useDisplay: false
	     });*/
	},
	/**Fetch resource tree panel data**/
	onResourcePanelAfterRender:function()
	{
		debugger;
		var currentObject = this;
		var loadMask = new Ext.LoadMask({
		    msg    : 'Loading data...',
		    target : currentObject.getView()
		}).show();
	    Ext.Ajax.request({
	    	 		 url : "secure/MenuService/fetchmenus",
	                 method:'POST', 
	                 loadMask:loadMask,
	                 controller:currentObject,
	                 jsonData:{
	                 },
	                 success : function(response,currentObject){
	                	  debugger;
	                	  var responseJson = Ext.JSON.decode(response.responseText);
	                	  currentObject.controller.createTreePanel(currentObject.controller, responseJson.response.data);
	                	  currentObject.loadMask.hide();
	                 },
	                 failure : function(response,currentObject){
	                   currentObject.loadMask.hide();
            		   Ext.MessageBox.show({title: 'Error',msg: "Cannot connect to server.",icon: Ext.MessageBox.ERROR});
	                 }
	             },currentObject);		
	},
	
	/**function to add child nodes in resource tree**/
	addChild : function(parentNode, node) {
		if (node.children != null) {
			var child = {
				text : node.menuName,
				menuId : node.menuId,
				menuAction : node.menuAction,
				//icon : 'images/folder-database-icon.png',
				icon:'no-icon',
				cls:'menuFolder',
				expanded : true
			}
			var newNode = parentNode.appendChild(child);
			for (var x = 0; x < node.children.length; x++) {
				if(node.children[x].children) {
					for (var i = 0; i < node.children[x].children.length; i++) {
						if(node.children[x].children[i].children) {
							for (var j = 0; j < node.children[x].children[i].children.length; j++) {
								var temp = node.children[x].children[i].children[j];
								//temp.icon=temp.menuIcon;
								temp.icon = 'no-icon';
								temp.cls = 'menuLeaf';
							}
						}
					}
				}
				this.addChild(newNode, node.children[x]);
			}
		} else {
			parentNode.appendChild(node);
		}
	},
	
	
	/**creates resource tree panel and loads data**/
	createTreePanel : function(current, rawData)
	{
		debugger;
				var data = Ext.JSON.decode(rawData);
				var me = this;
				Ext.Array.each(data,function(record){
					var component = ({title: record.menuLabel});
					me.formResourcePanel.add(component);
				});	
				
				for (var j = 0; j < this.formResourcePanel.items.length; j++) {
					
					Ext.Array.each(data,function(record){
					if(me.formResourcePanel.items.items[j].title == record.menuLabel)
						{
							var treePanel = new Ext.create('Healthsurvey.view.mobileview.resource.AppMenuTreePanel');
							var rootNode = treePanel.getRootNode();
							Ext.Array.each(record, function(rec) {
								Ext.Array.each(rec, function(recChild){
									me.addChild(rootNode,recChild);
								});
							});
							
							 var resultsPanel = Ext.create('Ext.panel.Panel', {
								 	height:780,
							        autoScroll:true,
							        items:[{
							        	xtype:treePanel
							        }]
							 });
							me.formResourcePanel.items.items[j].add(resultsPanel);
							debugger;
						}
					},me);
				}
				
				debugger;
				/**var currentObject = this;
				 Ext.Ajax.request({
	    	 		 url : "secure/MenuService/fetchStoreMenu",
	                 method:'POST', 
	                 controller:currentObject,
	                 success : function(response,currentObject){
	                	  debugger;
	                	  var menus = Ext.decode(response.responseText);
	                	  var data = Ext.decode(menus.response.data);
	                	  
	                	  var view = currentObject.controller.getView();
	                	  var appMenuTreePanel = view.up().down("#appMenuTreePanel");
	                	  
	                	  view.up().up().down('#appplicationMainMenuBtn').toggle();
	                	  
	                	  debugger;
	                	  var tabs =  Ext.getCmp('appMainTabPanel');
	                	  for (var i = 0; i < data.length; i++) {
							var respData = data[i];
							
							var config = appMenuTreePanel.store.data.find('menuId',respData.menuId).data;
							
							var component = Ext.create(config.menuAction,{closable : true,title: config.text, refId:config.refId ,menuid:	respData.menuId, listeners:{ close: function(me, eopts) {
			    				debugger;
			    				
			    				var json = {};
			    				json.id = me.config.menuid;
			    				json.value = me.config.menuAction;
			    				
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
			    						title: config.text
			    					});
			    			tabs.setActiveTab(tab);
			    			
							debugger;
						  }
	                	  
	                	  
	                 },
	                 failure : function(response,currentObject){
	                 }
	             },currentObject);	*/			
				this.formResourcePanel.setTitle("");
	}
	
});


