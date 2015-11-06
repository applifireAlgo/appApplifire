Ext
		.define(
				'Healthsurvey.view.searchengine.search.ResultPanel',
				{
					extend : 'Ext.panel.Panel',
					xtype : 'resultPanel',
					itemId : "resultsTab",
					plugins : 'responsive',
					requires : [ 'Healthsurvey.view.searchengine.search.SearchEngineMainPanelController','Healthsurvey.view.searchengine.search.PanelHeaderField' ,'Healthsurvey.view.searchengine.search.ReportGridView','Healthsurvey.view.searchengine.search.ReportChartView','Healthsurvey.view.searchengine.search.documentView','Healthsurvey.view.searchengine.search.DouMeanView','Healthsurvey.view.googlemaps.map.MapPanel'],
					controller:'solrsearchcontroller',
					height : window.innerHeight - 180,
					responsiveConfig : {
						wide : {
							layout : 'border'
						},
						'width < 720' : {
							layout : 'fit'
						},
						'width > 720' : {
							layout : 'border'
						},	
					}/*, dockedItems: [{
				        xtype: 'toolbar',
				        dock: 'bottom',
				        items: [{
				        	xtype: 'label',
				            forId: 'myFieldId',
				            text: 'My Awesome Field',
				            margin: '0 0 0 10'
				        }]
				    }]*/,
					items : [
							{	
								border : 0,
								title : 'Documents'								
								,region : 'west',
								columnWidth : .50,
								bodyStyle:'background:#D8D8D8',
								collapsible : true,
								autoScroll : true,
								//height : window.innerHeight - 160,
								width : '45%',
								collapseDirection:'left',
								itemId:"mainDocumentPanel",
								layout : 'anchor',
								items:[
								       {
								    	  
								    		   xtype:'panel',
								    		   itemId:"doUMeanPanel",
								    		   anchor:'100% 10%',
								    		   autoScroll:true,
								    		   hidden:true,
								    		  
								    	  // layout:'vbox',
								    	   
								       },
								       {
								    	   xtype : 'documentView',
								    	   anchor:'100% 99%',
								    		 //  hidden:true
								       }
								       ],
								listeners : {
							        afterrender : function(panel) {
							            var header = panel.header;
							            header.setHeight(60);
							        },
							        collapse : 'onPanelCollapse',
									
									expand: 'onPanelCollapse'
							    },
								 
							},
							{
								border : 0,
								title : 'Graph Data',
								itemId : 'table',
								
								bodyPadding:0,region : 'center', // center region is required
								xtype : 'panel',
								width : '55%',
								
								bodyStyle:'background:#ececec',
								layout : {
									type : 'table',
									columns : 1
								},
								
							//	header : {
									//titlePosition : 0,
									tools : [
											{
												xtype : 'panelheaderfield',
												// id : 'rating',
												//hidden:true,
												
												numberOfStars : 6,
												tooltip : 'Choose columns',
												minLength : 1,
												value : 1,
												allowBlank : false,
												listeners : {
													'afterrender' : function(
															comp) {
														debugger;
														var defaultWidthToReduce = 60;
														var defaultHeightToReduce = 70;
														var Value = comp.value;
														mainPanel = comp.up()
																.up();
														mainPanel.getLayout().columns = parseInt(Value);
														totalWidth = (mainPanel
																.getWidth())
																- (defaultWidthToReduce + (2 * newColumns));
														mainPanel
														.setWidth(totalWidth);
													},
													change : function(comp,
															newValue, oldValue,
															eOpts) {
														var defaultWidthToReduce = 60;
														var defaultHeightToReduce = 70;

														var Value = comp.value;
															mainPanel = comp.up()
																	.up();
															
															debugger;
														mainPanel.getLayout().columns = parseInt(Value);
														newColumns = parseInt(Value);
														/*totalWidth = (mainPanel
																.getWidth())
																- (defaultWidthToReduce + (2 * newColumns));*/
															/*totalWidth = (mainPanel
																	.getWidth()-5)/newColumns;*/
														totalWidth = (mainPanel.getWidth());
														totalWidth=totalWidth -(20 +(newColumns*5));
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
															try{
															groupPanel															
															.setWidth(calculateWidthPerChart);}catch(e){}
															
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
														debugger;
														
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
														/*mainPanel
																.setWidth(totalWidth);*/

													}
												}
											}, ],

								//},
								columnWidth : .50,
								//collapsible : true,
								autoScroll : true,
								height : window.innerHeight - 160,

							} ]
				});