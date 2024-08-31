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

        <PaginationRow v-if="characters" :collection="characters" v-model="page"/>

        <div v-if="characters" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div v-for="character in characters.data"
                 :key="character.id">
                <NuxtLink :to="`/characters/${character.id}-${slugify(character.name)}`">
                    <UCard class="overflow-clip"
                           :ui="{body: {padding: ''}}">
                        <template #header>
                            <h3 class="font-semibold text-xl truncate">{{ character.name }}</h3>
                        </template>

                        <div v-for="comic in character.comics">
                            <img :src="fileUrl(comic.preview)"/>
                        </div>

                        <template #footer>
                            <p>
                                <span class="font-semibold">Comics:</span>
                                {{ character.comics_count }}
                            </p>
                        </template>
                    </UCard>
                </NuxtLink>
            </div>
        </div>

        <PaginationRow v-if="characters" :collection="characters" v-model="page"/>
    </div>
</template>

<style scoped>

</style>