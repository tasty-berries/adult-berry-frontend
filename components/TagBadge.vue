<script setup lang="ts">
defineProps<{
    to?: string
}>();
</script>

<template>
    <NuxtLink :to="to">
        <UBadge color="gray">
            <slot/>
        </UBadge>
    </NuxtLink>
</template>

<style scoped>

</style>