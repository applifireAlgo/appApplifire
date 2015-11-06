Ext.define('Healthsurvey.view.resource.ResourcePanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'resourcePanel',
	itemId : 'resourcePanel',

	requires : ['Healthsurvey.view.resource.ResourcePanelController'],
	controller : 'resourcePanelController',

	bodyStyle : {
		backgroundColor: "#2f4050"
	},

	autoScroll : true,
	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
	
		style : {
			backgroundColor: "#2f4050"
		},
		
		defaults : {
			width : '100%'
		},
		items: [{
			xtype : 'panel',
			/*bodyCls : 'userDetailsPanelBody',
			cls : 'userDetailsPanel',*/
			
			bodyStyle : {
				backgroundColor: "#2f4050"
			},
			style : {
				borderBottom : 'thin solid #a7b1c2'
			},		
			
			bodyPadding : "30 5 30 5",
					
			items : [{
				xtype : 'image',
				padding : 1,
				width : 60,
				height : 60,
				src : 'resources/css/images/logo.png',
				margin : '0 0 0 20',
				cls : 'logo'
			}, {
				xtype : 'displayfield',
				itemId : 'uNameDisplayfield',
				name : 'uNameDisplayfield',
				fieldCls : 'uName',
				margin : '5 0 0 20',
				width : '100%'
			}]
		}]
	}],
	
	items : [],

	listeners:{
		scope:'controller',
		afterrender:'onResourcePanelAfterRender'
	}

});
