<script setup lang="ts">
import CharacterRepository from "~/repos/CharacterRepository";
import AuthorRepository from "~/repos/AuthorRepository";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug)) &&
               (typeof route.params.character_id === 'string' && /^\d+$/.test(route.params.character_id)) &&
               (typeof route.params.character_slug === 'string' && /^[-a-z0-9]+$/.test(route.params.character_slug)) &&
               (typeof route.params.page === 'string' && /^\d*$/.test(route.params.page));
    }
});

const authorRepo    = new AuthorRepository();
const characterRepo = new CharacterRepository();
const route         = useRoute();
const authorId      = parseInt(route.params.id as string);
const authorSlug    = route.params.slug as string;
const characterId   = parseInt(route.params.character_id as string);
const characterSlug = route.params.character_slug as string;
const routePage     = parseInt(route.params.page as string);
const page          = ref<number>(routePage ? routePage : 1);

const {data: author}    = await authorRepo.show(authorId);
const {data: character} = await characterRepo.show(characterId);
const {data: comics}    = await authorRepo.characterComics(authorId, characterId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/authors/${authorId}-${authorSlug}/characters/${characterId}-${characterSlug}/${value}`);
});

if (
    `${author.value?.data.id}-${slugify(author.value?.data.name)}/${character.value?.data.id}-${slugify(character.value?.data.name)}`
    !==
    `${authorId}-${authorSlug}/${characterId}-${characterSlug}`
)
    await navigateTo(`/authors/${author.value?.data.id}-${slugify(author.value?.data.name)}/characters/${character.value?.data.id}-${slugify(character.value?.data.name)}`);
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ character?.data.name }} by {{ author?.data.name }} // Character comics by author</title>
        </Head>

        <UCard class="mb-5">
            <h1 class="text-2xl font-semibold">{{ character?.data.name }} by {{ author?.data.name }}</h1>
        </UCard>

        <PaginatedCards v-if="comics" :items="comics" v-slot="{item}" v-model="page">
            <ComicCard :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>