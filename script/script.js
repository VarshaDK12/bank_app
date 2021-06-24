'use strict';

const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnDouble  = document.getElementById('double');
const btnFilterRich = document.getElementById('filter-rich');
const btnSort = document.getElementById('sort');
const btnTotal = document.getElementById('total');

let data = [];

const getRandomUser = async function() {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0];

const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random()*100000),
    };
  addData(newUser);
};

const addData = function (obj) {
    data.push(obj);
    updateDom();
};

const updateDom = function(providedData=data) {
  main.innerHTML = '<h2><strong>Name</strong> Balance</h2>';
  providedData.forEach(item => {
      const element = document.createElement('div');
      element.classList.add ('users');
      element.innerHTML = `<strong>${item.name}</strong>₹${formatToCurrency(item.balance)}`;
      main.appendChild(element);
  })
}

function formatToCurrency(amount) {
    return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const doubleBalance = function () {
    data= data.map((user) => {
        return {...user, balance: user.balance*2};
    });
    updateDom();
}

const filterRich = function () {
    data = data.filter((user) => user.balance > 50000);
    updateDom();
}

const sort = function (){
    data.sort((user1,user2)=>user1.balance-user2.balance);
    updateDom();
}

const totalBalance = function() {
    const wealth = data.reduce((acc, user) => (acc = acc + user.balance), 0);
    
    console.log(wealth);
    const wealthE1 = document.createElement('div');
    wealthE1.innerHTML = `<h3>Total Balance: <strong>${formatToCurrency(wealth)}</strong></h3>`
    main.appendChild(wealthE1);
}

getRandomUser();

btnAddUser.addEventListener('click', getRandomUser);
btnDouble.addEventListener('click', doubleBalance);
btnFilterRich.addEventListener('click', filterRich);
btnTotal.addEventListener('click', totalBalance);
btnSort.addEventListener('click', sort);
