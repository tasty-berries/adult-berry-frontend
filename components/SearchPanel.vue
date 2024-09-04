<script setup lang="ts">
import SearchRepository from "~/repos/SearchRepository";

const opened = ref<boolean>(false);

const repo = new SearchRepository();

const query = ref<string>('');

const {data: items, status} = await repo.index(() => ({name: query.value}));

const groups = computed(() => [{
    key     : 'comics',
    label   : 'Comics',
    commands: items.value?.data
                   .filter((item: any) => item.type === 'comic') ?? []
}, {
    key     : 'characters',
    label   : 'Characters',
    commands: items.value?.data
                   .filter((item: any) => item.type === 'character')
                   .map((item: any) => ({
                       ...item,
                       suffix: item.extra.title.length > 0 ? 'in ' + item.extra.title.join(', ') : ''
                   })) ?? []
}, {
    key     : 'tags',
    label   : 'Tags',
    commands: items.value?.data
                   .filter((item: any) => item.type === 'tag') ?? []
}, {
    key     : 'titles',
    label   : 'Titles',
    commands: items.value?.data
                   .filter((item: any) => item.type === 'title') ?? []
}, {
    key     : 'authors',
    label   : 'Authors',
    commands: items.value?.data
                   .filter((item: any) => item.type === 'author') ?? []
}]);

const model = ref();

watch(model, value => {
    if (value === undefined)
        return;

    opened.value = false;

    switch (value.type) {
        case 'comic':
            navigateTo(`/comics/${value.resource_id}-${slugify(value.name)}`);
            break;
        case 'character':
            const id = value.extra.hasOwnProperty('original') ? value.extra.original.id : value.resource_id;
            const name = value.extra.hasOwnProperty('original') ? value.extra.original.name : value.name;
            navigateTo(`/characters/${id}-${slugify(name)}`);
            break;
        case 'tag':
            navigateTo(`/tags/${value.resource_id}-${slugify(value.name)}`);
            break;
        case 'title':
            navigateTo(`/titles/${value.resource_id}-${slugify(value.name)}`);
            break;
        case 'author':
            navigateTo(`/authors/${value.resource_id}-${slugify(value.name)}`);
            break;
    }
});

const palette = ref();

watch(() => palette.value?.query, value => {
    query.value = value;
});

watch(opened, value => {
    if (value)
        return;

    model.value = undefined;
});

defineShortcuts({
    '/': {
        handler: () => {
            opened.value = !opened.value;
        }
    }
});
</script>

<template>
    <div>
        <UTooltip text="Search" :shortcuts="['/']">
            <UButton icon="i-tabler-search" variant="ghost" color="gray" @click="opened = true"/>
        </UTooltip>

        <UModal v-model="opened">
            <UCommandPalette ref="palette"
                             :groups="groups"
                             :loading="status === 'pending'"
                             :autoselect="false"
                             command-attribute="name"
                             v-model="model"/>
        </UModal>
    </div>
</template>

<style scoped>

</style>