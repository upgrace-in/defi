function change_tab(e, type) {
    $('.con').hide();
    if (type == 'upcoming') {
        $('#upcoming_projects').fadeIn();
    } else if (type == 'home') {
        $('#home').fadeIn();
    }
    $(".nav-item_linkBody__2ilRo").css({ 'background-color': 'rgb(15, 20, 29)' })
    $('.nav-item_spacer__3_Yzq').css({ 'background-color': 'rgb(15, 20, 29)' });
    $(e).css({ 'background-color': 'rgb(29, 34, 47)' })
}

function open_nav() {
    $('.nav-item_text__1Kr9k').hide();
    if ($('.navigation_wrapper__3gcGH:visible').length == 1) {
        $('.navigation_wrapper__3gcGH').fadeOut();
    } else {
        $('.navigation_wrapper__3gcGH').fadeIn();
    }
}