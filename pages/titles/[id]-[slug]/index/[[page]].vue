<script setup lang="ts">
import TitleRepository from "~/repos/TitleRepository";

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

const {data: comics} = await repo.comics(titleId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/titles/${titleId}-${titleSlug}/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ title.name }} // Title comics</title>
        </Head>

        <PaginatedCards v-if="comics" :items="comics" v-slot="{item}" v-model="page">
            <ComicCard :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>