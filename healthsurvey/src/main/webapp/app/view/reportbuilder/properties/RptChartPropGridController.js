Ext.define('Healthsurvey.view.reportbuilder.properties.RptChartPropGridController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.chartPropCtrll',
    rptBuilderTab:null,
    
    afterChartPropGridRender:function(grid) 
	{
		this.rptBuilderTab=grid.up().up().up();
		
		grid.reconfigure(this.getChartPropGridStore());
		
		if(this.rptBuilderTab.isEdit!=null && this.rptBuilderTab.isEdit==true)
		{
			grid.getStore().loadData(this.rptBuilderTab.editJSON.chart_properties,true);
			grid.up().down("#chartColumns").setValue(this.rptBuilderTab.defaultCColumn);
		}
	},
	getChartPropGridStore : function()
	{
		return Ext.create('Ext.data.Store', {
			fields : [	'chartId',
			          	'chartTitle',
			          	'chartType',
			          	'chartJson'
			         ],
			data : []
		});
	},
	
	onAddChartClick:function(btn)
	{
		debugger;
		var chart = this.rptBuilderTab.query("[tabId=chart-config]")[0];
		this.rptBuilderTab.setActiveTab(chart);
		chart.down('#left-panel').controller.chartMode=null;
		chart.controller.onResetClick();
	},
	onDeleteRowClick : function(grid, rowIndex)
	{
		grid.getStore().removeAt(rowIndex);
	},
	
	editItemdblclick:function( th, record, item, index, e, eOpts )
	{
		debugger;
		var chartConfTab=this.rptBuilderTab.down("#chart-main-view");
		this.rptBuilderTab.setActiveTab(chartConfTab);
		chartConfTab.down('#left-panel').controller.chartMode="edit";
		chartConfTab.down('#left-panel').controller.setDataConfig=true;
		chartConfTab.down('#left-panel').controller.chartRowIndex=index;
		chartConfTab.down('#left-panel').controller.onEditChart(record.data);
	}
});