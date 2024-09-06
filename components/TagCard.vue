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
            <NuxtLink :to="to ?? `/tags/${item.id}-${slugify(item.name)}`"
                      class="block w-full px-4 py-5 sm:px-6">
                <h3 class="font-semibold text-xl truncate">{{ item.name }}</h3>
            </NuxtLink>
        </template>

        <NuxtLink v-if="item.comics.length > 0" :to="to ?? `/tags/${item.id}-${slugify(item.name)}`">
            <AdultImage :src="fileUrl(item.comics[0].preview)"
                        :alt="item.name"
                        class="w-full h-full object-cover"/>
        </NuxtLink>

        <template #footer>
            <p>
                <span class="font-semibold">Comics:</span>
                {{ item.comics_count }}
            </p>
        </template>
    </UCard>
</template>

<style scoped>

</style>