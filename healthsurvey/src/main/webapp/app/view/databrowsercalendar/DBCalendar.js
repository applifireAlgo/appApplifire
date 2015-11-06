Ext.define('Healthsurvey.view.databrowsercalendar.DBCalendar', {
	extend : 'Healthsurvey.view.databrowsercalendar.DBCalendarView',
	requires : [ 'Healthsurvey.view.databrowsercalendar.DBCalendarController',
	             'Healthsurvey.view.databrowsercalendar.DBCalendarView'],
	controller : 'databrowsercalendar',
	items : [ ],
	listeners : {
		afterrender : 'loadData',
		scope : "controller"
	}
});
