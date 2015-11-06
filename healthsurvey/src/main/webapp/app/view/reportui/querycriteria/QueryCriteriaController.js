Ext.define('Healthsurvey.view.reportui.querycriteria.QueryCriteriaController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.querycriteriaController',
	requires : [ 'Healthsurvey.view.fw.DateRange' ],
	reportView : null,
	reportViewController : null,
	datachart : null,
	init : function() {
		this.reportView = this.getView().up();
		if (this.reportView.xtype != 'reportview') {
			this.reportView = this.reportView.up();
		}
		this.reportViewController = this.reportView.controller;

	},
	initObject : function() {
		this.datachart = this.reportView.down("#datachart-panel");
	},
	/*
	 * Load query criteria
	 */
	loadData : function(reportJSON) {
		// if criteria not available then disable
		debugger;
		currentView = this.getView();
		advanceConfigJson = reportJSON.advanceConfigJson;

		var totalCheckhox = currentView.down("#isAutoRef");
		var combobox = currentView.down("#cmbrefInterval");

		if (advanceConfigJson != undefined && advanceConfigJson.hasOwnProperty("auto_refersh") && advanceConfigJson["auto_refersh"] == "on") {

			if (advanceConfigJson.hasOwnProperty("interval")) {
				combobox.setValue(advanceConfigJson["interval"]);
				totalCheckhox.setValue(true)
			}
		} else {
			totalCheckhox.setValue(false);
			combobox.setValue(null);
		}

		// if criteria not available then disable
		if (reportJSON.queryCWidgetU.length == 0) {
			// this.getView().hide();

			currentView.down("#btnClear").hide();
			currentView.down("#btnSearch").hide();
			return;
		}

		if (this.reportViewController.isRad == 1) {
			/*******************************************************************
			 * 
			 * 
			 * Please be careful while doing changes in below code
			 * 
			 * this Code is only for Rad not for Application
			 * 
			 * 
			 */
			if (reportJSON.queryCWidgetU.length > 0) {
				for (var k = 0; k < reportJSON.queryCWidgetU.length; k++) {
					currentJson = reportJSON.queryCWidgetU[k];
					currentJson.hidden = false;
				}
			}
		} else {
			var kCount = 0;
			if (reportJSON.queryCWidgetU.length > 0) {
				for (var k = 0; k < reportJSON.queryCWidgetU.length; k++) {
					if (reportJSON.queryCWidgetU[k].hidden != undefined && reportJSON.queryCWidgetU[k].hidden == true) {
						kCount++;
					}
				}
				if (kCount == reportJSON.queryCWidgetU.length) {
					currentView.down("#btnClear").hide();
					currentView.down("#btnSearch").hide();

				}
			}
		}

		// set Query Criteria widgets
		this.getView().add(reportJSON.queryCWidgetU);
		var widgets = this.view.items.items;

		// bind method to parent widget if dependancy is defined
		this.bindDepandantWidget(widgets);
		this.setHrefValues(this.getView(), this.reportView);

		// load Services of Q C Widgets
		this.loadWidgetsServices(widgets);

		this.setDefaultValue(widgets);

	},
	setHrefValues : function(qcPanel, reporUiObj) {
		var rptHrefQCUpd = [];
		Ext.Array.each(reporUiObj.rptHrefQC, function(item, indx, items) {
			var widgets = this.qcPanel.query("[name=" + item.name + "]");
			if (widgets.length > 0) {
				widgets[0]["hrefval"] = item.value;
				if (widgets[0].xtype == 'adatepickerfield') { // ||
					try {
						widgets[0].setValue(Ext.Date.parse(item.value, 'Y-m-d'));
					} catch (e) {
					}
				} else {
					widgets[0].setValue(item.value);
				}

			} else {
				this.rptHrefQCUpd.push(item);
			}
		}, {
			qcPanel : qcPanel,
			rptHrefQCUpd : rptHrefQCUpd
		});
		reporUiObj.rptHrefQC = rptHrefQCUpd;

	},
	bindDepandantWidget : function(widgets) {
		Ext.Array.each(widgets, function(item, ind, items) {
			if (item.parentWidget > 0) {
				var query = this.getView().query('[widgetId=' + item.parentWidget + ']');
				if (query.length > 0) {
					var widget = query[0];
					widget.on('change', this.refreshDepandantWidget);
				}
			}
		}, this);
	},
	refreshDepandantWidget : function(sender, newValue, oldValue, eOpts) {
		var queryPanel = sender.up();
		Ext.Array.each(queryPanel.items.items, function(item, idx, items) {
			if (this.sender.widgetId == item.parentWidget) {
				var params = this.scope.getQueryCriteriaParams(this.queryPanel, item);
				var params = {};
				params["findKey"] = newValue;
				this.scope.renderComboboxStore(item, params);
			}
		}, {
			sender : sender,
			scope : queryPanel.controller,
			queryPanel : queryPanel
		});
	},
	renderComboboxStore : function(com, param) {
		try {
			var response = this.reportViewController.syncAjaxPOSTCall(this.reportViewController.restURL + com.serviceUrl, param);
			if (response == null) {
				return;
			}

			if (com.xtype == "combobox") {
				var data = response.response.data;
				this.loadCombobox(com, data);
			}
		} catch (e) {

		}

	},
	getQueryCriteriaParams : function(panel, refWidget) {
		var attrParms = "";
		panel.items.each(function(item) {
			if (refWidget.widgetId != item.widgetId) {
				if (attrParms.length > 0) {
					attrParms = attrParms + "&";
				}
				attrParms = attrParms + item.attribute + ":" + item.getValue();
			}

		});
		return attrParms;
	},
	loadWidgetsServices : function(widgets) {
		Ext.Array.each(widgets, function(widget, idx, items) {
			if (widget.serviceId != undefined && widget.serviceId.length > 0 && widget.parentWidget == 0) {

				this.loadDataInWidget(widget);
			}
		}, this);
	},
	setComboboxData : function(data, widget) {
		store = this.getStoreFromAPI(response[0], com.attribute != undefined ? com.attribute : "");
		com.bindStore(store);
		com.displayField = "primaryDisplay";
		com.valueField = "primaryKey";
	},
	loadDataInWidget : function(widget) {
		try {
			var response = this.reportViewController.syncAjaxGETCall(this.reportViewController.restURL + widget.serviceUrl, "jsonData={}");
			if (response == null) {
				return;
			}
			if (widget.xtype == "combobox") {
				var data = response.response.data;
				this.loadCombobox(widget, data);
			}
		} catch (e) {

		}
	},
	loadCombobox : function(widget, data) {
		var fields = data.length > 0 ? Ext.Object.getKeys(data[0]) : [];
		var store = Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : fields,
			data : data,
			sorters : 'primaryDisplay'
		});
		widget.reset();
		widget.bindStore(store);
		widget.displayField = "primaryDisplay";
		widget.valueField = "primaryKey";
		widget.queryMode = 'local';
		widget.on("change", function(value, vae1, cmb) {
			// debugger;
		});
		if (widget.hrefval != undefined) {
			widget.setValue(widget.hrefval);
		}
	},
	filterData : function(btn) {
		this.initObject();
		this.datachart.controller.filterData();
	},
	clearData : function() {
		this.initObject();
		Ext.Array.each(this.getView().items.items, function(item, ind, items) {
			try {
				item.reset();
				if (item.hasOwnProperty("parentWidget") && item.parentWidget != 0) {
					item.store.removeAll();
				}
			} catch (Ex) {
			}
		}, this);
		this.datachart.controller.filterData();
	},
	setDefaultValue : function(widgets) {
		Ext.Array.each(widgets, function(item, ind, items) {
			if (item.defaultValue.length > 0) {
				if (item.xtype != 'combobox') {
					if (item.xtype != 'combobox') {
						var value = "";
						if (item.hrefval != undefined) {
							value = item.hrefval;
						} else {
							value = item.defaultValue;
						}
						if (item.xtype == 'datefield') {
							if (item.hrefval != undefined) {
								// value
								// widget.setValue(item.hrefval);
							} else {
								debugger;
								item.setValue(this.getDefaultDateValue(value));
							}
						} else if (item.xtype == 'daterange') {
							var rec = item.down("#defaultsDate").getStore().find("text", item.defaultValue);
							if (rec != -1) {
								item.down("#defaultsDate").setValue(item.down("#defaultsDate").getStore().getAt(rec).data.name);
							}
						} else {
							item.setValue(value);
						}

					}

				}
			}
		}, this);
	},
	getDefaultDateValue : function(defaultVal) {
		// dDate defaultDate;
		var defaultDate = "";

		if (defaultVal.toUpperCase() == "TODAY") {
			defaultDate = new Date();
		}
		return defaultDate;
	},

	setTimer : function(value) {
		if (value.checked == false) {
			// this.reportViewController.stopTimer(this.reportViewController);
			currentView = this.getView();
			// currentView.down("#btnClear").hide();
			currentView.down("#cmbrefInterval").setValue(null);
			this.reportViewController.stopTimer(this.reportViewController);

		}
	},
	changeTimers : function(cmb) {
		currentView = this.getView();
		if (currentView.down("#isAutoRef") != undefined && currentView.down("#isAutoRef").value == true) {
			this.reportViewController.updateTimer(this.reportViewController, cmb.getValue());
		}
		/*this.reportViewController.updateTimer(this.reportViewController, cmb
				.getValue());*/
	}

});