Ext.define('Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesStore', {
    extend: 'Ext.data.Store',
   // requires:['Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesModel'],
    autoSync: false,
    model: 'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesModel',
    data:[]
});
