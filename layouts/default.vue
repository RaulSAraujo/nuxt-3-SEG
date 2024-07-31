<template>
  <v-app>
    <Header />

    <div :class="$route.name !== 'home' ? 'main' : ''">
      <slot />
    </div>
  </v-app>
</template>

<style lang="css" scoped>
.main {
  flex: 1 0 auto;
  max-width: 100%;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding-top: 64px;
}
</style>
