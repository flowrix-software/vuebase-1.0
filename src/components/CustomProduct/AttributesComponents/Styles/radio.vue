<script setup>
import { defineProps,ref} from 'vue';
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
import contentPopup from '../PopupContent/Popup.vue'

const CustomScript = useCustomScript();
const props = defineProps({'attribute':Object,'group':Object});
const SelectedItem = props.attribute.values.find(i => i.selected === true);
const SelecteValue = ref(0);
if(SelectedItem){
    SelecteValue.value = SelectedItem.id
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
    <div class="button_attribute row align-items-center">
        <div class="col-md-4">
            <label class="attribute-label">{{ attribute.title }}
                <contentPopup :attribute="attribute"/>
            </label>
        </div>
        <div class="col-md-8">
            <div class="attribute-values d-flex flex-wrap gap-5">
                <div class="value-item position-relative d-flex gap-2 align-items-center" v-for="item in attribute.values">
                    <input
                    class="buttonInput form-check-input m-0"
                    v-model="SelecteValue"
                    @change="ChangeValue(item.id)"
                    :data-attributevalue="attribute.parent"
                    :data-child="item.parent"
                    :value="item.id"
                    :data-value="item.id"
                    type="radio"
                    :name="`attribute_id[${attribute.id}]`"
                    :id="`value${item.id}`"/>
                    <label class="value-label d-flex align-items-center gap-2" :for="`value${item.id}`">
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

.value-label{
    cursor: pointer;
    white-space: nowrap;
    line-height: 1;
    &:hover{
       border-color:var(--iseek-primary) !important;
    }
}
</style>