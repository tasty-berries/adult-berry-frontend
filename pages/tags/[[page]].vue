<script setup lang="ts">
import TagRepository from "~/repos/TagRepository";
import type AllowedContent from "~/types/options/AllowedContent";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

const repo      = new TagRepository();
const routePage = parseInt(useRoute().params.page as string);
const page      = ref<number>(routePage ? routePage : 1);

const {data: tags, refresh} = await repo.index(page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/tags/${value}`);
});

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}Tags</title>
        </Head>

        <PaginatedCards v-if="tags" :items="tags" v-slot="{item}" v-model="page">
            <TagCard :to="`/tags/${item.id}-${slugify(item.name)}`"
                     :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>