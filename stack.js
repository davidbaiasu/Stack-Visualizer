const containerElement = document.getElementById('id-container');
const stackElement = document.getElementById('id-div-stack');

const pushButtonElement = document.getElementById('id-push-button');
const inputNumberElement = document.getElementById('id-input-number');

let scriptStack = [];

function randomNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

function pushNode(){
	
	const newNode = document.createElement('div');
	newNode.className = 'node';
	
	const stackHeight = stackElement.clientHeight;
	const stackWidth = stackElement.clientWidth;
	const nodeWidth = stackWidth * 0.8;
	const nodeHeight = stackHeight * 0.1;
	
	newNode.style.width = nodeWidth + 'px';
    newNode.style.height = nodeHeight + 'px';
	newNode.style.left = (stackWidth - nodeWidth) / 2 + 'px';
	newNode.style.top = '-' + nodeHeight + 'px';
	
	let newNodeValue = inputNumberElement.value;
	
	if( newNodeValue === "" ){
		newNodeValue = randomNumber();
	}
	
	newNode.innerText = newNodeValue;
	
	stackElement.appendChild(newNode);
	
	setTimeout(() => {
        
        const currentItems = stackElement.getElementsByClassName('node').length - 1;
        const bottomPosition = stackHeight - (nodeHeight * (currentItems + 1));
        
        newNode.style.top = bottomPosition + 'px';
		
    }, 5);
	
}

pushButtonElement.addEventListener('click', pushNode);

