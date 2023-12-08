const product = {
  crazy: {
    name: "Crazy",
    price: 31000,
    img: "images/products/burger-1.png",
    amount: 0,
    get totalSumm() {
      return this.price * this.amount;
    },
  },
  light: {
    name: "Light",
    price: 26000,
    img: "images/products/burger-2.png",
    amount: 0,
    get totalSumm() {
      return this.price * this.amount;
    },
  },
  cheeseburger: {
    name: "CheeseBurger",
    price: 29000,
    img: "images/products/burger-3.png",
    amount: 0,
    get totalSumm() {
      return this.price * this.amount;
    },
  },
  dburger: {
    name: "dBurger",
    price: 24000,
    img: "images/products/burger-4.png",
    amount: 0,
    get totalSumm() {
      return this.price * this.amount;
    },
  },
};

const productBtns = document.querySelectorAll(".wrapper__list-btn"),
  basketBtn = document.querySelector(".wrapper__navbar-btn"),
  basketModal = document.querySelector(".wrapper__navbar-basket"),
  closeBasketModal = document.querySelector(".wrapper__navbar-close"),
  basketCheckList = document.querySelector(".wrapper__navbar-checklist"),
  btnCard = document.querySelector(".wrapper__navbar-bottom"),
  totalPriceBasket = document.querySelector(".wrapper__navbar-totalprice"),
  basketBtnCount = document.querySelector(".warapper__navbar-count");

// Для клика на кнопки
productBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    plusOrMinus(this);
  });
});

// Для увеличения amount
function plusOrMinus(btn) {
  let parent = btn.closest(".wrapper__list-card"),
    parentId = parent.getAttribute("id");
  product[parentId].amount++;
  basket();
}

function basket() {
  const productArray = [];
  for (const key in product) {
    let totalCount = 0;
    const po = product[key];
    const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
      parentIndecator = productCard.querySelector(".wrapper__list-count");
    if (po.amount) {
      productArray.push(po);
      basketBtnCount.classList.add("active");
      totalCount += po.amount;
      parentIndecator.classList.add("active");
      parentIndecator.innerHTML = po.amount;
    } else {
      parentIndecator.classList.remove("active");
      parentIndecator.innerHTML = 0;
    }
    basketBtnCount.textContent = totalCount;
  }
  basketCheckList.textContent = "";
  for (let i = 0; i < productArray.length; i++) {
    basketCheckList.innerHTML += cardItemBurger(productArray[i]);
  }

  const allCount = totalCountProduct();
  if (allCount) {
    basketBtnCount.classList.add("active");
  } else {
    basketBtnCount.classList.remove("active");
  }
  basketBtnCount.textContent = allCount;
  totalPriceBasket.textContent = totalSummProduct();
}

basketBtn.addEventListener("click", function () {
  basketModal.classList.add("active");
});

function totalCountProduct() {
  let total = 0;
  for (const key in product) {
    total += product[key].amount;
  }
  return total;
}
function totalSummProduct() {
  let total = 0;
  for (const key in product) {
    total += product[key].totalSumm;
  }
  return total;
}

function cardItemBurger({ name, price, amount, img }) {
  return `
  <div class="wrapper__navbar-product">
    <div class="wrapper__navbar-info">
      <img src="${img}" alt="" class="wrapper__navbar-productImage">
      <div class="wrapper__navbar-infoSub">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${price}</p>
      </div>
  </div>                                  
  <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
       <button class="wrapper__navbar-symbol fa-plus"  data-symbol="+">+</button>
       <span class="wrapper__navbar-count">${amount}</span>
       <button class="wrapper__navbar-symbol fa-minus"  data-symbol="-">-</button>
  </div>
</div>
  `;
}

window.addEventListener("click", function (e) {
  const btn = e.target;
  if (btn.classList.contains("wrapper__navbar-symbol")) {
    const attr = btn.getAttribute("data-symbol");
    const parent = btn.closest(".wrapper__navbar-option");
    if (parent) {
      const idProduct = parent.getAttribute("id").split("_")[0];
      console.log(idProduct);
      if (attr == "-") {
        product[idProduct].amount--;
      } else {
        product[idProduct].amount++;
      }
      basket();
    }
  }
});

closeBasketModal.addEventListener("click", function () {
  basketModal.classList.remove("active");
});

const printBody = document.querySelector(".print__body");
const printFooter = document.querySelector('.print__footer')

btnCard.addEventListener("click", function () {
  printBody.innerHTML = ''
  for (const key in product) {
    const { name, totalSumm, amount } = product[key];
    if (amount) {
      printBody.innerHTML += `
      <div class="print__body-item">
      <div class="print__body-item_name">
          <span>${name}</span>
          <span>${amount}</span>
      </div>
      <p class="print__body-item_summ">${totalSumm}</p>
      </div>
      `
    }
  }
  printFooter.innerHTML = totalSummProduct()

  window.print();
});
