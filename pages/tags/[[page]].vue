<script setup lang="ts">
import TagRepository from "~/repos/TagRepository";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

const repo      = new TagRepository();
const routePage = parseInt(useRoute().params.page as string);
const page      = ref<number>(routePage ? routePage : 1);

const {data: tags} = await repo.index(page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/tags/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}Tags</title>
        </Head>

        <PaginatedCards v-if="tags" :items="tags" v-slot="{item}" v-model="page">
            <NuxtLink :to="`/tags/${item.id}-${slugify(item.name)}`">
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
                    </template>
                </UCard>
            </NuxtLink>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>