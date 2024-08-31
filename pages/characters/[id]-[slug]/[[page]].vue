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
const {data: comics}    = await repo.comics(characterId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/characters/${characterId}-${characterSlug}/${value}`);
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
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ character?.data.name }} // Character comics</title>
        </Head>

        <UCard>
            <h1 class="text-2xl font-semibold">{{ character?.data.name }}</h1>
        </UCard>

        <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>

        <PaginatedCards v-if="comics" :items="comics" v-slot="{item}" v-model="page">
            <NuxtLink :to="`/comics/${item.id}/${slugify(item.title)}`">
                <UCard class="overflow-clip"
                       :ui="{body: {padding: ''}}">
                    <template #header>
                        <h3 class="font-semibold text-xl truncate">{{ item.title }}</h3>
                    </template>

                    <img :src="fileUrl(item.preview)" class="w-full h-full"/>

                    <template #footer>
                        <p>
                            <span class="font-semibold">Views:</span>
                            {{ item.views }}
                        </p>

                        <p>
                            <span class="font-semibold">Pages:</span>
                            {{ item.pages_count }}
                        </p>

                        <div v-if="item.tags.length > 0"
                             class="flex flex-wrap items-center gap-1.5">
                            <span class="font-semibold">Tags:</span>
                            <TagBadge v-for="tag in item.tags">{{ tag.name }}</TagBadge>
                        </div>
                    </template>
                </UCard>
            </NuxtLink>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>