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

const {data: tags} = await repo.tags(characterId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/characters/${characterId}-${characterSlug}/tags/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ character.name }} // Character tags</title>
        </Head>

        <PaginatedCards v-if="tags" :items="tags" v-slot="{item}" v-model="page">
            <NuxtLink :to="``">
                <UCard class="overflow-clip"
                       :ui="{body: {padding: ''}}">
                    <template #header>
                        <h3 class="font-semibold text-xl truncate">{{ item.name }}</h3>
                    </template>

                    <div v-for="comic in item.comics">
                        <img :src="fileUrl(comic.preview)"/>
                    </div>

                    <template #footer>
                        <p>
                            <span class="font-semibold">Comics:</span>
                            {{ item.comics_count }}
                        </p>
                    </template>
                </UCard>
            </NuxtLink>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>