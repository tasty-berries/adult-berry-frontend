<script setup lang="ts">
import ComicRepository from "~/repos/ComicRepository";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

const repo      = new ComicRepository();
const routePage = parseInt(useRoute().params.page as string);
const page      = ref<number>(routePage ? routePage : 1);

const {data: comics} = await repo.index(page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}Comics</title>
        </Head>

        <PaginationRow v-if="comics" :collection="comics" v-model="page"/>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div v-for="comic in comics?.data ?? []"
                 :key="comic.id">
                <NuxtLink :to="`/comics/${comic.id}/${slugify(comic.title)}`">
                    <UCard class="overflow-clip"
                           :ui="{body: {padding: ''}}">
                        <template #header>
                            <h3 class="font-semibold text-xl truncate">{{ comic.title }}</h3>
                        </template>

                        <img :src="fileUrl(comic.preview)" class="w-full h-full"/>

                        <template #footer>
                            <p>
                                <span class="font-semibold">Views:</span>
                                {{ comic.views }}
                            </p>

                            <p>
                                <span class="font-semibold">Pages:</span>
                                {{ comic.pages_count }}
                            </p>

                            <div v-if="comic.tags.length > 0"
                                 class="flex flex-wrap items-center gap-1.5">
                                <span class="font-semibold">Tags:</span>
                                <TagBadge v-for="tag in comic.tags">{{ tag.name }}</TagBadge>
                            </div>
                        </template>
                    </UCard>
                </NuxtLink>
            </div>
        </div>

        <PaginationRow v-if="comics" :collection="comics" v-model="page"/>
    </div>
</template>

<style scoped>

</style>