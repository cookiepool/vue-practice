<template>
    <div class="all-wraper">
        <test-slot @click="handleClick" style="background-color: #e0e0e0">
            <!-- <p>插槽分发的内容</p> -->
            {{soltTest}}
        </test-slot>
        <ul>
            <li>
                <h2>具名插槽</h2>
                <name-slot>
                    <template v-slot:header>
                        <p>this is header!</p>
                    </template>
                    <template v-slot:default>
                        <p>this is main content!</p>
                    </template>
                    <template v-slot:footer>
                        <p>this is footer!</p>
                    </template>
                </name-slot>
            </li>
            <li>
                <h2>作用域插槽</h2>
                <scope-slot v-slot:default="mySlotProps"> <!-- mySlotProps是从子组件scope-slot传递过来的值-->
                    {{ mySlotProps.user.lastName }}
                </scope-slot>
            </li>
        </ul>
        </div>
</template>

<script>
import TestSlot from '../components/TestSlot.vue';
import NameSlot from '../components/NameSlot.vue';
import ScopeSlot from '../components/ScopeSlot.vue'

export default {
    name: 'soltpage',
    data() {
        return {
            soltTest: 'Hello, Solt',
        }
    },
    components: {
        'test-slot': TestSlot,
        'name-slot': NameSlot,
        'scope-slot': ScopeSlot
    },
    methods: {
        handleClick() {
            console.log('组件上绑定事件');
        }
    }
}
</script>

<style scoped>

</style>