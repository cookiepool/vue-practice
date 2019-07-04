<template>
    <div>
        <slot v-bind:user="user">{{ user.firstName }}</slot>
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
