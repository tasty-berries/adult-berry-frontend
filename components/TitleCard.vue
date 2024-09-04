<script setup lang="ts">
defineProps<{
    item: any,
    to?: string
}>();
</script>

<template>
    <NuxtLink :to="to ?? `/titles/${item.id}-${slugify(item.name)}`">
        <UCard class="overflow-clip h-full flex flex-col"
               :ui="{body: {padding: '', base: 'grow'}}">
            <template #header>
                <h3 class="font-semibold text-xl truncate">{{ item.name }}</h3>
            </template>

            <img v-if="item.preview"
                 :src="fileUrl(item.preview)"
                 :alt="item.name"
                 class="w-full h-full object-cover aspect-16/9"/>

            <img v-else-if="item.comics.length > 0"
                 :src="fileUrl(item.comics[0].preview)"
                 :alt="item.name"
                 class="w-full h-full object-cover"/>

            <template #footer>
                <p>
                    <span class="font-semibold">Comics:</span>
                    {{ item.comics_count }}
                </p>
            </template>
        </UCard>
    </NuxtLink>
</template>

<style scoped>

</style>