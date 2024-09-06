<script setup lang="ts">
import CharacterRepository from "~/repos/CharacterRepository";
import TagRepository from "~/repos/TagRepository";
import type AllowedContent from "~/types/options/AllowedContent";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug)) &&
               (typeof route.params.tag_id === 'string' && /^\d+$/.test(route.params.tag_id)) &&
               (typeof route.params.tag_slug === 'string' && /^[-a-z0-9]+$/.test(route.params.tag_slug)) &&
               (typeof route.params.page === 'string' && /^\d*$/.test(route.params.page));
    }
});

const characterRepo = new CharacterRepository();
const tagRepo       = new TagRepository();
const route         = useRoute();
const characterId   = parseInt(route.params.id as string);
const characterSlug = route.params.slug as string;
const tagId         = parseInt(route.params.tag_id as string);
const tagSlug       = route.params.tag_slug as string;
const routePage     = parseInt(route.params.page as string);
const page          = ref<number>(routePage ? routePage : 1);

const {data: character}       = await characterRepo.show(characterId);
const {data: tag}             = await tagRepo.show(tagId);
const {data: comics, refresh} = await characterRepo.tagComics(characterId, tagId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/characters/${characterId}-${characterSlug}/tags/${tagId}-${tagSlug}/${value}`);
});

if (
    `${character.value?.data.id}-${slugify(character.value?.data.name)}/${tag.value?.data.id}-${slugify(tag.value?.data.name)}`
    !==
    `${characterId}-${characterSlug}/${tagId}-${tagSlug}`
)
    await navigateTo(`/characters/${character.value?.data.id}-${slugify(character.value?.data.name)}/tags/${tag.value?.data.id}-${slugify(tag.value?.data.name)}`);

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ tag?.data.name }} with {{ character?.data.name }} // Tag comics with character</title>
        </Head>

        <UCard class="mb-5">
            <h1 class="text-2xl font-semibold">{{ tag?.data.name }} with {{ character?.data.name }}</h1>
        </UCard>

        <PaginatedCards v-if="comics" :items="comics" v-slot="{item}" v-model="page">
            <ComicCard :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>