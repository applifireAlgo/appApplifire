/**
 * 
 */
Ext.define("Healthsurvey.view.scheduleconfiguration.panel.ScheduleConfig", {
	extend : 'Ext.form.Panel',
	xtype : 'schedulerConfig',
	title : 'Scheduler Configuration',
	requires : [ 'Healthsurvey.view.scheduleconfiguration.panel.ScheduleConfigController', 'Healthsurvey.view.scheduleconfiguration.panel.ScheduleConfigViewModel', 'Ext.grid.Panel',
			'Ext.grid.View', 'Ext.selection.CheckboxModel', 'Ext.grid.column.Action', 'Ext.form.field.Date', 'Ext.form.RadioGroup', 'Ext.form.FieldSet',
			'Ext.form.field.ComboBox' ],
	controller : 'schedulerConfigController',
	viewModel : 'schedulerConfigViewModel',
	autoScroll : true,
	layout : 'anchor',
	bodyPadding : 10,
	scheduleId : null,

	defaults : {
		anchor : '100%',
		margin : 10,
		allowBlank : false,
		labelWidth : 120,
	},
	items : [ {
		xtype : 'panel',
		title : 'WHAT',
		defaults : {
			margin : 10,
			allowBlank : false,
			labelWidth : 120,
		},
		items : [ {
			xtype : 'textfield',
			name : 'scheduleName',
			itemId : 'scheduleName',
			fieldLabel : 'Schedule Name<font color="red">*</font>',
			emptyText : 'Enter name'
		}, {
			anchor : '50%',
			xtype : 'combo',
			name : 'scheduleJob',
			itemId : 'scheduleJob',
			fieldLabel : 'Schedule Job<font color="red">*</font>',
			store : {
				fields : [ 'jobId', 'jobName' ],
				data : [],
				sorters : [ 'jobName', 'ASC' ]
			},
			emptyText : 'Select job to be schedule',
			queryMode : 'local',
			forceSelection : true,
			displayField : 'jobName',
			valueField : 'jobId',
		/*
		 * listeners : { beforerender : 'afterScheduleJobComboRender' }
		 */
		} ]
	}, {
		xtype : 'panel',
		title : 'WHEN',
		defaults : {
			margin : 10,
			allowBlank : false,
			labelWidth : 150,
		},
		items : [ {
			xtype : 'fieldset',
			itemId : 'simpleScheduleConfigFieldSet',
			title : 'Schedule Configuration',
			checkboxToggle : true,
			collapsible : true,
			collapsed : false,
			defaults : {
				margin : 10,
				allowBlank : false,
				labelWidth : 100,
			},
			listeners : {
				expand : 'onSimpleScheduleFieldSetExpand',
			},
			items : [ {
				xtype : 'radiogroup',
				fieldLabel : 'Simple',
				name : 'simpleScheduler',
				itemId : 'simpleScheduler',
				columns : 6,
				vertical : true,
				defaults : {
					allowBlank : false,
					labelWidth : 100,
				},
				items : [ {
					boxLabel : 'Hourly',
					name : 'simpleScheduler',
					inputValue : 'hourly'
				}, {
					boxLabel : 'Daily',
					name : 'simpleScheduler',
					inputValue : 'daily',
					checked : true
				}, {
					boxLabel : 'Weekly',
					name : 'simpleScheduler',
					inputValue : 'weekly'
				}, {
					boxLabel : 'Monthly',
					name : 'simpleScheduler',
					inputValue : 'monthly'
				}, {
					boxLabel : 'Quarterly',
					name : 'simpleScheduler',
					inputValue : 'quarterly'
				}, {
					boxLabel : 'Yearly',
					name : 'simpleScheduler',
					inputValue : 'yearly'
				}, {
					boxLabel : 'Last weekday of month',
					name : 'simpleScheduler',
					inputValue : 'lastWeekdayOfMonth'
				} ],
				listeners : {
					change : 'onSimpleSchedulerChkChange'
				}
			}, {
				anchor : '40%',
				xtype : 'fieldcontainer',
				layout : 'hbox',
				defaults : {
					flex : 1,
					allowBlank : false,
					labelWidth : 100,
					margin : '10 10 10 0'
				},
				items : [ {
					xtype : 'combo',
					name : 'hour',
					itemId : 'hour',
					fieldLabel : 'Hour',
					allowBlank : true,
					emptyText : 'Select hour',
					queryMode : 'local',
					forceSelection : true,
					displayField : 'hour',
					valueField : 'hour',
					margin : '10 30 10 0',
					bind : {
						store : '{hours}',
					// value : '{hour}',
					}
				}, {
					xtype : 'combo',
					name : 'minute',
					itemId : 'minute',
					fieldLabel : 'Minutes',
					allowBlank : true,
					emptyText : 'Select minutes',
					queryMode : 'local',
					forceSelection : true,
					displayField : 'minute',
					valueField : 'minute',
					bind : {
						store : '{minutes}',
					// value : '{minute}',
					}
				} ]
			} ]
		}, {
			anchor : '40%',
			xtype : 'fieldcontainer',
			layout : 'hbox',
			defaults : {
				flex : 1,
				allowBlank : false,
				labelWidth : 120,
				margin : '10 10 10 0'
			},
			items : [ {
				xtype : 'checkbox',
				name : 'repeatable',
				itemId : 'repeatable',
				fieldLabel : 'Repeatable',
				margin : '10 30 10 0',
			// bind : "{repeatable}"
			}, {
				xtype : 'checkbox',
				name : 'infinite',
				itemId : 'infinite',
				fieldLabel : 'Infinite',
				// bind : "{infinite}",
				listeners : {
					change : 'onInfiniteChkChange'
				}
			} ]
		}, {
			anchor : '40%',
			xtype : 'datefield',
			name : 'startDate',
			itemId : 'startDate',
			fieldLabel : 'Start Date',
			labelWidth : 120,
		// bind : "{startDate}"
		}, {
			anchor : '40%',
			xtype : 'datefield',
			name : 'endDate',
			itemId : 'endDate',
			fieldLabel : 'End Date',
			labelWidth : 120,
		// bind : "{endDate}"
		}, {
			xtype : 'fieldset',
			itemId : 'advancedScheduleConfigFieldSet',
			checkboxToggle : true,
			title : 'Advanced Schedule Configuration',
			collapsible : true,
			collapsed : true,
			listeners : {
				expand : 'onAdvancedScheduleFieldSetExpand',
			},

			items : [ {
				xtype : 'form',
				title : 'Custom',
				layout : 'column',
				defaults : {
					margin : 10,
					columnWidth : .25,
					height : 300,
				},
				items : [ {
					xtype : 'gridpanel',
					itemId : 'months',
					name : 'months',
					bind : "{months}",
					columns : [ {
						text : "All Months",
						flex : 1,
						sortable : false,
						dataIndex : 'month'
					} ],
					columnLines : true,
					selType : 'checkboxmodel',
					frame : true
				}, {
					xtype : 'gridpanel',
					itemId : 'days',
					bind : "{days}",
					columns : [ {
						text : "All Days",
						flex : 1,
						sortable : false,
						dataIndex : 'day'
					} ],
					columnLines : true,
					selType : 'checkboxmodel',
					frame : true
				}, {
					xtype : 'gridpanel',
					itemId : 'hours',
					bind : "{hours}",
					columns : [ {
						text : "All Hours",
						flex : 1,
						sortable : false,
						dataIndex : 'hour'
					} ],
					columnLines : true,
					selType : 'checkboxmodel',
					frame : true
				}, {
					xtype : 'gridpanel',
					itemId : 'minutes',
					bind : "{minutes}",
					columns : [ {
						text : "All Minutes",
						flex : 1,
						sortable : false,
						dataIndex : 'minute'
					} ],
					columnLines : true,
					selType : 'checkboxmodel',
					frame : true
				} ],
				buttons : [ {
					text : 'Add',
					icon : 'images/add.png',
					tooltip : 'Add Schedule to grid',
					handler : 'onAddClick'
				}, {
					text : 'Reset',
					icon : 'images/reset1.png',
					tooltip : 'Reset custom schedule',
					listeners : {
						click : 'onResetCustomSchedule'
					}
				} ]
			}, {
				xtype : 'gridpanel',
				title : 'Custom Schedules',
				name : 'customSchedules',
				itemId : 'customSchedules',
				height : 200,
				columnLines : true,
				store : {
					fields : [ 'month', 'day', 'hour', 'minute', 'key' ],
					data : []
				},
				columns : [ {
					text : "Month",
					flex : 1,
					sortable : false,
					dataIndex : 'month'
				}, {
					text : "Day",
					flex : 1,
					sortable : false,
					dataIndex : 'day'
				}, {
					text : "Hour",
					flex : 1,
					sortable : false,
					dataIndex : 'hour'
				}, {
					text : "Minutes",
					flex : 1,
					sortable : false,
					dataIndex : 'minute'
				}, {
					xtype : 'actioncolumn',
					menuDisabled : true,
					text : 'Action',
					align : 'center',
					flex : 0.2,
					items : [ {
						icon : 'images/delete.gif',
						tooltip : 'Delete Row',
						handler : "onDeleteRowClick"
					} ]
				} ]
			} ]
		} ]
	}, {
		xtype : 'panel',
		title : 'BY WHOM',
		defaults : {
			margin : 10,
			allowBlank : false,
			labelWidth : 120,
		},
		items : [ {
			anchor : '50%',
			xtype : 'combo',
			name : 'scheduleCreator',
			itemId : 'scheduleCreator',
			fieldLabel : 'Schedule By<font color="red">*</font>',
			emptyText : 'Select schedule creator',
			queryMode : 'local',
			forceSelection : true,
			displayField : 'userName',
			valueField : 'userName',
			store : {
				fields : [ 'userName' ],
				data : [ [ 'system' ] ],
				sorters : [ 'userName', 'ASC' ]
			},
			listeners : {
				afterrender : 'afterScheduleByWhom'
			}
		} ]
	} ],
	buttons : [ {
		text : 'Reset',
		itemId : 'resetButton',
		icon : 'images/reset1.png',
		handler : 'onResetClick'
	}, {
		text : 'Save',
		icon : 'images/greenFlopy_save.png',
		listeners : {
			click : 'onSaveClick'
		}
	} ]
});