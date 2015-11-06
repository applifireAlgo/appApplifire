Ext.define('Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.EntityJoinStore', {
    extend: 'Ext.data.Store',
    requires:['Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.EntityJoinModel'],
    autoSync: false,
    model: 'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.EntityJoinModel',
    data:[]
});
