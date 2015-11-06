Ext
		.define(
				'Healthsurvey.view.mobileview.reportui.datachart.datagrid.DataGridController',
				{
					extend : 'Ext.app.ViewController',
					alias : 'controller.datagridController',
					requires : [],
					queryCriteria : null,
					reportView : null,
					reportViewController : null,
					datagrid : null,
					reportJSON : null,
					init : function() {
						debugger;
					},
					initObjects : function() {
						// this.reportView = this.getView().up().up().up();
						this.reportViewController = this.reportView.controller;
						this.queryCriteria = this.reportView
								.down("#querycriteria");
						this.datagrid = this.getView(),
								this.reportJSON = this.reportView.reportJSON;

					},

					dataGridCellClick : function(grid, td, cellIndex, record,
							tr, rowIndex, e, eOpts) {
						debugger;
						var columns = grid.getGridColumns();
						var column = /* grid.up(). */columns[cellIndex];
						if (column.href != undefined && column.href == true) {
							// redirect to default report
							if (column.targetRList != undefined
									&& column.targetRList.length > 0) {
								var queryCriteria = {};
								var val;
								var displayval;
								var qc = [];
								val = record.data[column.qFieldName != undefined ? column.qFieldName
										: column.dataIndex];
								displayval = record.data[column.dataIndex];
								if (this.reportView.rptHrefQC != undefined) {

									var t = this.reportView.rptHrefQC;
									for (var x = 0; x < t.length; x++) {
										qc.push(t[x]);
									}

								}
								// datatype : item.datatype,

								queryCriteria["name"] = column.qFieldName != undefined
										&& column.qFieldName.length > 0 ? column.qFieldName
										: column.dataIndex;
								queryCriteria["value"] = val;
								queryCriteria["datatype"] = column.datatype;
								queryCriteria["displayValue"] = displayval;
								queryCriteria["label"] = column.text;
								qc.push(queryCriteria);
								if (this.reportJSON.qcContext != undefined
										&& this.reportJSON.qcContext == 1) {
									//this.getQueryCriteria(qc);
									this.reportViewController.getQueryCriteria(qc);
								}
								this.openDrillDown(
										column.targetRList[0].report_id,
										column.targetRList[0].report_name, qc,
										this.datagrid,column.targetRList[0]);
							}
						}
					},

					dataGridRightClick : function(gridView, record, item,
							index, e, eOpts) {
						e.stopEvent();
						var xPos = e.getXY()[0];
						var columns = gridView.getGridColumns();
						for ( var c in columns) {
							var leftEdge = columns[c].getPosition()[0];
							var rightEdge = columns[c].getSize().width
									+ leftEdge;
							if (xPos >= leftEdge && xPos <= rightEdge) {
								console.log(columns[c].dataIndex);
								var column = columns[c];
								var queryCriteria = {};
								var val;
								var displayval;
								var qc = [];
								val = record.data[column.qFieldName != undefined ? column.qFieldName
										: column.dataIndex];
								displayval = record.data[column.dataIndex];
								if (this.reportView.rptHrefQC != undefined) {

									var t = this.reportView.rptHrefQC;
									for (var x = 0; x < t.length; x++) {
										qc.push(t[x]);
									}

								}
								// datatype : item.datatype,

								queryCriteria["name"] = column.qFieldName != undefined
										&& column.qFieldName.length > 0 ? column.qFieldName
										: column.dataIndex;
								queryCriteria["value"] = val;
								queryCriteria["datatype"] = column.datatype;
								queryCriteria["displayValue"] = displayval;
								queryCriteria["label"] = column.text;
								qc.push(queryCriteria);
								if (this.reportJSON.qcContext != undefined
										&& this.reportJSON.qcContext == 1) {
									//this.getQueryCriteria(qc);
									this.reportViewController.getQueryCriteria(qc);
								}

								this.showTargetReportMenu(columns, column,
										record, qc, e, gridView.up(),
										this.queryCriteria);

							}
						}
					},
					showTargetReportMenu : function(columns, column, record,
							queryCriteria, e, gridObj, qcPanel) {
						var targetReportList = column.targetRList;
						var menuItems = [];
						for (var x = 0; x < targetReportList.length; x++) {
							menuItems.push(Ext.create('Ext.Action', {
								text :targetReportList[x].type!=undefined && targetReportList[x].type == 'f' ?'Launch '+targetReportList[x].report_name:  targetReportList[x].report_name,
								reportId : targetReportList[x].report_id,
								targetObj:targetReportList[x],
								icon : "images/redirect.png",
								handler : function() {
									var menuObj = this.up();
									menuObj.scope.openDrillDown(this.reportId,
											this.text, menuObj.queryCriteria,
											menuObj.gridObj,this.targetObj);
								}
							}));
						}
						menuItems.push("-");
						menuItems.push(Ext.create('Ext.Action', {
							text : "Advance",
							icon : "images/advance.png",
							handler : function() {
								var menuObj = this.up();
								menuObj.scope.getAdvanceTargetRptWind(menuObj)
							}
						}));
						return Ext.create('Ext.menu.Menu', {
							scope : this,
							queryCriteria : queryCriteria,
							record : record.data,
							column : column,
							columns : columns,
							gridObj : gridObj,
							items : menuItems,
							qcPanel : qcPanel
						}).showAt(e.getXY());
					},

					getAdvanceTargetRptWind : function(menuObj) {
						return Ext
								.create(
										'Ext.window.Window',
										{
											title : 'Advance Option',
											height : 400,
											width : 650,
											menuObj : menuObj,
											modal : true,
											resizable : false,
											closeAction : 'close',
											autoScroll : true,
											border : 0,
											layout : 'fit',
											bodyStyle : {
												"background-color" : "transparent"
											},
											plain : true,
											// layout : 'vbox',
											items : [ {
												xtype : "panel",
												// height : 400,
												autoScroll : true,
												layout : {
													type : 'vbox'
												},
												items : [
														{
															xtype : "fieldset",
															width : "100%",
															flex : 0.8,
															margin : '5 5 5 5',
															title : "Column List",
															autoScroll : true,
															items : [ this
																	.getColumnsListTRpt(
																			menuObj.columns,
																			menuObj.record,
																			menuObj.column)

															]
														},

														this
																.getTargetReportList(menuObj.column)

												]
											} ],
											buttonAlign : 'right',
											buttonMargins : '10 10 0 10',
											buttons : [
													{
														text : 'Execute',
														icon : 'images/application_add.png',
														tooltip : 'Execute',
														handler : function() {
															var windowObj = this
																	.up().up();
															var selColumns = windowObj
																	.query("[name=chkcolumn]");
															var tReport = windowObj
																	.query("[comboType=targetReportSe]")[0];
															if (tReport
																	.getValue() == null) {
																Ext.MessageBox
																		.alert(
																				'Report Builder',
																				"Select Target Report");
																return;
															}
															var queryC = [];

															for (var x = 0; x < selColumns.length; x++) {
																if (selColumns[x].checked == true) {
																	var qcValue = {};
																	qcValue["name"] = selColumns[x].dataIndex;
																	qcValue["value"] = selColumns[x].inputValue;
																	qcValue["displayValue"] = selColumns[x].inputValue;
																	qcValue["label"] = selColumns[x].boxLabel;
																	queryC
																			.push(qcValue);
																}
															}
															if (windowObj.menuObj.gridObj.qcContext != undefined
																	&& windowObj.menuObj.gridObj.qcContext == 1) {
																windowObj.menuObj.scope
																		.getQueryCriteriaCols(
																				queryC,
																				windowObj.menuObj.qcPanel);
															}
															var selRpt = tReport
															.getStore()
															.getAt(
																	tReport		
																			.getStore()
																			.findExact(
																					"report_id",
																					tReport
																							.getValue())).data;
															var reportName = selRpt.report_name;

															windowObj.menuObj.scope
																	.openDrillDown(
																			tReport
																					.getValue(),
																			reportName,
																			queryC,
																			windowObj.menuObj.gridObj,selRpt);
															this.up('.window')
																	.close();

														}
													},
													{
														text : 'Cancel',
														icon : 'images/remove.gif',
														handler : function() {
															this.up('.window')
																	.close();
														}

													} ],
											listeners : {

											}
										}).show();

					},
					getColumnsListTRpt : function(columns, record, column) {
						var colsList = [];
						var width = 0;
						columns
								.forEach(
										function(item) {
											if (width < item.text.length) {
												width = item.text.length;
											}
											var dataindex = item.qFieldName != undefined
													&& item.qFieldName.length > 0 ? item.qFieldName
													: item.dataIndex;
											var val = record[item.qFieldName != undefined ? item.qFieldName
													: item.dataIndex];
											var c = {
												boxLabel : item.text,
												name : 'chkcolumn',
												inputValue : val,
												dataIndex : dataindex
											};
											if (column.dataIndex == item.dataIndex) {
												c["checked"] = true;
											}
											this.colsList.push(c)

										}, {
											colsList : colsList,
											record : record,
											column : column
										});
						return {
							xtype : 'checkboxgroup',
							width : 600,
							columns : 3,
							vertical : true,
							items : colsList
						}

					},
					getTargetReportList : function(column) {
						return new Ext.form.ComboBox({
							xtype : 'combobox',
							comboType : 'targetReportSe',
							margin : '10 5 15 5',
							// flex:0.2,
							labelAlign : 'right',
							width : 300,
							labelWidth : 120,
							fieldLabel : 'Select Target Report',
							valueField : 'report_id',
							displayField : 'report_name',
							typeAhead : true,
							emptyText : 'Select Report...',
							editable : true,
							anyMatch : true,
							store : {
								autoLoad : true,
								fields : [ 'report_id', 'report_name' ],
								data : column.targetRList
							}
						});
					},
					/*
					 * used to open sub report 
					 * reportId report id or form id of sub report
					 * reportName report Name or form Name of sub report
					 * rptHrefQC parameter need to be pass
					 * gridObj grid object
					 * type r - Report f- form
					 */
					openDrillDown : function(reportId, reportName, rptHrefQC,
							gridObj,targetObj) {
						var url = this.reportURL + reportId;

						if (this.reportView.isPreview != undefined
								&& this.reportView.isPreview == true) {
							// gridObj.up().up().up().up().add(menuTab);
							this.openPreviewTabDrillDown(reportId,
									this.reportView, rptHrefQC);
						} else {
							var component ;
							if(targetObj.type == "f"){
								//targetObj.menuAction = targetObj.menuAction.replace("Main", "");
								component= Ext.create(
										targetObj.menuAction, {
											closable : true,
											drilled : true,		
											title : reportName,
											refId : targetObj.reffId,
											rptHrefQC : rptHrefQC,
											primaryKey : rptHrefQC[0].value,
											caller : this,
											disableDB:true

										});
							}else{
								component= Ext.create(
										'Healthsurvey.view.mobileview.reportui.ReportView', {
											closable : true,
											drilled : true,		
											title : reportName,
											refId : reportId,
											rptHrefQC : rptHrefQC
										});
							}
							var tabs = Ext.getCmp('appMainTabPanel');
							;
							var tab = tabs.add({
								xtype : component,
								title : reportName
							});
							tabs.setActiveTab(tab);


						}
					},
					/*
					 * used to open form tab in case of drill down
					 */
					openFormTab:function(reportId,rptHrefQc,targetObj){
						
						component= Ext.create(
								'Healthsurvey.view.mobileview.reportui.ReportView', {
									closable : true,
									drilled : true,		
									title : reportName,
									refId : reportId,
									rptHrefQC : rptHrefQC
								});
					},
					openPreviewTabDrillDown : function(reportId, previewTabObj,
							rptHrefQC) {
						Ext.Ajax
								.request({
									url : 'secure/buzzorapp/reportViewController/getReportDetailsById',
									method : 'POST',
									tab : previewTabObj,
									scope : this,
									rptHrefQC : rptHrefQC,
									jsonData : {
										id : reportId
									},
									params : {},
									success : function(response, currentObject,
											options) {
										var responseJson = Ext.JSON
												.decode(response.responseText);
										var data = Ext.JSON
												.decode(responseJson.response.data);
										var param = {
											id :data[0].report_id
										};

										var queryinf = currentObject.scope.reportViewController
												.syncAjaxPOSTCall(
														'secure/buzzorapp/reportBuilderController/getReportDetailsById',
														param);
										var querydata= Ext.JSON.decode(queryinf.response.data);
										var rptView = Ext
												.create(
														'Healthsurvey.view.mobileview.reportui.ReportView',
														{
															height : currentObject.tab
																	.getHeight(),
															title : data[0].data_json.report_name,
															isPreview : true,
															drilled : true,
															reportJSON : data[0].data_json,
															rptHrefQC : currentObject.rptHrefQC,
															items : []
														});
										rptView.reportJSON["chart_json"] = data[0].chart_json;
										rptView.reportJSON["queryJson"]=JSON.stringify(querydata[0].query_info.queryJson);
										rptView.reportJSON["jpqlQuery"]=querydata[0].query_info.jpqlQuery;
										
										currentObject.tab.up().add(rptView);
										currentObject.tab.up().setActiveTab(
												rptView);
									},
									failure : function() {
										Ext.Msg.alert('Error',
												'Cannot connect to server');
									}
								});
					}
				});