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
