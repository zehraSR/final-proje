document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const updateForm = document.getElementById('update-form');
    const deleteForm = document.getElementById('delete-form');
    const listButton = document.getElementById('list-products');
    const productList = document.getElementById('product-list');

    // Ürün ekleme işlevi
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('id').value;
        const ad = document.getElementById('ad').value;
        const marka = document.getElementById('marka').value;
        const adet = document.getElementById('adet').value;

        try {
            const response = await fetch('http://localhost:3000/urun', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Sunucu Yanıtı:', responseData);
            addProductToList(responseData);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });

    // Ürün güncelleme işlevi
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('update-id').value;
        const ad = document.getElementById('update-ad').value;
        const marka = document.getElementById('update-marka').value;
        const adet = document.getElementById('update-adet').value;

        try {
            const response = await fetch(`http://localhost:3000/urun/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ad, marka, adet })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Sunucu Yanıtı:', responseData);
            document.location.reload();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });

    // Ürün silme işlevi
    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('delete-id').value;

        try {
            const response = await fetch(`http://localhost:3000/urun/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.text();
            console.log('Sunucu Yanıtı:', responseData);
            document.location.reload();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });

    // Ürünleri listeleme işlevi
    listButton.addEventListener('click', async () => {
        productList.innerHTML = ''; // Mevcut listeyi temizleyin
        try {
            const response = await fetch('http://localhost:3000/urun');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            products.forEach(product => addProductToList(product));
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });

    // Ürün listeye ekleme işlevi
    function addProductToList(product) {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.ad}</h3>
            <p>Marka: ${product.marka}</p>
            <p>Adet: ${product.adet}</p>
            <button onclick="editProduct('${product.id}', '${product.ad}', '${product.marka}', '${product.adet}')">Düzenle</button>
            <button onclick="deleteProduct('${product.id}')">Sil</button>
        `;
        productList.appendChild(productItem);
    }

    // Ürün silme işlevi (liste içindeki)
    async function deleteProduct(id) {
        try {
            const response = await fetch(`http://localhost:3000/urun/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            document.location.reload();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    // Ürün düzenleme işlevi (liste içindeki)
    function editProduct(id, ad, marka, adet) {
        document.getElementById('update-id').value = id;
        document.getElementById('update-ad').value = ad;
        document.getElementById('update-marka').value = marka;
        document.getElementById('update-adet').value = adet;
    }

    // Sayfa yüklendiğinde ürünleri getir
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3000/urun');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            products.forEach(product => addProductToList(product));
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }


        // Ürün listeye ekleme işlevi
        function addProductToList(product) {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <h3>${product.ad}</h3>
                <p>Marka: ${product.marka}</p>
                <p>Adet: ${product.adet}</p>
                <img src="${product.resim}" alt="Ürün Resmi">
                <button onclick="editProduct('${product.id}', '${product.ad}', '${product.marka}', '${product.adet}')">Düzenle</button>
                <button onclick="deleteProduct('${product.id}')">Sil</button>
            `;
            productList.appendChild(productItem);
        }
    
        // Sayfa yüklendiğinde ürünleri getir
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/urun');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const products = await response.json();
                products.forEach(product => addProductToList(product));
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    
    

    fetchProducts();
});
