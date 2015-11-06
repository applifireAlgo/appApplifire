Ext.define('Healthsurvey.view.fw.frameworkController.AggregateViewController', {
     extend: 'Healthsurvey.view.fw.frameworkController.FrameworkViewController',
  
     
     //To show the next card in aggregate form
     showNextCard: function(btn) {
          var form = btn.up('form');
          var grid = form.layout.getActiveItem().down('grid');
          if (!form.layout.getActiveItem().isValid()) {
               if (grid == null || grid.store.getCount() == 0) return;
          }
          form.layout.setActiveItem(form.layout.getNext());
          prevBut = btn.up().down('#cardPrev');
          prevBut.setDisabled(false);
          if (!form.layout.getNext()) {
               btn.setDisabled(true);
               form.down('#saveFormButton').setDisabled(false);
          }
     },
     
     //To show the prevous card in aggregate form
     showPreviousCard: function(btn) {
          var form = btn.up('form');
          form.layout.setActiveItem(form.layout.getPrev());
          nextBut = btn.up().down('#cardNext');
          nextBut.setDisabled(false);
          if (!form.layout.getPrev()) {
               btn.setDisabled(true);
          }
     },
     
     //To show the first card in aggregate form 
     showFirstCard: function(form) {
          form.layout.setActiveItem(0);
          nextBut = form.down('#cardNext');
          nextBut.setDisabled(false);
          prevBut = form.down('#cardPrev');
          prevBut.setDisabled(true);
     },
     
     //To show the provide card in aggregate form
     showCard: function(form, item) {
          form.layout.setActiveItem(item);
          if (!form.layout.getPrev()) {
               prevBut = form.down('#cardPrev');
               prevBut.setDisabled(true);
          } else {
               prevBut = form.down('#cardPrev');
               prevBut.setDisabled(false);
          }
          if (!form.layout.getNext()) {
               nextBut = form.down('#cardNext');
               nextBut.setDisabled(true);
          } else {
               nextBut = form.down('#cardNext');
               nextBut.setDisabled(false);
          }
     }
});