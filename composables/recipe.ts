import {
  collection,
  getCount,
  getFirestore,
  getDocs,
  collectionGroup,
} from 'firebase/firestore/lite';
export const useRecipe = () => {
  const user = useCurrentUser();
  const countRecipes = useState('userRecipeCount', () => null as number | null);
  const db = useFirestore();
  const _database = getFirestore(db.app);

  /**
   * Counts the recipes the user has
   * @returns The count
   */
  async function getRecipesCount() {
    if (!countRecipes.value) {
      const _coll = collection(_database, `users/${user.value?.uid}/recipes`);
      const _snapshot = await getCount(_coll);
      countRecipes.value = _snapshot.data().count;
    }
    return countRecipes.value;
  }

  /**
   * Reads the authenticated user's recipes and pushes them into the recipes array
   */
  async function readRecipeList() {
    const recipes = [] as any;
    const _querySnapshot = await getDocs(collectionGroup(_database, 'recipes'));
    _querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().coverImage)
        recipes.push({
          id: doc.id,
          title: doc.data().title,
          coverImage: doc.data().coverImage,
        });
      else recipes.push({ id: doc.id, title: doc.data().title });
    });

    return recipes;
  }

  /**
   * Reads the authenticated user's recipes and pushes them into the recipes array
   */
  async function readOwnRecipeList() {
    const recipes = [] as any;
    const _querySnapshot = await getDocs(collection(_database, `users/${user.value?.uid}/recipes`));
    _querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().coverImage)
        recipes.push({
          id: doc.id,
          title: doc.data().title,
          coverImage: doc.data().coverImage,
        });
      else recipes.push({ id: doc.id, title: doc.data().title });
    });

    return recipes;
  }

  return { getRecipesCount, readRecipeList, readOwnRecipeList };
};
