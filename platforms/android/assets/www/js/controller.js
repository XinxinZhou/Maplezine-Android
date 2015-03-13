angular.module('starter.controllers', ['ionic','ngAnimate'])

.controller('AppCtrl',function($scope,$ionicModal,$timeout,$ionicLoading){
//    alert($scope.displayHeight+","+$scope.displayWidth);

    $ionicModal.fromTemplateUrl('templates/modal.html',function(modal){
        $scope.modal = modal;
    },{
        animation: 'slide-in-up',
        scope: $scope   
    });
    
    $ionicLoading.show({
      templateUrl:'templates/loadingres.html',       
      noBackdrop:true,
      showDelay: 0,    
      scope:$scope
    });
    
//  console.log("AppCtrlarticleRead", $scope.read,$scope.like);  
    $scope.articleId="";    
    $scope.ableToLike = null;
    $scope.like = 0;  
    $scope.myDataRef = new Firebase('https://blistering-heat-3955.firebaseio.com/');
    $scope.myDataRef.child("paper").limitToFirst(1).once('child_added', function(snapshot) {
    var message = snapshot.val();
//    console.log(message,snapshot.key());   
    $scope.articleId = - snapshot.key();
    $scope.articleTitle = message.title;
    $scope.author = message.author;
    $scope.content = message.content;
    $scope.date = message.date;
    $scope.Day = $scope.date.slice(7,10);
    $scope.dateLeft = $scope.date.substr(4,4)+""+$scope.date.slice(11,$scope.date.length);
    $scope.like = message.like;
        
    $scope.read = message.read;   
    $scope.authorTitle = message.authorTitle;
    $scope.authorIcon = message.authorIcons;
    $scope.headerLikeIcon="ion-heart-broken";
    $scope.customHeart = "ion-ios7-heart-outline";
    $scope.likedIds = localStorage.getItem('likedArticleId');
    $scope.likedIdsArray = new Array();
//    console.log("$scope.likedIds",$scope.likedIds,localStorage.getItem('likedArticleId')); 
    $scope.authorInfo = {
      authorTitleToArray: $scope.authorTitle.split("="),
      authorIconToArray: $scope.authorIcon.split(",|") 
    };
//    console.log("$scope.authorInfo",$scope.authorInfo.authorIconToArray.length);    
    $scope.authorInfoCombination = new Array();
      for(i = 0; i < $scope.authorInfo.authorTitleToArray.length; i++){            
            $scope.authorInfoCombination.push($scope.authorInfo.authorIconToArray[i]+" "+$scope.authorInfo.authorTitleToArray[i]);
      }
//      console.log("authorInfo",$scope.authorInfo.authorTitleToArray,$scope.authorInfo.authorIconToArray);
      if( typeof $scope.likedIds === 'undefined' || $scope.likedIds == null)
      {          
        $scope.ableToLike = true;
        $scope.headerLikeIcon="ion-heart-broken";
        $scope.customHeart = "ion-ios7-heart-outline";
        localStorage['likedArticleId'] = "0";
      } else {
        $scope.likedIdsArray =  $scope.likedIds.split(",");
        console.log("likedIdsArray",$scope.likedIdsArray);
        $scope.likedIdsArray.forEach(function(value){
          console.log("$scope.articleId",$scope.articleId,value);
          if(value == $scope.articleId) {
            $scope.ableToLike = false;
            $scope.headerLikeIcon="ion-heart";
            $scope.customHeart = "ion-ios7-heart customHeartStyle";
            console.log("有了 $scope.ableToLike", $scope.ableToLike);
          } else {
            $scope.headerLikeIcon="ion-heart-broken";
            $scope.customHeart = "ion-ios7-heart-outline";
            console.log("还没有了 $scope.ableToLike", $scope.ableToLike);
          }
          console.log("...value....",value, ",", $scope.articleId);
        });  
      }   
//        
//         $timeout(function() {$('#splashscreen').fadeOut('slow');
//                              $scope.contentDisplayStatus= "flex"; },1000);
//        $scope.displayStatus = 'none';
         $ionicLoading.hide();
//        $timeout(function(){$ionicLoading.hide();},1000);
        $scope.$apply(); //刷新变量
    }); 
    
    
  var followLike = null;
  $scope.$watch('ableToLike', function(){ 
    followLike = $scope.ableToLike;
    console.log("Inner-followLike",followLike);
  });      
  console.log("$scope.ableToLike$scope.ableToLike",$scope.ableToLike);
  console.log("modalLike",followLike);
  $scope.followrate = function() { 
    $scope.customHeart = "ion-ios7-heart customHeartStyle";
    if(followLike == false) {    
       console.log("you have rated it");
      console.log("localStorage['likedArticleId']",localStorage['likedArticleId']);
    } else {
      localStorage['likedArticleId'] += ","+$scope.articleId;
      console.log("localStorage['likedArticleId']",localStorage['likedArticleId']);
      followLike = false;           
      $scope.myDataRef.child('paper').child(-$scope.articleId).update({like: ++$scope.like});
      console.log('ArticleTabCtrl',$scope.like);
//      $scope.apply();
    }
    $scope.ableToLike = followLike;   
  };
    
  var modalLike = null;
  $scope.$watch('ableToLike', function(){ 
    modalLike = $scope.ableToLike;
    console.log("Inner-modalLike",modalLike);
  });     
console.log("ModalCtrl",$scope.ableToLike);
  console.log("modalLike",modalLike);
  $scope.pressLike = function() { 
      if(modalLike == false) {
        $scope.headerLikeIcon = "ion-heart";
        console.log("you have rated it");
        console.log("localStorage['likedArticleId']",localStorage['likedArticleId']);
      } else {
        $scope.headerLikeIcon = "ion-heart";
        localStorage['likedArticleId'] += ","+$scope.articleId;
        console.log("localStorage['likedArticleId']",localStorage['likedArticleId']);
        modalLike = false;           
        $scope.myDataRef.child('paper').child(-$scope.articleId).update({like: ++$scope.like});
      }
    $scope.ableToLike = modalLike;                  
  };
    $scope.sharetoWeChat = function() {     
      WeChat.share('文本', WeChat.Scene.timeline, function () {
        console.log('分享成功~');
      }, function (reason) {
        console.log(reason);
      });
    } 
       
    $scope.yells = [];
    $scope.yellId=""; $scope.myDataRef.child("comment").orderByKey().limitToFirst(1).once('child_added', function(snapshot) {
      var message = snapshot.val();
      $scope.yellId = -snapshot.key();
      console.log($scope.yellId,$scope.yellId);
      for(var i in message){
        $scope.yells.push(message[i]);
      }
        $scope.$apply(); //刷新变量
    }); 
})

.controller('ModalCtrl', function($scope) {   
  
})

.controller('ArticleTabCtrl',function($scope){
//  $scope.read++;
//  console.log("ArticleTabCtrl,articleRead", $scope.read,$scope.like);     
})

.controller('HomeTabCtrl',function($scope){ 
  $scope.image = {src:'http://attachments.gfan.com/forum/attachments2/day_100615/10061516459aa71c9750a2ca99.jpg' };
})

.controller('YellTabCtrl',function($scope, $ionicScrollDelegate){
  console.log('yellTabCtrl',"~~!!!!!!!!!!");
  console.log("yellTabCtrl",$scope.like);
    $scope.doRefresh = function() {
    $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.loadMore = function(){
        console.log("~");                            
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
})

.controller('AboutTabCtrl',function($scope){
  console.log('AboutTabCtrl');
  console.log("AboutTabCtrl",$scope.like);   
})