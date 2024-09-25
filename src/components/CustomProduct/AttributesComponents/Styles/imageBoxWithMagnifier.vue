<script setup>
import { defineProps,ref } from 'vue';
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
import contentPopup from '../PopupContent/Popup.vue'

const CustomScript = useCustomScript();
const props = defineProps({'attribute':Object,'group':Object});
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


const colorspopupShow= ref(false)
const colorspopupParent = ref(0)
const showColorLargeImage = ((index,Parent) => {
    colorspopupShow.value = true
    colorspopupParent.value = Parent
    setTimeout(function(){
    let colorimages = document.querySelector('.colors-images');
    let images = colorimages.querySelectorAll('.colors-image');
    images.forEach(image => {
        image.style.display = 'none';
        image.classList.remove('active');
    });
    let colorimage = colorimages.querySelector('.ColorImageIndex_' + index);
    colorimage.style.display = 'block';
    colorimage.classList.add('active')
},500)
 
});

const closecolorspopup = (()=>{
    colorspopupShow.value = false
})
const NextColorImage = (() => {
    let colorimages = document.querySelector('.colors-images');
    let curentImage = colorimages.querySelector('.colors-image.active');
    let children = colorimages.querySelectorAll('.colors-image');
    let firstChild = children[0];
    if (curentImage.nextSibling != null && curentImage.nextSibling.classList != undefined && Object.values(curentImage.nextSibling.classList).indexOf('colors-image') > -1) {
        curentImage.style.display = 'none';
        curentImage.classList.remove('active');

        curentImage.nextSibling.style.display = 'block'
        curentImage.nextSibling.classList.add('active')
    } else {
        curentImage.style.display = 'none';
        curentImage.classList.remove('active');

        firstChild.style.display = 'block'
        firstChild.classList.add('active')
    }


});
const PrevColorImage = (() => {
    let colorimages = document.querySelector('.colors-images');
    let curentImage = colorimages.querySelector('.colors-image.active');
    let children = colorimages.querySelectorAll('.colors-image');
    let lastChild = children[children.length - 1];

    console.log(colorimages.lastChild)
    if (curentImage.previousSibling != null && curentImage.previousSibling.classList != undefined && Object.values(curentImage.previousSibling.classList).indexOf('colors-image') > -1) {
        curentImage.style.display = 'none';
        curentImage.classList.remove('active');

        curentImage.previousSibling.style.display = 'block'
        curentImage.previousSibling.classList.add('active')
    } else {
        curentImage.style.display = 'none';
        curentImage.classList.remove('active');

        lastChild.style.display = 'block'
        lastChild.classList.add('active')
    }


});
const get_itemsByParent = ((items,parent)=>{
    return items.filter(item => item.parent === parent);
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
                <div class="value-item position-relative" v-for="(item,index) in attribute.values">
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
                            <i class="bi bi-search icon-for-large d-none d-md-block" @click="showColorLargeImage(item.id,item.parent)" data-toggle="tooltip" title="Black"></i>
                           
                            <img  v-if="item.swatch" :src="item.swatch" width="100%"/>
                            <div class="imagebox-iconcolor" v-else-if="item.iconcolor" :style="`background-color:${item.iconcolor}`"></div>                        
                        </div>
                        <span>{{ item.title }}</span>
                    </label>
                </div>
            </div>
        </div>
 
        <div class="colorspopup" :class="{'active':colorspopupShow==true}" v-if="colorspopupShow==true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <button @click="closecolorspopup()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="modal-body colors-images">
                        <div v-for="(item, index) in get_itemsByParent(attribute.values,colorspopupParent)" :class="`ColorImageIndex_${item.id}`" :key="index" class="colors-image">
                            <img v-if="item.swatch" :src="item.swatch" width="100%">
                            <div v-else-if="item.iconcolor" :style="`background-color:${item.iconcolor}`" class="item-iconcolor"></div>
                            <div class="text-center mt-2">
                                <div class="h3 fw-bold">{{ item.title }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="colorImagesNav">
                        <button @click="PrevColorImage()" type="button"><i class="far fa-chevron-left"></i></button>
                        <button @click="NextColorImage()" type="button"><i class="far fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
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
        .item-iconcolor {
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
            padding: 5px;
            display: flex;
            cursor: pointer;
            text-align: center;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
            .image-container{
                position: relative;
                height: 90px;
                min-height: 68px;
                width: 100%;
                overflow: hidden;
                img{
                    top:0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: none;
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
}

</style>