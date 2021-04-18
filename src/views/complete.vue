<template>
    <section>
        <div class="order-complete-wrap">
            <div class="order-complete">
                <div class="order-head">
                    <div class="order-icon">
                        <img src="../assets/img/checked.svg" alt="check">
                    </div>
                    <h2>付款完成</h2>
                    <p>ORDER COMPLETE</p>
                    <small>我們將寄送完整的訂購明細至您的 Email</small>
                </div>
                <div class="order-body" v-if="orderInfo.pay&&productInfo.optionsIndex">
                    <div class="order-info-wrap">
                        <div class="order-info">訂購人</div>
                        <p>{{ orderInfo.orderName }}</p>
                    </div>
                    <div class="order-info-wrap">
                        <div class="order-info">付款方式</div>
                        <p>{{ orderInfo.paySelect }}</p>
                    </div>
                    <div class="order-info-wrap">
                        <div class="order-info">{{ orderInfo.paySelect == 'ATM轉帳' ? '付款銀行' : orderInfo.paySelect == '超商付款' ? '付款超商' : orderInfo.paySelect }}</div>
                        <p>{{ orderInfo.paySelect == '信用卡轉帳' ? orderInfo.pay.join('').toString() : orderInfo.pay.toString() }}</p>
                    </div>
                    <div class="order-info-wrap">
                        <div class="order-info">電子信箱</div>
                        <p>{{ orderInfo.email }}</p>
                    </div>
                    <div class="order-info-wrap">
                        <div class="order-info">運送方式</div>
                        <p>{{ options[productInfo.optionsIndex].name }}</p>
                    </div>
                    <div class="order-info-wrap">
                        <div class="order-info">實付金額</div>
                        <p>{{ productInfo.total }}</p>
                    </div>
                </div>
            </div>
            <div class="complete-btn">
                <button class="complete-button" @click="backOrderInfo">完成</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name:'complete',
    props:['products','options','productInfo','orderInfo'],
    methods: {
        backOrderInfo(e){
            e.preventDefault();
            this.$router.replace({path: '/orderinfo'})
        }
    },
}
</script>

<style scoped>
section{
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.order-complete{
    width: 1200px;
    box-shadow: 3px 3px 20px 0px rgba(161, 157, 157, 0.5);
}
.order-head{
    padding:15px 30px 30px 100px;
    text-align: left;
    position: relative;
}
.order-icon{
    width: 40px;
    height: 40px;
    position: absolute;
    left: 30px;
    top: 25px;
}
.order-icon img{
    min-width: 100%;
    width: 100%;
    filter:contrast(70%);
}
.order-head h2{
    margin: 0;
    font-weight: 600;
    font-size: 2rem;
}
.order-head p{
    margin: 0 0 30px 0;
    font-size: 24px;
    color: #777;
}
.order-head small{
    color: #777;
    font-size: 18px;
}
.order-body{

    display: flex;
    flex-direction: column;
    align-items: center;
}
.order-info-wrap{
    display: flex;
    margin-bottom: 30px;
}
.order-info-wrap p{
    margin: 0;
    width: 150px;
    text-align: left;
    font-size: 18px;
}
.order-info{
    width: 150px;
    font-weight: bold;
    margin-right: 30px;
    text-align: left;
    font-size: 18px;
}
.complete-btn{
    width: 100%;
    text-align: right;
    margin-top: 50px;
}
.complete-btn button{
    background-color:rgba(1, 40, 49) ;
    color: #fff;
    transition: .3s ease-in-out;
    padding: 10px 15px;
    font-size: 18px;
    cursor: pointer;
    border: none;
}
.complete-btn button:hover{
    background-color: #aaa;
    box-shadow: 2px 2px 1px 1px rgb(73, 68, 68);
}
.complete-btn button:focus{
    outline: none;
    transform: translate(2px, 2px);
    box-shadow: none;
}
</style>