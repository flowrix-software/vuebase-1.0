<script setup>
import { defineProps,ref,defineEmits } from 'vue';
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
const props = defineProps({'attribute':Object,'slide':Object,'group':Object});
const CustomScript = useCustomScript();
const emit = defineEmits(['popupOpen'])
const SelecteValue = ref(0);

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


const showColorLargeImage = ((index) => {
    emit('popupOpen',index,props.slide.parent);
});
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
                            <i class="bi bi-search icon-for-large d-none d-md-block"@click="showColorLargeImage(index)" data-toggle="tooltip" title="Black"></i>
                            <img  v-if="slide.swatch" :src="slide.swatch" width="100%"/>
                            <div class="slide-iconcolor" v-else-if="slide.iconcolor" :style="`background-color:${slide.iconcolor}`"></div>                    
                        </div>
                        <span>{{ slide.title }}</span>
                    </label>
                </div>
 
</template>
<style scoped lang="scss">
.slide-iconcolor{
    height: 100%;
}
.modal-dialog{
        opacity: 0;
        transition-duration: 20000ms;
    }
.colorspopup{
    position: fixed;
    width:100%;
    height: 100%;
    top:0;
    left: 0;
    z-index: 99999;
    display: flex;
    background-color: #00000080;    
    &.active{
        .modal-dialog{
        opacity: 1;
        }
    }
}

.colors-images {
    position: relative;
    padding: 10px;
    background: #fff;
    border-radius: 20px;
    .colors-image {
        display: none;
        border-radius: 20px;
        overflow: hidden;

        img {
            border: 1px solid #ccc;
            width: 450px;
            height: 450px;
        }
    }
    .colors-image:first-child{
        display: block;
    }
}
.colorImagesNav {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-size: 38px;
    line-height: 1;
    top: calc(50% - 25px);

    button {
        background-color: #fff;
        border: 0;
        color: var(--iseek-primary);

        &:hover {
            background-color: var(--iseek-secondary);
        }
    }
}
button.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    color: var(--iseek-primary);
    opacity: 1;
    background-color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>
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
            padding: 5px;
            display: flex;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            text-align: center;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
            .image-container{
                position: relative;
                height: 90px;
                width: 100%;
                overflow: hidden;
                img{
                    top:0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position:relative;
                }
            }
            span{
                padding: 5px 0;
            }
            &:hover {
                box-shadow: rgb(238, 238, 238) 0px 0px 3px 3px;
            }
            .icon-for-large{
                position: absolute;
                z-index: 1;
                background-color: #fff;
                top: 0;
                right:0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
            }
        }
    }
</style>