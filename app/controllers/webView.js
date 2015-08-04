var navi = Alloy.Globals.naviWindow;

var args = arguments[0] || {};


$.searchedContents.url = args.urlQuery;

function reload(){
    $.searchedContents.reload();
}

/*function previous (){
    $.searchedContents.goBack();
}

function next(){
    $.searchedContents.goForward();
}*/

/*$.nextbutton.addEventListener('click', function(e) {

        var anim = Ti.UI.createAnimation({
            left: Ti.Platform.displayCaps.platformWidth,
            duration: 500
        });
        $.webView.close(anim);

});*/

/*if (Ti.Platform.name === 'iPhone OS'){
  $.activityIndicator.style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
}
else {
  $.activityIndicator.style = Ti.UI.ActivityIndicatorStyle.DARK;
}*/

/*$.searchedContents.addEventListener("load", function(e){
    $.activityIndicator.hide();
    if($.searchedContents.canGoBack()){
        $.arrowLeft.show(); 
    } else {
        $.arrowLeft.hide();
    }

    if($.searchedContents.canGoForward()){
        $.arrowRight.show();    
    } else {
        $.arrowRight.hide();
    }
});*/

