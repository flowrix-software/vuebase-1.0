<script setup>
import { defineProps,ref } from 'vue';
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
import contentPopup from '../PopupContent/Popup.vue'

const CustomScript = useCustomScript();
const props = defineProps({'attribute':Object,'group':Object});
const SelecteValue = ref(props.attribute.value);
const ChangeValue = ((value)=>{
    const aid = props.attribute.id
  const gid = props.group.id
  const vid = value
  CustomScript.SelectedOptions = { aid:aid,gid:gid,vid:vid };
  CustomScript.initprocess();
})
</script>
<template>
   <div class="height_Attribute row align-items-center">
    <div class="col-md-4">
        <label class="attribute-label">{{ attribute.title }}
            <contentPopup :attribute="attribute"/>
        </label>
    </div>
    <div class="col-md-8">
        <div class="input-group mb-3 d-flex align-items-stretch">
            <div class="input-group-prepend">
                <span class="input-group-text h-100" v-if="attribute.swatch">
                    <img :src="attribute.swatch" alt="Width (mm)" width="25">
                </span>
            </div>
            <input
            class="form-control"
            v-model="SelecteValue"
            @change="ChangeValue(SelecteValue)"
            :data-attributevalue="attribute.parent"
            :data-child="attribute.parent"
            :data-value="attribute.id"
            type="number"
            :name="`attribute_id[${attribute.id}]`"
            :id="`value${attribute.id}`"/>
        </div>
        
    </div>
   </div>
</template>