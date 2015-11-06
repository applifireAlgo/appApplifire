Ext.define('Healthsurvey.view.chartbuilder.chartjsonsource.ChartJsonSourceView', {
	
	extend : 'Ext.panel.Panel',
	requires : [ 'Ext.layout.container.Column',
	             'Healthsurvey.view.chartbuilder.chartjsonsource.ChartJsonSourceController'
	           ],
	xtype : 'source-view',
	itemId:'sourceView',
	controller : 'chart-json-source-controller',
	title:'Chart Source',
	autoScroll:true,
	items : [
	         {
				xtype : 'panel',
				itemId :'chartSourcePanel',
				hidden : true,
				layout : {
					type : 'fit',
					align : 'left',
				},
				items :[{
							itemId : 'chartSource',
							html : 'Chart Builder Source',
							style : 'background:#f2f2f2;'
					
				}]
	         },
	         {
				xtype : 'panel',
				itemId :'noSourcePanel',
				hidden : false,
				layout : {
					type : 'vbox',
					align : 'center',
			},
			items :[ {
						xtype : 'image',
						itemId : 'chartSourceIcon',
						src : 'images/code.png',
						height : 150,
						width : 150,
						margin : '150 0 0 0'
					 }, 
					 {
						itemId : 'chartSource',
						html : 'Source not available.Draw charts to see source.',
						style : 'background:#f2f2f2;'
					 }
			]
	}]
});