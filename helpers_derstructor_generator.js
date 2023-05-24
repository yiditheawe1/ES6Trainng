//https://www.udemy.com/course/javascript-es6-tutorial/learn/lecture/
//Run>>Run without debugging>> node.js, or F5
//本js file需要ECMAScript 2020，所以需要安装较新版本node js
// 1. forEach helper
/* Array of JS Objects*/
    var images = [
        { height: 10, width: 30, tag:'A' },
        { height: 20, width: 90, tag:'B' },
        { height: 54, width: 32, tag:'C' }
    ];
    var areas = []; //new array, avoid mutating
    images.forEach(function(img){
        areas.push(img.height*img.width);
    });
    console.log('ForEach Helper:\t',areas)  //output
// Json Object
    let person={
        "firstName":"John",
        "lastName":"Doe",
        "age": 30,
        "hobbies":["reading", "coding"]
    }
// 2. Map Helper: returns array of 变形 of all elements
// anonymous function has to return! let var= var2.map((v)=>{ return v}) 赋值给var！
    let numbers=[1,2,3];
    let doubled=numbers.map(function(num){
        return num*2;
    })
    console.log('Map Helper1:\t',doubled); //output 
    //对 js obj array使用map获取所有propetty 
    const paints = [ { color: 'red' }, { color: 'blue' }, { color: 'yellow' }];
    function pluck(array, property){
        var res = array.map(arr=>{
            return arr[property]
        })
        return res;
    }
    console.log('Map Helper2:\t', pluck(paints, 'color'));    //output
// 3. filter Helper, returns array of elements
//此练习要求oppssite to return anything < 15,
    numbers = [10, 20, 30, 8]
    console.log('Filter Helper(combined with map filter):\t', numbers.filter(n=>{
        return n > 15
    }).map(n=> n+1 ))
// 4. find Helper： iterate until it finds the 1st element! Returns the element
    let ladders = [
        { id: 1, height: 20 },
        { id: 3, height: 25 }
    ];
    function findwhere(array, jsobj) {
        return array.find(a=>{  //in this function, need to retrun the result of the find Helper
           return a.height === jsobj.height;
        })
    }
    console.log('Finder Helper:\t',findwhere(ladders, {height: 25}));
    console.log('Finder Helper or:\t',ladders.find( l => l.height === {height: 25}.height));
// 5. Every & Some Helper, returns boolean value, 可用于用户多信息验证
// constructor: a function used to construct an object
    class field {
        constructor(parameter) {
            this.value = parameter; // refer to line 130
        }
    }
// prototype is used to attach a fucntion to the field class/object
    field.prototype.validate = function(){
        return this.value.length > 5;
    }
    let username = new field("2cool");
    let password = new field("myPass");
    const fields=[username,password];
    console.log('Every Helper:\t', fields.every(f=>f.validate()));
    console.log('Some Helper:\t', fields.some(f=>f.validate()));
// 6. Reduce Helper: 
    // take回调函数和初始值(0 in this case)。
    // 且回调函数takes 2 parameters：当下初始值(pre) & 每个element.
    // return 最终改变后的初始值(pre)
    // 0 is falsy, all other number is truthy. !0 is truthy, !1===!-1 is falsy
    // ++i VS i++
    for(let i=0;i<3;){
        console.log(++i); //console.log(i++)
    }
    for(let i=0;i<3;i++)
        console.log(i);
    let paranthesis = "()())";
    console.log('Reduce Helper:\t', !paranthesis.split("").reduce((prev, paran)=>{
        if (prev < 0) 
            return prev;    //return false when ) appears 1st
        if (paran === "(")
            return ++prev; //++prev立刻+1， prev++下一轮才+1
        if (paran === ")")
            return --prev;
        return prev;    //for non-)( characters, need to return prev to make prev consistent
    },0));
    //reduce helper2
    numbers = [1, 1, 2, 3, 4, 4];
    console.log('Reduce Helper2:\t', numbers.reduce((pre,n)=>{
        if(!pre.includes(n)){
            pre.push(n);
            return pre;
        }
        return pre; //pre must be returned in every iteration以保持pre值连续    
    },[]));

    //advance if 
    const age=15;
    let message = age >= 18 ? "You are an adult" : "You are a minor"; // condition ? expressionIfTure : expressionIfFalse;
    const isEven = (num) => num % 2 === 0 ? true : false;   //same as above, arrow fuction
    message= false || "something else"; // message=  condition  || value B;  if condition，msg=condition值 else value B

    //reduce helper 3: grouping data
    let test={30:['a','b'], 35: ['c'], 40:['d','e','f'], 45: 50};
    console.log(test[45]); //access value of key-value pair js obj
    const people = [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
        { name: "Charlie", age: 35 },
        { name: "David", age: 25 }
      ];
    console.log("Reduce helper3:\t",people.reduce((prev, p)=>{
        prev[p.age]=prev[p.age] || []; //if prev[p.age] is empty(falsy), then assign []
        prev[p.age].push(p);
        return prev;
    },{})); //defaut passed in obj {}, p.age为此obj中一个值，pre[p.age]为{}中该值对应的array。{30:[a,b], 35:{c}, 25:[d,e] ...}
    //reducer helper 4: Flatten array
    let arrays = [[1, 2], [3, 4], [5, 6], 7];
    console.log('Reducer helper4:\t',arrays.reduce((acc,a)=>{
        return acc.concat(a);
        //return acc.concat(Array.isArray(a)? a.flat(): a) 没必要但正确,flat()要知道
    },[]));
    //reduce helper 4b:
    arrays = [[30], [1, 2, 2], [2, 3, 4], [1, 3, 4, 5, 6], [7],[30,50]]; //concat():merge 2 arrays;  push():add 1 element
    console.log(
        "Reduce Helper 4b:",
        arrays.reduce((acc,a)=>{
            if(a.length==1){
                acc.includes(a[0]) ? acc : (acc = acc.concat(a)); //:后要把acc.concat/push(a)赋值给acc，使之acc连贯. 这一行是赋值，不能return
                return acc;
            }
            return a.reduce((acc2, idx)=>{      /************ reduce内层嵌套reduce，acc可以传递！！**************/
                acc2.includes(idx) ? acc2 : (acc = acc2.push(idx));  //这一行是对acc高级赋值语句，不可return值
                return acc2;
            },acc);
        },[])
    );
    
    
