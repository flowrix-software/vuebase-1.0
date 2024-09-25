import { createRouter, createWebHistory } from 'vue-router'
import { useCompanyProfile } from "@/stores/CompanyProfile";
import { useNavMenu } from "@/stores/NavMenu";
import { useProduct } from "@/stores/product";
import { useShopStore } from "@/stores/ShopStore";
import { usePages } from "@/stores/Pages";
import { useSamples } from "@/stores/Samples";
import { useCountryStore } from "@/stores/Country";
import { useCheckoutStore } from "@/stores/Checkout";
import { useCartStore } from "@/stores/Cart";
import { useCategories } from "@/stores/Categories";
import { defineAsyncComponent } from "vue";
import { useAuthStore } from '@/stores/AuthStore';
import Dashboard from '@/views/Customer/Dashboard.vue'; 
interface Data {
  type: string
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',
      name: 'Shop',
      meta: {page:'shop' },
      component: () => import('@/views/Shop.vue'),
      beforeEnter: (async (to, from, next) => {
        const Shop = useShopStore()
        await Shop.getShop({});
        const data = Shop.shop
        to.meta.data = data
        next();
      })
    },
    { path: '/shop',
      name: 'ShopAll',
      meta: {page:'shop' },
      component: () => import('@/views/ShopAll.vue'),
      beforeEnter: (async (to, from, next) => {
        const Shop = useShopStore()
        await Shop.customProducts({});
        const data = Shop.shop
        to.meta.data = data
       
        next();
      })
    },    
    { path: '/customer/:tab?',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true,page:'dashboard' },
      props: route => ({ tab: route.params.tab || 'account' }),
    },    
    { path: '/customer/account/login',
      name: 'Login',      
      meta: {page:'login' },
      component: () => import('@/views/Customer/Login.vue') 
    },
    { path: '/checkout/onepage/success',
      name: 'ThankYou',
      meta: {page:'thankyou' },
      beforeEnter: async (to, from, next) => {
        useCartStore().$reset();
        useCheckoutStore().$reset();
        next()
      },
      component: () => import('@/views/ThankYou.vue') 
    },
    { path: '/customer/account/create',
      name: 'Register',
      meta: {page:'register' },
      component: () => import('@/views/Customer/Register.vue') 
    },
    { path: '/customer/account/forgotpassword',
      name: 'ForgetPassword',
      meta: {page:'forgotpassword' },
      component: () => import('@/views/Customer/ForgetPassword.vue') 
    },
    { path: '/product/:slug',
      name: 'Product',
      meta: {page:'product' },
      beforeEnter: async (to, from, next) => {
        const slug = to.params.slug;
        let queryData = ''
        if(to.query && to.query.customize!=''){
          queryData = to.query;
        }
        const product = useProduct();
        await product.getProduct(slug,queryData);
        const data: DataType | null = product.data;
      
        if (data) {
          if (data.type === 'simple') {
            to.meta.component = defineAsyncComponent({
              loader: async () => {
                try {
                  // Attempt to dynamically import the specified template component
                  return await import(`@/views/Product/SimpleProduct${data.template}.vue`);
                } catch (error) {
                  // If the specified template fails to load, fall back to SimpleProduct1.vue
                  return import('@/views/Product/SimpleProduct1.vue');
                }
              },
            });
          } else if (data.type === 'custom') {
            to.meta.component = defineAsyncComponent({
              loader: async () => {
                try {
                  // Attempt to dynamically import the specified template component
                  return await import(`@/views/Product/CustomProduct${data.template}.vue`);
                } catch (error) {
                  // If the specified template fails to load, fall back to CustomProduct1.vue
                  return import('@/views/Product/CustomProduct1.vue');
                }
              },
            });
          }  else if (data.type === 'bundle') {
            to.meta.component = defineAsyncComponent({
              loader: async () => {
                try {
                  // Attempt to dynamically import the specified template component
                  return await import(`@/views/Product/BundleProduct${data.template}.vue`);
                } catch (error) {
                  // If the specified template fails to load, fall back to CustomProduct1.vue
                  return import('@/views/Product/BundleProduct1.vue');
                }
              },
            });
          }
          to.meta.data = data;
          to.meta.head = {meta_title:data.meta_title?data.meta_title:data.name,meta_description:`${data.meta_description}`,image:data.image};
          next();
        } else {
          next({ name: 'ProductNotFound', params: { pathMatch: to.params.slug } });
        }
      },
      component: () => import('@/views/Product/Product.vue'),
    },
    { path: '/sample/:slug',
      name: 'SamplesProduct',
      meta: {page:'sample' },
      beforeEnter: (async (to, from, next) => {
        const slug = to.params.slug
        const product = useProduct()
        await product.getProduct(slug);
        const data: DataType | null = product.data
        if (data) {
          to.meta.component = defineAsyncComponent(() => import('@/views/Sample/SingleSampleProduct.vue'))
          to.meta.data = data
          to.meta.head = {meta_title:data.meta_title?data.meta_title:data.name,meta_description:`${data.meta_description}`,image:data.image};
          next()
        } else {
          next({ name: 'ProductNotFound', params: { pathMatch: to.params.slug } })
        }

      }),
      component: () => import('@/views/Sample/SingleSampleProduct.vue'),
    },
    { path: '/samples',
      name: 'Samples',
      meta: {page:'samples' },
      component: () => import('@/views/Sample/Samples.vue'),
      beforeEnter: async (to, from, next) => {
        const sampleProductStore = useSamples();
        await sampleProductStore.getSamples();
        const data = sampleProductStore.data;

        if (data) {
          to.meta.data = data;
          next();
        } else {
          next({ name: 'ProductNotFound' });
        }
      },
    },
    {  path: '/category/:slug',
       name: 'Categories',
       meta: {page:'category' },
       beforeEnter: (async (to, from, next) => {
        const slug = to.params.slug
        const category = useCategories()
        await category.getCategories(slug);
        const data: DataType | null = category.data
        if (data) {
          to.meta.component = defineAsyncComponent(() => import('@/views/Category/Categories.vue'))
          to.meta.data = data
          to.meta.head = {meta_title:data.category.meta_title?data.category.meta_title:data.category.name,meta_description:`${data.category.meta_description}`,image:data.category.image};
          next()
        } else {
          next({ name: 'ProductNotFound', params: { pathMatch: to.params.slug } })
        }

      }),
      component: () => import('@/views/Category/Categories.vue'),
    },
    { path: '/onestepcheckout',
      name: 'Checkout',
      meta: {page:'onestepcheckout' },
      component: () => import('@/views/CheckoutPage.vue'),
      beforeEnter: (async (to, from, next) => {
        const Checkout = useCheckoutStore()
        await Checkout.getConfig();
        const Country = useCountryStore()
        await Country.getCountries();
        const data = Country.countries
        to.meta.data = data
        next();
      })

    },
    { path: '/checkout/cart',
      name: 'Cart',
      meta: {page:'cart' },
      component: () => import('@/views/Cart.vue'),

    },
    { path: '/product/:pathMatch(.*)*',
      name: 'ProductNotFound',
      meta: {page:'notfound' },
      component: () => import('@/views/404.vue'),
    },

  ],
})

