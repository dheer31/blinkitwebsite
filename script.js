// Initialize AngularJS Module
var app = angular.module('blinkitApp', []);

app.controller('BlinkitController', ['$scope', '$timeout', function($scope, $timeout) {
    // Categories List
    $scope.categories = [
        { name: "Vegetables & Fruits", icon: "🥦" },
        { name: "Dairy & Breakfast", icon: "🥛" },
        { name: "Munchies", icon: "🍟" },
        { name: "Cold Drinks", icon: "🥤" },
        { name: "Instant Food", icon: "🍜" },
        { name: "Tea & Coffee", icon: "☕" },
        { name: "Bakery", icon: "🍞" },
        { name: "Sweet Tooth", icon: "🍫" },
        { name: "Baby Care", icon: "👶" },
        { name: "Cleaning", icon: "🧹" }
    ];

    // Mock Products
    $scope.products = [
        { id: 1, name: "Amul Taaza Toned Fresh Milk", weight: "500 ml", price: 27, icon: "🥛", category: "Dairy & Breakfast", rating: 4.8 },
        { id: 2, name: "Mother Dairy Full Cream Milk", weight: "500 ml", price: 34, icon: "🥛", category: "Dairy & Breakfast", rating: 4.7 },
        { id: 3, name: "Lay's India's Magic Masala Chips", weight: "50 g", price: 20, icon: "🥔", category: "Munchies", rating: 4.5 },
        { id: 4, name: "Coca-Cola Soft Drink", weight: "750 ml", price: 40, icon: "🥤", category: "Cold Drinks", rating: 4.4 },
        { id: 5, name: "Maggi 2-Minute Masala Noodles", weight: "70 g", price: 14, icon: "🍜", category: "Instant Food", rating: 4.9 },
        { id: 6, name: "Brown Bread", weight: "400 g", price: 45, icon: "🍞", category: "Bakery", rating: 4.6 },
        { id: 7, name: "Farm Fresh Tomato", weight: "1 kg", price: 34, icon: "🍅", category: "Vegetables & Fruits", rating: 4.3 },
        { id: 8, name: "Onion", weight: "1 kg", price: 55, icon: "🧅", category: "Vegetables & Fruits", rating: 4.5 },
        { id: 9, name: "Britannia Little Hearts Biscuits", weight: "75 g", price: 25, icon: "🍪", category: "Munchies", rating: 4.7 },
        { id: 10, name: "Sprite Lime Soft Drink", weight: "750 ml", price: 40, icon: "🥤", category: "Cold Drinks", rating: 4.6 },
        { id: 11, name: "Organic Cavendish Bananas", weight: "500 g", price: 30, icon: "🍌", category: "Vegetables & Fruits", rating: 4.8 },
        { id: 12, name: "Nestle Everyday Ghee Pure Cow", weight: "1 L", price: 650, icon: "🏺", category: "Dairy & Breakfast", rating: 4.9 },
        { id: 13, name: "Kurkure Masala Munch Chips", weight: "90 g", price: 20, icon: "🌶️", category: "Munchies", rating: 4.4 },
        { id: 14, name: "Nescafe Classic Coffee Jar", weight: "100 g", price: 320, icon: "☕", category: "Tea & Coffee", rating: 4.8 },
        { id: 15, name: "Brooke Bond Red Label Tea", weight: "500 g", price: 190, icon: "🍃", category: "Tea & Coffee", rating: 4.7 },
        { id: 16, name: "Oreo Biscuit Vanilla Cream", weight: "120 g", price: 35, icon: "🍪", category: "Sweet Tooth", rating: 4.5 },
        { id: 17, name: "Cadbury Dairy Milk Silk Chocolate", weight: "100 g", price: 80, icon: "🍫", category: "Sweet Tooth", rating: 4.9 },
        { id: 18, name: "Pampers Fresh Baby Wipes Pack", weight: "80 pcs", price: 199, icon: "👶", category: "Baby Care", rating: 4.7 },
        { id: 19, name: "Harpic Power Toilet Cleaner", weight: "500 ml", price: 105, icon: "🧹", category: "Cleaning", rating: 4.6 },
        { id: 20, name: "Vim Liquid Gel Dishwasher Lemon", weight: "750 ml", price: 155, icon: "🍋", category: "Cleaning", rating: 4.8 }
    ];

    // User Data
    $scope.user = {
        isLoggedIn: false, // Start logged out to verify registration flow
        name: "",
        email: "",
        phone: "",
        address: "123, Luxury Residency, HSR Layout",
        city: "Bangalore, KA",
        zip: "560102"
    };

    // User Forms data
    $scope.loginForm = { name: '', email: '' };
    $scope.addressForm = { address: '', city: '', zip: '' };

    // Search and Category filters
    $scope.selectedCategory = '';
    $scope.searchQuery = '';

    // Cart items container: { product: Object, quantity: Number }
    $scope.cart = [];

    // Coupon Database
    $scope.coupons = [
        { code: 'BLINKIT15', description: '15% Discount on orders above ₹200', discountPercent: 15, minAmount: 200 },
        { code: 'FREESHIP', description: 'Free delivery on all orders', discountPercent: 0, minAmount: 0, freeShipping: true },
        { code: 'SUPER50', description: '₹50 Flat Discount on orders above ₹500', discountFlat: 50, minAmount: 500 }
    ];
    $scope.couponCodeInput = '';
    $scope.appliedCoupon = null;
    $scope.couponMessage = '';
    $scope.couponSuccess = false;

    // Checkout Details
    $scope.selectedPayment = 'upi';
    $scope.activeOrder = null;
    $scope.orders = [
        {
            id: 'BK-78932',
            date: 'July 11, 2026',
            items: [
                { name: 'Mother Dairy Full Cream Milk', quantity: 2, price: 34 },
                { name: 'Maggi 2-Minute Masala Noodles', quantity: 5, price: 14 }
            ],
            total: 138,
            status: 'Delivered'
        }
    ];

    // Tracking Progress Steps
    $scope.deliveryStages = [
        { name: 'Order Confirmed', description: 'We have received and approved your order.', icon: 'fa-clipboard-check', status: 'pending' },
        { name: 'Packing Items', description: 'Store agent is wrapping your fresh items.', icon: 'fa-box', status: 'pending' },
        { name: 'Out for Delivery', description: 'Our delivery partner is on the way.', icon: 'fa-motorcycle', status: 'pending' },
        { name: 'Arrived', description: 'Delivered safely at your doorstep!', icon: 'fa-home', status: 'pending' }
    ];
    $scope.deliveryTimeLeft = 480; // 8 mins in seconds
    $scope.timerInterval = null;

    // Category Selector
    $scope.setCategory = function(catName) {
        $scope.selectedCategory = $scope.selectedCategory === catName ? '' : catName;
    };

    // Cart Helper Actions
    $scope.addToCart = function(product) {
        var existing = $scope.cart.find(function(item) {
            return item.product.id === product.id;
        });

        if (existing) {
            existing.quantity++;
        } else {
            $scope.cart.push({ product: product, quantity: 1 });
        }
        $scope.checkCouponValidity();
    };

    $scope.removeFromCart = function(product) {
        var idx = -1;
        for (var i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].product.id === product.id) {
                idx = i;
                break;
            }
        }

        if (idx !== -1) {
            if ($scope.cart[idx].quantity > 1) {
                $scope.cart[idx].quantity--;
            } else {
                $scope.cart.splice(idx, 1);
            }
        }
        $scope.checkCouponValidity();
    };

    $scope.getProductQty = function(productId) {
        var item = $scope.cart.find(function(item) {
            return item.product.id === productId;
        });
        return item ? item.quantity : 0;
    };

    $scope.getCartCount = function() {
        var total = 0;
        angular.forEach($scope.cart, function(item) {
            total += item.quantity;
        });
        return total;
    };

    $scope.getItemTotal = function() {
        var total = 0;
        angular.forEach($scope.cart, function(item) {
            total += item.product.price * item.quantity;
        });
        return total;
    };

    $scope.getDeliveryCharge = function() {
        var total = $scope.getItemTotal();
        if (total === 0) return 0;
        if ($scope.appliedCoupon && $scope.appliedCoupon.freeShipping) return 0;
        return total > 150 ? 0 : 25; 
    };

    $scope.getDiscountAmount = function() {
        var subtotal = $scope.getItemTotal();
        if (!$scope.appliedCoupon) return 0;
        
        if ($scope.appliedCoupon.discountPercent) {
            return Math.round((subtotal * $scope.appliedCoupon.discountPercent) / 100);
        } else if ($scope.appliedCoupon.discountFlat) {
            return $scope.appliedCoupon.discountFlat;
        }
        return 0;
    };

    $scope.getHandlingFee = function() {
        return $scope.getItemTotal() > 0 ? 4 : 0; 
    };

    $scope.getGrandTotal = function() {
        var subtotal = $scope.getItemTotal();
        if (subtotal === 0) return 0;
        var delivery = $scope.getDeliveryCharge();
        var handling = $scope.getHandlingFee();
        var discount = $scope.getDiscountAmount();
        return Math.max(0, subtotal + delivery + handling - discount);
    };

    // Coupon logic
    $scope.applyCoupon = function(code) {
        if (!code) return;
        var upperCode = code.toUpperCase();
        var coupon = $scope.coupons.find(function(c) {
            return c.code === upperCode;
        });

        if (!coupon) {
            $scope.couponMessage = 'Invalid promo code';
            $scope.couponSuccess = false;
            return;
        }

        var subtotal = $scope.getItemTotal();
        if (subtotal < coupon.minAmount) {
            $scope.couponMessage = 'Minimum order value of ₹' + coupon.minAmount + ' required for this coupon';
            $scope.couponSuccess = false;
            return;
        }

        $scope.appliedCoupon = coupon;
        $scope.couponMessage = 'Coupon applied successfully!';
        $scope.couponSuccess = true;
        $scope.couponCodeInput = '';
    };

    $scope.removeCoupon = function() {
        $scope.appliedCoupon = null;
        $scope.couponMessage = '';
        $scope.couponSuccess = false;
    };

    $scope.checkCouponValidity = function() {
        if (!$scope.appliedCoupon) return;
        var subtotal = $scope.getItemTotal();
        if (subtotal === 0) {
            $scope.removeCoupon();
        } else if (subtotal < $scope.appliedCoupon.minAmount) {
            $scope.couponMessage = 'Coupon removed. Min order value required: ₹' + $scope.appliedCoupon.minAmount;
            $scope.couponSuccess = false;
            $scope.appliedCoupon = null;
        }
    };

    // Modals control
    $scope.openLoginModal = function() {
        $scope.loginForm = { name: '', email: '' };
        var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    };

    // Direct User Registration (No OTP Verification Needed)
    $scope.registerUser = function() {
        if (!$scope.loginForm.name || !$scope.loginForm.email) return;

        $scope.user.name = $scope.loginForm.name;
        $scope.user.email = $scope.loginForm.email;
        $scope.user.phone = '9876543210';
        $scope.user.isLoggedIn = true;

        // Reset Form input
        $scope.loginForm = { name: '', email: '' };

        // Hide Login Modal
        var modalEl = document.getElementById('loginModal');
        var modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();
    };

    $scope.logout = function() {
        $scope.user.isLoggedIn = false;
        $scope.user.name = '';
        $scope.user.email = '';
        $scope.user.phone = '';
    };

    $scope.openAddressModal = function() {
        $scope.addressForm.address = $scope.user.address;
        $scope.addressForm.city = $scope.user.city;
        $scope.addressForm.zip = $scope.user.zip;
        var addressModal = new bootstrap.Modal(document.getElementById('addressModal'));
        addressModal.show();
    };

    $scope.submitAddress = function() {
        if ($scope.addressForm.address && $scope.addressForm.city) {
            $scope.user.address = $scope.addressForm.address;
            $scope.user.city = $scope.addressForm.city;
            $scope.user.zip = $scope.addressForm.zip;
            
            var modalEl = document.getElementById('addressModal');
            var modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();
        }
    };

    $scope.openCheckout = function() {
        if ($scope.cart.length === 0) return;
        
        var cartCanvasEl = document.getElementById('cartSidebar');
        var cartCanvas = bootstrap.Offcanvas.getInstance(cartCanvasEl);
        if (cartCanvas) cartCanvas.hide();

        var checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        checkoutModal.show();
    };

    // Razorpay Checkout Mock Integration
    $scope.triggerRazorpay = function() {
        if ($scope.cart.length === 0) return;

        var amountPaise = $scope.getGrandTotal() * 100;

        var options = {
            "key": "rzp_test_mock_12345678", // Dummy test merchant ID
            "amount": amountPaise,
            "currency": "INR",
            "name": "Blinkit Checkout Gateway",
            "description": "Simulated payment transaction",
            "image": "https://cdn.grofers.com/assets/ui/empty_states/emp_empty_cart.png",
            "handler": function (response) {
                console.log("[RAZORPAY] Transaction successful. Reference: " + response.razorpay_payment_id);
                $scope.$apply(function() {
                    $scope.placeOrder(); // Complete checkout sequence
                });
            },
            "prefill": {
                "name": $scope.user.name,
                "email": $scope.user.email || "support@blinkit.com",
                "contact": $scope.user.phone
            },
            "notes": {
                "merchant_order_id": "ORDER_" + Date.now()
            },
            "theme": {
                "color": "#0c831f" // Emerald Green color
            }
        };

        // Fallback for sandboxed offline browser testing (where script is not fetched/blocked)
        if (typeof Razorpay === "undefined") {
            console.warn("[RAZORPAY] checkout.js script not loaded. Triggering local mock checkout.");
            alert("[MOCK RAZORPAY GATEWAY]\n\n"
                  + "Simulated amount: ₹" + $scope.getGrandTotal() + "\n"
                  + "Preferred option: " + ($scope.selectedPayment | uppercase) + "\n\n"
                  + "Transaction Completed Successfully!");
            $scope.placeOrder();
        } else {
            var rzp = new Razorpay(options);
            rzp.open();
        }
    };

    // Place simulated order
    $scope.placeOrder = function() {
        var orderId = 'BK-' + Math.floor(10000 + Math.random() * 90000);
        var orderItems = [];
        angular.forEach($scope.cart, function(item) {
            orderItems.push({
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.price
            });
        });

        var newOrder = {
            id: orderId,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            items: orderItems,
            total: $scope.getGrandTotal(),
            status: 'Confirmed'
        };

        var checkoutModalEl = document.getElementById('checkoutModal');
        var checkoutModalInstance = bootstrap.Modal.getInstance(checkoutModalEl);
        if (checkoutModalInstance) checkoutModalInstance.hide();

        $scope.orders.unshift(newOrder);
        $scope.activeOrder = newOrder;
        $scope.cart = [];
        $scope.removeCoupon();

        var trackerModal = new bootstrap.Modal(document.getElementById('trackerModal'));
        trackerModal.show();

        $scope.runOrderTrackingSimulation();
    };

    // Order Live Delivery Simulator
    $scope.runOrderTrackingSimulation = function() {
        angular.forEach($scope.deliveryStages, function(stage, index) {
            stage.status = index === 0 ? 'active' : 'pending';
        });

        $scope.deliveryTimeLeft = 480; // 8 minutes (in seconds)

        if ($scope.timerInterval) clearInterval($scope.timerInterval);
        
        // Decrement time by 15s every second to make it fast-paced and watchable
        $scope.timerInterval = setInterval(function() {
            $scope.$apply(function() {
                if ($scope.deliveryTimeLeft > 0) {
                    $scope.deliveryTimeLeft -= 15;
                    if ($scope.deliveryTimeLeft < 0) $scope.deliveryTimeLeft = 0;

                    if ($scope.deliveryTimeLeft <= 380 && $scope.deliveryTimeLeft > 240) {
                        $scope.deliveryStages[0].status = 'done';
                        $scope.deliveryStages[1].status = 'active';
                        $scope.activeOrder.status = 'Packing';
                    } else if ($scope.deliveryTimeLeft <= 240 && $scope.deliveryTimeLeft > 60) {
                        $scope.deliveryStages[0].status = 'done';
                        $scope.deliveryStages[1].status = 'done';
                        $scope.deliveryStages[2].status = 'active';
                        $scope.activeOrder.status = 'Out for Delivery';
                    } else if ($scope.deliveryTimeLeft <= 60 && $scope.deliveryTimeLeft > 0) {
                        $scope.deliveryStages[0].status = 'done';
                        $scope.deliveryStages[1].status = 'done';
                        $scope.deliveryStages[2].status = 'done';
                        $scope.deliveryStages[3].status = 'active';
                        $scope.activeOrder.status = 'Arrived';
                    }
                } else {
                    $scope.deliveryStages[0].status = 'done';
                    $scope.deliveryStages[1].status = 'done';
                    $scope.deliveryStages[2].status = 'done';
                    $scope.deliveryStages[3].status = 'done';
                    $scope.activeOrder.status = 'Delivered';
                    clearInterval($scope.timerInterval);
                }
            });
        }, 1000);
    };

    $scope.formatTime = function(seconds) {
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        return m + ":" + (s < 10 ? "0" : "") + s + " mins";
    };

    $scope.closeTracker = function() {
        if ($scope.timerInterval) {
            clearInterval($scope.timerInterval);
        }
        var trackerModalEl = document.getElementById('trackerModal');
        var trackerModalInstance = bootstrap.Modal.getInstance(trackerModalEl);
        if (trackerModalInstance) trackerModalInstance.hide();
    };

    // Filter products dynamically
    $scope.filterProducts = function(p) {
        var matchesCategory = !$scope.selectedCategory || p.category === $scope.selectedCategory;
        var matchesSearch = !$scope.searchQuery || p.name.toLowerCase().includes($scope.searchQuery.toLowerCase()) || p.category.toLowerCase().includes($scope.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    };

}]);
