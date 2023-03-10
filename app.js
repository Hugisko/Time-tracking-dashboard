const time = document.querySelectorAll('li');
const cards = document.querySelectorAll('.card');

async function dataLoad(selected) {
    try {
        const resp = await fetch('./data.json');
        const data = await resp.json(); 
        data.forEach((e) => {
            const title = e.title;
            cards.forEach(card => {
                const name = card.id; 
                if(name === title) {
                    const current = card.querySelector('.current');
                    const previous = card.querySelector('.previous');
                    const currentValue = e.timeframes[selected].current;
                    const previousValue = e.timeframes[selected].previous;
                    let previousTime = 'Last Week';
                    if(selected === 'daily') {
                        previousTime = 'Yesterday';
                    }else if(selected === 'monthly') {
                        previousTime = 'Last Month';
                    }
                    current.innerText = `${currentValue}hrs`;
                    previous.innerText = `${previousTime} - ${previousValue}hrs`;
                }      
            });
        });
    } catch (error) {
        console.log(error);
    }
}


time.forEach(link => {
    link.addEventListener('click', () => {
        time.forEach(e => {
            if(e.classList.contains('active')){
                e.classList.remove('active');
            }
        });
        link.classList.add('active');
        const selected = link.classList[0];
        dataLoad(selected);
    });
});

