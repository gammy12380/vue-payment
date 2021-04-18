<template>
    <div class="nav">
        <div
            v-for="item in steps"
            :key="item.stepIndex"
            :class="['nav-item', { status: item.stepIndex == getCurrent() }]"
        >
            <div class="nav-icon">{{ item.stepIndex }}</div>
            <p>{{ item.step }}</p>
            <p>{{ item.stepE }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Progress",
    props: ["CurrentRoute"],
    data() {
        return {
            steps: [
                {
                    step: "選擇運送方式",
                    stepE: "SHIPPING",
                    stepIndex: 1,
                },
                {
                    step: "選擇付款方式",
                    stepE: "PAYMENT",
                    stepIndex: 2,
                },
                {
                    step: "付款完成",
                    stepE: "COMPLETE",
                    stepIndex: 3,
                },
            ],
        };
    },
    methods: {
        getCurrent() {
            if (this.CurrentRoute == "orderinfo") return 1;
            if (this.CurrentRoute == "payment") return 2;
            if (this.CurrentRoute == "complete") return 3;
        },
    },
};
</script>

<style scoped>
.nav {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 30px 0;
    background: rgb(226, 226, 226);
}
.nav-item {
    width: 200px;
    margin: 0 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
}
.nav-item .nav-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 15px;
    background-color: rgba(1, 40, 49);
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 24px;
}
.nav-item p {
    color: rgba(1, 40, 49);
    margin: 0;
    line-height: 1.6;
    font-size: 20px;
}
.status {
    opacity: 1;
}
</style>
