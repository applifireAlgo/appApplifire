Ext.define('Healthsurvey.view.chartbuilder.chartjsonsource.ChartJsonSourceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chart-json-source-controller',
    requires:[],
    chartMainView :null,
	chartMainCtrl : null,
	chartSourceView:null,
	
    init : function(){
    	this.initChartController();
    },
    
    initChartController:function()
    {
    	debugger;
	   	var chartMainView = this.getView().up().up();
	  	this.chartMainView = chartMainView;
	  	this.chartMainCtrl = chartMainView.controller;
	  	this.chartSourceView = this.getView();
	  	this.chartMainCtrl.chartSourceCtrl = this;
    },
    
    showChartSource:function()
    {
    
    	debugger;
    	var chartPanel=this.chartMainView.down('#chartPanel');
    	var jsonSource=chartPanel.jsonObject;
    	
    	var chartSource=this.chartSourceView.down('#chartSource'); 	
    	var chartSourcePanel = this.chartSourceView.down('#chartSourcePanel');
    	var noSourcePanel = this.chartSourceView.down('#noSourcePanel');
    	
    	if(jsonSource !="")
    	{
    		var jsonString=JSON.stringify(jsonSource,null, "\t"); // Indented with tab	
    		
    		chartSourcePanel.setHidden(false);
    		noSourcePanel.setHidden(true);
    		
    		chartSource.setHtml('<pre class="brush :js">'+jsonString+'</pre>');
    		
    		SyntaxHighlighter.autoloader('js resources/syntaxhighlighter/shBrushJScript.js');
    		SyntaxHighlighter.config.strings.aboutDialog = jsonString;
    		SyntaxHighlighter.config.strings.help = '{}';
    		SyntaxHighlighter.all();
    	}
    	else
    	{
    		chartSourcePanel.setHidden(true);
    		noSourcePanel.setHidden(false);
    	} 	
    }
    
});