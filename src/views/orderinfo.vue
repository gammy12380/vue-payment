<template>
    <section>
        <table class="order">
            <thead>
                <tr>
                    <td colspan="4">
                        <p>訂單資訊</p>
                        <p>ORDER INFORMATION</p>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr class="product-title">
                    <td>商品名稱</td>
                    <td>單價</td>
                    <td>數量</td>
                    <td>金額</td>
                </tr>
                <tr class="product-item" v-for="(item,index) in products" :key="index">
                    <td>
                        <div>{{item.name}}</div>
                    </td>
                    <td>
                        <div>{{item.count}}</div>
                    </td>
                    <td>
                        <div>{{item.price}}</div>
                    </td>
                    <td>
                        <div>{{item.price * item.count}}</div>
                    </td>
                </tr>
                <tr class="transport">
                    <td>運送方式</td>
                    <td>運費</td>
                </tr>
                <tr class="take">
                    <td>
                        <select v-model="selected" @change="getOptionsIndex($event)">
                            <option v-for="(item,index) in options" :key="index" :value="index">{{item.name}}</option>
                        </select>
                    </td>
                    <td>{{ this.optionsIndex != null ||  this.optionsIndex ? `NT.${options[this.optionsIndex].price}` : 'NT.0'}}</td>
                </tr>
                <tr>
                    <td colspan="4">總金額:$.{{totalPrice}}</td>
                </tr>
            </tbody>
        </table>
        <div class="next">
            <button class="next-button" @click="NextPage">下一步</button>
        </div>
    </section>
</template>

<script>
export default {
    name: "orderinfo",
    props:['products','options','productInfo','orderInfo'],
    data(){
        return{
            selected:false,
            optionsIndex:null,    
        }
    },
    methods: {
        NextPage(e) {
            e.preventDefault();
            if(!this.optionsIndex){
                alert('請選擇運送方式')
            }
            else{
                let productInfo = {
                    total:this.getTotalPrice() + this.options[this.optionsIndex].price,
                    optionsIndex:this.optionsIndex, 
                }
                this.$emit('getProductInfo',productInfo)
                this.$router.replace({path:'/payment'}) 
            }           
        },
        getOptionsIndex(e){
            e.preventDefault()
            this.optionsIndex = e.target.value
        },
        getTotalPrice(){
             let totalprice = this.products.reduce((total,current)=>{
                    return total + (current.price * current.count)
                },0)
            return totalprice
        },
    },
    computed: {
        totalPrice(){           
            if(!this.optionsIndex){
                return  `${this.getTotalPrice()}`
            }else{
                return `${this.getTotalPrice() + this.options[this.optionsIndex].price}`
            }
        }
    },
};
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.order {
    width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: 50px;
    color: rgba(1, 40, 49);
    box-shadow: 3px 3px 20px 0px rgba(161, 157, 157, 0.5);
}
.order thead {
    padding: 30px 30px 15px;
}
.order thead p {
    margin: 0;
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.2;
}
.order thead p:last-child {
    font-size: 1.2rem;
    color: #aaa;
}
.order tbody {
    padding: 30px;
    text-align: left;
}
.order tr {
    width: 100%;
    display: flex;
}
.order td {
    margin: 0 15px;
    padding: 15px;
    text-align: center;
    font-size: 20px;
    width: 100px;
}
.product-title {
    background-color: #eee;
}
.order tr td:first-child {
    width: 100%;
    text-align: left;
}
.transport {
    background-color: #eee;
}
.transport td:last-child,
.take td:last-child {
    width: 70px;
    text-align: center;
}
tbody:last-child tr:last-child {
    border-top: 1px solid #aaa;
}
tbody:last-child tr:last-child td {
    text-align: right;
}
.next {
    width: 1200px;
    text-align: right;
    margin-bottom: 50px;
}
.next-button {
    border: none;
    background-color: rgba(1, 40, 49);
    color: #fff;
    padding: 10px 15px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}
.next-button:hover {
    background-color: #aaa;
    box-shadow: 2px 2px 1px 1px rgb(73, 68, 68);
}
.next-button:focus {
    outline: none;
    transform: translate(2px, 2px);
    box-shadow: none;
}

</style>
