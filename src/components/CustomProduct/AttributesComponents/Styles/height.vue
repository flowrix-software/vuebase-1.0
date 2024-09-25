<script setup>
import { defineProps,ref,defineAsyncComponent } from 'vue';
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
import contentPopup from '../PopupContent/Popup.vue'

const CustomScript = useCustomScript();
const props = defineProps({'attribute':Object,'group':Object});
const SelecteValue = ref(props.attribute.value);
const correctValue = ref(true);
const ChangeValue = ((value)=>{
    correctValue.value = true
    if (SelecteValue.value < props.attribute.min) {
      correctValue.value = false
    }
    else if (SelecteValue.value > props.attribute.max) {
      correctValue.value = false
    }    
  else{
  const aid = props.attribute.id
  const gid = props.group.id
  const vid = value
  CustomScript.SelectedOptions = { aid:aid,gid:gid,vid:vid };
  CustomScript.initprocess();
  }
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
        <div class="input-group d-flex align-items-stretch">
            <div class="input-group-prepend">
                <span class="input-group-text h-100" v-if="attribute.swatch">
                    <img :src="attribute.swatch" alt="Width (mm)" width="25">
                </span>
            </div>
            <input
            class="form-control mainHeightInput"
            v-model="SelecteValue"
            @change="ChangeValue(SelecteValue)"
            :data-attributevalue="attribute.parent"
            :data-child="attribute.parent"
            :data-value="attribute.id"
            :data-title="attribute.title"
            type="text"
            :name="`attribute_id[${attribute.id}]`"
            :id="`value${attribute.id}`"/>
            <div class="input-group-append">
                <span class="input-group-text h-100">mm</span>
            </div>
        </div>
        <p v-if="correctValue==false" class="measurement-error-height" style="color: red;">Should be greater than 
      {{attribute.min}}
       and less than 
      {{attribute.max}}
      </p>
    </div>
   </div>
</template>