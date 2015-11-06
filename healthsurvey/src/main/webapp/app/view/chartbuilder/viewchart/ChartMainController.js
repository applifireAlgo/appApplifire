Ext.define('Healthsurvey.view.chartbuilder.viewchart.ChartMainController',{
    extend: 'Ext.app.ViewController',
    requires: ['Ext.MessageBox','Ext.window.Window'],
    alias: 'controller.chartmaincontroller',
  
    rptBuilderTab:null,
    dataConf:null,
    queryConf:null,
    chartSouceView:null,
    chartSourceCtrl:null,
    rightPanelView:null,
    rightPanelCtrl:null,
    leftPanelCtrl:null,
    
    afterRender:function()
    {
    	this.rptBuilderTab=this.getView().up();
    },
     
    onTabChange:function( tabPanel, newCard, oldCard, eOpts )
    {
    	debugger;
    	switch (newCard.tabId) {
		case 1:
			break;
		case 2:	
			newCard.getController().showChartSource(); 
			break;
		default:
			break;
		}
    },
    
    onSaveChartClick:function()
    {
    	debugger;
    	this.getView().down("#left-panel").controller.tempFlag=false;
    	
    	radioField=this.getView().down("#left-panel").down('#chartRadioField').getChecked()[0].inputValue;
    	
	    var dataConfigTab=this.rptBuilderTab.down("#data-config");
	    var rptChartGridStore=dataConfigTab.down("#chartPropGridView").getStore();
	    var rptDataPointGridStore=dataConfigTab.down("#dataEndPointGrid").getStore();
	    var gFieldPanel=this.getView().down("#gridFieldPanel");
	    var chartTitle=gFieldPanel.down("#chartTitle").getValue();
	    
	    var errorMsg="";
	    if(chartTitle==""){errorMsg=errorMsg+"Enter Chart Title<br>";}
	    	
	    var comp=this.getView().down('#chartPanel');
	    comp.jsonObject.dataSource.data=[];  //setting "data":[]
	    var chartJson=comp.jsonObject;
	
	    var chartID=this.getView().down("#left-panel").controller.chartId;
	    chartJson.chartId=chartID;
	    var javaClass=this.getView().down("#left-panel").controller.javaClass;
	    chartJson.javaClass=javaClass;
	    chartJson.chartTitle=chartTitle;
	    
	    /**Value and Code Value DataFieldJson does not have rowdata or coldata fieldset.
	    Therefore make radioChecked true for further execution*/
	    var  radioChecked=null;
	    if(gFieldPanel.down("#rowDataFieldSet")==null){
	    	radioChecked=true
	    }
	    else{
	    	//Check RightSide Radio Field whether Row Data is checked or Column Data
	    	 radioChecked=gFieldPanel.down("#rowDataFieldSet").getEl().dom.getElementsByTagName("input")[0].checked;
	    }
	    /**If Row Data is checked*/
	    if(radioChecked==true)
	    {
	    	//ComboType=All with combobox fields
	    	if(gFieldPanel.query("[comboType=all]")[0]!=undefined)
		    {
		    	if(gFieldPanel.down("#labelCombo")!=undefined){
		    		if(gFieldPanel.down("#labelCombo").getValue()==null){
		    			errorMsg=errorMsg+"Enter Label Field<br>";
		    		}
		    		chartJson.label=[];
		    		chartJson.label.push(gFieldPanel.down("#labelCombo").getValue());
		    	}
		    	if(gFieldPanel.down("#categoryCombo")!=undefined){
		    		if(gFieldPanel.down("#categoryCombo").getValue() ==null){
		    			errorMsg=errorMsg+"Enter Category Field<br>";
		    		}
		    		chartJson.category=[];
		    		chartJson.category.push(gFieldPanel.down("#categoryCombo").getValue());
		    	}
		    	if(gFieldPanel.down("#seriesnameCombo")!=undefined){
		    		if(gFieldPanel.down("#seriesnameCombo").getValue() ==null){
		    			errorMsg=errorMsg+"Enter SeriesName Field<br>";
		    		}
		    		chartJson.seriesname=[];
		    		chartJson.seriesname.push(gFieldPanel.down("#seriesnameCombo").getValue());
		    	}
		    	if(gFieldPanel.down("#rowCombo")!=undefined){
		    		if(gFieldPanel.down("#rowCombo").getValue()==null){
		    			errorMsg=errorMsg+"Enter Row Field<br>";
		    		}
		    		chartJson.row=[];
		    		chartJson.row.push(gFieldPanel.down("#rowCombo").getValue());
		    	}
		    	if(gFieldPanel.down("#columnCombo")!=undefined){
		    		if(gFieldPanel.down("#columnCombo").getValue()==null){
		    			errorMsg=errorMsg+"Enter Column Field<br>";
		    		}
		    		chartJson.column=[];
		    		chartJson.column.push(gFieldPanel.down("#columnCombo").getValue());
		    	}
		    	if(gFieldPanel.down("#codeCombo")!=undefined){
		    		if(gFieldPanel.down("#codeCombo").getValue()==null){
		    			errorMsg=errorMsg+"Enter Code Field<br>";
		    		}
		    		chartJson.code=gFieldPanel.down("#codeCombo").getValue();
		    	}
		    }
		    // Value Field
	    	var dataType="";
		    if(gFieldPanel.down("#valueCombo")!=undefined){
		    	if(gFieldPanel.down("#valueCombo").getValue()==null){
		    		errorMsg=errorMsg+"Enter Value Field<br>";
		    	}
		    	chartJson.value=gFieldPanel.down("#valueCombo").getValue();
		    	
		    	var store = gFieldPanel.down("#valueCombo").getStore();
				var findVal = store.findExact("name", gFieldPanel.down("#valueCombo").getValue());
				if (findVal != -1) {
					dataType=store.getAt(findVal).data.dataType
				}
		    }
		    //Aggregate Field
		    var aggVal="";
		    if(gFieldPanel.down("#aggCombo")!=undefined){
		    	chartJson.aggregate=gFieldPanel.down("#aggCombo").getValue() == null?"":gFieldPanel.down("#aggCombo").getValue();
		    	aggVal=gFieldPanel.down("#aggCombo").getValue();
		    }
		    
		    chartJson.dataType=0;
		    
		   //Validation that string value cannot have min,max,sum,avg aggregate   
			if((dataType=="VARCHAR" && aggVal=="Sum")||(dataType=="VARCHAR" && aggVal=="Min")
					||(dataType=="VARCHAR" && aggVal=="Max")||(dataType=="VARCHAR" && aggVal=="Avg"))
			{
				errorMsg=errorMsg+"Aggregate functions except Count cannot be applied on VARCHAR type Value field <br>";
			}
			
			//Validation that datetime value cannot have min,max,sum,avg aggregate 
			if((dataType=="DATETIME" && aggVal=="Sum")||(dataType=="DATETIME" && aggVal=="Avg")
					||(dataType=="DATETIME" && aggVal=="Min")||(dataType=="DATETIME" && aggVal=="Max"))
			{
				errorMsg=errorMsg+"Aggregate functions except Count cannot be applied on DATETIME type Value field <br>";
			}
			
			//Validation that time value cannot have min,max,sum,avg aggregate 
			if((dataType=="TIME" && aggVal=="Sum")||(dataType=="TIME" && aggVal=="Avg")
					||(dataType=="TIME" && aggVal=="Min")||(dataType=="TIME" && aggVal=="Max"))
			{
				errorMsg=errorMsg+"Aggregate functions except Count cannot be applied on TIME type Value field <br>";
			}
			
			//Validation that date value cannot have min,max,sum,avg aggregate 
			if((dataType=="DATE" && aggVal=="Sum")||(dataType=="DATE" && aggVal=="Avg")
					||(dataType=="DATE" && aggVal=="Min")||(dataType=="DATE" && aggVal=="Max"))
			{
				errorMsg=errorMsg+"Aggregate functions except Count cannot be applied on DATE type Value field <br>";
			}
		    
		  //Check whether any error is caught or not
		    if(errorMsg.length>0)
		    {
		    	Ext.Msg.alert({title:'Info',msg:errorMsg,icon:Ext.MessageBox.INFO});
		    	return;
		    }
	    }
	    /**Else Column Data is checked*/
	    else{
	    	debugger;
	    	if(gFieldPanel.query("[comboType=all]")[0]!=undefined)
		    {
		    	if(gFieldPanel.down("#labelTagField")!=undefined){
		    		if(gFieldPanel.down("#labelTagField").getValue()==""){
		    			errorMsg=errorMsg+"Enter Label Field<br>";
		    		}
		    		chartJson.label=gFieldPanel.down("#labelTagField").getValue();
		    	}
		    	if(gFieldPanel.down("#categoryCombo1")!=undefined){
		    		if(gFieldPanel.down("#categoryCombo1").getValue() ==null){
		    			errorMsg=errorMsg+"Enter Category Field<br>";
		    		}
		    		chartJson.category=[];
		    		chartJson.category.push(gFieldPanel.down("#categoryCombo1").getValue());
		    	}
		    	if(gFieldPanel.down("#seriesnameTagField")!=undefined){
		    		if(gFieldPanel.down("#seriesnameTagField").getValue() ==""){
		    			errorMsg=errorMsg+"Enter SeriesName Field<br>";
		    		}
		    		chartJson.seriesname=gFieldPanel.down("#seriesnameTagField").getValue();
		    	}
		    	if(gFieldPanel.down("#rowCombo1")!=undefined){
		    		if(gFieldPanel.down("#rowCombo1").getValue()==null){
		    			errorMsg=errorMsg+"Enter Row Field<br>";
		    		}
		    		chartJson.row=[];
		    		chartJson.row.push(gFieldPanel.down("#rowCombo1").getValue());
		    	}
		    	if(gFieldPanel.down("#colTagField")!=undefined){
		    		if(gFieldPanel.down("#colTagField").getValue()==""){
		    			errorMsg=errorMsg+"Enter Column Field<br>";
		    		}
		    		chartJson.column=gFieldPanel.down("#colTagField").getValue();
		    	}
		    	
		    }
	    
	    	chartJson.value="";
	    	chartJson.aggregate="";
	    	chartJson.dataType=1;
	    	//Check whether any error is caught or not
		    if(errorMsg.length>0)
		    {
		    	Ext.Msg.alert({title:'Info',msg:errorMsg,icon:Ext.MessageBox.INFO});
		    	return;
		    }
	    }
	    //Change by Maya to set this criteria parameter for all charts
		
    	
    	//Group By
    	if(gFieldPanel.down("#groupByCol")!=undefined){
    		chartJson.groupByCol=gFieldPanel.down("#groupByCol").getValue()==null?"":gFieldPanel.down("#groupByCol").getValue();		
    	}
    	
    	
    	if(gFieldPanel.down("#processCombo")!=undefined){
    		chartJson.process=gFieldPanel.down("#processCombo").getValue()==null?"":gFieldPanel.down("#processCombo").getValue();
    	}
    	if(gFieldPanel.down("#startDateCombo")!=undefined){
    		chartJson.startdate=gFieldPanel.down("#startDateCombo").getValue()==null?"":gFieldPanel.down("#startDateCombo").getValue();
    	}
    	if(gFieldPanel.down("#endDateCombo")!=undefined){
    		chartJson.enddate=gFieldPanel.down("#endDateCombo").getValue()==null?"":gFieldPanel.down("#endDateCombo").getValue();
    	}
    	//USed to get gantt chart categories data
    	if(gFieldPanel.down("#ganttcategoriesFieldSet") != undefined){
    		chartJson.year= gFieldPanel.down("#ganttYear").getValue();
    		chartJson.quarter= gFieldPanel.down("#ganttQuarter").getValue();
    		chartJson.month= gFieldPanel.down("#ganttMonth").getValue();
    		chartJson.week= gFieldPanel.down("#ganttWeek").getValue();
    		chartJson.day= gFieldPanel.down("#ganttDay").getValue();
    		chartJson.time= gFieldPanel.down("#ganttTime").getValue();
    		
    	}
    	
    	var criteria =gFieldPanel.down("#reportFormRadio");
    	if(criteria != undefined){
		    	if(criteria.getChecked()[0].inputValue == "single"){
		    		chartJson.criteriatype="single";
		        	//Criteria Field
		        	if(gFieldPanel.down("#criteriaCombo")!=undefined){
		        		chartJson.criteria=gFieldPanel.down("#criteriaCombo").getValue() == null?"":gFieldPanel.down("#criteriaCombo").getValue();
		    	    }
		        	//ComboBox Field
		        	if(gFieldPanel.down("#crtColCombo")!=undefined){
		        		chartJson.criteriaColumn=gFieldPanel.down("#crtColCombo").getValue()==null?"":gFieldPanel.down("#crtColCombo").getValue();		
		        	}
		    	}else{
		    		chartJson.criteriatype="multi";
		    		//ComboBox Field
		        	if(gFieldPanel.down("#crtColCombo")!=undefined){
		        		chartJson.rfColumn=gFieldPanel.down("#crtColCombo").getValue()==null?"":gFieldPanel.down("#crtColCombo").getValue();		
		        	}
		        	//Criteria Field
		        	if(gFieldPanel.down("#crtMultiCriteria")!=undefined){
		    	    	chartJson.rfValue=gFieldPanel.down("#crtMultiCriteria").getValue() == null?"":gFieldPanel.down("#crtMultiCriteria").getValue();
		    	    }
		        	//Criteria Field
		        	if(gFieldPanel.down("#criteriarecord")!=undefined){
		    	    	chartJson.rfCount=gFieldPanel.down("#criteriarecord").getValue() == null?"":gFieldPanel.down("#criteriarecord").getValue();
		    	    }
		     	 }
    	}else{
        	//Criteria Field
        	if(gFieldPanel.down("#criteriaCombo")!=undefined){
    	    	chartJson.criteria=gFieldPanel.down("#criteriaCombo").getValue() == null?"":gFieldPanel.down("#criteriaCombo").getValue();
    	    }

    	}
    	
    	if(gFieldPanel.down("#timeinterval")!=undefined){
    		chartJson.timeinterval=gFieldPanel.down("#timeinterval").getValue()==null?"":gFieldPanel.down("#timeinterval").getValue();
    	}

    	if(gFieldPanel.down("#taskCombo")!=undefined){
    		chartJson.taskcolumn=gFieldPanel.down("#taskCombo").getValue()==null?"":gFieldPanel.down("#taskCombo").getValue();
    	}
    	
    	if(gFieldPanel.down("#conTaskCombo")!=undefined){
    		chartJson.contaskcolumn=gFieldPanel.down("#conTaskCombo").getValue()==null?"":gFieldPanel.down("#conTaskCombo").getValue();
    	}
    	if(gFieldPanel.down("#open")!=undefined){
    		chartJson.open=gFieldPanel.down("#open").getValue()==null?"":gFieldPanel.down("#open").getValue();
    	}
    	
    	if(gFieldPanel.down("#high")!=undefined){
    		chartJson.high=gFieldPanel.down("#high").getValue()==null?"":gFieldPanel.down("#high").getValue();
    	}
    	
    	if(gFieldPanel.down("#low")!=undefined){
    		chartJson.low=gFieldPanel.down("#low").getValue()==null?"":gFieldPanel.down("#low").getValue();
    	}
    	
    	if(gFieldPanel.down("#close")!=undefined){
    		chartJson.close=gFieldPanel.down("#close").getValue()==null?"":gFieldPanel.down("#close").getValue();
    	}
    	
    	if(gFieldPanel.down("#volume")!=undefined){
    		chartJson.volume=gFieldPanel.down("#volume").getValue()==null?"":gFieldPanel.down("#volume").getValue();
    	}
    	
    	
    	
    		
	    //Check LeftSide Radio Field Value whether it is chart or chart point
	    if(radioField==0) //radioField=chart
	    {
		    var data = {
					chartType : chartJson.type,
					chartTitle : chartTitle,
					chartId : chartID,
					chartJson : chartJson,
			};
		    if (this.rptBuilderTab.down('#left-panel').controller.chartMode == "edit")
			{
				var rec = rptChartGridStore.getAt(this.rptBuilderTab.down('#left-panel').controller.chartRowIndex);
				rec.set(data);
			}else {
				rptChartGridStore.add(data);
			}
	    }//if closes
	    //radioField=1 i.e chart point
	    else  
	    {
	    	var data={
	    			label:chartTitle,
	    			displayName:chartTitle,
	    			chartJson:chartJson,
	    			aggregate:gFieldPanel.down("#aggCombo").getValue(),
	    			type:'Chart'
	    	};
	    	if (this.rptBuilderTab.down('#left-panel').controller.chartMode == "edit")
	    	{
				var rec = rptDataPointGridStore.getAt(this.rptBuilderTab.down('#left-panel').controller.chartRowIndex);
				rec.set(data);
			}else {	
				rptDataPointGridStore.add(data);
			}
	    }//else closes
	    
	    Ext.Msg.alert('Success','Chart saved successfully');	
	    this.onResetClick();
    },//onSaveChartClick
    
    onSaveTemplateClick:function()
    {
    	debugger;
    	var chartPanel=this.getView().down('#chartPanel');
    	var chartJson=chartPanel.jsonObject;
    	if(chartJson!="")
    	{
    		var win=new Ext.Window(
    		{
		    		title: 'Save Template Window', 
		    		view:this.getView(),
		    		id: 'savetempwindow',
		    		padding:'10 10 10 10',
		    		items:[
		    		       {
		    		    	   xtype:'textfield',
		    		    	   fieldLabel:'Template Name ',
		    		    	   emptyText:'Enter Template Name',
		    		    	   allowBlank:false
		    		    	   //validateBlank:true
		    		       },
		    		       {
		    		    	   xtype:'button',
		    		    	   text:'Save',
		    		    	   style:'float:right',
		    		    	   listeners:{
		    		    		   click:function(id,opt,event)
		    		    		   {
			    		    		   debugger;
			    		    		   var templateName = this.up().items.items[0].value; // window textfield value
			    		    		   var chartPanel=this.up().view.down("#chartPanel");
			    		    		   var templateJson=chartPanel.jsonObject;
			    		    		   if(templateName!="")
			    		    		   {
				    		    		   var height=templateJson.height;
				    		    		   var width=templateJson.width;
				    		    		   
				    		    		   if(templateJson.dataSource.hasOwnProperty("chart"))
				    		    		   {
				    		    			   tempJson=templateJson.dataSource.chart;
				    		    		   }
				    		    		   else
				    		    		   {
				    		    			   tempJson=templateJson.dataSource.map;
				    		    		   }
				    		    		   tempJson.width=width;
				    		    		   tempJson.height=height;
				    		    		   
				    		    	       Ext.Ajax.request(
				    		    	    	    	{
				    		    	    	    		url:'secure/chartBuilderController/saveTemplate',
				    		    	    	    		method:'POST',
				    		    	    	    		currentView:this.up().view,
				    		    	    	    		jsonData:
				    		    	    	    		{
				    		    	    	    			template_json :JSON.stringify(tempJson,null, "\t"),
				    		    	    	    			template_name: templateName 
				    		    	    		        },
				    		    	    		        success : function(response, currentObject)
				    		    	    		        {			    		  
				    		    	    		        	 Ext.Msg.alert('Status','Template saved successfully');
				    		    	    		        	 var templateTree=currentObject.currentView.down('#template-view');
				    		    	    		        	 templateTree.store.load();
				    		    	    		        },
				    		    	    		        failure : function()
				    		    	    		        {
				    		    	    	             	 Ext.Msg.alert('Error', 'Cannot connect to server');
				    		    	    	            }
				    		    	    	    	});
				    		    	       this.up('window').close();
			    		    		   }
			    		    		   else{
			    		    			   Ext.Msg.alert({title: 'Info',msg: "Enter Template Name",icon: Ext.MessageBox.INFO});
			    		    		   }			    		    		   			    		    	       
		    		    		   	}//click ends
		    		    	   }//listeners ends
		    		       }]
		 });
    	win.show();
    	}//if closes
    	else{
			   Ext.Msg.alert({title:'Info',msg:"Draw Charts to save it as template",icon:Ext.MessageBox.INFO});
		}
    },// onSaveTemplateClick ends
    onResetClick:function()
    {
    	debugger;
		var chartpanel=this.getView().down('#chartPanel');
		chartpanel.jsonObject="";	        	 
   	   	chartpanel.update("Charts will render here  ...");
   	   
   	   	var propertyGrid=this.getView().down('#propertyGrid');
   	   	propertyGrid.getStore().loadData([]);
     	 
   	   	var advPropertyGrid=this.getView().down('#advPropertyGrid');
   	   	advPropertyGrid.getStore().loadData([]);
	     
   	   	var mapTreePanel=this.getView().down('#map-tree-panel');
   	   	var mapTreeRootNode=mapTreePanel.getRootNode();
   	   	mapTreeRootNode.collapseChildren();
   	   	
   		var chartTreePanel=this.getView().down('#chart-tree-panel');
   	   	var chartTreeRootNode=chartTreePanel.getRootNode();
   	   	chartTreeRootNode.collapseChildren();
   	   	
   	   	this.getView().down('#gridFieldPanel').removeAll();
   	   	
   	   	var chartSource=this.getView().down("#sourceView").down("#chartSourcePanel");
   	   	chartSource.setHidden(true);
   	   	var noSource=this.getView().down("#sourceView").down("#noSourcePanel");
   	   	noSource.setHidden(false);
   	   	
   	   	this.getView().down('#chartRadioField').query("[boxLabel=Chart]")[0].setValue(true);
    },//onResetClick ends
});

