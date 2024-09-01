<script setup lang="ts">
import AuthorRepository from "~/repos/AuthorRepository";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug));
    }
});

const repo       = new AuthorRepository();
const route      = useRoute();
const authorId   = parseInt(route.params.id as string);
const authorSlug = route.params.slug as string;

const {data: author} = await repo.show(authorId);

const links = computed(() => [{
    label : 'Comics',
    to    : `/authors/${authorId}-${authorSlug}`,
    active: /^\/authors\/\d+-[-a-z0-9]+(\/\d+)?$/.test(route.path)
}, {
    label : 'Characters',
    to    : `/authors/${authorId}-${authorSlug}/characters`,
    active: route.path.startsWith(`/authors/${authorId}-${authorSlug}/characters`)
}]);

if (`${author.value?.data.id}-${slugify(author.value?.data.name)}` !== `${authorId}-${authorSlug}`)
    await navigateTo(`/authors/${author.value?.data.id}-${slugify(author.value?.data.name)}`);
</script>

<template>
    <div>
        <UCard class="mb-2.5">
            <h1 class="text-2xl font-semibold">{{ author?.data.name }}</h1>
        </UCard>

        <UHorizontalNavigation :links="links"
                               class="border-b border-gray-200 dark:border-gray-800 mb-5"/>

        <NuxtPage :author="author?.data"/>
    </div>
</template>

<style scoped>

</style>