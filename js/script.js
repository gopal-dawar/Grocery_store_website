// Header scrolled shadow code
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });
});

// preloader code
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    const content = document.querySelector("preloader .content");

    preloader.style.display = "none";
    content.style.display = "block";
});

// page redirect 
document.querySelectorAll('.nav2 .nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = this.getAttribute('href');
    });
});

// page redirect animation stop
$(document).ready(function () {
    $('.nav2 a').on('click', function (e) {
        e.preventDefault();

        const targetId = $(this).attr('href');
        const targetOffset = $(targetId).offset().top;
        const navbarHeight = $('.navbar').outerHeight();

        $('html, body')
            .stop()
            .animate(
                {
                    scrollTop: targetOffset - navbarHeight,
                },
            );
    });
});

// form slide code
$(document).ready(function () {
    $('#signUp').click(function () {
        $('#formcontainer').addClass('right-panel-active');
    });

    $('#signIn').click(function () {
        $('#formcontainer').removeClass('right-panel-active');
    });

});

// form close or open
$(document).ready(function () {
    $('#formopen').click(function () {
        $('#loginorsinginform').fadeIn();
    });

    $('#formclose').click(function () {
        $('#loginorsinginform').fadeOut();
    });
});

// form ok btn of successfully login or singi
$(document).ready(function () {
    $('#okbtn').click(function () {
        $('#popup3').fadeOut();
        $('#loginorsinginform').fadeOut();
    });
});

// form
$(document).ready(function () {
    // singin
    $('#msg1').fadeOut();
    $('#singin').on('click', function (e) {
        e.preventDefault();
        const form = $(this).closest('form')[0];
        if (form.checkValidity()) {
            form.submit();
            $('#msg2').fadeIn();
            $("#popup3").css({
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
            }).fadeIn();

        } else {
            alert('Please fill out all required fields correctly.');
        }
    });
    // login
    $('#msg2').fadeOut();
    $('#login').on('click', function (e) {
        e.preventDefault();
        const form = $(this).closest('form')[0];
        if (form.checkValidity()) {
            form.submit();
            $('#msg1').fadeIn();
            $("#popup3").css({
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
            }).fadeIn();
        } else {
            alert('Please fill out all required fields correctly.');
        }
    });
    $("#okbtn").click(function () {
        $("#popup3").fadeOut();
    });
});

// shoping card 
$(document).ready(function () {
    $('#shoppingCartIcon').on('click', function (event) {
        event.preventDefault();

        if ($('.addtocard').is(':visible')) {
            $('.addtocard').fadeIn();
            $('.backtoshop').fadeIn();
            $('body').removeClass('no-scroll');
        } else {
            $('.addtocard').fadeIn();
            $('body').addClass('no-scroll');
        }
    });

    // card close
    $('.backtoshop').on('click', function () {
        $('.addtocard').fadeOut();
        $('body').removeClass('no-scroll');
    });

    // card close
    $('.cardclose').on('click', function () {
        $('.addtocard').fadeOut();
        $('body').removeClass('no-scroll');
    })
});

// menu open or close
$(document).ready(function () {
    $(".menu").click(function () {
        $(".nav2").stop().slideToggle(400, "swing");
    });
});
// end

