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
  if (!error?.code) return '';

  const errorMessages: { [index: string]: string } = {
    'auth/wrong-password': 'Hibás email cím vagy jelszó.',
    'auth/user-not-found': 'Hibás email cím vagy jelszó.',
    'auth/invalid-credential': 'Hibás email cím vagy jelszó.',
    'auth-empty': 'Email cím vagy jelszó nincs kitöltve.',
    'email-empty': 'Email cím nincs kitöltve.',
    'auth/invalid-email': 'Hibás email cím.',
    'permission-denied': 'Nincs jogosultságod megtekinteni az oldal tartalmát.',
    'unauthenticated': 'Nincs jogosultságod megtekinteni az oldal tartalmát.',
    'auth/internal-error': 'Sikertelen bejelentkezés.',
    'no-recipe-title':
      'Adj címet a receptnek! Cím megadása: Az első sorban a következőképp: # Példa Cím',
    'empty-recipe': 'Hiba: A recept nem lehet üres.',
    'displayname-empty': 'Adj meg egy felhasználónevet!',
    'displayname-short': 'A felhasználónév túl rövid.',
    'password-empty': 'Adj meg egy jelszót.',
    'auth/weak-password': 'A jelszó nem elég erős.',
    'displayname-long': 'A felhasználónév túl hosszú.',
  };

  return errorMessages[error.code] || 'Ismeretlen hiba.';
}

/**
 * Takes a success code as an argument and returns the corresponding success message
 * @param success The success code
 * @returns The success message
 */
export function successHandler(success: { [index: string]: string }): string {
  if (!success?.code) return '';

  const successMessages: { [index: string]: string } = {
    'name-changed': 'A felhasználónév sikeresen megváltoztatva.',
    'password-changed': 'A jelszó sikeresen megváltoztatva.',
    'password-reset-sent': 'A jelszó visszaállító email sikeresen elküldve.',
  };

  return successMessages[success.code] || 'Ismeretlen hiba.';
}
