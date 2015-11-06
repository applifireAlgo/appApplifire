Ext.define('Healthsurvey.view.art.masterform.MasterPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.masterPanelController',
	
	masterPanel : null,
	masterTreePanel : null,
	masterQueryPanel : null,
	
	masterDetailsTab : null,
	masterFormPanel : null,
	masterEditGridPanel : null,
	masterNewFormPanel : null,
	
	init:function()
	{
		debugger;
		this.masterPanel = this.getView();
		this.masterTreePanel = this.masterPanel.down('#masterTreePanel');
		this.masterQueryPanel = this.masterPanel.down("#queryPanel");
		this.masterFormPanel = this.masterPanel.down("#masterEditFormPanel");
		this.masterDetailsTab = this.masterFormPanel.up().up();
		this.masterGridPanel = 	this.masterDetailsTab.down('#masterEditGridPanel')
		this.masterNewFormPanel = this.masterPanel.down('#masterNewFormPanel');
		this.callParent();
	},
	
	masterPanelBeforeRender:function(obj)
	{
		debugger;
		var formIdPass = this.masterPanel.refId;
		var currentObject = this;
		
	     Ext.Ajax.request(
 	             {
 	            	 url : "secure/MenuService/fetchMasterFormDetails",
 	                 method:'POST', 
 	                 controller:currentObject,
 	                 jsonData:{
 	                	id: formIdPass
 	                 },
 	                 success : function(response,currentObject){
 	                	 
 	                	 debugger;
 	                	  var masterFormPanelViewModel = Ext.create('Healthsurvey.view.art.masterform.MasterFormViewModel');
 	                	 
 	                	  var masterFormPanel = currentObject.controller.masterFormPanel;
 	                	  masterFormPanel.setViewModel(masterFormPanelViewModel);
 	                	  masterFormPanel.formMode = "update";
 	                	  
 	                	  var newFormPanelViewModel = Ext.create('Healthsurvey.view.art.masterform.MasterFormViewModel');
 	                	  var masterNewFormPanel = currentObject.controller.masterNewFormPanel;
	 	                  masterNewFormPanel.setViewModel(newFormPanelViewModel);
 	                	  masterNewFormPanel.formMode = "add";
 	                	 
 	                	  var jsonRespone = Ext.JSON.decode(response.responseText);
 	                	  var data = Ext.JSON.decode(jsonRespone.response.data);
 	                	  console.log(data);
 	                	  
 	                	  var queryPanel = currentObject.controller.masterQueryPanel;
 	                	  queryPanel.controller.renderData( Ext.JSON.decode(data.finderJson));
 	                	  queryPanel.serviceURL = data.serviceURL; //update url
 	                	  
 	                	  /**add details tab master form**/
 	                	  masterFormPanel.add(data.formDetails);
 	                
 	                	  /**add new tab master form**/
 	                	  masterNewFormPanel.add(data.formDetails);
 	                	  var  parentView = currentObject.controller.masterDetailsTab;     	          	 
 	                	  var serviceCalls = Ext.decode(data.storeServiceURL);
 	                	 
 	                	  /**Loads store data for every element**/
 	                	  for(var i = 0;i<serviceCalls.length;i++){
 	                		 var call = serviceCalls[i];
 	                		 
 	                		 currentObject.controller.retrieveServiceData(call.name,"secure"+call.serviceUrl,parentView);
 	                	  }
 	                	  
 	                	  var modelField = [];
 	                	  for (var int = 0; int < data.formDetails.items.length; int++) {
 	                		 modelField.push(data.formDetails.items[int].name);
 	                	  }
 	                	  
 	                	 data.serviceURL = "secure"+data.serviceURL;
 	                	 var title = masterFormPanel.items.items[0].title
 	                	 masterFormPanel.items.items[0].setTitle(title);
 	                	 
 	                	 var masterGridPanel = currentObject.controller.masterGridPanel;
 	                	 masterGridPanel.controller.renderGrid(data.gridDetails.gridColumn, data.serviceURL);
 	                	 
 	                	 masterGridPanel.setTitle(title+" Grid");
 	                	 
 	                	 masterFormPanel.serviceURL = data.serviceURL;
 	                	 masterNewFormPanel.serviceURL = data.serviceURL;
 	                	 
 	                	 masterFormPanel.gridColumn = data.gridDetails.gridColumn;
 	                	 masterNewFormPanel.gridColumn = data.gridDetails.gridColumn;
 	                	 
 	                	 
 	                	var detailsTabPanel = currentObject.controller.masterDetailsTab;
 	                	var activeTabCard= detailsTabPanel.tabBar.items.items[1].card;
 	                    detailsTabPanel.setActiveTab(activeTabCard);

 	                 },
 	                 failure : function(response,eopts){
 	                	Ext.MessageBox.show({title: 'Error',msg: "Cannot connect to server.",icon: Ext.MessageBox.ERROR});
 	                 }
 	             },currentObject)
		},
	
	     retrieveServiceData :function(name,serviceUrl,parentView){
	 		var scope = this;
	 		scope.parentView = parentView;
	 		Ext.Ajax.request(
	 	             {
	 	            	 url : serviceUrl+"/findAll",
	  	                 method:'GET', 
	  	                 scope:scope,
	  	                 jsonData:{
	 	                 },
	 	                 cmpName :name,
	  	                 success : function(response,scope){
	  	                	 debugger;
	  	                	var resp = Ext.decode(response.responseText);
	  	                	cmpData = resp.response.data;
	  	                	var desiredCmpArray = scope.scope.parentView.query('#'+scope.cmpName);
	  	                	for (var i = 0; i < desiredCmpArray.length; i++) {
	 							
	  	                		var store = Ext.create('Ext.data.Store', {
	  	 	                	    fields:['primaryKey','primaryDisplay'],
	  	 	                	    storeId: desiredCmpArray[i]+'Store',
	  	 	                	    data:cmpData
	  	 	                	},{cmpData:cmpData});
	  	                		desiredCmpArray[i].setStore(store);
	  	                		desiredCmpArray[i].setValue(cmpData[0]);
	  	                		desiredCmpArray[i].displayField = 'primaryDisplay';
	  	                		desiredCmpArray[i].valueField = 'primaryKey';
	 						}
	  	                 },
	  	                 failure : function(response){
	 	               		   Ext.Msg.alert('Error', 'Cannot connect to server');
	 	 	             }
	 	 	             });
	 		
	 	}
	
});