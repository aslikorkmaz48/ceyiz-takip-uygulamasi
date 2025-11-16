app.js
const config = {
    background_color: "#fef3f2",
    surface_color: "#ffffff",
    text_color: "#1f2937",
    primary_action_color: "#ec4899",
    secondary_action_color: "#f472b6",
    font_family: "system-ui",
    font_size: 16,
    app_title: "Çeyiz Takip",
    subtitle: "Çeyiz hazırlığınızı kolayca takip edin",
    add_button_text: "Yeni Ürün Ekle",
    save_button_text: "Kaydet",
    cancel_button_text: "İptal"
};

let items = [];
let selectedCategory = "Tümü";
let showModal = false;

const categories = [
    { name: "Tümü", icon: "📋" },
    { name: "Mutfak", icon: "🍳" },
    { name: "Yatak Odası", icon: "🛏️" },
    { name: "Banyo", icon: "🚿" },
    { name: "Salon", icon: "🛋️" },
    { name: "Diğer", icon: "📦" }
];

function loadItems() {
    const saved = localStorage.getItem('ceyiz_items');
    if (saved) {
        items = JSON.parse(saved);
    }
}

function saveItems() {
    localStorage.setItem('ceyiz_items', JSON.stringify(items));
}

function initApp() {
    loadItems();
    renderApp();
}

