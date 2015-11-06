/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'Healthsurvey',

    extend: 'Healthsurvey.Application',
    
/**AppPathDetails**/autoCreateViewport: (Ext.os.deviceType=='Desktop')?'Healthsurvey.view.mainleftmenutree.MainPanel':'Healthsurvey.view.mobileview.login.Login',
    //autoCreateViewport: (Ext.os.deviceType=='Desktop')?'Healthsurvey.view.login.LoginPage':'Healthsurvey.view.mobileview.login.LoginPage',//'Healthsurvey.view.login.Login'
    	
    //-------------------------------------------------------------------------
    // Most customizations should be made to Healthsurvey.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
