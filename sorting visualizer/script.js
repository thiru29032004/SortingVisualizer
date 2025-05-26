let speed = 100; // default speed

// Generate bars when array size changes
function generateBars() {
    const arrSize = document.getElementById('arrsize').value;
    const barsContainer = document.getElementById('bars');
    barsContainer.innerHTML = '';

    for (let i = 0; i < arrSize; i++) {
        const height = Math.floor(Math.random() * 200) + 20;
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${height}px`;
        bar.style.width = '20px';
        bar.style.backgroundColor = 'steelblue';
        bar.style.display = 'inline-block';
        bar.style.margin = '2px';
        barsContainer.appendChild(bar);
    }
}

// Handle sort button
function sortBars() {
    const selectedAlgo = document.getElementById('algo-select').value;
    const speedValue = document.getElementById('speed').value;

    // Set speed
    if (speedValue === 'slow') speed = 300;
    else if (speedValue === 'medium') speed = 150;
    else if (speedValue === 'high') speed = 50;
    else speed = 150; // default

    if (selectedAlgo === 'bubbleSort') {
        bubbleSort();
    } else if (selectedAlgo === 'insertionSort') {
        insertionSort();
    } else if (selectedAlgo === 'mergeSort') {
        mergeSort();
    } else {
        alert("Please select a valid sorting algorithm.");
    }
}

// Bubble Sort with animation
async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            await new Promise(resolve => setTimeout(resolve, speed));

            const h1 = parseInt(bars[j].style.height);
            const h2 = parseInt(bars[j + 1].style.height);

            if (h1 > h2) {
                bars[j].style.height = `${h2}px`;
                bars[j + 1].style.height = `${h1}px`;
            }

            bars[j].style.backgroundColor = 'steelblue';
            bars[j + 1].style.backgroundColor = 'steelblue';
        }
    }
}

// Insertion Sort with animation
async function insertionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 1; i < bars.length; i++) {
        let key = parseInt(bars[i].style.height);
        let j = i - 1;

        bars[i].style.backgroundColor = 'orange';
        await new Promise(resolve => setTimeout(resolve, speed));

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            bars[j + 1].style.height = bars[j].style.height;
            bars[j].style.backgroundColor = 'red';
            j--;
            await new Promise(resolve => setTimeout(resolve, speed));
        }

        bars[j + 1].style.height = `${key}px`;

        for (let k = 0; k <= i; k++) {
            bars[k].style.backgroundColor = 'steelblue';
        }
    }
}

// Merge Sort integration
async function mergeSort(start = 0, end = null) {
    const bars = document.querySelectorAll('.bar');
    if (end === null) end = bars.length - 1;
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const bars = document.querySelectorAll('.bar');
    const left = [], right = [];

    for (let i = start; i <= mid; i++) {
        left.push(parseInt(bars[i].style.height));
        bars[i].style.backgroundColor = 'yellow';
    }

    for (let i = mid + 1; i <= end; i++) {
        right.push(parseInt(bars[i].style.height));
        bars[i].style.backgroundColor = 'green';
    }

    await new Promise(resolve => setTimeout(resolve, speed));

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            bars[k++].style.height = `${left[i++]}px`;
        } else {
            bars[k++].style.height = `${right[j++]}px`;
        }
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    while (i < left.length) {
        bars[k++].style.height = `${left[i++]}px`;
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    while (j < right.length) {
        bars[k++].style.height = `${right[j++]}px`;
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    for (let i = start; i <= end; i++) {
        bars[i].style.backgroundColor = 'steelblue';
    }
}
