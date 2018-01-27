
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

document.addEventListener('DOMContentLoaded', function () {

    if (readCookie('css')) {
        var bs = document.getElementById('bs-css');
        var bse = document.getElementById('bse-css');
        var cookieCSS = readCookie('css')
        var themeSelect = document.getElementById('change-css');
        bs.href = 'http://themes.bootstrapessentials.com/dist/themes/' + cookieCSS + '/css/' + cookieCSS + '-bootstrap.css';
        bse.href = 'http://themes.bootstrapessentials.com/dist/themes/' + cookieCSS + '/css/' + cookieCSS + '-bootstrap-essentials.css';
        var opts = themeSelect.options;
        for (var opt, j = 0; opt = opts[j]; j++) {
            if (opt.value == cookieCSS) {
                themeSelect.selectedIndex = j;
                break;
            }
        }
    }

    var element = document.getElementById('change-css'); // <a herf="#" id="change-css" rel="file.css">Click Here</a>
    element.addEventListener('change', function (event) {
        var bs = document.getElementById('bs-css');
        var bse = document.getElementById('bse-css');
        bs.href = 'http://themes.bootstrapessentials.com/dist/themes/' + this.options[this.selectedIndex].value + '/css/' + this.options[this.selectedIndex].value + '-bootstrap.css';
        bse.href = 'http://themes.bootstrapessentials.com/dist/themes/' + this.options[this.selectedIndex].value + '/css/' + this.options[this.selectedIndex].value + '-bootstrap-essentials.css';
        if (readCookie('css')) {
            eraseCookie('css');
        }
        createCookie('css', this.options[this.selectedIndex].value, 365);
        event.preventDefault();
    }, false);
})