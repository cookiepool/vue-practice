<template>
  <div class="all-wraper">
    <h3>普通base64</h3>
    <p>{{ base64_ordinary }}</p>
    <h3>aes加密</h3>
    <p>{{ aes_encrypt }}</p>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';

import Crypto from '../utils/crypto_util.js';

export default {
  data() {
    return {
      base64_ordinary: '',
      aes_encrypt: ''
    }
  },
  mounted() {
    let str = {
      name: 'lee',
      age: 25
    };
    this.aes_encrypt = Crypto.encrypt_aes(str);

    console.log(JSON.parse(Crypto.decrypt_aes(this.aes_encrypt)));
  },
  methods: {

  }
}
</script>

<style scoped>

</style>