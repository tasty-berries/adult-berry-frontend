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

const {data: characters} = await repo.characters(titleId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/titles/${titleId}-${titleSlug}/characters/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ title.name }} // Title characters</title>
        </Head>

        <PaginatedCards v-if="characters" :items="characters" v-slot="{item}" v-model="page">
            <CharacterCard :item="item"
                           :to="`/titles/${titleId}-${titleSlug}/characters/${item.id}-${slugify(item.name)}`"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>