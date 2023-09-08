export function cookieValue(key: string) {
  return document.cookie
    ?.split('; ')
    ?.find((row) => row.startsWith(key))
    ?.split('=')[1];
}

export function debounce(func: TimerHandler, time: number): EventListenerOrEventListenerObject {
  let _timer: number;
  return function (event: Event) {
    if (_timer) clearTimeout(_timer);
    _timer = setTimeout(func, time, event);
  };
}

/**
 * Takes an error code as an argument and returns the corresponding error message
 * @param error The error code
 * @returns The error message
 */
export function errorHandler(error: { [index: string]: string }): string {
  if (!error) return '';
  if (!error.code) return '';
  switch (error.code) {
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return `Hibás email cím vagy jelszó.`;
    case 'auth-empty':
      return 'Email cím vagy jelszó nincs kitöltve.';
    case 'email-empty':
      return 'Email cím nincs kitöltve.';
    case 'auth/invalid-email':
      return `Hibás email cím.`;
    case 'permission-denied':
    case 'unauthenticated':
      return `Nincs jogosultságod megtekinteni az oldal tartalmát.`;
    case 'auth/internal-error':
      return `Sikertelen bejelentkezés.`;
    case 'no-recipe-title':
      return 'Adj címet a receptnek! Cím megadása: Az első sorban a következőképp: # Példa Cím';
    case 'empty-recipe':
      return 'Hiba: A recept nem lehet üres.';
    case 'displayname-empty':
      return 'Adj meg egy felhasználónevet!';
    case 'displayname-short':
      return 'A felhasználónév túl rövid.';
    case 'password-empty':
      return 'Adj meg egy jelszót.';
    case 'auth/weak-password':
      return 'A jelszó nem elég erős.';
    case 'displayname-long':
      return 'A felhasználónév túl hosszú.';
    default:
      return 'Ismeretlen hiba.';
  }
}

/**
 * Takes a success code as an argument and returns the corresponding success message
 * @param success The success code
 * @returns The success message
 */
export function successHandler(success: { [index: string]: string }): string {
  if (!success) return '';
  if (!success.code) return '';
  switch (success.code) {
    case 'name-changed':
      return 'A felhasználónév sikeresen megváltoztatva.';
    case 'password-changed':
      return 'A jelszó sikeresen megváltoztatva.';
    case 'password-reset-sent':
      return 'A jelszó visszaállító email sikeresen elküldve.';
    default:
      return 'Ismeretlen siker.';
  }
}
