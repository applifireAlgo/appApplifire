Ext.define('Healthsurvey.view.art.masterform.MasterTreePanel', {
	extend :'Ext.tree.Panel',
    bodyPadding: 5,
    waitMsgTarget: true,
    xtype : 'masterTreePanel',
    itemId : 'masterTreePanel',
    expanded: true,
    useArrows:true,
	rootVisible: false,
    requires: ['Healthsurvey.view.art.masterform.MasterTreePanelController'],
    
    controller: 'masterTreePanelController',
    tbar:[{
		xtype : 'combo',
		itemId : 'masterTreePanelSearchBox',
		emptyText : "Search",
		width : '100%',
		typeAhead : true,
		collapsed : false,
		queryMode: 'local',
		minChars : 1,
		displayField:'primaryDisplay',
		valueField:'primaryKey',
		listeners:{
			select:'onMasterTreePanelSearchBoxSelect'
		}
	}],
    listeners: {
        itemclick : function( currentObject, record, item, index, e, eOpts){
        	this.getController().setFormPanelData(record);
        	this.getController().setDataActiveTab();
        }
  	}	    
});