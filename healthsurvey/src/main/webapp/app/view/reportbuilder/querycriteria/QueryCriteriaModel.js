Ext.define('Healthsurvey.view.reportbuilder.querycriteria.QueryCriteriaModel',
{
	extend : 'Ext.app.ViewModel',
	
	alias : 'viewmodel.queryCriteriaModel',

	requires:[],
	
	data : 
	{
		rec : null
	},
	
	stores : 
	{
		ServiceStore : {
			fields : [ 'id', 'name','jsonData'],
			data : []
		},
		ServiceOpStore : {
			fields : [ 'id', 'name','jsonData'],
			data : []
		},
		WidgetStore:{
			fields : [ {
				name : 'widget_xtype',
				type : 'string'
			}, {
				name : 'widget_name',
				type : 'string'
			} ],
			data:[
			      {widget_xtype:"textfield",widget_name:"TextBox"},
			      {widget_xtype:"combobox",widget_name:"ComboBox"},
			      {widget_xtype:"datefield",widget_name:"Date"},
			      {widget_xtype:"timefield",widget_name:"Time"},
			      {widget_xtype:"numberfield",widget_name:"Number"},
			      {widget_xtype:"daterangefrom",widget_name:"Date Range From"},
			      {widget_xtype:"daterangeto",widget_name:"Date Range To"}
			]
		}
	}	

});