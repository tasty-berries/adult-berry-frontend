<script setup lang="ts">
import TitleRepository from "~/repos/TitleRepository";
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

const titleRepo = new TitleRepository();
const tagRepo   = new TagRepository();
const route     = useRoute();
const titleId   = parseInt(route.params.id as string);
const titleSlug = route.params.slug as string;
const tagId     = parseInt(route.params.tag_id as string);
const tagSlug   = route.params.tag_slug as string;
const routePage = parseInt(route.params.page as string);
const page      = ref<number>(routePage ? routePage : 1);

const {data: title}           = await titleRepo.show(titleId);
const {data: tag}             = await tagRepo.show(tagId);
const {data: comics, refresh} = await titleRepo.tagComics(titleId, tagId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/titles/${titleId}-${titleSlug}/tags/${tagId}-${tagSlug}/${value}`);
});

if (
    `${title.value?.data.id}-${slugify(title.value?.data.name)}/${tag.value?.data.id}-${slugify(tag.value?.data.name)}`
    !==
    `${titleId}-${titleSlug}/${tagId}-${tagSlug}`
)
    await navigateTo(`/titles/${title.value?.data.id}-${slugify(title.value?.data.name)}/tags/${tag.value?.data.id}-${slugify(tag.value?.data.name)}`);

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ tag?.data.name }} in {{ title?.data.name }} // Tag comics in title</title>
        </Head>

        <UCard class="mb-5">
            <h1 class="text-2xl font-semibold">{{ tag?.data.name }} in {{ title?.data.name }}</h1>
        </UCard>

        <PaginatedCards v-if="comics" :items="comics" v-slot="{item}" v-model="page">
            <ComicCard :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>