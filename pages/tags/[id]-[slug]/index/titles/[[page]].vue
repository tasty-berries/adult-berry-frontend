<script setup lang="ts">
import TagRepository from "~/repos/TagRepository";

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

const {data: titles} = await repo.titles(tagId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/tags/${tagId}-${tagSlug}/titles/${value}`);
});
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ tag.name }} // Tag titles</title>
        </Head>

        <PaginatedCards v-if="titles" :items="titles" v-slot="{item}" v-model="page">
            <TitleCard :to="`/titles/${item.id}-${slugify(item.name)}/tags/${tagId}-${tagSlug}`"
                       :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>