/*function myFunction()
{
	alert(localStorage.getItem('favoriteflavor'));
	document.getElementById("demo").innerHTML="My First JavaScript Function";
	localStorage.setItem('comment','An insightful comment.');
	document.getElementById("demo").innerHTML=localStorage.getItem('favoriteflavor');
	localStorage.setItem('favoriteflavor','chocolate');
}
*/
function storeComment() {
	var input = document.getElementById("saveServer");
	var slug = document.getElementById("hiddenSlug"); 
	//alert(slug.innerHTML);
	localStorage.setItem(slug.innerHTML,input.value);

}

function showComment() {
	var slug = document.getElementById("hiddenSlug"); 
	document.write(localStorage.getItem(slug.innerHTML))
}