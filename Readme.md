# 📦 Çeyiz Takip Uygulaması

Modern, sade ve kullanıcı dostu arayüzüyle çeyiz hazırlık sürecini planlamayı, takip etmeyi ve bütçe kontrolünü kolaylaştıran web tabanlı bir uygulamadır.

---

## 🚀 Özellikler

- **Kategori Bazlı Filtreleme**
  - Mutfak, Yatak Odası, Salon, Banyo ve Diğer kategoriler.

- **Ürün Ekleme**
  - Ürün adı, kategori, adet ve birim fiyat bilgisi ekleme.

- **Durum Takibi**
  - Ürünleri *alındı* olarak işaretleyebilme.

- **Otomatik Hesaplama**
  - Toplam ürün sayısı  
  - Alınan ürün sayısı  
  - İlerleme yüzdesi  
  - Toplam bütçe  
  - Harcanan bütçe

- **Verilerin Kaybolmaması**
  - Tüm bilgiler **localStorage** üzerinde saklanır.

- **Word’e Aktarma**
  - Ürün listesini tek tıkla `.docx` formatında dışa aktarma.

- **PDF Olarak İndirme**
  - Liste **PDF formatında da indirilebilir**. (*“pdf indiriliyor zaten”*) ✔️

- **Modern UI**
  - TailwindCSS ile geliştirilmiş temiz ve şık bir tasarım.

---

## 🛠️ Kullanılan Teknolojiler

- HTML5  
- CSS3 / TailwindCSS  
- JavaScript (Vanilla)  
- localStorage  
- docx kütüphanesi  


---

## ⚙️ Kurulum

Projeyi indir veya klonla:

```bash
git clone <repo-link>
Ardından:
Proje klasörüne gir
index.html dosyasını bir tarayıcıda aç
Hepsi bu kadar — backend gerektirmez 🎉

📄 Kullanım
Yeni Ürün Ekle butonu ile ürün bilgilerini girip kaydedebilirsin.
Ürün eklendikten sonra:
Durum kutusunu işaretleyerek alındı olarak güncelleyebilirsin.
Word’e Aktar butonu ile .docx dosyasını indirebilirsin.
PDF Olarak İndir butonu ile listeyi PDF formatında kaydedebilirsin.
Üstteki filtreler sayesinde kategorilere göre listeyi daraltabilirsin.

🔒 Veri Güvenliği
Tüm veriler tarayıcının localStorage alanında saklanır.
Hiçbir bilgi sunucuya gönderilmez.

✨ Geliştirme Fikirleri
Dark / Light tema desteği
Mobil uyumlu PWA versiyonu
Bulut senkronizasyonu
Hazır çeyiz listesi şablonları