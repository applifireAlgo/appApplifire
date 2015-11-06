Ext.define('Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesModel', {
    extend: 'Ext.data.Model',
    fields: [{
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
    },
    {
    	name: 'joins',
    	type:'auto'
    },
    {
    	name: 'selectAll',
    	type:'boolean'
    },
    {
    	name:'entFields',
    	type:'auto'
    },
    {
    	name:'entFieldsConfig',
    	type:'auto'
    }
    ]

});