<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

interface Props {
  initialTab: string;
}

const props = defineProps<Props>();
const selectedTab = ref<string>(props.initialTab);
const emits = defineEmits<(event: 'tabChanged', tab: string) => void>();

const changeTab = (tab: string) => {
  selectedTab.value = tab;
  emits('tabChanged', selectedTab.value);
};

const logoutFunc = async () => {
  await authStore.logout();
  userStore.$reset()
  authStore.$reset()
  await router.push({ name: 'Login' });
};
</script>

<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="content">
          <ul class="nav_items">
            <li class="nav_item">
              <span @click="changeTab('account')" class="icon-my-account-menu"
                :class="{ current: selectedTab === 'account' }">My account</span>
            </li>
            <li class="nav_item">
              <span @click="changeTab('orders')" class="icon-my-orders"
                :class="{ current: selectedTab === 'orders' }">Orders</span>
            </li>
            <li class="nav_item">
              <span @click="changeTab('quotations')" class="icon-samples"
                :class="{ current: selectedTab === 'quotations' }">Quotations</span>
            </li>
            <li class="nav_item">
              <span @click="changeTab('billing-address')" class="icon-star-line"
                :class="{ current: selectedTab === 'billing-address' }">Billing Address</span>
            </li>
            <li class="nav_item">
              <span @click="changeTab('address')" class="icon-star-line"
                :class="{ current: selectedTab === 'address' }">Shipping Address</span>
            </li>
            <!-- <li class="nav_item">
              <span @click="changeTab('wishlist')" class="icon-star-line"
                :class="{ current: selectedTab === 'wishlist' }">My wish list</span>
            </li> -->
            <li class="nav_item">
              <span @click="changeTab('cards')" class="icon-eway2"
                :class="{ current: selectedTab === 'cards' }">My Credit Cards</span>
            </li>
            <li class="nav_item">
              <span @click="changeTab('change-password')" class="icon-save-products-menu"
                :class="{ current: selectedTab === 'change-password' }">Change Password</span>
            </li>
            <li class="nav_item">
              <span @click="logoutFunc()" class="icon-logout">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  background: var(--iseek-primary);

  .nav_items {
    margin: 0;
    padding: 0;
    list-style: none none;
    display: flex;
    flex-direction: column;

    li {
      span {
        border-bottom: 1px solid #fff;
        width: 100%;
        cursor: pointer;
        display: block;
        padding: 10px 20px;
        color: #fff;

        &:before {
          color: var(--iseek-secondary);
          margin-right: 15px;
          font-size: 20px;
        }

        border-left: 3px solid var(--iseek-primary);

        &.current,
        &:hover {
          border-left: 3px solid var(--iseek-secondary);

          &:before {
            color: white;
          }
        }
      }
    }
  }
}

.nav-item {
  cursor: pointer;
}

.nav-item:hover {
  background: var(--iseek-secondary) !important;
}
</style>
