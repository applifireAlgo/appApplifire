/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.tree.LogAlarmTreePanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'logAlarmTreePanel',
	requires : [ 'Healthsurvey.view.logalarm.tree.LogAlarmTreePanelController',
			'Ext.tree.*', 'Ext.data.*','Ext.Action' ],
	controller : 'logAlarmTreePanelController',
	title : 'Log Modules',

	defaults : {
		anchor : '100% 100%',
		margin : 10,
	},
	initComponent : function() {
		var group = this.id + '-ddgroup';
		Ext.apply(this, {

			items : [ {
				xtype : 'treepanel',
				itemId : 'logModuleTree',
				useArrows : false,

				listeners : {
					itemclick : 'onItemClick'
				},
				store : {
					root : {
						text : 'Log Module',
						expanded : true,
						children : []
					},
					folderSort : true,
					sorters : [ {
						property : 'text',
						direction : 'ASC'
					} ]
				},
				viewConfig : {
					plugins : {
						ptype : 'treeviewdragdrop',
						ddGroup : group,
						appendOnly : true,
						sortOnDrop : true,
						containerScroll : true
					},
					listeners : {
						itemcontextmenu : 'onRightClick'
					}
				}
			} ]
		});
		this.callParent();
	},
});