Ext.define('Healthsurvey.view.art.masterform.MasterGridPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.masterGridPanelController',
	
	renderGrid : function (gridColums, serviceUrl){
	  debugger;
   	  var columns = [];
   	  var fields = [];
   	  
   	  for (var int = 0; int < gridColums.length; int++) {
			var col = gridColums[int];
			columns.push({
						text: col.name,
						dataIndex: col.dataField,
						flex:2,
						});
			
			fields.push(col.dataField);
   	  }
   	   
   	  console.log(columns);
   	  this.getView().setColumns(columns);
   	  debugger;
   	  this.refreshData(serviceUrl,fields);
   	  
   	
	},
    

    refreshData : function(serviceUrl,fields){
    	debugger;
    	
    	var currentObject = this.getView();
    	currentObject.gridFileds = fields;
	     Ext.Ajax.request(
	             {
	            	 url : serviceUrl+"/findAll",
	                 method:'GET', 
	                 controller:currentObject,
	                 jsonData:{
	                 },
	                 success : function(response,currentObject){
	                	   debugger;
	                	   var jsonRespone = Ext.JSON.decode(response.responseText);
	                	   var data = jsonRespone.response.data;
	                	   currentObject.controller.getController().setTreePanel(data);
	                	   
	                	   debugger;
	                	   var dataStore = Ext.create('Ext.data.Store', {
	                    	    fields: currentObject.controller.gridFileds,
	                    	    data : data 
	                    	});
	                   	
	                	   currentObject.controller.setStore(dataStore);
	                	   
	                	   currentObject.controller.getController().setMasterFormData(data[0]);
	                 },
	                 failure : function(){
              		   Ext.Msg.alert('Error', 'Cannot connect to server');
	                 }
	             },currentObject);		    	
    },
	
	showMasterFormData: function ( record){
		debugger;
		/***/
		var masterTreePanel = this.getView().up().up().up().down("#masterTreePanel");
		
		masterTreePanel.controller.searchTreeNode(masterTreePanel.getRootNode(),record.data.primaryKey,true);
		
		this.setMasterFormData(record.data);
		
	},
    
    setMasterFormData : function (data){
    	debugger;
    	
		var formPanel	 = this.getView().up().down("#masterEditFormPanel");
		formPanel.getViewModel().setData(data);
		
    },
	
	setTreePanel : function (data){
		var masterTreePanel = this.getView().up().up().up().down("#masterTreePanel");
		masterTreePanel.getController().renderData(data);
	},
	
	syncTreeGrid :  function(data){
		debugger;
	},
	
	setSelection:function(record){
		debugger;
		var grid = this.getView();
		var foundRecord = grid.store.findRecord('primaryKey',record.primaryKey);
		grid.setSelection(foundRecord);
	}
	

});