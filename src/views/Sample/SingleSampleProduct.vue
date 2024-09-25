<script setup lang="ts">
import { useProduct } from '@/stores/product'
import { useCartStore } from '@/stores/Cart'
import { ref, computed } from 'vue'
import Banner from '@/components/innerBanner.vue'

const cartStore = useCartStore()
const productStore = useProduct()
const productData = ref(productStore.data)

const sampleListItems = (sampleContent: { content: string }[]): string[] => {
    if (sampleContent.length > 0) {
        const parsedContent: string = JSON.parse(sampleContent[0].content)[0].content;
        const items = parsedContent
            .split(/<\/?li>/)
            .map(item => item.trim())
            .filter(item => item !== '' && !['<ul>', '</ul>', '<ul style="letter-spacing: 0.14px;">'].includes(item));
        if (items.length > 0 && items[0].startsWith('<ul>')) {
            items.shift();
        }
        return items;
    } else {
        return [];
    }
};

const coordinates = ref<string>('');
const updateCoordinates = (e: MouseEvent): void => {
    const x = e.offsetX;
    const y = e.offsetY;
    coordinates.value = `${x}px ${y}px`;

    const activeSlide = document.querySelector('.product-image') as HTMLElement;
    const activeImage = activeSlide.querySelector('img') as HTMLImageElement;

    if (activeImage) {
        activeImage.style.transformOrigin = coordinates.value;
    }
};

const clearCoordinates = (): void => {
    coordinates.value = '';
};

const showColorLargeImage = (index: number, variationName: string): void => {
    const colorImages = document.querySelector('.colors-images') as HTMLElement;
    if (!colorImages) return;

    const images = colorImages.querySelectorAll('.colors-image') as NodeListOf<HTMLElement>;
    images.forEach(image => {
        image.style.display = 'none';
        image.classList.remove('active');
    });

    const colorImage = colorImages.querySelector(`.ColorImageIndex_${index}`) as HTMLElement;
    if (colorImage) {
        colorImage.style.display = 'block';
        colorImage.classList.add('active');
    }
};

const navigateColorImage = (direction: 'next' | 'prev'): void => {
    const colorImages = document.querySelector('.colors-images') as HTMLElement;
    const currentImage = colorImages.querySelector('.colors-image.active') as HTMLElement;
    const children = Array.from(colorImages.querySelectorAll('.colors-image')) as HTMLElement[];

    if (currentImage) {
        const sibling = direction === 'next' ? currentImage.nextElementSibling : currentImage.previousElementSibling;
        const targetImage = sibling && sibling.classList.contains('colors-image') ? sibling : (direction === 'next' ? children[0] : children[children.length - 1]);

        currentImage.style.display = 'none';
        currentImage.classList.remove('active');

        if (targetImage) {
            targetImage.style.display = 'block';
            targetImage.classList.add('active');
        }
    }
};

const nextColorImage = () => navigateColorImage('next');
const prevColorImage = () => navigateColorImage('prev');

const productVariations = computed(() => productData.value?.variations || []);
const productContent = computed(() => sampleListItems(productData.value?.content || []));

const addToCart = async (product: object, qty: number) => {
    // router.push({ name: 'Cart' })
    cartStore.addToCart(product, qty)
}
const removeProduct = async (productId: number) => {
    // router.push({ name: 'Cart' })
    if(cartStore.cart.items){

        const product = Object.values(cartStore.cart.items).find(item => item.slug === productId);
        
        // If product is found, return its rowId, otherwise return null
        //   return product ? product.rowId : null;
        cartStore.removeFromCart(product.rowId)
    }
}

const isProductInCart = (productId: string) => {
    // Iterate over the cart object and check if the product ID exists
    if(cartStore.cart.items){

        return Object.values(cartStore.cart.items).some(
            (item) => item.slug === productId
        );
    }
}

</script>

