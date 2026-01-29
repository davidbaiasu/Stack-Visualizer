const containerElement = document.getElementById('id-container');
const stackElement = document.getElementById('id-div-stack');
const rangeElement = document.getElementById('id-range-speed');

const popButtonElement = document.getElementById('id-pop-button');
const pushButtonElement = document.getElementById('id-push-button');
const peekButtonElement = document.getElementById('id-peek-button');
const sizeButtonElement = document.getElementById('id-size-button');
const flushButtonElement = document.getElementById('id-flush-button');
const searchButtonElement = document.getElementById('id-search-button');

const inputNumberElement = document.getElementById('id-input-number');
const resultElement = document.getElementById('id-result');

let timeOutValue = 500;
const MAX_STACK_SIZE = 10;
const nodeWidthMultiplier = 0.8;
const nodeHeightMultiplier = 0.1;
const defaultNodeColor = 'lightblue';
const actionNodeColor = 'pink';
const searchNodeColor = 'red';

let valueStack = [];
let animationFlag = false;

rangeElement.oninput = function(){
	
	timeOutValue = this.value * (-1);
	
}

function randomNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

function pushNode(){
	
	if( animationFlag === true ){
		return;
	}
	
	if( valueStack.length >= MAX_STACK_SIZE ){
		resultElement.innerText = "Stack is full";
		return;
	}
	
	const newNode = document.createElement('div');
	
	newNode.className = 'node';
	animationFlag = true;
	newNode.style.backgroundColor = actionNodeColor;
	newNode.style.transition = `all ${timeOutValue}ms ease-in-out`;
	
	const stackHeight = stackElement.clientHeight;
	const stackWidth = stackElement.clientWidth;
	const nodeWidth = stackWidth * nodeWidthMultiplier;
	const nodeHeight = stackHeight * nodeHeightMultiplier;
	
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
        
        const bottomPosition = stackHeight - (nodeHeight * valueStack.length);
        
        newNode.style.top = bottomPosition + 'px';
		setTimeout(() => { 
			newNode.style.backgroundColor = defaultNodeColor;
			animationFlag = false;
		}, timeOutValue);
		
		resultElement.innerText = "Pushed value " + newNodeValue;
		
    }, 0);
	
}

function popNode(){
	
	if( animationFlag === true ){
		return;
	}
	
	if( valueStack.length === 0 ){
		resultElement.innerText = "Stack is empty";
		return;
	}
	
	const deleteNode = stackElement.lastElementChild;
	const nodeHeight = deleteNode.clientHeight;
	
	deleteNode.style.backgroundColor = actionNodeColor;
	deleteNode.style.transition = `all ${timeOutValue}ms ease-in-out`;
	deleteNode.style.top = '-100px';
	animationFlag = true;
	
	popValue = valueStack[valueStack.length - 1]; 
	
	setTimeout(() => {
		
        deleteNode.remove();
		valueStack.pop();
		deleteNode.style.backgroundColor = defaultNodeColor;
		animationFlag = false;
		
    }, timeOutValue);
	
	resultElement.innerText = "Popped value " + popValue;
	
}

function peekStack(){
	
	if( animationFlag === true ){
		return;
	}
	
	if( valueStack.length === 0 ){
		resultElement.innerText = "Stack is empty";
		return;
	}
	
	animationFlag = true;
	
	const peekNode = stackElement.lastElementChild;
	peekNode.style.backgroundColor = actionNodeColor;
	
	setTimeout(() => {
		animationFlag = false;
		peekNode.style.backgroundColor = defaultNodeColor;
	}, 2 * timeOutValue);
	
	resultElement.innerText = "The value " + valueStack[valueStack.length - 1] + " is at the top";
	
}

function sizeStack(){
	
	if( animationFlag === true ){
		return;
	}
	
	if( valueStack.length == 0 ){
		resultElement.innerText = "Stack is empty";
	}
	
	else{
		resultElement.innerText = "Stack size is " + valueStack.length;
	}
	
}

function flushStack(){
	
	if( valueStack.length === 0 ){
		animationFlag = false;
		resultElement.innerText = "Stack flushed";
		return;
	}
	
	popNode();
	
	setTimeout(() => {
		flushStack();
	}, timeOutValue);
	
}

function searchStack(){
	
	const searchedValue = inputNumberElement.value;
	
	if( searchedValue === "" ){
		resultElement.innerText = "Searched number not inserted";
		return;
	}
	
	if( animationFlag === true ){
		return;
	}
	
	animationFlag = true;
	const stackNodes = Array.from(stackElement.children);
	
	stackNodes.forEach((node, index) => {
		
		node.style.transition = `background-color ${timeOutValue}ms ease-in-out`;
		
		setTimeout(() => {
			
			node.style.backgroundColor = actionNodeColor;
			
			setTimeout(() => {
				
				if( node.innerText === searchedValue ){
					node.style.backgroundColor = searchNodeColor;
				}
				
				else{
					node.style.backgroundColor = defaultNodeColor;
				}
				
				if( index == valueStack.length - 1 ){
					animationFlag = false;	
				}
				
			}, 2 * timeOutValue);

		}, index * 2 * timeOutValue);
		
	});
	
}

pushButtonElement.addEventListener('click', pushNode);
popButtonElement.addEventListener('click', popNode);
peekButtonElement.addEventListener('click', peekStack);
sizeButtonElement.addEventListener('click', sizeStack);
flushButtonElement.addEventListener('click', flushStack);
searchButtonElement.addEventListener('click', searchStack);