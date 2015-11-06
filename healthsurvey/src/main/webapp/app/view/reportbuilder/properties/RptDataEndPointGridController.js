Ext.define('Healthsurvey.view.reportbuilder.properties.RptDataEndPointGridController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.dataendpoint-GridController',
    rptBuilderTab:null,
    chartRightPanel:null,
    onAddDataGridClick:function(btn)
    {
    	debugger;
		var rptBuilderActiveTab=btn.up().up().up().up().up().up().getActiveTab();
		var dataEndPointGrid=rptBuilderActiveTab.query("[panelId=dataEndPointGrid]")[0];
		this.initWidgets(rptBuilderActiveTab, dataEndPointGrid);
		this.loadFieldsStore(rptBuilderActiveTab, dataEndPointGrid);
		this.settingsWindow.show();
    },
    
    afterDataEPGridRender:function(grid) 
	{
		this.rptBuilderTab=grid.up().up().up();
    	
		grid.reconfigure(this.getDataEPGridStore());
		
		if(this.rptBuilderTab.isEdit!=null && this.rptBuilderTab.isEdit==true)
		{
			grid.getStore().loadData(this.rptBuilderTab.editJSON.dataEndPoint_json,true);
		}
	},
	getDataEPGridStore : function()
	{
		return Ext.create('Ext.data.Store', {
			fields : [	'dfieldName',
			          	'dValueField',
			          	'aggregate',
			          	'label',
			          	'displayName',
			          	'type',
			          	'chartJson',
			          	'isGroupBy',
			          	'criteria',
			          	'criteriaColumn'
			         ],
			data : []
		});
	},
    initWidgets : function(rptBuilderActiveTab, dataEndPointGrid)
	{
		this.fieldStore = this.getFieldStore(rptBuilderActiveTab);
		this.valueFieldStore=this.getFieldStore(rptBuilderActiveTab);
		this.aggregateStore = this.getAggregateComboStore();	
		this.settingsWindow = this.getSettingWindow(rptBuilderActiveTab, dataEndPointGrid);
	},
	getSettingWindow:function(rptBuilderActiveTab, dataEndPointGrid)
	{
		return Ext.create('Ext.window.Window',{
					title : 'Data Point Configuration',
					modal : true,
					resizable : false,
					gridObj : dataEndPointGrid,
					controller : this,
					closeAction : 'close',
					border : 0,
					plain : true,
					layout:'vbox',
					editdFieldName:null,
					editAggField:null,
					bodyPadding:'5',
					items : [
					         {
					        	 xtype:'textfield',
					        	 fieldLabel:'Label',
					        	 txtType : "labelName",
					        	 emptyText:'Enter a name',
					        	 margin : '10 0 0 0'
					         },	
					         this.getDisplayFieldsCombo(rptBuilderActiveTab),
					         {
									xtype : "checkbox",
									checkId : "groupby",
									inputValue : 1,
									boxLabel : "Group By",
									margin : '5 0 0 5',
									listeners: {
							            change: function (checkbox, isChecked) {
							                    debugger;
							                    if(isChecked == true){
							                    	this.up().query("[comboType=dfieldValueList]")[0].setDisabled(false);
							                    }else{
							                    	this.up().query("[comboType=dfieldValueList]")[0].setDisabled(true);
							                    }
							                }

							        }
							 },
					         this.getValueFieldsCombo(rptBuilderActiveTab),
					         this.getAggregateCombo(rptBuilderActiveTab),
					         {xtype:"fieldset",title:"Query Criteria",layout:"anchor",margin:"10 0 20 0",
					 			items:[
					 				{xtype:"combobox",anchor:"100%",fieldLabel:"Criteria Column",displayField:"displayName",valueField:"name",queryMode:"local",comboType:"all",itemId:"crtColCombo",editable:true,emptyText:"Select.."}, 
					 				{xtype:"combobox",anchor:"100%",fieldLabel:"Criteria",displayField:"criteria_name",valueField:"criteria_value",itemId:"criteriaCombo",editable:true,emptyText:"Select Criteria..",margin:"0 0 20 0"}
					 			]
					 		}
					         
					],// window items ends
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
									var dataEPGrid = windowObj.gridObj;
									var store=dataEPGrid.getStore();
									var label=windowObj.query("[txtType=labelName]")[0];
									var field = windowObj.query("[comboType=dfieldList]")[0];
									var value = windowObj.query("[comboType=dfieldValueList]")[0];
									
									var criteria=windowObj.down("#criteriaCombo");
									var criteriaColumnn=windowObj.down("#crtColCombo");
									
									
									
									var aggfield = windowObj.query("[comboType=aggList]")[0];	
									var isGroupBy=windowObj.query("[checkId=groupby]")[0];
									store.filter("dfieldName",field.getValue())					
									store.filter("aggregate",aggfield.getValue())
									var findVal=field.store.findExact("name",field.getValue());
									
									
									
																							// returns
																								// 0 if
																								// matched
									var dName=field.store.getAt(findVal).data.displayName; // get
																							// corresponding
																							// displayName
																							// of
																							// value
									//if(store.data.items.length==0 || (store.data.items.length>0 && store.data.items[0].data.dfieldName == windowObj.editdFieldName && store.data.items[0].data.aggregate == windowObj.editAggField))
									{
										var data = {
												dfieldName : field.getValue(),
												dValueField: value.getValue(),
												aggregate : aggfield.getValue(),
												label:label.getValue(),
												displayName:dName,
												isGroupBy:isGroupBy.getValue(),
												type:'Data',
												criteria:criteria.getValue(),
												criteriaColumn:criteriaColumnn.getValue()
										};
										store.clearFilter();
										if (windowObj.isEdit != undefined&& windowObj.isEdit == true)
										{
											var rec = store.getAt(windowObj.rowIndex);
											rec.set(data);
										}else {
											store.add(data);
										}
										this.up().up().close();// window close
									}/*else{
										store.clearFilter();
										Ext.Msg.alert('Error',"Mapping Already Exists");
									}	*/																	
								}// handler ends
							},
							{
								text : 'Cancel',
								icon:'images/delete_icon.png',
								handler : function(){
									this.up().up().close();// window close
								}
							}]// buttons ends
				});	// window ends
	}, // getSettingWindow ends
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
	getValueFieldsCombo : function(rptBuilderActiveTab)
	{
		return new Ext.form.ComboBox({
			xtype : 'combobox',
			fieldLabel : 'Value Field',
			valueField : 'name',
			margin : '10 0 0 0',
			displayField : 'displayName',
			comboType : "dfieldValueList",
			disabled:true,
			columnWidth : 0.4,
			emptyText : 'Select Field...',
			store:this.valueFieldStore,
			queryMode : 'local',
		});
	},
	getFieldStore : function(rptBuilderActiveTab) // Store structure same as
													// GridConfig store
													// structure
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
	},
	getAggregateCombo : function(rptBuilderActiveTab)
	{
		return new Ext.form.ComboBox({
			xtype : 'combobox',
			fieldLabel : 'Aggregate',
			valueField : 'aggregate_value',
			margin : '10 0 0 0',
			displayField : 'aggregate_name',
			comboType : "aggList",
			columnWidth : 0.4,
			emptyText : 'Select Aggregate...',
			store:this.aggregateStore,
			queryMode : 'local',
		});
	},
	getAggregateComboStore:function()
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : 'aggregate_value',
				type : 'string'
			}, {
				name : 'aggregate_name',
				type : 'string'
			} ],
			data:[
			      {aggregate_value:"Sum",aggregate_name:"Sum"},
			      {aggregate_value:"Min",aggregate_name:"Min"},
			      {aggregate_value:"Max",aggregate_name:"Max"},
			      {aggregate_value:"Avg",aggregate_name:"Avg"},
			      {aggregate_value:"Count",aggregate_name:"Count"}
			]
		});
	},
	getCriteriaComboStore:function()
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : 'criteria_value',
				type : 'string'
			}, {
				name : 'criteria_name',
				type : 'string'
			} ],
			data:[
			      {criteria_value:"Min",criteria_name:"Min"},
			      {criteria_value:"Max",criteria_name:"Max"}
			]
		});
	},
	editItemdblclick:function( th, record, item, index, e, eOpts )
	{
		var rptBuilderActiveTab=th.up().up().up().up().up().getActiveTab();
		record = record.data;
		if(record.type=="Data")
		{
			var dataEndPointGrid=rptBuilderActiveTab.query("[panelId=dataEndPointGrid]")[0];
			this.initWidgets(rptBuilderActiveTab,  dataEndPointGrid);
			this.loadFieldsStore(rptBuilderActiveTab, dataEndPointGrid /* record.dfieldName */);
			this.loadSavedData(record);
			this.settingsWindow["isEdit"] = true;
			this.settingsWindow["rowIndex"] = index;
			this.settingsWindow.editdFieldName= record.dfieldName;
			this.settingsWindow.editdValueName= record.dValueField;
			this.settingsWindow.editAggField=record.aggregate;
			this.settingsWindow.editIsGroupBy=record.isGroupBy;
			this.settingsWindow.editCriteria=record.criteria;
			this.settingsWindow.editCriteriaColumn=record.criteriaColumn;
			
			this.settingsWindow.down()
			
			this.settingsWindow.show();
		}
		else{
			var chartConfTab=rptBuilderActiveTab.down("#chart-main-view");
			this.rptBuilderTab.setActiveTab(chartConfTab);
			chartConfTab.down('#left-panel').controller.chartMode="edit";
			chartConfTab.down('#left-panel').controller.chartRowIndex=index;
			var chartType=chartConfTab.down('#left-panel').down("#chartRadioField");
			chartType.query("[inputValue= '1']")[0].setValue(true);
			chartConfTab.down('#left-panel').controller.onEditChart(record);
		}	
	},
	loadSavedData : function(record) 
	{
		this.settingsWindow.query("[comboType=dfieldList]")[0].setValue(record.dfieldName);
		this.settingsWindow.query("[comboType=dfieldValueList]")[0].setValue(record.dValueField);
		this.settingsWindow.query("[comboType=aggList]")[0].setValue(record.aggregate);
		this.settingsWindow.query("[txtType=labelName]")[0].setValue(record.label);
		this.settingsWindow.query("[checkId=groupby]")[0].setValue(record.isGroupBy);
		this.settingsWindow.down("#crtColCombo").setValue(record.criteriaColumn);
		this.settingsWindow.down("#criteriaCombo").setValue(record.criteria);
	},
	loadFieldsStore : function(rptBuilderActiveTab, dataEndPointGrid, editField)
	{
		var gridConfigObj = rptBuilderActiveTab.query("[panelId=gridConfig]")[0];
		this.fieldStore.loadData(this.formatFieldData(gridConfigObj.getStore(), dataEndPointGrid.getStore(), editField));
		this.valueFieldStore.loadData(this.formatFieldData(gridConfigObj.getStore(), dataEndPointGrid.getStore(), editField));
		
		/*
		 * Added By Maya 
		 * to Load Criteria Combos
		 */
		var criteriaCombo=this.settingsWindow.down("#crtColCombo");
		if(criteriaCombo!= undefined)	
		{
			criteriaCombo.store=this.getComboStore();
			//numericCombo.getStore().loadData(this.formatNumericData(this.chartMainView.gridConfigStore,numericCombo.getStore()),true);
			criteriaCombo.getStore().loadData(this.formatFieldData(gridConfigObj.getStore(), dataEndPointGrid.getStore(), editField));
		}
		var criteriaCombo=this.settingsWindow.down("#criteriaCombo");
		if(criteriaCombo!=undefined)
		{
			criteriaCombo.store=this.getCriteriaComboStore();
		}
	},
	formatFieldData : function(store, existFields, editField) 
	{
		var data = [];
		Ext.Array.each(store.data.items,function(item) 
				{
					data.push(item.data);
					/*if(item.data.dataType.toUpperCase()=="INT" || item.data.dataType.toUpperCase()=="FLOAT"
						|| item.data.dataType.toUpperCase()=="DECIMAL" || item.data.dataType.toUpperCase()=="DOUBLE"
							||item.data.dataType.toUpperCase()=="VARCHAR")
					{
						
						 * if(this.existFields.findExact("dfieldName",item.data.name) ==
						 * -1 || (editField != undefined && editField ==
						 * item.data.name)) {
						 
							data.push(item.data);
						// }
					}*/
				},{
					 data : data,
					 existFields : existFields,
					 editField : editField
		});
		return data;
	},
	onDeleteRowClick : function(grid, rowIndex)
	{
		grid.getStore().removeAt(rowIndex);
	},
	getComboStore : function() //Store structure same as GridConfig store structure
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : "name",
				type : "string"
			}, {
				name : "displayName",
				type : "string"
			}],
			data : []
		});
		;
	},
});