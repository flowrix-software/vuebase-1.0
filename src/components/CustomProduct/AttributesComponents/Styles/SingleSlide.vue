<script setup>
import { defineProps,ref,defineAsyncComponent } from 'vue';
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
const props = defineProps({'attribute':Object,'slide':Object,'group':Object});
const SelecteValue = ref(0);
const CustomScript = useCustomScript();

const SelectedItem = props.attribute.values.find(i => i.selected === true);
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
                <div class="value-item position-relative">
                    <input
                        class="position-absolute top-0 left-0 w-100 h-100"
                        v-model="SelecteValue"
                        @change="ChangeValue(slide.id)"
                        :data-attributevalue="attribute.parent"
                        :data-child="slide.parent"
                        :value="slide.id"
                        :data-value="slide.id"
                        type="radio"
                        :name="`attribute_id[${attribute.id}]`"
                        :id="`value${slide.id}`"/>
                    <label class="value-label border h-100" :for="`value${slide.id}`">
                        <div class="image-container">
                            <img :src="slide.swatch" width="100%"/>                        
                        </div>
                        <span>{{ slide.title }}</span>
                    </label>
                </div>

</template>
<style scoped>

    .value-item{
        width:100%;
        height: 100%;
        input{
            opacity: 0;
            z-index: -1;
            &:checked{
                ~label{
                    border-color:var(--iseek-primary) !important;
                    border-width: 2px !important;
                }
            }
        }
        label{
            border-width: 2px !important;
            display: flex;
            cursor: pointer;
            text-align: center;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
            .image-container{
                position: relative;
                min-height: 68px;
                width: 100%;
                overflow: hidden;
                img{
                    top:0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    position:relative;
                }
            }
            span{
                padding: 5px 0;
            }
            &:hover {
                box-shadow: rgb(238, 238, 238) 0px 0px 3px 3px;
            }
        }
    }


</style>