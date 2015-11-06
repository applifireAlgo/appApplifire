Ext.define('Healthsurvey.store.QueryCriteriaWidgetsStore', {
	extend : 'Ext.data.Store',
	autoLoad:true,
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
	      {widget_xtype:"numberfield",widget_name:"Number"}
	     ]
});