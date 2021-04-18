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
                    <td>商品名稱/數量</td>
                    <td>小計</td>
                </tr>
                <tr class="product-item" v-for="(item, index) in products" :key="index">
                    <td>
                        <div>{{ item.name }}</div>
                    </td>
                    <td>
                        <div>{{ item.price * item.count }}</div>
                    </td>
                </tr>
                <tr class="transport" v-if="productInfo.optionsIndex">
                    <td>{{ options[productInfo.optionsIndex].name }}</td>
                    <td>{{ options[productInfo.optionsIndex].price }}</td>
                </tr>
                <tr>
                    <td colspan="4" v-if="productInfo">NT.{{ productInfo.total }}</td>
                </tr>
            </tbody>
        </table>
        <div class="payment-wrap">
            <div class="payment">
                <div class="payment-head">
                    <h2>付款資訊<small>PAYMENT</small></h2>
                    <div class="pay-method-wrap">
                        <div
                            :class="[
                                paymentCurrent == item.id ? 'pay-method-focus' : '',
                                'pay-method',
                            ]"
                            v-for="item in paymentSelect"
                            :key="item.id"
                            @click="SelectHandler(item.id)"
                        >
                            <img
                                :src="item.source"
                                alt="icon-ssl"
                                :class="[paymentCurrent == item.id ? 'img-focus' : '']"
                            />
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                </div>
                <div class="payment-body">
                    <div class="pay-credit" v-if="paymentCurrent === 1">
                        <div class="input-wrap">
                            <label>卡號</label>
                            <input
                                type="text"
                                maxlength="4"
                                v-model.trim="orderInfo.credit.card[0]"
                                @keyup="
                                    checkCard(orderInfo.credit.card[0]);
                                    changeCard($event);
                                "
                            />
                            <input
                                type="text"
                                maxlength="4"
                                v-model.trim="orderInfo.credit.card[1]"
                                @keyup="
                                    checkCard(orderInfo.credit.card[1]);
                                    changeCard($event);
                                "
                            />
                            <input
                                type="text"
                                maxlength="4"
                                v-model.trim="orderInfo.credit.card[2]"
                                @keyup="
                                    checkCard(orderInfo.credit.card[2]);
                                    changeCard($event);
                                "
                            />
                            <input
                                type="text"
                                maxlength="4"
                                v-model.trim="orderInfo.credit.card[3]"
                                @keyup="
                                    checkCard(orderInfo.credit.card[3]);
                                    changeCard($event);
                                "
                            />
                            <div class="alert" v-if="!this.checks.credit.card">
                                <i class="fas fa-exclamation-triangle"></i>請填妥卡號
                            </div>
                        </div>
                        <div class="input-wrap">
                            <label for="card-name">持卡人</label>
                            <input
                                type="text"
                                id="card-name"
                                v-model.trim="orderInfo.credit.cardName"
                                @keyup="checkName(orderInfo.credit.cardName)"
                            />
                            <div
                                class="alert"
                                v-if="!this.checks.credit.cardName"
                            >
                                <i class="fas fa-exclamation-triangle"></i>請填妥持卡人
                            </div>
                        </div>
                        <div class="input-wrap">
                            <label for="card-time">卡片效期 (MM/YY)</label>
                            <input
                                type="text"
                                id="card-time"
                                maxlength="2"
                                v-model.trim="orderInfo.credit.cardTime[0]"
                                @keyup="checkCardTime(orderInfo.credit.cardTime[0])"
                            /><small>/</small>
                            <input
                                type="text"
                                maxlength="2"
                                v-model.trim="orderInfo.credit.cardTime[1]"
                                @keyup="checkCardTime(orderInfo.credit.cardTime[1])"
                            />
                            <div
                                class="alert"
                                v-if="!this.checks.credit.cardTime"
                            >
                                <i class="fas fa-exclamation-triangle"></i>請填妥卡片效期
                            </div>
                        </div>
                        <div class="input-wrap">
                            <label for="secure">安全碼</label>
                            <input
                                type="text"
                                maxlength="3"
                                id="secure"
                                v-model.trim="orderInfo.credit.secure"
                                @keyup="checkSecure(orderInfo.credit.secure)"
                            />
                            <div class="alert" v-if="!this.checks.credit.secure">
                                <i class="fas fa-exclamation-triangle"></i>請填妥安全碼
                            </div>
                        </div>
                        <div class="input-wrap">
                            <label for="email">電子信箱</label>
                            <input
                                type="email"
                                id="email"
                                v-model.trim="orderInfo.credit.email"
                                @keyup="checkEmail(orderInfo.credit.email)"
                            />
                            <div class="alert" v-if="!this.checks.credit.email">
                                <i class="fas fa-exclamation-triangle"></i>請填妥信箱
                            </div>
                        </div>
                        <div class="input-wrap">
                            <input
                                type="checkbox"
                                id="savecardinfo"
                                v-model.trim="orderInfo.credit.saveCardInfo"
                            />
                            <label for="savecardinfo">儲存卡片資訊</label>
                        </div>
                        <div class="input-wrap">
                            <input
                                type="checkbox"
                                id="agree"
                                v-model.trim="orderInfo.credit.agree"
                            />
                            <label for="agree"
                                >我同意接受商家名稱服務條款及隱私權政策</label
                            >
                        </div>
                        <div class="ssl">
                            <img src="../assets/img/icon-ssl.svg" alt="icon-ssl" />
                            <p>
                                使用SSL 128 Bit 安全加密機制，保障個人及信用卡資料不外洩
                            </p>
                        </div>
                    </div>
                    <div class="pay-atm" v-if="paymentCurrent === 2">
                        <div class="input-wrap">
                            <label for="order-name">訂購人</label>
                            <input
                                type="text"
                                id="order-name"
                                v-model.trim="orderInfo.atm.orderName"
                                @keyup="checkName(orderInfo.atm.orderName)"
                            />
                            <div class="alert" v-if="!this.checks.atm.orderName">
                                <i class="fas fa-exclamation-triangle"></i>請填妥訂購人
                            </div>
                        </div>
                        <div class="input-wrap">
                            <label for="pay-bank">付款銀行</label>
                            <select id="pay-bank" v-model="orderInfo.atm.bank.selected">
                                <option
                                    v-for="(item, index) in orderInfo.atm.bank.option"
                                    :key="index"
                                    >{{ item }}</option
                                >
                            </select>
                        </div>
                        <div class="input-wrap">
                            <label for="email2">電子信箱</label>
                            <input
                                type="text"
                                id="email2"
                                v-model.trim="orderInfo.atm.email"
                                @keyup="checkEmail(orderInfo.atm.email)"
                            />
                            <div class="alert" v-if="!this.checks.atm.email">
                                <i class="fas fa-exclamation-triangle"></i>請填妥信箱
                            </div>
                        </div>
                        <div class="input-wrap">
                            <input
                                type="checkbox"
                                id="checkmail"
                                v-model.trim="orderInfo.atm.agree"
                            />
                            <label for="checkmail"
                                >請再次確認「訂購人」與「付款銀行」，付款完成後將發送通知信至您的
                                E-mail 信箱</label
                            >
                        </div>
                    </div>
                    <div class="pay-shop" v-if="paymentCurrent === 3">
                        <div class="input-wrap">
                            <label for="order-name">訂購人</label>
                            <input
                                type="text"
                                id="order-name"
                                v-model.trim="orderInfo.shop.orderName"
                                @keyup="checkName(orderInfo.shop.orderName)"
                            />
                            <div
                                class="alert"
                                v-if="!this.checks.shop.orderName"
                            >
                                <i class="fas fa-exclamation-triangle"></i>請填妥訂購人
                            </div>
                        </div>
                        <div class="input-wrap">
                            <label for="select-shop">選擇超商</label>
                            <select
                                id="select-shop"
                                v-model="orderInfo.shop.payShop.selected"
                            >
                                <option
                                    v-for="(item, index) in orderInfo.shop.payShop.option"
                                    :key="index"
                                    >{{ item }}</option
                                >
                            </select>
                        </div>
                        <div class="input-wrap">
                            <label for="email2">電子信箱</label>
                            <input
                                type="text"
                                id="email2"
                                v-model.trim="orderInfo.shop.email"
                                @keyup="checkEmail(orderInfo.shop.email)"
                            />
                            <div class="alert" v-if="!this.checks.shop.email">
                                <i class="fas fa-exclamation-triangle"></i>請填妥信箱
                            </div>
                        </div>
                        <div class="input-wrap">
                            <input
                                type="checkbox"
                                id="checkmail2"
                                v-model.trim="orderInfo.shop.agree"
                            />
                            <label for="checkmail2"
                                >請再次確認「訂購人」與「付款超商」，付款完成後將發送通知信至您的
                                E-mail 信箱</label
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="prev-btn">
                    <button class="prev-button" @click="prevPage">上一步</button>
                </div>
                <div class="next-btn">
                    <button class="next-button" @click="nextPage">下一步</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "payment",
    props: ["products", "options", "productInfo"],
    data() {
        return {
            paymentCurrent: 1,
            paymentSelect: [
                {
                    name: "信用卡轉帳",
                    source: require("../assets/img/icon-credit-card.svg"),
                    id: 1,
                },
                {
                    name: "ATM轉帳",
                    source: require("../assets/img/icon-atm.svg"),
                    id: 2,
                },
                {
                    name: "超商付款",
                    source: require("../assets/img/icon-shop.svg"),
                    id: 3,
                },
            ],
            orderInfo: {
                credit: {
                    card: ["0000", "1111", "2222", "3333"],
                    cardName: "test",
                    cardTime: ["01", "23"],
                    secure: "123",
                    email: "test@gmail.com",
                    saveCardInfo: false,
                    agree: true,
                },
                atm: {
                    orderName: "test",
                    bank: {
                        option: [
                            "玉山銀行",
                            "台北富邦",
                            "國泰世華",
                            "花旗銀行",
                            "中國信託",
                        ],
                        selected: "玉山銀行",
                    },
                    email: "test@gmail.com",
                    agree: false,
                },
                shop: {
                    orderName: "test",
                    payShop: {
                        option: ["7-11", "全家"],
                        selected: "7-11",
                    },
                    email: "test@gmail.com",
                    agree: false,
                },
            },
            checks: {
                credit: {
                    card: true,
                    cardName: true,
                    cardTime: true,
                    secure: true,
                    email: true,
                },
                atm: {
                    orderName: true,
                    email: true,
                },
                shop: {
                    orderName: true,
                    email: true,
                },
            },
        };
    },
    methods: {
        prevPage() {
            this.$router.replace({ path: "/orderinfo" });
        },
        nextPage() {
            let checkCredit = this.checks.credit;
            let checkAtm = this.checks.atm;
            let checkShop = this.checks.shop;
            if (this.paymentCurrent === 1) {
                if (
                    !checkCredit.card ||
                    !checkCredit.cardName ||
                    !checkCredit.cardTime ||
                    !checkCredit.secure ||
                    !checkCredit.email
                )
                    return;
                if (!this.orderInfo.credit.agree)
                    return alert("請同意接受商家名稱服務條款及隱私權政策");
                let order = {
                    orderName: this.orderInfo.credit.cardName,
                    paySelect: "信用卡轉帳",
                    pay: this.orderInfo.credit.card,
                    email: this.orderInfo.credit.email,
                };
                this.$emit("getOrderInfo", order);
            } else if (this.paymentCurrent === 2) {
                if (!checkAtm.orderName || !checkAtm.email) return;
                if (!this.orderInfo.atm.agree)
                    return alert(
                        "請再次確認「訂購人」與「付款銀行」，付款完成後將發送通知信至您的 E-mail 信箱"
                    );
                let order = {
                    orderName: this.orderInfo.atm.orderName,
                    paySelect: "ATM轉帳",
                    pay: this.orderInfo.atm.bank.selected,
                    email: this.orderInfo.atm.email,
                };
                this.$emit("getOrderInfo", order);
            } else if (this.paymentCurrent === 3) {
                if (!checkShop.orderName || !checkShop.email) return;
                if (!this.orderInfo.shop.agree)
                    return alert(
                        "請再次確認「訂購人」與「付款超商」，付款完成後將發送通知信至您的 E-mail 信箱"
                    );
                let order = {
                    orderName: this.orderInfo.shop.orderName,
                    paySelect: "超商付款",
                    pay: this.orderInfo.shop.payShop.selected,
                    email: this.orderInfo.shop.email,
                };
                this.$emit("getOrderInfo", order);
            }
            this.$router.replace({ path: "/complete" });
        },
        SelectHandler(id) {
            this.paymentCurrent = id;
        },
        checkCard(card) {
            let reg = /^[A-Za-z0-9]+$/;
            if (reg.test(card) && card.length === 4) {
                this.checks.credit.card = true;
            } else {
                this.checks.credit.card = false;
            }
        },
        checkName(cardName) {
            let reg = /^[\u4e00-\u9fa5a-zA-Z\S]/;
            if (reg.test(cardName)) {
                if (this.paymentCurrent === 1) this.checks.credit.cardName = true;
                if (this.paymentCurrent === 2) this.checks.atm.orderName = true;
                if (this.paymentCurrent === 3) this.checks.shop.orderName = true;
            } else {
                if (this.paymentCurrent === 1) this.checks.credit.cardName = false;
                if (this.paymentCurrent === 2) this.checks.atm.orderName = false;
                if (this.paymentCurrent === 3) this.checks.shop.orderName = false;
            }
        },
        checkCardTime(time) {
            let reg = /^[\d^\d\s]{2,}\S*$/;
            if (reg.test(time)) {
                this.checks.credit.cardTime = true;
            } else {
                this.checks.credit.cardTime = false;
            }
        },
        checkSecure(secure) {
            let reg = /^[\d^\d]{3,}\S*$/;
            if (reg.test(secure)) {
                this.checks.credit.secure = true;
            } else {
                this.checks.credit.secure = false;
            }
        },
        checkEmail(email) {
            let reg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})\S*$/;
            if (reg.test(email)) {
                if (this.paymentCurrent === 1) this.checks.credit.email = true;
                if (this.paymentCurrent === 2) this.checks.atm.email = true;
                if (this.paymentCurrent === 3) this.checks.shop.email = true;
            } else {
                if (this.paymentCurrent === 1) this.checks.credit.email = false;
                if (this.paymentCurrent === 2) this.checks.atm.email = false;
                if (this.paymentCurrent === 3) this.checks.shop.email = false;
            }
        },
        changeCard(e) {
            if (this.orderInfo.credit.card[3].length == 4) return;
            if (e.target.value.length >= 4) {
                e.target.nextSibling.focus();
            }
        },
    },
};
</script>

