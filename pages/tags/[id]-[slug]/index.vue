<script setup lang="ts">
import TagRepository from "~/repos/TagRepository";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug));
    }
});

const repo    = new TagRepository();
const route   = useRoute();
const tagId   = parseInt(route.params.id as string);
const tagSlug = route.params.slug as string;

const {data: tag} = await repo.show(tagId);

const links = computed(() => [{
    label : 'Comics',
    to    : `/tags/${tagId}-${tagSlug}`,
    active: /^\/tags\/\d+-[-a-z0-9]+(\/\d+)?$/.test(route.path)
}, {
    label : 'Characters',
    to    : `/tags/${tagId}-${tagSlug}/characters`,
    active: route.path.startsWith(`/tags/${tagId}-${tagSlug}/characters`)
}, {
    label : 'Titles',
    to    : `/tags/${tagId}-${tagSlug}/titles`,
    active: route.path.startsWith(`/tags/${tagId}-${tagSlug}/titles`)
}, {
    label : 'Authors',
    to    : `/tags/${tagId}-${tagSlug}/authors`,
    active: route.path.startsWith(`/tags/${tagId}-${tagSlug}/authors`)
}]);

if (`${tag.value?.data.id}-${slugify(tag.value?.data.name)}` !== `${tagId}-${tagSlug}`)
    await navigateTo(`/tags/${tag.value?.data.id}-${slugify(tag.value?.data.name)}`);
</script>

<template>
    <div class="flex flex-col">
        <UCard class="mb-2.5">
            <h1 class="text-2xl font-semibold">{{ tag?.data.name }}</h1>
        </UCard>

        <UHorizontalNavigation :links="links"
                               class="border-b border-gray-200 dark:border-gray-800 mb-5"/>

        <NuxtPage :tag="tag?.data"/>
    </div>
</template>

<style scoped>

</style>