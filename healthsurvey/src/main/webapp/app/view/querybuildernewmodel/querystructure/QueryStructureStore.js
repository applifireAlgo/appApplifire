Ext.define('Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureStore', {
    extend: 'Ext.data.Store',
    requires:['Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureModel'],
    autoSync: false,
    model: 'Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureModel',
    filters: []
  
});
