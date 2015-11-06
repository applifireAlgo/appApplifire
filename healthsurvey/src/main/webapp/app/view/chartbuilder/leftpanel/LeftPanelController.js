Ext.define('Healthsurvey.view.chartbuilder.leftpanel.LeftPanelController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.leftpanelcontroller',
    requires:['Healthsurvey.view.chartbuilder.leftpanel.ColorPicker'],
    chartMode:null,
    setDataConfig:false,
    chartRowIndex:null,
    jsonObj:null,
    propObj:null,
    chartId:null,
    javaClass:null,
    editedRecord:null,
    tempFlag:false,
    chartMainView:null,
    rptBuilderTab:null,
    
    init:function()
    {
    	debugger;
    	this.chartMainView=this.getView().up();
    	this.rptBuilderTab=this.getView().up().up();
    },
    
    onRadioBtnChange:function(curRadioObj, newValue, oldValue, eOpts )
    {
    	debugger;
    	if(curRadioObj.getChecked().length == 0)
        return;
    	rFieldVal=curRadioObj.getChecked()[0].inputValue;
    	if(rFieldVal==1) //ChartPoint is checked
    	{
	    	var data=this.rptBuilderTab.controller.chartsList;
	    	var chartTreePanel=this.chartMainView.down("#chart-tree-panel");	
			var rootNode=chartTreePanel.getRootNode();
			while(rootNode.firstChild)
			{
				rootNode.removeChild(rootNode.firstChild)
			}
			var fChild=data.children;
			for(var x1=0;x1<fChild.length;x1++)
			{
				this.addFilteredChild(rootNode,fChild[x1]);
			}
			this.chartMainView.down("#map-tree-panel").disable();	
			this.resetChartBuilder();
    	}
    	//Chart is checked
    	else{
    		this.chartMainView.down("#map-tree-panel").enable();
    		var chartTreePanel=this.chartMainView.down("#chart-tree-panel");	
			var rootNode=chartTreePanel.getRootNode();
    		while(rootNode.firstChild)
			{
				rootNode.removeChild(rootNode.firstChild)
			}
    		this.onChartTreeLoad();
    		this.onMapTreeLoad();
    		this.resetChartBuilder();
    	}
    },//onRadioBtnChange ends
    
    onChartTreeLoad:function()
    {
    	debugger;
    	var data=this.rptBuilderTab.controller.chartsList;
		var chartTreePanel=this.chartMainView.down("#chart-tree-panel");	
		var rootNode=chartTreePanel.getRootNode();
		//currentObject.scope.addChild(rootNode,data);    //to display AdvanceChart node
		//To display child nodes of first Parent Node
		var fChild=data.children;
		for(var x1=0;x1<fChild.length;x1++)
		{
			this.addChild(rootNode,fChild[x1]);
		}
						
    },//onChartTreeLoad ends
    
    addChild:function(parentNode,node)
    {
    	if(node.hasOwnProperty("children")&& node.children!=null)
    	{
    		var child={
        			text:node.text,
        			icon:node.icon,
        			chart_point:node.chart_point,
        	}
    		//child["expanded"]=true;
    		var newNode=parentNode.appendChild(child);
    		for(var x=0;x<node.children.length;x++)
    		{
    			this.addChild(newNode,node.children[x]);
    		}
    	}else{
    		 	parentNode.appendChild(node);
    	}   	
    },
    
    addFilteredChild:function(parentNode,node)
    {
    	if(node.hasOwnProperty("children")&& node.children!=null)
    	{
    		var newNode=parentNode;
    		if(node.chart_point==1)
    		{
	    		var child={
	        			text:node.text,
	        			icon:node.icon,
	        			chart_point:node.chart_point,
	        	}
	    		//child["expanded"]=true;
	    		 newNode=parentNode.appendChild(child);
    		}
    		for(var x=0;x<node.children.length;x++)
    		{
    			this.addFilteredChild(newNode,node.children[x]);
    		}
    	}else{
    		if(node.chart_point==1)
    		{
    		 	parentNode.appendChild(node);
    		}
    	}   	
    },
    
    onMapTreeLoad:function()
    {
    	var data=this.rptBuilderTab.controller.mapsList;
		var mapTreePanel=this.chartMainView.down("#map-tree-panel");	
		var rootNode=mapTreePanel.getRootNode();
		var fChild=data.children;
		for(var x1=0;x1<fChild.length;x1++)
		{
			this.addChild(rootNode,fChild[x1]);
		}
    },//onMapTreeLoad ends
    
    resetChartBuilder:function()
    {
    	var chartpanel=this.chartMainView.down('#chartPanel');
		chartpanel.jsonObject="";	        	 
   	   	chartpanel.update("Charts will render here  ...");
   	   
   	   	var propertyGrid=this.chartMainView.down('#propertyGrid');
   	   	propertyGrid.getStore().loadData([]);
     	 
   	   	var advPropertyGrid=this.chartMainView.down('#advPropertyGrid');
   	   	advPropertyGrid.getStore().loadData([]);
   	   	
   	   	this.chartMainView.down('#gridFieldPanel').removeAll();
   	   	
   	   	var chartSource=this.chartMainView.down("#sourceView").down("#chartSourcePanel");
   	   	chartSource.setHidden(true);
   	   	var noSource=this.chartMainView.down("#sourceView").down("#noSourcePanel");
   	   	noSource.setHidden(false);
    },
    
    onEditChart:function(record)
    {
    	debugger;
    	var chartTreeNode =this.chartMainView.down('#chart-tree-panel').getRootNode();
    	var mapTreeNode = this.chartMainView.down('#map-tree-panel').getRootNode();
    	this.editedRecord=record;
    	this.tempFlag=true;
    	var temp=null;
    	this.chartMainView.down('#gridFieldPanel').expand();
    	if(record.chartJson.dataSource.hasOwnProperty("chart"))
    	{
    		temp=chartTreeNode.findChild("chart_id",record.chartJson.chartId,true);
    		var tree=this.chartMainView.down('#chart-tree-panel');
    		chartTreeNode.expandChildren();
    		
    		temp.callAjax=false;
    		tree.getSelectionModel().select(temp);
    
    		temp.callAjax=true;
    		tree.fireEvent('select',tree,temp);
    	}
    	else{
    		temp=mapTreeNode.findChild("chart_id",record.chartJson.chartId,true);
    		var tree=this.chartMainView.down('#map-tree-panel');
    		mapTreeNode.expandChildren();
    		
    		temp.callAjax=false;
    		tree.getSelectionModel().select(temp);
    
    		temp.callAjax=true;
    		tree.fireEvent('select',tree,temp);
    	}    	
    },
    
    onSelect:function( currentObject, record, index, eOpts )
    {
    	if(record.callAjax==false){
    		return;
    	}
    	debugger;
        if(record.data.leaf	== true)
        {	
	        var me = this;
	        var tempView = this.chartMainView;
		    Ext.Ajax.request(
		    {	
		    	url:'secure/chartBuilderController/drawNewChart',
		    	method:'POST',
		    	mainView: tempView,
		    	scope:me,
		    	jsonData:
		    	{
		    		id : record.data.chart_id
		    	},
		    	params:{},		   
			    success : function(response, currentObject,options)
			    {
			    	debugger;
			        var responseJson = Ext.JSON.decode(response.responseText);	
			        if (responseJson.response.success == 'true') 
			        {
		    		    var data = Ext.JSON.decode(responseJson.response.data);
		    		    if(currentObject.scope.tempFlag==false)
		    		    {
					        var jsonObj=data.chartDisp;
					        var propObj=data.chartProp;
					        var gridFieldObj=data.chartGridField;
					        var javaClass=data.javaClass;
					        	
					        currentObject.scope.jsonObj = jsonObj;
					        currentObject.scope.propObj = propObj;
					        currentObject.scope.chartId = currentObject.jsonData.id;
					        currentObject.scope.javaClass = javaClass;
					        					    
					        var chartPanel=currentObject.mainView.down('#chartPanel');
					        chartPanel.jsonObject=jsonObj;
					        	
					        var rightPanel=currentObject.mainView.down('#rightpanel');
					        rightPanel.rightPropJson=propObj;
					        var gridFieldPanel=rightPanel.down('#gridFieldPanel');
					        gridFieldPanel.removeAll();
					        gridFieldPanel.add(gridFieldObj);
					        				        	
					        rightPanel.controller.loadPanelItems(gridFieldPanel,gridFieldPanel.items.items);
					        if(currentObject.scope.setDataConfig==true){
					        	currentObject.scope.setGridFieldsValue(gridFieldPanel,currentObject.scope.editedRecord);	
				        	}	      	
					        var propertyGrid=currentObject.mainView.down('#propertyGrid');
					       	var advPropertyGrid=currentObject.mainView.down('#advPropertyGrid');
					       	try{
						       	if(propObj.type.editor.store != undefined && Ext.isArray(propObj.type.editor.store) == false)
						       	{
						        	propObj.type.editor.store=Ext.decode(propObj.type.editor.store);
						        }
					        }catch(e){}
					        propertyGrid.setSource(jsonObj,propObj);
					        if(jsonObj.dataSource.hasOwnProperty("chart"))
		 		    		{
					        	advPropertyGrid.setSource(jsonObj.dataSource.chart,propObj); 
		 		    		}
		 		    	    else
		 		    	    {
		 		   			   	advPropertyGrid.setSource(jsonObj.dataSource.map,propObj);
		 	  		        	advPropertyGrid.getStore().filterBy(function(record, id){
		 	    			        	   if(record.get("name")=="isTypeEditable")
		 	    			        	   { 
			    			        	      return false;
	 		    			        	   }    
		 		    		        	   return true;
		 	  		        	}, this);
		 	    		    }
					        
				        	//To draw charts initially	
				        	var a=new FusionCharts(jsonObj);
					        a.render( chartPanel.body.id);
					        chartPanel.doLayout();    				        
				        }
			        	//Edit Chart
			        	else{	        			   		
			        		debugger;		    
			        		data.chartDisp.type=currentObject.scope.editedRecord.chartJson.type;
			        		data.chartDisp.height=currentObject.scope.editedRecord.chartJson.height;
			        		data.chartDisp.width=currentObject.scope.editedRecord.chartJson.width;
			        		if(currentObject.scope.editedRecord.chartJson.dataSource.hasOwnProperty("chart"))
			        		{
			        			data.chartDisp.dataSource.chart=currentObject.scope.editedRecord.chartJson.dataSource.chart;
			        		}
			        		data.chartDisp.dataSource.map=currentObject.scope.editedRecord.chartJson.dataSource.map;
			        		
			        		var jsonObj=data.chartDisp;
				        	var propObj=data.chartProp;
				        	var gridFieldObj=data.chartGridField;
				        	var javaClass=data.javaClass;
				        	currentObject.scope.jsonObj = jsonObj;
				        	currentObject.scope.propObj = propObj;
				        	currentObject.scope.chartId = currentObject.jsonData.id;
				        	currentObject.scope.javaClass = javaClass;
				        					    
				        	var chartPanel=currentObject.mainView.down('#chartPanel');
				        	chartPanel.jsonObject=jsonObj;
				        	
				        	var rightPanel=currentObject.mainView.down('#rightpanel');
				        	rightPanel.rightPropJson=propObj;
				        	var gridFieldPanel=rightPanel.down('#gridFieldPanel');
				        	gridFieldPanel.removeAll();
				        	gridFieldPanel.add(gridFieldObj);
				        				        	
				        	rightPanel.controller.loadPanelItems(gridFieldPanel,gridFieldPanel.items.items);
				        	if(currentObject.scope.setDataConfig==true){
					        	currentObject.scope.setGridFieldsValue(gridFieldPanel,currentObject.scope.editedRecord);	
				        	}
				        	var propertyGrid=currentObject.mainView.down('#propertyGrid');
				        	var advPropertyGrid=currentObject.mainView.down('#advPropertyGrid');
				        	try{
					        	if(propObj.type.editor.store != undefined && Ext.isArray(propObj.type.editor.store) == false)
					        	{
					        		propObj.type.editor.store=Ext.decode(propObj.type.editor.store);
					        	}
				        	}catch(e){}
				        	propertyGrid.setSource(jsonObj,propObj);
				        	if(jsonObj.dataSource.hasOwnProperty("chart"))
	 		    		    {
				        		advPropertyGrid.setSource(jsonObj.dataSource.chart,propObj); 
	 		    		    }
	 		    		    else
	 		    		    {
	 		    			   	advPropertyGrid.setSource(jsonObj.dataSource.map,propObj);
	 	  			        	advPropertyGrid.getStore().filterBy(function(record, id){
	 		    			        	   if(record.get("name")=="isTypeEditable")
	 		    			        	   { 
	 		    			        	      return false;
	 		    			        	   }    
	 		    			        	   return true;
	 	  			        	}, this);
	 		    		    }
				        
				        	//To draw charts initially	
				        	var a=new FusionCharts(jsonObj);
					        a.render( chartPanel.body.id);
					        chartPanel.doLayout();     				      
			        	}//else ends 
		    		    currentObject.scope.tempFlag=false;
		    		    currentObject.scope.setDataConfig=false;
			         }//if ends
			         else{
			        	Ext.Msg.alert('Error', 'Loading of Chart failed');
			         }
			        }, //sucsess ends
			        failure : function()
			        {
		             	 Ext.Msg.alert('Error', 'Cannot connect to server');
			        }
			     },tempView,me);	
	        	}//if closes
    }, //onSelect ends		
        
    setGridFieldsValue:function(gridFieldPanel,eRecord)
    {
        debugger;
        gridFieldPanel.down("#chartTitle").setValue(eRecord.chartJson.chartTitle);
        if(gridFieldPanel.query("[comboType=all]")[0]!=undefined)
	    {
        	/** Check whether Row Data or Column Data is true*/
        	if(eRecord.chartJson.dataType==0)
        	{
        		debugger;
        		if(gridFieldPanel.down("#rowDataFieldSet")!=null){
        			gridFieldPanel.down("#rowDataFieldSet").getEl().dom.getElementsByTagName("input")[0].checked=true;
        			gridFieldPanel.down("#colDataFieldSet").setDisabled(true);
            		gridFieldPanel.down("#rowDataFieldSet").setDisabled(false);
        		}
        		if(gridFieldPanel.down("#labelCombo")!=undefined){
    	    		gridFieldPanel.down("#labelCombo").setValue(eRecord.chartJson.label);
    	    	}
    	    	if(gridFieldPanel.down("#categoryCombo")!=undefined){
    	    		gridFieldPanel.down("#categoryCombo").setValue(eRecord.chartJson.category);
    	    	}
    	    	if(gridFieldPanel.down("#seriesnameCombo")!=undefined){
    	    		gridFieldPanel.down("#seriesnameCombo").setValue(eRecord.chartJson.seriesname);
    	    	}
    	    	if(gridFieldPanel.down("#rowCombo")!=undefined){
    	    		gridFieldPanel.down("#rowCombo").setValue(eRecord.chartJson.row);
    	    	}
    	    	if(gridFieldPanel.down("#columnCombo")!=undefined){
    	    		gridFieldPanel.down("#columnCombo").setValue(eRecord.chartJson.column);
    	    	}
    	    	if(gridFieldPanel.down("#codeCombo")!=undefined){
    	    		gridFieldPanel.down("#codeCombo").setValue(eRecord.chartJson.code);
    	    	}
        	}
        	/**Column Data is true*/
        	else{
        		if(gridFieldPanel.down("#colDataFieldSet")!=null){
	        		gridFieldPanel.down("#colDataFieldSet").getEl().dom.getElementsByTagName("input")[0].checked=true;
	        		gridFieldPanel.down("#colDataFieldSet").setDisabled(false);
	        		gridFieldPanel.down("#rowDataFieldSet").setDisabled(true);
	        		
	        		if(gridFieldPanel.down("#labelTagField")!=undefined){
	    	    		gridFieldPanel.down("#labelTagField").setValue(eRecord.chartJson.label);
	    	    	}
	    	    	if(gridFieldPanel.down("#categoryCombo1")!=undefined){
	    	    		gridFieldPanel.down("#categoryCombo1").setValue(eRecord.chartJson.category);
	    	    	}
	    	    	if(gridFieldPanel.down("#seriesnameTagField")!=undefined){
	    	    		gridFieldPanel.down("#seriesnameTagField").setValue(eRecord.chartJson.seriesname);
	    	    	}
	    	    	if(gridFieldPanel.down("#rowCombo1")!=undefined){
	    	    		gridFieldPanel.down("#rowCombo1").setValue(eRecord.chartJson.row);
	    	    	}
	    	    	if(gridFieldPanel.down("#colTagField")!=undefined){
	    	    		gridFieldPanel.down("#colTagField").setValue(eRecord.chartJson.column);
	    	    	}
	    	    	
	        	}	
		    }
	    }
        if(gridFieldPanel.down("#crtColCombo")!=undefined){
    		gridFieldPanel.down("#crtColCombo").setValue(eRecord.chartJson.criteriaColumn);	
    	}
    	if(gridFieldPanel.down("#criteriaCombo")!=undefined){
    		gridFieldPanel.down("#criteriaCombo").setValue(eRecord.chartJson.criteria);	
    	}
    	if(gridFieldPanel.down("#processCombo")!=undefined){
    		gridFieldPanel.down("#processCombo").setValue(eRecord.chartJson.process);	
    	}
    	if(gridFieldPanel.down("#startDateCombo")!=undefined){
    		gridFieldPanel.down("#startDateCombo").setValue(eRecord.chartJson.startdate);	
    	}
    	if(gridFieldPanel.down("#endDateCombo")!=undefined){
    		gridFieldPanel.down("#endDateCombo").setValue(eRecord.chartJson.enddate);	
    	}
    	if(gridFieldPanel.down("#ganttcategoriesFieldSet") != undefined){
    		gridFieldPanel.down("#ganttYear").setValue(eRecord.chartJson.year);
    		gridFieldPanel.down("#ganttQuarter").setValue(eRecord.chartJson.quarter);	
    		gridFieldPanel.down("#ganttMonth").setValue(eRecord.chartJson.month);	
    		gridFieldPanel.down("#ganttWeek").setValue(eRecord.chartJson.week);
    		gridFieldPanel.down("#ganttDay").setValue(eRecord.chartJson.day);	
    		gridFieldPanel.down("#ganttTime").setValue(eRecord.chartJson.time);	
    	}
    	
    	
    	//Group By
    	if(gridFieldPanel.down("#groupByCol")!=undefined){
    		gridFieldPanel.down("#groupByCol").setValue(eRecord.chartJson.groupByCol);
    	}
    	
    /*	if(gridFieldPanel.query("[comboType=numeric]")[0]!=undefined){
        	 gridFieldPanel.query("[comboType=numeric]")[0].setValue(eRecord.chartJson.value);
        }*/
    	if(gridFieldPanel.down("#valueCombo")!=undefined){
        	gridFieldPanel.down("#valueCombo").setValue(eRecord.chartJson.value);
        }	
    	
        if(gridFieldPanel.down("#aggCombo")!=undefined){
        	gridFieldPanel.down("#aggCombo").setValue(eRecord.chartJson.aggregate);
        }	
        
        if(gridFieldPanel.down("#criteriaCombo")!=undefined){
        	gridFieldPanel.down("#criteriaCombo").setValue(eRecord.chartJson.criteria);
	    }
        
        if(gridFieldPanel.down("#crtColCombo")!=undefined){
    		gridFieldPanel.down("#crtColCombo").setValue(eRecord.chartJson.rfColumn);
    	}
        
    	//Criteria Field
    	if(gridFieldPanel.down("#crtMultiCriteria")!=undefined){
    		gridFieldPanel.down("#crtMultiCriteria").setValue(eRecord.chartJson.rfValue);
	    }
    	//Criteria Field
    	if(gridFieldPanel.down("#criteriarecord")!=undefined){
    		gridFieldPanel.down("#criteriarecord").setValue(eRecord.chartJson.rfCount);
	    }
    	if(gridFieldPanel.down("#timeinterval")!=undefined){
    		gridFieldPanel.down("#timeinterval").setValue(eRecord.chartJson.timeinterval);
	    }
    	if(gridFieldPanel.down("#taskCombo")!=undefined){
    		gridFieldPanel.down("#taskCombo").setValue(eRecord.chartJson.taskcolumn);
	    }
    	if(gridFieldPanel.down("#conTaskCombo")!=undefined){
    		gridFieldPanel.down("#conTaskCombo").setValue(eRecord.chartJson.contaskcolumn);
	    }
    	if(gridFieldPanel.down("#open")!=undefined){
    		gridFieldPanel.down("#open").setValue(eRecord.chartJson.open);
	    }
    	if(gridFieldPanel.down("#high")!=undefined){
    		gridFieldPanel.down("#high").setValue(eRecord.chartJson.high);
	    }
    	if(gridFieldPanel.down("#low")!=undefined){
    		gridFieldPanel.down("#low").setValue(eRecord.chartJson.low);
	    }
    	if(gridFieldPanel.down("#close")!=undefined){
    		gridFieldPanel.down("#close").setValue(eRecord.chartJson.close);
	    }
    	if(gridFieldPanel.down("#volume")!=undefined){
    		gridFieldPanel.down("#volume").setValue(eRecord.chartJson.volume);
	    }
    	if(eRecord.chartJson.criteriatype != undefined){
    		var criteria =gridFieldPanel.down("#reportFormRadio");
    		if(eRecord.chartJson.criteriatype == "single"){
    			criteria.query("[inputValue=single]")[0].setValue(true)
    		}else{
    			criteria.query("[inputValue=multi]")[0].setValue(true)
    		}
    	}
    	
    }//setGridFieldsComboValue ends
});