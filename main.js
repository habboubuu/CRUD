// kan3aytu 3la inputs
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

//console.log(title, price, taxes, ads, discount, total, count, category) // nta2kdu mn dakchi lankunu ghlatna f tasmiya!


// motaghyer dyal button create w update
let mood = 'create';
let tmp; // motaghayer mosa3d f update and create





//   ------GET TOTAL------
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value; // kan7utu + bach n7awlu mn string l number
        total.innerHTML = result;
        total.style.background = '#040'; // fach t7a9e9 if condition ytbadl ta background dyal total
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

//   ----------------------------- CREATE PRODUCT ------------------------------ 
//let dataPro = [];
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != '' && price.value !='' && category.value !='' && newPro.count < 100){
        // motaghyer dyal button create w update
        if(mood === 'create'){
            // count
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);  // push kadif data f array
                }
            }else{ // fihal chi had dakhel ra9m salb -2 or -1
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create' //layrud mood create fach ndir update
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    clearData()
    }
//--------------------------------  SAVE IN LOCAL STORAGE  ------------------------------- 
    localStorage.setItem('product', JSON.stringify(dataPro))
    console.log(dataPro) //bach nta2kdu mn khdma
    
    showData()
}

//   ---------------------------- CLEAR INPUTE ---------------------------------------
//fach nbruk 3la create data die clear automatic
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//   ---------READ--------
function showData()
{
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length; i++){             //+= bach kula mara ydif saf jdid w maymsa7x saf l9dim
      table += `   
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update">update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
        </tr>
        `
        
    }

    document.getElementById('tbody').innerHTML = table;
    //button DeleteAll
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> Delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData()

//   -------DELETE-------
// button delete 
function deleteData(i)
{
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}
//button delete all
function  deleteAll(){
    localStorage.clear()
    dataPro.splice(0) // bach ymsa7 mn 0 tal lakher
    showData()
}

//   -------UPDATE-------
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal() // bach yt7sab total
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update'; // nbdlu button mn create l update
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

//   -------SEARCH--------

let searchMood = 'title';

function getSearchMood(id) //kandiw function l button html
{
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
search.focus() // bach ila brakt 3la button title wla category ydir focus!
search.value = ''; //bach tkhawa search fach nbdl button
showData() 
}




function searchData(value)  //kandi function search data l input search
{
    let table = '';
    if(searchMood == 'title') // fach kaykuno data f array wbghina n9albu 3lihum kandiro loop!
    {
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `   
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                </tr>
                `;

            }
        }

    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                </tr>
                `;

            }
        }

    }
    document.getElementById('tbody').innerHTML = table; // fblast manktbha f if w else nktbha hna


}

//   -------CLEAN DATA-----------



