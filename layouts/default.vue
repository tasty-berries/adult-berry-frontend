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
    <div class="bg-gray-100 dark:bg-gray-950 min-h-dvh flex flex-col">
        <NuxtLoadingIndicator/>

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

        <UContainer class="py-5 grow">
            <NuxtPage/>
        </UContainer>

        <UFooter>
            <template #left>
                Copyright &copy; {{ new Date().getFullYear() }}
            </template>

            <template #right>
                <UTooltip text="Source code">
                    <UButton icon="i-simple-icons-github"
                             color="gray"
                             variant="ghost"
                             to="https://github.com/tasty-berries"
                             target="_blank"/>
                </UTooltip>
            </template>
        </UFooter>
    </div>
</template>

<style scoped>

</style>