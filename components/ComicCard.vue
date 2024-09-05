<script setup lang="ts">
defineProps<{
    item: any
}>();
</script>

<template>
    <UCard class="overflow-clip"
           :ui="{header: {padding: ''}, body: {padding: ''}}">
        <template #header>
            <NuxtLink :to="`/comics/${item.id}-${slugify(item.title)}`">
                <h3 class="font-semibold text-xl truncate px-4 py-5 sm:px-6">{{ item.title }}</h3>
            </NuxtLink>
        </template>

        <NuxtLink :to="`/comics/${item.id}-${slugify(item.title)}`">
            <AdultImage :src="fileUrl(item.preview)" class="w-full h-full"/>
        </NuxtLink>

        <template #footer>
            <p>
                <span class="font-semibold">Views:</span>
                {{ item.views }}
            </p>

            <p>
                <span class="font-semibold">Pages:</span>
                {{ item.pages_count }}
            </p>

            <div v-if="item.tags.length > 0" class="flex flex-wrap items-center gap-1.5">
                <span class="font-semibold">Tags:</span>
                <TagBadge v-for="tag in item.tags"
                          :key="tag.id"
                          :to="`/tags/${tag.id}-${slugify(tag.name)}`">
                    {{ tag.name }}
                </TagBadge>
            </div>
        </template>
    </UCard>
</template>

<style scoped>

</style>