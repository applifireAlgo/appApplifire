Ext.define('Healthsurvey.view.art.masterform.MasterTreePanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.masterTreePanelController',
	
	
	renderData : function (data){
		debugger;
		var rootNode = this.getView().getRootNode();
		rootNode.removeAll();
		for (var int = 0; int < data.length; int++) {
			var childNode = { text:data[int].primaryDisplay, bConfig:data[int], leaf : true ,icon:'images/table_icon.png'};
			rootNode.appendChild(childNode);
		}
		debugger;
		var masterTreePanelCombo = this.getView().down('#masterTreePanelSearchBox');
		var store = Ext.create('Ext.data.Store', 
				{
						storeId : 'masterTreePanelStore',
						fields : ['primaryKey','primaryDisplay','bConfig'],
						fields:[],
						data : [],
						sortOnLoad :true
				});
		Ext.each(data, function(ent) 
				{
						this.store.add({primaryKey:ent.primaryKey,primaryDisplay:ent.primaryDisplay,bConfig:ent,leaf:true});
				},{store:store});
		store.sort('name', 'ASC');
		masterTreePanelCombo.setStore(store);
	},
	
	onMasterTreePanelSearchBoxSelect:function(searchbox, records, eOpts)
	{
		debugger;
		this.onMasterTreePanelSearchBoxSelect( searchbox, records, eOpts);
	},
	
	onMasterTreePanelSearchBoxSelect:function( searchbox, records, eOpts )
	{
		debugger;
		this.setDataActiveTab();
		this.searchEntity(this.getView().getRootNode(), records[0].data.primaryKey, true);
		var treeObject = this.treePanel;
		var records = records[0];
		debugger;
		this.setFormPanelData(records);
	},
	searchEntity : function (treeNode, entKey ,isExpand)
	{
		debugger;
		var me = this;
    	treeNode.eachChild(function(child) 
    	{
    		if(child.data.hasOwnProperty('bConfig')&&child.data.bConfig.primaryKey == entKey)
    		{
    			if(isExpand)
    			{
    				this.getView().selectPath(child.getPath());
    				this.getView().expandNode(child,true);
    			}
    			return false;
    		}
    		else if (child.hasChildNodes())
    		{
    			me.searchEntity(child,entKey,isExpand);		
    		}
		},me);
    	var masterTreePanelCombo = this.getView().down('#masterTreePanelSearchBox');
    	masterTreePanelCombo.reset();
	},
	
	setFormPanelData: function( record){
    	debugger;
    	var loadMask = new Ext.LoadMask({
		    msg    : 'Loading data...',
		    target : this.getView().up().up().up()
		}).show();
    	if(record.data.leaf){
    		var masterGridPanel = this.getView().up().up().items.items[2].down("#masterEditGridPanel");
    		masterGridPanel.getController().setMasterFormData(record.data.bConfig);
    		/*set grid selection...*/
    		masterGridPanel.getController().setSelection(record.data.bConfig);
    	}
    	loadMask.hide();
    },
    
    setDataActiveTab:function()
	{
		debugger;
		var tab = this.getView().up().up().items.items[2];
		if(tab.activeTab.panelId=="masterPanelAddTab")
		{
			if(tab.items.items[0].panelId=="masterPanelEditTab")
				{
					tab.setActiveTab(tab.tabBar.items.items[0].card);
				}
		}
	},
    
    searchTreeNode : function (treeNode, primaryKey ,isExpand){
    	var me = this;
    	treeNode.eachChild(function(child) {
    		debugger;
    		if(child.data.bConfig.primaryKey == primaryKey){
    			foundChild = child;
    			
    			if(isExpand){
    				
    				me.getView().selectPath(child.getPath());
    				me.getView().expandPath(child.getPath());
    			}
    			return false;
    		}
    		else if (child.hasChildNodes()){
    			me.searchTreeNode(child,itemId,isExpand); // handle the child recursively		
    		}
		
		},me);
}
});