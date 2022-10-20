'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Anil kumar',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 0.05, // %
  pin: 1111,
  loanRequest: [],
  loanAmount: [],
  loanRejection: [],
};

const account2 = {
  owner: 'binay kumar',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 0.05,
  pin: 2222,
  loanRequest: [],
  loanAmount: [],
  loanRejection: []
};

const account3 = {
  owner: 'Chandan kumar ',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.05,
  pin: 3333,
  loanRequest: [],
  loanAmount: [],
  loanRejection: []
};

const account4 = {
  owner: 'Deepak kumar',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 0.05,
  pin: 4444,
  loanRequest: [],
  loanAmount: [],
  loanRejection: []
};

const account5 ={
  owner: 'Rishav Kumar',
  movements: [100,460,590,870,-1000,3500,-420],
  interestRate: 0.05,
  pin: 5555,
  loanRequest: [],
  loanAmount: [],
  loanRejection: []
}


const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnLogout = document.querySelector('.logout-btn');



const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputLoanUser = document.querySelector('.form__input--loan-user');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let intrest;
let currentAccount, timer;
/////////////////////////// Displaying Elements in movements section /////////////////////////
const displayMovements = function(movements){
  containerMovements.innerHTML = '';

    movements.forEach(function(mov,i){

        const type = mov> 0 ? 'deposit' : 'withdrawal';
        const intrest = mov< 0 ? '0' : mov*0.05;
        const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__date">${i+1} days ago</div>
        <div class="movements__intrest">${intrest}</div>
        <div class="movements__value">${mov}€</div>
        <div class="movements__total-amount">${Number(mov)+Number(intrest)}€</div>


    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};


////////////////////////////// Setting countdown ////////////////////////////////////////////////

// const startingMinutes = 1;
// let time = startingMinutes*60;

// setInterval(updateCount,1000);

// function updateCount(){
//   const minutes = Math.floor(time/60);
//   let seconds = time % 60;

//   seconds = seconds <10 ? '0' + seconds : seconds;
//   labelTimer.innerHTML = `${minutes}:${seconds}`;
//   time--;
// }


const startLogOutTimer = function(){
  const tick = function(){
    const min = String(Math.trunc(time/60)).padStart(2,0);
    const sec = String(time%60).padStart(2,0);
    labelTimer.textContent = `${min}:${sec}`;

    

    if (time === 0){
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
    }
    time--;
    
  }

  let time = 300;
  
  tick();
  const timer = setInterval(tick,1000);
  return timer;

}


////////////////////////////// Displaying Total balance remained ////////////////////////////////
const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov) => Number(acc+mov,0));

 
  labelBalance.textContent = `${acc.balance}€`;
};

////////////////////////////// Displaying summary of account //////////////////////////////////////
const calcDisplaySummary = function(acc){
  const income = acc.movements.filter( mov => mov>0).
    reduce((acc,mov) => acc + mov,0);
    labelSumIn.textContent = `${income}€`;

    const out = acc.movements.filter(mov => mov<0).
    reduce ((acc,mov) => acc+mov,0);
    labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = acc.movements.filter(mov => mov>0).
    map(deposit => (deposit * acc.interestRate)).
    filter((int , i , arr)=> {
      return int >=1;

    }).
    reduce((acc,int) => acc + int, 0)
    labelSumInterest.textContent = `${interest}€`;
}


//////////////////////////// Creating Username /////////////////////////////////////////////////////
const createUserName = function (accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase().split(' ').map(name => name[0]).join('');
  });
};
createUserName(accounts)
const updateUI = function(acc){
  displayMovements(acc.movements);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
}



// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


const now = new Date();
const day = `${now.getDate()}`.padStart(2,0);
const month = now.getMonth()+1;
const year = now.getFullYear();
const hour = now.getHours();
const min = now.getMinutes();

labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;


