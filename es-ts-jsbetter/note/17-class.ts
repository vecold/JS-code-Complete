enum GENDER {
  MALE = 1,
  FEMALE = 0
}
interface person {
  name: string;
  age: number;
  gender: GENDER;
  class: string;
  project: string | number;
};
interface user {
  name: string;
  age: number;
  isLiengla: boolean;
}
const data: person[] = [{
  name:'小明',
  age: 18,
  gender: GENDER.MALE,
  class: '大一',
  project: '软件工程'
},
{
  name:'小红',
  age: 18,
  gender: GENDER.FEMALE,
  class: '大一',
  project: 100
},
{
  name:'小明',
  age: 18,
  gender: GENDER.MALE,
  class: '大一',
  project: '软件工程'
}]

function filterGender(data:person[],gender: GENDER): person[]{
  return data.filter(item=> item.gender===gender);
}

function filterAge(data: person[],age: number): person[] {
  return data.filter(item=> item.age>age);
}

function filterPerson(user: person,judeAge: number): {name:string;age:number;isLiengla:boolean} {
  const {name,age} = user
  return   {
    name,
    age,
    isLiengla: age >= judeAge
  } 
} 
function api(age:number): Promise<person[]> {
  return new Promise((resolve,reject)=>{
    resolve(data);
  })
}
