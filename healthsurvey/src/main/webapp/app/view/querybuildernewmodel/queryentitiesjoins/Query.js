Ext.define('Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.Query', {
    config: {
        entities: '',
        fields: '',
        joins: ''
    },
    constructor: function(){
    
      /*  this.entities = Ext.create('Ext.ux.window.visualsqlquerybuilder.SQLTableStore', {
            storeId: 'SQLTableStore'
        });*/
    },
    addFieldRecord: function(record, bOutput){
    	
        var tableAlias, model, expression;
        // get the tableAlias
        tableAlias = this.getTableById(record.get('tableId')).get('tableAlias');
        // build the expression
        // check if the tableAlias is not an empty string
        if (tableAlias != '') {
            // alias is not an empty string
            expression = tableAlias + '.' + record.get('field');
        }
        else {
            // alias is an empty string
            expression = record.get('tableName') + '.' + record.get('field');
        };
        // get a new field instance
        model = this.getNewField();
        // set the expression
        model.set('expression', expression);
        // set output to false per default
        model.set('output', bOutput);
        // set an id, so it is possible to remove rows if the associated table is removed
        model.set('id', record.get('id'));
        // set the field
        model.set('field', record.get('field'));
        // copy tableId to the new model instance
        model.set('tableId', record.get('tableId'));
        // copy cmp id of origin sqltable to the new model instance
        model.set('extCmpId', record.get('extCmpId'));
        this.addField(model);
    },
    addField: function(field){
        this.fields.add(field);
    },
});