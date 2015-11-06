Ext
		.define(
				'Healthsurvey.view.searchengine.search.SearchEngineMainPanelController',
				{
					extend : 'Ext.app.ViewController',
					alias : 'controller.solrsearchcontroller',
					recognizing : false,
					recognition:null,
					 searchCommand : [],
					afterRender : function() {
						debugger;
						me=this;
						this.searchCommand.push("search");
						this.searchCommand.push("find");
						this.searchCommand.push("go");
						searchCommand=this.searchCommand;
						currentTab = this.getView();
						// txtField=this.getView().down("#searchs");
						var final_span = "";
						var interim_span = "";
						var final_transcript = '';

						var ignore_onend;
						var start_timestamp;
						if (!('webkitSpeechRecognition' in window)) {
							upgrade();
						} else {
							start_button = 'inline-block';
							var recognition = new webkitSpeechRecognition();
							this.recognition=recognition;
							recognition.continuous = true;
							recognition.interimResults = true;

							recognition.onstart = function() {
								// currentTab = Ext.MainAppMagr.getActiveTab();
								recognizing = true;
								currentTab.down("#voice").setIcon(
										'images/mic-animate.gif');

							};

							recognition.onerror = function(event) {
								// currentTab = Ext.MainAppMagr.getActiveTab();
								if (event.error == 'no-speech') {

									currentTab.down("#voice").setIcon(
											'images/mic.gif');
									alert("No speech was detected. You may need to adjust your microphone");
									ignore_onend = true;
								}
								if (event.error == 'audio-capture') {

									currentTab.down("#voice").setIcon(
											'images/mic.gif');
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
								// currentTab = Ext.MainAppMagr.getActiveTab();
								recognizing = false;
								if (ignore_onend) {

									return;
								}
								currentTab.down("#voice").setIcon(
										'images/mic.gif');

								if (!final_transcript) {

									return;
								}
								//showInfo('');
								if (window.getSelection) {
									window.getSelection().removeAllRanges();
									var range = document.createRange();
									range.selectNode(document
											.getElementById('final_span'));
									window.getSelection().addRange(range);
								}

							};

							recognition.onresult = function(event) {
								// currentTab = Ext.MainAppMagr.getActiveTab();
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
										final_transcript = final_transcript
												.replace(inputWords[k], '');
									}
								}
								currentTab.down('#searchs').setValue(
										final_transcript);
								if (isSearchCommand) {
									me.onSolrSearchClick();

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
					},

					onSolrSearchClick : function(me) {

						debugger;
						var myView = this.view;
						var searchText = myView.down('#searchs').value;
						var oprationType = myView.down('#Lang').value;
						var statusPanel = myView.down('#stat');

						Ext.MessageBox.show({
							msg : 'Retrieving data...',
							progressText : 'Retrieving...',
							width : 300,
							wait : true,
							waitConfig : {
								interval : 200
							}
						});
						Ext.Ajax.setTimeout(160000);
						Ext.Ajax
								.request({

									url : 'secure/SearchEngineController/getSearchResult?searchString='
											+ encodeURIComponent(searchText)
											+ "&oprationType=" + oprationType,
									method : 'GET',
									timeout : 1600000,
									waitMsg : 'Retriving data...',

									success : function(response) {
										debugger;
										/*
										 * jsonResult = myView.down("#results");
										 * jsonResult.update("Result tab");
										 */
										isHide = false;
										result = Ext.JSON
												.decode(response.responseText);
										doUMeanPanel = myView
												.down("#doUMeanPanel");
										doUMeanPanel.removeAll();
										doumeanarray = result.doUMean;
										if (doumeanarray.length > 0) {
											doUMeanPanel.show();
											doUMeanPanel.add(doumeanarray);
										} else {
											doUMeanPanel.hide();// =true;
											isHide = true;
										}
										graphView = myView.down("#table");
										documentGrid = myView
												.down("#documentView");
										mainDocumentPanel = myView
												.down("#mainDocumentPanel");
										graphView.removeAll(true);

										if (result.hasOwnProperty("graphData")
												&& result.graphData.length > 0) {
											debugger;
											graphView.add(result.graphData);
											graphView.doLayout();
											
											
										}
										if (result.hasOwnProperty("documents")
												&& result.documents.length > 0) {
											/*
											 * documentGrid.store
											 * .loadData(result.documents);
											 */

											documentGrid.store.getProxy()
													.setData(result.documents);
											documentGrid.store.read();
											documentGrid.ALLDATA = result.documents;
											/*
											 * pager=documentGrid.query('pagingtoolbar')[0];
											 * pager.bindStore(documentGrid.store);
											 * documentGrid.reconfigure(documentGrid.store);
											 * documentGrid.store.loadPage(1);
											 */
											/*
											 * pagging.store =
											 * documentGrid.store;
											 * 
											 */
											mainDocumentPanel.expand();
										} else {
											var k = [];
											documentGrid.store.loadData(k);
											if (isHide)
												mainDocumentPanel.collapse();
											else
												mainDocumentPanel.expand();
										}
										/*
										 * resultPanel=myView.down("#resultsTab");
										 * resultPanel.dockedItems.items[0].query("label")[0].setText(result.status);
										 */

										statusPanel.body
												.update("<font size ='2' color='#808080'>"
														+ result.status
														+ "</font>");
										Ext.MessageBox.hide();
									},
									failure : function() {
										Ext.Msg.alert("Request Failed",
												"Request Failed");
									}

								});
					},

					onVoiceSearch : function recognizeVoice(me) {
						currentScope = me;
						recognizing=this.recognizing;
						recognition=this.recognition;
						if (recognizing) {
							recognition.stop();
							return;
						}
						
						recognition.start();
						ignore_onend = false;

						this.getView().down("#voice").setIcon(
								'images/mic-slash.gif');

						showButtons('none');
						start_timestamp = event.timeStamp;

						function showInfo(s) {
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
						function showButtons(style) {
							if (style == current_style) {
								return;
							}
							current_style = style;
						}
					},
					onPanelCollapse : function(me) {
						var defaultWidthToReduce = 20;
						var defaultHeightToReduce = 0;
						debugger;
						resultPanel = me.up();
						mainPanel = resultPanel.query("[title=Graph Data]")[0];
						var Value = resultPanel.down("panelheaderfield").value;
						newColumns = parseInt(Value);
						totalWidth = (mainPanel.getWidth())
								- (defaultWidthToReduce + (newColumns * 5));
						
						calculateWidthPerChart=(totalWidth)/ newColumns;
						for (var i = 0; i < mainPanel.items.length; i++) {
							var currentPanel = mainPanel.items.items[i];
							if(currentPanel.items.length==1 && currentPanel.items.items[0].hasOwnProperty("group") && currentPanel.items.items[0].group==true)
								{
								debugger
									groupPanel=currentPanel.items.items[0];
									lengthOfChildPanel=groupPanel.items.length;
									for (var j = 0; j < lengthOfChildPanel; j++) {
										var childGroupPanel = groupPanel.items.items[j];
										childGroupPanel																		
										.setWidth(calculateWidthPerChart/lengthOfChildPanel);
										
									}
								}
							/*else{
								currentPanel
							
									.setWidth(calculateWidthPerChart);
							}*/
							groupPanel															
							.setWidth(calculateWidthPerChart);
							currentPanel															
							.setWidth(calculateWidthPerChart);
						}
						try {
							for ( var k in FusionCharts.items) {
								fusionObj = FusionCharts.items[k];
								var panelbodyId = fusionObj.options.containerElementId;
								var curentPanel=mainPanel.down('#'+ panelbodyId.substring(0, panelbodyId.indexOf('-body')));
								if (curentPanel != null) {
									
									pPanel=curentPanel.up();
									mainCalaculatedWidth=(totalWidth)/ newColumns;
									if(pPanel.hasOwnProperty("group") && pPanel.group==true)
									{
										totalColumnsForMultiChart=pPanel.layout.columns;
										
										groupedCalculatedWidht=mainCalaculatedWidth/totalColumnsForMultiChart;
										fusionObj.resizeTo(groupedCalculatedWidht-10);
									}
								else{
										fusionObj.resizeTo(mainCalaculatedWidth-10);
									}
								}
							
							}
						} catch (ex) {
						}
						mainPanel.setWidth(totalWidth);
						googleMapPanel=mainPanel.query("mapPanel");
						if(googleMapPanel!=null && googleMapPanel.length>0)
							
							{
								for(gCount=0;gCount<googleMapPanel.length;gCount++)
									{
										currentGoogleMapPanel=googleMapPanel[gCount];
										currentGoogleMapPanel.controller.resizeMap();
									}
							}
						debugger;
						
						
						/*for (var i = 0; i < mainPanel.items.length; i++) {
							var currentPanel = mainPanel.items.items[i];
							currentPanel.setWidth((totalWidth / newColumns));
						}
						try {
							for ( var k in FusionCharts.items) {
								fusionObj = FusionCharts.items[k];
								var panelbodyId = fusionObj.options.containerElementId;
								if (mainPanel.down('#'
										+ panelbodyId.substring(0, panelbodyId
												.indexOf('-body'))) != null) {
									fusionObj.resizeTo((totalWidth)
											/ newColumns);
								}

							}
						} catch (ex) {
						}
						debugger;
						mainPanel.setWidth(totalWidth);*/
						
						

					}

				});
