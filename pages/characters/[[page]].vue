<script setup lang="ts">
import CharacterRepository from "~/repos/CharacterRepository";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

const repo      = new CharacterRepository();
const routePage = parseInt(useRoute().params.page as string);
const page      = ref<number>(routePage ? routePage : 1);

const {data: characters} = await repo.index(page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/characters/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}Characters</title>
        </Head>

        <PaginatedCards v-if="characters" :items="characters" v-slot="{item}" v-model="page">
            <CharacterCard :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>