<script setup lang="ts">
import TitleRepository from "~/repos/TitleRepository";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug));
    }
});

const repo      = new TitleRepository();
const route     = useRoute();
const titleId   = parseInt(route.params.id as string);
const titleSlug = route.params.slug as string;

const {data: title} = await repo.show(titleId);

const links = computed(() => [{
    label : 'Comics',
    to    : `/titles/${titleId}-${titleSlug}`,
    active: /^\/titles\/\d+-[-a-z0-9]+(\/\d+)?$/.test(route.path)
}, {
    label : 'Characters',
    to    : `/titles/${titleId}-${titleSlug}/characters`,
    active: route.path.startsWith(`/titles/${titleId}-${titleSlug}/characters`)
}, {
    label : 'Tags',
    to    : `/titles/${titleId}-${titleSlug}/tags`,
    active: route.path.startsWith(`/titles/${titleId}-${titleSlug}/tags`)
}, {
    label : 'Authors',
    to    : `/titles/${titleId}-${titleSlug}/authors`,
    active: route.path.startsWith(`/titles/${titleId}-${titleSlug}/authors`)
}]);

if (`${title.value?.data.id}-${slugify(title.value?.data.name)}` !== `${titleId}-${titleSlug}`)
    await navigateTo(`/titles/${title.value?.data.id}-${slugify(title.value?.data.name)}`);
</script>

<template>
    <div>
        <UCard class="mb-2.5">
            <h1 class="text-2xl font-semibold">{{ title?.data.name }}</h1>
        </UCard>

        <UHorizontalNavigation :links="links"
                               class="border-b border-gray-200 dark:border-gray-800 mb-5"/>

        <NuxtPage :title="title?.data"/>
    </div>
</template>

<style scoped>

</style>