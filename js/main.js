var app = new Vue({
    el: '#app',
    data: {
        products: [
            {id: 1, title: 'Банан Кавендиш', short_text: 'Классический десертный сорт.', image: 'banana1.jpg', desc: 'Самый популярный сорт в мире с нежной сладкой мякотью.'},
            {id: 2, title: 'Красный банан', short_text: 'Экзотика с ягодным ароматом.', image: 'banana2.jpg', desc: 'Обладает кремовой текстурой и легким привкусом малины.'},
            {id: 3, title: 'Банан Плантан', short_text: 'Овощной банан для жарки.', image: 'banana3.jpg', desc: 'Крупные плоды, которые идеально подходят для готовки гарниров.'},
            {id: 4, title: 'Мини-бананы', short_text: 'Маленькие и очень сладкие.', image: 'banana4.jpg', desc: 'Тонкая кожура и концентрированный медовый вкус.'},
            {id: 5, title: 'Голубой банан', short_text: 'Вкус ванильного мороженого.', image: 'banana5.jpg', desc: 'Необычный сорт с голубоватой кожурой и очень нежной мякотью.'}
        ],
        product: {},
        cart: [],
        contactFields: { name: '', email: '', phone: '', interest: '' },
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