<script setup lang="ts">
import CharacterRepository from "~/repos/CharacterRepository";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

defineProps<{
    character: any
}>();

const repo          = new CharacterRepository();
const route         = useRoute();
const routePage     = parseInt(route.params.page as string);
const characterId   = parseInt(route.params.id as string);
const characterSlug = route.params.slug as string;
const page          = ref<number>(routePage ? routePage : 1);

const {data: titles} = await repo.titles(characterId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/characters/${characterId}-${characterSlug}/titles/${value}`);
});
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ character.name }} // Character titles</title>
        </Head>

        <PaginatedCards v-if="titles" :items="titles" v-slot="{item}" v-model="page">
            <TitleCard :to="`/titles/${item.id}-${slugify(item.name)}/characters/${characterId}-${characterSlug}`"
                       :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>