/**
 * 
 */
Ext.define("Healthsurvey.view.scheduleconfiguration.tree.ScheduleConfigTree", {
	extend : 'Ext.panel.Panel',
	requires : [ 'Healthsurvey.view.scheduleconfiguration.tree.ScheduleConfigTreeController' ],
	xtype : 'schedulerConfigTreePanel',
	controller : 'schedulerConfigTreeController',
	autoScroll : true,

	items : [ {
		xtype : 'treepanel',
		itemId : 'schedulerConfigTree',
		useArrows : true,
		animate : true,
		allowDeselect : false,
		currentRecord : null,
		autoScroll : true,
		rootVisible : true,
		root : null,
		loadMask : true,
		checked : false,
		folderSort : true,
		emptyText : 'Schedule config not available!',
		waitMsg : 'Loading Schedules...',
		store : {
			root : {
				text : 'Schedules',
				expanded : true,
				icon : 'images/folder-database-icon.png',
				children : []
			},
			sorters : [ {
				property : 'text',
				direction : 'ASC'
			} ]
		},
		listeners : {
			itemdblclick : 'onItemClick',
			itemClick : 'onItemClick'
		}
	} ]
});