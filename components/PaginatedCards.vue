<script setup lang="ts">
import type PaginatedCollection from "~/types/PaginatedCollection";

defineProps<{
    items: PaginatedCollection<any>,
    groups?: any[]
}>();

const page = defineModel<number>({required: true});
</script>

<template>
    <div class="flex flex-col gap-5">
        <PaginationRow v-if="items.meta.total > items.data.length"
                       :collection="items"
                       v-model="page"/>

        <div v-if="items && groups === undefined"
             class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div v-for="item in items.data" :key="item.id">
                <slot :item="item"/>
            </div>
        </div>

        <template v-if="items && groups">
            <div v-for="group in groups.filter(_group => items.data.filter(_group.filter).length > 0)">
                <h3 class="text-2xl font-semibold mb-5">{{ group.label }}</h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    <div v-for="item in items.data.filter(group.filter)" :key="item.id">
                        <slot :item="item"/>
                    </div>
                </div>
            </div>
        </template>

        <PaginationRow v-if="items.meta.total > items.data.length"
                       :collection="items"
                       v-model="page"/>
    </div>
</template>

<style scoped>

</style>