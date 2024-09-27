<script setup lang="ts">
import { defineProps } from 'vue';

interface InputData {
    till_cardname: string;
    till_expirymonth: string;
    till_expiryyear: string;
    clientsceret: string;
    save_card_details: string;
    // Add other necessary fields
}

const props = defineProps<{ inputData: InputData }>();

</script>
<template>
    <input type="hidden" v-model="props.inputData.clientsceret" name="transaction_token" id="transaction_token" />
    <div class="till-payment-fields row gap-5 px-3 mt-3 pt-4 border-top ">
        <div class="col-md-6 d-flex align-items-center border-bottom mb-3 mt-4">
            <label for="card_holder" class="fw-medium col-form-label text-nowrap">Card holder<span
                    class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input type="text" v-model="props.inputData.till_cardname" class="form-control border-0 shadow-none"
                    id="card_holder" name="card_holder" />
            </div>
        </div>
        <div class="col-md col-12 d-flex align-items-center border-bottom mb-3 mt-4">
            <label for="exp_month" class="fw-medium col-form-label text-nowrap">Month<span
                    class="text-danger">*</span></label>
            <div>
                <input type="text" v-model="props.inputData.till_expirymonth" placeholder="MM"
                    class="form-control border-0 shadow-none" id="exp_month" name="exp_month" />
            </div>
        </div>
        <div class="col-md col-12 d-flex align-items-center border-bottom mb-3 mt-4">
            <label for="exp_year" class="fw-medium col-form-label text-nowrap">Year<span
                    class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input type="text" v-model="props.inputData.till_expiryyear" placeholder="YY"
                    class="form-control border-0 shadow-none" id="exp_year" name="exp_year" />
            </div>
        </div>
    </div>
    <div class="row gap-5 px-3">
        <div class="col-md d-flex align-items-center border-bottom mb-3 mt-4">
            <label for="cvv" class="fw-medium col-form-label text-nowrap">CVV<span class="text-danger">*</span></label>
            <div id="cvv_div" style="height: 35px; width: 100%;"></div>
        </div>
        <div class="col-md-9 d-flex align-items-center border-bottom mb-3 mt-4">
            <label for="cardnumber" class="fw-medium col-form-label text-nowrap">Card Number<span
                    class="text-danger">*</span></label>
            <div id="number_div" style="height: 35px; width: 100%;"></div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="saveCard">
                <label for="savecard">
                    <input type="checkbox" :value="true" name="save_card_details"
                        v-model="props.inputData.save_card_details" id="savecard" class="form-check-input me-2">
                    Save Card
                </label>
            </div>
        </div>
    </div>
</template>