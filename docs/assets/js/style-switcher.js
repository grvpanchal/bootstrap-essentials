
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

function themeUrl(theme) {
    if (!theme || theme === 'default') return '';
    return 'https://maxcdn.bootstrapcdn.com/bootswatch/3.4.1/' + theme + '/bootstrap.min.css';
}

function applyTheme(theme) {
    var bs = document.getElementById('bs-css');
    if (bs) bs.href = themeUrl(theme);
    // The bse-css slot held a per-theme bootstrap-essentials build that was
    // hosted on themes.bootstrapessentials.com (now retired). Bootswatch only
    // ships a Bootstrap CSS, so we leave bse-css empty and rely on the stock
    // bootstrap-essentials build loaded earlier in <head>.
    var bse = document.getElementById('bse-css');
    if (bse) bse.href = '';
}

document.addEventListener('DOMContentLoaded', function () {

    var themeSelect = document.getElementById('change-css');

    if (readCookie('css')) {
        var cookieCSS = readCookie('css');
        applyTheme(cookieCSS);
        if (themeSelect) {
            var opts = themeSelect.options;
            for (var opt, j = 0; opt = opts[j]; j++) {
                if (opt.value == cookieCSS) {
                    themeSelect.selectedIndex = j;
                    break;
                }
            }
        }
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', function (event) {
            var theme = this.options[this.selectedIndex].value;
            applyTheme(theme);
            if (readCookie('css')) {
                eraseCookie('css');
            }
            createCookie('css', theme, 365);
            event.preventDefault();
        }, false);
    }
})