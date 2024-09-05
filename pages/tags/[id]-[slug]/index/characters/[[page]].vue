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

const {data: characters} = await repo.characters(tagId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/tags/${tagId}-${tagSlug}/characters/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ tag.name }} // Tag characters</title>
        </Head>

        <PaginatedCards v-if="characters" :items="characters" v-slot="{item}" v-model="page">
            <CharacterCard :to="`/characters/${item.id}-${slugify(item.name)}/tags/${tagId}-${tagSlug}`"
                           :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>