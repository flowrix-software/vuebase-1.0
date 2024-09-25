<template>
    <section id="shop-content" class="pt-5 pb-5">
        <div class="container mb-$">
            <div class="row mb-5">
                <div class="col">
                    <h3 class="text-center section-heading">Better Blinds, More Convenience</h3>
                </div>
            </div>
            <div class="row g-5">
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/au-made-01.svg" />
                        <h4 class="mb-3 mt-5">All products Australian Made</h4>
                        <p>We manufacture all our blinds and curtains in our factory in Melbourne, and we source our
                            plantation shutters from trusted Australian Made suppliers.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/backed-01.svg" />
                        <h4 class="mb-3 mt-5">Backed by warranties
                        </h4>
                        <p>You can rest assured that all our products are backed by warranties, because we believe in
                            the
                            quality and longevity of what we create.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/control-01.svg" />
                        <h4 class="mb-3 mt-5">Convenience and control
                        </h4>
                        <p>With our simple DIY process, you can do it all when it suits you. No need to book a quote or
                            wait
                            for tradespeople when it’s time to install.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/delivery-01.svg" />
                        <h4 class="mb-3 mt-5">Fast production and delivery
                        </h4>
                        <p>Every order is custom made to your exact specifications. We work hard to get your order
                            finished
                            and delivered as quickly as possible.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/blinds-01.svg" />
                        <h4 class="mb-3 mt-5">Blinds experts since 2004
                        </h4>
                        <p>iSeekBlinds has been creating outstanding products for a long time, and we will be here to
                            give
                            you advice and support for many more years to come.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/easy-install-01.svg" />
                        <h4 class="mb-3 mt-5">Easy to measure and install
                        </h4>
                        <p>DIY may seem daunting, but we strive to make it as simple and easy as it can be, regardless
                            of
                            your skill level or previous experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.cat-heading {
    font-size: 30px;
    font-weight: bold;
    position: relative;
    margin-bottom: 10px;
    padding-bottom: 5px;
    display: inline-block;

    &:after {
        content: "";
        position: absolute;
        width: 70px;
        height: 3px;
        background-color: var(--iseek-secondary);
        bottom: 0;
        left: 0;
    }
}

#shop-content {
    .section-heading {
        font-size: 38px !important;
    }

    .shop-content-item {
        // border: 1px solid #E3E3E3;
        border-radius: 5px;
        text-align: center;
        padding: 30px;

        img {
            height: 100px;
        }

        h4 {
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: 700;
        }
    }
}
</style>