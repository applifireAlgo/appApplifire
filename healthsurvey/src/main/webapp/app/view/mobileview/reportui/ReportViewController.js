Ext.define('Healthsurvey.view.mobileview.reportui.ReportViewController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.reportviewController',
	requires : [],
	queryCriteria : null,
	datachart : null,
	isRad : 0,
	reportWidgets:null,
	restURL : "",
	gridurl : null,
	chartdataurl : null,
	excelDownloaSdurl:null,
	excelDownloadAllurl:null,
	downloadFileform:null,
	urlPrefix : null,
	auto_refersh_interval:null,
	mapPanel : null,
	mapurl : null,
	mapController:null,
	init : function() {
		this.control({
			"button": {
				click:this.filterdaterangedata,
			},
		});
		var body = Ext.getBody();
		this.frame = body.createChild({
			tag : 'iframe',
			cls : 'x-hidden',
			id : 'hiddenform-iframe' + this.getView().id,
			name : 'iframe' + this.getView().id
		});
		this.downloadFileform = body.createChild({
			tag : 'form',
			cls : 'x-hidden',
			id : 'hiddenform-form' + this.getView().id,
			method : 'GET',
			ContentType : 'application/json;application/xml',
			action : "",
			target : 'iframe' + this.getView().id
		});
		this.downloadFileform.createChild({tag:'input',name:"params",id:"params"+this.getView().id});
		debugger;
		this.setRestURL();
	},
	initObject : function() {
		this.queryCriteria = this.getView().down(
				"#querycriteria");
		this.datachart = this.getView()
		.down("#datachart-panel");
		this.mapPanel = this.getView().down("#mapPanel");

	},
	updateTimer : function(me, value) {
		me.stopTimer(me);
		if (value > 0) {
			me.auto_refersh_interval = setInterval(function() {
				me.refereshReport(me)
			}, value);
		}

	},
	stopTimer : function(me) {
		clearTimeout(me.auto_refersh_interval);
	},
	refereshReport:function(me){
		console.log("refereshReport called");	
		view=this.getView();
		try{
		btn=view.down("#refresh");
		btn.fireEvent('click', btn);
		pagingtoolbar=view.query("pagingtoolbar")[0];
		pagingtoolbar.doRefresh();
		}catch(e)
		{
			clearTimeout(me.auto_refersh_interval)
		}
	},
	renderReport : function(panel, eOpts) {
		me=this;
		if (panel.isPreview == undefined) {
			var response = this
			.syncAjaxPOSTCall(
					this.urlPrefix
					+ '/reportViewController/getReportDetailsById?reportId='
					+ panel.refId, '');
			var rptJSon = Ext.decode(response.response.data);
			panel.reportId = rptJSon.report_id;
			panel.reportJSON = rptJSon.data_json;
			panel.reportJSON["chart_json"] = rptJSon.chart_json;
			
			
			if(rptJSon.hasOwnProperty("advanceConfigJson")){
				if(rptJSon.advanceConfigJson.hasOwnProperty("auto_refersh") && rptJSon.advanceConfigJson.auto_refersh=="on" && rptJSon.advanceConfigJson.interval>0){						
					me.auto_refersh_interval=setInterval(function () {me.refereshReport(me)}, rptJSon.advanceConfigJson.interval);		
				}
				panel.reportJSON["advanceConfigJson"]=rptJSon.advanceConfigJson;
			}
		} else {
			this.isRad = 1;
			this.setRestURL();
		}
		this.reportWidgets=panel.reportWidgets;
		var qcRegion='west';
		var tblwidth=this.getQueryPanelWidth(panel.reportJSON );
		if(panel.reportJSON.qcPosition != undefined)
			qcRegion=panel.reportJSON.qcPosition;
		if (panel.reportJSON.displayType == "1") {
			if(qcRegion =="west"){
				panel.add([{
					collapsed:qcRegion =="west"?true:false,
							region : 'west',
							layout:qcRegion =="west"?{
								type: 'anchor'}:{
									type: 'table',
									columns: 4,tableAttrs: {
										style: {
											width: tblwidth+'%'
										}
									}
								},
								margin :qcRegion =="west"?"5 0 0 5":"0 0 0 0", 
										xtype : 'querycriteria'
				},{bodyStyle : 'background:#D8D8D8',margin:'2 0 2 0',region:"north",width:"100%",title:panel.reportJSON.report_name,height:30,tools:this.getHeaders(panel.reportJSON)}, {
					region : 'center',
					autoScroll:true,
					items:[{itemId : 'datachart-panel',
						margin : "0 0 5 0",
						xtype : 'datachart-panel'}],
				}]);
			}else{
				panel.add({bodyStyle : 'background:#D8D8D8',margin:'2 0 2 0',region:"north",width:"100%",title:panel.reportJSON.report_name,height:30,tools:this.getHeaders(panel.reportJSON)}, 
						{
					region : 'center',
					autoScroll:true,
					width:"100%",
					items:[{
						xtype : 'querycriteria',
						collapsed:qcRegion =="west"?true:false,
								width:"100%",
								border:5,
								border:true,
								layout:qcRegion =="west"?{
									type: 'anchor'}:{
										type: 'table',
										columns: 4,tableAttrs: {
											style: {
												border:5,
												width: tblwidth+'%'
											}
										}
									},
									margin :qcRegion =="west"?"5 0 0 5":"0 0 0 0"


					},{itemId : 'datachart-panel',
						margin : "0 0 5 0",
						xtype : 'datachart-panel'}],
						});
			}
		} else {
			panel.add({bodyStyle : 'background:#D8D8D8',region:"north",margin:'2 0 2 0',width:"100%",title:panel.reportJSON.report_name,height:30,tools:this.getHeaders(panel.reportJSON)},{
				region : qcRegion,
				collapsed:qcRegion =="west"?true:false,
						layout:qcRegion =="west"?{
							type: 'anchor'}:{
								type: 'table',
								columns: 4,tableAttrs: {
									style: {
										width: tblwidth+'%'
									}
								}
							},	
							margin :qcRegion =="west"?"0 0 0 5":"0 0 0 0", 
									xtype : 'querycriteria'
			}, {
				region : 'center',
				margin : "0 0 0 0",
				itemId : 'datachart-panel',
				xtype : 'datachart-tabpanel'
			});
		}
		//add action button if configuration is available  then
		if(panel.reportJSON.actionbutton != undefined && panel.reportJSON.actionbutton.length>0){
			this.setClickEvent(panel.reportJSON.actionbutton);
			panel.addDocked({ xtype: 'toolbar',
				dock: 'bottom',
				items:panel.reportJSON.actionbutton});
		}
		this.initObject();
		var reportJSON = panel.reportJSON;
		try{
			// Load Query Criteria detaisl
			this.queryCriteria.controller.loadData(reportJSON);
			this.datachart.controller.loadData(reportJSON)
		}catch(e){

		}
	},
	getQueryPanelWidth:function(reportJSON){
		if(reportJSON.queryCWidgetU.length < 4 ){
			return 100 - Math.ceil(100/reportJSON.queryCWidgetU.length); 
		}else{
			return 100;
		}
	},
	getHeaders:function(reportJSON){
		var qcxtypes=Ext.Array.pluck(reportJSON.queryCWidgetU,"xtype");
		var tools=[];
		if(qcxtypes.indexOf("daterange")>-1){
			tools=[{xtype:"button",text:"This Week",daterangevalue:"thisweek",margin:"0 3 0 0"},{xtype:"button",text:"This Month",daterangevalue:"thismonth",margin:"0 3 0 0"},{xtype:"button",text:"Last 3 Months",daterangevalue:"last3month",margin:"0 3 0 0"},{xtype:"button",text:"Last 6 Months",daterangevalue:"last6month",margin:"0 3 0 0"},{xtype:"button",text:"This Year",daterangevalue:"thisyear",margin:"0 3 0 0"},];
		}
		/*tools.push({
							xtype : 'ratingField',
							itemId:'chartcolumnlayout',
							hidden:false,
							RatingFieldTypeid : 'rating',
							numberOfStars : 6,
							tooltip : 'Choose columns',
							defaultHeightToReduce : 1,
							defaultWidthToReduce : 60,
							minLength : 1,
							value : 1,
							allowBlank : false,
							listeners : {
								change : 'resizeCharts'
							}
						});*/
		return tools;
	},
	setClickEvent:function(buttons){
		buttons.forEach(function(item) {
			item.listeners = {
					click : this.actionbuttonClick,
					scope : this
			};
		}, this);
	},
	syncAjaxPOSTCall : function(url, data) {
		// debugger;
		// Define function to perform synchronous requests to
		// get model data
		var request = ((window.XMLHttpRequest) ? new XMLHttpRequest()
		: new ActiveXObject("Microsoft.XMLHTTP"));
		request.open("POST", url, false); // <-- false makes
		// it a synchonous
		// request!
		request.setRequestHeader("Content-type",
				"application/json", "application/xml");
		request.send(Ext.encode(data));

		// request.send(null);
		return Ext.decode(request.responseText);
	},
	syncAjaxGETCall : function(url, data) {
		// debugger;
		// Define function to perform synchronous requests to
		// get model data
		var request = ((window.XMLHttpRequest) ? new XMLHttpRequest()
		: new ActiveXObject("Microsoft.XMLHTTP"));
		request.open("GET", url, false); // <-- false makes
		// it a synchonous
		// request!
		request.setRequestHeader("Content-type",
				"application/json", "application/xml");
		try {
			request.send(data.length > 0 ? "" : Ext
					.encode(data));
		} catch (ex) {
			return null;
		}
		if (request.status == 404)
			return null;
		// request.send(null);
		return Ext.decode(request.responseText);
	},
	setRestURL : function() {
		if (this.isRad == 1) {
			this.restURL = "/secure";
			// this.restURL="secure/buzzorapp";
			this.gridurl = "secure/queryExecutor/getDataInRad";
			this.chartdataurl = "secure/reportViewController/getChartDataInRad";
			this.urlPrefix = "secure";
			this.excelDownloaSdurl="secure/reportViewController/getChartDataInRad";
			this.mapurl = "secure/reportViewController/getMapData";
		} else {
			this.restURL = "secure";
			this.gridurl = "secure/queryExecutor/getData";
			this.chartdataurl = "secure/reportViewController/getChartData";
			this.urlPrefix = "secure";
			this.excelDownloaSdurl="secure/reportViewController/excelSinglePage";
			this.excelDownloadAll="secure/reportViewController/excelAllPage";
			this.mapurl = "secure/reportViewController/getMapData";
		}
	},
	/*
	 * used to load data point in panel called from both layout
	 * panel & tab layout
	 */
	loadDataPoints : function(datapoints, datapointpanel) {
		var datapointlist = [];
		var chartpoints = [];
		this.chartpoint = this.getView().down("#chartpoint");

		for (var x = 0; x < datapoints.length; x++) {
			/*
			 * check if type of data point if the type is chart
			 * then set chatjson that used in data point widget
			 * to create chart point
			 * 
			 */
			if (datapoints[x].hasOwnProperty("type")
					&& datapoints[x].type.toLowerCase() == 'chart') {
				for(var x1=0;x1<datapoints[x].chartJson.length;x1++){
					chartpoints.push({
						chartJSON : datapoints[x].chartJson[x1]
					});
				}
			} else {
				datapointlist = datapointlist
				.concat(datapoints[x].value);
				/*
				 * datapointlist .push({ description :
				 * datapoints[x].label, statistic :
				 * datapoints[x].value, })
				 */
			}
		}

		/*
		 * calculate width of datapoint which will adjust in one
		 * row
		 */
		var defaulw = 100 - (datapointlist.length - 3);
		var width = 95 / datapointlist.length;
		width = width - 0.1;
		for (var x = 0; x < datapointlist.length; x++) {
			datapointlist[x]["width"] = width + "%";
		}
		datapointpanel.setData(datapointlist);
		if (chartpoints.length > 0) {
			this.chartpoint.controller
			.loadChartPoints(chartpoints);
		}
	},
	/*
	 * this method is used to prepare Grid parameter
	 */
	getGridParams : function(queryCriteria, sqlId) {
		var params = {
				sqlId : sqlId,
				queryCriteria : queryCriteria
		};
		if (this.isRad == 1) {
			params["queryInfo"] = {
					jpqlQuery : this.getView().reportJSON.jpqlQuery,
					queryJSON : this.getView().reportJSON.queryJson
			};
		}
		return params;
	},
	/*
	 * This method return grid Store
	 */
	getGridStore : function(sqlId, sorters, queryCriteria) {
		var params = this.getGridParams(queryCriteria, sqlId);
		var modelname=this.getView().id+'-gridmodel';
		Ext.define(modelname, {
			extend: 'Ext.data.Model',
			//   idProperty: 'requestId',
			fields:this.getView().reportJSON.gridmodel})
			return new Ext.create(
					'Ext.data.Store',
					{
						model:modelname,
						async : false,
						autoLoad : true,
						pageSize : this.getView().reportJSON.pageSize!=undefined?this.getView().reportJSON.pageSize:20,
								queryId : sqlId,
								data : [],
								groupField : this.getView().reportJSON.summaryGroups != undefined
								&& this.getView().reportJSON.summaryGroups.length > 0 ? this
										.getView().reportJSON.summaryGroups[0]
								: "",
								sorters : sorters.length > 0 ? sorters : [],
										proxy : {
											type : 'modifiedproxy',
											url : this.gridurl,
											actionMethods : {
												create : 'POST',
												read : 'POST',
												update : 'POST',
												destroy : 'POST'
											},
											headers : {
												'Content-Type' : 'application/json;application/xml'
											},
											extraParams : params,
											reader : {
												type : 'json',
												rootProperty : 'response.data',
												totalProperty : 'response.total'
											},
											writer : {
												type : 'json'
											}
										}
					});
	},
	/*
	 * This method used to prepare chart data url parameter for
	 * both Panel/Tab Layout
	 */
	getChartDataParams : function(queryCriteria) {
		var params = {
				report_id : this.getView().reportId,
				queryCriteria : queryCriteria,
				sqlId : this.getView().reportJSON.sqlId
		};
		if (this.isRad == 1) {
			params["queryInfo"] = {
					jpqlQuery : this.getView().reportJSON.jpqlQuery,
					queryJSON : this.getView().reportJSON.queryJson
			};
			params["charts"] = this.getView().reportJSON.chart_json.length > 0 ? Ext
					.decode(this.getView().reportJSON.chart_json)
					: [];
					params["dataEndPoint"] = this.getView().reportJSON.dataEndPoint.length > 0 ? Ext
							.decode(this.getView().reportJSON.dataEndPoint)
							: [];
		}
		return params;
	},
	/*
	 * This method used to load chart data for both Panel/Tab
	 * Layout
	 * 
	 * @param queryCriteria query criteria @param
	 * panelTabConroller Conroller Object of Panel/Tab - depend
	 * which layout is calling this method
	 */
	loadDataPointChart : function(queryCriteria,
			panelTabConroller) {
		var params1 = this.getChartDataParams(queryCriteria);
		Ext.Ajax
		.request({
			url : this.chartdataurl,
			method : 'POST',
			scope : panelTabConroller,
			jsonData : Ext.encode(params1),
			params : {},
			success : function(response, currentObject,
					options) {
				debugger;
				var data = Ext
				.decode(response.responseText).response.data;
				if (data != undefined
						&& data.charts != undefined) {
					if(currentObject.scope.chartView!=null)
						currentObject.scope.chartView.controller.loadCharts(data.charts);
				}
				if (data != undefined
						&& data.datapoints != undefined) {
					currentObject.scope.reportViewController
					.loadDataPoints(
							data.datapoints,
							currentObject.scope.datapoint
							.down("#dataPointPanelId"));
				}
			},
			failure : function() {
				Ext.Msg.alert('Error',
						'Cannot connect to server');
			}
		});

	},

	/*
	 * Used to Load Grid Data 1) Create Grid Store 2) set href
	 * column logic if the drill down report is set for
	 * particular column 3) create Paginatin of grid
	 * 
	 * This method is used for Both Panel and Tab Layout
	 */
	loadGridData : function(queryCriteria, datagrid, scope) {
		var gridStore = this.getGridStore(
				scope.reportJSON.sqlId, [], queryCriteria);
		this.setHrefToColumns(scope.reportJSON.gridColumns);
		this.addToolbartoGrid(datagrid,gridStore);
		datagrid.reconfigure(gridStore,
				scope.reportJSON.gridColumns);
		datagrid.controller.reportView = scope.reportView;
		datagrid.controller.initObjects();

	},
	/*
	 * Used to get Excel Button on grid
	 */
	addToolbartoGrid:function(grid,gridStore){
		var paging =this.getGridPaging(gridStore);
		var excelbutton=this.getExcelButton();
		var toolbar = Ext.create('Ext.toolbar.Toolbar', {
			dock:'bottom',
			items: [paging, '->', excelbutton/*,refreshButton*/]
		});
		grid.addDocked(toolbar)
	},
	getGridPaging:function(gridStore){
		return {
			xtype : 'pagingtoolbar',
			store : gridStore,
			displayInfo : true,
			controllScope:this,
			dock : 'bottom',
			displayMsg : 'Displaying {0} - {1} of {2}',
			doRefresh : function(){
				this.controllScope.refreshDataChart();
				// Keep or remove these code
				var me = this,
				current = me.store.currentPage;

				if (me.fireEvent('beforechange', me, current) !== false) {
					me.store.loadPage(current);
				}
			}

		};
	},
	getExcelButton:function(){
		return Ext.create('Ext.button.Split',{
			tooltip: 'Excel Download',
			icon: 'images/rpticon/excel.gif',
			scope:this,
			handler: 'downloadSinglePageD',
			menu: [
			       {
			    	   text: 'Current',
			    	   icon: 'images/rpticon/excel.gif',
			    	   listeners:{click:this.downloadSinglePage,

			    	   }
			       },
			       {
			    	   text: 'All',
			    	   icon: 'images/rpticon/excel.gif',
			    	   listeners:{
			    		   click:this.downloadAllPage,

			    	   }
			       }
			       ]
		});
	},
	/*
	 * used to refresh report 
	 */
	refreshDataChart:function(){
		var queryCriteria = [];
		this.getQueryCriteria(queryCriteria);
		this.loadDataPointChart(queryCriteria,this.datachart.controller);
	},
	/*
	 * used to set href function if the drill down is set to
	 * column
	 */
	setHrefToColumns : function(columns) {
		columns.forEach(function(item) {
			if (item.href == true) {
				item.renderer = this.hrefRenderer
			}
			if (item.columns != undefined) {
				this.setHrefToColumns(item.columns);
			}
			if(item.summaryCaption != undefined && item.summaryCaption.length>0){
				item.summaryRenderer=function(value, summaryData, dataIndex){
					debugger;
					return eval(item.summaryCaption) ;
				}
			}
		}, this);
	},
	/*
	 * this method used to set column value as link in case of
	 * drill down report
	 */
	hrefRenderer : function(value, metaData, record, row, col,
			store, gridView) {
		myURL = '';
		if (value !== '') {
			myURL = '<a href="javascript:void(0);">' + value
			+ '</a>'
		}
		return myURL;
	},
	/*
	 * 
	 * this method isused to disable query criteria when the
	 * report is drill down
	 */
	disableQCValues : function() {
		this.queryCriteria.hide();
		Ext.Array.each(this.queryCriteria.items.items,
				function(item, ind, items) {
			item.setDisabled(true);
		}, {
			scope : this
		});
		this.queryCriteria.down("#btnClear").setDisabled(true);
		this.queryCriteria.down("#btnSearch").setDisabled(true);

	},
	/* com.athena.report.utils.ChartErrorScatterJSONConverter left - Query tab on Left side or Query panel above data panel
	 * Used to Load Query Criteria Data 1) Load Widget 2)merge
	 * query criteria + drill down Parameter if the report is
	 * drilled report to execute grid with default value
	 * 
	 * This method is used for Both Panel and Tab Layout
	 * 
	 */
	loadQueryCriteria : function() {
		var queryCriteria = [];
		this.getQueryCriteria(queryCriteria);
		if (this.getView().rptHrefQC != undefined) {
			var hrefqc=this.getView().rptHrefQC;
			var qcfilter=[];
			for(var x=0;x<queryCriteria.length;x++){
				var match=false;
				for(var x1=0;x1<hrefqc.length;x1++){
					if(hrefqc[x1].name == queryCriteria[x].name){
						match=true;
						break;
					}
				}
				if(match == false){
					qcfilter.push(queryCriteria[x]);
				}
			}
			queryCriteria = Ext.Array.merge(qcfilter, this
					.getView().rptHrefQC);

		}
		if (this.getView().drilled != undefined
				&& this.getView().drilled == true) {
			this.disableQCValues();
		}
		return queryCriteria;
	},

	getQueryCriteria : function(qc) {
		Ext.Array.each(this.queryCriteria.items.items,
				function(item, idx, items) {
			var val;
			if (item.xtype == "adatepickerfield"
					|| item.xtype == 'datefield') {
				/*
				 * val =
				 * Ext.Date.format(item.getValue(),
				 * Ext.Date.defaultFormat);
				 */
				val = item.getValue() != null ? item
						.getValue().getTime() : item
						.getValue();
						this.filterCondition.push({
							name : item.name,
							fromui:true,
							label:item.getFieldLabel(),
							datatype : item.datatype,
							value : val
						});
			} else if(item.xtype == "daterange") {
				debugger;
				this.filterCondition.push({
					name : item.toname,
					fromui:true,
					label:"From Date",
					datatype : item.fromdatatype,
					dispValue:new Date(item.getFromDate()),
					value : item.getToDate()
				});
				this.filterCondition.push({
					name : item.fromname,
					fromui:true,
					label:"To Date",
					datatype : item.todatatype,
					dispValue:new Date(item.getToDate()),
					value : item.getFromDate()
				});
			}else{
				val = item.getValue();
				this.filterCondition.push({
					name : item.name,
					label:item.getFieldLabel(),
					fromui:true,
					datatype : item.datatype,
					value : val
				});
			}

		}, {
			filterCondition : qc
		});

	},
	/*
	 * This method is used to filter grid/chart data in click of
	 * search button
	 */
	filterData : function(datagrid, scope) {
		var queryCriteria = [];
		this.getQueryCriteria(queryCriteria);
		var store = datagrid.getStore();
		store.getProxy().extraParams = this.getGridParams(
				queryCriteria, this.getView().reportJSON.sqlId);

		// load chart data
		this.loadDataPointChart(queryCriteria, scope);
		this.setReportDetails();
		store.load();
	},
	setReportDetails : function() {
		this.reportQCList = [];
	},
	/*
	 * This method used to get Data Grid or Summary Grid Object
	 * based on settiting for both Panel and Tab Layout
	 */
	getDataGrid : function() {
		var grid = {
				margin : "0 0 0 0",
				xtype : 'data-grid-view',
				title:this.getView().title,
				autoScroll : true,
				region : "center",
				viewConfig: {
					/// stripeRows: true
				}
		};
		if (this.getView().reportJSON.isSummaryGrid != undefined
				&& this.getView().reportJSON.isSummaryGrid == 1) {

			if (this.getView().reportJSON.summaryGroups != undefined
					&& this.getView().reportJSON.summaryGroups.length > 0) {

				grid.features= [ {
					id : 'group',
					ftype : 'groupingsummary',
					groupHeaderTpl : '{name}',
					hideGroupedHeader : true,
					enableGroupingMenu : false
				},{
					ftype: 'summary'
				}]; 		
				grid.split = true;
				grid. columnLines= true;
			}

		}
		return grid

	},
	/*
	 * USed to call action button click event for service call of action button
	 */
	actionbuttonClick:function(btn){

		this.datachart.controller.datagrid.getStore().filter("checkcol",true);
		var seleStore=this.datachart.controller.datagrid.getStore();
		if(seleStore.data.length>0){
			var data=this.formatStoreData(seleStore);
			this.callActionButtonService(btn.serviceUrl,btn.urlMethod,data);
		}
		this.datachart.controller.datagrid.getStore().clearFilter();
	},
	formatStoreData:function(store){
		var data = [];
		Ext.Array.each(store.data.items, function(item) {
			var keys = Ext.Object.getKeys(item.data);
			var d = {};
			for (var x = 0; x < keys.length; x++) {
				//remove extra keys from data object
				if (keys[x] != "id" || keys[x] != "dataType" || keys[x] != "dateLongValue") {
					d[keys[x]] = item.data[keys[x]];
				}
			}
			data.push(d);
		}, {
			data : data
		});
		return data;
	},
	callActionButtonService:function(url,actionmethod,data){
		Ext.getBody().mask('loading...');
		Ext.Ajax
		.request({
			url : this.restURL+url,
			method : actionmethod,
			scope : this,
			jsonData : Ext.encode(data),
			params : {},
			success : function(response, currentObject,
					options) {
				Ext.Msg.alert('Info',
						'Operation Done Successfully!');

				currentObject.scope.refresh();
				Ext.getBody().unmask();
			},
			failure : function() {
				Ext.Msg.alert('Error',
				'Cannot connect to server');
				Ext.getBody().unmask();
			}
		});
	},
	refresh:function(){
		this.datachart.controller.refreshData();
	},	
	downloadSinglePage:function(){
		var controller=this.up().up().scope
		controller.downloadSinglSheet(controller);
	},
	downloadSinglSheet:function(controller){
		var params = controller.datachart.controller.datagrid.getStore().getProxy().extraParams;
		if(controller.getView().reportJSON.summaryGroups != undefined
				&& controller.getView().reportJSON.summaryGroups.length > 0){
			params["rowgrouping"]= controller
			.getView().reportJSON.summaryGroups[0];
		}else{
			params["rowgrouping"]= "";
		}
		params["columnsHeader"]=controller.getView().reportJSON.gridColumns;
		params["title"]=controller.getView().reportJSON.report_name;
		controller.downloadFileform.dom.childNodes[0].value=Ext.encode(params);
		controller.downloadFileform.dom.action = (controller.excelDownloaSdurl);
		controller.downloadFileform.dom.submit();
	},
	downloadSinglePageD:function(){
		this.downloadSinglSheet(this);
	},
	downloadAllPage:function(){
		var controller=this.up().up().scope
		var params = controller.datachart.controller.datagrid.getStore().getProxy().extraParams;
		if(controller.getView().reportJSON.summaryGroups != undefined
				&& controller.getView().reportJSON.summaryGroups.length > 0){
			params["rowgrouping"]= controller
			.getView().reportJSON.summaryGroups[0];
		}else{
			params["rowgrouping"]= "";
		}
		params["columnsHeader"]=controller.getView().reportJSON.gridColumns;
		params["title"]=controller.getView().reportJSON.report_name;
		controller.downloadFileform.dom.childNodes[0].value=Ext.encode(params);
		controller.downloadFileform.dom.action = (controller.excelDownloadAll);
		controller.downloadFileform.dom.submit();
	},
	filterdaterangedata:function(btn){
		debugger;
		if(btn.hasOwnProperty("daterangevalue") ){
			//date radio is checked when clicked on filter buttons
			this.queryCriteria.down('#defaultsDate').getEl().dom.getElementsByTagName("input")[0].checked=true;

			var defaultDate=this.getView().down("#defaultsDate");
			if(defaultDate!=null){
				defaultDate.setValue(btn.daterangevalue);
				this.datachart.controller.filterData();
			}

		}
	},
	loadMap : function(queryCriteria,
			panelTabConroller) {
		debugger;
		me=this;
		panel=this.getView();
		try{
			mapViewProperty = panel.reportJSON["advanceConfigJson"]["mapView"];
			if(mapViewProperty.hasOwnProperty("isMapView") && mapViewProperty.isMapView=="on")
				configData=panel.reportJSON["advanceConfigJson"]["mapView"];
			else
				{
				this.mapController.getView().hide();
				return;
				}
		}
		catch(e){}
		
		/*configData ={"mapSName":"City Map","mapLatColumn":"netSalesAmt","mapLongColumn":"grossSalesAmt","mapDisplayColumn":"distributorName", 					
			"aggregate": [
		                     {
		                         "dfieldList": "distributorName",
		                         "dValueField": "netSalesAmt",
		                         "aggregate": "Sum",
		                         "isGroupBy": true,
		                         "displayName": "distributorName"
		                     },
		                     {
		                         "dfieldList": "distributorName",
		                         "dValueField": "grossSalesAmt",
		                         "aggregate": "Avg",
		                         "isGroupBy": true,
		                         "displayName": "distributorName"
		                     }
		                 ]
		};*/
		var params1 = {
				report_id : this.getView().reportId,
				queryCriteria : queryCriteria,
				sqlId : this.getView().reportJSON.sqlId,
				map : configData
			};
		this.mapController.configData = configData;
		//var params1 = this.getChartDataParams(queryCriteria);
		Ext.Ajax
		.request({
			url : this.mapurl,
			method : 'POST',
			scope : panelTabConroller,
			jsonData : Ext.encode(params1),
			params : {},
			success : function(response, currentObject,
					options) {
				debugger;
				var data = Ext
				.decode(response.responseText).response.data;
				me.mapController.addMarkers(data["mapdata"]);
			},
			failure : function() {
				Ext.Msg.alert('Error',
						'Cannot connect to server');
			}
		});

	}
	

});