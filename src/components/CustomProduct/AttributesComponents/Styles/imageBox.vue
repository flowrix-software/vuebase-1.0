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
    <div class="row">
        <div class="col-md-12">
          <label class="attribute-label">{{ attribute.title }}
            <contentPopup :attribute="attribute"/>
        </label>
        </div>
        <div class="col-md-12">
            <div class="attribute-values">
                <div class="value-item position-relative" v-for="item in attribute.values">
                    <input
                        class="position-absolute top-0 left-0 w-100 h-100"
                        v-model="SelecteValue"
                        @change="ChangeValue(item.id)"
                        :data-attributevalue="attribute.parent"
                        :data-child="item.parent"
                        :value="item.id"
                        :data-value="item.id"
                        type="radio"
                        :name="`attribute_id[${attribute.id}]`"
                        :id="`value${item.id}`"/>
                    <label class="value-label border h-100" :for="`value${item.id}`">
                        <div class="image-container">
                            
                            <img  v-if="item.swatch" :src="item.swatch" width="100%"/>
                            <div class="imagebox-iconcolor" v-else-if="item.iconcolor" :style="`background-color:${item.iconcolor}`"></div>                   
                        </div>
                        <span>{{ item.title }}</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.attribute-values{
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: end;
    .value-item{
        width:calc((100% / 5) - 15px);
        input{
            opacity: 1;
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
                .imagebox-iconcolor{
                    height: 100%;
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
}

</style>