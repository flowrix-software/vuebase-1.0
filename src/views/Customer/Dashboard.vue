<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import WishList from '@/components/Customer/WishList.vue';
import AddressDetails from '@/components/Customer/ShippingAddress.vue';
import ChangePassword from '@/components/Customer/ChangePassword.vue';
import CreditCards from '@/components/Customer/CreditCards.vue';
import DashboardTabs from '@/components/Customer/DashboardTabs.vue';
import OrderHistory from '@/components/Customer/OrderHistory.vue';
import Quotation from '@/components/Customer/Quotation.vue';
import UserDetails from '@/components/Customer/UserDetails.vue';
import UserSamples from '@/components/Customer/UserSamples.vue';
import BillingAddress from '@/components/Customer/BillingAddress.vue';
import { useUserStore } from '@/stores/UserStore';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const isLoading = ref<boolean>(true);
const parentSelectedTab = ref<string>(route.params.tab as string || 'account');

onBeforeMount(async () => {
  try {
    await userStore.fetchUserData();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});

const userData = computed(() => userStore.user?.user.data || {});

// Function to handle tab change
const handleTabChange = (tab: string) => {
  if (tab !== parentSelectedTab.value) {
    parentSelectedTab.value = tab;
    router.push({ name: 'Dashboard', params: { tab } });
  }
};

// New method to handle switching to the billing address tab
const handleSwitchToBilling = () => {
  parentSelectedTab.value = 'billing-address';
  router.push({ name: 'Dashboard', params: { tab: 'billing-address' } });
};

// Ensure currentTab is in sync with route params
const currentTab = computed(() => route.params.tab as string || 'account');
parentSelectedTab.value = currentTab.value;
</script>

<template>
  <div v-if="!isLoading">
    <section class="my-5">
      <div class="container">
        <h1 class="text-center">My Account</h1>
        <div class="row">
          <div class="col-lg-3 order-2 order-lg-1">
            <div class="mb-5">
              <DashboardTabs :initialTab="parentSelectedTab" @tabChanged="handleTabChange" />
            </div>
          </div>
          <div class="col-lg-9 p-4 order-1 order-lg-2 border">
            <div v-if="parentSelectedTab === 'account'">
              <UserDetails :userData="userData" />
            </div>
            <div v-if="parentSelectedTab === 'user_samples'">
              <UserSamples />
            </div>
            <div v-if="parentSelectedTab === 'billing-address'">
              <BillingAddress :userAddress="userData.addresses" />
            </div>
            <div v-if="parentSelectedTab === 'address'">
              <AddressDetails :userAddress="userData.addresses" @switch-to-billing="handleSwitchToBilling" />
            </div>
            <!-- <div v-if="parentSelectedTab === 'wishlist'">
              <WishList :userAddress="userData.addresses" />
            </div> -->
            <div v-if="parentSelectedTab === 'change-password'">
              <ChangePassword :userAddress="userData.addresses" />
            </div>
            <div v-if="parentSelectedTab === 'cards'">
              <CreditCards :userAddress="userData.addresses" />
            </div>
            <div v-else-if="parentSelectedTab === 'orders'">
              <OrderHistory />
            </div>
            <div v-else-if="parentSelectedTab === 'quotations'">
              <Quotation />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

