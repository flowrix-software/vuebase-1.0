<script setup>
import { defineProps,ref,defineAsyncComponent } from 'vue';
const props = defineProps({'attribute':Object,'group':Object});
const dompo = ref(props.attribute.designkey); // Replace with your actual dynamic logic



const CustomProductComponent = defineAsyncComponent({
              loader: async () => {
                try {
                  // Attempt to dynamically import the specified template component
                  return await import(`../Styles/${dompo.value}.vue`);
                } catch (error) {
                  // If the specified template fails to load, fall back to CustomProduct1.vue
                  // return import('@/views/Product/CustomProduct1.vue');
                }
              },
            });
</script>
<template> 
      <component :is="CustomProductComponent" :group="group" :attribute="attribute" />
</template>
