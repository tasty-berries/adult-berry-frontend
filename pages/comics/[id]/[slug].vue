<script setup lang="ts">
import ComicRepository from "~/repos/ComicRepository";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug));
    }
});

const route = useRoute();
const id    = parseInt(route.params.id as string);
const slug  = route.params.slug as string;

const repo = new ComicRepository();

const {data: comic} = await repo.show(id);

if (slugify(comic.value?.data.title) !== slug)
    await navigateTo(`/comics/${id}/${slugify(comic.value?.data.title)}`);
</script>

<template>
    <div>
        <Head>
            <title>{{ comic?.data.title }} // Comics</title>
        </Head>

        <UCard>
            <template #header>
                <div class="flex gap-5">
                    <div class="w-[80px] h-[100px] bg-contain bg-center bg-no-repeat"
                         :style="`background-image: url(${fileUrl(comic?.data.preview)})`"></div>

                    <div>
                        <h1 class="font-semibold text-2xl">{{ comic?.data.title }}</h1>

                        <p>
                            <span class="font-semibold">Views:</span>
                            {{ comic?.data.views }}
                        </p>

                        <p>
                            <span class="font-semibold">Pages:</span>
                            {{ comic?.data.pages.length }}
                        </p>
                    </div>
                </div>
            </template>

            <UCarousel :items="comic?.data.pages.map((page: any) => fileUrl(page.image)) ?? []"
                       :ui="{ item: 'basis-full' }"
                       class="rounded-lg overflow-hidden bg-gray-900 p-5"
                       :prev-button="{icon: 'i-heroicons-chevron-left', color: 'emerald'}"
                       :next-button="{icon: 'i-heroicons-chevron-right', color: 'emerald'}"
                       arrows>
                <template #default="{item}">
                    <img :src="item" class="w-full max-h-[800px] object-contain" draggable="false" alt=""/>
                </template>
            </UCarousel>

            <template #footer>
                <div class="flex flex-col gap-1.5">
                    <div v-if="comic?.data.tags.length > 0"
                         class="flex flex-wrap items-center gap-1.5">
                        <span class="font-semibold">Tags:</span>
                        <TagBadge v-for="tag in comic?.data.tags ?? []"
                                  :key="tag.id"
                                  :to="`/tags/${tag.id}-${slugify(tag.name)}`">
                            {{ tag.name }}
                        </TagBadge>
                    </div>

                    <div v-if="comic?.data.characters.length > 0"
                         class="flex flex-wrap items-center gap-1.5">
                        <span class="font-semibold">Characters:</span>
                        <TagBadge v-for="character in comic?.data.characters ?? []"
                                  :key="character.id"
                                  :to="`/characters/${character.id}-${slugify(character.name)}`">
                            {{ character.name }}
                        </TagBadge>
                    </div>
                </div>
            </template>
        </UCard>
    </div>
</template>

<style scoped>

</style>