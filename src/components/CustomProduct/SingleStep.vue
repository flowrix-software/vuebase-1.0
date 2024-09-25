<script setup>
import { defineProps,ref } from 'vue';
import SingleAttribute from '@/components/CustomProduct/AttributesComponents/SingleAttribute.vue'
const props = defineProps({'group':Object});

</script>
<template>
    <template v-for="attribute in group.attributes">
        <SingleAttribute :group="group" :attribute="attribute"/>
    </template>
</template> 