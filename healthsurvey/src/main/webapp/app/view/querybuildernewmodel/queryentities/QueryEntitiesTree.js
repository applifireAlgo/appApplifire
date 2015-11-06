Ext.define('Healthsurvey.view.querybuildernewmodel.queryentities.QueryEntitiesTree', {
	extend : 'Ext.tree.TreePanel',
	requires:['Healthsurvey.view.querybuildernewmodel.queryentities.QueryEntitiesController'],
	controller:'query-entities-tree',
	xtype : 'query-entities-tree',
	useArrows:true,
	rootVisible: false,
	loadMask :true,
	folderSort :true,
	autoSroll : true,
	disabled:true,
	queryBuilder:null,
	emptyText:'Entities not available!',
	sorters: [{
         property: 'text',
         direction: 'DESC'
     }],
	listeners:{
		scope:'controller',
		itemdblclick:'onItemdblclick',
		//render:'initTreeDragZone',
		itemmousedown:'onItemClick',
		afterrender:'getAllEntities'
	},
 
});
