<script setup lang="ts">
defineProps<{
    to?: string
}>();
</script>

<template>
    <NuxtLink class="bg-gray-100 rounded px-1.5 text-sm border shadow-sm font-semibold" :to="to">
        <slot/>
    </NuxtLink>
</template>

<style scoped>

</style>