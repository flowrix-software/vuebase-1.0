import { defineComponent, PropType } from "vue";

// Define the types for the product data
type VariationValue = {
  name: string,
  slug: string,
  image: string,
  selected: boolean,
}

type Variation = {
  id: number,
  name: string,
  values: VariationValue[],
}

type Product = {
  id: number,
  name: string,
  slug: string,
  description:string
  type: string,
  promotionlabels: string | null,
  category: string,
  brand: string,
  sortorder: number,
  sku: string,
  mansku: string,
  stockstatus: boolean,
  stock: number,
  image: string,
  price: string,
  rrp: string,
  pricefloat: number,
  rrpfloat: number,
  variations: Variation[],
  cars: any[],
  images: any[],
}

export default defineComponent({
  name: "CategoryProductCard",
  props: {
    product: {
      type: Object as PropType<Product>, // Specify the Product type
      required: true
    }
  },
  setup(props) {
    // props is already accessible in setup, no need to return it
    return {props};
  }
});
