const cardList = document.querySelector('#card-list')

function createCard({ title, image }) {
    const card = document.createElement('div')
    const cardTitle = document.createElement('h1')
    const cardImg = document.createElement('img')

    cardTitle.textContent = title
    cardImg.src = image || ''
    cardImg.classList.add(
        'w-full', 'h-120', 'object-cover', 'rounded-lg', 'border', 'border-white/20'
    )

    card.classList.add(
        'group', 'text-xl', 'p-4', 'rounded-xl', 'border', 'border-red-500/60',
        'bg-slate-900/40', 'backdrop-blur',
        'shadow-[0_20px_40px_rgba(0,0,0,0.45)]',
        'transition', 'duration-300', 'hover:-translate-y-1',
        'hover:shadow-[0_30px_60px_rgba(202,43,53,0.35)]'
    )
    cardTitle.classList.add('font-semibold', 'tracking-wide', 'text-red-200', 'mb-3')

    card.appendChild(cardTitle)
    card.appendChild(cardImg)
    return card
}

function renderFromApi(url, mapItem) {
    if (!cardList) return
    cardList.replaceChildren()
    fetch(url)
        .then(r => r.json())
        .then(data => {
            data.forEach(item => {
                const { title, image } = mapItem(item)
                cardList.appendChild(createCard({ title, image }))
            })
        })
        .catch(console.error)
}

const pageLoaders = {
    characters: () => renderFromApi('https://hawapi.theproject.id/api/v1/characters/', (item) => ({
        title: item.first_name,
        image: item.images?.[2]
    })),
    episodes: () => renderFromApi('https://hawapi.theproject.id/api/v1/episodes/', (item) => ({
        title: item.title,
        image: item.thumbnails?.[0] || item.thumbnail || item.images?.[0]
    })),
    locations: () => renderFromApi('https://hawapi.theproject.id/api/v1/locations/', (item) => ({
        title: item.title,
        image: item.thumbnails?.[0] || item.thumbnail || item.images?.[0]
    })),
    seasons: () => renderFromApi('https://hawapi.theproject.id/api/v1/seasons/', (item) => ({
        title: item.title,
        image: item.thumbnails?.[0] || item.thumbnail || item.images?.[0]
    }))
}

const currentPage = document.body?.dataset?.page
if (currentPage && pageLoaders[currentPage]) {
    pageLoaders[currentPage]()
}
