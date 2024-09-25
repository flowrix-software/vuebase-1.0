<script setup>
import { defineProps,ref,defineAsyncComponent } from 'vue';
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
import contentPopup from '../PopupContent/Popup.vue'

const CustomScript = useCustomScript();
const props = defineProps({'attribute':Object,'group':Object});
const selectedOption = ref(null)
const getselectedOption = props.attribute.values.find((item) => item.selected === true)

if (getselectedOption) {
  selectedOption.value = getselectedOption.id
}
const ChangeValue = ((value)=>{
    const aid = props.attribute.id
  const gid = props.group.id
  const vid = value
  CustomScript.SelectedOptions = { aid:aid,gid:gid,vid:vid };
  CustomScript.initprocess();
})
</script>
<template>
    <div class="button_attribute row">
        <div class="col-md-4">
            <label class="attribute-label">{{ attribute.title }}
                <contentPopup :attribute="attribute"/>
            </label>
        </div>
        <div class="col-md-8">
            <div class="attribute-values d-flex flex-wrap gap-2">
                <div class="value-item position-relative" v-for="item in attribute.values">
                    <input
                    class="position-absolute left-0 top-0 opacity-50 buttonInput w-100 h-100"
                    v-model="selectedOption"
                    @change="ChangeValue(item.id)"
                    :data-attributevalue="attribute.parent"
                    :data-child="item.parent"
                    :value="item.id"
                    :data-value="item.id"
                    type="radio"
                    :name="`attribute_id[${attribute.id}]`"
                    :id="`value${item.id}`"/>
                    <label class="value-label py-2 px-3 border d-flex align-items-center gap-2" :for="`value${item.id}`">
                        <div v-if="item.iconcolor!=null" :style="`background-color:${item.iconcolor} ;`" class="valueIcon"></div>                        
                        <img v-else-if="item.swatch!=''" :src="item.swatch" width="24px"/>
                        {{ item.title }}
                    </label>                    
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.valueIcon{
    width:24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
}
.buttonInput{
    z-index: -1;
    &:checked{
        ~.value-label{
            border-color:var(--iseek-secondary) !important;
            background-color: var(--iseek-secondary);
            color:#000
        }
    }
}
.value-label{
    cursor: pointer;
    white-space: nowrap;
    &:hover{
       border-color:var(--iseek-primary) !important;
    }
}
</style>