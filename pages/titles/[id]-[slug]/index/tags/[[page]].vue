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

const {data: tags, refresh} = await repo.tags(titleId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/titles/${titleId}-${titleSlug}/tags/${value}`);
});

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ title.name }} // Title tags</title>
        </Head>

        <PaginatedCards v-if="tags" :items="tags" v-slot="{item}" v-model="page">
            <TagCard :to="`/titles/${titleId}-${titleSlug}/tags/${item.id}-${slugify(item.name)}`"
                     :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>