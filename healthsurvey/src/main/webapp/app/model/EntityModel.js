Ext.define('Healthsurvey.model.EntityModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'fieldName',
		type : 'string'
	}, {
		name : 'displayName',
		type : 'string'
	}, {
		name : 'dataType',
		type : 'string'
	}, {
		name : 'dataTypePrecision',
		type : 'string'
	}, {
		name : 'isNull',
		type : 'boolean'
	}, {
		name : 'isPKey',
		type : 'boolean'
	},{
		name : 'primaryDisplay',
		type : 'boolean'
	}, {
		name : 'isFKey',
		type : 'boolean'
	}, {
		name : 'isAutoInc',
		type : 'boolean'
	}, {
		name : 'reffKey',
		type : 'string'
	}, {
		name : 'widgets',
		type : 'string'
	}, {
		name : 'finders',
		type : 'boolean'
	}, {
		name : 'defaultVal',
		type : 'string'
	} ]
});