// card functionality
$(document).ready(function () {
    const cartItems = [];

    function renderCartItems() {
        const $cartItems = $('#cartItems');
        $cartItems.empty();

        cartItems.forEach(item => {
            const itemHtml = `
        <div class="row  mb-4 d-flex justify-content-between align-items-center" data-id="${item.id}" >
            <div class="clear col-md-2 col-lg-2 col-xl-2">
                <img src="${item.image}" class="img-fluid rounded-3" alt="${item.name}">
            </div>
            <div class="clear col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-muted">${item.description || ''}</h6>
                <h6 class="text-black mb-0">${item.name}</h6>
            </div>
            <div class="clear col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-2 decrease-quantity">
                    <i class="fas fa-minus"></i>
                </button>
                <input id="form${item.id}" min="0" name="quantity" value="${item.quantity}" type="number"
                    class="form-control form-control-sm item-quantity" />
                <button class="btn btn-link px-2 increase-quantity">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="clear col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0">₹ ${item.price.toFixed(2)}</h6>
            </div>
            <div class="clear col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-muted remove-item"><i class="fas fa-times"></i></a>
            </div>
        </div>
        <hr class="my-4">
    `;
            $cartItems.append(itemHtml);
        });

        updateSummary();
    }

    function updateSummary() {
        const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shippingCost = parseFloat($('#shippingSelect').val() || 0);
        const total = subtotal + shippingCost;

        $('#itemCount').text(`${itemCount} item${itemCount !== 1 ? 's' : ''}`);
        $('#summaryItemCount').text(itemCount);
        $('#subtotal').text(`₹ ${subtotal.toFixed(2)}`);
        $('#totalPrice').text(`₹ ${total.toFixed(2)}`);
    }

    function addToCart(product) {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }
        renderCartItems();
    }

    $('.add-to-cart').on('click', function () {
        const $card = $(this).closest('.product-card');
        const product = {
            id: $card.data('id'),
            name: $card.data('name'),
            price: parseFloat($card.data('price')),
            image: $card.data('image'),
        };
        addToCart(product);
    });

    $(document).ready(function () {
        let cartCount = 0;

        $('.add-to-cart').on('click', function () {
            cartCount++;
            $('.count').text(cartCount);

        });
    });

    $(document).on('click', '.increase-quantity', function () {
        const id = $(this).closest('.row').data('id');
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
            renderCartItems();
        }
    });

    // register btn functions
    $(document).ready(function () {
        $('.register').on('click', function () {
            $('#popup1').css({
                'display': 'flex',
                'justify- content': 'center',
                'align - items': 'center',
                'backdrop - filter': 'blur(10px)',
            }).fadeIn();
            setTimeout(() => {
                $('#popup1  ').fadeOut();
            }, 2000);
            $('.addtocard').fadeOut();
            $('body').removeClass('no-scroll');
            $('.clear').empty();


            const Value1 = $('.count').data('default');
            const Value2 = $('#subtotal').data('default');
            const Value3 = $('#totalPrice').data('default');
            const Value4 = $('#summaryItemCount').data('default');
            const Value5 = $('#itemCount').data('default');

            $('.count').text(Value1);
            $('#subtotal').text(Value2);
            $('#totalPrice').text(Value3);
            $('#summaryItemCount').text(Value4);
            $('#itemCount').text(Value5);
        });
    });


    $(document).on('click', '.decrease-quantity', function () {
        const id = $(this).closest('.row').data('id');
        const item = cartItems.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            renderCartItems();
        } else if (item) {
            const index = cartItems.indexOf(item);
            cartItems.splice(index, 1);
            renderCartItems();
        }
    });

    $(document).on('click', '.remove-item', function () {
        const id = $(this).closest('.row').data('id');
        const index = cartItems.findIndex(item => item.id === id);
        if (index !== -1) {
            cartItems.splice(index, 1);
            renderCartItems();
        }
    });

    $('#shippingSelect').on('change', updateSummary);

    renderCartItems();
});

// end


// Popup2 message box, which is continuously shown
$(document).ready(function () {
    const messages = [
        "🔥 Best Sell Offer: <span class='highlight'>Flat 50% Off!</span> 🔥",
        "🎉 Limited Time: <span class='highlight'>Buy 1 Get 1 Free!</span> 🎉",
        "💥 Flash Sale: <span class='highlight'>Up to 70% Off!</span> 💥",
        "🚀 Hurry Up: <span class='highlight'>Free Shipping on All Orders!</span> 🚀"
    ];
    let messageIndex = 0;
    function showPopup() {
        $('#popupMessage').html(messages[messageIndex]);
        $('#popup2').addClass('show');
        setTimeout(() => {
            $('#popup2').removeClass('show');
            messageIndex = (messageIndex + 1) % messages.length;
        }, 8000);
    }
    setInterval(() => {
        showPopup();
    }, 6000);
});


// search filter functionality
$(document).ready(function () {
    let searchData = ["Apple", "Orange", "Banana", "Mango", "Strawberry"];

    $(".firstsearch input").on("input", function () {
        let query = $(this).val().toLowerCase();
        let resultsContainer = $("#searchResults");

        resultsContainer.empty().hide();

        if (query.length > 0) {
            let filteredResults = searchData.filter(item => item.toLowerCase().includes(query));

            if (filteredResults.length > 0) {
                filteredResults.forEach(result => {
                    resultsContainer.append(`<li class="list-group-item"><a href="#">${result}</a></li>`);
                });
                resultsContainer.show();
            } else {
                resultsContainer.append(`<li class="list-group-item text-muted">No results found</li>`).show();
            }
        }
    });

    $(document).on("click", "#searchResults li", function () {
        $(".firstsearch input").val($(this).text());
        $("#searchResults").hide();
    });

    $(document).click(function (e) {
        if (!$(e.target).closest(".firstsearch, #searchResults").length) {
            $("#searchResults").hide();
        }
    });
});
