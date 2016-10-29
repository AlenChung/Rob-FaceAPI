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
    appId: process.env.MICROSOFT_APP_ID ||"39e398aa-5e7a-43c7-9079-fcb4f07a6dbc",
    appPassword: process.env.MICROSOFT_APP_PASSWORD ||"tZtei6Px5cY90yxTkP9HdQ6"
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
 
//=========================================================
// Bots Dialogs
//=========================================================

// Create LUIS recognizer 
var model = process.env.LUIS_MODEL_URL || "https://api.projectoxford.ai/luis/v1/application?id=ceb627e1-2d52-4626-9bbd-543a25983862&subscription-key=35820529a1be4e389462b5b4fd14ef90";
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);



//開場LUIS
dialog.matches('你好',[
  function(session,args,next){
      builder.Prompts.attachment(session,'請上傳一張照片讓我看看在場的俊男美女');
      
    },
   function(session,results){
    if (results.response){
        session.beginDialog('/mygender',args);     //dialog mygender
    }else{
          next();
      }
    session.send('總共有 ％d 男 ％d女'); 

    }
  ]);
//intent LUIS 請客     根目錄/smileFace & actionmoneyFace為判斷笑容值 ＆ Jerry/younger 
dialog.matches('開心',[
  function(session,args,next){
     session.send('請上傳一張照片讓我看看誰最開心');
        session.beginDialog('/smileFace',args);   //dialog smileFace
  },
  function(session,results){
   session.send('％s看起來笑得很燦爛');  //Send Photo CT建議放大開心那個人的臉部比較有效果
   

  }
]);
dialog.matches('請客',[

    function (session) {
       builder.Prompts.attachment(session,'請上傳一張照片讓我看看今天午餐誰來請客');
           
    },

    function (session, results) {    
       if (results.response){
         session.beginDialog('/actionmoneyFace',args);     //check who's younger or Jerry  //dialog mygender
        }else{
           next();
        } 

          session.send('％s最想請客');   //Send Jerry & younger's Photo 
      }

]);





bot.dialog('/actionmoneyFace', [

    

    function(session,args,next){
   
    
         if(session.message.text=='CT'){
            //Text.
              var msg = new builder.Message(session)
            
            .attachments([{
                
                contentType: "image/jpeg",
                contentUrl: "http://www.bonavida.com.hk/wp-content/uploads/2014/02/101413-Kobe.jpg",
            }]);
             session.endDialog(msg);
         }else if(typeof session.message.attachments[0] !== 'undefined'){

            if(session.message.attachments[0].contentType == 'image/jpeg' || session.message.attachments[0].contentType.indexOf("image")!==-1){
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