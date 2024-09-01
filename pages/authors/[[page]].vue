<script setup lang="ts">
import AuthorRepository from "~/repos/AuthorRepository";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

const repo      = new AuthorRepository();
const routePage = parseInt(useRoute().params.page as string);
const page      = ref<number>(routePage ? routePage : 1);

const {data: authors} = await repo.index(page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/authors/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}Authors</title>
        </Head>

        <PaginatedCards v-if="authors" :items="authors" v-slot="{item}" v-model="page">
            <NuxtLink :to="`/authors/${item.id}-${slugify(item.name)}`">
                <UCard class="overflow-clip"
                       :ui="{body: {padding: ''}}">
                    <template #header>
                        <h3 class="font-semibold text-xl truncate">{{ item.name }}</h3>
                    </template>

                    <div v-for="comic in item.comics">
                        <img :src="fileUrl(comic.preview)" :alt="item.name"/>
                    </div>

                    <template #footer>
                        <p>
                            <span class="font-semibold">Comics:</span>
                            {{ item.comics_count }}
                        </p>

                        <p>
                            <span class="font-semibold">Views:</span>
                            {{ item.comics_sum_views }}
                        </p>
                    </template>
                </UCard>
            </NuxtLink>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>