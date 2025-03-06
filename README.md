# Teknomak Form
Bu proje, Amman Teknomak mülakat görevi için hazırlanmıştır.

## 📌 Proje Açıklaması
Bu proje, **React ve TypeScript** kullanılarak geliştirilmiş bir form uygulamasıdır. Kullanıcı, **JSONPlaceholder API**'den gelen verilerle bir kayıt seçebilir veya manuel olarak ID girerek ilgili bilgileri getirebilir. **PrimeReact** bileşenleri ile zenginleştirilmiş, modal tabanlı bir seçim arayüzü sunmaktadır.

## 📌 Kullanılan Teknolojiler
- **React** (v19+)
- **TypeScript** (v4.9.5+)
- **PrimeReact** (v10.9.2)
- **JSONPlaceholder API** (Mock veri kaynağı)

## 📌 Kurulum ve Çalıştırma
### 1. Projeyi Klonlama
```sh
git clone https://github.com/kullanici-adi/teknomak-form.git
cd teknomak-form
```
### 2. Bağımlılıkları Yükleme
```sh
npm install
```
### 3. Projeyi Çalıştırma
```sh
npm start
```

## 📌 Form Alanları Açıklamaları
| Alan Adı  | Tür  | Açıklama  |
|-----------|------|----------|
| **postId** | number | Kullanıcı girişine kapalı, sabit bir ID. |
| **id** | number | Kullanıcı manuel girebilir veya modal üzerinden seçebilir. |
| **name** | string | Kullanıcı, modal üzerinden seçebilir. |
| **email** | string | Kullanıcı giriş yapamaz, ID veya Name seçimine göre otomatik doldurulur. |
| **body** | textarea | ID veya Name seçimine göre otomatik doldurulur. |

## 📌 Modal Kullanımı
**Modal**, kullanıcıya **JSONPlaceholder API**'den gelen kayıtları filtreleyerek seçim yapma imkanı sunar. Modal içinde **arama** fonksiyonuyla veriler **Id, Name ve Body** bilgilerine göre filtrelenebilir.

### 📌 Modal Seçenekleri
- **ID Seçimi**: "ID" butonuna tıklayarak modal açılır ve ID seçildiğinde ilgili Name, Email ve Body otomatik doldurulur.
- **Name Seçimi**: "Name" butonuna tıklayarak modal açılır ve Name seçildiğinde ilgili Email ve Body otomatik doldurulur.
- **Enter ile Veri Getirme**: ID alanına bir değer girilip Enter tuşuna basıldığında, ilgili ID'ye ait tüm bilgiler otomatik olarak doldurulur.
- **Body İçeriği**: Uzun metinlerin tamamı gösterilmez. Metin fazla uzun olduğunda "..." ile kısaltılır ve üzerine gelindiğinde detaylar tooltip içinde gösterilir.

## 📌 Teknik Detaylar
- **React + TypeScript** kullanıldı.  
- **PrimeReact** bileşenleri ile form ve modal oluşturuldu.  
- **Yeniden kullanılabilir bileşen yapısı** uygulandı.  
- **JSONPlaceholder API**'den veriler çekildi ve kullanıldı.  
- **Yerel Depolama (localStorage)** kullanılarak API çağrıları azaltıldı.  
- **Modal dinamik genişlik ve yükseklikte yapıldı** ve içeriğe göre boyutlandırıldı.  
- **ID girişinde Enter tuşuna basıldığında form otomatik dolduruldu.**

## 📂 Klasör Yapısı
```
📦 teknomak-form
 ┣ 📂 teknomak-form
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┣ 📜 FormComponent.tsx  // Form bileşeni
 ┃ ┃ ┃ ┣ 📜 ModalComponent.tsx  // Modal bileşeni
 ┃ ┃ ┣ 📂 types
 ┃ ┃ ┃ ┣ 📜 index.ts  // Tip tanımlamaları
 ┃ ┃ ┣ 📜 App.tsx  // Ana bileşen
```

