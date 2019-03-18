<template>
    <div class="help_common">
        <div class="common_bac_color"></div>
        <app-header :title="title"></app-header>
        <div class="help_common_desc" v-html="content">
            {{content}}
        </div>
    </div>


</template>

<script>
    export default {
        name: "help_common",
        data(){
            return {
                title: '',
                content:'',
            }
        },
        mounted(){
            this.title = this.$route.query.title;
            this.content = this.$route.query.content;
        }
    }
</script>

<style scoped>
    .help_common_desc{padding: 20px 16px;box-sizing: border-box;text-indent: 2em;background-color: #fff;line-height: 20px;}

</style>