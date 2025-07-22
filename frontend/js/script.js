var sidenav = document.querySelector(".side-navbar");

function showNavbar() {
    if (sidenav) sidenav.style.left = "0";
}

function removeNavbar() {
    if (sidenav) sidenav.style.left = "-60%";
}

document.addEventListener("DOMContentLoaded", function () {

    var productContainer = document.getElementById("product");
    var search = document.getElementById("search");
    var noResultsMessage = document.getElementById("noResults");

    if (productContainer && search) {
        var productlist = productContainer.querySelectorAll("div");

        search.addEventListener("keyup", function (event) {
            var enteredvalue = event.target.value.toUpperCase();
            var hasResults = false;

            productlist.forEach(function (product) {
                var productNameElement = product.querySelector("p");
                if (productNameElement) {
                    var productname = productNameElement.textContent;
                    if (productname.toUpperCase().indexOf(enteredvalue) < 0) {
                        product.style.display = "none";
                    } else {
                        product.style.display = "block";
                        hasResults = true;
                    }
                }
            });

            if (noResultsMessage) {
                noResultsMessage.style.display = hasResults ? "none" : "block";
            }
        });
    }
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    var customerName = document.getElementById("name")
    var customerEmail = document.getElementById("email")
    var customerFeedback = document.getElementById("message")
    var response = await fetch('http://localhost:7700/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: customerName.value, 
                               email: customerEmail.value, 
                               feedback: customerFeedback.value 
                            })
    })
    const data = await response.json();
    if (response.status === 200) {
        customerName.value = "";
        customerEmail.value = "";
        customerFeedback.value = "";
        alert('Submitted successfully!!!')
        console.log(data);
    }
    else {
        alert("something went wrong!")
    }
})
