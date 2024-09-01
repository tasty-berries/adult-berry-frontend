<script setup lang="ts">
import TagRepository from "~/repos/TagRepository";
import AuthorRepository from "~/repos/AuthorRepository";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug)) &&
               (typeof route.params.tag_id === 'string' && /^\d+$/.test(route.params.tag_id)) &&
               (typeof route.params.tag_slug === 'string' && /^[-a-z0-9]+$/.test(route.params.tag_slug)) &&
               (typeof route.params.page === 'string' && /^\d*$/.test(route.params.page));
    }
});

const authorRepo = new AuthorRepository();
const tagRepo    = new TagRepository();
const route      = useRoute();
const authorId   = parseInt(route.params.id as string);
const authorSlug = route.params.slug as string;
const tagId      = parseInt(route.params.tag_id as string);
const tagSlug    = route.params.tag_slug as string;
const routePage  = parseInt(route.params.page as string);
const page       = ref<number>(routePage ? routePage : 1);

const {data: author} = await authorRepo.show(authorId);
const {data: tag}    = await tagRepo.show(tagId);
const {data: comics} = await authorRepo.tagComics(authorId, tagId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/authors/${authorId}-${authorSlug}/tags/${tagId}-${tagSlug}/${value}`);
});

if (
    `${author.value?.data.id}-${slugify(author.value?.data.name)}/${tag.value?.data.id}-${slugify(tag.value?.data.name)}`
    !==
    `${authorId}-${authorSlug}/${tagId}-${tagSlug}`
)
    await navigateTo(`/authors/${author.value?.data.id}-${slugify(author.value?.data.name)}/tags/${tag.value?.data.id}-${slugify(tag.value?.data.name)}`);
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ tag?.data.name }} in {{ author?.data.name }} // Tag comics by author</title>
        </Head>

        <UCard class="mb-5">
            <h1 class="text-2xl font-semibold">{{ tag?.data.name }} by {{ author?.data.name }}</h1>
        </UCard>

        <PaginatedCards v-if="comics" :items="comics" v-slot="{item}" v-model="page">
            <ComicCard :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>