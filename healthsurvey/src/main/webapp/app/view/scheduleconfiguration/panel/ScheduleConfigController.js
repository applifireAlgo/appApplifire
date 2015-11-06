/**
 * 
 */
Ext.define("Healthsurvey.view.scheduleconfiguration.panel.ScheduleConfigController", {
	extend : 'Ext.app.ViewController',
	alias : 'controller.schedulerConfigController',

	init : function() {
		debugger;
		this.afterScheduleJobComboRender();
	},

	onAdvancedScheduleFieldSetExpand : function(fieldset, eOpts) {
		var me = this.getView();
		me.down('#simpleScheduleConfigFieldSet').setExpanded(false);
	},

	onSimpleScheduleFieldSetExpand : function(fieldset, eOpts) {
		var me = this.getView();
		me.down('#advancedScheduleConfigFieldSet').setExpanded(false);
	},

	afterScheduleByWhom : function(combo) {
		combo.select("system");
	},

	afterScheduleJobComboRender : function() {
		var combo = this.view.down('#scheduleJob');
		Ext.Ajax.request({
			url : "secure/ScheduleConfig/findJobs",
			method : 'GET',
			async : false,
			combo : combo,
			jsonData : {},
			success : function(response, currentObject, options) {
				debugger;
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if (jsonResponse.response.success == true) {
					var data = Ext.JSON.decode(jsonResponse.response.data);
					currentObject.combo.getStore().loadData(data);
				} else {
					Ext.Msg.alert({
						title : 'Error...',
						msg : responseJson.response.errormessage,
						icon : Ext.MessageBox.Error
					});
				}
			},
			failure : function() {
				Ext.Msg.alert({
					title : 'Error...',
					msg : 'Cannot connect to server',
					icon : Ext.MessageBox.Error
				});
			}
		});
	},

	onDeleteRowClick : function(grid, rowIndex) {
		grid.getStore().removeAt(rowIndex);
	},

	onSimpleSchedulerChkChange : function(radio, newValue, oldValue, eOpts) {
		if (newValue.simpleScheduler == "hourly") {
			this.getView().down('#hour').disable(true);
		} else {
			this.getView().down('#hour').enable(true);
		}
	},

	onInfiniteChkChange : function(checkbox, newValue, oldValue, eOpts) {
		if (newValue == true) {
			this.getView().down('#endDate').disable(true);
		} else {
			this.getView().down('#endDate').enable(true);
		}
	},

	getSelectedRecords : function(grid) {
		var selectedList = [];
		var selectedRecords = grid.getSelectionModel().getSelection();
		Ext.each(selectedRecords, function(item) {
			selectedList.push(item.data);
		});
		return selectedList;
	},

	onAddRow : function(grid, record) {
		grid.getStore().add(record);
	},

	onAddClick : function(btn, eOpts) {
		debugger;
		var monthsGrid = this.getView().down('#months');
		var selectedMonths = this.getSelectedRecords(monthsGrid);

		var daysGrid = this.getView().down('#days');
		var selectedDays = this.getSelectedRecords(daysGrid);

		var hoursGrid = this.getView().down('#hours');
		var selectedHours = this.getSelectedRecords(hoursGrid);

		var minutesGrid = this.getView().down('#minutes');
		var selectedMinutes = this.getSelectedRecords(minutesGrid);

		var customSchedulesGrid = this.getView().down('#customSchedules');
		var customSchedulesGridStore = customSchedulesGrid.getStore();

		for (var monthIndex = 0; monthIndex < selectedMonths.length; monthIndex++) {
			for (var dayIndex = 0; dayIndex < selectedDays.length; dayIndex++) {
				for (var hourIndex = 0; hourIndex < selectedHours.length; hourIndex++) {
					for (var minutesIndex = 0; minutesIndex < selectedMinutes.length; minutesIndex++) {

						var key = selectedMonths[monthIndex].month + "###" + selectedDays[dayIndex].day + "###" + selectedHours[hourIndex].hour + "###"
								+ selectedMinutes[minutesIndex].minute;
						// checking duplicate record using key
						if (customSchedulesGridStore.findExact("key", key) == -1) {
							var newRecord = {
								"month" : selectedMonths[monthIndex].month,
								"day" : selectedDays[dayIndex].day,
								"hour" : selectedHours[hourIndex].hour,
								"minute" : selectedMinutes[minutesIndex].minute,
								"key" : key
							};
							this.onAddRow(customSchedulesGrid, newRecord);
						}
					}
				}
			}
		}
	},

	clearGridSelections : function(grid) {
		debugger;
		// grid.getSelectionModel().clearSelections();
		grid.store.sync();
		grid.getSelectionModel().deselectAll();
	},

	onResetCustomSchedule : function(btn, eOpts) {
		debugger;
		var monthsGrid = this.getView().down('#months');
		var daysGrid = this.getView().down('#days');
		var hoursGrid = this.getView().down('#hours');
		var minutesGrid = this.getView().down('#minutes');

		this.clearGridSelections(monthsGrid);
		this.clearGridSelections(daysGrid);
		this.clearGridSelections(hoursGrid);
		this.clearGridSelections(minutesGrid);
	},

	onResetClick : function(btn, eOpts) {
		this.getView().getForm().reset();
		this.clearGridSelections();
	},

	onSaveClick : function(btn, eOpts) {
		debugger;
		var form = btn.up('form').getForm();
		if (form.isValid()) {
			var formData = form.getValues();
			var jsonData = this.prepareJSON(formData);
			console.log("JSON : " + Ext.JSON.encode(jsonData));

			var method, url, msg;
			if (this.getView().scheduleId == null) {
				delete jsonData['scheduleId'];
				method = 'POST';
				url = 'secure/ScheduleConfig/save';
				msg = 'Saving...'
			} else {
				method = 'PUT';
				url = 'secure/ScheduleConfig/update';
				msg = 'Updating...'
			}

			var entMask = new Ext.LoadMask({
				msg : msg,
				target : this.getView()
			}).show();

			Ext.Ajax.request({
				timeout : 180000,
				url : url,
				method : method,
				waitMsg : msg,
				entMask : entMask,
				jsonData : jsonData,
				controller : this,
				success : function(response, sender) {
					debugger;
					var responseText = Ext.JSON.decode(response.responseText);
					if (responseText.response.success) {
						Ext.Msg.alert("Info", responseText.response.message);
						sender.controller.getView().up().up().down('#schedulerConfigTreePanel').getController().reloadTree();

						if (method == "POST") {
							sender.controller.getView().getForm().reset();
							sender.controller.clearGridSelections();
							sender.controller.getView().down('#customSchedules').store.removeAll();
						}
					} else {
						Ext.Msg.alert({
							title : 'Error...',
							msg : responseText.response.message,
							icon : Ext.MessageBox.Error
						});
					}
					sender.entMask.hide();
				},
				failure : function(response, sender) {
					Ext.Msg.alert({
						title : 'Error...',
						msg : "Cannot connect to server",
						icon : Ext.MessageBox.Error
					});
					sender.entMask.hide();
				}
			});
		}
	},

	getCustomStrategy : function(store) {
		var storeItems = store.data.items;
		var arr = [];
		for (index in storeItems) {
			var data = storeItems[index].data;
			delete data.id;
			delete data.key;
			arr.push(data);
		}
		return arr;
	},

	prepareJSON : function(formData) {
		debugger;
		var jsonData = {};
		jsonData.scheduleId = this.getView().scheduleId;
		jsonData.jobDetails = {
			jobId : formData.scheduleJob
		};
		jsonData.scheduleName = formData.scheduleName;

		var scheduleStrategy = {};
		// IF SIMPLE STRATEGY IS SELECTED
		if (this.getView().down('#simpleScheduleConfigFieldSet').collapsed == false) {
			scheduleStrategy.simple = formData.simpleScheduler;
			scheduleStrategy.hour = formData.hour;
			scheduleStrategy.minute = formData.minute;
		} else {
			// IF ADVANCED STRATEGY IS SELECTED
			var customSchedulesGridStore = this.getView().down('#customSchedules').getStore();
			scheduleStrategy.custom = this.getCustomStrategy(customSchedulesGridStore);
		}
		scheduleStrategy.startDate = formData.startDate;
		scheduleStrategy.endDate = formData.endDate == undefined ? "" : formData.endDate;
		scheduleStrategy.repeatable = formData.repeatable == "on" ? true : false;
		scheduleStrategy.infinite = formData.infinite == "on" ? true : false;
		scheduleStrategy.scheduleCreator = formData.scheduleCreator;

		jsonData.scheduleStrategy = Ext.JSON.encode(scheduleStrategy);
		return jsonData;
	},

	loadFormData : function(scheduleId) {
		debugger;
		var currentObject = this;
		Ext.Ajax.request({
			timeout : 180000,
			url : 'secure/ScheduleConfig/findById',
			jsonData : {
				"findKey" : scheduleId
			},
			method : "POST",
			success : function(response, opts) {
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success == true) {
					var data = responseJson.response.data;
					// Load data to fields
					currentObject.getView().scheduleId = data.scheduleId;
					currentObject.getView().down('#scheduleName').setValue(data.scheduleName);
					currentObject.getView().down('#scheduleName').setReadOnly(true);
					currentObject.getView().down('#scheduleJob').setValue(data.jobDetails.jobId);

					var scheduleStrategy = Ext.JSON.decode(data.scheduleStrategy);
					currentObject.getView().down('#repeatable').setValue(scheduleStrategy.repeatable);
					currentObject.getView().down('#infinite').setValue(scheduleStrategy.infinite);
					currentObject.getView().down('#startDate').setValue(scheduleStrategy.startDate);
					if (scheduleStrategy.infinite == false) {
						currentObject.getView().down('#endDate').setValue(scheduleStrategy.endDate);
					}
					currentObject.getView().down('#scheduleCreator').setValue(scheduleStrategy.scheduleCreator);

					if (scheduleStrategy.hasOwnProperty('simple') == true) {
						currentObject.getView().down('#advancedScheduleConfigFieldSet').setExpanded(false);
						currentObject.getView().down('#simpleScheduler').setValue({
							simpleScheduler : scheduleStrategy.simple
						});
						currentObject.getView().down('#hour').setValue(scheduleStrategy.hour);
						currentObject.getView().down('#minute').setValue(scheduleStrategy.minute);
					}

					if (scheduleStrategy.hasOwnProperty('custom') == true) {
						currentObject.getView().down('#advancedScheduleConfigFieldSet').setExpanded(true);
						currentObject.getView().down('#simpleScheduleConfigFieldSet').setExpanded(false);
						currentObject.getView().down('#customSchedules').getStore().loadData(scheduleStrategy.custom);
					}

				} else {
					Ext.Msg.alert({
						title : 'Error...',
						msg : responseJson.response.message,
						icon : Ext.MessageBox.Error
					});
				}
			},
			failure : function(response, opts) {
				var responseJson = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert({
					title : 'Error...',
					msg : responseJson.response.message,
					icon : Ext.MessageBox.Error
				});
			},
		}, this);
	}
});