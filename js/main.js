var app = new Vue({
    el: '#app',
    data: {
        products: [
            {id: 1, title: 'Белокочанная капуста', short_text: 'Идеальна для засолки и хранения.', image: 'kapusta1.jpg', desc: 'Позднеспелый сорт с плотными кочанами.'},
            {id: 2, title: 'Брокколи', short_text: 'Полезный диетический продукт.', image: 'kapusta2.jpg', desc: 'Богата витаминами С и К, отлично подходит для заморозки.'},
            {id: 3, title: 'Цветная капуста', short_text: 'Нежный вкус для кулинарии.', image: 'kapusta3.jpg', desc: 'Используется для приготовления гарниров и супов-пюре.'},
            {id: 4, title: 'Пекинская капуста', short_text: 'Основа для свежих салатов.', image: 'kapusta4.jpg', desc: 'Раннеспелый сорт с очень нежными листьями.'},
            {id: 5, title: 'Брюссельская капуста', short_text: 'Маленькие кочанчики с ярким вкусом.', image: 'kapusta5.jpg', desc: 'Высокое содержание белка и характерный аромат.'}
        ],
        product: {},
        cart: [],
        contactFields: { name: '', email: '', phone: '', interest: '' }, // Поля формы
        orderVisible: false,
        btnVisible: 0
    },
    mounted: function() {
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    methods: {
        getProduct: function() {
            if (window.location.hash) {
                var id = window.location.hash.replace('#', '');
                this.product = this.products.find(p => p.id == id) || {};
            }
        },
        addToCart: function(id) {
            var local = window.localStorage.getItem('cart') ? window.localStorage.getItem('cart').split(',') : [];
            if (local.indexOf(String(id)) === -1) {
                local.push(id);
                window.localStorage.setItem('cart', local.join(','));
                this.btnVisible = 1;
                this.getCart();
            }
        },
        getCart: function() {
            var local = window.localStorage.getItem('cart') ? window.localStorage.getItem('cart').split(',') : [];
            this.cart = this.products.filter(p => local.includes(String(p.id)));
        },
        removeFromCart: function(id) {
            var local = window.localStorage.getItem('cart').split(',');
            var index = local.indexOf(String(id));
            if (index > -1) {
                local.splice(index, 1);
                window.localStorage.setItem('cart', local.join(','));
                this.getCart();
            }
        },
        checkInCart: function() {
            var local = window.localStorage.getItem('cart') ? window.localStorage.getItem('cart').split(',') : [];
            if (this.product.id && local.indexOf(String(this.product.id)) !== -1) this.btnVisible = 1;
        },
        makeOrder: function() {
            this.orderVisible = true;
            window.localStorage.removeItem('cart');
            this.cart = [];
        }
    }
});