<template>
    <Banner :title="productData?.parent?.name" :description="productData?.parent?.description"
        :bannerImage="productData?.parent?.image" />
    <div class="container" v-if="productData">
        <router-link :to="{ name: 'Samples' }" class="mt-4 d-inline-block">
            <i class="far fa-angle-left"></i>
            <i class="far fa-angle-left"></i>
            Back To Samples</router-link>
        <section id="sample_detail" class="mt-5 border p-3 p-md-5">
            <div class="row g-5">
                <div class="col-12 col-md-6">
                    <div @mousemove="updateCoordinates" @mouseout="clearCoordinates"
                        class="product-image rounded-4 overflow-hidden me-0 me-md-5">
                        <img width="100%" :src="productData.image">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="detail-top d-md-flex justify-content-between">
                        <div>
                            <div class="h2 fw-bold product-heading mb-1">{{ productData.name }}</div>
                            <div class="subheading fw-bold mb-1">Great quality basic</div>
                            <div class="text-black widthdetail"><b>Max width:</b> {{ productData.width }}mm</div>
                        </div>
                        <div>
                            <div class="price">
                                <b>From</b>
                                <div id="pricecontent">{{ productData.rrp }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="product-description mt-4">
                        <div v-html="productData.description"></div>
                    </div>
                    <div class="addToCart-Section mt-5">
                        <button v-if="isProductInCart(productData.slug)" @click="removeProduct(productData.slug)"
                            class="bg-transparent text-danger fw-bold border-0 samplesCart">
                            Remove From Cart
                        </button>
                        <div v-else>
                            <button type="button" class="btn btn-secondary text-white py-2"
                                @click="addToCart(productData, 1)">Add to Cart</button>
                        </div>
                        <template>
                        </template>
                    </div>
                </div>
            </div>
            <div v-if="productContent.length > 0" class="product-detail-description d-flex flex-column d-md-grid mt-5">
                <template v-for="item in productContent" :key="item">
                    <div v-if="item" class="d-flex align-items-center gap-2 mb-2">
                        <i class="fas fa-check icon"></i>
                        <span v-html="item"></span>
                    </div>
                </template>
            </div>
            <template v-if="productVariations.length" v-for="variation in productVariations" :key="variation.name">
                <div class="colors-row row mt-5 g-5">
                    <div class="col-md-12">
                        <div class="h1 fw-bolder mb-0">{{ variation.name }}</div>
                    </div>
                    <template v-for="(item, index) in variation.values" :key="item.slug">
                        <div class="col-md-3 col-6" v-if="item.slug != productData.slug">
                            <div class="color-item">
                                <div class="color-image mb-3 rounded-4 overflow-hidden">
                                    <router-link :to="{ name: 'Samples', params: { slug: item.slug } }">
                                        <img :src="item.image" width="100%">
                                    </router-link>
                                    <span class="colorImgShow" data-bs-toggle="modal"
                                        :data-bs-target="'#Modal' + variation.name"
                                        @click="showColorLargeImage(index, variation.name)"><i
                                            class="fas fa-search"></i></span>
                                </div>
                                <div class="h3 mb-0">{{ item.name }}</div>
                                <div>
                                    <button v-if="isProductInCart(item.slug)" @click="removeProduct(item.slug)"
                                        class="bg-transparent text-danger fw-bold border-0 samplesCart"
                                        :aria-label="item.name">
                                        Remove From Cart
                                    </button>
                                    <button v-else class="bg-transparent fw-bold border-0 samplesCart"
                                        @click="addToCart(item, 1)" :aria-label="item.name">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
        </section>
    </div>

    <!-- Color Magnifier Modal -->
    <template v-if="productVariations.length" v-for="variation in productVariations" :key="variation.name">
        <div class="modal fade" :id="'Modal' + variation.name" tabindex="-1"
            :aria-labelledby="'Modal' + variation.name + 'Label'" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="modal-body colors-images">
                        <div v-for="(item, index) in variation.values" :class="'ColorImageIndex_' + index" :key="index"
                            class="colors-image">
                            <img :src="item.image" width="100%">
                            <div class="text-center mt-2">
                                <div class="h3 ">{{ item.name }}</div>
                                <button v-if="isProductInCart(item.slug)" @click="removeProduct(item.slug)"
                                    class="bg-transparent text-danger fw-bold border-0 samplesCart">
                                    Remove From Cart
                                </button>
                                <button v-else class="bg-transparent fw-bold samplesCart border-0"
                                    @click="addToCart(item, 1)">
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="colorImagesNav">
                        <button @click="prevColorImage" type="button"><i class="far fa-chevron-left"></i></button>
                        <button @click="nextColorImage" type="button"><i class="far fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>



<style scoped lang="scss">
.h3 {
    font-size: 2rem !important;
    line-height: 2.5rem !important;
    font-family: 'Metropolis' !important;
    font-weight: 700 !important;
}

.h1 {
    color: #333;
    font-weight: 700;
    line-height: 40px;
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 2.2rem;
}

.h1,
.h2,
.h3 {
    font-family: 'Metropolis', Georgia, 'Times New Roman', Times, serif;
}

#sample_detail {
    box-shadow: 0px 0px 6px #00000029;
    border-radius: 10px;

    .product-image {
        img {
            cursor: pointer;
        }

        &:hover img {
            transform: scale(2);
        }
    }

    .product-heading {
        line-height: 1;
        font-size: 38px;
    }

    .subheading {
        font-size: 24px;
        color: #333333;
        opacity: 0.59;
    }

    .widthdetail {
        font-size: 24px;
    }

    .price {
        font-size: 24px;
        line-height: 1.2;

        #pricecontent {
            color: var(--iseek-secondary);
            font-weight: 700;
            font-size: 30px;
        }
    }

    .product-description {
        p {
            line-height: 30px;
            font-size: 18px;
        }
    }

    .product-detail-description {
        grid-template-columns: 1fr 1fr;
        row-gap: 15px;
        column-gap: 30px;
        line-height: 1;

        .icon {
            color: white;
            width: 20px;
            min-width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--iseek-primary);
            padding: 2px;
            font-size: 9px;
            border-radius: 5px;
            line-height: 1;
            border: 1px solid;
            overflow: hidden;
        }
    }

    .color-item {
        .color-image {
            position: relative;

            .colorImgShow {
                position: absolute;
                bottom: 0;
                right: 0;
                z-index: 1;
                background: white;
                width: 30px;
                height: 30px;
                display: grid;
                place-items: center;
                cursor: pointer;

                &:hover {
                    background-color: var(--iseek-secondary);
                }
            }
        }
    }
}

.samplesCart {
    color: var(--iseek-primary);

    &.disabled {
        color: #ccc;
        cursor: no-drop;
    }
}

.AddToCart {
    color: var(--iseek-primary);
    cursor: pointer;
}

.colors-images {
    position: relative;

    .colors-image {
        display: none;

        img {
            border: 1px solid #ccc;
        }
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
