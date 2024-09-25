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
            <select
            class="attribute952 select2-icons form-select mb-1 select2-hidden-accessible"
            v-model="selectedOption"
            :name="`attribute_id[${attribute.id}]`"
            @change="ChangeValue(selectedOption)"
            :id="`value${attribute.id}`">
                <template v-for="item in attribute.values">
                    <option
                        :data-attributevalue="attribute.parent"
                        data-child="0"
                        :value="item.id"
                        :data-value="item.id"
                        data-image=""
                        data-color=""
                        selected="selected"
                        class="active"
                        data-select2-id="4">
                        {{ item.title }}
                    </option>
                </template>
            </select>
        </div>
    </div>
</template>