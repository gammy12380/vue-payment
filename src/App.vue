<template>
    <div id="app">
        <Progress :CurrentRoute="CurrentRoute"/>
        <div class="content">
            <div class="wrap">
                <router-view
                    :products="products"
                    :options="options"
                    :productInfo="productInfo"
                    :orderInfo="orderInfo"
                    @getProductInfo="getProductInfo"
                    @getOrderInfo="getOrderInfo"
                >
                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Progress from "@/components/Progress.vue";

export default {
    data() {
        return {
            products: [
                {
                    name: "破損的電風扇",
                    price: 200,
                    count: 5,
                },
                {
                    name: "殘缺的電風扇",
                    price: 300,
                    count: 3,
                },
                {
                    name: "普通的電風扇",
                    price: 800,
                    count: 1,
                },
                {
                    name: "高級的電風扇",
                    price: 1600,
                    count: 1,
                },
            ],
            options: [
                {
                    name: "宅配到家",
                    price: 120,
                },
                {
                    name: "自行取貨",
                    price: 0,
                },
                {
                    name: "超商取貨",
                    price: 60,
                },
            ],
            productInfo: {
                optionsIndex: null,
                total: 0,
            },
            orderInfo: [],
            routerIndex:{
                payment:false,
                complete:false,
            },
            CurrentRoute:'orderinfo',
        };
    },
    components: {
        Progress,
    },
    methods: {
        getProductInfo(product) {
            this.productInfo.total = product.total;
            this.productInfo.optionsIndex = product.optionsIndex;
        },
        getOrderInfo(order) {
            this.orderInfo = order;
        },
    },
    mounted(){
        if(!this.routerIndex.payment || !this.routerIndex.complete || !this.routerIndex.orderinfo){
            this.$router.replace({path:'/orderinfo'}).catch(()=>{})
        }
    },
    watch:{
        $route(to){
            this.CurrentRoute = to.name
        }
    }
};
</script>

<style>
@import "../node_modules/normalize.css/normalize.css";
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
