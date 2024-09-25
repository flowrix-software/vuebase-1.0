<script setup>
import { defineProps,onMounted } from 'vue';
import Steps from '@/components/CustomProduct/Steps.vue'
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
const CustomScript = useCustomScript();
const props = defineProps({'product':Object});
onMounted(() => {
    setTimeout(function(){
    CustomScript.processAttributes() 
    
    CustomScript.setConditions('',true)

    let hasnewMeasurements =  CustomScript.setWidthHeightbaseonStyle()

    if(hasnewMeasurements)
    {
        CustomScript.setConditions('',true)
    }

    
    // CustomScript.attributes_dropdown()

    CustomScript.calculatePrice()
    // if(finalize.servicePriceSetting['usefitting'])
    // {
    //     CustomScript.calculateservicePrice()
    //     // $('.fitting_price').removeClass('d-none');
    // }
    
    // CustomScript.swatchimage()
    // if (typeof finalize === 'function') {
    //     // CustomScript.finalize()
    // } 
    // alert();
},0)
});
</script>
<template>
    <div class="product-Attributes">
        <Steps :product="product"/>
    </div>
</template>