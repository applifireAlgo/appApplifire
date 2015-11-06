Ext.define('Healthsurvey.view.art.masterform.QueryPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.queryPanelController',
	
	renderData : function(data){
		debugger;
		var panel = this.getView();
		var queryPanelViewModel = panel.getViewModel();
		debugger;	
			
		for (var int = 0; int < data.length; int++) {
			var rowData = data[int];
			panel.add({
				xtype: rowData.Widgets,
				name: rowData.Name,
				bind:'{'+rowData.Name+'}',
				fieldLabel: rowData.DisplayName,
				itemId : rowData.itemId,
				displayField:rowData.primaryDisplay,
				valueField:rowData.primaryKey
			});
			queryPanelViewModel.setData(rowData.Name);
		}
	},
	
	submitQuery:function()
	{
		debugger;
		var currentObject = this.getView();
		var data = currentObject.getValues();
		var searchData = {};
		for(key in data){
			console.log(key,data[key]);
			if(data[key]!= null)
			{
				searchData[key] = data[key];
			}
		}
		debugger;
		var loadMask = new Ext.LoadMask({
		    msg    : 'Searching data...',
		    target : currentObject.up().up()
		}).show();
		Ext.Ajax.request(
	             {
	            	 url :'secure'+currentObject.serviceURL+'/search',
	                 method:'POST', 
	                 loadMask:loadMask,
	                 controller:currentObject,
	                 jsonData: Ext.JSON.encode(searchData),
	                 success : function(response,currentObject){
	                	   debugger;
	                	   var jsonRespone = Ext.JSON.decode(response.responseText);
	                	   if(jsonRespone.response.success == true)
	                	   {
	                		   var masterTreePanel = currentObject.controller.up().down('masterTreePanel');
	                		   currentObject.controller.up().up().down('masterGridPanel').getStore().loadData(jsonRespone.response.data);
	                		   masterTreePanel.controller.searchTreeNode(masterTreePanel.getRootNode(),jsonRespone.response.data[0].primaryKey,true);
	                	   }
	                	   currentObject.loadMask.hide();
	                 },
	                 failure : function(response,eopts){
	                   eopts.loadMask.hide();
	                   Ext.MessageBox.show({title: 'Error',msg:response.statusText,icon: Ext.MessageBox.ERROR});
	                 }
	             });		    	
		
	}
	
});