Ext.define('Healthsurvey.view.chartbuilder.templates.TemplateTreePanelController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.templatecontroller',
    chartMainView:null,
    
    onTemplateTreeLoad:function( currentObject, records, successful, operation, node, eOpts )
    {
    	debugger;
    	this.chartMainView=this.getView().up().up();
    	var currView = this.getView(); //chartbuilder
    	Ext.Ajax.request(
				{
					url : "secure/chartBuilderController/templatemenu",
					method : 'POST',
					currentView:currView,
					jsonData : {},
					success : function(response, currentObject,options) 
					{
						debugger;
						var responseJson = Ext.JSON.decode(response.responseText);						
						if (responseJson.response.success == 'true') 
						{
							var data = Ext.JSON.decode(responseJson.response.data);
							currentObject.currentView.setRootNode(data);
						}
						else 
						{
							Ext.Msg.alert('Error',"Template List Rendering Failed");
						}
					},
					failure : function() 
					{
						Ext.Msg.alert('Error', 'Cannot connect to server');
					}
				});
    },
    
    itemContextMenuClick:function(obj, record, item, index, e, eOpts )
	{
		debugger;
		var mainView=this.chartMainView; // chart-builder-view
		e.stopEvent();
		Ext.create('Ext.menu.Menu', {
			items : [ Ext.create('Ext.Action', {
				text : 'Apply Template',
				iconCls:'menu-ok',
				handler : function() 
				{
					if(record.data.leaf	== true)
					{
						Ext.Ajax.request(
						{
				    	    url:"secure/chartBuilderController/getSelectedTemplateJson",
				    	    method:'POST',
				    	    mainView: mainView,
				    	    jsonData:
				    	    {
				    	    	id : record.data.id
				    	    },
				    	    params:{},
				    	    success : function(response, currentObject)
				    	    {
				    	    	debugger;
				    	    	var responseJson = Ext.JSON.decode(response.responseText);	
				    	    	if (responseJson.response.success == 'true') 
				    	    	{
				    	    		var data = Ext.JSON.decode(responseJson.response.data);
				    	    		var tempJson=data.template_json;			    		     
					    		        	
				    	    		var chartPanel=currentObject.mainView.down('#chartPanel');
				    	    		var jsonObj=chartPanel.jsonObject;
				    	    		
					    		    if(jsonObj==""){ Ext.Msg.alert({title:'Info',msg:"Draw Charts to apply Templates",icon:Ext.MessageBox.INFO});return;}   
					    		    
					    		    var rightPanel=currentObject.mainView.down('#rightpanel');
					    		    var propObj=rightPanel.rightPropJson;
				    	    		
					    		    // Check whether Json belongs to charts or maps    	
				    	    		if(jsonObj.dataSource.hasOwnProperty("chart"))
				    	    		{
				    	    			for(var key in tempJson)
				    	    			{
				    	    				if (jsonObj.dataSource.chart.hasOwnProperty(key))
				    	    				{
				    	    					jsonObj.dataSource.chart[key]=tempJson[key];     
				    	    				}	
				    	    			} 
				    	    			jsonObj.height=tempJson.height;
				    	    			jsonObj.width=tempJson.width;
						    		        	
				    	    			var a=new FusionCharts(jsonObj);
				    	    			a.render(chartPanel.body.id);
				    	    			chartPanel.doLayout();
						    		    	    
				    	    			//Reset property grids after applying template changes
				    	    			var propertyGrid=currentObject.mainView.down('#propertyGrid');
				    	    			var advPropertyGrid=currentObject.mainView.down('#advPropertyGrid');
				    	    			
				    	    			propertyGrid.setSource(jsonObj,propObj);
				    	    			advPropertyGrid.setSource(jsonObj.dataSource.chart,propObj); 
				    	    		}
					    		    else{
					    		        	for(var key in tempJson)
						    		       	{
						    		       		if (jsonObj.dataSource.map.hasOwnProperty(key))
						    		       		{
						    		       			jsonObj.dataSource.map[key]=tempJson[key];     
						    		        	}	
						    		        } 
						    		        jsonObj.height=tempJson.height;
						    		       	jsonObj.width=tempJson.width;
						    		        	
						    		    	var a=new FusionCharts(jsonObj);
						    		   		a.render(chartPanel.body.id);
						    		   	    chartPanel.doLayout();
						    		    	    
						    		   	   //Reset property grids after applying template changes
						    		   	    var propertyGrid=currentObject.mainView.down('#propertyGrid');
								        	var advPropertyGrid=currentObject.mainView.down('#advPropertyGrid');
									        	
								        	propertyGrid.setSource(jsonObj,propObj);
								        	advPropertyGrid.setSource(jsonObj.dataSource.map,propObj);
					   			        	advPropertyGrid.getStore().filterBy(function(record, id){
					    			        	   if(record.get("name")=="isTypeEditable")
			 		    			        	   { 
					    			        		   return false;
					 		    			       }    
					    			        	   return true;
					 	  			        }, this);
					    		    }
				    	    	}
				    	    },// success ends
				    		failure : function()
				    		{
				    			Ext.Msg.alert('Error', 'Cannot connect to server');
				    		}
						});					
					}//if closes
				}//handler
			}),
			Ext.create('Ext.Action', {
				text : 'Delete Template',
				iconCls:'menu-delete',
				handler : function() 
				{
					if(record.data.leaf	== true)
					{
						Ext.Msg.confirm('Confirm', 'Are you sure you want to delete',function(btn, text)
						{
						    if (btn == 'yes')
						    {
						    	Ext.Ajax.request(
				    	    	{
				    	    		url:"secure/chartBuilderController/deleteTemplate",
				    	    		method:'POST',	
				    	    		mainView: mainView,
				    	    		jsonData:
				    	    		{
				    	    			id : record.data.id,
				    	    		},
				    	    		params:{},
				    		        success : function(response, currentObject)
				    		        {
				    		        	debugger;
				    		        	Ext.Msg.alert('Message',"Template deleted");
				    		        	currentObject.mainView.down('#template-view').store.load();	    	    		     
				    		        },
				    		        failure : function()
				    		        {
				    	             	 Ext.Msg.alert('Error', 'Cannot connect to server');
				    	            }
				    	    	  });
						    }});//MessageBox ends
						}//if closes
					}//handler					
				})
			]//menu items closes
		}).showAt(e.getXY());
	}//itemContextMenu ends
    
});