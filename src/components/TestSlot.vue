<template>
    <div>
        <p>this is slot test!</p>
        <!--如果引用该组件的父组件的子组件标签内不包含内容则会被后备内容取代-->
        <slot>后备内容</slot>
    </div>
</template>

<script>
export default {
    data: function(){
        return {

        }
    }
}
</script>

<style scoped>

</style>

