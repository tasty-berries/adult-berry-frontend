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
            <NuxtLink :to="to ?? `/characters/${item.id}-${slugify(item.name)}`"
                      class="flex justify-between items-center gap-2.5 w-full px-4 py-5 sm:px-6">
                <h3 class="font-semibold text-xl truncate">{{ item.name }}</h3>

                <UPopover v-if="item.description || (item.aliases && item.aliases.length > 0) || (item.titles && item.titles.length > 0)"
                          mode="hover" class="flex">
                    <template #panel>
                        <div class="p-2.5 max-w-64 flex flex-col gap-1">
                            <h5 class="font-semibold">{{ item.name }}</h5>

                            <div v-html="item.description" class="[&>p>strong]:font-semibold text-sm"></div>

                            <div v-if="item.aliases && item.aliases.length > 0"
                                 class="flex flex-wrap items-center gap-1.5 text-sm">
                                <span class="font-semibold">A.k.a:</span>
                                <TagBadge v-for="alias in item.aliases"
                                          :key="alias.id">
                                    {{ alias.name }}
                                </TagBadge>
                            </div>

                            <div v-if="item.titles && item.titles.length > 0"
                                 class="flex flex-wrap items-center gap-1.5 text-sm">
                                <span class="font-semibold">Titles:</span>
                                <TagBadge v-for="title in item.titles"
                                          :key="title.id">
                                    {{ title.name }}
                                </TagBadge>
                            </div>
                        </div>
                    </template>

                    <UIcon name="i-ph-circle-wavy-question"
                           class="text-2xl shrink-0"/>
                </UPopover>
            </NuxtLink>
        </template>

        <NuxtLink :to="to ?? `/characters/${item.id}-${slugify(item.name)}`">
            <img v-if="item.preview"
                 :src="fileUrl(item.preview)"
                 :alt="item.name"
                 class="w-full h-full object-cover aspect-1"/>

            <AdultImage v-else-if="item.comics.length > 0"
                        :src="fileUrl(item.comics[0].preview)"
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