Ext.define('Healthsurvey.view.fw.component.Grids',{
	extend:'Ext.grid.Panel',
	xtype:'grids',
	
	getValues:function()
	{
		var data = [];
		var gridStoreData = this.getStore().getData().items;
		if(gridStoreData && gridStoreData.length>0)
		{
			for (var x = 0; x < gridStoreData.length; x++) {
				delete gridStoreData[x].data["id"];
				data.push(gridStoreData[x].data);
			}
		}
		return data;
	},
	
	getValue : function(){
		return this.getValues();
	},
	
	setData : function(data){
		var store = this.store;
		store.setData(data);
	}
});