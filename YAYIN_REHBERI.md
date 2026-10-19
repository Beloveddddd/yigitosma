# GitHub ve Netlify Yayın Rehberi

## 1. GitHub'a yükle (terminal gerekmez)

1. Zip dosyasını aç, `lead-takip` klasörü çıkar. İçinde `node_modules` ve `dist` yoktur, normaldir.
2. github.com adresinde sağ üstteki + işaretine, sonra "New repository"ye tıkla.
3. Repository name: `lead-takip`. Visibility: **Public**. "Create repository"ye tıkla.
4. Açılan sayfada "uploading an existing file" bağlantısına tıkla.
5. Klasörün **içindeki** tüm dosya ve klasörleri (src, public, package.json, README.md, ekran_goruntusu.png, netlify.toml vb.) pencereye sürükle bırak.
6. Altta "Commit changes"e tıkla.
7. Repo adresini kopyala, örnek: `https://github.com/KULLANICI_ADIN/lead-takip`. Bu teslim formundaki GitHub linkindir.

## 2. Netlify'a yayına al

1. app.netlify.com adresine git, GitHub hesabınla giriş yap.
2. "Add new site", sonra "Import an existing project", sonra GitHub'ı seç.
3. `lead-takip` reposunu seç.
4. Ayarlar `netlify.toml` dosyasından otomatik dolar: build komutu `npm run build`, publish directory `dist`. Dolu değilse elle gir.
5. "Deploy"a tıkla, 1 ila 2 dakika bekle.
6. Üstte çıkan `https://....netlify.app` adresi canlı linkindir. İstersen "Site configuration", "Change site name" ile adı güzelleştir.

## 3. Teslim formu

1. GitHub repo linki
2. Netlify canlı linki
3. Ekran görüntüsü projede `ekran_goruntusu.png` olarak hazır. Form isterse ayrıca yükle.

## Sık karşılaşılan sorun

Netlify'da "Build failed" görürsen deploy loguna bak. En sık neden dosyaların bir alt klasörün içinde yüklenmesidir. `package.json` repo ana dizininde olmalı.
