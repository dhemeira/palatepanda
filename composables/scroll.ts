export const useScroll = (hideOnScroll: boolean) => {
  const showFab = useState('showFab', () => !hideOnScroll);
  onMounted(() => {
    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });

  /**
   * On the scroll event either shows or hides the FAB
   */
  function onScroll() {
    if (hideOnScroll) showFab.value = window.scrollY > 200;
    else showFab.value = true;
  }

  return { showFab };
};
