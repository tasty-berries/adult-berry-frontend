<script setup lang="ts">
import AuthorRepository from "~/repos/AuthorRepository";
import type AllowedContent from "~/types/options/AllowedContent";

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

const {data: tags, refresh} = await repo.tags(authorId, page.value);

watch(page, (value, oldValue) => {
    if (value === oldValue)
        return;

    navigateTo(`/authors/${authorId}-${authorSlug}/tags/${value}`);
});

const allowedContent = useCookie<AllowedContent>('allowedContent');
watch(allowedContent, () => refresh());
</script>

<template>
    <div class="flex flex-col gap-5">
        <Head>
            <title>{{ page > 1 ? `Page ${page} // ` : '' }}{{ author.name }} // Author tags</title>
        </Head>

        <PaginatedCards v-if="tags" :items="tags" v-slot="{item}" v-model="page">
            <TagCard :to="`/authors/${authorId}-${authorSlug}/tags/${item.id}-${slugify(item.name)}`"
                     :item="item"/>
        </PaginatedCards>
    </div>
</template>

<style scoped>

</style>