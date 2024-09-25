<script setup lang="ts">
import MegaMenu from './MegaMenu.vue'
interface MenuItem{
  location:string
  items:MenuItems
}
interface MenuItems {
  title: string;
  url: string;
  image: string;
  sortorder: number;  // Adding sortorder property
  items?: any; // optional since not all items may have children
  children?: MenuItem[];
}

interface Props {
  menuData:MenuItem;
}

const filterMenu = (menus,location) => {
  return menus.filter((menu) => menu.location === location)
}

const props = defineProps<Props>();

const wordpressUrl: string | undefined = import.meta.env.VITE_APP_WORDPRESS_URL;
</script>

<template>

  <nav class="navigation">
    <ul class="menu" v-if="menuData">
      <li class="has-dropdown" v-for="(menu, index) in props.menuData.items" :key="index">
        <a :href="wordpressUrl + menu.url"><span>{{ menu.title }}</span></a>
        <!-- <RouterLink v-else :to="{path:menu.url}">{{menu.title}}</RouterLink> -->
        <MegaMenu :menuData="menu.children" :parentItem="menu" />
      </li>
    </ul>
  </nav>

</template>

<style lang="scss">
.navigation {
  height: 100%;
  margin: 0 -20px;
  padding: 0;
  box-sizing: border-box;

  >ul {
    margin: 0;
    padding: 0;
    list-style: none none;
    font-size: 1.6rem;
    display: flex;
    height: 100%;
    margin: 0 6px 0 0;

    >li {
      height: 100%;
      margin: 0 6px 0 0;

      >a {
        align-items: center;
        color: #333;
        display: flex;
        height: 100%;
        padding: 7px 20px;
        position: relative;
        text-decoration: none;
        z-index: 2;
        text-transform: capitalize;

        &:after {
          font-size: 1rem;
          color: #aeb4bf;
          margin-top: -5px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: rotate(90deg);
          transition: all .3s cubic-bezier(.23, 1, .32, 1);
          font-family: 'isb-icons';
          font-style: normal;
          font-variant: normal;
          font-weight: 400;
          line-height: 1;
          text-transform: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          content: '\e901';
          display: inline-block;

        }
      }

      .drop-down {
        backface-visibility: hidden;
        background: #f5f7fb;
        box-shadow: 0 3px 5px rgba(0, 0, 0, .15);
        left: 0;
        opacity: 0;
        perspective: 1000px;
        position: absolute;
        top: 100%;
        transform: translateY(10px) scale(.9, .9);
        transform-origin: center;
        transition: all .3s cubic-bezier(.23, 1, .32, 1);
        width: 100%;
        z-index: -1;
        max-height: 0;

        .icons-nav {
          display: flex;
          flex-grow: 1;
          justify-content: space-around;
          margin: 0;
          padding: 0;
          list-style: none none;

          &.has-aditional {
            justify-content: space-between;
          }

          a {
            color: #2c333f;
            display: inline-block;
            font-weight: 500;
            position: relative;
            text-align: center;
            text-decoration: none;

            span {
              font-size: 1.6rem;
              display: inline-block;
              padding-right: 15px;
              position: relative;

              &:before {
                font-size: 1.2rem;
                position: absolute;
                right: 0;
                top: 5px;
                transition: all .3s cubic-bezier(.23, 1, .32, 1);
                font-family: 'isb-icons';
                font-style: normal;
                font-variant: normal;
                font-weight: 400;
                line-height: 1;
                text-transform: none;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                content: '\e901';
                display: inline-block;
              }
            }

            &:hover span:before {
              transform: translateX(5px);
            }
          }

          .icon {
            display: block;
            font-style: normal;
            height: 100px;
            margin: 0 auto 15px;
            width: 100px;
          }
        }

        .additional-nav {
          flex-basis: 280px;
          padding-left: 40px;
          border-left: 3px solid rgba(54, 110, 172, .05);
          border-radius: 1px;
          flex-shrink: 0;
          margin-left: 40px;
          padding-bottom: 10px;
          padding-left: 40px;
          padding-top: 10px;
          list-style: none none;

          li {
            align-items: center;
            display: flex;
            margin: 0 0 20px;

            a {
              font-size: 1.6rem;
              line-height: 1.8rem;
              align-items: center;
              color: #2c333f;
              display: inline-flex;
              font-weight: 500;
              padding-right: 15px;
              position: relative;
              text-decoration: none;

              &:before {
                font-family: 'isb-icons';
                font-style: normal;
                font-variant: normal;
                font-weight: 400;
                line-height: 1;
                text-transform: none;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                content: '\e901';
                display: inline-block;
                font-size: 1.2rem;
                position: absolute;
                right: 0;
                top: 7px;
                transition: all .3s cubic-bezier(.23, 1, .32, 1);
              }

              &:hover:before {
                transform: translateX(5px);
              }
            }
          }

          .icon {

            display: inline-block;
            height: 25px;
            margin-right: 16px;
            width: 25px;
          }
        }
      }

      &.has-dropdown {

        .drop-down {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        &:hover {
          a:after {
            color: #2c333f;
            transform: rotate(90deg) translateX(5px);
          }

          .drop-down {
            backface-visibility: visible;
            opacity: 1;
            transform: translateY(0) scale(1, 1);
            z-index: 10;
            max-height: fit-content;
          }
        }
      }
    }
  }

  .drop-down-container {
    margin-left: auto;
    margin-right: auto;
    max-width: 1440px;
    padding-left: 20px;
    padding-right: 20px;
    align-items: flex-start;
    display: flex;
    padding-bottom: 30px;
    padding-top: 30px;
    width: 100%;
  }

  [data-mobile-only] {
    display: none;
  }
}
</style>