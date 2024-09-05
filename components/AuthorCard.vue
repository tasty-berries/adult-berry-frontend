<script setup lang="ts">
defineProps<{
    item: any,
    to?: string
}>();
</script>

<template>
    <UCard class="overflow-clip h-full flex flex-col"
           :ui="{header: {padding: ''}, body: {padding: '', base: 'grow'}}">
        <template #header>
            <NuxtLink :to="to ?? `/authors/${item.id}-${slugify(item.name)}`"
                      class="block w-full px-4 py-5 sm:px-6">
                <h3 class="font-semibold text-xl truncate">{{ item.name }}</h3>
            </NuxtLink>
        </template>

        <NuxtLink :to="to ?? `/authors/${item.id}-${slugify(item.name)}`">
            <AdultImage :src="fileUrl(item.comics[0].preview)"
                        :alt="item.name"
                        class="w-full h-full object-cover"/>
        </NuxtLink>

        <template #footer>
            <p>
                <span class="font-semibold">Comics:</span>
                {{ item.comics_count }}
            </p>

            <p v-if="item.hasOwnProperty('comics_sum_views')">
                <span class="font-semibold">Views:</span>
                {{ item.comics_sum_views }}
            </p>
        </template>
    </UCard>
</template>

<style scoped>

</style>