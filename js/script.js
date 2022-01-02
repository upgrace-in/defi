function change_tab(e, type) {
    $('.con').hide();
    if ($(window).width() < 780) {
        $('.navigation_wrapper__3gcGH').fadeOut();
    }
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

$(document).ready(() => {
    if ($(window).width() < 780) {
        $('.ord1').addClass('order-1');
        $('.ord2').addClass('order-2');
        $('.dots').hide();
    }
});

function open_project(proj_num) {
    $('.con').hide();
    if (proj_num == '1') {
        $('#1_project').fadeIn();
    } else if (proj_num == '2') {
        $('#2_project').fadeIn();
    } else {
        $('#3_project').fadeIn();
    }
}