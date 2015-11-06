Ext.define('Healthsurvey.view.reportbuilder.reportlist.ReportListPanelController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportleftcontroller',
    reportMainView:null,
    afterRender:function()
    {
    	this.reportMainView=this.getView().up();
    	
    },
      
    onNewReportClick:function()
    {
    	debugger;
    	var window=this.reportMainView.controller.window;
   
    	window.isEdit=false,  //setting value of isEdit variable of window object false 
    	window.setTitle("Create New Report");
    	window.query("#new-report-name")[0].setValue("");
    	window.query("#txtSynopsis")[0].setValue("");
    	window.query("#txtHelp")[0].setValue("");
    	window.query("#displayRadioField")[0].reset();
    	window.show();
    },
    
    onReportTreeLoad:function( currentObject, records, successful, operation, node, eOpts )
    {
        debugger;
        var me = this;
        var tempView = this.getView();
        Ext.Ajax.request(
    	{
    		url : "secure/reportBuilderController/getReportTree",
    		method : 'POST',
    		currentView:tempView,
    		jsonData : {},
    		success : function(response, currentObject,options) 
    		{
    			debugger;
    			var responseJson = Ext.JSON.decode(response.responseText);						
    			if (responseJson.response.success == 'true') 
    			{
    				var data = Ext.JSON.decode(responseJson.response.data);
    				var reportPanel=currentObject.currentView;
    				var reportTree=reportPanel.down('#report-builder-tree');
    				reportTree.setRootNode(data);	
    			}
    			else 
    			{
    				Ext.Msg.alert('Error',"Report List Rendering Failed");
    			}
    		},
    		failure : function() 
    		{
    			Ext.Msg.alert('Error', 'Cannot connect to server');
    		}
    	});
    },//onReportTreeLoad ends
    
    onReportListDblClick:function( item, record, item, index, e, eOpts )
    {
    	//Restrict duplicate tab to be opened 
    	var flag = false;
    	var tabPanel = this.reportMainView.down('#reportsTabPanel');
		var tbarItems = tabPanel.tabBar.items;
		for (var i = 0; i < tbarItems.length; i++)
		{		
			var reportID=tbarItems.items[i].config.card.reportID;
			var recordId=record.data.id;
			if(reportID!= undefined )
			{
				if(parseInt(reportID)==recordId)
				{
					tabPanel.getLayout().setActiveItem(tbarItems.items[i].config.card);
					flag = true;
					break;
				}
			}
		}
		if (flag == false) 
		{
	    	debugger;
	    	var tempView=this.getView();
	    	var mainView=this.reportMainView;
	    	Ext.Ajax.request(
	    	{
	    		url:'secure/reportBuilderController/getReportDetailsById',
	    		method:'POST',
	    		currentView:tempView,
	    		mainView:mainView,
	    		jsonData:{
	    			id:record.id
	    		},
	    		params:{},
	    		success:function(response, currentObject,options) 
	    		{
	    			var responseJson = Ext.JSON.decode(response.responseText);						
	    			if (responseJson.response.success == 'true') 
	    			{
	    				var data = Ext.JSON.decode(responseJson.response.data);
			    		var tabs= currentObject.mainView.down("#reportsTabPanel"); 
			    		debugger;
			    		var tab=Ext.create('Healthsurvey.view.reportbuilder.reportBuilder.ReportBuilderView', //activeTab
			    		{
			    			closable:true,
			    			iconCls:'editTabIcon',
			    			title:data[0].report_name,
			    			reportID:data[0].report_id,
			    			editFlag:data[0].edit_flag,
			    			reportName:data[0].report_name,
			    			synopsis:data[0].report_synopsis,
			    			help:data[0].report_help,
			    			displayType:data[0].other_properties_json.displayType,
			    			queryId:data[0].query_info.queryId,
			    			queryJson:JSON.stringify(data[0].query_info.queryJson),
			    			jpqlQuery:data[0].query_info.jpqlQuery,
			    			isEdit:true,
			    			editJSON:data[0],
			    			defaultCColumn:data[0].other_properties_json.defaultCColumn!=undefined?data[0].other_properties_json.defaultCColumn:"",
					    	isSummaryGrid:data[0].other_properties_json.isSummaryGrid!=undefined?data[0].other_properties_json.isSummaryGrid:false,
					    	qcPosition:data[0].other_properties_json.qcPosition!=undefined?data[0].other_properties_json.qcPosition:"north",
					    	checkboxgrid:data[0].other_properties_json.checkboxgrid!=undefined?data[0].other_properties_json.checkboxgrid:false,
					    	actionbuttongrid:data[0].other_properties_json.actionbutton!=undefined?data[0].other_properties_json.actionbutton:[]
			    		});
			    		tabs.add(tab);
			    		tabs.setActiveTab(tab);
			    		tab.down('#topReportNameField').setValue(data[0].report_name);  //set top text field value
			    					    		
	    			}else{
	    				Ext.Msg.alert('Error', 'Report Rendering Problem');
	    			}	    			
	    		},
	    		failure:function() 
	    		{
	    			Ext.Msg.alert('Error', 'Cannot connect to server');
	    		}  		
	    	});	
		}
    }//onReportListDblClick ends
    
});