function renderApp() {
    const app = document.getElementById('app');

    const filteredItems = selectedCategory === "Tümü" ?
        items :
        items.filter(item => item.category === selectedCategory);

    const totalItems = items.length;
    const purchasedItems = items.filter(item => item.purchased).length;
    const progressPercent = totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0;

    const totalBudget = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const spentBudget = items.filter(item => item.purchased).reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);

    app.innerHTML = `
    <div style="background: ${config.background_color}; min-height: 100%; padding: 24px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        
        <div style="background: ${config.surface_color}; border-radius: 16px; padding: 32px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <h1 style="color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 2}px; font-weight: 700; margin: 0 0 8px 0;">
            ${config.app_title}
          </h1>
          <p style="color: ${config.text_color}; opacity: 0.7; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.9}px; margin: 0 0 24px 0;">
            ${config.subtitle}
          </p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: linear-gradient(135deg, ${config.primary_action_color}15, ${config.primary_action_color}25); padding: 20px; border-radius: 12px;">
              <div style="color: ${config.text_color}; opacity: 0.7; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.8}px; margin-bottom: 4px;">Toplam Ürün</div>
              <div style="color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 1.75}px; font-weight: 700;">${totalItems}</div>
            </div>
            <div style="background: linear-gradient(135deg, ${config.primary_action_color}15, ${config.primary_action_color}25); padding: 20px; border-radius: 12px;">
              <div style="color: ${config.text_color}; opacity: 0.7; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.8}px; margin-bottom: 4px;">Alınan</div>
              <div style="color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 1.75}px; font-weight: 700;">${purchasedItems}</div>
            </div>
            <div style="background: linear-gradient(135deg, ${config.primary_action_color}15, ${config.primary_action_color}25); padding: 20px; border-radius: 12px;">
              <div style="color: ${config.text_color}; opacity: 0.7; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.8}px; margin-bottom: 4px;">Harcanan</div>
              <div style="color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 1.75}px; font-weight: 700;">${spentBudget.toLocaleString('tr-TR')} ₺</div>
            </div>
            <div style="background: linear-gradient(135deg, ${config.primary_action_color}15, ${config.primary_action_color}25); padding: 20px; border-radius: 12px;">
              <div style="color: ${config.text_color}; opacity: 0.7; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.8}px; margin-bottom: 4px;">Toplam Bütçe</div>
              <div style="color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 1.75}px; font-weight: 700;">${totalBudget.toLocaleString('tr-TR')} ₺</div>
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.85}px; font-weight: 600;">İlerleme</span>
              <span style="color: ${config.primary_action_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.85}px; font-weight: 700;">${progressPercent}%</span>
            </div>
            <div style="background: ${config.text_color}15; height: 12px; border-radius: 6px; overflow: hidden;">
              <div class="progress-bar" style="background: linear-gradient(90deg, ${config.primary_action_color}, ${config.secondary_action_color}); height: 100%; width: ${progressPercent}%; border-radius: 6px;"></div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <button id="addBtn" style="background: ${config.primary_action_color}; color: white; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px; font-weight: 600; padding: 14px 28px; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px ${config.primary_action_color}40;">
              ✨ ${config.add_button_text}
            </button>
            <button id="printBtn" style="background: ${config.secondary_action_color}; color: white; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px; font-weight: 600; padding: 14px 28px; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px ${config.secondary_action_color}40;">
              🖨️ Word'e Aktar
            </button>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
          ${categories.map(cat => `
            <button class="category-badge" data-category="${cat.name}" style="background: ${selectedCategory === cat.name ? config.primary_action_color : config.surface_color}; color: ${selectedCategory === cat.name ? 'white' : config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.85}px; font-weight: 600; padding: 10px 20px; border: 2px solid ${selectedCategory === cat.name ? config.primary_action_color : config.text_color + '20'}; border-radius: 20px; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
              ${cat.icon} ${cat.name}
            </button>
          `).join('')}
        </div>

        <div style="background: ${config.surface_color}; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          ${filteredItems.length === 0 ? `
            <div style="text-align: center; padding: 48px 24px; color: ${config.text_color}; opacity: 0.5; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px;">
              ${totalItems === 0 ? '🎀 Henüz ürün eklenmemiş. Hemen başlayın!' : '📦 Bu kategoride ürün bulunmuyor.'}
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${filteredItems.map(item => `
                <div class="item-card" style="background: ${item.purchased ? config.primary_action_color + '10' : config.background_color}; padding: 16px; border-radius: 12px; border: 2px solid ${item.purchased ? config.primary_action_color + '30' : 'transparent'};">
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <input type="checkbox" id="check-${item.id}" ${item.purchased ? 'checked' : ''} style="width: 24px; height: 24px; cursor: pointer; accent-color: ${config.primary_action_color};">
                    <div style="flex: 1;">
                      <div style="color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px; font-weight: 600; margin-bottom: 4px; ${item.purchased ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                        ${item.item_name}
                      </div>
                      <div style="color: ${config.text_color}; opacity: 0.6; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.8}px;">
                        ${item.category} • ${item.quantity} adet • ${item.unit_price.toLocaleString('tr-TR')} ₺/adet
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <div style="color: ${config.primary_action_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 1.1}px; font-weight: 700;">
                        ${(item.quantity * item.unit_price).toLocaleString('tr-TR')} ₺
                      </div>
                    </div>
                    <button class="delete-btn" data-id="${item.id}" style="background: ${config.secondary_action_color}20; color: ${config.secondary_action_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.85}px; padding: 8px 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                      Sil
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    </div>

    ${showModal ? `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 100;">
        <div style="background: ${config.surface_color}; border-radius: 16px; padding: 32px; max-width: 500px; width: 100%; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
          <h2 style="color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 1.5}px; font-weight: 700; margin: 0 0 24px 0;">
            Yeni Ürün Ekle
          </h2>
          <form id="itemForm">
            <div style="margin-bottom: 16px;">
              <label for="itemName" style="display: block; color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.85}px; font-weight: 600; margin-bottom: 8px;">Ürün Adı</label>
              <input type="text" id="itemName" required style="width: 100%; padding: 12px; border: 2px solid ${config.text_color}20; border-radius: 8px; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px; color: ${config.text_color}; background: ${config.background_color};">
            </div>
            <div style="margin-bottom: 16px;">
              <label for="category" style="display: block; color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.85}px; font-weight: 600; margin-bottom: 8px;">Kategori</label>
              <select id="category" required style="width: 100%; padding: 12px; border: 2px solid ${config.text_color}20; border-radius: 8px; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px; color: ${config.text_color}; background: ${config.background_color};">
                ${categories.filter(c => c.name !== "Tümü").map(cat => `
                  <option value="${cat.name}">${cat.icon} ${cat.name}</option>
                `).join('')}
              </select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
              <div>
                <label for="quantity" style="display: block; color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.85}px; font-weight: 600; margin-bottom: 8px;">Adet</label>
                <input type="number" id="quantity" min="1" value="1" required style="width: 100%; padding: 12px; border: 2px solid ${config.text_color}20; border-radius: 8px; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px; color: ${config.text_color}; background: ${config.background_color};">
              </div>
              <div>
                <label for="unitPrice" style="display: block; color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size * 0.85}px; font-weight: 600; margin-bottom: 8px;">Birim Fiyat (₺)</label>
                <input type="number" id="unitPrice" min="0" step="0.01" required style="width: 100%; padding: 12px; border: 2px solid ${config.text_color}20; border-radius: 8px; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px; color: ${config.text_color}; background: ${config.background_color};">
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <button type="button" id="cancelBtn" style="flex: 1; background: ${config.text_color}10; color: ${config.text_color}; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px; font-weight: 600; padding: 14px; border: none; border-radius: 10px; cursor: pointer;">
                ${config.cancel_button_text}
              </button>
              <button type="submit" id="saveBtn" style="flex: 1; background: ${config.primary_action_color}; color: white; font-family: ${config.font_family}, system-ui, sans-serif; font-size: ${config.font_size}px; font-weight: 600; padding: 14px; border: none; border-radius: 10px; cursor: pointer;">
                ${config.save_button_text}
              </button>
            </div>
          </form>
        </div>
      </div>
    ` : ''}
  `;

  document.getElementById('addBtn')?.addEventListener('click', () => {
    showModal = true;
    renderApp();
  });

  document.getElementById('printBtn')?.addEventListener('click', () => {
    if (items.length === 0) {
      showToast("Yazdırılacak ürün bulunmuyor", "error");
      return;
    }
    exportToWord();
  });

  document.querySelectorAll('.category-badge').forEach(btn => {
    btn.addEventListener('click', (e) => {
      selectedCategory = e.currentTarget.dataset.category;
      renderApp();
    });
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const itemId = e.target.id.replace('check-', '');
      const item = items.find(i => i.id === itemId);
      if (item) {
        item.purchased = e.target.checked;
        saveItems();
        showToast(e.target.checked ? "Ürün alındı olarak işaretlendi! 🎉" : "Ürün alınmadı olarak işaretlendi", "success");
        renderApp();
      }
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = e.currentTarget.dataset.id;
      const deleteBtn = e.currentTarget;
      const originalText = deleteBtn.textContent;
      
      deleteBtn.textContent = 'Emin misiniz?';
      deleteBtn.style.background = config.primary_action_color;
      deleteBtn.style.color = 'white';
      
      const confirmDelete = () => {
        items = items.filter(i => i.id !== itemId);
        saveItems();
        showToast("Ürün silindi", "success");
        renderApp();
      };
      
      const cancelDelete = () => {
        deleteBtn.textContent = originalText;
        deleteBtn.style.background = config.secondary_action_color + '20';
        deleteBtn.style.color = config.secondary_action_color;
        deleteBtn.removeEventListener('click', confirmDelete);
      };
      
      deleteBtn.addEventListener('click', confirmDelete, { once: true });
      setTimeout(cancelDelete, 3000);
    });
  });

  const form = document.getElementById('itemForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const itemNameValue = document.getElementById('itemName').value.trim();
      const categoryValue = document.getElementById('category').value;
      const quantityValue = parseInt(document.getElementById('quantity').value);
      const unitPriceValue = parseFloat(document.getElementById('unitPrice').value);

      if (!itemNameValue || !categoryValue || isNaN(quantityValue) || isNaN(unitPriceValue)) {
        showToast("Lütfen tüm alanları doğru doldurun", "error");
        return;
      }

      const newItem = {
        id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9),
        item_name: itemNameValue,
        category: categoryValue,
        quantity: quantityValue,
        unit_price: unitPriceValue,
        purchased: false,
        created_at: new Date().toISOString()
      };

      items.push(newItem);
      saveItems();
      showModal = false;
      showToast("Ürün başarıyla eklendi! ✨", "success");
      renderApp();
    });

    document.getElementById('cancelBtn')?.addEventListener('click', () => {
      showModal = false;
      renderApp();
    });
  }
}

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.background = type === 'error' ? '#ef4444' : config.primary_action_color;
  toast.style.color = 'white';
  toast.style.fontFamily = `${config.font_family}, system-ui, sans-serif`;
  toast.style.fontSize = `${config.font_size * 0.9}px`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function exportToWord() {
  const groupedItems = {};
  categories.filter(c => c.name !== "Tümü").forEach(cat => {
    groupedItems[cat.name] = items.filter(item => item.category === cat.name);
  });

  const totalItems = items.length;
  const purchasedItems = items.filter(item => item.purchased).length;
  const totalBudget = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  const spentBudget = items.filter(item => item.purchased).reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);

  let htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Çeyiz Listesi</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        h1 { color: #ec4899; font-size: 28px; margin-bottom: 10px; }
        h2 { color: #1f2937; font-size: 20px; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #ec4899; padding-bottom: 5px; }
        .stats { background: #fef3f2; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .stat-item { margin: 8px 0; font-size: 14px; }
        .stat-label { font-weight: bold; color: #1f2937; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #ec4899; color: white; padding: 12px; text-align: left; font-weight: bold; }
        td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
        tr:nth-child(even) { background: #fef3f2; }
        .purchased { background: #d1fae5 !important; }
        .total-row { font-weight: bold; background: #f3f4f6 !important; border-top: 2px solid #1f2937; }
        .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1>🎀 ${config.app_title}</h1>
      <p style="color: #6b7280; margin-bottom: 30px;">${config.subtitle}</p>
      
      <div class="stats">
        <div class="stat-item"><span class="stat-label">Toplam Ürün:</span> ${totalItems} adet</div>
        <div class="stat-item"><span class="stat-label">Alınan Ürün:</span> ${purchasedItems} adet (${totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0}%)</div>
        <div class="stat-item"><span class="stat-label">Kalan Ürün:</span> ${totalItems - purchasedItems} adet</div>
        <div class="stat-item"><span class="stat-label">Toplam Bütçe:</span> ${totalBudget.toLocaleString('tr-TR')} ₺</div>
        <div class="stat-item"><span class="stat-label">Harcanan:</span> ${spentBudget.toLocaleString('tr-TR')} ₺</div>
        <div class="stat-item"><span class="stat-label">Kalan Bütçe:</span> ${(totalBudget - spentBudget).toLocaleString('tr-TR')} ₺</div>
      </div>
  `;

  Object.keys(groupedItems).forEach(categoryName => {
    const categoryItems = groupedItems[categoryName];
    if (categoryItems.length > 0) {
      const categoryIcon = categories.find(c => c.name === categoryName)?.icon || '📦';
      const categoryTotal = categoryItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
      
      htmlContent += `
        <h2>${categoryIcon} ${categoryName}</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 5%;">✓</th>
              <th style="width: 35%;">Ürün Adı</th>
              <th style="width: 15%;">Adet</th>
              <th style="width: 20%;">Birim Fiyat</th>
              <th style="width: 25%;">Toplam Fiyat</th>
            </tr>
          </thead>
          <tbody>
      `;

      categoryItems.forEach(item => {
        htmlContent += `
          <tr class="${item.purchased ? 'purchased' : ''}">
            <td style="text-align: center;">${item.purchased ? '✓' : ''}</td>
            <td>${item.item_name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit_price.toLocaleString('tr-TR')} ₺</td>
            <td>${(item.quantity * item.unit_price).toLocaleString('tr-TR')} ₺</td>
          </tr>
        `;
      });

      htmlContent += `
            <tr class="total-row">
              <td colspan="4" style="text-align: right;">Kategori Toplamı:</td>
              <td>${categoryTotal.toLocaleString('tr-TR')} ₺</td>
            </tr>
          </tbody>
        </table>
      `;
    }
  });

  htmlContent += `
      <div class="footer">
        <p>Çeyiz Takip Uygulaması ile oluşturulmuştur</p>
        <p>Yazdırma Tarihi: ${new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Ceyiz_Listesi_${new Date().toLocaleDateString('tr-TR').replace(/\./g, '_')}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast("Word dosyası indiriliyor! 📄", "success");
}
initApp();