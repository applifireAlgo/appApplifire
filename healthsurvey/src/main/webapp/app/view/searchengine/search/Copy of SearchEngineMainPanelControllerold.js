/**
 * 
 */
Ext.Loader.setConfig({
	enabled : true,
	disableCaching : false,
	paths : {
		Ext : 'js/extjs/src',
		'Ext.ux' : 'js/extjs/src/ux',
		'atpl.ui' : 'webApp/app/ui'
	}
});

Ext.require([ 'Ext.button.Button', 'Ext.container.Viewport', 'Ext.grid.*',
		'Ext.form.field.File', 'Ext.form.Panel', 'Ext.window.MessageBox',
		'Ext.tab.*', 'Ext.ux.data.PagingMemoryProxy' ]);
function printGraphData(data) {
	debugger;
	var originalContents = document.body.innerHTML;
	document.body.innerHTML = data
	window.print();
	document.body.innerHTML = originalContents;
	return true;
}
var currentTab = "";
var searchCommand = [];
searchCommand.push("search");
searchCommand.push("find");
searchCommand.push("go");
var defaultWidthToReduce = 60;
var defaultHeightToReduce = 70;
Ext
		.onReady(function getSearchView() {
			currentTab = Ext.MainAppMagr.getActiveTab();
			var final_span = "";
			var interim_span = "";
			var final_transcript = '';
			var recognizing = false;
			var ignore_onend;
			var start_timestamp;
			if (!('webkitSpeechRecognition' in window)) {
				upgrade();
			} else {
				start_button = 'inline-block';
				var recognition = new webkitSpeechRecognition();
				recognition.continuous = true;
				recognition.interimResults = true;

				recognition.onstart = function() {
					currentTab = Ext.MainAppMagr.getActiveTab();
					recognizing = true;
					currentTab.down("#voice").setSrc('images/mic-animate.gif');

				};

				recognition.onerror = function(event) {
					currentTab = Ext.MainAppMagr.getActiveTab();
					if (event.error == 'no-speech') {

						currentTab.down("#voice").setSrc('images/mic.gif');
						alert("No speech was detected. You may need to adjust your microphone");
						ignore_onend = true;
					}
					if (event.error == 'audio-capture') {

						currentTab.down("#voice").setSrc('images/mic.gif');
						alert("No microphone was found. Ensure that a microphone is installed");
						ignore_onend = true;
					}
					if (event.error == 'not-allowed') {
						if (event.timeStamp - start_timestamp < 100) {
							alert("Permission to use microphone is blocked.");
						} else {
							alert("Permission to use microphone was denied.");
						}
						ignore_onend = true;
					}
				};

				recognition.onend = function() {
					currentTab = Ext.MainAppMagr.getActiveTab();
					recognizing = false;
					if (ignore_onend) {

						return;
					}
					currentTab.down("#voice").setSrc('images/mic.gif');

					if (!final_transcript) {

						return;
					}
					showInfo('');
					if (window.getSelection) {
						window.getSelection().removeAllRanges();
						var range = document.createRange();
						range.selectNode(document.getElementById('final_span'));
						window.getSelection().addRange(range);
					}

				};

				recognition.onresult = function(event) {
					currentTab = Ext.MainAppMagr.getActiveTab();
					var interim_transcript = '';
					for (var i = event.resultIndex; i < event.results.length; ++i) {
						if (event.results[i].isFinal) {
							final_transcript = event.results[i][0].transcript;
						} else {
							interim_transcript += event.results[i][0].transcript;
						}
					}
					var isSearchCommand = false;
					var inputWords = final_transcript.split(' ');

					for (var k = 0; k < inputWords.length; k++) {

						if (searchCommand.indexOf(inputWords[k]) != -1) {

							isSearchCommand = true;
							final_transcript = final_transcript.replace(
									inputWords[k], '');
						}
					}
					currentTab.down('#searchs').setValue(final_transcript);
					if (isSearchCommand) {
						searchButtonCommand();

					}
					if (recognizing) {

						recognition.stop();
						return;
					}

					if (final_transcript || interim_transcript) {
						showButtons('inline-block');
					}
				};
			}

			function upgrade() {
				currentTab = Ext.MainAppMagr.getActiveTab();
				start_button.style.visibility = 'hidden';
				alert("Web Speech API is not supported by this browser.");
			}

			var two_line = /\n\n/g;
			var one_line = /\n/g;
			function linebreak(s) {
				return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
			}

			var first_char = /\S/;
			function capitalize(s) {
				return s.replace(first_char, function(m) {
					return m.toUpperCase();
				});
			}

			var tabs = {
				layout : 'border',
				bodyBorder : false,
				defaults : {
					split : true,
					animFloat : false,
					autoHide : false,
					useSplitTips : true,
					bodyStyle : 'padding:10px 10px 10px 10px',
					autoScroll : true

				},
				height : window.innerHeight - 225,

				items : [
						{
							title : 'Documents',
							itemId : 'document',
							region : 'west',
							xtype : 'panel',
							width : '45%',
							collapsible : true,
							listeners : {
								collapse : function(t) {
									debugger;
									currentTab = Ext.MainAppMagr.getActiveTab();
									var Value = Ext.getCmp('rating').value;
									mainPanel = t.up().items.items[t.up().items.length - 1];
									newColumns = parseInt(Value);
									totalWidth = (mainPanel.getWidth())
											- (defaultWidthToReduce + (2 * newColumns));
									for (var i = 0; i < mainPanel.items.length; i++) {
										var currentPanel = mainPanel.items.items[i];
										currentPanel
												.setWidth((totalWidth / newColumns));
									}
									for ( var k in FusionCharts.items) {
										fusionObj = FusionCharts.items[k];
										fusionObj
												.resizeTo((totalWidth / newColumns));
									}
									debugger;
									mainPanel.setWidth(totalWidth);
									// mainPanel.doLayout();
								},
								expand : function(t) {
									debugger;
									currentTab = Ext.MainAppMagr.getActiveTab();
									var Value = Ext.getCmp('rating').value;
									mainPanel = t.up().items.items[t.up().items.length - 1];
									newColumns = parseInt(Value);
									totalWidth = (mainPanel.getWidth())
											- (defaultWidthToReduce + (2 * newColumns));
									for ( var k in FusionCharts.items) {
										fusionObj = FusionCharts.items[k];
										fusionObj
												.resizeTo((totalWidth / newColumns));
									}
									for (var i = 0; i < mainPanel.items.length; i++) {
										// debugger;
										var currentPanel = mainPanel.items.items[i];
										currentPanel
												.setWidth((totalWidth / newColumns));
									}

									mainPanel.setWidth(totalWidth);

								}
							}

						},
						{
							title : 'Graph Data',
							tools : [ {
								xtype : 'ratingField',
								id : 'rating',
								numberOfStars : 6,
								tooltip : 'Choose columns',
								minLength : 1,
								value : 2,
								allowBlank : false,
								listeners : {
									'afterrender' : function(comp) {
										currentTab = Ext.MainAppMagr
												.getActiveTab();
										var Value = comp.value;
										mainPanel = comp.up().up();
										mainPanel.getLayout().columns = parseInt(Value);
										/*
										 * newColumns=parseInt(Value);
										 * totalWidth=(mainPanel.getWidth())-(defaultWidthToReduce +
										 * (2*newColumns)); for(var k in
										 * FusionCharts.items){
										 * fusionObj=FusionCharts.items[k];
										 * fusionObj.resizeTo((totalWidth/newColumns)); }
										 * for(var i=0;i<mainPanel.items.length;i++) {
										 * debugger; var
										 * currentPanel=mainPanel.items.items[i];
										 * currentPanel.setWidth((totalWidth/newColumns)); }
										 */

									},
									change : function(comp, newValue, oldValue,
											eOpts) {
										currentTab = Ext.MainAppMagr
												.getActiveTab();

										var Value = comp.value;
										mainPanel = comp.up().up();
										mainPanel.getLayout().columns = parseInt(Value);
										newColumns = parseInt(Value);
										totalWidth = (mainPanel.getWidth())
												- (defaultWidthToReduce + (2 * newColumns));
										for (var i = 0; i < mainPanel.items.length; i++) {
											var currentPanel = mainPanel.items.items[i];
											currentPanel
													.setWidth((totalWidth / newColumns));
										}
										for ( var k in FusionCharts.items) {
											fusionObj = FusionCharts.items[k];
											fusionObj
													.resizeTo((totalWidth / newColumns));
										}
										debugger;
										mainPanel.setWidth(totalWidth);

									}
								}

							} /*
								 * ,{ xtype:'image', src:'images/print.png',
								 * height: 16, width:16, qtip: 'Print',
								 * listeners:{ 'afterrender':function (comp) {
								 * comp.getEl().on('click', function (el) {
								 * debugger;
								 * printGraphData(this.up().up().el.dom.innerHTML); //
								 * this.fireEvent('onNewClick'); }, this); }, //
								 * onNewClick: 'onNewClick' }
								 * 
								 * handler: function(event, toolEl, panel){
								 * printGraphData(this.up().up().el.dom.innerHTML); } }
								 */],

							layout : {
								type : 'table',
								columns : 4
							},

							region : 'center', // center region is required
							xtype : 'panel',
							width : '55%',
							itemId : 'table',
							autoScroll : true
						} ]

			};

			var resultsPanel = Ext
					.create(
							'Ext.panel.Panel',
							{
								id : 'resultsPanel',
								renderTo : Ext.getBody(),
								margin : '10 10 10 10',
								layout : {
									type : 'fit',
									align : 'stretch',
									pack : "center"
								},
								border : 0,
								items : [ {
									border : 0,
									xtype : 'container',
									layout : {
										type : 'vbox',
										align : 'stretch',
										pack : "center"
									},
									margin : '10 10 10 10',
									items : [
											{
												layout : {
													type : 'table',
													columns : 1,
												},
												border : 0,
												items : [
														{
															xtype : 'container',
															layout : 'column',

															items : [
																	{
																		columnWidth : .65,
																		items : [ {
																			xtype : 'container',
																			layout : 'column',
																			height : 30,

																			items : [
																					{

																						name : 'Search',
																						itemId : 'searchs',
																						xtype : 'textfield',
																						value : 'maharashtra',
																						columnWidth : .95,
																						border : 0,
																						listeners : {
																							specialkey : function(
																									f,
																									e) {
																								if (e
																										.getKey() == e.ENTER) {
																									searchButtonCommand();
																								}
																							}
																						}
																					},
																					{

																						name : 'img',
																						itemId : 'voice',
																						xtype : 'image',
																						src : 'images/mic.gif',
																						height : 23,
																						columnWidth : .05,
																						style : {
																							cursor : 'hand',
																						},
																						listeners : {
																							el : {
																								click : function() {
																									currentTab = Ext.MainAppMagr
																											.getActiveTab();
																									if (recognizing) {
																										recognition
																												.stop();
																										return;
																									}
																									recognition
																											.start();
																									ignore_onend = false;

																									currentTab
																											.down(
																													"#voice")
																											.setSrc(
																													'images/mic-slash.gif');

																									showButtons('none');
																									start_timestamp = event.timeStamp;

																									function showInfo(
																											s) {
																										if (s) {
																											for (var child = info.firstChild; child; child = child.nextSibling) {
																												if (child.style) {
																													child = child.id == s ? 'inline'
																															: 'none';
																												}
																											}
																											info = 'visible';
																										} else {
																											info = 'hidden';
																										}
																									}

																									var current_style;
																									function showButtons(
																											style) {
																										if (style == current_style) {
																											return;
																										}
																										current_style = style;
																									}
																								}
																							}
																						}
																					} ]
																		} ]
																	},

																	{
																		xtype : 'image',
																		name : 'img',
																		src : 'images/searchimg.png',
																		style : {
																			cursor : 'hand',
																		},
																		height : 30,
																		columnWidth : .04,
																		margin : '0 0 0 4',
																		listeners : {
																			el : {
																				click : function() {
																					searchButtonCommand();
																				}
																			},
																		}
																	},

																	{
																		valueField : 'value',
																		itemId : 'Lang',
																		xtype : 'combobox',
																		fieldLabel : 'Select Target Language',
																		displayField : 'name',
																		columnWidth : .30,
																		margin : '5 15',
																		anchor : '-15',
																		labelWidth : 130,
																		store : {
																			fields : [
																					{
																						name : 'name',
																						type : 'string'
																					},
																					{
																						name : 'value',
																						type : 'string',
																					},
																					{
																						name : 'value',
																						type : 'string'
																					}

																			],
																			autoLoad : false,
																			proxy : {
																				type : 'ajax',
																				url : 'buzzorSearchAction_/getLanguages',
																				reader : {
																					type : 'json'
																				}
																			}
																		},
																		minChars : 0,
																		queryParam : 'q',
																		queryMode : 'remote',
																		listeners : {
																			'afterrender' : function(
																					combo) {
																				currentTab = Ext.MainAppMagr
																						.getActiveTab();
																				combo.store
																						.load({
																							scope : this,
																							callback : function(
																									records,
																									operation,
																									success) {
																								currentTab
																										.down(
																												"#Lang")
																										.setValue(
																												records[0].data.value);
																							}
																						});
																			}
																		}
																	} ],
														}, {
															name : 'status',
															width : '30%',
															height : 35,
															itemId : 'stat',
															border : 0,
															html : '',

														} ],
											}, tabs

									],
								} ]

							});

			appId = Ext.MainAppMagr.getActiveTab().add(resultsPanel);
			currentTab.down("#searchs").setFieldStyle(
					"border: 1px solid transparent; background-image:none");

			// Onclick function //

			function searchButtonCommand() {
				currentTab = Ext.MainAppMagr.getActiveTab();
				var searchtext = currentTab.down("#searchs").value;

				var oprationType = currentTab.down("#Lang").value;

				Ext.MessageBox.show({
					msg : 'Retriving data...',
					progressText : 'Retriving...',
					width : 300,
					wait : true,
					waitConfig : {
						interval : 200
					}
				});

				Ext.Ajax
						.request({
							url : 'buzzorSearchAction_/doSearch?searchs='
									+ encodeURIComponent(searchtext)
									+ "&oprationType=" + oprationType,
							method : 'POST',
							waitMsg : 'Retriving data...',

							success : function(response) {
								debugger;
								currentTab = Ext.MainAppMagr.getActiveTab();
								result = Ext.JSON.decode(response.responseText);

								rsp = Ext.JSON.decode(result.actualResult);
								responseHeader = rsp.responseHeader;
								y = rsp.response.docs;

								// code for adding view specific document
								// properties and tables //

								var finalHtmlText = "<table style='margin:0px 0px 0px 20px;font-family:'tahoma,arial,verdana,sans-serif;' border='0' width='90%'><tr><td valign='middle' width='95%'> ";
								var finalHtmlTable = "<table style= 'margin:0px 0px 0px 20px; align='center' border='0' width='95%'><tr><td valign='middle' width='90%'> ";
								var statusPanel = "";

								statusPanel += "<font size ='2' color='#808080'><br>"
										+ result.status + "</font><br><br>";

								var totalrecords = [];
								var chartTotalRecord = [];
								var mainChartTotalRecord = [];
								var docFound = false;
								for (result = 0; result < y.length; result++) {

									if (result != 0) {
										finalHtmlText += "";
										finalHtmlTable += "";
									}

									// code for table //

									if (y[result].content == undefined) {

										i = y[result].content;
										if (y[result]
												.hasOwnProperty('table_name')
												&& !y[result]
														.hasOwnProperty('result_type')) {
											if (totalrecords
													.hasOwnProperty(y[result].table_name)) {
												totalrecords[y[result].table_name]
														.push(y[result]);
											} else {
												var record = [];
												record.push(y[result]);
												totalrecords[y[result].table_name] = record;
											}
										} else if (y[result]
												.hasOwnProperty('result_type')) {

											if (chartTotalRecord
													.hasOwnProperty(y[result].config_id[0])) {
												chartTotalRecord[y[result].config_id[0]].data
														.push(y[result]);
											} else {
												var chartlocalJson = {};
												chartlocalJson["result_type"] = y[result].result_type[0];
												chartlocalJson["data"] = [];
												chartlocalJson["data"]
														.push(y[result]);
												chartTotalRecord[y[result].config_id[0]] = chartlocalJson;
											}
										}

									}
									// code for documents with no stream_name //

									else if (y[result].stream_name == undefined) {
										docFound = true;
										// //debugger;
										var Filename = y[result].id
												.substr(y[result].id
														.indexOf('.') + 1);
										finalHtmlText += "<img src='images/"
												+ Filename
												+ ".png' style='width: 40px; height: 30px;'>";
										var fileId = 0
										try {
											fileId = y[result].actualfileid[0];
										} catch (e) {
										}
										linkhtml = "<a href='http://www.google.com' onclick='return downloadFiles(\""
												+ fileId
												+ "\")'> <font size ='3'>"
												+ y[result].id
												+ "</font><font size ='2' color='#000000'></a></font>";
										finalHtmlText += linkhtml;
										if (y[result].author != undefined) {

											finalHtmlText += "<br>"
													+ "<b><font size ='2' >Author: "
													+ y[result].author
													+ "</b></font>";

										} else {
											finalHtmlText += "";
										}
										if (y[result].subject != undefined) {

											finalHtmlText += "<br><b><font size ='2' >Subject: "
													+ y[result].subject
													+ "</b></font>";
										}

										else {
											finalHtmlText += "";
										}
										finalHtmlText += "<br> <font size ='2'>"
												+ y[result].content[0].trim()
														.substring(0, 70);
										finalHtmlText += "...</font><br><br>";

									}

									else {

										// code for documents with stream_name
										// //

										docFound = true;
										var Filename = y[result].stream_name[0]
												.substr(y[result].stream_name[0]
														.indexOf('.') + 1);
										finalHtmlText += "<img src='WebRoot/images/"
												+ Filename
												+ ".png' style='width: 40px; height: 30px;'>";
										finalHtmlText += "<a href="
												+ y[result].stream_name
												+ " ><font size ='3' > "
												+ y[result].stream_name
												+ "</font></a>";

										if (y[result].subject != undefined) {

											finalHtmlText += "<br><b><font size ='2' >Subject: "
													+ y[result].subject
													+ "</b></font>";
										}

										else {
											finalHtmlText += "";
										}
										if (y[result].author != undefined) {
											finalHtmlText += "<br><b><font size ='2' >Author: "
													+ y[result].author
													+ "</b></font>";
										} else {
											finalHtmlText += "";
										}
										if (y[result].creation_date != undefined) {
											finalHtmlText += "<br><b><font size ='2' >Date: "
													+ y[result].creation_date
													+ "</b></font>";

										} else {
											finalHtmlText += "";
										}

										finalHtmlText += "<br> <font size ='2'>"
												+ y[result].content[0].trim()
														.substring(0, 70);
										finalHtmlText += "...</font><br><br>";

									}

								}
								if (!docFound) {
									currentTab.down("#document").collapse();
								} else {
									currentTab.down("#document").expand();
								}
								/*
								 * for ( var tablename in totalrecords) {
								 * finalHtmlTable += "<div style=
								 * align='center' id='"+ tablename+"'
								 * width='95%'></div><br>"; }
								 */

								finalHtmlText += '</td></tr></table>';
								finalHtmlTable += '</td></tr></table>';

								/* Coding for chart */

								for ( var chart in chartTotalRecord) {
									// debugger;
									finalHtmlTable += "<br><div style='margin:10px 10px 10px 10px; align='center' width:95%' id="
											+ chart
											+ ">"
											+ chart
											+ "</div><br>";
								}

								/* end */

								currentTab.down("#document").body
										.update(finalHtmlText);

								// currentTab.down("#table").body.update(finalHtmlTable);

								currentTab.down("#stat").body
										.update(statusPanel);

								/* Draw Grid For table */
								var table = currentTab.down('#table');
								table.removeAll();
								// debugger;
								for ( var tablename in totalrecords) {
									drawGrid(tablename,
											totalrecords[tablename],
											responseHeader);
								}

								/* Draw Chart based on Type */

								for ( var chart in chartTotalRecord) {
									debugger;
									if ("maharashtrachart" == chartTotalRecord[chart].result_type) {

										drawMaharashtrachart(
												chartTotalRecord[chart].data,
												responseHeader);

									} else if ("heatchart" == chartTotalRecord[chart].result_type) {

										drawHeatChart(
												chartTotalRecord[chart].data,
												responseHeader);

									} else if ("radarchart" == chartTotalRecord[chart].result_type) {

										drawRadarChart(
												chartTotalRecord[chart].data,
												responseHeader);

									} else if ("piechart" == chartTotalRecord[chart].result_type) {

										drawPieChart(
												chartTotalRecord[chart].data,
												responseHeader);

									} else if ("linechart" == chartTotalRecord[chart].result_type) {

										drawLineChart(
												chartTotalRecord[chart].data,
												responseHeader);

									} else if ("barchart" == chartTotalRecord[chart].result_type) {

										drawBarChart(
												chartTotalRecord[chart].data,
												responseHeader);

									}

								}

								/* End */

								table.doLayout();
								Ext.MessageBox.hide();

							}
						});

			}
			function repeat(s, count) {
				return new Array(count + 1).join(s);
			}

			function formatJson(json) {
				currentTab = Ext.MainAppMagr.getActiveTab();
				var i = 0, il = 0, tab = "    ", newJson = "", indentLevel = 0, inString = false, currentChar = null;

				for (i = 0, il = json.length; i < il; i += 1) {
					currentChar = json.charAt(i);

					switch (currentChar) {
					case '{':
					case '[':
						if (!inString) {
							newJson += currentChar + "\n"
									+ repeat(tab, indentLevel + 1);
							indentLevel += 1;
						} else {
							newJson += currentChar;
						}
						break;
					case '}':
					case ']':
						if (!inString) {
							indentLevel -= 1;
							newJson += "\n" + repeat(tab, indentLevel)
									+ currentChar;
						} else {
							newJson += currentChar;
						}
						break;
					case ',':
						if (!inString) {
							newJson += ",\n" + repeat(tab, indentLevel);
						} else {
							newJson += currentChar;
						}
						break;
					case ':':
						if (!inString) {
							newJson += ": ";
						} else {
							newJson += currentChar;
						}
						break;
					case ' ':
					case "\n":
					case "\t":
						if (inString) {
							newJson += currentChar;
						}
						break;
					case '"':
						if (i > 0 && json.charAt(i - 1) !== '\\') {
							inString = !inString;
						}
						newJson += currentChar;
						break;

					default:

						newJson += currentChar;
						break;
					}
					;
				}

				return newJson;
			}

			// maharashtra chart code //

			function drawMaharashtrachart(data, responseHeader) {
				currentTab = Ext.MainAppMagr.getActiveTab();
				debugger;

				var table = currentTab.down('#table');
				var maharashtraChart = new FusionCharts({
					type : 'maharashtra',

					width : (table.getWidth() / table.getLayout().columns)
							- defaultWidthToReduce,
					height : ((table.getHeight() < 500 ? 700 : table
							.getHeight()) / 2)
							- defaultHeightToReduce,
					dataFormat : 'json'
				});

				// maharashtraChart.render(data[0].table_name);

				var mainJson = {};
				var finaldata = [];
				var idField, valueField;
				idField = getValue(data[0].key_field);
				valueField = getValue(data[0].value_field);
				var configId = getValue(data[0].config_id);

				var title = getValueEx(responseHeader[configId]);

				var maxValue = 0;
				for (var i = 0; i < data.length; i++) {
					var curJson = data[i];
					var dataJson = {};

					for ( var key in curJson) {
						if (key == idField) {
							dataJson["id"] = getValue(curJson[key]);

						} else if (key = valueField) {

							dataJson["value"] = getValue(curJson[key]);

							if (maxValue < parseFloat(curJson[key])) {
								maxValue = parseFloat(curJson[key]);
							}

						}
					}
					finaldata.push(dataJson);
				}
				var mapJson = {};
				mapJson["animation"] = "0";
				mapJson["showbevel"] = "0";
				mapJson["usehovercolor"] = "1";
				mapJson["canvasbordercolor"] = "FFFFFF";
				mapJson["bgColor"] = "FFFFFF";
				mapJson["bordercolor"] = "FFFFFF";
				mapJson["showlegend"] = "1";
				mapJson["showshadow"] = "0";
				mapJson["legendposition"] = "BOTTOM";
				mapJson["legendborderalpha"] = "0";
				mapJson["legendbordercolor"] = "ffffff";
				mapJson["legendallowdrag"] = "0";
				mapJson["legendshadow"] = "0";
				mapJson["caption"] = title;
				mapJson["connectorcolor"] = "000000";
				mapJson["fillalpha"] = "80";
				mapJson["hovercolor"] = "CCCCCC";
				mapJson["showborder"] = 0;
				mainJson["map"] = mapJson;

				var color = [];
				var colorCode = [ "f8bd19", "e44a00", "CC0000" ];
				var colorLabel = [ "Average" ];

				for (var k = 0; k < 3; k++) {
					var jsonColor = {};
					jsonColor["code"] = colorCode[k];
					if (k == 0) {
						jsonColor["minvalue"] = 0;
						jsonColor["label"] = colorLabel[k];
					} else
						jsonColor["minvalue"] = Math
								.round(((maxValue / 3) * (k)) + 1);

					jsonColor["maxvalue"] = Math
							.round(((maxValue / 3) * (k + 1)));
					color.push(jsonColor);
				}
				var colorrange = {};

				colorrange["gradient"] = "1";
				colorrange["minvalue"] = "0";
				colorrange["code"] = "6baa01";
				colorrange["startlabel"] = "Low";
				colorrange["endlabel"] = "High";
				colorrange["color"] = color;
				mainJson["colorrange"] = colorrange;
				mainJson["data"] = finaldata;

				maharashtraChart.setJSONData(mainJson);
				debugger;

				var tempPanel = Ext.create('Ext.panel.Panel', {
					margin : '5 5 5 5',
					items : [],
					html : "<div id='" + data[0].config_id[0] + "'></div>",
					listeners : {
						afterRender : function() {
							maharashtraChart.render(data[0].config_id[0]);
						}
					}

				});

				// debugger;

				table.items.add(tempPanel)
				// table.doLayout();
			}

			/* Draw Pie Chart */

			function drawPieChart(data, responseHeader) {
				currentTab = Ext.MainAppMagr.getActiveTab();

				// debugger;
				var table = currentTab.down('#table');
				var pieChart = new FusionCharts({
					type : 'pie2d',
					width : (table.getWidth() / table.getLayout().columns)
							- defaultWidthToReduce,
					height : ((table.getHeight() < 500 ? 700 : table
							.getHeight()) / 2)
							- defaultHeightToReduce,
					dataFormat : 'json'
				});

				var mainJson = {};
				var finaldata = [];
				var labelField, valueField;
				labelField = getValue(data[0].key_field);
				valueField = getValue(data[0].value_field);
				debugger;
				var configId = getValue(data[0].config_id);

				var title = getValueEx(responseHeader[configId]);

				var maxValue = 0;
				for (var i = 0; i < data.length; i++) {
					var curJson = data[i];
					var dataJson = {};

					for ( var key in curJson) {
						if (key == labelField) {
							dataJson["label"] = getValue(curJson[key]);

						} else if (key = valueField) {

							dataJson["value"] = getValue(curJson[key]);

							if (maxValue < parseFloat(curJson[key])) {
								maxValue = parseFloat(curJson[key]);
							}

						}
					}
					finaldata.push(dataJson);
				}
				var mapJson = {};
				mapJson["animation"] = "0";
				mapJson["showbevel"] = "0";
				mapJson["usehovercolor"] = "1";
				mapJson["bgColor"] = "FFFFFF";
				mapJson["canvasbordercolor"] = "FFFFFF";
				mapJson["bordercolor"] = "FFFFFF";
				mapJson["showlegend"] = "1";
				mapJson["showshadow"] = "0";
				mapJson["legendposition"] = "BOTTOM";
				mapJson["legendborderalpha"] = "0";
				mapJson["legendbordercolor"] = "ffffff";
				mapJson["legendallowdrag"] = "0";
				mapJson["legendshadow"] = "0";
				mapJson["caption"] = title;
				mapJson["connectorcolor"] = "000000";
				mapJson["fillalpha"] = "80";
				mapJson["hovercolor"] = "CCCCCC";
				mapJson["showborder"] = 0;
				mainJson["map"] = mapJson;

				var color = [];
				var colorCode = [ "f8bd19", "e44a00", "CC0000" ];
				var colorLabel = [ "Average" ];

				for (var k = 0; k < 3; k++) {
					var jsonColor = {};
					jsonColor["code"] = colorCode[k];
					if (k == 0) {
						jsonColor["minvalue"] = 0;
						jsonColor["label"] = colorLabel[k];
					} else
						jsonColor["minvalue"] = Math
								.round(((maxValue / 3) * (k)) + 1);

					jsonColor["maxvalue"] = Math
							.round(((maxValue / 3) * (k + 1)));
					color.push(jsonColor);
				}
				var colorrange = {};

				colorrange["gradient"] = "1";
				colorrange["minvalue"] = "0";
				colorrange["code"] = "6baa01";
				colorrange["startlabel"] = "Low";
				colorrange["endlabel"] = "High";
				colorrange["color"] = color;
				mainJson["colorrange"] = colorrange;
				mainJson["data"] = finaldata;

				pieChart.setJSONData(mainJson);
				debugger;

				var tempPanel = Ext.create('Ext.panel.Panel', {
					margin : '5 5 5 5',
					items : [],
					html : "<div id='" + data[0].config_id[0] + "'></div>",
					listeners : {
						afterRender : function() {
							pieChart.render(data[0].config_id[0]);
						}
					}

				});

				table.items.add(tempPanel)
				// table.doLayout();

			}

			// heatchart code //

			function drawHeatChart(responseData, responseHeader) {
				debugger;
				currentTab = Ext.MainAppMagr.getActiveTab();
				// debugger;
				var table = currentTab.down('#table');
				var heatChart = new FusionCharts({
					type : 'heatmap',
					// renderAt : 'chart-container',
					width : (table.getWidth() / table.getLayout().columns)
							- defaultWidthToReduce,
					height : ((table.getHeight() < 500 ? 700 : table
							.getHeight()) / 2)
							- defaultHeightToReduce,
					dataFormat : 'json',
					dataSource : {}
				});

				var mainJson = {};
				var row = [], column = [], data = [];
				var rawField, columnField, dataField;

				rawField = getValue(responseData[0].column_field);
				columnField = getValue(responseData[0].row_field);
				dataField = getValue(responseData[0].value_field);
				var xfield = getValue(responseData[0].xField);
				var yfield = getValue(responseData[0].yField);
				var configId = getValue(responseData[0].config_id);

				var title = getValueEx(responseHeader[configId]);

				var tmpRow = {}, tmpColum = {};
				var maxValue = 0;

				for (var i = 0; i < responseData.length; i++) {
					var curValueJson = {};
					var curJson = responseData[i];
					for ( var key in curJson) {
						if (key == rawField) {
							var id;

							id = getValue(curJson[key]).replace(/ /g, '_');

							if (!tmpRow.hasOwnProperty(id)) {
								var curRawJson = {};
								curRawJson["id"] = id;

								curRawJson["label"] = getValue(curJson[key]);

								row.push(curRawJson);
								tmpRow[id] = id;
							}
							;
						} else if (key == columnField) {
							var id;
							id = getValue(curJson[key]).replace(/ /g, '_');

							if (!tmpColum.hasOwnProperty(id)) {
								var curColumnJson = {};
								curColumnJson["id"] = id;

								curColumnJson["label"] = getValue(curJson[key]);

								column.push(curColumnJson);
								tmpColum[id] = id;
							}
							;
						} else if (key == dataField) {

							curValueJson["rowid"] = getValue(curJson[rawField])
									.replace(/ /g, '_');

							curValueJson["columnid"] = getValue(
									curJson[columnField]).replace(/ /g, '_');

							curValueJson["value"] = getValue(curJson[dataField]);

							if (maxValue < parseFloat(curJson[dataField])) {
								maxValue = parseFloat(curJson[dataField]);
							}
							;

						}
						;
					}
					data.push(curValueJson);
				}

				var chartJson = {};
				chartJson["theme"] = "fint";
				chartJson["showplotborder"] = "1";
				chartJson["bgColor"] = "FFFFFF";
				chartJson["XAxisName"] = xfield;
				chartJson["YAxisName"] = yfield;
				chartJson["caption"] = title;
				chartJson["xAxisLabelsOnTop"] = "1";
				chartJson["plottooltext"] = "<div id='nameDiv' style='font-size: 12px; border-bottom: 1px dashed #666666; font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block; color: #888888;' >$rowLabel :</div>";
				mainJson["chart"] = chartJson;

				var rows = {};
				rows["row"] = row;
				mainJson["rows"] = rows;

				var columns = {};
				columns["column"] = column;
				mainJson["columns"] = columns;

				var datasetArray = [];
				var dataset = {};
				dataset["data"] = data;
				datasetArray.push(dataset);
				mainJson["dataset"] = datasetArray;

				var color = [];
				var colorCode = [ "6DA81E", "F6BC33", "E24B1A" ];
				// var colorLabel = [ "Good", "Average", "Bad" ];
				// var colorCode = [ "D7DF01", "DF7401", "DF0101" ];
				var colorLabel = [ "Low", "Medium", "High" ];

				for (var k = 0; k < 3; k++) {
					var jsonColor = {};
					jsonColor["code"] = colorCode[k];
					if (k == 0)
						jsonColor["minvalue"] = 0;
					else
						jsonColor["minvalue"] = Math
								.round(((maxValue / 3) * (k)) + 1);

					jsonColor["label"] = colorLabel[k];
					jsonColor["maxvalue"] = Math
							.round(((maxValue / 3) * (k + 1)));
					color.push(jsonColor);
				}
				var colorrange = {};

				colorrange["gradient"] = "0";
				colorrange["minvalue"] = "0";
				colorrange["code"] = "CC0000";
				colorrange["startlabel"] = "Poor";
				colorrange["endlabel"] = "Good";
				colorrange["color"] = color;
				mainJson["colorrange"] = colorrange;

				heatChart.setJSONData(mainJson);

				var tempPanel = Ext.create('Ext.panel.Panel', {
					margin : '5 5 5 5',
					items : [],
					html : "<div id='" + responseData[0].config_id[0]
							+ "'></div>",
					listeners : {
						afterRender : function() {

							heatChart.render(responseData[0].config_id[0]);
						}
					}

				});

				// debugger;

				table.items.add(tempPanel);
				// table.doLayout();
			}

			function drawBarChart(data, responseHeader) {
				currentTab = Ext.MainAppMagr.getActiveTab();
				// debugger;
				var table = currentTab.down('#table');
				var barChart = new FusionCharts({
					type : 'column2d',
					width : (table.getWidth() / table.getLayout().columns)
							- defaultWidthToReduce,
					height : ((table.getHeight() < 500 ? 700 : table
							.getHeight()) / 2)
							- defaultHeightToReduce,
					dataFormat : 'json'
				});

				var mainJson = {};
				var finaldata = [];
				var idField, valueField;
				idField = getValue(data[0].key_field);
				valueField = getValue(data[0].value_field);
				var configId = getValue(data[0].config_id);

				var title = getValueEx(responseHeader[configId]);

				var maxValue = 0;
				for (var i = 0; i < data.length; i++) {
					var curJson = data[i];
					var dataJson = {};

					for ( var key in curJson) {
						if (key == idField) {
							dataJson["label"] = getValue(curJson[key]);

						} else if (key = valueField) {

							dataJson["value"] = getValue(curJson[key]);

							if (maxValue < parseFloat(curJson[key])) {
								maxValue = parseFloat(curJson[key]);
							}

						}
					}
					finaldata.push(dataJson);
				}
				var mapJson = {};
				mapJson["animation"] = "0";
				mapJson["showbevel"] = "0";
				mapJson["usehovercolor"] = "1";
				mapJson["canvasbordercolor"] = "FFFFFF";
				mapJson["bgColor"] = "FFFFFF";
				mapJson["bordercolor"] = "FFFFFF";
				mapJson["showlegend"] = "1";
				mapJson["showshadow"] = "0";
				mapJson["legendposition"] = "BOTTOM";
				mapJson["legendborderalpha"] = "0";
				mapJson["legendbordercolor"] = "ffffff";
				mapJson["legendallowdrag"] = "0";
				mapJson["legendshadow"] = "0";
				mapJson["caption"] = title;
				mapJson["xaxisname"] = idField;
				mapJson["yaxisname"] = valueField;
				mapJson["connectorcolor"] = "000000";
				mapJson["fillalpha"] = "80";
				mapJson["hovercolor"] = "CCCCCC";
				mapJson["showborder"] = 0;
				mainJson["map"] = mapJson;

				var color = [];
				var colorCode = [ "f8bd19", "e44a00", "CC0000" ];
				var colorLabel = [ "Average" ];

				for (var k = 0; k < 3; k++) {
					var jsonColor = {};
					jsonColor["code"] = colorCode[k];
					if (k == 0) {
						jsonColor["minvalue"] = 0;
						jsonColor["label"] = colorLabel[k];
					} else
						jsonColor["minvalue"] = Math
								.round(((maxValue / 3) * (k)) + 1);

					jsonColor["maxvalue"] = Math
							.round(((maxValue / 3) * (k + 1)));
					color.push(jsonColor);
				}

				var colorrange = {};

				colorrange["gradient"] = "1";
				colorrange["minvalue"] = "0";
				colorrange["code"] = "6baa01";
				colorrange["startlabel"] = "Low";
				colorrange["endlabel"] = "High";
				colorrange["color"] = color;
				mainJson["colorrange"] = colorrange;
				mainJson["data"] = finaldata;

				barChart.setJSONData(mainJson);
				debugger;

				var tempPanel = Ext.create('Ext.panel.Panel', {
					margin : '5 5 5 5',
					items : [],
					html : "<div id='" + data[0].config_id[0] + "'></div>",
					listeners : {
						afterRender : function() {
							barChart.render(data[0].config_id[0]);
						}
					}

				});

				// debugger;

				table.items.add(tempPanel)
				// table.doLayout();
			}
			function getValueofCurrentKeyField(data, keyField) {

				for ( var rowField in data) {
					var keyRowFieldValue = data[rowField].keyRowField;
					if (keyRowFieldValue == keyField) {

						return data[rowField].value;
					}
				}
				return 0;
			}
			// radar chart code //

			function drawRadarChart(responseData, responseHeader) {
				currentTab = Ext.MainAppMagr.getActiveTab();
				var table = currentTab.down('#table');
				// debugger;
				var radarchart = new FusionCharts({
					type : 'radar',
					renderAt : 'chart-container',
					width : (table.getWidth() / table.getLayout().columns)
							- defaultWidthToReduce,
					height : ((table.getHeight() < 500 ? 700 : table
							.getHeight()) / 2)
							- defaultHeightToReduce,
					dataFormat : 'json',
					dataSource : {},
					caption : '',
					legendDisp : "true",
					legend : 1,
				});
				// radarchart.render(responseData[0].table_name);

				var configId = getValue(responseData[0].config_id);
				var title = getValueEx(responseHeader[configId]);
				var mainJson = {};
				var row = [], column = [], data = [];
				var categoryField = getValue(responseData[0].column_field);
				var seriesNameField = getValue(responseData[0].row_field);
				var dataField = getValue(responseData[0].value_field);

				var tmpRow = {}, tmpColum = {}, seriesAndData = {};
				var maxValue = 0;
				var lableArrayStr = [];
				for (var i = 0; i < responseData.length; i++) {
					var curValueJson = {};
					var curJson = responseData[i];
					for ( var key in curJson) {
						if (key == categoryField) {

							console.log(curJson[key]);
							var id = getValue(curJson[key]).replace(/ /g, '_');
							if (!tmpRow.hasOwnProperty(id)) {
								var curRawJson = {};
								curRawJson["label"] = getValue(curJson[key]);
								lableArrayStr.push(getValue(curJson[key]));
								row.push(curRawJson);
								tmpRow[id] = id;
							}
						}
						if (key == dataField) {
							if (!seriesAndData
									.hasOwnProperty(curJson[seriesNameField])) {
								var seriesJson = {};
								seriesJson["seriesname"] = getValue(curJson[seriesNameField]);
								seriesJson["data"] = [];
								seriesAndData[curJson[seriesNameField]] = seriesJson;
							}
							var valueJson = {};
							valueJson["value"] = curJson[dataField];
							valueJson["keyRowField"] = getValue(curJson[categoryField]);
							seriesAndData[curJson[seriesNameField]].data
									.push(valueJson);

						}

					}
					data.push(curValueJson);
				}
				// create formatted json here
				var datasetJson = [];
				/*
				 * for ( var key in seriesAndData) {
				 * datasetJson.push(seriesAndData[key]); }
				 */
				newFinalSeriosArray = [];

				for ( var key in seriesAndData) {
					newJsonData = {};

					newDataArray = [];
					for ( var labelField in lableArrayStr) {
						var count = 0;

						var valueJson = {};
						valueJson["value"] = getValueofCurrentKeyField(
								seriesAndData[key].data,
								lableArrayStr[labelField]);
						valueJson["keyRowField"] = lableArrayStr[labelField];
						newDataArray.push(valueJson);

					}
					newJsonData["seriesname"] = seriesAndData[key].seriesname;
					newJsonData["data"] = newDataArray;
					newFinalSeriosArray.push(newJsonData);
					/* datasetJson.push(seriesAndData[key]); */
				}
				debugger;

				var chartJson = {};
				chartJson["theme"] = "fint";
				chartJson["anchoralpha"] = "0";
				chartJson["showborder"] = "0";
				chartJson["caption"] = title;
				chartJson["xaxisname"] = categoryField;
				chartJson["yaxisname"] = seriesNameField;
				chartJson["bgColor"] = "ffffff";
				chartJson["showLegend"] = 1;
				mainJson["chart"] = chartJson;

				mainJson["dataset"] = newFinalSeriosArray;

				var categories = [];
				var categoryJson = {};
				categoryJson["category"] = row;
				categories.push(categoryJson);
				mainJson["categories"] = categories;

				radarchart.setJSONData(mainJson);

				var tempPanel = Ext.create('Ext.panel.Panel', {
					margin : '5 5 5 5',
					items : [],
					html : "<div id='" + responseData[0].config_id[0]
							+ "'></div>",
					listeners : {
						afterRender : function() {
							radarchart.render(responseData[0].config_id[0]);
						}
					}

				});

				// debugger;

				table.items.add(tempPanel)
				// table.doLayout();

			}

			/* Draw Line Chart */
			function drawLineChart(responseData, responseHeader) {
				currentTab = Ext.MainAppMagr.getActiveTab();

				var table = currentTab.down('#table');
				// debugger;
				var lineChart = new FusionCharts({
					type : 'msline',
					renderAt : 'chart-container',
					legendDisp : "true",
					legend : 1,
					width : (table.getWidth() / table.getLayout().columns)
							- defaultWidthToReduce,
					height : ((table.getHeight() < 500 ? 700 : table
							.getHeight()) / 2)
							- defaultHeightToReduce,
					dataFormat : 'json',
					dataSource : {}
				});
				// radarchart.render(responseData[0].table_name);
				var configId = getValue(responseData[0].config_id);
				var title = getValueEx(responseHeader[configId]);

				var mainJson = {};
				var row = [], column = [], data = [];
				var categoryField, seriesNameField, dataField;

				var categoryField = getValue(responseData[0].column_field);

				var seriesNameField = getValue(responseData[0].row_field);

				var dataField = getValue(responseData[0].value_field);
				var tmpRow = {}, tmpColum = {}, seriesAndData = {};
				var maxValue = 0;
				for (var i = 0; i < responseData.length; i++) {
					var curValueJson = {};
					var curJson = responseData[i];
					for ( var key in curJson) {
						if (key == categoryField) {
							var id = getValue(curJson[key]).replace(/ /g, '_');
							if (!tmpRow.hasOwnProperty(id)) {
								var curRawJson = {};
								curRawJson["label"] = getValue(curJson[key]);
								row.push(curRawJson);
								tmpRow[id] = id;
							}
						}
						if (key == dataField) {
							if (!seriesAndData
									.hasOwnProperty(curJson[seriesNameField])) {
								var seriesJson = {};
								seriesJson["seriesname"] = curJson[seriesNameField];
								seriesJson["data"] = [];
								seriesAndData[curJson[seriesNameField]] = seriesJson;
							}
							var valueJson = {};
							valueJson["value"] = curJson[dataField];
							seriesAndData[curJson[seriesNameField]].data
									.push(valueJson);

						}

					}
					data.push(curValueJson);
				}

				var datasetJson = [];
				for ( var key in seriesAndData) {
					datasetJson.push(seriesAndData[key]);
				}

				debugger;

				var chartJson = {};
				chartJson["theme"] = "fint";
				chartJson["anchoralpha"] = "0";
				chartJson["showborder"] = "0";
				chartJson["caption"] = title;
				chartJson["xaxisname"] = categoryField;
				chartJson["yaxisname"] = dataField;
				chartJson["bgColor"] = "ffffff";
				chartJson["showlegend"] = 1;
				mainJson["chart"] = chartJson;

				mainJson["dataset"] = datasetJson;

				var categories = [];
				var categoryJson = {};
				categoryJson["category"] = row;
				categories.push(categoryJson);
				mainJson["categories"] = categories;

				// return mainJson;

				lineChart.setJSONData(mainJson);

				var tempPanel = Ext.create('Ext.panel.Panel', {
					margin : '5 5 5 5',
					items : [],
					html : "<div id='" + responseData[0].config_id[0]
							+ "'></div>",
					listeners : {
						afterRender : function() {
							lineChart.render(responseData[0].config_id[0]);
						}
					}

				});

				// debugger;

				table.items.add(tempPanel)
				// table.doLayout();

			}
			function drawLineChart1(responseData, responseHeader) {
				currentTab = Ext.MainAppMagr.getActiveTab();

				var table = currentTab.down('#table');
				// debugger;
				var lineChart = new FusionCharts({
					type : 'msline',
					renderAt : 'chart-container',
					legendDisp : "true",
					legend : 1,
					width : (table.getWidth() / table.getLayout().columns)
							- defaultWidthToReduce,
					height : (table.getHeight() / 2) - defaultHeightToReduce,
					dataFormat : 'json',
					dataSource : {}
				});
				// radarchart.render(responseData[0].table_name);

				var mainJson = {};
				var row = [], column = [], data = [];

				var categoryField, seriesNameField, dataField;

				categoryField = getValue(responseData[0].row_field)
						.toLowerCase();

				seriesNameField = getValue(responseData[0].column_field)
						.toLowerCase();

				dataField = getValue(responseData[0].value_field).toLowerCase();
				var configId = getValue(responseData[0].config_id);

				var title = getValueEx(responseHeader[configId]);
				var tmpRow = {}, tmpColum = {}, seriesAndData = {};
				var maxValue = 0;
				for (var i = 0; i < responseData.length; i++) {
					var curValueJson = {};
					var curJson = responseData[i];
					for ( var key in curJson) {
						if (key == categoryField) {
							var id;

							id = getValue(curJson[key]).replace(/ /g, '_');

							if (!tmpRow.hasOwnProperty(id)) {
								var curRawJson = {};
								curRawJson["label"] = getValue(curJson[key]);
								row.push(curRawJson);
								tmpRow[id] = id;
							}
							;
						}
						if (key == dataField) {
							if (!seriesAndData
									.hasOwnProperty(curJson[seriesNameField])) {
								var seriesJson = {};
								seriesJson["seriesname"] = curJson[seriesNameField];
								seriesJson["data"] = [];
								seriesAndData[curJson[seriesNameField]] = seriesJson;
							}
							var valueJson = {};
							valueJson["value"] = curJson[dataField];
							seriesAndData[curJson[seriesNameField]].data
									.push(valueJson);

						}
						;

					}
					data.push(curValueJson);
				}

				var datasetJson = [];
				for ( var key in seriesAndData) {
					datasetJson.push(seriesAndData[key]);
				}

				var chartJson = {};

				var chartJson = {};
				chartJson["theme"] = "fint";
				chartJson["anchoralpha"] = "0";
				chartJson["showborder"] = "0";
				chartJson["caption"] = title;

				chartJson["bgColor"] = "ffffff";
				chartJson["showlegend"] = 1;
				// chartJson["showlegend"] = this.legend;
				mainJson["chart"] = chartJson;

				mainJson["dataset"] = datasetJson;

				var categories = [];
				var categoryJson = {};
				categoryJson["category"] = row;
				categories.push(categoryJson);
				mainJson["categories"] = categories;

				lineChart.setJSONData(mainJson);

				var tempPanel = Ext.create('Ext.panel.Panel', {
					margin : '5 5 5 5',
					items : [],
					html : "<div id='" + responseData[0].config_id[0]
							+ "'></div>",
					listeners : {
						afterRender : function() {
							lineChart.render(responseData[0].config_id[0]);
						}
					}

				});

				// debugger;

				table.items.add(tempPanel)
				// table.doLayout();

			}

			// grid view for all tables //

			function drawGrid(tableName, totalRecords, responseHeader) {
				currentTab = Ext.MainAppMagr.getActiveTab();
				var table = currentTab.down('#table');
				var mainJson = prepareData(totalRecords);

				Ext.define(tableName + 'model', {
					extend : 'Ext.data.Model',
					fields : mainJson['fields'],
				});

				var mystore = Ext.create('Ext.data.JsonStore', {
					model : tableName + 'model',
					data : mainJson['data'],
					proxy : {
						type : 'pagingmemory'
					},
					pageSize : 20
				});

				var grid = Ext.create('Ext.grid.Panel', {
					store : mystore,
					stateful : true,
					collapsible : true,
					multiSelect : true,
					stateId : 'stateGrid',
					layout : 'fit',
					margin : '5 5 5 5',
					columns : mainJson['columns'],
					height : ((table.getHeight() < 500 ? 700 : table
							.getHeight()) / 2)
							- defaultHeightToReduce,
					width : (table.getWidth() / table.getLayout().columns)
							- defaultWidthToReduce,
					flex : 1,
					title : tableName,
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						store : mystore, // same store GridPanel is using
						dock : 'bottom',
						displayInfo : true
					} ]

				});
				// debugger;

				table.items.add(grid)

				// grid.doLayout();
			}
			/* convert underscore to spaced upper case words */
			function toTitleCase(str) {
				return str.replace(/(?:^|\s)\w/g, function(match) {
					return match.toUpperCase();
				});
			}

			function prepareData(totalRecords) {
				currentTab = Ext.MainAppMagr.getActiveTab();
				var fields = [], columns = [], finalData = [], mainJson = {}, hiddenFieldsArray = [];
				for (var i = 0; i < totalRecords.length; i++) {
					var currJson = totalRecords[i];
					if (i == 0) {

						for ( var key in currJson) {
							if (currJson.hasOwnProperty('hiddencolumn')) {
								hiddenFieldsArray = currJson.hiddencolumn
										.split(',');
							}
							if (key != 'hiddencolumn'
									&& hiddenFieldsArray.indexOf(key) == -1) {
								var fieldJson = {};
								var columnJson = {};
								fieldJson['name'] = key;
								fields.push(fieldJson);

								columnJson['text'] = toTitleCase(key.replace(
										'_', ' '));

								columnJson['dataIndex'] = key;
								columns.push(columnJson);
							}
							;
						}
						;
					}
					var dataJson = {};
					for ( var key in currJson) {
						if (currJson.hasOwnProperty('hiddencolumn')) {
							hiddenFieldsArray = currJson.hiddencolumn
									.split(',');
						}
						if (key != 'hiddencolumn'
								&& hiddenFieldsArray.indexOf(key) == -1) {
							dataJson[key] = getValue(currJson[key]);
						}
						;
					}
					finalData.push(dataJson);

				}

				mainJson['fields'] = fields;
				mainJson['data'] = finalData;
				mainJson['columns'] = columns;

				return mainJson;

			}

			function getValue(val) {
				currentTab = Ext.MainAppMagr.getActiveTab();
				var finalVal = "";
				if (val instanceof Array) {
					finalVal = ("" + val[0]);
				} else {
					finalVal = ("" + val);
				}

				return finalVal;
			}
			function getValueEx(val) {
				currentTab = Ext.MainAppMagr.getActiveTab();
				var finalVal = "";
				if (val instanceof Array) {
					finalVal = ("" + val[0]);
				} else {
					finalVal = ("" + val);
				}

				return finalVal;
			}
			;
		});