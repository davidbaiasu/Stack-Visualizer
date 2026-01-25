const containerElement = document.getElementById('id-container');
const stackElement = document.getElementById('id-div-stack');

const popButtonElement = document.getElementById('id-pop-button');
const pushButtonElement = document.getElementById('id-push-button');
const inputNumberElement = document.getElementById('id-input-number');

const MAX_STACK_SIZE = 10;

let valueStack = [];
let animationFlag = false;

function randomNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

function pushNode(){
	
	if( valueStack.length >= MAX_STACK_SIZE || animationFlag === true ){
		return;
	}
	
	const newNode = document.createElement('div');
	newNode.className = 'node';
	animationFlag = true;
	
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
	
	valueStack.push(newNodeValue);
	newNode.innerText = newNodeValue;
	
	stackElement.appendChild(newNode);
	
	setTimeout(() => {
        
        const currLength = stackElement.getElementsByClassName('node').length - 1;
        const bottomPosition = stackHeight - (nodeHeight * (currLength + 1));
        
        newNode.style.top = bottomPosition + 'px';
		setTimeout(() => { 
			animationFlag = false; 
		}, 500);
		
    }, 0);
	
}

function popNode(){
	
	if( valueStack.length === 0 ){
		return;
	}
	
	const deleteNode = stackElement.lastElementChild;
	const nodeHeight = deleteNode.clientHeight;
	
	deleteNode.style.top = '-100px';
	animationFlag = true;
	
	setTimeout(() => {
        deleteNode.remove();
		valueStack.pop();
		animationFlag = false;
    }, 500);
	
}

pushButtonElement.addEventListener('click', pushNode);
popButtonElement.addEventListener('click', popNode);

