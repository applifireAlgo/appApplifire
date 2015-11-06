Ext.define('Healthsurvey.view.chartbuilder.leftpanel.LeftPanelView', {
		extend : 'Ext.panel.Panel',
		requires: ['Healthsurvey.view.chartbuilder.leftpanel.LeftPanelController',
		           'Ext.tree.Panel'
		           ],
		controller:'leftpanelcontroller',
		title : 'Chart Categories',
		region : 'west',
		itemId:'left-panel',
		alias:'widget.left-panel',
		width :'20%',
		titleCollapse : true,
		split: true,
		collapsible: true,
		collapsed: false,
		tbar:[{
	    	  xtype: 'radiogroup',
	    	  //fieldLabel:'',
	    	  margin:'0,4,0,4',
	    	  itemId:'chartRadioField',
	    	  items: [
	    	          { boxLabel: 'Chart', name: 'chart-radio', inputValue: '0', checked: true },
	    	          { boxLabel: 'Chart Point', name: 'chart-radio', inputValue: '1'}
	    	  ],
	    	  listeners:{
	    		  change:'onRadioBtnChange'
	    	  }
		}],
		layout:
		{
			type: 'accordion',
			animate: true
		},
		items:[
		       {
		    	   xtype:'treepanel',
		    	   title:'Charts',
		    	   rootVisible : false,
		    	   useArrows: true,
		    	   itemId:'chart-tree-panel',
		    	   //lines:true,
		    	   listeners: {
		    		   		select:'onSelect',
		    				afterrender:'onChartTreeLoad'
		    		}
		       },   
		       {
		    	   xtype:'treepanel',
		    	   title:'Maps',
		    	   itemId:'map-tree-panel',
		    	   rootVisible : false,
		    	   useArrows: true,
		    	   lines:true,
		    	   listeners: {
		    		   		select:'onSelect',
		    				afterrender:'onMapTreeLoad'
		    		}	
		       }
		      ]//panel item ends
	});// define ends