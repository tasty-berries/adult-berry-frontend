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

const {data: comics} = await repo.comics(characterId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/characters/${characterId}-${characterSlug}/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ character.name }} // Character comics</title>
        </Head>

        <PaginatedCards v-if="comics" :items="comics" v-slot="{item}" v-model="page">
            <NuxtLink :to="`/comics/${item.id}/${slugify(item.title)}`">
                <UCard class="overflow-clip"
                       :ui="{body: {padding: ''}}">
                    <template #header>
                        <h3 class="font-semibold text-xl truncate">{{ item.title }}</h3>
                    </template>

                    <img :src="fileUrl(item.preview)" class="w-full h-full"/>

                    <template #footer>
                        <p>
                            <span class="font-semibold">Views:</span>
                            {{ item.views }}
                        </p>

                        <p>
                            <span class="font-semibold">Pages:</span>
                            {{ item.pages_count }}
                        </p>

                        <div v-if="item.tags.length > 0"
                             class="flex flex-wrap items-center gap-1.5">
                            <span class="font-semibold">Tags:</span>
                            <TagBadge v-for="tag in item.tags">{{ tag.name }}</TagBadge>
                        </div>
                    </template>
                </UCard>
            </NuxtLink>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>