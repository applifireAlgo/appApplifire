Ext.define('Healthsurvey.view.reportui.datachart.chart.ChartController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.chartController',
	reportView : null,
	reportViewController : null,
	reportJSON : null,
	defaultIncHeight:100,
	init : function() {
		this.control({
            "button": {
            	click:this.filterdaterangedata,
            },
        });
	},
	initObject : function() {
		this.reportViewController = this.reportView.controller;
		this.reportJSON = this.reportView.reportJSON;
		var clayout=this.getView().down("#chartcolumnlayout");
		if(this.reportJSON != undefined && this.reportJSON.defaultCColumn!=undefined && this.reportJSON.defaultCColumn.toString().length>0){
			clayout.value=this.reportJSON.defaultCColumn;
			clayout.minLength=this.reportJSON.defaultCColumn;
		}
	},
	afterRender:function(){
		if(this.numberofcharts <= 1){
			if(this.getView().down("#chartcolumnlayout")!= null){
				this.getView().down("#chartcolumnlayout").hide();
			}
		}
	},
	loadCharts : function(charts) {
		this.initObject();
		this.getView().removeAll();
		this.numberofcharts=charts.length;
		if(charts.length <= 1){
			if(this.getView().down("#chartcolumnlayout")!= null){
				this.getView().down("#chartcolumnlayout").hide();
			}
		}
		var fusionchart;
		// var charts= this.chartDatas
		if(charts.length > 0)
		{
			for (var x = 0; x < charts.length; x++) {
				if(charts[x].hasOwnProperty("group") && charts[x].group == true){
					this.loadGroupCharts(charts[x].groupCharts,charts[x]);
				}else{
					panel = this.getView().add({
						xtype : "panel",
						title:charts[x].chartTitle,
						height : charts[x].height * 1 +this.defaultIncHeight,
						group:false,
						margin : '5 5 0 0',
						chartJSON : charts[x],
						listeners : {
							afterrender : 'loadfusionchart'
						}
					});
				}
			}
		}
		else
		{
			this.getView().hide();
		}
			
		this.getView().doLayout();
		this.resizeCharts(this.getView().down("#chartcolumnlayout"));
	},
	loadGroupCharts:function(groupcharts,chart){
		var charts=[]
		for (var x = 0; x < groupcharts.length; x++) {
			charts.push({
				xtype : "panel",
				height : groupcharts[x].height * 1,
				scope:this,
				margin : '5 5 0 0',
				chartwidth:this.getView().getWidth()/groupcharts.length,
				chartJSON : groupcharts[x],
				listeners : {
					afterrender :function(panel){
						panel.chartJSON.width=panel.chartwidth;
						var fusionchart = new FusionCharts(panel.chartJSON);
						fusionchart.render(panel.body.id);
					} 
				}
			});
		}
		this.getView().add({
			xtype : "panel",
			margin : '5 5 0 0',
			title:chart.chartTitle,
			bodyStyle : 'background:#D8D8D8',
			group:true,
			scope:this,
			width:"100%",
			layout:{
				type : 'table',
				columns : charts.length
			},
			items : charts		
		});
		this.resizeCharts(this.getView().down("#chartcolumnlayout"));
	},
	loadfusionchart : function(panel) {
		var clayout=this.getView().down("#chartcolumnlayout");
		var newColumns =clayout==null?1:parseInt(clayout.value);
		var chartwidth=this.getView().getWidth()/newColumns;
		panel.chartJSON.width=chartwidth;
		var fusionchart = new FusionCharts(panel.chartJSON);
		fusionchart.render(panel.body.id);
	//	this.resizeCharts(this.getView().down("#chartcolumnlayout"));
	},
	resizeCharts : function(comp, newValue, oldValue, eOpts) {
		var Value = comp.value;
		mainPanel = comp.up().up();
		mainPanel.getLayout().columns = parseInt(Value);
		newColumns = parseInt(Value);
		totalWidth = (mainPanel.getWidth())
		for (var i = 0; i < mainPanel.items.length; i++) {
			var currentPanel = mainPanel.items.items[i];
			if(currentPanel.hasOwnProperty("group") && currentPanel.group == false){
				currentPanel.setWidth(((totalWidth - 2) / newColumns));
			}
			
		}
		for ( var k in FusionCharts.items) {
			debugger;
			fusionObj = FusionCharts.items[k];
			if(fusionObj.args.hasOwnProperty("group") && fusionObj.args.group == true){
			}else{
				var panelbodyId = fusionObj.options.containerElementId;
				if (this.getView().down(
						'#'
								+ panelbodyId.substring(0, panelbodyId
										.indexOf('-body'))) != null) {
					fusionObj.resizeTo(((totalWidth) / newColumns));
				}
			}
		}
		mainPanel.setWidth(totalWidth);

	},
	filterdaterangedata:function(btn){
		debugger;
		if(btn.hasOwnProperty("daterangevalue") ){
			var defaultDate=this.reportView.down("#defaultsDate");
			if(defaultDate!=null){
				defaultDate.setValue(btn.daterangevalue);
				this.reportView.controller.datachart.controller.filterData();
			}
				
		}
	},
	onPanelResize:function(me, width, height, oldWidth, oldHeight, eOpts )
	{
		debugger;
		newColumns=parseInt(me.down("ratingField").value);
		
		for (var i = 0; i < me.items.length; i++) {
				var currentPanel = me.items.items[i];
				if(currentPanel.hasOwnProperty("group") && currentPanel.group == false){
					currentPanel.setWidth(((width - 2) / newColumns));
				}
				
			}

		for ( var k in FusionCharts.items) {
				debugger;
				fusionObj = FusionCharts.items[k];
				if(fusionObj.args.hasOwnProperty("group") && fusionObj.args.group == true){
				}else{
					var panelbodyId = fusionObj.options.containerElementId;
					if (me.down(
							'#'
									+ panelbodyId.substring(0, panelbodyId
											.indexOf('-body'))) != null) {
						fusionObj.resizeTo(((width) / newColumns));
					}
				}
			}
		//alert("Panel Resize Called>>>>>>>>>");
	}
});