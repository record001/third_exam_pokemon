//create element:

function create_el(elem) {
  return document.createElement(elem);
}

// select element
function select_el(elem) {
  return document.querySelector(elem);
}

//rendering cards:

function renderPokemon(arr) {
  let el_wrapper = select_el("#wrapper");
  el_wrapper.innerHTML = "";

  arr.forEach((element) => {
    el_wrapper.innerHTML += ` <div class="card"  id = ${element.id}> 

        <img class="card__img" src="${element.img}" alt="img">

        <div class="card__title_wrapper">
          <h1 class="card__title" >${element.name}</h1>
          <i class="fa fa-heart heart_btn" aria-hidden="true"></i>
        </div>


        <p class="card__subtitle" > ${element.type}</p>

        <span class="card__kg" >${element.weight}</span> <span class="card__age" >${element.avg_spawns} old </span>

      </div> `;
  });
}

renderPokemon(pokemons);

// rendering types :

let el_form = select_el("#form");
let el_gross = select_el("#gross");
let el_search = select_el("#search");
let el_sort = select_el("#sort");
let el_submit = select_el("#submit");

function renderTypes(arr) {
  let sorted_arr = [];
  arr.forEach(function (elem) {
    elem.type.forEach(function (types) {
      if (!sorted_arr.includes(types)) {
        sorted_arr.push(types);
      }
    });
  });

  sorted_arr.forEach((elem) => {
    el_gross.innerHTML += `<option value="${elem}">${elem}</option>`;
  });
}
renderTypes(pokemons);

// Sort search:

el_form.addEventListener("submit", function (event) {
  event.preventDefault();

  //search feild:

  let search_value = el_search.value;

  let reg_exp = new RegExp(search_value, "gi");

  let filtered_arr = pokemons.filter((elem) => elem.name.match(reg_exp));

  el_search.value = "";

  // sort by gross

  let gross_value = el_gross.value;
  let sort_filter = [];

  if (gross_value === "All") {
    sort_filter = filtered_arr;
  } else {
    sort_filter = filtered_arr.filter((elem) =>
      elem.type.includes(gross_value)
    );
  }

  // sort by A-Z  Z-A

  let sort_value = el_sort.value;

  if (sort_value === "A-Z") {
    sort_filter.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  if (sort_value === "Z-A") {
    sort_filter.sort(function (b, a) {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  renderPokemon(sort_filter);
});

//Modal:

let el_modal = select_el(".modal");
let el_modal_show = select_el(".modal__show");
let el_modal_close_btn = select_el(".modal__close");

let el_heart = select_el("#heart");

el_heart.addEventListener("click", function (event) {
  document.querySelector(".fav_card .wrapper").innerHTML = "";

  el_modal.classList.add("modal_on");

  document.querySelectorAll(".card").forEach((card) => {
    // console.log(card.outerHTML);
    if (card.children[1].children[1].classList.contains("red")) {
      document.querySelector(".fav_card .wrapper").innerHTML += card.outerHTML;
    }
  });

  document.querySelectorAll(".fav_card .card").forEach((el) => {
    el.addEventListener("click", function (event) {
      
      if (event.target.classList.contains("heart_btn")) {
        el.classList.add("yoq")
        // el.style.display = "none"
      }
    });
  });
});

el_modal_close_btn.addEventListener("click", function (event) {
  el_modal.classList.remove("modal_on");
});

document.querySelectorAll(".card").forEach((el) => {
  el.addEventListener("click", function (event) {
    if (event.target.classList.contains("heart_btn")) {
      event.target.classList.toggle("red");
    }
  });
});