// Template Strings: include js expression in string :`string ${code}`
    console.log(`Template String1:\tThe year is ${new Date().getFullYear()}`);
    const data = `{"paranthesis": "${paranthesis}", "username":"${username.value}" }`;
    console.log('Template String2:\t', data);
// anonymous function vs arrow fuction: 
/* this references the obj that is executing in the current func. 
    this只出现函数中(method(包括constructor method)/func包括匿名callback)或ui element中
    method(func in obj, like teamSummary) -> this represents obj(team)
    function包括匿名call back -> 除非bind，否则this represents global obj (window in browser / global in node)
    arrow func: 雨匿名cb不同，this指向caller obj
    event handler -> UI element
*/
// value of 'this' is lost when passing anonymous func to somewhere else in code base: map helper
    const team={
        members: ['Jane','Bill'],
        teamname: 'Super Squad',
        play(){
            console.log('This from play method: ',this); //this in method refers to the obj itself
        },
        teamSummary(){
            return this.members.map(function(m){ //此处 this === 前三行 this: method this 
                return `\nThis from callback with 2nd arg: ${m} is on team ${this.teamname}`;  //in call back by default this referes to global, undefined!!!
            },this); // bind this: with this added as 2nd arg alone with callback, this refers to obj of cb caller: team 
        },
        arrowSummary: function(){
            return this.members.map((m)=>{
                return `\nThis from arrow function: ${m} is on team ${this.teamname}`;
            });
        }
    };
    team.play(); //output method this
    console.log(team.teamSummary()); //output anonymous call back this & with 2nd arg this
    console.log(team.arrowSummary()); //arrow fucntion, this refers to obj
    team.newproperty=function(){
        console.log('This from newproperty method: ',this); 
    };
    team.newproperty(); //output method this
    //constructor Captal name
    function Team(mbrs){
        this.newMembers=mbrs;   // in constructor function, this refers to new object 
        console.log('This from constructor function: ',this.newMembers); //ouput method this in constructor
    }
    const t = new Team(['a','b']) // new keyword forces this keyword refers to the obj in constructor
    // this in ordernary function refers to global, not the ordernary func
    function greet(){
        console.log(`This from ordernary function:\t Hello, ${this}`);
    }
    greet();

// 7. Enhanced Object Literals：    用以简洁代码，例如jquery中$.ajax({url,data,method:'POST'});
    const inventory = [
        {title:'BookA', price: 10},
        {title: "BookB", price: 15}
    ];
    function creatBookShop(inventory){ //this ordernary func takes an array argument and returns js obj
        return{
            inventory,  //inventory: inventory,     // 1.key & value never have same name, if so 无需赋值(like now)
            inventoryValue(){             // 2.inventoryValue: function(){      //取消:和关键词function
                return this.inventory.reduce((total, i)=> i+total ,0);
            },
            priceForTitle(title){
                return this.inventory.find(i=> i.title === title).price;
            }
        };
    }//place a breakpoint to see the details of objs in debugging mode
    console.log('Enhanced Object Literals：\t',creatBookShop(inventory).priceForTitle("BookB"),'\n*********************'); 