//////////////////////////////////////  Login Section ////////////////////////////////////////
btnLogin.addEventListener('click',function(e){
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value );
  console.log(currentAccount);
  
  if (currentAccount?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    if (timer) clearInterval(timer)
    timer = startLogOutTimer();




  } else{
    alert('Wrong credentials');
  }
  const message = document.createElement('div');
  message.classList.add('loan-message');
  message.innerHTML = `${currentAccount.loanAmount[0]} has requestes you a loan amount of ${currentAccount.loanAmount[1]}.
  Do you want to accept or reject. <button class= "loan-btn loan--btn-accept">Accept</button>  <button class= "loan-btn loan--btn-reject">Reject</button>`;



  // currentAccount.loanRequest.length
  if(currentAccount.loanRequest.length !== 0){
      labelWelcome.prepend(message);
      const loanRequestAcc = accounts.find(acc => acc.owner === currentAccount.loanAmount[0] );
      const loanBtnAccept = document.querySelector('.loan--btn-accept');
      const loanBtnReject = document.querySelector('.loan--btn-reject');
      loanBtnAccept.addEventListener('click',function(e){
        e.preventDefault();
        if (currentAccount.balance >= currentAccount.loanAmount[1]){
        currentAccount.movements.push(-currentAccount.loanAmount[1]);
        loanRequestAcc.movements.push(currentAccount.loanAmount[1]);
        updateUI(currentAccount);
        message.style.opacity = 0;
        currentAccount.loanRequest.splice(0, );
        }else{
          alert('you didn\'t have enough balance.');
          message.style.opacity = 0;
          currentAccount.loanRequest.splice(0, 1);
        }
      });
      loanBtnReject.addEventListener('click',function(e){
        e.preventDefault();
        message.style.opacity = 0;
        loanRequestAcc.loanRejection.push('rejected');
        currentAccount.loanRequest.splice(0, 1);
      })
  }

  if (currentAccount.loanRejection.length !==0){
    updateUI(currentAccount);
    // alert('Your loan got rejected.');
    const reject = document.createElement('div');
    reject.classList.add('loan-message');
    reject.innerHTML = 'Your loan request got rejected.';
    labelWelcome.prepend(reject);
    currentAccount.loanRejection.splice(0,currentAccount.loanRejection.length);
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  updateUI(currentAccount);
});




 
///////////////////////////////////////////// Transfer section //////////////////////////////////////////
btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 && currentAccount.balance >= amount && receiverAcc && receiverAcc?.username !== currentAccount.username){
    console.log("Valid");
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // currentAccount.movementsDates.push(new Date().toISOString());
    // receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  } else {
    alert('Transfer failed try again with right credentials');
  }
  if (timer) clearInterval(timer)
  timer = startLogOutTimer();

});


//////////////////////////////////////////// Loan section ///////////////////////////////////////////////
btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  const giverAcc = accounts.find(acc => acc.username === inputLoanUser.value);
  inputLoanAmount.value = inputLoanUser.value = '';

  if (timer) clearInterval(timer)
  timer = startLogOutTimer();
  
if (amount > 0 && giverAcc && giverAcc?.username !== currentAccount.username){
  if (giverAcc.loanRequest.length !== 0){
    alert('User have already pending loan request please try later.')
  }
  else{
    alert(`Your request for laon of amount ${amount} been sent to ${giverAcc.owner}`);
    giverAcc.loanRequest.push('message');
    giverAcc.loanAmount.push(currentAccount.owner , amount );
  }
  }else{
    alert('You have entered wrong credentials please try again later');
  }
})
const findacc = accounts.find(acc => acc.loanRequest);


/////////////////////////////////////////// Account close section ///////////////////////////////////////
btnClose.addEventListener('click',function(e){
  e.preventDefault();

  if (timer) clearInterval(timer)
  timer = startLogOutTimer();


  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index,1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Welcome to the bank`;
  }else{
    alert('Wrong input');
  }

  inputCloseUsername.value = inputClosePin.value ='';
});


btnLogout.addEventListener('click',function(e){
  e.preventDefault();
  console.log('click');
  labelWelcome.textContent = `Welcome to the bank`;
  containerApp.style.opacity = 0;
})


// let sorted = false;
// btnSort.addEventListener("click", function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted;
// });
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// const deposits = movements.filter(function(mov){
//   return mov > 0;
//   // if (mov>0){
//   //   return mov;
//   // }
// })

// const withdrawls = movements.filter(mov => mov<0);


// const balance = movements.reduce((acc,cur) => acc+cur,0);
// // console.log(balance);