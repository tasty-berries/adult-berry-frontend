<script setup lang="ts">
import CharacterRepository from "~/repos/CharacterRepository";
import TitleRepository from "~/repos/TitleRepository";
import type AllowedContent from "~/types/options/AllowedContent";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug)) &&
               (typeof route.params.character_id === 'string' && /^\d+$/.test(route.params.character_id)) &&
               (typeof route.params.character_slug === 'string' && /^[-a-z0-9]+$/.test(route.params.character_slug)) &&
               (typeof route.params.page === 'string' && /^\d*$/.test(route.params.page));
    }
});

const titleRepo     = new TitleRepository();
const characterRepo = new CharacterRepository();
const route         = useRoute();
const titleId       = parseInt(route.params.id as string);
const titleSlug     = route.params.slug as string;
const characterId   = parseInt(route.params.character_id as string);
const characterSlug = route.params.character_slug as string;
const routePage     = parseInt(route.params.page as string);
const page          = ref<number>(routePage ? routePage : 1);

const {data: title}           = await titleRepo.show(titleId);
const {data: character}       = await characterRepo.show(characterId);
const {data: comics, refresh} = await titleRepo.characterComics(titleId, characterId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/titles/${titleId}-${titleSlug}/characters/${characterId}-${characterSlug}/${value}`);
});

if (
    `${title.value?.data.id}-${slugify(title.value?.data.name)}/${character.value?.data.id}-${slugify(character.value?.data.name)}`
    !==
    `${titleId}-${titleSlug}/${characterId}-${characterSlug}`
)
    await navigateTo(`/titles/${title.value?.data.id}-${slugify(title.value?.data.name)}/characters/${character.value?.data.id}-${slugify(character.value?.data.name)}`);

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ character?.data.name }} in {{ title?.data.name }} // Character comics in title</title>
        </Head>

        <UCard class="mb-5">
            <h1 class="text-2xl font-semibold">{{ character?.data.name }} in {{ title?.data.name }}</h1>
        </UCard>

        <PaginatedCards v-if="comics" :items="comics" v-slot="{item}" v-model="page">
            <ComicCard :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>