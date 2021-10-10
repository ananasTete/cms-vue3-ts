### 主页视图

1. 用element-plus搭建main视图布局及结构

2. 用element-plus封装侧边栏组件，
 2.1 从vuex中获取数据展示
 2.2 点击实现侧边栏收缩

3. 根据菜单实现动态添加路由：不同用户不同菜单注册不同的路由
 3.1 给侧边栏的el-menu-item添加点击事件，传入其对象，通过router.push方法控制每个元素跳转到一个路径，路径为该对象中的url属性
 3.2 在项目中定义好所有的组件及其route对象，封装一个根据请求到的菜单中的路径获取对应的route对象数组的函数(/utils/map-menus)
 3.2 由于菜单信息是在vuex的login模块获取的，在这个模块中的给userMenus赋值的方法中调用获取函数并将route数组中每个route对象注册到router中去
 3.4 在main.vue中设置 router-view
 3.5 面包屑

在main.ts中，注意调用setupStore()方法要在注册router之前！因为如果先注册router，注册时会根据当前页面的url进行匹配，但如果当前为动态路由的路径，因为还没有调用setupStore()方法，即没有根据菜单绑定动态路由，所以匹配到的是notFound页面。

 3.5跳转到main时，重定向到userMenus中的第一个路径
 在(/utils/map-menus)中定义一个变量用于保存userMenus中的第一个对象，在映射函数中遍历了userMenus所以可以在遍历时获取到第一个对象。在vue-router的导航守卫中判断如果目标是/main就跳转到第一个对象的路径

4. 封装一个表单组件my-form。可以通过传入props对生成的组件进行配置
 4.1 传入一个对象数组formItem，对象数组中可以有任意个对象，遍历此数组每个对象都生成一个表单。对象中可以定义表单的类型、placeholder等用于配置此表单
 4.2 可以传入labelWidth，控制所有表单label的长度
 4.3 可以传入itemStyle，控制所有表单的样式
 4.4 可以传入colLayout，控制表单的布局
由于需要配置的东西太多，我们可以声明一个包含以上四种类型的接口，新建一个文件新建一个对象声明为此接口类型，把所有的配置都写到这个对象中导出，使用v-bind绑定此对象就可以绑定对象中的所有属性了
 4.5 表单组件与父组件双向绑定数据

 配置对象：user.vue ---> page-search.vue ---> myForm.vue
 其它视图也可以使用page-search.vue做搜索表单，只要给他传入配置对象即可
 表单数据的双向绑定： page-search.vue <---> myForm.vue

5. 封装一个表格展示组件my-table，可以通过传入props对生成的组件进行配置
   
 5.1 请求全部数据进行展示，定义一个vuex模块：
    user.vue分发action --> action调用网络请求方法 --> 返回数据到action,调用mutation将数据保存到该模块的state --> 在user.vue中将配置数据和vuex的数据通过props传递给自定义表格组件
 5.2 表格中有些列的内容不想按默认格式显示，而是修改后的格式，（作用域插槽、动态插槽）
    如：修改状态显示为按钮、修改时间格式
    通过作用域插槽在page-content中获取原内容并进行处理，就可以替代原本的内容了。但有些新格式是通用的，有些是父件专属的，全都定义到page-content显得太过拥挤。可以将通用插槽的内容直接定义到page-content，在page-content再定义插槽，可以在父组件中插入想要的内容
    通用： page-content --> my-table
    专属： 父组件 --> page-content --> my-table
    定义全局属性实现时间格式化（全局属性在任何组件中都可以使用）:
      main.js调用 -> global目录定义函数注册全局属性 -> 全局属性注册两个函数用于utc和时间戳转化 -> 调用utils中的两个函数实现utc和时间戳转化（dayjs）
 5.3 表格显示行号列、表格显示选择框列、表格显示操作列、表格显示footer(由配置对象决定)
 5.4 布局： header(默认两个按钮) -- el-table -- footer(默认分页器)
     可以通过插槽向header、footer部分替换掉默认内容
 5.5 按钮权限管理：page-content中的新建、编辑、删除按钮是否显示由用户的权限决定。
     在vuex的loginModule模块定义state保存该用户权限。封装一个遍历userMenus中每个对象（所有层级的对象），将其权限组成新数组的函数，在loginModule中调用将字符串数组保存到vuex中。
     在page-content中定义布尔类型变量 isCreate、isUpdate、isQuery、isDelete，定义函数判断权限数组中是否有指定权限返回布尔值作为新建、编辑、删除按钮是否显示的依据

