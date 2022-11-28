const app = Vue.createApp({
  data: () => ({
    newId: "", //名前入力欄
    ids: [], //名前格納
  }),
  methods: {
    cookiesGet: function (event) {
      //cookie取得
      if ($cookies.isKey("ids")) this.ids = JSON.parse($cookies.get("ids")); //名前
    },
    cookiesSet: function (event) {
      //cookie代入
      $cookies.config(60 * 60 * 24 * 30, ""); //cookie設定
      $cookies.set("ids", JSON.stringify(this.ids)); //書き込み
    },
    addId: function (event) {
      //console.log('Clicked!');
      if (
        this.newId === "" ||
        !/^[0-9a-zA-Z_]{1,15}$/.test(this.newId) ||
        this.ids.includes(this.newId)
      ) {
        this.newId = "";
        return; //名前が空欄あるいは正規表現不一致になっていたら処理を中断する
      }
      this.ids.push(this.newId); // 代入
      this.cookiesSet(); //cookie代入
      this.newId = ""; // 同上
      window.location.reload();
    },
    deleteId: function (index) {
      this.ids.splice(index, 1); //indexの位置から1つ名前を削除
      this.cookiesSet(); //cookie代入
    },
  },
  mounted() {
    window.onload = () => {
      //アクセスされた時に実行
      $cookies.config("30d"); //cookie設定
      this.cookiesGet();
    };
  },
});
app.mount("#app");