<style scoped>
@import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";

section {
    width: 100%;
    padding: 50px 0;
    display: flex;
    justify-content: center;
}

.order {
    width: 320px;
    margin: 0 30px;
    color: rgba(1, 40, 49);
    box-shadow: 3px 3px 20px 0px rgba(161, 157, 157, 0.5);
}
.order thead {
    padding: 10px;
}
.order thead p {
    margin: 0;
    text-align: left;
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 1.2;
}
.order thead p:last-child {
    font-size: 1rem;
    color: #aaa;
}
.order tbody {
    padding: 0 15px 15px;
    text-align: left;
}
.order tr {
    width: 100%;
    display: flex;
}
.order td {
    padding: 15px;
    text-align: center;
    font-size: 20px;
    width: 100px;
}
.product-title td {
    color: rgba(1, 40, 49);
    font-weight: bold;
}
.order tr td:first-child {
    width: 100%;
    text-align: left;
}
tbody:last-child tr:last-child {
    border-top: 1px solid rgba(170, 170, 170, 0.5);
}
tbody:last-child tr:last-child td {
    text-align: right;
}
.payment {
    width: 900px;
    padding: 15px;
    box-shadow: 3px 3px 20px 0px rgba(161, 157, 157, 0.5);
}
.payment img {
    max-width: 100%;
    width: 100%;
}

