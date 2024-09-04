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
                <NuxtLink :to="to ?? `/titles/${item.id}-${slugify(item.name)}`"
                          class="flex justify-between items-center gap-2.5 w-full">
                    <h3 class="font-semibold text-xl truncate">{{ item.name }}</h3>

                    <UPopover v-if="item.description" mode="hover" class="flex">
                        <template #panel>
                            <div class="text-sm p-2.5 max-w-64">
                                <h5 class="font-semibold">{{ item.name }}</h5>

                                <div v-html="item.description"></div>
                            </div>
                        </template>

                        <UIcon name="i-ph-circle-wavy-question"
                               class="text-2xl shrink-0"/>
                    </UPopover>
                </NuxtLink>
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