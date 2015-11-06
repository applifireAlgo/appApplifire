Ext.define('Healthsurvey.view.fw.DataPointPanel',{
	extend : 'Ext.panel.Panel',
	xtype: 'dataPointPanel',
	cls: 'kpi-main',
	dpData : [],
	border:2,
	requires: ['Healthsurvey.view.fw.DataPointPanelController'],
	
	controller:'dataPointPanelController',
	
	items: [{
        xtype: 'component',
        itemId:'dataPointPanelId', 
      //  cls: 'kpi-tiles',

        tpl: [
            '<div class="kpi-meta">',
                '<tpl for=".">',
                    '<span style="width:{width};" >',
                        '<div >{statistic}</div> {description}',
                    '</span>',
                '</tpl>',
            '</div>'
        ],

        
	}]
});