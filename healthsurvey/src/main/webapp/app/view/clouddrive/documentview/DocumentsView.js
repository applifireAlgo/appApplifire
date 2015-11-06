Ext.define("Healthsurvey.view.clouddrive.documentview.DocumentsView",{
	extend : 'Ext.panel.Panel',
	requires : [ 'Healthsurvey.view.clouddrive.documentview.DocumentsViewController' ],
	controller : 'documentview',
	xtype : 'documentsview',
	itemId : 'documentsview',
	flex : 2,
	autoScroll : true,
	border : 0,
	items : [{
		xtype : 'dataview',
		itemId : 'docsDataView',
		flex : 1,
		tpl : [
		       '<tpl for=".">',
		       '<div class="dataview-multisort-item"  style="float :left;margin-left: 15px;">',
		       '<img width=70 height=70 src="images/{image}" />',
		       '<h3 title="{text}"><center>{displayText}</center></h3>',
		       '</div>', '</tpl>' ],
		multiSelect : true,
		height : 310,
		trackOver : true,
		overItemCls : 'x-item-over',
		itemSelector : 'div.dataview-multisort-item',
		emptyText : 'No images to display',
		// store : dataviewStore,
		listeners : {
			click : {
				fn : this.onClick,
				scope : this
			},
			"itemdblclick" : 'itemdblclick',
			"itemcontextmenu" :'itemcontextmenu' 
		}
		}],
		/*dockedItems : {
				xtype : 'toolbar',
				itemId : 'docnavigation',
				margin : '0 0 0 0',
				cls : 'mytoolbar',
				// overlay: true,
				style : 'opacity: .7;',
				//width : 620,
				items : []
		},*/
		listeners:{
			scope:'controller',
			afterrender:'loadData'
		}
});