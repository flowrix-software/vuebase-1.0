<script setup>
import { defineProps,ref,defineAsyncComponent } from 'vue';
const props = defineProps(['attribute','group']);
const dompo = ref(props.attribute.typeLabel); // Replace with your actual dynamic logic

// const CustomProductComponent = defineAsyncComponent(() => {
//   const componentPath = `../../../components/CustomProduct/AttributesComponents/${dompo.value}.vue`;
//   return import(componentPath);
// });

const CustomProductComponent = defineAsyncComponent({
              loader: async () => {
                try {
                  // Attempt to dynamically import the specified template component
                  if(dompo.value=='drop-down' || dompo.value=='style' || dompo.value=='swatch'){
                    return await import(`./AttributeType/${dompo.value}.vue`);
                  }else{
                    return await import(`./Styles/${dompo.value}.vue`);
                  }
                } catch (error) {
                  // If the specified template fails to load, fall back to CustomProduct1.vue
                  // return import('@/views/Product/CustomProduct1.vue');
                }
              },
            });
</script>
<template>
 
    <div v-show="!attribute.hide" :babu="`${attribute.hide}`" class="single-attribute" v-hide="attribute.hide" :class="`attributeof${attribute.parent} attribute${attribute.id}`"> 
      <component v-show="!attribute.hide" class="my-2 border-bottom py-4" :is="CustomProductComponent" :group="group" :attribute="attribute" />
    </div>
</template>
<style scoped>
.single-attribute{
  :deep(.attribute-label){  
      font-family: Metropolis, Georgia, Times New Roman, Times, serif;
      font-size: 15px;
      font-weight: 700;  
  }
  :deep(.value-label){  
      font-family: Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;
      font-size: 12px;
      font-weight: 700;  
  }
}
</style>