6. 搜索框与展示表格逻辑操作
 6.1 page-search定义数据与my-form表单中的数据进行双向绑定，点击清空/搜索按钮
     page-search点击按钮，发送自定义事件 --> user通过ref调用page-content的方法 --> page-content进行网络请求并从vuex中拿到数据
     (1)page-content中本来就有请求全部数据的方法，并且也有vuex中取出数据进行展示的代码，所以这里只需要在父组件中调用方法并传递查询数据即可，会自动显示到表格中
     (2)不仅是user还有其他的父组件也会用到page-search和page-content，也会有重置和搜索按钮功能，所以都要以user等父组件作为中介调用page-content中的请求方法，所以将这些调用操作抽取到hooks中，在每个需要的父组件中调用即可
 6.2 分页器控制表格数据请求
     由于数据请求时传入的数据中可以设置请求多少条数据、从第几条数据开始请求等，可以设置默认值。但可以将my-table中的分页器与数据请求连接起来：在page-content中定义数据与my-table中分页器的配置数据进行双向绑定，将双向绑定的数据配置到网络请求中，这样每次发送请求时就会根据分页器中的配置请求规定的数据。监听双向绑定的数据，修改分页器配置后再次发送网络请求并显示到表格中
 6.3 page-content中的新建、编辑、删除按钮操作
     1. 删除按钮：
        由于需要通过delete请求删除数据，所以需要在network中封装请求的方法。那就需要
        page-content分发action --> vuex调用网络请求的分发 --> netwok定义请求分发
        由于删除数据是根据url(pageName+id)删除，所以分发action时需要将所选中数据的id和本页的pageName传给action,在action中做拼接并传入network的分发
     2. 新建、编辑按钮显示弹出框: 
        page-content发送事件 --> user监听 --> user通过ref调用page-modal中控制弹出框显示隐藏的变量 
        (由于在多个视图都有page-content,每个视图都要通过ref调用page-modal的代码逻辑，所以将其封装到hooks中)
     3. 点击编辑按钮显示弹出框时，弹出框中要显示所编辑的数据，点击新建时不显示数据：
        编辑按钮发送事件传到user时需要传递所选数据对应对象作为参数，在hooks中定义一空对象的ref对象defaultInfo。
        在编辑按钮的事件中将传来的数据对象解构传给defaultInfo,再通过props传给page-modal，并监听defaultInfo。当编辑的对象改变时defaultInfo改变就重新给在page_content中与my-form双向绑定的值赋值，这样编辑时选中对象的信息就会显示到page-modal中了
        新建按钮事件中将defaultInfo赋值为空对象，这样page-modal中就不会显示数据了
     4. users单独的需求：点击新建按钮显示密码表单，点击编辑按钮时不显示密码表单：
        给page-modal的配置对象新增一可选的布尔类型属性isHidden,在page-modal中遍历对象数组时通过v-if="!isHidden"控制每个表单的显示与隐藏，只给password表单设置isHidden属性而其它表单不定义则总会显示，可以在新建按钮事件和编辑按钮事件配置对象中控制配置对象中的password的isHidden来控制显示隐藏。
        但不能将这些操作直接写到新建/编辑的hooks中，由于只有users视图会有这样的操作所以只能定义到users.vue中，定义两个改变isHidden的值为true、false的函数，给新建/编辑按钮事件的hooks函数定义两个可选参数传入这两个函数。在hooks的新建按钮事件中调用isHidden=false的函数，编辑按钮中调用另一个。
        这样就可以在user视图中点击新建不显示密码表单，点击编辑显示。而其它的视图也会使用新建/编辑的hooks，只要不给传函数参数即可只实现显示弹出框和绑定值的功能
     5. users单独的需求：在弹出框中有部门和角色两个select表单，动态给其绑定select值
        page-modal中部门和角色的select表单不应该写死，而是请求而来
        vuex的根模块中请求和保存部门和角色信息；在user中将请求到的部门、角色信息添加到配置数据modalFormConfig中。但由于异步请求数据时间不确定，有可能请求完成在添加到配置数据之后，所以将添加操作写到computed中，当vuex中的数据改变时再次赋值返回新的modalFormConfig，使用此computed代替modalFormConfig绑定到page-modal
     6. 点击page-modal中的确定按钮，创建/编辑一个用户或者啥
        在page-modal中定义确定按钮事件，首先将page-modal关闭，
        新建时点击确定和编辑时点击确定操作是不同的点击创建按钮时props.defaultInfo传过来的是一个空对象，编辑按钮则是一个包含了表单数据的对象，可以通过判断是否有数据判断是新建操作还是编辑操作。
        由于是改变服务器中的数据，新建和编辑依然通过 vuex --> network 即分发vuex中的分发，分发中调用network中封装的删除方法实现
     7. role单独的需求：在role视图中page-modal需要显示权限选项
        点击新建时可以选择给角色规定权限，点击编辑时可以编辑角色的权限。
        要在弹出框生成权限选项不能直接在配置对象中定义一个对象，因为没有表单有这个效果。在page-modal中定义一个插槽，在role中插入el-tree
        请求完整的权限信息用于在el-tree中显示，users的部门和角色信息，role的权限信息都属于预请求信息，在根模块中请求权限信息并保存，在role中获取传给el-tree
     8. role单独的需求：在点击弹出框的确定按钮时，将el-tree的信息也一并发送
        由于在page-modal中发送请求的信息formData只能从default中拿到弹出框表单中有的信息，而el-tree不属于表单。那就需要拿到el-tree的数据在请求时和formData一起发送。在page-modal中定义props--otherInfo,由于是role单独的需求，在role中获取el-tree选择的信息传给otherInfo
     9. role单独的需求：点击编辑按钮后，el-tree回显编辑对象的权限
        （表单回显再hooks中配置过了，是通用功能）
        和users中显示隐藏密码表单类似，点击编辑按钮回显数据，点击新建按钮不会回显，这就要求将操作定义到编辑按钮的处理方法中，由于是role专属功能，不能写到hooks中。所以就像users中一样，再role中定义编辑按钮的回调函数，在函数中获取编辑的对象的权限数据（一个对象数组）中所有最底层的对象的id，设置到el-tree中去。
        （el-tree会自动根据最底层的选中配置上层的选中）
        （对象的menuList中只保存了选中的权限对应的对象，所以就是获取选中权限对象中最底层对象的id）


