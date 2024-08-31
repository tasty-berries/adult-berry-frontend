<script setup lang="ts">
import type PaginatedCollection from "~/types/PaginatedCollection";

defineProps<{
    items: PaginatedCollection<any>
}>();

const page = defineModel<number>({required: true});
</script>

<template>
    <PaginationRow v-if="items.meta.total > items.data.length"
                   :collection="items"
                   v-model="page"/>

    <div v-if="items" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div v-for="item in items.data" :key="item.id">
            <slot :item="item"/>
        </div>
    </div>

    <PaginationRow v-if="items.meta.total > items.data.length"
                   :collection="items"
                   v-model="page"/>
</template>

<style scoped>

</style>