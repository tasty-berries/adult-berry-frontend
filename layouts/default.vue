<script setup lang="ts">
const route = useRoute();

const links = computed(() => [{
    label : 'Comics',
    to    : '/',
    active: /^\/\d*$/.test(route.path) || route.path.startsWith('/comics')
}, {
    label : 'Characters',
    to    : '/characters',
    active: route.path.startsWith('/characters')
}]);
</script>

<template>
    <div>
        <UHeader :links="links">
            <template #logo>
                Adult Berry
            </template>
        </UHeader>

        <UContainer class="py-5">
            <NuxtPage/>
        </UContainer>
    </div>
</template>

<style scoped>

</style>