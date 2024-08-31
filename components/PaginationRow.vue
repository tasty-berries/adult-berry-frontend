<script setup lang="ts">
import type PaginatedCollection from "~/types/PaginatedCollection";

defineProps<{
    collection: PaginatedCollection<any>
}>();

const page = defineModel<number>({required: true});
</script>

<template>
    <div class="flex items-center justify-center sm:justify-between w-full">
        <p class="hidden sm:block">
            Shown
            <span>{{ collection?.data.length }}</span>
            items
            (<span>{{ collection?.meta.total }}</span> in total)
        </p>

        <UPagination :page-count="collection?.meta.per_page ?? 0"
                     :total="collection?.meta.total ?? 0"
                     v-model="page"/>
    </div>
</template>

<style scoped>

</style>