/**
 * 
 */
Ext.define
(
		'Healthsurvey.view.searchengine.searchsetup.ChartFieldsModel',
		{
			extend : 'Ext.data.Model',
			alias : 'model.chartfieldsmodel',
			fields : [ 'fieldName', 'fieldType', 'fieldSettingKey', 'checked', 'fieldSettingValue', 'fieldOrder', 'gridIndex' ],
			setDefaults : function() 
			{
				var fieldType = this.get('fieldType');
				// default settings: if datatype is INTEGER - SUM
				if (fieldType == 'INTEGER') {
					this.set('fieldSettingKey', 'SUM');
					this.set('fieldSettingValue', 'Sum');
				} else {
					// else select ROWHEADER by default
					this.set('fieldSettingKey', 'ROWHEADER');
					this.set('fieldSettingValue', 'Row Header');
				}
			}
		}
);