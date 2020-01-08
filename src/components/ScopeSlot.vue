<template>
    <div>
        <slot v-bind:user="user"></slot> <!-- v-bind:user="user"将本组件的user变量传递到父组件去 -->
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            user: {
                firstName: 'Lee',
                lastName: 'Haoo'
            }
        }
    }
}
</script>

<style scoped>

</style>
