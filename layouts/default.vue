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
}, {
    label : 'Tags',
    to    : '/tags',
    active: route.path.startsWith('/tags')
}, {
    label : 'Titles',
    to    : '/titles',
    active: route.path.startsWith('/titles')
}, {
    label : 'Authors',
    to    : '/authors',
    active: route.path.startsWith('/authors')
}]);
</script>

<template>
    <div>
        <UHeader :links="links">
            <template #logo>
                Adult Berry
            </template>

            <template #right>
                <SearchPanel/>

                <UTooltip text="Color mode">
                    <UColorModeButton/>
                </UTooltip>
            </template>
        </UHeader>

        <UContainer class="py-5">
            <NuxtPage/>
        </UContainer>
    </div>
</template>

<style scoped>

</style>