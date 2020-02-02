<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./lib/vue.js"></script>
    <link rel="stylesheet" href="./lib/bootstrap-3.3.7.css">
</head>
<body>
    <div id="app">
        <div class="panel panel-primary">
            <div class="panel-heading">
               <h3 class="panel-title">添加品牌</h3>
            </div>
            <div class="panel-body form-inline">
                <label>
                    Id:
                    <input type="text" class="form-control" v-model="id">
                </label>

                <label>
                    Name:
                    <input type="text" class="form-control" v-model="name" @keyup.13="add">
                </label>
                

                <label>
                    <input type="button" value="添加" class="btn btn-primary" @click="add()">
                </label>
                <label>
                    搜索名称关键字:
                    <input type="text" class="form-control" v-model="keyword" id="search" v-focus v-color> 
                </label>
                
            </div>
        </div>
        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Ctime</th>
                    <th>Operation</th>
                </tr>
                <tr v-for="item in search(keyword)" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.ctime | dateFormat('')}}</td>
                    <td>
                        <a href="" @click.prevent="del(item.id)">删除</a>
                    </td>   
                </tr>
            </thead>
        </table>

    </div>
    
    <script>
        //时间过滤器
        Vue.filter('dateFormat',function(date,pattern = ""){
             var dt = new Date(date)
             var y = dt.getFullYear()
             var m = (dt.getMonth()+1).toString().padStart(2,'0')
             var d = dt.getDate().toString().padStart(2,'0')
             

             if(pattern.toLowerCase() === 'yyyy-mm-dd'){
                 return `${y}-${m}-${d}`
             }else{
                 var hh = dt.getHours().toString().padStart(2,'0')
                 var mm = dt.getMinutes().toString().padStart(2,'0')
                 var ss = dt.getSeconds().toString().padStart(2,'0')
                 return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
             }
        })
        Vue.directive('focus',{
            inserted:function (el) {
                el.focus()
              }
        })
        Vue.directive('color',{
            bind:function(el){
                el.style.color = 'red'
            }
        })

        var vm = new Vue({
            el:"#app",
            data:{
              id : '',
              name:'',
              keyword:'',
              
              list:[
                  {id:1 , name:'奔驰' ,ctime:new Date() },
                  {id:2 , name:'宝马' ,ctime:new Date() },
                  {id:3 , name:'捷豹' ,ctime:new Date() },
              ]
            },
            methods:{
                add(){
                    var car = {id : this.id , name : this.name , ctime : new Date() }
                    this.list.push(car) 
                    this.id = ''
                    this.name = ''
                },
                del(id){
                  /* this.list.some((item,i)=>{
                      if(item.id == id){
                          this.list.splice(i,1)
                            return true;
                      }
                  }) */
                  /* 回调函数 */
                 var index = this.list.findIndex(item=>{
                    if(item.id == id){
                         return true;
                    }
                  })
                  this.list.splice(index,1)
                },
              /*   search(keyword){
                    var newList = []
                  this.list.forEach(item => {
                      if(item.name.indexOf(keyword) !=-1){
                          newList.push(item)
                      }
                  })
                  return newList;  
                }, */
                search(keyword){
                    return this.list.filter(item =>{
                       if(item.name.includes(keyword)){
                           return item;
                       }
                    })
                }
                
            }
        });
        
    </script>

    
    <style>
    
    </style>
</body>
</html>
