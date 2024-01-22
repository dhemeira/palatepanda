import {
  collection,
  getCount,
  getFirestore,
  getDocs,
  collectionGroup,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore/lite';

export const useRecipe = () => {
  const user = useCurrentUser();
  const db = useFirestore();
  const _database = getFirestore(db.app);

  async function getUserRecipesCount() {
    const _collection = collection(_database, `users/${user.value?.uid}/recipes`);
    const _snapshot = await getCount(_collection);

    return _snapshot.data().count;
  }

  function readFromQuerySnapshot(querySnapshot: QuerySnapshot) {
    const recipes = [] as any;

    querySnapshot.forEach((doc: DocumentData) => {
      recipes.push({
        id: doc.id,
        title: doc.data().title,
        coverImage: doc.data().coverImage ?? undefined,
        author: doc.ref.path.split('/')[1],
        authorName: doc.data().name,
      });
    });

    return recipes;
  }

  async function readRecipeList() {
    const _querySnapshot = await getDocs(collectionGroup(_database, 'recipes'));

    return readFromQuerySnapshot(_querySnapshot);
  }

  async function readOwnRecipeList() {
    const _querySnapshot = await getDocs(collection(_database, `users/${user.value?.uid}/recipes`));

    return readFromQuerySnapshot(_querySnapshot);
  }

  return { getUserRecipesCount, readRecipeList, readOwnRecipeList };
};
