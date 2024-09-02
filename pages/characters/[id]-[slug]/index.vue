<script setup lang="ts">
import CharacterRepository from "~/repos/CharacterRepository";

definePageMeta({
    validate: async (route) => {
        return (typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)) &&
               (typeof route.params.slug === 'string' && /^[-a-z0-9]+$/.test(route.params.slug));
    }
});

const repo          = new CharacterRepository();
const route         = useRoute();
const characterId   = parseInt(route.params.id as string);
const characterSlug = route.params.slug as string;

const {data: character} = await repo.show(characterId);

const links = computed(() => [{
    label : 'Comics',
    to    : `/characters/${characterId}-${characterSlug}`,
    active: /^\/characters\/\d+-[-a-z0-9]+(\/\d+)?$/.test(route.path)
}, {
    label : 'Tags',
    to    : `/characters/${characterId}-${characterSlug}/tags`,
    active: route.path.startsWith(`/characters/${characterId}-${characterSlug}/tags`)
}, {
    label : 'Titles',
    to    : `/characters/${characterId}-${characterSlug}/titles`,
    active: route.path.startsWith(`/characters/${characterId}-${characterSlug}/titles`)
}, {
    label : 'Authors',
    to    : `/characters/${characterId}-${characterSlug}/authors`,
    active: route.path.startsWith(`/characters/${characterId}-${characterSlug}/authors`)
}]);

if (`${character.value?.data.id}-${slugify(character.value?.data.name)}` !== `${characterId}-${characterSlug}`)
    await navigateTo(`/characters/${character.value?.data.id}-${slugify(character.value?.data.name)}`);
</script>

<template>
    <div>
        <UCard class="mb-2.5">
            <div class="flex gap-5">
                <div v-if="character?.data.preview" class="w-[150px] h-[150px] shrink-0">
                    <img :src="fileUrl(character.data.preview)"
                         :alt="character.data.name"
                         class="w-full h-full object-cover rounded-md"/>
                </div>

                <div>
                    <h3 class="text-xl font-semibold">{{ character?.data.name }}</h3>

                    <div v-if="character?.data.description" v-html="character?.data.description" class="mt-2.5"></div>
                </div>
            </div>
        </UCard>

        <UHorizontalNavigation :links="links"
                               class="border-b border-gray-200 dark:border-gray-800 mb-5"/>

        <NuxtPage :character="character?.data"/>
    </div>
</template>

<style scoped>

</style>