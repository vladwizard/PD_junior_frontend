export function getCoockieFavoritePhotos() {
    let coockieValue = getCookie('photos')
    if (coockieValue) return JSON.parse(coockieValue)
    else return []

}
export function setCoockieFavoritePhotos(ArrayPhoto) {
    setCookie('photos', JSON.stringify(ArrayPhoto), { secure: false, 'max-age': 3600 })
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined
}
function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey
        let optionValue = options[optionKey]
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue
        }
    }

    document.cookie = updatedCookie;
}