Ext.define('Healthsurvey.view.searchengine.search.SearchResult', {
	extend : 'Ext.panel.Panel',
	xtype : 'searchResultTab',
	requires : ['Healthsurvey.view.searchengine.search.ResultPanel'],
	
	layout : {
		
		type : 'fit',
		padding : 5,
	},
	
	items : [{
		xtype : 'resultPanel',
	}/*{	
		xtype : 'tabpanel',		
		layout : {
			
			type : 'fit'
		},
		
	    items : [{
			title : 'Search Result',
			itemId : "results",
			
			items : []
			},{
				itemId : "jsonresult",
				height :'80%',
				autoScroll :true,
				title : 'Json Result',
				html : '<h3>Json result will be shown here..</h3>'
				
		}]
	}*/]
});