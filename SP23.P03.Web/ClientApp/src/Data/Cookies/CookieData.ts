
export function getCookie(name: string) {
    const nameEquiv = `${name}=`;
    const cookie = document.cookie.split(';')

    for (let i = 0; i < cookie.length; i++) {
        let c = cookie[i]
        
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEquiv) === 0) {
            return c.substring(nameEquiv.length, c.length)
        }
    }
    return null;
}

export function setCookie(name, value, expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
  }

export function deleteCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}