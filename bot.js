var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
 
//=========================================================
// Bots Dialogs
//=========================================================


bot.dialog('/', [

     function (session,args,next) {
        
      
         if(session.message.text=='CT'){
            //Text.
              var msg = new builder.Message(session)
            
            .attachments([{
                
                contentType: "image/jpeg",
                contentUrl: "http://www.bonavida.com.hk/wp-content/uploads/2014/02/101413-Kobe.jpg",
            }]);
             session.endDialog(msg);
         }else if(typeof session.message.attachments[0] !== 'undefined'){

            if(session.message.attachments[0].contentType == 'image/jpeg' || session.message.attachments[0].contentType == 'image/png'){
            //object
            console.log('%s listening to',session.message.attachments[0].contentType); 
            // face api
                   var msg = new builder.Message(session)
            
            .attachments([{
                
                contentType: "image/jpeg",
                contentUrl: "http://az616578.vo.msecnd.net/files/2016/08/02/636057537990540091900905774_pics-girls-7.jpg",
                //SMILE
            }]);
             session.endDialog(msg);
             
         }
                
         }
         else{

            //not with all
             var msg = new builder.Message(session)
            
            .attachments([{
                
                contentType: "image/jpeg",
                contentUrl: "http://www.lgg3wallpaper.com/wp-content/uploads/Girl/Girl%20LG%20G3%20Wallpapers%2082.jpg",
            }]);
             session.endDialog(msg);
         }

         
         


        
    }


  

]);