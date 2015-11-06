
Ext.define('Healthsurvey.view.chartbuilder.rightpanel.RightPanelView', {
	extend : 'Ext.panel.Panel',
	requires:[
	          'Ext.grid.property.Grid',
	          'Healthsurvey.view.chartbuilder.templates.TemplateTreePanelView',
	          'Healthsurvey.view.chartbuilder.rightpanel.RightPanelController',
	          'Healthsurvey.view.chartbuilder.templates.TemplateTreePanelController'    
	          ],
	controller: 'rightpanelcontroller',
	title : 'Chart Properties',
	region : 'east',
	xtype : 'right-panel',
	width : '25%',
	titleCollapse : true,
	split: true,
	autoScroll:true,
	collapsible: true,
	collapsed: false,
	itemId:'rightpanel',
	obj:this,
	rightPropJson:'',
	layout:
	{
		type: 'accordion',
		animate: true
	},
	listeners:{
		scope:'controller',
		afterrender:'afterRender'
	},
	items:[
	      {
	    	   title:'Data Configuration',
	    	   xtype:'panel',
	    	   itemId:'gridFieldPanel',
	    	   layout:'anchor',
	    	   bodyPadding:'8',
	    	   autoScroll:true
	      },	       
 	      {
			title : 'Basic Properties',
			xtype : "propertygrid",
			itemId : 'propertyGrid',
			source : {},
			grouping: false,
            autoFitColumns: true,
            nameColumnWidth:"50%",
            viewConfig: {
            	forceFit: true,
            	scrollOffset: 0
            },
			listeners:{
				afterRender:function(){
					this.setTitle("Basic Properties");	
				},
				propertychange:'onPropertyClick',
			}
			//sourceConfig:{dataFormat:{editor:{xtype: 'displayfield'}//readOnly }}
			//renderTo:Ext.getBody(),	
		},
		{
			title: 'Advanced Properties',
			xtype:"propertygrid",
			itemId:'advPropertyGrid',
			source: {},
		    grouping: false,
            autoFitColumns: true,
            nameColumnWidth:"60%",
		    autoScroll:true,
		    listeners:{
				afterRender:function(){
					debugger;
					this.setTitle("Advanced Properties");	
				},			
				propertychange:'onPropertyClick',			
		    }// listeners ends	   
		},// advance property ends
		{
			xtype:'templateview',
			title:'Templates'			
		}
		],//items ends
		
});

	