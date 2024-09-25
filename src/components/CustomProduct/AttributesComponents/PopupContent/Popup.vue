<script setup>
import {ref } from 'vue';
const props = defineProps({'attribute':Object});
</script>
<template>
    <div class="content-icons" v-if="attribute.content.length>0">
        <div class="content-icon" v-for="(content,index) in attribute.content">
            
            <i v-if="content.iconstyle_id==1" class="fas fa-question-circle"></i>
            <i v-if="content.iconstyle_id==2" class="fas fa-play-circle"></i>
            <i v-if="content.iconstyle_id==3" class="fas fa-exclamation-circle"></i>
            <i v-if="content.iconstyle_id==4"  data-bs-toggle="modal" :data-bs-target="`#attributcontent${content.id}`" class="fas fa-info-circle"></i>
            <i v-if="content.iconstyle_id==5" class="fas fa-image"></i>
            <div class="modal fade" :id="`attributcontent${content.id}`" tabindex="-1" :aria-labelledby="`attributcontent${content.id}`" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header bg-secondary">
                        <h3 class="modal-title w-100 text-center text-white">
                            {{ content.title }}
                        </h3>
                        <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-html="content.content.html">
                       
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary py-1 px-3 text-white" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

.content-icons {
    display: inline-block;
}
.modal.show{
    .modal-dialog{
        opacity: 1;
    }
}

</style>