.payment-head {
    display: flex;
    justify-content: space-between;
}
.payment-head h2 {
    width: 120px;
}
.pay-method-wrap {
    display: flex;
}
.pay-method {
    width: 140px;
    background-color: #ccc;
    margin: 0 15px 15px;
    color: #333;
    cursor: pointer;
    font-size: 18px;
    border-radius: 10px;
    padding: 15px;
}
.pay-method.pay-method-focus {
    background-color: rgba(1, 40, 49);
    color: #fff;
}
.pay-method img {
    width: 60px;
}
.pay-method img.img-focus {
    filter: invert(1);
}
.pay-method p {
    margin: 10px 0 0;
}
.pay-credit {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    font-size: 18px;
    color: #666;
}
.pay-credit label {
    margin-right: 30px;
    line-height: 33px;
}
.pay-credit input {
    border: none;
    background-color: #eee;
    padding: 5px 10px;
    font-size: 20px;
    width: 30px;
    margin-bottom: 20px;
}
.pay-credit input:focus {
    outline: none;
}
.input-wrap {
    display: flex;
}
.alert {
    color: rgb(153, 15, 15);
    position: relative;
    top: 10px;
    left: 10px;
}
#card-time + small {
    font-size: 20px;
    margin: 0 10px;
    line-height: 33px;
}
.pay-credit .input-wrap:nth-child(1) input {
    width: 65px;
    margin-right: 10px;
}
.pay-credit .input-wrap:nth-child(4) input {
    width: 35px;
}
.pay-credit .input-wrap:nth-child(2) input,
.pay-credit .input-wrap:nth-child(5) input {
    width: 200px;
}
.pay-credit .input-wrap:nth-child(5) input {
    margin-bottom: 50px;
}
.pay-credit .input-wrap:nth-child(6) input,
.pay-credit .input-wrap:nth-child(7) input {
    width: 20px;
    height: 20px;
    margin-right: 15px;
}
.pay-credit .input-wrap:nth-child(6) input:checked,
.pay-credit .input-wrap:nth-child(7) input:checked {
    background-color: rgba(1, 40, 49);
    color: rgba(1, 40, 49);
}
.pay-credit .input-wrap:nth-child(6) label,
.pay-credit .input-wrap:nth-child(7) label {
    color: #666;
    line-height: 20px;
}
.pay-credit .ssl {
    margin-top: 30px;
    display: flex;
}
.pay-credit .ssl img {
    width: 30px;
    margin-right: 15px;
}
.container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 30px;
}
.prev-button,
.next-button {
    border: none;
    background-color: rgba(1, 40, 49);
    color: #fff;
    cursor: pointer;
    padding: 10px 15px;
    font-size: 18px;
}
.prev-button {
    color: rgba(1, 40, 49);
    background-color: #fff;
    transition: 0.3s ease-in-out;
}
.next-button {
    background-color: rgba(1, 40, 49);
    color: #fff;
    transition: 0.3s ease-in-out;
}
.prev-button:hover {
    color: #fff;
    background-color: #777;
    box-shadow: 2px 2px 1px 1px rgb(73, 68, 68);
}
.next-button:hover {
    color: #fff;
    background-color: #777;
    box-shadow: 2px 2px 1px 1px rgb(73, 68, 68);
}
.next-button:focus,
.prev-button:focus {
    outline: none;
    transform: translate(2px, 2px);
    box-shadow: none;
}
.pay-atm,
.pay-shop {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    font-size: 18px;
    color: #666;
}
.pay-atm .input-wrap,
.pay-shop .input-wrap {
    margin-bottom: 20px;
}
.pay-atm label,
.pay-shop label {
    margin-right: 15px;
    line-height: 33px;
}
.pay-atm input,
.pay-shop input {
    border: none;
    background-color: #eee;
    padding: 5px 10px;
    font-size: 20px;
    width: 30px;
    width: 200px;
}
.pay-atm .input-wrap:nth-child(4) input,
.pay-shop .input-wrap:nth-child(4) input {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    cursor: pointer;
}
.pay-atm .input-wrap:nth-child(4) label,
.pay-shop .input-wrap:nth-child(4) label {
    color: #666;
    line-height: 20px;
}
</style>
