<script setup lang="ts">
import CharacterRepository from "~/repos/CharacterRepository";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug)) &&
               (typeof route.params.page === 'string' && /^\d*$/.test(route.params.page));
    }
});

const repo          = new CharacterRepository();
const route         = useRoute();
const routePage     = parseInt(route.params.page as string);
const characterId   = parseInt(route.params.id as string);
const characterSlug = route.params.slug as string;
const page          = ref<number>(routePage ? routePage : 1);

const {data: character} = await repo.show(characterId);
const {data: tags}      = await repo.tags(characterId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/characters/${characterId}-${characterSlug}/tags/${value}`);
});

const links = [{
    label: 'Comics',
    to: `/characters/${characterId}-${characterSlug}`
}, {
    label: 'Tags',
    to: `/characters/${characterId}-${characterSlug}/tags`
}];
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ character?.data.name }} // Character tags</title>
        </Head>

        <UCard>
            <h1 class="text-2xl font-semibold">{{ character?.data.name }}</h1>
        </UCard>

        <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>

        <PaginatedCards v-if="tags" :items="tags" v-slot="{item}" v-model="page">
            <NuxtLink :to="``">
                <UCard class="overflow-clip"
                       :ui="{body: {padding: ''}}">
                    <template #header>
                        <h3 class="font-semibold text-xl truncate">{{ item.name }}</h3>
                    </template>
                </UCard>
            </NuxtLink>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>