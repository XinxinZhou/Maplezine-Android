// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic','starter.controllers'])
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl:"templates/tabs.html"    
    })
   
    .state('tabs.home', {
        url: "/home",
        views: {
            'home-tab': {
                animation: 'slide-in-up',
                templateUrl: "templates/home.html",
                controller: 'HomeTabCtrl'
            }
        }
    })
    .state('tabs.article',{
        url: "/article",
        views: {
          'article-tab': {
              animation: 'slide-in-up',
              templateUrl: "templates/article.html",
              controller: 'ArticleTabCtrl'
          }
        }
    })   
    
    .state('tabs.yell', {
        url: "/yell",
        views: {
            'yell-tab': {
                animation: 'slide-in-up',
                templateUrl: "templates/yell.html",
                controller: 'YellTabCtrl'
            }
        }
    })
    
    .state('tabs.about', {
    url: "/about",
    views: {
        'about-tab': {
            animation: 'slide-in-up',
          templateUrl: "templates/about.html",
            controller: 'AboutTabCtrl'
            }
        }
    }) 
        $urlRouterProvider.otherwise("/tab/home");
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})


    

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.registerBackButtonAction(function (event) {
                    event.preventDefault();
            }, 100);

  $ionicPlatform.onHardwareBackButton(function () {
      if(true) { // your check here
          $ionicPopup.confirm({
            title: 'Sweet Tips',
            template: 'Are you sure you want to exit?'
          }).then(function(res){
            if( res ){
              navigator.app.exitApp();
            }
          })
      }
  })
});
