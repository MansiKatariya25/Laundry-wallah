document.addEventListener("DOMContentLoaded", function() {
    const services = [
        { id: 1, name: 'Dry Cleaning', price: 200, image: 'dryclean.jpg' },
        { id: 2, name: 'Ironing', price: 100, image: 'ironing.png' },
        { id: 3, name: 'Wedding Dress Cleaning', price: 1000, image: 'weddingclean.jpg' },
        { id: 4, name: 'Wash And Fold', price: 500, image: 'washfold.jpg' },
        { id: 5, name: 'Stain Remove', price: 400, image: 'stainremove.jpg' },
    ];

    let currentItemIndex = 0;
    let cart = [];
    let totalAmount = 0;

    const serviceContainer = document.getElementById('service-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountDisplay = document.getElementById('total-amount');
    const skipItemButton = document.getElementById('skip-item');
    const addItemButton = document.getElementById('add-item');
    const bookNowButton = document.getElementById('book-now');
    const bookingMessage = document.getElementById('booking-message');


    function displayService(index) {
        serviceContainer.innerHTML = '';
        const service = services[index];
        const serviceDiv = document.createElement('div');
        serviceDiv.className = 'service';
        serviceDiv.innerHTML = `
            <img src="${service.image}" alt="${service.name}" class="service-image">
            <h3>${service.name}</h3>
            <p>Price: ₹${service.price}</p>
        `;
        serviceContainer.appendChild(serviceDiv);
    }

    function addToCart(service) {
        console.log(`Adding to cart: ${service.name}`);
        cart.push(service);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        totalAmount = 0;

        if (cart.length === 0) {
            const emptyCartRow = document.createElement('tr');
            emptyCartRow.innerHTML = `
                <td colspan="3" class="empty-cart">
                    <span class="material-symbols-outlined" id="symbol">error</span>
                    No Items Added
                    <br>
                    Add items to the cart from the service bar
                </td>
            `;
            cartItemsContainer.appendChild(emptyCartRow);
        } else {
            cart.forEach((item, index) => {
                const cartItemRow = document.createElement('tr');
                cartItemRow.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>₹${item.price}</td>
                `;
                cartItemsContainer.appendChild(cartItemRow);
                totalAmount += item.price;
            });
        }

        totalAmountDisplay.textContent = `₹ ${totalAmount}`;
        console.log(`Total Amount: ₹ ${totalAmount}`);
    }

    skipItemButton.addEventListener('click', function() {
        currentItemIndex = (currentItemIndex + 1) % services.length;
        displayService(currentItemIndex);
    });

    addItemButton.addEventListener('click', function() {
        addToCart(services[currentItemIndex]);
        currentItemIndex = (currentItemIndex + 1) % services.length;
        displayService(currentItemIndex);
    });

    bookNowButton.addEventListener('click', function() {
        if (cart.length === 0) {
            bookingMessage.textContent = 'Please add items to the cart to book';
            bookingMessage.style.color = 'red';
        } else {
            bookingMessage.textContent = 'Thankyou for contacting, We will get back to you soon!';
            bookingMessage.style.color = 'green';
            // Proceed with booking logic here
        }
    });

    displayService(currentItemIndex);
});
