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

const viewAccepted = useCookie<boolean|undefined>('viewAccepted', {default: () => undefined});
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

                <UTooltip text="Adult settings">
                    <UButton icon="i-uil-18-plus"
                             variant="ghost"
                             color="gray"
                             @click="viewAccepted = undefined"/>
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

        <UModal :model-value="viewAccepted === undefined">
            <UCard :ui="{ring: ''}">
                <template #header>
                    <h3 class="font-semibold text-lg">Attention!</h3>
                </template>

                <p>
                    The site contains adult materials. If you are not ready to view such content, please close the site.
                    All responsibility for possible problems during and after viewing remains solely with you.
                </p>

                <template #footer>
                    <div class="flex gap-2.5 justify-end">
                        <UButton color="gray"
                                 label="Okay, let's go!"
                                 @click="viewAccepted = true"/>

                        <UButton color="red"
                                 label="No, thanks"
                                 tabindex="1"
                                 @click="viewAccepted = false"/>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<style scoped>

</style>