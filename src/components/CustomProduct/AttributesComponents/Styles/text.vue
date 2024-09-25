<script setup>
import { defineProps,ref,defineAsyncComponent } from 'vue';
import contentPopup from '../PopupContent/Popup.vue'
const props = defineProps({'attribute':Object,'group':Object});
const SelecteValue = ref(props.attribute.value);
const correctValue = ref(true);
const ChangeValue = ((value)=>{
    correctValue.value = true
  if (SelecteValue.value < props.attribute.min) {
    correctValue.value = false
  }
  if (SelecteValue.value > props.attribute.max) {
    correctValue.value = false
  }
  if (correctValue.value == false) {

    emit('update:error')
  }else{
  const aid = props.attribute.id
  const gid = group.id
  const vid = SelecteValue.value

  emit('update:change', { aid, gid, vid }) // Emit the event with the selected option value
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
            class="form-control"
            v-model="SelecteValue"
            @change="ChangeValue(attribute.id)"
            :data-attributevalue="attribute.parent"
            :data-child="attribute.parent"
            :data-value="attribute.id"
            type="text"
            :name="`attribute_id[${attribute.id}]`"
            :id="`value${attribute.id}`"/>
        </div>
    </div>
   </div>
</template>