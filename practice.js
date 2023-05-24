//reducers 1
const num=[1,2,3,4,5];
console.log(num.reduce((prev, n)=>{
    return prev+n;
},0));
//2
const words = ["apple", "banana", "cherry", "date","nsnsnss"];
console.log(words.reduce((prev, w)=>{
    // if(w.length>prev.length)
    //     return w;
    // return prev;
    return w.length>prev.length ? w : prev; //这一行等于以上三行
},""));
//3. group by age
function test(){
    return 3>2 ? true:false;
}
console.log(test());

const arrays = [[30], [1, 2, 2], [2, 3, 4], [1, 3, 4, 5, 6], [7], [30]];

console.log(
  'Reduce Helper 4b:',
  arrays.reduce((acc, a) => {
    if (a.length == 1) {
      if (!acc.includes(a[0])) {
        acc = acc.concat(a);
      }
      return acc;
    }
    return a.reduce((acc2, idx) => {
      if (!acc2.includes(idx)) {
        acc2.push(idx);
      }
      return acc2;
    }, acc);
  }, [])
);


const business={
  owns: 'Yidi',
  type: 'Consulting',
  amount: '$1000000000 USD',
};
const {type, amount} =business; //{}is not obj, its pulling expense.type & expense.amount ***
function expenseSummary(business){
  return `${business.owns} owns a ${type} business that worth ${amount}`;
};
console.log(expenseSummary());
