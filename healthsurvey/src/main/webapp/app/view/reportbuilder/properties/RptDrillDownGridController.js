Ext.define('Healthsurvey.view.reportbuilder.properties.RptDrillDownGridController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.drillDownGridController',
    rptBuilderTab:null,
    
    onAddDrillDownGClick : function(btn)
	{
		debugger;
		var rptBuilderActiveTab=btn.up().up().up().up().up().up().getActiveTab();  //btn.up().up().up().up().up();
		var drillDownGrid=rptBuilderActiveTab.query("[panelId=drillDownGrid]")[0]; //this.getView();
		this.initWidgets(rptBuilderActiveTab, drillDownGrid);
		this.loadFieldsStore(rptBuilderActiveTab, drillDownGrid);
		this.settingsWindow.show();
	},
	
	initWidgets : function(rptBuilderActiveTab, drillDownGrid)
	{
		this.fieldStore = this.getFieldsStore(rptBuilderActiveTab);
		this.targetRptStore = this.getTargetRptStore();
		this.targetRptStore.load();	
		this.settingsWindow = this.getSettingWindow(rptBuilderActiveTab, drillDownGrid);
	},
	
	afterDDGridRender:function(grid)   //loadDetails(check activeTab is in edit mode)
	{
		this.rptBuilderTab=grid.up().up().up();
		
		grid.reconfigure(this.getDrillDownGStore());
		
		if(this.rptBuilderTab.isEdit!=null && this.rptBuilderTab.isEdit==true)
		{
			grid.getStore().loadData(this.rptBuilderTab.editJSON.drilldown_json.drillDownGrid,true);
			var qcContext = grid.query("[checkId=qcContext]")[0];
			qcContext.setValue(this.rptBuilderTab.editJSON.drilldown_json.qcContext);
		}
	},
	getDrillDownGStore : function()
	{
		return Ext.create('Ext.data.Store', {
			fields : [ 'qfieldName', 
			           'dfieldName',
			           'fieldCaption',
			           'targetReportDe',
			           'targetReportsList',
			           'displayName'],
			data : []
		});
	},
	
	getSettingWindow:function(rptBuilderActiveTab, drillDownGrid)
	{
		return Ext.create('Ext.window.Window',{
					title : 'Drill Down Report Configuration',
					height :'50%',
					width : '30%',
					modal : true,
					resizable : false,
					gridObj : drillDownGrid,
					controller : this,
					closeAction : 'close',
					border : 0,
					plain : true,
					items : [ {
						xtype : 'panel',
						layout :'vbox',
						items : [
								{
									xtype : "fieldset",
									width : "100%",
									margin : '5 5 5 5',
									title : "Target Report Settings",
									items : [
									         	this.getDisplayFieldsCombo(rptBuilderActiveTab),
									         	this.getQueryFieldsCombo(rptBuilderActiveTab),
									         	this.getTargetRptCombo(),
											{
												xtype : "button",
												margin : '5 0 0 0',	
												text : "Add",
												handler: "onAddTargetReportClick",
											}]
								},
								{
									xtype : 'fieldset',
									title : 'Target Report list',
									margin : '5 5 5 5',
									width : "100%",
									fieldSetType : 'targetReportList',
									items : [
									         {
									        	xtype : "grid",
									        	width : "90%",
									        	gridType : "targetRList",
									        	store : this.getTargetRptGStore(),
									        	height : 200,
									        	viewConfig : {
									        		plugins : {
									        			ptype : 'gridviewdragdrop'
									        		}
									        	},
									        	columns : [
									        	            {
									        	            	xtype : 'actioncolumn',
									        	            	menuDisabled : true,
									        	            	flex : 0.3,
									        	            	text : 'Action',
									        	            	items : [ {
									        	            		icon : 'images/delete.gif',
									        	            		tooltip : 'Delete Row',
									        	            		handler : "onDeleteRowClick"									        	            		
									        	            	}]
									        	            },
									        	            {
									        	            	text : "Target Report",
									        	            	flex : 0.7,
									        	            	dataIndex : "report_name",
									        	            }]
									 }]//Target Report list fieldset items ends
								}]// panel items ends
					}],//window items ends
					buttonAlign : 'right',
					buttonMargins : '10 10 0 10',
					buttons : [
					           {
								text : 'Save',
								icon:'images/greenFlopy_save.png',
								tooltip : 'Save',
								handler : function()
								{
									debugger;
									var windowObj = this.up().up();
									var controller = windowObj.controller;
									var ddGrid = windowObj.gridObj;
									var field = windowObj.query("[comboType=dfieldList]")[0];
									var qfield = windowObj.query("[comboType=qfieldList]")[0];
									var fieldCaption = field.getStore().getAt(field.getStore().findExact("name",field.getValue())).data.name;
									var tRptListGrid = windowObj.query("[gridType=targetRList]")[0];
									var findVal=field.store.findExact("name",field.getValue()); //returns 0 if matched
									var dName=field.store.getAt(findVal).data.displayName; //get corresponding displayName of value
									var gStore = tRptListGrid.getStore();
									if (gStore.data.items.length == 0)
									{
										Ext.MessageBox.alert('Report Builder','Data Not available');
										return;
									}
									var tReportList = controller.formatStoreData(gStore);
									var data = {
										dfieldName : field.getValue(),
										qfieldName : qfield.getValue(),
										fieldCaption : fieldCaption,
										targetReportDe : tReportList[0].report_name,
										targetReportsList : tReportList,
										displayName:dName
									};
									if (windowObj.isEdit != undefined&& windowObj.isEdit == true)
									{
										var rec = ddGrid.getStore().getAt(windowObj.rowIndex);
										rec.set(data);
									} else {
										ddGrid.getStore().add(data);
									}
									this.up().up().close();//window close   		 
								}
							},
							{
								text : 'Cancel',
								icon:'images/delete_icon.png',
								handler : function(){
									this.up().up().close();//window close   		 
								}
							}]//buttons ends
				});	// window ends	
	}, //getSettingWindow ends
	
	onAddTargetReportClick : function(btn)
	{
		var windowObj = btn.up().up();
		var field = windowObj.query("[comboType=dfieldList]")[0];
		var tReport = windowObj.query("[comboType=reportList]")[0];
		if (field.getValue() == null|| tReport.getValue() == null) 
		{
			Ext.MessageBox.alert('Report Builder','Value is not selected for Field/Target Report ');
			return;
		}
		var tReportIdx = tReport.getStore().findExact("report_id", tReport.getValue());
		var reportName = tReport.getStore().getAt(tReportIdx).data.report_name;
		var tRptListGrid = windowObj.query("[gridType=targetRList]")[0];
		tRptListGrid.getStore().add({
			report_id : tReport.getValue(),
			report_name : reportName
		})
		tReport.getStore().removeAt(tReportIdx);
		tReport.reset();
	},//onAddTargetReportClick ends
	
	// DisplayField combo
	getDisplayFieldsCombo : function(rptBuilderActiveTab)
	{
		return new Ext.form.ComboBox({
			xtype : 'combobox',
			fieldLabel : 'Display Field',
			valueField : 'name',
			margin : '10 0 0 0',
			displayField : 'displayName',
			comboType : "dfieldList",
			columnWidth : 0.4,
			emptyText : 'Select Field...',
			store:this.fieldStore,
			queryMode : 'local',
		});
	},
	//QueryField Combo
	getQueryFieldsCombo : function(rptBuilderActiveTab)
	{
		return new Ext.form.ComboBox({
			xtype : 'combobox',
			fieldLabel : 'Query Field',
			valueField : 'name',
			margin : '10 0 0 0',
			displayField : 'displayName',
			comboType : "qfieldList",
			columnWidth : 0.4,
			emptyText : 'Select Field...',
			store:this.fieldStore,
			queryMode : 'local',
		});
	},
	//Target Report Combo
	getTargetRptCombo : function()
	{
		return new Ext.form.ComboBox({
			xtype : 'combobox',
			fieldLabel : 'Target Report',
			valueField : 'report_id',
			margin : '10 0 0 0',
			displayField : 'report_name',
			comboType : "reportList",
			columnWidth : 0.4,
			typeAhead : true,
			emptyText : 'Select Report...',
			editable : true,
			anyMatch : true,
			queryMode:'local',
			store : this.targetRptStore,
			listeners:{
				afterrender:function(cmb, eOpts)
				{
					var report_id=Ext.ComponentQuery.query('#reportsTabPanel')[0].getActiveTab().reportID;
					Ext.Ajax.request({
						url : "secure/reportBuilderController/getAllReportListData",
						method : 'POST',
						currentView:cmb,
						jsonData : {
							id:report_id
						},
						success : function(response, currentObject,options) 
						{
							var responseJson = Ext.JSON.decode(response.responseText);						
							if (responseJson.response.success == 'true') 
							{
								var data = Ext.JSON.decode(responseJson.response.data);
								currentObject.currentView.getStore().loadData(data,true)
						 	}else {
					    		Ext.Msg.alert('Error',"Report List Rendering Failed");
					    	}
					     },
					     failure : function() 
					     {
					    	 Ext.Msg.alert('Error', 'Cannot connect to server');
					     }
					});
				}//afterRender ends
			}//listeners ends
		});
	},//getTargetRptCombo ends
	
	getTargetRptStore : function() 
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : false,
			fields : [ {
				name : 'report_id',
				type : 'int'
			}, {
				name : 'report_name',
				type : 'string'
			} ],
			data:[]
		});
	},
	
	onDeleteRowClick : function(grid, rowIndex)
	{
		grid.getStore().removeAt(rowIndex);
	},
	
	getTargetRptGStore : function()
	{
		return Ext.create('Ext.data.Store', {
			fields : [ {
				name : 'report_id',
				type : 'int'
			}, {
				name : 'report_name',
				type : 'string'
			} ],
			data : []
		});
	},//getTargetRptGStore ends
	
	/*formatStoreData : function(store)
	{
		var data = [];
		Ext.Array.each(store.data.items, function(item) {
			data.push(item.data);
		}, {
			data : data
		});
		return data;
	},*/
	formatStoreData:function(store)
	 {
		 debugger;
			var data=[];
			Ext.Array.each(store.data.items,function(item){
				var keys=Ext.Object.getKeys(item.data);
				var d={};
				for(var x=0;x<keys.length;x++){
					if(keys[x] != "id"){
						d[keys[x]]=item.data[keys[x]];
					}
				}
				data.push(d);
			},{data:data});
			return data;		
		},
	
	editItemdblclick:function( th, record, item, index, e, eOpts )
	{
		debugger;
		record = record.data;
		var rptBuilderActiveTab=th.up().up().up().up().up().getActiveTab();
		var drillDownGrid=rptBuilderActiveTab.query("[panelId=drillDownGrid]")[0]; //this.getView();
		this.initWidgets(rptBuilderActiveTab,  drillDownGrid);
		this.loadFieldsStore(rptBuilderActiveTab, drillDownGrid, record.dfieldName);
		this.loadSavedData(record);
		this.targetRptStore.on('load', function(store, records,successful, eOpts, scope)
			 {
				var list = record.targetReportsList;
				for (var x = 0; x < list.length; x++)
				{
					var recIdx = store.findExact("report_id",list[x].report_id);
					if (recIdx != -1) {
					store.removeAt(recIdx);
					}
				}
			 }, {
			record : record
		});
		this.settingsWindow["isEdit"] = true;
		this.settingsWindow["rowIndex"] = index;
		this.settingsWindow.show();
	},
	
	loadFieldsStore : function(rptBuilderActiveTab, drillDownGrid, editField)
	{
		var gridConfigObj = rptBuilderActiveTab.query("[panelId=gridConfig]")[0];
		this.fieldStore.loadData(this.formatFieldData(gridConfigObj.getStore(), drillDownGrid.getStore(), editField));
	},
	
	loadSavedData : function(record) 
	{
		debugger;
		this.settingsWindow.query("[comboType=dfieldList]")[0].setValue(record.dfieldName);
		this.settingsWindow.query("[comboType=qfieldList]")[0].setValue(record.qfieldName);
		var tRptListGrid = this.settingsWindow.query("[gridType=targetRList]")[0];
		if (record.targetReportsList.length > 0)
		{
			tRptListGrid.getStore().loadData(record.targetReportsList);
		}
	},
	
	formatFieldData : function(store, existFields, editField) 
	{
		var data = [];
		Ext.Array.each(store.data.items,function(item) 
				{
					if(this.existFields.findExact("dfieldName",item.data.name) == -1
									|| (editField != undefined && editField == item.data.name))
					{
						data.push(item.data);
					}
				},{
					 data : data,
					 existFields : existFields,
					 editField : editField
		});
		return data;

	},
	
	//Combo Store structure same as GridConfig store structure
	getFieldsStore : function(rptBuilderActiveTab) //Store structure same as GridConfig store structure
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : "fieldVisible",
				type : "boolean"
			}, {
				name : "name",
				type : "string"
			}, {
				name : "displayName",
				type : "string"
			} , {
				name : "dataType",
				type : "string"
			} , {
				name : "isSortable",
				type : "string"
			} , {
				name : "fieldWidth",
				type : "int"
			} , {
				name : "alignment",
				type : "string"
			}  ],
			data : []
		});
		;
	}	
});