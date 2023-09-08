import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
  type User,
  type Auth,
  updatePassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
export const useAuth = () => {
  const auth = useFirebaseAuth() as Auth; // only exists on client side
  const user = useCurrentUser();

  /**
   * Logs out the current user
   */
  function logout() {
    signOut(auth);
  }

  /**
   * Logs in the user and offers to save the login details
   * @param email The email address used to login
   * @param password The password used to login
   * @returns The error code or undefined
   */
  async function login(email: string, password: string): Promise<string | undefined> {
    let _error: undefined | string;
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        //támogatja-e a böngésző a jelszókezelőt
        if (window.PasswordCredential) {
          const _credential = new window.PasswordCredential({
            id: email,
            password: password,
          });
          //adatok mentése
          navigator.credentials.store(_credential);
        }
        if (!(user.value as User).emailVerified) {
          sendEmailVerification(user.value as User);
        }
      })
      .catch((error) => {
        _error = error.code;
      });
    return _error;
  }

  /**
   * Changes the username of the current user
   * @param username The new username
   * @returns The error code or undefined
   */
  async function changeName(username: string): Promise<string | undefined> {
    let _error;
    await updateProfile(user.value as User, {
      displayName: username,
      photoURL: '',
    }).catch((error) => {
      _error = error.code;
    });
    return _error;
  }

  /**
   * Changes the passwrod of the current user
   * @param password The new password
   * @returns The error code or undefined
   */
  async function changePw(password: string): Promise<string | undefined> {
    let _error;

    await updatePassword(user.value as User, password).catch((error) => {
      _error = error.code;
    });
    return _error;
  }

  async function resetPassword(email: string): Promise<string | undefined> {
    let _error;
    await sendPasswordResetEmail(auth, email).catch((error) => {
      _error = error.code;
    });
    return _error;
  }

  return { logout, login, changeName, changePw, resetPassword };
};
