const url = "https://randomuser.me/api/?results=24";
const userList = document.getElementById("user_list");
const input = document.getElementById("inputBtn");
const arrayOldContact = Array.from(document.querySelectorAll(".old_contact"));
const userInfo = document.getElementById("user_info");

async function getData() {
  try {
    const res = await axios.get(url);
    const data = [...res.data.results];
    return data;
  } catch (error) {
    console.error(error);
  }
}

function filterList() {
  const EachItem = document.querySelectorAll(".user_list_box");
  let word = input.value.toLowerCase();
  EachItem.forEach((item) => {
    let text = item.textContent.toLowerCase();
    if (text.includes(word)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

function insertUserInfo(data) {
  if (userInfo.classList.contains("old_contact")) {
    arrayOldContact.forEach((e) => {
      userInfo.removeChild(e);
    });
  } else {
    let InsertElement = document.querySelectorAll(".newContact");
    let arrayInsertElement = Array.from(InsertElement);
    arrayInsertElement.forEach((e) => {
      userInfo.removeChild(e);
    });
  }
  userInfo.innerHTML = `
    <img class="newContact" src=${data.picture.large}>
    <h2 class="newContact" >${data.name.title}.${data.name.first} ${data.name.last}</h2>
    <span class="newContact" >Gender: ${data.gender}, Age: ${data.dob.age}</span>
    <span class="newContact" >Email: ${data.email}</span>
    <span class="location">
    <img width="20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ic_phone_48px.svg/1200px-Ic_phone_48px.svg.png" alt="phone">
    ${data.cell}
    </span>
    <span class="location">
    <img width="20" src="https://www.svgrepo.com/show/127575/location-sign.svg" alt="location">
    ${data.location.city}, ${data.location.country}
    </span> 
    `;
}

async function main() {
  const data = await getData();
  data.forEach(async (data) => {
    let item = document.createElement("li");
    item.classList.add("user_list_box");
    item.innerHTML = `
        <img src=${data.picture.large}>
        <div class="user_list_column">
          <div class="user_list_name">
              <span class="user_fullname">
                ${data.name.title}.${data.name.first} ${data.name.last}
              </span>
          </div>
          <div class="user_list_email">
              <span>
              ${data.email}
              </span>
          </div>
          </div>`;
    await userList.appendChild(item);
    input.addEventListener("input", filterList);
    item.addEventListener("click", () => insertUserInfo(data));
  });
}

main();
