Ext.define('Healthsurvey.view.art.masterform.MasterFormPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.masterFormPanelController',
	
	resetMasterForm: function(){
		debugger;
		var formPanel = this.getView();
		formPanel.reset();
	},

	saveMasterForm: function(){
		debugger;
		var currentObject = this.getView();
		var loadMask = new Ext.LoadMask({
		    msg    : 'Updating data...',
		    target : currentObject
		}).show();
		console.log("serviceURL   "+currentObject.serviceURL);
		console.log("dataSending   "+currentObject.getValues());
		var requestData = currentObject.getViewModel().data;
		delete requestData['id'];
		var method = "PUT";
		var requestURL = currentObject.serviceURL;
		if(currentObject.formMode && currentObject.formMode == 'add'){
			method = "POST";
		}
		var jsonData = {};
		
		for(key in requestData)
		{
			jsonData[key] = requestData[key];
		}
	    Ext.Ajax.request(
	    {
	            	 url : requestURL,
	                 method:method, 
	                 loadMask:loadMask,
	                 controller:currentObject,
	                 jsonData:JSON.stringify(jsonData),
	                 success : function(response,currentObject){
	                	   debugger;
	                	   var jsonResponse = Ext.JSON.decode(response.responseText);
	                	   if(jsonResponse.response.success  || jsonResponse.response.success == 'true'){
	                		   var masterTabPanel = currentObject.controller.up().up().up();
	                		   if(masterTabPanel.hasOwnProperty('tabBar'))
	                		   {
	                			   masterTabPanel.setActiveTab(masterTabPanel.tabBar.items.items[0].card);
	                		   }
	                		   var masterEditGridPanel =  masterTabPanel.down('#masterEditGridPanel');
	                		   masterEditGridPanel.controller.renderGrid(currentObject.controller.gridColumn, currentObject.controller.serviceURL);
	                		   currentObject.controller.controller.resetMasterForm();
	                		   Ext.MessageBox.show({title: 'Info',msg: "Record saved successfully.",icon: Ext.MessageBox.INFO});
	                	   }
	                	   currentObject.loadMask.hide();
	                 },
	                 failure : function(response,eopts){
	                	 eopts.loadMask.hide();
              		 Ext.MessageBox.show({title: 'Error',msg: "Cannot connect to server.",icon: Ext.MessageBox.ERROR});
	                 }
	     },currentObject);	   	
		
	}
	
	
});