// 8. Default function argument, DFA
    //1.
    function request (url, method='GET'){ //this supports: request('google.com','POST')和request('google.com')
        //some logic
    }
    //2.
    function User(id){    //constructor
        this.id=id;
    }
    function generateId(){
        return Math.random()*99999;
    }
    function createAdminUser(user = new User(generateId())){ //DFA于argument
        user.admin=true;
        return user;
    }
    console.log('Default Function Argument:\t',createAdminUser()); //non-DFA: createAdminUser(new User(generateId()))
// 9. Rest Operator(整合) 都是...只是用法不同
    function sumnum(...numbers){    //...arguments就是rest operator: unknown # of arguments.整合为single array: numbers
        return numbers.reduce((acc, n)=>{
            return acc+n;
        },0);
    }
    console.log('Rest Operator:\t',sumnum(1,2,5,6,7));
// 10. Spread Operator(拆散) 都是...只是用法不同
    function validateShoppingList(...items){        //rest operator
        if(items.indexOf('milk')<0)
            return ['milk', ...items];             //spread operator
        return items;
    }
    console.log('Spread Operator:\t',validateShoppingList('a','b','c'));
// 11. Destructure  便捷declare并赋值
    const business={
        owner: 'Yidi',
        type: 'Consulting',
        amount: '$1000000000 USD',
    };
    const {owner, type, amount} =business; //{}is not obj, its pulling expense.type & expense.amount ***
    function expenseSummary({owner,type,amount},{country}){ //or expenseSummary(business)不可以加入2nd country{}
        return `${business.owner} owns a ${type} business that worth ${amount} in ${country}`;
    };
    //`${ }`用以输出值(property of an obj)， 而非 obj 本身
    console.log(expenseSummary(business, {country:'the US'}), `\n ${business}`);//2nd参数以obj传入，不会以property形式加入business obj!!不会!!
    //输出obj本身
    console.log(business);
    // destruct a property from obj: { }, destructor an element from arry: [ ]
    let companies =['Google','Uber','Facebook','MicroSoft','IBM'];
    let {length}=companies; //valid variable name(property) in {}, get length property from the array
    let [idx1, idx3, ...rest]=companies; // declared 2 vars use [], get first 2 elements from the array & rest in an array
    console.log(length, '\tVS\t', idx1, ',\t', idx3, ',\t', rest );
    // destruct obj & array simultaneously 
    //1.[{}]
    companies=[
        {name:'Google', location: 'Mountain View'},
        {name:'Facebook', location: 'NYC'},
        {name:'Uber', location: 'London'},
        {name: 'IBM', location: 'Seattle'}
    ];
    [idx1, {location}, ...rest]=companies; //get {location} property from the 2nd [ ] element，无需声明rest，idx1等var，location prpty名要准确
    console.log(location, ',\t', rest);
    //2. {[]}
    let google={
        //locations: ['Mountain View', 'NYC', 'London']
        locations: 'A,B,C'
    };
    let {locations:[tmp,tmp1]} = google ?? {locations:[]}; //get obj中locations property的array的前两个元素. *必须let声明*。 无需纠结
    console.log(tmp,',\t',tmp1);
    let v1=null;
    const r1=v1 ?? 'default'; 
    //const r1 = v1 !== null && v1 !== undefined ? v1 : 'default'; // incase ECMAScript 2020 or later is not supported
    console.log(r1);
    //practical destructure 1
    function signup({email, username, pwd, city, DoB}){     //destructure the argument obj, to get desired properties despite their order
        //code
    };
    const user={
        username: 'USRNM',
        pwd:'pass',
        email: 'a@b.com',
        DoB:'2000.1.1',
        city:'NYC'
    };  
    signup(user); //传入obj， function已经自动拆解其properties，无需在乎顺序
    // //practical destructure 2, 数据类型转换: array of array 转 array of obj
    const points=[[4,5],[1,2],[5,6]];
    points.map(([x,y])=>{  //map returns an array. destructure拿到xy，非重复赋值
        return {x, y};
    });