7. 新建按钮弹出框
   user --> page-modal --> my-form
   配置数据： user --> page-modal --> my-form
   表单数据的双向绑定： page-modal <--> my-form
   按钮及事件处理： page-modal <--> my-form

8. dashboard页面

   页面布局：element-plus: el-row + el-col
   页面上有很多图表，将每个图表都包装在一个my-card中

   user --> my-card --> xxxEchart.vue --> my-echarts.vue --> useEchart.ts
   一种图表封装一个xxx-echart组件

   my-echart是封装的基础echarts组件，传入不同的配置对象即可生成不同的图表。但为什么不直接在my-card中使用my-echart，还要再封装一层？
   第一种： my-card --> my-echart
   第二种： my-card  --> xxxEchart --> my-echart

   因为图表的配置对象既包含样式配置又包含数据。如可能需要创建多个饼图，但饼图的样式配置都是相同的，只有数据是不同的。
 
在vue文件中使用store时需要导入useStore方法获取，但这种获取到的store对象是没有类型的(any),我们在Vuex的根模块中封装一方法myUseStore包装useStore返回的store对象，给store对象指定类型后返回。解决vuex的store在ts中的类型的问题



骨架：
1. 登录视图
2. 主页视图
   2.1 菜单展示与收放
   2.2 菜单绑定动态路由
   2.3 user --> page-search --> myform
   2.4 user --> page-content --> mytable
   2.5 user --> page-modal --> myform

user(展示层) -->  page-search(复用层) --> my-form(通用层)
复用层用于实现具体的逻辑和拓展，如添加一些插槽内容及处理逻辑，但这样也会把复用层限制住，只能用于某一类的需求
所以插槽可以封装不同的复用层实现不同的需求，如实现搜索表单和弹出框就在my-form的基础上封装了两种复用层。



问题！
分页器、点击page-modal删除按钮、确定按钮后会重新发送请求，但如果正在查找数据会显示默认结果
思路：将offset、size保存到vuex中

ref不是computed,不会监听内部的改变而改变


