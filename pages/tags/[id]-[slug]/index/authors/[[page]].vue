<script setup lang="ts">
import TagRepository from "~/repos/TagRepository";
import type AllowedContent from "~/types/options/AllowedContent";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

defineProps<{
    tag: any
}>();

const repo      = new TagRepository();
const route     = useRoute();
const routePage = parseInt(route.params.page as string);
const tagId     = parseInt(route.params.id as string);
const tagSlug   = route.params.slug as string;
const page      = ref<number>(routePage ? routePage : 1);

const {data: authors, refresh} = await repo.authors(tagId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/tags/${tagId}-${tagSlug}/authors/${value}`);
});

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ tag.name }} // Tag authors</title>
        </Head>

        <PaginatedCards v-if="authors" :items="authors" v-slot="{item}" v-model="page">
            <AuthorCard :to="`/authors/${item.id}-${slugify(item.name)}/tags/${tagId}-${tagSlug}`"
                        :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>