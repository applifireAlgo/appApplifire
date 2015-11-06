Ext.define('Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryFieldsModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'fieldId',
        type: 'string'
    },{
        name: 'fieldName',
        type: 'string'
    },{

        name: 'fieldConfig',
        type: 'auto'
    
    },{

        name: 'entConfig',
        type: 'auto'
    
    },{

        name: 'dataType',
        type: 'string'
    
    },{

        name: 'widget',
        type: 'string'
    
    },{
        name: 'displayName',
        type: 'string'
    },{
        name: 'entId',
        type: 'string'
    },{
        name: 'entName',
        type: 'string'
    },{
        name: 'tableName',
        type: 'string'
    },{
        name: 'entAlias',
        type: 'string'
    }, {
        name: 'output',
        type: 'boolean'
    }, {
        name: 'expression',
        type: 'string'
    },{
        name: 'alias',
        type: 'string'
    }, {
        name: 'sortType',
        type: 'string'
    }, {
        name: 'sortOrder',
        type: 'int'
    }, {
        name: 'grouping',
        type: 'boolean'
    }, {
        name: 'criteria',
        type: 'auto'
    },{
        name: 'hasCriteria',
        type: 'boolean'
    }]
});
