<script setup lang="ts">
import { useAnimationStore } from '@/stores/animation';
import FlyingItem from './FlyingItem.vue';

const store = useAnimationStore();
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-9999">
    <!-- removeFlyingElement，移除AnimationStore数据，随即移除DOM -->
    <FlyingItem
      v-for="item in store.flyingElements"
      :key="item.id"
      :item="item"
      @complete="store.removeFlyingElement(item.id)"
    />
  </div>
</template>