router.beforeEach(async (to, from, next) => {
  await usePages().getPage(to.meta.page);
  const authStore = useAuthStore();
  const CompanyProfile = useCompanyProfile();
  const NavMenu = useNavMenu();

  if (!authStore.isAuthenticated) {
    await authStore.initializeAuthState();
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next(); 
  }
  await Promise.all([
    CompanyProfile.getCompanyProfile(),
    NavMenu.topMenu(1, 'header'),
  ]);
});

router.afterEach(async(to, from, next) => {
  let head = {}
  if(to.meta.head){
    head = to.meta.head;
  }else{
    head = usePages().page
  }
  // if(head){
      document.title = head?.meta_title
      document.querySelector('meta[name="title"]')?.setAttribute("content",head?.meta_title)
      document.querySelector('meta[name="description"]')?.setAttribute("content",head?.meta_description)
      document.querySelector('meta[name="keywords"]')?.setAttribute("content",'')
      document.querySelector('meta[name="robots"]')?.setAttribute("content",'noindex,nofollow')
      document.querySelector('meta[property="og:type"]')?.setAttribute("content",'')
      document.querySelector('meta[property="og:title"]')?.setAttribute("content",head?.meta_title)
      document.querySelector('meta[property="og:image"]')?.setAttribute("content",head?.image)
      document.querySelector('meta[property="og:description"]')?.setAttribute("content",head?.meta_description)
      document.querySelector('meta[property="og:url"]')?.setAttribute("content",window.location.origin+to.fullPath)
      document.querySelector('link[rel="canonical"')?.setAttribute("content",window.location.origin+to.fullPath)
      // console.log(to);
    // }
  
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'virtualPageView',  // Custom event name
    pagePath: to.fullPath,  // The current route path
    pageTitle: document.title // The dynamic title
  }) 
  if(to.name=="Product"){
    let data = useProduct().data
    if(data.length>0){
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        "event": "view_item",
        "value": data.rrpfloat,
        "currency": "AUD",
        "items": [
            {
                "id": data.id,
                "google_business_vertical": "retail"
            }
        ],
        "ecommerce": {
            "detail": {
                "actionField": {
                    "list": data.category
                },
                "products": [
                    {
                        "id": "9",
                        "sku": data.name,
                        "name": data.name,
                        "price": data.rrpfloat,
                        "brand": data.brand,
                        "attribute_set_id": "9",
                        "attribute_set_name": data.name,
                        "category":  data.category,
                        "category_path": data.breadcrumb.category[0]?.slug
                    }
                ]
            },
            "items": [
                {
                    "item_id": data.id,
                    "item_name": data.name,
                    "price": data.rrpfloat,
                    "item_brand": "Default",
                    "item_list_name": data.category,
                    "item_list_id": "",
                    "item_category": data.category
                }
            ]
        },
        "ga4_event": "view_item"
      })
    } 
  }
  if(to.name=="Cart"){
    const cartItems = useCartStore().cart.items
      window.dataLayer = window.dataLayer || [];
      let cartProducts = []
      for (var key in cartItems) {
          let item = cartItems[key]
    
          cartProducts.push({
                "id": item.id,
                "name": item.name,
                "sku": item.sku,
                "price": item.pricefloat.toFixed(2),
                "quantity": item.qty,
                "attribute_set_id": "",
                "attribute_set_name": "Default",
                "brand": "Default",
                "category": ""
            })
          
        };
        window.gtag('event', 'begin_checkout', {
            'items': cartProducts
          });
          window.dataLayer.push({
        event: 'view_item_list',
        value: 1000,
        items:[],
       ecommerce:{
          "currencyCode":"AUD",
          "impressions":[],
          "items":cartProducts
       },
       "ga4_event":"begin_checkout"
      });
          window.dataLayer.push({
        "event": "begin_checkout",
        "ecommerce": {
            "checkout": {
                "actionField": {
                    "step": "1",
                    "option": "Shopping Cart"
                },
                "products": cartProducts
            }
        },
        "gtm.uniqueEventId": 24
    });
        console.log(cartProducts)
       
        window.dataLayer.push({
        "event": "checkout",
        "ecommerce": {
            "checkout": {
                "actionField": {
                    "step": "1",
                    "option": "Shopping Cart"
                },
                "products": cartProducts
            }
        },
        "gtm.uniqueEventId": 24
    });
  }
});
export default router
