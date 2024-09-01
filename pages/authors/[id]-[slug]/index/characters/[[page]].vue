<script setup lang="ts">
import AuthorRepository from "~/repos/AuthorRepository";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.page === 'string' && /^\d*$/.test(route.params.page);
    }
});

defineProps<{
    author: any
}>();

const repo       = new AuthorRepository();
const route      = useRoute();
const routePage  = parseInt(route.params.page as string);
const authorId   = parseInt(route.params.id as string);
const authorSlug = route.params.slug as string;
const page       = ref<number>(routePage ? routePage : 1);

const {data: characters} = await repo.characters(authorId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/authors/${authorId}-${authorSlug}/characters/${value}`);
});
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ author.name }} // Author characters</title>
        </Head>

        <PaginatedCards v-if="characters" :items="characters" v-slot="{item}" v-model="page">
            <NuxtLink :to="`/authors/${authorId}-${authorSlug}/characters/${item.id}-${slugify(item.name)}`">
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