<script setup lang="ts">
import { computed } from 'vue';
import { useCompanyProfile } from '@/stores/CompanyProfile';

interface Address {
  addressline1: string;
  suburb: string;
  postcode: string;
  country: string;
}

interface Profile {
  phone?: string;
  email?: string;
  addressline1?: string;
  suburb?: string;
  postcode?: string;
  country?: string;
}

const companyProfileStore = useCompanyProfile();

const profile = computed<Profile>(() => companyProfileStore.profile || {});

const defaultPhone: string = '1300 664 257';
const defaultEmail: string = 'sales@iseekblinds.com.au';
const defaultAddress: Address = {
  addressline1: '49 Lakeside Dr',
  suburb: 'Broadmeadows',
  postcode: '3047',
  country: 'Australia'
};
</script>

<template>
  <div class="contact-footer">
    <a>
      <h3 class="text-white">Contact Us</h3>
    </a>
    <ul class="info-items list-unstyled">
      <li class="phone info-item">
        <span class="icon icon-phone"></span>
        <a href="tel:+611300664257">
          {{ profile.phone || defaultPhone }}
        </a>
      </li>
      <li class="email info-item">
        <span class="icon icon-envelope"></span>
        <a :href="`mailto:${profile.email || defaultEmail}`">
          {{ profile.email || defaultEmail }}
        </a>
      </li>
      <li class="address info-item">
        <span class="icon icon-map"></span>
        <a
          href="https://www.google.com/maps/place/iseekblinds/@-37.6860427,144.9476623,15z/data=!4m6!3m5!1s0x6ad64f46c67e4987:0xfd88ecd7e7dbc84c!8m2!3d-37.6860427!4d144.9476623!16s%2Fg%2F1tdwf1x7?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ profile.addressline1 || defaultAddress.addressline1 }} <br />
          {{ profile.suburb || defaultAddress.suburb }}, {{ profile.postcode }} <br />
          Melbourne, {{ profile.country || defaultAddress.country }}
        </a>
      </li>
    </ul>
  </div>
</template>


<style scoped lang="scss">
.contact-footer {
  .info-items {
    .info-item {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
      align-content: flex-start;
      margin-bottom: 10px;
    }

    .icon {
      font-size: 1.5rem;
      color: #aeb4bf;
      margin-right: 15px;
      line-height: 1;
    }

    .icon-envelope {
      font-size: 2.8rem;
      margin-right: 10px;
      margin-left: -8px;
      color: #aeb4bf;
      vertical-align: middle;
      line-height: 1;
    }

    a {
      color: #fff;
    }
  }

  ol,
  ul {
    padding-left: 0rem;
  }
}
</style>
