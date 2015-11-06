
//Deprecated 

/********************************************************************************************************

 * File Name:-ListViewBaseView.js

 * Date Created:-29-Sept-2015

 * Author:- Shrikrishna

 * Purpose :-

 
 *********************************************************************************************************
 Version   |	Date Modified    |  	Author 	   |	Modifications	

 * 1.0			29-Sept-2015 			 Shrikrishna			
								
 *********************************************************************************************************/


Ext.define('Healthsurvey.view.fw.frameworkView.ListViewBaseView', {
     extend: 'Ext.form.Panel',
     xtype:'listViewBaseView',
     tbar: ['->',{
         type: "prev",
         icon  : 'images/resultset_first.png',
         itemId: "firstBut",
         handler: "onPaginationClick",
         tooltip:'First',
         isFirst : true
    }, {
         type: "prev",
         icon  : 'images/resultset_previous.png',
         itemId: "prevBut",
         tooltip:'Previous',
         handler: "onPaginationClick",
         isPrev : true
    }, {
         type: "next",
         icon  : 'images/resultset_next.png',
         itemId: "nextBut",
         tooltip:'Next',
         handler: "onPaginationClick",
         isNext : true
    }, {
         type: "next",
         icon  : 'images/resultset_last.png',
         itemId: "lastBut",
         tooltip:'Last',
         handler: "onPaginationClick",
         isLast : true
    }]
     
});