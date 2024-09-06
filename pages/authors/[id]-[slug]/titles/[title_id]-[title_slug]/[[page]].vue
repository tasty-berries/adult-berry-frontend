<script setup lang="ts">
import AuthorRepository from "~/repos/AuthorRepository";
import TitleRepository from "~/repos/TitleRepository";
import type AllowedContent from "~/types/options/AllowedContent";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug)) &&
               (typeof route.params.title_id === 'string' && /^\d+$/.test(route.params.title_id)) &&
               (typeof route.params.title_slug === 'string' && /^[-a-z0-9]+$/.test(route.params.title_slug)) &&
               (typeof route.params.page === 'string' && /^\d*$/.test(route.params.page));
    }
});

const authorRepo = new AuthorRepository();
const titleRepo  = new TitleRepository();
const route      = useRoute();
const authorId   = parseInt(route.params.id as string);
const authorSlug = route.params.slug as string;
const titleId    = parseInt(route.params.title_id as string);
const titleSlug  = route.params.title_slug as string;
const routePage  = parseInt(route.params.page as string);
const page       = ref<number>(routePage ? routePage : 1);

const {data: author}          = await authorRepo.show(authorId);
const {data: title}           = await titleRepo.show(titleId);
const {data: comics, refresh} = await authorRepo.titleComics(authorId, titleId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/authors/${authorId}-${authorSlug}/titles/${titleId}-${titleSlug}/${value}`);
});

if (
    `${author.value?.data.id}-${slugify(author.value?.data.name)}/${title.value?.data.id}-${slugify(title.value?.data.name)}`
    !==
    `${authorId}-${authorSlug}/${titleId}-${titleSlug}`
)
    await navigateTo(`/authors/${author.value?.data.id}-${slugify(author.value?.data.name)}/titles/${title.value?.data.id}-${slugify(title.value?.data.name)}`);

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ title?.data.name }} in {{ author?.data.name }} // Title comics by author</title>
        </Head>

        <UCard class="mb-5">
            <h1 class="text-2xl font-semibold">{{ title?.data.name }} by {{ author?.data.name }}</h1>
        </UCard>

        <PaginatedCards v-if="comics" :items="comics" v-slot="{item}" v-model="page">
            <ComicCard :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>