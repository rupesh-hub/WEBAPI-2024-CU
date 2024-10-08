var text = "This is new text";

function changeText() {
  let article = document.getElementById("article");
  let temp = article.textContent;
  article.textContent = text;
  text = temp;
}
