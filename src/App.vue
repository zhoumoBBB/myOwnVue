<template>
<div>
<input type="text" v-model="msg" @click="tellYou"></input>
{{msg}}<br/>
{{arr}}<br/>
{{json}}<br/>
<ul>
  <li v-for="(item,$index,$key) in json">
    {{item}}{{$index}}{{$key}}
  </li>
</ul>
<div class="hide" v-show='showDiv'>
  
</div>
<hr>
<div class="container"> 
  <label for="username">用户名</label>
  <input id="username" type="text" placeholder="输入用户名" v-model="name"></input>
  <label for="age">年龄</label>
  <input id="age" type="text" placeholder="输入年龄" v-model="age"></input>
  <br/>
  <input type="button" value="添加" @click="add"></input>
  <input type="button" value="重置"></input>
  <br/>
  <div class="result">
<table>
  <caption>用户信息</caption>
  <tr>
    <td>序号</td>
    <td>姓名</td>
    <td>年龄</td>
    <td><button>删除</button></td>
  </tr>
    <tr v-for="(item,$index,$key) in userData">
    <td>{{$index+1}}</td>
    <td>{{item.name}}</td>
    <td>{{item.age}}</td>
    <td><button @click="remove($index)">删除</button></td>
  </tr>
  <tr v-show="userData.length!=0">
    <td colspan="4" @click="removeALL"><button>全部删除</button></td>
  </tr>
  <tr v-show="userData.length===0">
    <td colspan="4">暂无数据</td>
  </tr>
</table>
  </div>
</div>
<hr>
<h1>事件对象</h1>
<div>
<div @click="show2($event)">
    <input type="button" @click="show($event)"></input>
</div>
</div>
<div>
  阻止浏览器默认行为
  <a href="https://zhidao.baidu.com/" @click.prevent="show">点我去百度</a>
</div>
<div>
  键盘事件
  <input type="text" @keyup.13="keyshow($event)" class="jianpan"></input>
</div>
<div>
  绑定属性
  <img :src="imgUrl">
</div>
<div>
  绑定class
  <div :class="red">sss</div>
</div>
<div>
  绑定一次数据*
  <input type="text" v-html="msg"></input>
  <br/>
  {{msg}}
  {{msg}}
</div>
<div>
  vue-resource获取后台数据
  <input type="button" value="获取" @click='get()'></input>
</div>
<div>
  track by
  <input type="button" @click="addfruit"></input>
  <ul>
    <li v-for="(val,$index) in fruits" :key="$index">
      {{val}}
    </li>
  </ul>
</div>
<div>
  百度搜索
  <input type="text" @keyup="showList" v-model="searchCont"></input>
  <ul>
    <li v-for="val in list">
      {{val}}
    </li>
  </ul>
</div>
<div>
  自定义过滤器
  {{a|todate}}
</div>
<div v-drag :style="{width:'100px',height:'100px',position:'absolute',bottom:'-1000px',right:'100px',background:'red'}">
  自定义指令
  {{a}}
</div>
<div>
  watch
  {{b}}
  <button @click="showWatch">改变b</button>
</div> 
<div>
  过渡
  <transition enter-active-class="animated slideInUp" leave-active-class="animated zoomOutRight"><div class="move" v-show="showDiv"></div></transition>
  <input type="button" value="移动" @click="moveDiv"></input>
</div>
<div>
  组件切换
  <input type="button" @click="ab='aaa'" value="a组件"></input>
  <input type="button" @click="ab='bbb'" value="b组件"></input>
  <component :is="ab"></component>
<br/>
  <template id="aaa">
    <span>aaa组件</span>
    <bbb @child-msg="get"></bbb>
  </template>
  <template id="bbb">
    <span>bbb组件</span>
        <input type="button" @click="send">send</input>
  </template>
  <aaa>
  </aaa>

</div>
</div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
.hide
  width 100px
  height 100px
  background red
.container
  width 1000px
  height 500px
  background: linear-gradient(#84fab0,#8fd3f4)
.red
  color red
.move
  background red
  width 100px
  height 100px
  margin 0 auto
</style>
<script>
import Vue from 'vue'

Vue.filter('todate',function(input){
var oDate=new Date(input);
return oDate.getFullYear()+'-'+oDate.getMonth()+'-'+oDate.getDate()+' '+oDate.getHours()+':'+oDate.getMinutes()+':'+oDate.getSeconds()
});
export default{
  data(){
    return{
      msg:'hello world',
      arr:['1','2','3'],
      json:{'a':'apple','b':'c','popo':'cpcp'},
      showDiv:'true',
      userData:[],
      name:'',
      age:'',
      nowIndex:'',
      imgUrl:'../static/img/53fdb48c9381e8750.jpg',
      red:'red',
      fruits:['apple','banana','peach'],
      searchCont:'',
      list:'',
      a:Date.now(),
      b:{num:'1234',age:'123'},
      ab:'aaa'
    }
  },
  methods:{
    tellYou(){
      this.arr.push("sss");
      this.showDiv=!this.showDiv;
      $(".hide").css("background","black")
    },
    add(){
      this.userData.push({name:this.name,age:this.age});
      this.name='';
      this.age='';
    },
    remove(n){
      this.nowIndex=n;
      this.userData.splice(this.nowIndex,1)
    },
    removeALL(){
      this.userData=''
    },
    show(ev){
      alert(ev.clientX+'~~~'+ev.clientY);
      ev.cancelBubble=true;
    },
    show2(){
      alert("222")
    },
    keyshow(ev){
      alert("我是键盘事件"+ev.keyCode)
    },
    get(){
      this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&json=1&p=3&sid=22603_1426_19035_21115_17001_22074&req=2&csor=1',{
        jsonp:'cb'
      }).then(function(res){
        console.log(res.body)
      },function(){
        alert("失败");
      })
    },
    addfruit(){
      this.fruits.push('tomato')
    },
    showList(){
      console.log(this.searchCont);
      let sccont=this.searchCont.toString();
      let url='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+sccont+'&json=1&p=3&sid=22603_1426_19035_21115_17001_22074&req=2&csor=1';
      this.$http.jsonp(url,{
        jsonp:'cb'
      }).then(function(res){
        this.list=res.body.s;
        console.log(this.list)
      },function(){
        alert(对不起,没有搜索到结果)
      })
    },
    showWatch(){
      this.b.num=12
    },
    moveDiv(){
      this.showDiv=!this.showDiv
    }
  },
  directives:{
    drag:function(el){
      var oDiv=el;
      oDiv.onmousedown=function(ev){
        var disX=ev.clientX-oDiv.offsetLeft;
        var disY=ev.clientY-oDiv.offsetTop;
        document.onmousemove=function(ev){
          var l=ev.clientX-disX;
          var t=ev.clientY-disY;
          oDiv.style.left=l+'px';
          oDiv.style.top=t+'px';
          document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
          }
        }
      }
    }
  },
  watch:{
    a:function(){
      console.log("改变了a")
    },
    b:{
      function(){
        console.log("改变了b")
      }
    }
  },
  components:{
    aaa:{
      data(){
        return{
          msgA:'fu组件'
        }
      },
      template:'#aaa',
          methods:{
            get(msg){
              // alert(msg);
              this.msgA=msg;
            }
          },
      bbb:{
        data(){
          return{
            msgB:'zi组件',
            a:"子组件数据"
          }
        },
        template:'#bbb',
        methods:{
          send(){
            this.$emit('child-msg',this.a);
          }
        }
      }
    }
  }

}
</script>