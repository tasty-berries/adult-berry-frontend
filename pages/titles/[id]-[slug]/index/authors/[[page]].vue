<script setup lang="ts">
import TitleRepository from "~/repos/TitleRepository";
import type AllowedContent from "~/types/options/AllowedContent";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

defineProps<{
    title: any
}>();

const repo      = new TitleRepository();
const route     = useRoute();
const routePage = parseInt(route.params.page as string);
const titleId   = parseInt(route.params.id as string);
const titleSlug = route.params.slug as string;
const page      = ref<number>(routePage ? routePage : 1);

const {data: authors, refresh} = await repo.authors(titleId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/titles/${titleId}-${titleSlug}/authors/${value}`);
});

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ title.name }} // Title authors</title>
        </Head>

        <PaginatedCards v-if="authors" :items="authors" v-slot="{item}" v-model="page">
            <AuthorCard :to="`/authors/${item.id}-${slugify(item.name)}/titles/${titleId}-${titleSlug}`"
                        :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>