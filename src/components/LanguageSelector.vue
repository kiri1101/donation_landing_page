<template>
    <DropdownQ align="right" width="32">
        <template #trigger>
            <span class="inline-flex rounded-md">
                <TranslateIcon class="mt-1" />
            </span>
        </template>

        <template #content>
            <div @click.prevent="setLocale('en-US')"
                class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer">
                <!-- <English /> -->
                <span v-text="t('lang.en')"></span>
            </div>

            <div @click.prevent="setLocale('fr-FR')"
                class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer">
                <!-- <French /> -->
                <span v-text="t('lang.fr')"></span>
            </div>
        </template>
    </DropdownQ>
</template>

<script setup>
import TranslateIcon from "src/components/SVG/TranslateIcon.vue";
import DropdownQ from "src/components/DropdownQ.vue";
import { useI18n } from "vue-i18n";
import { i18n } from "boot/i18n";

const { t } = useI18n({ useScope: "global" });

const setLocale = (newLocale) => {
    return (i18n.global.locale.value = newLocale);
};
</script>
