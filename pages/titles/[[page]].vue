<script setup lang="ts">
import TitleRepository from "~/repos/TitleRepository";
import type AllowedContent from "~/types/options/AllowedContent";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

const repo      = new TitleRepository();
const routePage = parseInt(useRoute().params.page as string);
const page      = ref<number>(routePage ? routePage : 1);

const {data: titles, refresh} = await repo.index(page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/titles/${value}`);
});

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}Titles</title>
        </Head>

        <PaginatedCards v-if="titles" :items="titles" v-slot="{item}" v-model="page">
            <TitleCard :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>