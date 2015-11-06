Ext.define('Healthsurvey.view.reportbuilder.sql.SqlListPanelView', {
	extend : 'Ext.tree.Panel',
	requires:['Healthsurvey.view.reportbuilder.sql.SqlListPanelController'],
	controller: 'sqlcontroller',
	xtype : 'sql-panel',
	title:'Report Queries',
	titleCollapse : true,
	split: true,
	rootVisible:false,
	useArrows: true,
	//lines:true,
	//autoScroll:true,
	collapsed: false,
	itemId:'sql-tree-panel',
	width:'15%',
	collapsible : true, // make collapsible
	listeners:{
		scope:'controller',
		load:'onSqlTreeLoad',
		itemClick:'onItemClick'
	}
});