// 12. Prototype inheritance
    function Car1(options){
        this.tile=options.tile;
    };
    Car1.prototype.drive=function(){
        return 'Vroom';
    };
    let car= new Car1({title:'Focus'});
    // car.prototype.hi=()=>'hi'; 此行invalid因为prototype只能给obj用而不是instance
    //Class
    class Car{
        constructor(options){   //
            this.title=options.title;
        };
        drive(){
            return 'Vroom';
        };
    };
    car=new Car(''); //由于构造函数，argument可以是null/undefined， 不可空着
    car=new Car({title:'BMW'}); //override 上一行
    class BMW extends Car{
        constructor(options){
            super(options); //Car.constructor()； 先构造父obj
            this.color = options.color;
        };
        honk(){
            return 'beep';
        };
    };
    const bmw=new BMW({color:'gold', title: 'Sedan'}); //creating bmw 
    console.log(bmw);
// 13. Generator: a function which could be entered/executed multiple times
    //generator function 
    function* shopping(){     //function* means generator
        //... logics
        const stuffFromStore = yield 'cash';  // es6 keyword for generator: like a breakpoint, pausing
        //... logics
        const stuffFromLaundry = yield 'laundry';
        //... logics
        return [stuffFromStore, stuffFromLaundry];
    }
    const gen= shopping(); //shopping() is not executed
    console.log(gen.next('a')); //next() is a property of generator, shopping() got executed for the 1st time, stops at yield
    console.log(gen.next('groceries')); //shopping() got executed for the 2nd time, pick up at 1st yield, stop at 2nd yield(so return is not executed yet)
    console.log(gen.next('clean clothes'));
    const shoppingitems=[];
    for (let i of shopping()){
        shoppingitems.push(i);

    }
    console.log(shoppingitems);
    // usage of generator: iterate(customized order) an obj's desired properties only while avoid the rest. Combine with for-of loop
    const testingTeam={
        lead: 'Amanda',
        tester:'Bill',
        [Symbol.iterator]:function* (){  //Symbol iterator: allows for-of loop of an {} using yield/yield*(Delegation), [] is Key interpolation of ES6
            yield this.lead;    //use this coz its inside function within testingTeam obj
            yield this.tester;
        }
    };
    const EngineerTeam={
        testingTeam, // for delegating
        size:3,
        Department: 'Engineering',
        Lead: 'Joey',
        Manager: 'Yidi',
        Engineering: 'Lewis',
        [Symbol.iterator]:function* (){
            yield this.Lead;
            yield this. Manager;
            yield this.Engineering;
            yield* this.testingTeam;    //Delagtion: Nested generators
        }
    };
    function* TeamGenerator(team){
        yield team.Manager;
        yield team.Engineering;
        yield team.Lead;
        //yield team.testingTeam.lead;
        yield* TestingTeamGenerator(team.testingTeam); //generator delegation(Gntr套Gntr); * means多个yield的整合
        yield* team.testingTeam; //testingTeam can iterate itself coz symbol iterator
    }
    function* TestingTeamGenerator(team){
        yield team.lead,
        yield team.tester
    };
    let names=[];
    for(let name of TeamGenerator(EngineerTeam)){
        names.push(name);
    }
    console.log('Generator delegation with [symbol.iterator] yield*:\t', names)
    names=[];
    for(let name of EngineerTeam){
        names.push(name);
    };
    console.log('Generator delegation with delegated [symbol.iterator]yield*:\t', names);
   //practical generator with recursion !!!!
    class Comment{  //node class
        constructor(content, children){
            this.content=content;
            this.children=children;
        };
        *[Symbol.iterator](){ //to for-of loop all child nodes !!!!!!!!!!!!!!!! equivalent to [Symbol.iterator]:function* (){
            yield this.content;
            //all helpers dont work with generators
            for(let c of this.children){
                yield* c;
            }
        }
    };
    const children=[    //declare child nodes
        new Comment('good comment',[]),
        new Comment('bad comment',[new Comment('deep comment',[])]),
        new Comment('meh',[])
    ];
    const tree=new Comment('Great post!',children); //tree root node(parent)
    const values=[];
    for(let v of tree){
        values.push(v);
    };
    console.log(values);
// 14.Promises: 3 states: unresolved, resolved, rejected, register 2 callbacks properties: then(resolved), catch(rejected)
// ajax
    const promise=new Promise((reslove, reject)=>{ //2 arguments auto comes with promise
        setTimeout(()=>{
            reslove();
        },3000);
        //reject();
    }); 
    promise
        .then(()=>console.log('finished')) //回过头happens 2nd
        .then(()=>console.log('also ran!'))
        .catch(()=> console.log('Uh Oh!'))

    console.log(promise); //happens 1st
 //fetch
 const url ="https://jsonplaceholder.typicode.com/posts/";
 fetch(url)
    .then(res=>res.json()) //分解json obj得到data在下一个then使用
    .then(data => console.log(data))
    .catch(e => console.log('error',e)) //wont be able to catch any error with status code > 300: fetch 的缺点,只能catch domain addr err
    console.log();