Ext.define('Healthsurvey.view.reportbuilder.querycriteria.QueryCriteriaController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.queryCriteriaController',

    rptBuilderTab:null,
    serviceData:null,
    
    loadQueryCriteria : function(grid, eOpts)
	{
		debugger;
    	this.rptBuilderTab=grid.up().up().up();
    	
		grid.reconfigure(this.getQueryCriteriaStore());
		
		if(this.rptBuilderTab.isEdit!=null && this.rptBuilderTab.isEdit==true)
		{		    		
    		var queryCriteriaStore=grid.getStore();
    		queryCriteriaStore.loadData(this.rptBuilderTab.editJSON.query_criteria_json); 
    		for(var i=0;i< queryCriteriaStore.data.items.length;i++) 
			{
				var record= queryCriteriaStore.getAt(i);            	    					
    			var cnt=grid.cntRow;
    			grid.cntRow= cnt+1;
    			record.set("id",cnt);	        	    			
			}	
    		qcPosition = this.getView().down("#qcDisplayPosition");
			if (this.rptBuilderTab.qcPosition != undefined && this.rptBuilderTab.qcPosition == "west") {
				qcPosition.query("[boxLabel=Left]")[0]
						.setValue(true);
			} else {
				qcPosition.query("[boxLabel=Top]")[0]
						.setValue(true);
			}
    	}
	},
	
	getQueryCriteriaStore : function() {
		return Ext.create('Ext.data.Store', {
			fields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'displayName',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			},
			/*{
				name:'datatype',
				type:'string'
			},*/
			{
				name : 'widget',
				type : 'string'
			}, {
				name : 'service',
				type : 'string'
			},{
				name : 'serviceOp',
				type : 'string'
			},{
				name : 'defaultValue',
				type : 'string'
			}, {
				name : 'dependantW',
				type : 'int'
			},{
				name : 'serviceName',
				type : 'string'			
			},{
				name : 'serviceOpName',
				type : 'string'				
			},{
				name : 'serviceUrl',
				type : 'string'			
			},{
				name : 'serviceOpUrl',
				type : 'string'			
			},{
				name : 'dependantWidgetName',
				type : 'string'			
			}],
			data : []
		});
	},
	
	onAddQueryCriteriaRowClick : function(btn)
	{
		debugger;
		var grid=this.getView();
		this.addNewQueryCriteria(grid,grid.getStore().data.length);
	},
	
	addNewQueryCriteria : function(grid, rowNum, e)
	{
		debugger;
		grid.store.insert(rowNum, this.getNewQueryCriteria(grid));
	},
	
	getNewQueryCriteria : function(grid)
	{
		var cnt=grid.cntRow;
		grid.cntRow= cnt+1;
		return {
			id : cnt,
			displayName :"new",
			name : "",
			widget : "textfield",
			service : "",
			defaultValue : "",
			dependantW : 0,
		};
	},
	
	onRemoveClick : function(grid, rowIndex)
	{
		grid.getStore().removeAt(rowIndex);
	},
	
	beforeGridRender:function()
	{
		debugger;
		var tempView=this.getView();
		Ext.Ajax.request(
    	    	{
    	    		url : "secure/reportBuilderController/getService",
    	    		method : 'POST',
    	    		currentView:tempView,
    	    		jsonData:{},
    	    		success : function(response, currentObject,options) 
    	    		{
    	    			var responseJson = Ext.JSON.decode(response.responseText);						
    	    			if (responseJson.response.success == 'true') 
    	    			{
    	    				var data = Ext.JSON.decode(responseJson.response.data);
    	    				currentObject.currentView.controller.serviceData=data;
    	    				var viewModel=currentObject.currentView.getViewModel();
    	    				viewModel.data.ServiceStore.loadData(data);
    	    			}
    	    			else 
    	    			{
    	    				Ext.Msg.alert('Error',"Service Data Rendering Failed");
    	    			}
    	    		},
    	    		failure : function() 
    	    		{
    	    			Ext.Msg.alert('Error', 'Cannot connect to server');
    	    		}
    	    	});
	},
	
	onServiceClick:function(combo, newValue, oldValue, eOpts)
	{
		debugger;
		var tempView=this.getView();
		Ext.Ajax.request(
				{
		    	    url:"secure/reportBuilderController/getServiceOperation",
		    	    method:'POST',
		    	    currentView: tempView,
		    	    jsonData:
		    	    {
		    	    	id : newValue
		    	    },
		    	    params:{},
		    	    success : function(response, currentObject)
		    	    {
		    	    	debugger;
		    	    	var responseJson = Ext.JSON.decode(response.responseText);	
		    	    	if (responseJson.response.success == 'true') 
		    	    	{
		    	    		debugger;
		    	    		var data = Ext.JSON.decode(responseJson.response.data);
		    	    		var viewModel=currentObject.currentView.getViewModel();
    	    				viewModel.data.ServiceOpStore.loadData(data);	
		    	    	}
			    		else{
			    			Ext.Msg.alert('Error',"Service Operation Data Rendering Failed");
		    	    	}
		    	    },// success ends
		    		failure : function()
		    		{
		    			Ext.Msg.alert('Error', 'Cannot connect to server');
		    		}
				});					
	},
	
	loadDataBeforeEdit:function(editor, e, eOpts)
	{
		debugger;
		var depenCombo = editor.editor.query("[comboType=dependant]")[0];
		var store = this.getDepenComboStore(editor.grid.getStore(), e.rowIdx);
		depenCombo.bindStore(store);
	},
	
	getDepenComboStore : function(gridStore, curRowIdx)
	{
		debugger;
		var data = [];
		Ext.Array.each(gridStore.data.items, function(val,index) {
			if (index != this.curRowIdx) 
			{
				this.data.push({
					dependentId : val.data.id,
					dependentName : val.data.displayName
				});
			}

		}, {
			data : data,
			curRowIdx : curRowIdx
		});
		//Dynamically store created for dependentWidget editor combo
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : "dependentId",
				type : "int"
			}, {
				name : "dependentName",
				type : "string"
			} ],
			data : data
		});
		;
	}
});