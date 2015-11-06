Ext.define('Healthsurvey.view.reportbuilder.reportBuilder.ReportBuilderController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.reportBuilderController',
	reportMainView : null,
	queryCriteriaGrid : null,
	gridConfigGrid : null,
	dataEPGrid : null,
	drillDownGrid : null,
	chartPropGrid : null,
	chartsList : null,
	mapsList : null,

	afterRender : function(view) {
		debugger;
		this.reportMainView = this.getView().up().up();
		this.rptBuilderTab = this.getView();
		this.queryCriteriaGrid = this.rptBuilderTab
		.down("#queryCriteriaGrid");
		this.gridConfigGrid = this.rptBuilderTab
		.down("#gridConfig");
		this.dataEPGrid = this.rptBuilderTab
		.down("#dataEndPointGrid");
		this.drillDownGrid = this.rptBuilderTab
		.down("#drillDownGrid");
		this.chartPropGrid = this.rptBuilderTab
		.down("#chartPropGridView");

		this.actionbutton = this.rptBuilderTab
		.down("#actionbutton");

		// Loading Chart Tree at once
		var me = this;
		Ext.Ajax
		.request(
				{
					url : "secure/chartBuilderController/chartmenu",
					method : 'POST',
					scope : me,
					jsonData : {},
					success : function(response,
							currentObject, options) {
						debugger;
						var responseJson = Ext.JSON
						.decode(response.responseText);
						if (responseJson.response.success == 'true') {
							var data = Ext.JSON
							.decode(responseJson.response.data);
							currentObject.scope.chartsList = data;
						} else {
							Ext.Msg
							.alert('Error',
							"Chart Rendering Failed");
						}
					},
					failure : function() {
						Ext.Msg
						.alert('Error',
						'Cannot connect to server');
					}
				}, this);

		// Loading Map Tree at once
		Ext.Ajax
		.request(
				{
					url : "secure/chartBuilderController/mapmenu",
					method : 'POST',
					scope : me,
					jsonData : {},
					success : function(response,
							currentObject, options) {
						debugger;
						var responseJson = Ext.JSON
						.decode(response.responseText);
						if (responseJson.response.success == 'true') {
							var data = Ext.JSON
							.decode(responseJson.response.data);
							currentObject.scope.mapsList = data;
						} else {
							Ext.Msg
							.alert('Error',
							"Maps Rendering Failed");
						}
					},
					failure : function() {
						Ext.Msg
						.alert('Error',
						'Cannot connect to server');
					}
				}, this);

	},

	loadGridConfigTab : function(tab, eOpts) {
		debugger;
		var sqlTreePanel = tab.down('#sql-tree-panel');
		sqlTreePanel.store.load();
	},

	loadChartConfigTab : function(tab, eOpts) {
		debugger;
		/*
		 * var
		 * chart=this.reportMainView.down("#chart-main-view");
		 * chart["gridConfigStore"]=this.gridConfigGrid.getStore();
		 */
		tab["gridConfigStore"] = this.gridConfigGrid.getStore();
	},

	loadPreviewTab : function(tab, eOpts) {
		debugger;
		var queryCriteriaGrid = this.queryCriteriaGrid;
		var gridConfig = this.gridConfigGrid;
		var drillDownGrid = this.drillDownGrid;
		var qcContext = drillDownGrid
		.query("[checkId=qcContext]")[0];
		var summaryGrid = gridConfig
		.query("[checkId=summaryGrid]")[0];
		var checkboxgrid = gridConfig
		.query("[checkId=checkboxgrid]")[0];
		var qcPosition = this.queryCriteriaGrid.down('#qcDisplayPosition').getChecked()[0].inputValue;
		var dataEPGrid = this.dataEPGrid;
		var dataEP = this.formatStoreData1(dataEPGrid
				.getStore());
		var chartPropGrid = this.chartPropGrid;
		var chartJson = this.formatChartJsonData(chartPropGrid
				.getStore());
		var chartColumns = chartPropGrid.down("#chartColumns");
		var sorters = [];// : { property: 'name', direction :
		// 'ASC' }
		var summaryGroups = [];
		var gridmodel = [];

		var gridColumns = this.prepareGridColumns(gridConfig
				.getStore(), sorters, drillDownGrid.getStore(),
				gridConfig, summaryGroups, gridmodel);

		var ui_JSON = {
				report_id : tab.up().reportID == undefined ? 0
						: tab.up().reportID,
						report_name : tab.up().title,
						queryId : this.getView().queryId,
						queryJson : this.getView().queryJson,
						jpqlQuery : this.getView().jpqlQuery,
						sorters : sorters,
						gridColumns : gridColumns,
						queryCWidgetU : this
						.prepareCriteria(queryCriteriaGrid),
						qcContext : qcContext.checked == true ? 1 : 0,
								dataEndPoint : JSON.stringify(dataEP),
								chart_json : JSON.stringify(chartJson),
								displayType : this.getView().displayType,
								isSummaryGrid : summaryGrid.checked == true ? 1 : 0,
										summaryGroups : summaryGroups,
										gridmodel : gridmodel,
										defaultCColumn:chartColumns.getValue(),
										qcPosition:qcPosition,
										checkboxgrid:checkboxgrid.checked == true ? 1 : 0,
												actionbutton:this.prepareActionButton(this.actionbutton.getStore())
		};
		// Creating reportui.ReportMainPreview & storing json in
		// reportJson variable
		var rptView = Ext.create(
				'Healthsurvey.view.reportui.ReportView', {
					height : tab.up().getHeight() - 80,
					title : tab.up().title,
					isPreview : true,
					reportJSON : ui_JSON,
					items : []
				});
		tab.removeAll();
		var tabPanel = {
				xtype : 'tabpanel',
				items : [ rptView ]
		}
		tab.add(tabPanel);
	},// loadPreviewTab ends
	setCheckGridcolumn:function(gridConfig,columns){
		var checkboxgrid = gridConfig
		.query("[checkId=checkboxgrid]")[0];
		if(checkboxgrid.checked == true){
			columns.push({
				xtype : 'checkcolumn',
				dataIndex : 'checkcol',
				text : 'Check',
				sortable : false,
				hideable : false,
				resizable : true,
				columnLines : false,
				menuDisabled : true,
				align: 'left',
				width:70,
			});
		}
	},
	prepareGridColumns : function(store, sorters,
			drilldownStore, gridConfig, summaryGroups,
			gridmodel) {
		var columns = [];
		this.setCheckGridcolumn(gridConfig,columns);
		// Check whether Header Group is added or not
		if (gridConfig.headerGroup != undefined
				&& gridConfig.headerGroup.length > 0) {
			columns = Ext.decode(gridConfig.headerGroup);
			this.getColumnsWithHeader(columns, store, sorters,
					drilldownStore, summaryGroups, gridmodel);
		} else {

			Ext.Array
			.each(
					store.data.items,
					function(item, idx, items) {
						if (item.data.fieldVisible == true) {
							if (item.data.summaryGroup) {
								this.summaryGroups
								.push(item.data.name);
							}
							this.gridmodel
							.push({
								name : item.data.name,
								type : this.scope
								.getExtDataType(item.data.dataType)
							})
							var col = this.scope
							.getColumnData(
									this.drilldownStore,
									item);
							this.columns.push(col);
						}
						if (item.data.isSortable == 'DESC'
							|| item.data.isSortable == 'ASC') {
							this.sorters
							.push({
								property : item.data.displayName,
								direction : item.data.isSortable
							})
						}
					},
					{
						scope : this,
						columns : columns,
						sorters : sorters,
						drilldownStore : drilldownStore,
						summaryGroups : summaryGroups,
						gridmodel : gridmodel
					});
		}
		return columns;
	},// prepareGridColumns ends

	getColumnsWithHeader : function(headerData, store, sorters,
			drilldownStore, summaryGroups, gridmodel) {
		var groupCols = [];
		Ext.Array
		.each(
				headerData,
				function(item, idx, items) {
					if ((item.fieldCol != undefined && item.fieldCol == true)
							|| item.fieldCol == undefined) {
						this.store.filter("name",
								item.name);
						var val = this.store.data.items[0];
						if (val.data.fieldVisible == true) {
							if (val.data.summaryGroup) {
								this.summaryGroups
								.push(val.data.name);
							}
							this.gridmodel
							.push({
								name : val.data.name,
								type : this.scope
								.getExtDataType(val.data.dataType)
							})
							var col = this.scope
							.getColumnData(
									this.drilldownStore,
									val/* ,item */);
							items[idx] = col;
						}
						if (val.data.isSortable == 'DESC'
							|| val.data.isSortable == 'ASC') {
							this.sorters
							.push({
								property : val.data.fieldName
								.toUpperCase(),
								direction : val.data.isSortable
							})
						}
						this.store.clearFilter();
					} else if (item.columns != undefined
							&& item.columns.length > 0) {
						this.scope
						.getColumnsWithHeader(
								item.columns,
								this.store,
								this.sorters,
								this.drilldownStore,
								this.summaryGroups,
								this.gridmodel);
					}
				}, {
					scope : this,
					store : store,
					sorters : sorters,
					drilldownStore : drilldownStore,
					summaryGroups : summaryGroups,
					gridmodel : gridmodel
				});
	},// getColumnsWithHeader ends

	getColumnData : function(drilldownStore, val) {
		var drillRec = drilldownStore.findExact("dfieldName",
				val.data.name);
		var col = {
				header : val.data.displayName.length > 0 ? val.data.displayName
						: val.data.name,
						dataIndex : val.data.name.length > 0 ? val.data.name
								: "",
								datatype : val.data.dataType,
								width : val.data.fieldWidth != 0 ? val.data.fieldWidth
										: 100,
										sortable : true,
										align : val.data.alignment == "Right Align" ? "right"
												: "left",
												field : {
													xtype : val.data.dataType
												}
		};
		if (val.data.summaryAgg.length > 0) {
			col.summaryType = val.data.summaryAgg.toLowerCase();
		}
		if (val.data.lock == true) {
			col.locked = true;
		}
		if (val.data.summaryCaption.length > 0) {
			col.summaryCaption = val.data.summaryCaption;
		}

		if (drillRec != -1) {
			var drill = drilldownStore.getAt(drillRec).data;
			col["href"] = true;
			col["targetRList"] = drill.targetReportsList;
			col["qFieldName"] = drill.qfieldName != null ? drill.qfieldName
					: "";
		}
		return col;
	},// getColumnData ends
	prepareCriteria : function(gridObj) {
		debugger;
		var criteria = [];
		var store = gridObj.getStore();
		Ext.Array
		.each(
				store.data.items,
				function(item, idx, items) {
					var widget={};
					if (item.data.widget == 'textfield'
						|| item.data.widget == 'combobox'
							|| item.data.widget == 'datefield'
								|| item.data.widget == 'timefield'
									|| item.data.widget == 'numberfield'){
						widget = {
								xtype : item.data.widget,
								fieldLabel : item.data.displayName,
								labelAlign : "left",
								margin : '5 5 0 5',
								widgetId : item.data.id,
								serviceId : item.data.service,
								serviceOpId : item.data.serviceOp,
								defaultValue : item.data.defaultValue,
								name : item.data.name,
								datatype : item.data.datatype,
								parentWidget : item.data.dependantW,
								serviceUrl : item.data.serviceUrl == "" ? ""
										: item.data.serviceUrl
										.concat(item.data.serviceOpUrl)
						};
						if (item.data.widget == 'combobox') {
							widget["displayField"] = "primaryDisplay";
							widget["valueField"] = "primaryKey";
							widget["queryMode"] = "local";
							widget["typeAhead"]=true;

						}
					}else if(item.data.widget == 'daterangefrom') {
						try{
							this.gridObj.getStore().filter("dependantW",item.data.id);
						}catch(ex){

						}
						var todata=this.gridObj.getStore();
						if(todata.data.length>0){
							widget = {xtype : "daterange",
									fromname:item.data.name,
									fromdatatype : item.data.datatype,
									toname:todata.data.items[0].data.name,
									todatatype : todata.data.items[0].data.datatype,
									fromfieldLabel : item.data.displayName,
									tofieldLabel : todata.data.items[0].data.displayName,
									labelAlign : "left",
									rowspan:3,
									margin : '5 5 0 5',
									widgetId : item.data.id,
									serviceId : item.data.service,
									serviceOpId : item.data.serviceOp,
									defaultValue : item.data.defaultValue,
									parentWidget : item.data.dependantW,
									serviceUrl : item.data.serviceUrl == "" ? ""
											: item.data.serviceUrl
											.concat(item.data.serviceOpUrl)
							};
						}
						this.gridObj.getStore().clearFilter();
					}
					if(widget.hasOwnProperty("xtype")){
						this.criteria.push(widget);
					}
				}, {
					criteria : criteria,
					gridObj : gridObj,
					scope : this
				});
		return criteria;
	},// prepareCriteria ends

	onSaveReportClick : function() {
		debugger;
		var view = this.getView();
		// INSERT Part
		var reportName = view.title;

		var gridConfObj = this.gridConfigGrid// view.down('#gridConfig');
		var gridConf = this.formatStoreData1(gridConfObj
				.getStore());
		if (gridConf == "") {
			Ext.Msg.alert({
				title : 'Info',
				msg : "Select Sql to Configure Grid",
				icon : Ext.MessageBox.INFO
			});
			return;
		}

		var queryCriteriaGrid = this.queryCriteriaGrid// view.down('#queryCriteriaGrid');
		var queryCriteria = this
		.formatStoreData(queryCriteriaGrid.getStore());

		var drillDownGrid = this.drillDownGrid // view.down('#drillDownGrid');
		var qcContext = drillDownGrid
		.query("[checkId=qcContext]")[0];
		var drillDownGridDef = this
		.formatStoreData1(drillDownGrid.getStore());

		var dataEPGrid = this.dataEPGrid// view.down('#dataEndPointGrid');
		var dataEP = this.formatStoreData1(dataEPGrid
				.getStore());

		var chartPropGrid = this.chartPropGrid// view.down('#chartPropGridView');
		var chartPGridData = this
		.formatStoreData1(chartPropGrid.getStore());
		var chartJson = this.formatChartJsonData(chartPropGrid
				.getStore());
		var chartColumns = chartPropGrid.down("#chartColumns");
		//action button
		var actionbutton=this
		.formatStoreData(this.actionbutton.getStore());


		var summaryGrid = gridConfObj
		.query("[checkId=summaryGrid]")[0];
		var checkboxgrid = gridConfObj
		.query("[checkId=checkboxgrid]")[0];
		var qcPosition = this.queryCriteriaGrid.down('#qcDisplayPosition').getChecked()[0].inputValue;
		/*
		 * Added By Viral to get Search Engine Configration
		 * 
		 */
		mainView = this.getView().up().up();
		searchView = view.query("search-config-view")[0];

		var summaryGroups = [];
		var gridmodel = [];
		var gridColumns = this.prepareGridColumns(gridConfObj
				.getStore(), sorters, drillDownGrid.getStore(),
				gridConfObj, summaryGroups, gridmodel);

		var sorters = [];
		var ui_JSON = {
				report_name : reportName,
				sqlId : view.queryId,
				sorters : sorters,
				gridColumns : gridColumns,
				queryCWidgetU : this
				.prepareCriteria(queryCriteriaGrid),
				qcContext : qcContext.checked == true ? 1 : 0,
						dataEndPoint : dataEP,
						displayType : view.displayType,
						summaryGroups : summaryGroups,
						isSummaryGrid : summaryGrid.checked == true ? 1 : 0,
								gridmodel : gridmodel,
								defaultCColumn:chartColumns.getValue(),
								qcPosition:qcPosition,
								checkboxgrid:checkboxgrid.checked == true ? 1 : 0,
										actionbutton:this.prepareActionButton(this.actionbutton.getStore())		
		};
		var report_synopsis = view.synopsis
		.replace(/\"/g, '\'').replace(/\>/g, '\\>')
		.replace(/\</g, '\\<');
		var report_help = view.help.replace(/\"/g, '\'')
		.replace(/\>/g, '\\>').replace(/\</g, '\\<');

		//INSERT New OR INSERT Copy RAD Reports
		if (view.reportID == undefined
				|| (view.reportID != undefined && view.editFlag == "0")) {

			// Check whether report name already exists or not
			var reportTree = view.up().up().down().down(
			"#report-builder-tree");
			r = reportTree.getStore();
			if (r.findExact("text", reportName) != -1) {
				Ext.Msg
				.alert({
					title : 'Info',
					msg : "Report Name Already Exists.Change Report Name to save report correctly.",
					icon : Ext.MessageBox.INFO
				});
				return;
			}

			var report_synopsis = view.synopsis.replace(/\"/g,
			'\'').replace(/\>/g, '\\>').replace(/\</g,
			'\\<');
			var report_help = view.help.replace(/\"/g, '\'')
			.replace(/\>/g, '\\>')
			.replace(/\</g, '\\<');

			Ext.Ajax
			.request({
				url : 'secure/reportBuilderController/saveReport',
				method : 'POST',
				view : view,
				jsonData : {
					report_name : reportName,
					query_id : view.queryId,
					query_info : JSON
					.stringify(
							{
								queryId : view.queryId,
								queryJson : Ext
								.decode(view.queryJson),
								jpqlQuery : view.jpqlQuery
							}).replace(/\\n/g,
							''),
							data_json : JSON.stringify(ui_JSON,
									null, "\t"),
									chart_json : JSON
									.stringify(chartJson),
									report_synopsis : report_synopsis,
									report_help : report_help,
									query_criteria_json : Ext
									.encode(queryCriteria),
									grid_conf_json : JSON
									.stringify({
										headerGroup : Ext
										.decode(gridConfObj.headerGroup),
										gridConfig : gridConf
									}),
									dataEndPoint_json : Ext
									.encode(dataEP),
									chart_properties : Ext
									.encode(chartPGridData),
									drilldown_json : JSON
									.stringify({
										drillDownGrid : drillDownGridDef,
										qcContext : qcContext.checked == true ? 1
												: 0
									}),
									other_properties_json : JSON
									.stringify({
										displayType : view.displayType,
										defaultCColumn:chartColumns.getValue(),
										isSummaryGrid : summaryGrid.checked == true ? 1 : 0,
												qcPosition:qcPosition	,
												checkboxgrid:checkboxgrid.checked == true ? 1 : 0,
														actionbutton:actionbutton
									}),
									edit_flag : "1",
									searchJson : Ext.encode(searchView
											.getValues())
				},
				params : {},
				success : function(response,
						currentObject) {
					debugger;
					var responseJson = Ext.JSON
					.decode(response.responseText);
					var data = Ext.JSON
					.decode(responseJson.response.data);

					var view = currentObject.view;
					view.reportID = data.report_id;
					view.editFlag = data.edit_flag;

					view.reportName = data.report_name;
					view.synopsis = data.report_synopsis;
					view.help = data.report_help;
					// radio
					view.up().getActiveTab()
					.setIconCls('editTabIcon');

					var reportTree = view
					.up()
					.up()
					.down()
					.down(
					"#report-builder-tree");
					reportTree.store.load();
					Ext.Msg.alert('Success',
					"Data Saved Successfully");
				},
				failure : function() {
					Ext.Msg
					.alert({
						title : 'Error',
						msg : 'Cannot connect to server',
						icon : Ext.MessageBox.ERROR
					});
				}
			});
		}
		// UPDATE Part
		else if (view.reportID != undefined
				&& view.editFlag == "1") {
			debugger;
			var report_id = view.reportID;

			var report_synopsis = view.synopsis.replace(/\"/g,
			'\'').replace(/\>/g, '\\>').replace(/\</g,
			'\\<');
			var report_help = view.help.replace(/\"/g, '\'')
			.replace(/\>/g, '\\>')
			.replace(/\</g, '\\<');

			Ext.Ajax
			.request({
				url : 'secure/reportBuilderController/editReport',
				method : 'POST',
				view : view,
				jsonData : {
					report_id : report_id,
					report_name : reportName,
					query_id : view.queryId,
					query_info : JSON
					.stringify(
							{
								queryId : view.queryId,
								queryJson : Ext
								.decode(view.queryJson),
								jpqlQuery : view.jpqlQuery
							}).replace(/\\n/g,
							''),
							data_json : JSON.stringify(ui_JSON,
									null, "\t"),
									chart_json : JSON
									.stringify(chartJson),
									report_synopsis : report_synopsis,
									report_help : report_help,
									query_criteria_json : Ext
									.encode(queryCriteria),
									grid_conf_json : JSON
									.stringify({
										headerGroup : Ext
										.decode(gridConfObj.headerGroup),
										gridConfig : gridConf
									}),
									dataEndPoint_json : Ext
									.encode(dataEP),
									chart_properties : Ext
									.encode(chartPGridData),
									drilldown_json : JSON
									.stringify({
										drillDownGrid : drillDownGridDef,
										qcContext : qcContext.checked == true ? 1
												: 0
									}),
									other_properties_json : JSON
									.stringify({
										displayType : view.displayType,
										defaultCColumn:chartColumns.getValue(),
										isSummaryGrid : summaryGrid.checked == true ? 1 : 0,
												qcPosition:qcPosition	,
												checkboxgrid:checkboxgrid.checked == true ? 1 : 0,
														actionbutton:actionbutton
									}),
									searchJson : Ext.encode(searchView
											.getValues())
				},
				params : {},
				success : function(response,
						currentObject) {
					debugger;
					var responseJson = Ext.JSON
					.decode(response.responseText);
					var data = Ext.JSON
					.decode(responseJson.response.data);

					/*
					 * var
					 * activeTab=currentObject.currentView.up().getActiveTab();
					 * activeTab.reportID=data.report_id;
					 * activeTab.reportName=data.report_name;
					 * activeTab.synopsis=data.report_synopsis;
					 * activeTab.help=data.report_help;
					 */

					var reportTree = currentObject.view
					.up()
					.up()
					.down()
					.down(
					"#report-builder-tree");
					reportTree.store.load();
					Ext.Msg
					.alert('Success',
					"Data Updated Successfully");
				},
				failure : function() {
					Ext.Msg
					.alert({
						title : 'Error',
						msg : 'Cannot connect to server',
						icon : Ext.MessageBox.ERROR
					});
				}
			});
		}
	},// onSaveReportClick ends

	formatStoreData : function(store) {
		// debugger;
		var data = [];
		Ext.Array.each(store.data.items, function(item) {
			data.push(item.data);
		}, {
			data : data
		});
		return data;
	},

	formatStoreData1 : function(store) {
		// debugger;
		var data = [];
		Ext.Array.each(store.data.items, function(item) {
			var keys = Ext.Object.getKeys(item.data);
			var d = {};
			for (var x = 0; x < keys.length; x++) {
				if (keys[x] != "id") {
					d[keys[x]] = item.data[keys[x]];
				}
			}
			data.push(d);
		}, {
			data : data
		});
		return data;
	},

	formatChartJsonData : function(store) {
		var data = [];
		Ext.Array.each(store.data.items, function(item) {
			debugger;
			data.push(item.data.chartJson);
		}, {
			data : data,
		});
		return data;
	},
	/*
	 * this is used to prepare UI Json of Action Button with service name
	 */
	prepareActionButton:function(store){
		var data = [];
		data.push('->');
		Ext.Array.each(store.data.items, function(item) {
			data.push({xtype:"button",text:item.data.name,service:item.data.servicename});
		}, {
			data : data
		});
		return data;
	},
	onDeleteReportClick : function() {
		var tabs = this.reportMainView.down("#reportsTabPanel");
		var report_id = tabs.getActiveTab().reportID;
		if (report_id != undefined) {
			Ext.Msg
			.confirm(
					'Confirm',
					'Are you sure you want to delete',
					function(btn, text) {
						if (btn == 'yes') {
							debugger;
							var mainView = this.scope;
							var tabs = mainView
							.down('#reportsTabPanel');
							var report_id = this.scope
							.down(
							'#reportsTabPanel')
							.getActiveTab().reportID;
							Ext.Ajax
							.request({
								url : 'secure/reportBuilderController/deleteReport',
								method : 'POST',
								tabs : tabs,
								mainView : mainView,
								activeTab : tabs
								.getActiveTab(),
								jsonData : {
									id : report_id
								},
								success : function(
										response,
										currentObject) {
									Ext.Msg
									.alert(
											'Message',
									"Report Deleted");
									var reportTree = currentObject.mainView
									.down('#report-builder-tree');
									reportTree.store
									.load();
									currentObject.activeTab
									.close();
								},
								failure : function() {
									Ext.Msg
									.alert(
											'Error',
									'Cannot connect to server');
								}
							});
						}
					}, {
						scope : this.reportMainView
					});
		} else {
			Ext.Msg.alert('Error',
			'Cannot Delete Unsaved Report');
		}
	},// onDeleteReportClick ends

	onEditReportInfoClick : function() {
		debugger;
		var window = this.reportMainView.controller.window;
		var activeTab = this.getView().up().getActiveTab(); // tabPanel.getActiveTab()

		window.isEdit = true; // setting value of isEdit
		// variable of window object
		// true
		window.setTitle("Edit Report Information");
		window.query("#new-report-name")[0]
		.setValue(activeTab.reportName);
		window.query("#txtSynopsis")[0]
		.setValue(activeTab.synopsis);
		window.query("#txtHelp")[0].setValue(activeTab.help);
		displayTypeRadio = window.query("#displayRadioField")[0];
		if (activeTab.displayType == 0) {
			displayTypeRadio.query("[boxLabel=Tab]")[0]
			.setValue(true);
		} else {
			displayTypeRadio.query("[boxLabel=Panel]")[0]
			.setValue(true);
		}
		window.show();
	},
	getExtDataType : function(datatype) {
		if (datatype.toLowerCase() == 'varchar') {
			return "string";
		} else if (datatype.toLowerCase() == 'int') {
			return "int";
		} else if (datatype.toLowerCase() == 'date'
			|| datatype.toLowerCase() == 'datetime'
				|| datatype.toLowerCase() == 'timestamp') {
			return "date";
		} else if (datatype.toLowerCase() == 'float'
			|| datatype.toLowerCase() == 'long'
				|| datatype.toLowerCase() == 'double') {
			return "float";
		}
	}

});