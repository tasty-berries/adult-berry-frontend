<script setup lang="ts">
import AuthorRepository from "~/repos/AuthorRepository";
import type AllowedContent from "~/types/options/AllowedContent";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

const repo      = new AuthorRepository();
const routePage = parseInt(useRoute().params.page as string);
const page      = ref<number>(routePage ? routePage : 1);

const {data: authors, refresh} = await repo.index(page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/authors/${value}`);
});

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}Authors</title>
        </Head>

        <PaginatedCards v-if="authors" :items="authors" v-slot="{item}" v-model="page">
            <AuthorCard :to="`/authors/${item.id}-${slugify(item.name)}`"
                        :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>