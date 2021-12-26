const template = document.getElementById('template-card').content;

const fragment = document.createDocumentFragment();
const area = document.querySelector('.row')

const next = document.querySelector('#btn-next')
const prev = document.querySelector('#btn-prev')
console.log(prev);


async function fetchData(url='https://rickandmortyapi.com/api/character') {
    try {
        loading(true)
        await fetch(url)
        .then(res => res.json())
        .then(data => {            
            displayData(data)
            paginationBtn(data.info)
        })
        
    } catch (error) {
        console.log(error)    
    } finally {
        loading(false)
    }    
}

function displayData(data) {
    area.textContent=''
    data.results.forEach(item => {
        const clone = template.cloneNode(true);
        clone.querySelector('h5').textContent = item.name  
        clone.querySelector('img').setAttribute('src', item.image)
        clone.querySelector('p').textContent = item.species
            fragment.appendChild(clone);            
        })
        area.appendChild(fragment)
        }

function loading(bool) {
    const loading=document.querySelector('.loading')
    if (bool) {        
        loading.classList.remove('d-none');
    } else {
        loading.classList.add('d-none');        
    }
}

function paginationBtn(data) {
    console.log(data);
    if (data.prev == null) {               
        prev.disabled = true;
        next.dataset.next=data.next
        //next.setAttribute('href', data.next)
    }else if (data.prev != null) {               
        prev.disabled = false;
         prev.dataset.prev=data.prev
        next.dataset.next=data.next
        //next.setAttribute('href', data.next)
    } 
    else if (data.next == null) {
        next.disabled = true;
        prev.dataset.prev=data.prev
        //prev.setAttribute('href', data.prev)        
    }
}

prev.addEventListener('click', () => {
    console.log(prev.dataset.prev);
    fetchData(prev.dataset.prev)
})
next.addEventListener('click', () => {
    console.log(next.dataset.next);
    fetchData(next.dataset.next )
} )

fetchData();