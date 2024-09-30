/** @format */
document.getElementById('loading-spinner').classList.remove('hidden');
setTimeout(() => {
  loadPost('posts');
}, 2000);


const loadPost = async (title) => {    
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/${title}`);
  const data = await res.json();
  const cardPost = document.getElementById("card-post");

  cardPost.innerHTML = '';

  data.posts.forEach((item) => {
    
    const div = document.createElement("div");
    div.className = `border mb-4 bg-slate-100 rounded-lg p-6 flex gap-8`;
    if (item.isActive===true) {
      const isActiveBtn = 'success';
      div.innerHTML = `
      <div>
        <div class="indicator">
      
          <span class="indicator-item badge badge-${isActiveBtn}"></span>
          <div class="grid w-20 h-20 bg-base-300 place-items-center"><img class="w-20 bg-white rounded-md border" src="${item.image}" alt=""></div>
        </div>              
      </div>
      <div>
        <div class="flex gap-6 text-[14px]">
          <p># ${item.category} </p>
          <p>Author : ${item.author?.name} </p>
        </div>
        <h1 class="py-2 font-semibold text-xl">${item.title}</h1>
        <p class="text-[14px] lg:w-[500px]">${item.description}</p>
        <hr class="border-dashed my-3">
        <div class="flex justify-between items-start ">
          <div class="flex gap-6">
            <p class="flex gap-2"><img class="w-5 h-5" src="images/comment.png" alt=""><span>${item.comment_count}</span></p>
            <p class="flex gap-2"><img class="w-5 h-5" src="images/view.png" alt=""><span>${item.view_count}</span></p>
            <p class="flex gap-2"><img class="w-5 h-5" src="images/clock.png" alt=""><span>${item.posted_time}</span>min</p>
          </div>
          <div>
            <button onclick="btnMessage('${item.title}','${item.view_count}')" ><img class="w-7 h-6 bg-green-400 rounded-full p-1 text-white" src="images/mg.jpg" alt=""></button>
          </div>
        </div>
      </div>
  `;
    } else {
      const isActiveBtn = 'error';
      div.innerHTML = `
      <div>
        <div class="indicator">
      
          <span class="indicator-item badge badge-${isActiveBtn}"></span>
          <div class="grid w-20 h-20 bg-base-300 place-items-center"><img class="w-20 bg-white rounded-md border" src="${item.image}" alt=""></div>
        </div>              
      </div>
      <div>
        <div class="flex gap-6 text-[14px]">
          <p># ${item.category} </p>
          <p>Author : ${item.author?.name} </p>
        </div>
        <h1 class="py-2 font-semibold text-xl">${item.title}</h1>
        <p class="text-[14px] lg:w-[500px]">${item.description}</p>
        <hr class="border-dashed my-3">
        <div class="flex justify-between items-start ">
          <div class="flex gap-6">
            <p class="flex gap-2"><img class="w-5 h-5" src="images/comment.png" alt=""><span>${item.comment_count}</span></p>
            <p class="flex gap-2"><img class="w-5 h-5" src="images/view.png" alt=""><span>${item.view_count}</span></p>
            <p class="flex gap-2"><img class="w-5 h-5" src="images/clock.png" alt=""><span>${item.posted_time}</span>min</p>
          </div>
          <div>
            <button onclick="btnMessage('${item.title}','${item.view_count}')" ><img class="w-7 h-6 bg-green-400 rounded-full p-1 text-white" src="images/mg.jpg" alt=""></button>
          </div>
        </div>
      </div>
  `;
    }

    cardPost.appendChild(div);
  });
  document.getElementById('loading-spinner').classList.add('hidden');
  
};

const cardLatestPost = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
  const data = await res.json();

  const cardLatestPost = document.getElementById("card-latest-post");
  data.forEach((item) => {
    const div = document.createElement("div");
    div.className = `p-4 border rounded-xl`;
    div.innerHTML = `        
              <div class="w-full h-64 rounded-lg bg-slate-400"><img class="w-[100%] h-[100%]" src="${item.cover_image}" alt=""></div>
              <div class="flex gap-2 my-3 text-opacity-45"><img class="w-6" src="images/date.png" alt=""> <p>${item.author.posted_date?item.author.posted_date:"No publish date"}</p></div>
              <h1 class="font-semibold my-2">${item.title}</h1>
              <p class="text-[14px] text-opacity-45">${item.description}</p>
              <div class="flex gap-4 mt-4 items-center">
                <img class="rounded-full w-12 h-12" src="${item.profile_image}" alt="">
                <div>
                  <h1 class="font-semibold">${item.author.name}</h1>
                  <p>${item.author.designation?item.author.designation:"Unknown"}</p>
                </div>
              </div>
            
        `;
    cardLatestPost.appendChild(div);
  });
};

let count = 1;
const btnMessage = (titleId, viewId) => {    
    const titleCard = document.getElementById("title-card");
    
  const div = document.createElement("div");
  div.className = `p-4 rounded-lg bg-white flex justify-between items-center mb-4`;
  div.innerHTML = `
            <h1 class="font-semibold text-xl">${titleId}</h1>
            <p class="flex gap-2 pr-4"><img class="w-5 h-5" src="images/view.png" alt=""><span>${viewId}</span></p>
    `;
    titleCard.appendChild(div)
    const readCount = document.getElementById('read-count');
    readCount.innerText = count;
    count++;
};

const handleSearch = () => {

  document.getElementById('loading-spinner').classList.remove('hidden');

  const inputValue = document.getElementById('input-box').value;
  if (inputValue) {
    const convertedValue = inputValue.charAt(0).toUpperCase()+inputValue.slice(1);
    if (convertedValue === 'Coding') {
      var changeApi = `posts?category=${convertedValue}`;
      setTimeout(() => {
        loadPost(changeApi)
      }, 2000);
      
    } else if (convertedValue === 'Comedy') {
      var changeApi = `posts?category=${convertedValue}`;
      setTimeout(() => {
        loadPost(changeApi)
      }, 2000);
    }else if (convertedValue === 'Music') {
      var changeApi = `posts?category=${convertedValue}`;
      setTimeout(() => {
        loadPost(changeApi)
      }, 2000);
    } else {
      alert('invalid input');
    }
  } else {
    alert('Please enter a input');
  }
}

cardLatestPost();
