Ext.define('Healthsurvey.view.reportbuilder.properties.SearchConfigView', {
	extend : 'Ext.form.Panel',
	xtype : 'search-config-view',
	requires : [],
	border : true,
	bodyBorder : true,
	collapsible : true,
	collapseDirection : 'bottom',
	autoScroll : true,
	width : "100%",
	layout : {
		type : 'anchor'
	},
	listeners:{
		//scope:'controller',
		afterrender:function()
		{
			rptBuilderTab=this.up().up().up();
			if(rptBuilderTab.hasOwnProperty("editJSON") &&  rptBuilderTab.editJSON != undefined)
				{
						searchJSON=rptBuilderTab.editJSON.searchJson;
					    searchPanel=this;
						if(searchPanel != undefined )
						{
							var totalCheckhox=searchPanel.query("checkboxfield");
							totalCheckhox[0].setValue(searchJSON.hasOwnProperty("isSearch") && searchJSON["isSearch"] =="on"?true:false);
							totalCheckhox[1].setValue(searchJSON.hasOwnProperty("enableCharts") && searchJSON["enableCharts"] =="on"?true:false);
							totalCheckhox[2].setValue(searchJSON.hasOwnProperty("enableGrid") && searchJSON["enableGrid"] =="on"?true:false);
							
							var numberFields=searchPanel.query("numberfield");
							numberFields[0].setValue(searchJSON.hasOwnProperty("hour") && searchJSON["hour"].length>0?parseInt(searchJSON["hour"]):null);
							numberFields[1].setValue(searchJSON.hasOwnProperty("minute") && searchJSON["minute"].length>0?parseInt(searchJSON["minute"]):null);
						}
				}
		}
		
	},
	items : [ {
		boxLabel : 'Enable for Search',
		name : 'isSearch',
		// inputValue : '1',
		xtype : 'checkboxfield'
	}, {
		xtype : 'panel',
		layout : {
			type : 'hbox'
		},
		margin : 2,
		items : [ {
			boxLabel : 'Charts',
			name : 'enableCharts',
			checked : true,
			xtype : 'checkboxfield'
		}, {
			boxLabel : 'Grid',
			name : 'enableGrid',
			xtype : 'checkboxfield'
		} ]
	},

	{
		// Fieldset in Column 1 - collapsible via toggle button
		xtype : 'fieldset',
		columnWidth : 0.5,
		title : 'Delta Indexing Scheduling Parameters',
		collapsible : true,
		defaultType : 'textfield',
		/*
		 * defaults: { anchor: '100%' },
		 */
		layout : 'hbox',
		margin : 2,
		items : [ {
			xtype : 'numberfield',
			fieldLabel : 'Hour',
			labelAlign : 'right',
			name : 'hour',
			labelWidth:30,
			width : 90,
			minValue : 0,
			maxValue : 24
		}, {
			xtype : 'numberfield',
			fieldLabel : 'Minute',
			labelAlign : 'right',
			name : 'minute',
			labelWidth:50,
			width : 110,
			minValue : 1,
			maxValue : 60
		} ]
	} ]

});