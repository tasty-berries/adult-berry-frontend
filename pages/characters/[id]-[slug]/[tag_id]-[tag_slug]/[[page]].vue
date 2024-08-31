<script setup lang="ts">
import CharacterRepository from "~/repos/CharacterRepository";
import TagRepository from "~/repos/TagRepository";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug)) &&
               (typeof route.params.tag_id === 'string' && /^\d+$/.test(route.params.tag_id)) &&
               (typeof route.params.tag_slug === 'string' && /^[-a-z0-9]+$/.test(route.params.tag_slug)) &&
               (typeof route.params.page === 'string' && /^\d*$/.test(route.params.page));
    }
});

const characterRepo = new CharacterRepository();
const tagRepo       = new TagRepository();
const route         = useRoute();
const characterId   = parseInt(route.params.id as string);
const characterSlug = route.params.slug as string;
const tagId         = parseInt(route.params.tag_id as string);
const tagSlug       = route.params.tag_slug as string;
const routePage     = parseInt(route.params.page as string);
const page          = ref<number>(routePage ? routePage : 1);

const {data: character} = await characterRepo.show(characterId);
const {data: tag}       = await tagRepo.show(tagId);
const {data: comics}    = await characterRepo.tagComics(characterId, tagId);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/characters/${characterId}-${characterSlug}/${tagId}-${tagSlug}/${value}`);
});

if (
    `${character.value?.data.id}-${slugify(character.value?.data.name)}/${tag.value?.data.id}-${slugify(tag.value?.data.name)}`
    !==
    `${characterId}-${characterSlug}/${tagId}-${tagSlug}`
)
    await navigateTo(`/characters/${character.value?.data.id}-${slugify(character.value?.data.name)}/${tag.value?.data.id}-${slugify(tag.value?.data.name)}`);
</script>

<template>
    <div>
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ tag?.data.name }} with {{ character?.data.name }} // Tag comics with character</title>
        </Head>

        <UCard class="mb-5">
            <h1 class="text-2xl font-semibold">{{ tag?.data.name }} with {{ character?.data.name }}</h1>
        </UCard>

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