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
            <NuxtLink :to="to ?? `/titles/${item.id}-${slugify(item.name)}`"
                      class="flex justify-between items-center gap-2.5 w-full px-4 py-5 sm:px-6">
                <h3 class="font-semibold text-xl truncate">{{ item.name }}</h3>

                <UPopover v-if="item.description" mode="hover" class="flex">
                    <template #panel>
                        <div class="p-2.5 max-w-64">
                            <h5 class="font-semibold">{{ item.name }}</h5>

                            <div v-html="item.description" class="[&>p>strong]:font-semibold text-sm"></div>
                        </div>
                    </template>

                    <UIcon name="i-ph-circle-wavy-question"
                           class="text-2xl shrink-0"/>
                </UPopover>
            </NuxtLink>
        </template>

        <NuxtLink :to="to ?? `/titles/${item.id}-${slugify(item.name)}`">
            <img v-if="item.preview"
                 :src="fileUrl(item.preview)"
                 :alt="item.name"
                 class="w-full h-full object-cover aspect-16/9"/>

            <AdultImage v-else-if="item.comics.length > 0"
                        :src="fileUrl(item.comics[0].preview)"
                        :alt="item.name"
                        :wrapper="{class: 'h-full'}"
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