Ext.define('Healthsurvey.view.searchengine.search.documentController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.documentController',

	/*init: function (view) {
	       // We provide the updater for the activeState config of our View.
	       view.updateActiveState = this.updateActiveState.bind(this);
	   },*/

	onNewsClick : function(btn, menuitem) {
		var view = this.getView();
		if (menuitem.type == "all") {
			//view.getStore().loadData();
			view.store.getProxy().setData(view.ALLDATA);
			view.store.read();
		} else {
			jsonData = this.findElements(view.ALLDATA, 'file_type',
					menuitem.type);
			
			view.store.getProxy().setData(jsonData);
			view.store.read();
			/*view.getStore().loadData();*/
		}
		// file_type

		// view.setActiveState(menuitem.type);
	},
	findElements : function(arr, propName, propValue) {
		var jsonArray = []
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][propName] == propValue) {
				jsonArray.push(arr[i]);
			}
		}
		return jsonArray;

	},
	renderTitleColumn : function(value, metaData, record) {
		debugger;
		var view = this.getView();
		plugin = view.getPlugin('rowexpander');
		tpl = view.titleTpl;

		if (!tpl.isTemplate) {
			view.titleTpl = tpl = new Ext.XTemplate(tpl);
		}

		var data = Ext.Object.chain(record.data);

		//data.expanded = plugin.recordsExpanded[record.internalId] ? ' style="display: none"'
		//	: '';

		return tpl.apply(data);
	},

	onCompanyClick : function(dv, record, item, index, e) {
		//alert("onCompanyClick");
		/*if (e.getTarget('.news-toggle')) {
			var grid = this.getView(), plugin = grid
					.getPlugin('rowexpander');

			plugin.toggleRow(index, record);
		}*/
	},
	onCompanyExpandBody : function(rowNode) { // , record, expandRow, eOpts
		alert("T");
		/*Ext.fly(rowNode).addCls('x-grid-row-expanded');
		Ext.fly(rowNode).down('.news-paragraph-simple')
				.enableDisplayMode().hide();
		Ext.fly(rowNode).down('.expand').enableDisplayMode()
				.hide();*/
	},

	onCompanyCollapseBody : function(rowNode) { //, record, expandRow, eOpts
		/*Ext.fly(rowNode).removeCls('x-grid-row-expanded');
		Ext.fly(rowNode).down('.news-paragraph-simple')
				.enableDisplayMode().show();
		Ext.fly(rowNode).down('.expand').enableDisplayMode()
				.show();*/
	}

});