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
import { writeBatch, getFirestore, getDocs, collection } from 'firebase/firestore/lite';

export const useAuth = () => {
  const auth = useFirebaseAuth() as Auth; // only exists on client side
  const user = useCurrentUser();
  const db = useFirestore();
  const _database = getFirestore(db.app);

  function logout() {
    signOut(auth);
  }

  /**
   * Logs in the user and offers to save the login details
   * @returns undefined on success or error code
   */
  async function login(email: string, password: string): Promise<string | undefined> {
    let _error: undefined | string;
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // does borwser support password manager
        if (window.PasswordCredential) {
          const _credential = new window.PasswordCredential({
            id: email,
            password: password,
          });
          // save data
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
   * @returns undefined on success or error code
   */
  async function changeName(username: string): Promise<string | undefined> {
    let _error;
    await updateProfile(user.value as User, {
      displayName: username,
      photoURL: '',
    }).catch((error) => {
      _error = error.code;
    });

    if (!_error) {
      updateAuthorName(username);
    }
    return _error;
  }

  async function updateAuthorName(username: string) {
    let counter = 0;
    const batch = writeBatch(_database);
    const _querySnapshot = await getDocs(collection(_database, `users/${user.value?.uid}/recipes`));

    _querySnapshot.forEach(async (doc) => {
      batch.update(doc.ref, { name: username });
      counter++;
      if (counter == 500) {
        await batch.commit();
        counter = 0;
      }
    });
    await batch.commit();
  }

  /**
   * @returns undefined on success or error code
   */
  async function changePassword(password: string): Promise<string | undefined> {
    let _error;

    await updatePassword(user.value as User, password).catch((error) => {
      _error = error.code;
    });
    return _error;
  }

  /**
   * @returns undefined on success or error code
   */
  async function resetPassword(email: string): Promise<string | undefined> {
    let _error;
    await sendPasswordResetEmail(auth, email).catch((error) => {
      _error = error.code;
    });
    return _error;
  }

  return { logout, login, changeName, changePassword, resetPassword };
};
