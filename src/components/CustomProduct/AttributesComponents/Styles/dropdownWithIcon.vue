<script setup>
import { defineProps,ref,defineAsyncComponent } from 'vue';
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
import contentPopup from '../PopupContent/Popup.vue'

const CustomScript = useCustomScript();
const props = defineProps({'attribute':Object,'group':Object});
const options = ref(props.attribute.values);

const selectedOption = ref(options.value[0]);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  
  selectedOption.value = option;
  isOpen.value = false;
};
const closeDropDown = ()=>{
  isOpen.value = false;
}
const ChangeValue = ((value)=>{
  console.log('changevalue')
  console.log(value)
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
            <div class="custom-select w-100" @mouseleave="closeDropDown()">
                <div class="selected position-relative" @click="toggleDropdown">
                  <img v-if="selectedOption.swatch!=''" :src="selectedOption.swatch" height="100%"/>
                  <div v-else-if="selectedOption.iconcolor!=null" class="icon-color" :style="`background-color:${selectedOption.iconcolor}`"></div>
                        <input
                        class="position-absolute w-100 h-100"
                        :value="selectedOption.id"
                        type="radio"
                        :name="`attribute_id[${attribute.id}]`"
                        :id="`value${selectedOption.id}`"/>
                    <span>{{ selectedOption.title }}</span>
                </div>
                <ul v-show="isOpen" class="options">
                    <li class=" position-relative" v-for="option in options" :key="option.value">
                      <input
                        class="position-absolute w-100 h-100"
                        customselect="true"
                        :data-attributevalue="attribute.parent"
                        :data-child="option.parent"
                        @change="selectOption(option)"
                        @click="ChangeValue(option.id)"
                        :value="option.id"
                        :data-value="option.id"
                        type="radio"
                        :name="`attribute_id[${attribute.id}]`"
                        :id="`value${option.id}`"/>
                      <img v-if="option.swatch!=''" :src="option.swatch" width="32px"/>
                        <div v-else-if="option.iconcolor!=null" class="icon-color" :style="`background-color:${option.iconcolor}`"></div>
                        {{ option.title }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
.custom-select {
  position: relative;
  &:after {
    font-family: 'isb-icons';
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 1;
    text-transform: none;
    content: '\e901';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(90deg);
    color: #333333;
  }
  input{
    opacity:0;
  }
}

.icon-color{
    width:24px;
    height:24px;
}
.selected {
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  gap:10px;
  align-items: center;
  height: 48px;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  background: white;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
}

.options li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  gap:5px;
  align-items: center;
}

.options li:hover {
  background-color: #f0f0f0;
}

.options li span:first-child {
  margin-right: 10px;
}
</style>