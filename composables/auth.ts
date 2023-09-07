import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
export const useAuth = () => {
  const auth = useFirebaseAuth(); // only exists on client side

  function logout() {
    signOut(auth);
  }

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
      })
      .catch((error) => {
        _error = error.code;
      });
    return _error;
  }

  return { logout, login };
};
