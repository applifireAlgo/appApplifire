Ext.define('Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryFieldsStore', {
    extend: 'Ext.data.Store',
    requires:['Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryFieldsModel'],
    autoSync: false,
    model: 'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryFieldsModel',
    filters: []
  
});
