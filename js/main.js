var app = new Vue({
    el: '#app',
    data: {
        // Массив товаров согласно варианту 22 (Капуста)
        products: [
            {id: 1, title: 'Белокочанная капуста', short_text: 'Идеальна для засолки и хранения.', image: 'kapusta1.jpg', desc: 'Позднеспелый сорт с плотными кочанами.'},
            {id: 2, title: 'Брокколи', short_text: 'Полезный диетический продукт.', image: 'kapusta2.jpg', desc: 'Богата витаминами С и К, отлично подходит для заморозки.'},
            {id: 3, title: 'Цветная капуста', short_text: 'Нежный вкус для кулинарии.', image: 'kapusta3.jpg', desc: 'Используется для приготовления гарниров и супов-пюре.'},
            {id: 4, title: 'Пекинская капуста', short_text: 'Основа для свежих салатов.', image: 'kapusta4.jpg', desc: 'Раннеспелый сорт с очень нежными листьями.'},
            {id: 5, title: 'Брюссельская капуста', short_text: 'Маленькие кочанчики с ярким вкусом.', image: 'kapusta5.jpg', desc: 'Высокое содержание белка и характерный аромат.'}
        ],
        product: {},       // Текущий товар для страницы tomato-one
        cartProducts: [],  // Список товаров в корзине для страницы contact
        btnVisible: 0      // Состояние кнопок "Add to cart" / "Go to cart"
    },
    mounted: function() {
        // Вызываем проверку при загрузке любой страницы
        this.getProduct();
        this.checkInCart();
        this.loadCart(); // Важно для страницы контактов!
    },
    methods: {
        // Получение ID товара из хэша (#1, #2 и т.д.)
        getProduct: function() {
            if (window.location.hash) {
                var id = window.location.hash.replace('#', '');
                for (var i in this.products) {
                    if (this.products[i].id == id) {
                        this.product = this.products[i];
                        break;
                    }
                }
            }
        },
        // Добавление товара в корзину (localStorage)
        addToCart: function(id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) === -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join(','));
                this.btnVisible = 1; // Показываем кнопку "Go to cart"
            }
        },
        // Проверка: есть ли текущий товар в корзине
        checkInCart: function() {
            var cart = window.localStorage.getItem('cart') ? window.localStorage.getItem('cart').split(',') : [];
            if (this.product.id && cart.indexOf(String(this.product.id)) !== -1) {
                this.btnVisible = 1;
            }
        },
        // ЗАГРУЗКА КОРЗИНЫ ДЛЯ CONTACT.HTML
        loadCart: function() {
            var rawCart = window.localStorage.getItem('cart');
            if (rawCart) {
                var cartIds = rawCart.split(',');
                // Фильтруем основной массив, оставляя только выбранные ID
                this.cartProducts = this.products.filter(p => cartIds.includes(String(p.id)));
            }
        },
        // Очистка корзины
        clearCart: function() {
            window.localStorage.removeItem('cart');
            this.cartProducts = [];
        }
    }
});