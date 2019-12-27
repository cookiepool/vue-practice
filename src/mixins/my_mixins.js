export default {
  created() {
    this.printMsg();
  },
  methods: {
    printMsg() {
      console.log('Hello, Vue mixins');
    }
  }
}