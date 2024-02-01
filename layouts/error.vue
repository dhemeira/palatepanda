<template>
  <div
    tabindex="-1"
    :class="['wrapper', 'bg-background-dark', 'outline-none', 'dark']">
    <div
      tabindex="-1"
      id="main"
      :class="['min-h-screen outline-none']">
      <main>
        <slot />
      </main>
      <LazyNavigationFooterDefault />
    </div>
  </div>
</template>
