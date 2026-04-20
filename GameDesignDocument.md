# Game Design Document — Merge Kingdom

> Merge 2 + Koy Yonetimi + Boss Savas — Casual Mobil Oyun

---

## 1. Oyun Ozeti

Oyuncu bir kralligi yonetir: koyunu kurar, binalarini gelistirir, asker ve ekipman uretir, portalda birlestirip donatir ve efsanevi yaratiklara karsi savastirir. Merge 2 mekanigi tum sistemlerin temelidir.

### Ana Oyun Dongusu

```
Koy Binalarini Kur (board uzerinde)
       |
       v
Kaynak Uret (Altin, Yemek, Materyal, Asker, Ekipman)
       |
       v
Merge ile Gelistir (Lvl1+Lvl1 = Lvl2)
       |
       v
Portalda Craft (Asker + Ekipman = Donanimli Asker)
       |
       v
Kadro Kur & Savas (Full otomatik, stage bazli)
       |
       v
Odul Al (Altin, XP, Sandik, Recipe Scroll, Rune Tasi)
       |
       v
Koy & Binalar Gelistir → Dongu Tekrarlar
```

---

## 1.1 Mevcut Implementasyon (Calisan Sistemler)

Asagidaki sistemler Unity projesinde **halihazirda kodlanmis ve calisir** durumdadir. GDD'deki yeni tasarimlar bu temelin uzerine insa edilecektir.

| Sistem | Durum | Aciklama |
|--------|-------|----------|
| **Board & Grid (7x9)** | ✅ Calisiyor | `BoardManager` — 63 slotluk grid, item spawn/remove, slot yonetimi |
| **Drag & Drop** | ✅ Calisiyor | `MergeItem.Input` — surukle-birak, tiklama, cift tiklama |
| **Merge Mekanigi** | ✅ Calisiyor | `BoardManager.MergeLogic` — ayni ID birlestirme, NextLevel/PrevLevel zinciri |
| **Generator Sistemi** | ✅ Calisiyor | Tap generator (enerji harcar, cooldown) + AutoGenerator (otomatik, enerji harcamaz) |
| **Chest (Sandik)** | ✅ Calisiyor | Timer bazli acilma, tikla→drop, tapCharges |
| **Consumable** | ✅ Calisiyor | Cift tikla → altin/elmas/enerji bakiyeye eklenir |
| **Modifier (Makas/Asa)** | ✅ Calisiyor | Splitter (2 alt seviye), LevelUp (1 ust seviye), stack mekanigi |
| **Portal** | ✅ Calisiyor | `PortalBoardManager` — ikinci board, recipe craft (A+B=C), item transfer |
| **Siparis Sistemi** | ✅ Calisiyor | `OrderManager` — prosedural siparis, board tarama, otomatik guncelleme, max 4 aktif |
| **Ekonomi** | ✅ Calisiyor | `WalletManager` (Gold/Gems/Energy), `LevelManager` (XP/Level), enerji regen |
| **Magaza** | ✅ Calisiyor | `ShopManager` — DailySpecial, HotSale, IAP, gunluk limitler |
| **Stash (Depo)** | ✅ Calisiyor | `StashManager` — item depolama, gem ile slot acma |
| **Object Pooling** | ✅ Calisiyor | `ObjectPoolManager` — generic havuz, Prewarm, prefabId→Queue |
| **Hint Sistemi** | ✅ Calisiyor | `HintManager` — 5s idle → birlestirilebilir ciftleri gosterir |
| **Discovery** | ✅ Calisiyor | `DiscoveryManager` — koleksiyon takibi (PlayerPrefs) |
| **Save/Load** | ✅ Calisiyor | Board + siparis durumu JSON+PlayerPrefs ile kaydedilir |
| **Floating Text** | ✅ Calisiyor | `FloatingTextManager` — +Gold, +XP popup'lari (pooling destekli) |
| **Info Panel** | ✅ Calisiyor | `InfoPanelUI` — secili esya detaylari, satis, undo, cooldown skip |

**Henuz kodlanmamis sistemler:** Koy/bina sistemi, asker/ekipman, savas, sinerji, rune, kahraman — tumu bu GDD'de tanimlanan yeni ozelliklerdir.

---

## 2. Koy / Bina Sistemi

Tum binalar **mevcut 7x9 board uzerinde** yer alir. Her bina 1 slot kaplar ve mevcut generator/item mekanigini kullanir. Toplam **7 bina** turu vardir.

Siparis sistemi ayri bina gerektirmez — mevcut binalar hem kendi kaynagini hem siparis itemlerini uretir. Boylece her binanin birden fazla amaci olur ve board temiz kalir.

### 2.1 Belediye Binasi

| Ozellik | Detay |
|---------|-------|
| Konum | Board uzerinde, tasinabilir |
| Tur | Generator (tap, enerji harcar) |
| Uretim | Ev + rare materyal (dusuk sans) |
| Ozel | Tikla → upgrade paneli (modal UI) |
| Gate | Seviyesi diger binalarin max seviyesini ve portal acilimini belirler |
| Silinemez | Evet (satis/stash yasak) |

Belediye binasi oyunun ana ilerleme mekanigi. Seviyesi yukselmedikce yeni binalar ve portal acilamaz.

### 2.2 Ev

| Ozellik | Detay |
|---------|-------|
| Kaynak | Belediye binasindan uretilir |
| Tur | **AutoGenerator** (oyun acikken otomatik uretir) |
| Uretim | Altin (consumable item olarak board'a duser) |
| Idle | Yok — sadece oyun acikken uretir |
| Siparis | Altin bazli siparis itemleri de uretebilir |
| Merge | Ev'ler merge edilebilir (daha yuksek seviye = daha fazla uretim) |

### 2.3 Taverna

| Ozellik | Detay |
|---------|-------|
| Kaynak | Altinla satin alinir / belediye gate ile acilir |
| Tur | Generator (tap, enerji harcar) |
| Uretim | Rastgele 4 irktan birinde base asker |
| Irklar | Insan, Elf, Cuce, Ork |
| Siparis | Asker bazli siparis itemleri |
| Merge | Askerler kendi aralarinda merge edilebilir (Lvl1+Lvl1=Lvl2) |

### 2.4 Demirci

| Ozellik | Detay |
|---------|-------|
| Kaynak | Altinla satin alinir / belediye gate ile acilir |
| Tur | Generator (tap, enerji harcar) |
| Uretim | Ekipman (Kilic, Yay, Asa vb.) |
| Ozel | Ekipman turu, asker sinifini belirler |
| Siparis | Ekipman bazli siparis itemleri |
| Merge | Ekipmanlar merge edilebilir (daha yuksek stat) |

### 2.5 Yemek Binasi

| Ozellik | Detay |
|---------|-------|
| Tur | **AutoGenerator** (oyun acikken otomatik uretir) |
| Uretim | Yemek (savas bileti olarak kullanilir) |
| Idle | Yok — sadece oyun acikken uretir |
| Siparis | Yemek bazli siparis itemleri |
| Tuketim | Savas baslatmak icin yemek harcanir |
| Maliyet Artisi | Kadro guclendikce savas basina yemek maliyeti artar |

### 2.6 Maden / Atolye

| Ozellik | Detay |
|---------|-------|
| Tur | Generator (tap, enerji harcar) |
| Uretim | Cesitli materyaller |
| Kullanim | Bina upgrade + portal upgrade |
| Siparis | Materyal bazli siparis itemleri |
| Merge | Materyaller merge edilebilir (daha yuksek tier) |

### 2.7 Simyaci

| Ozellik | Detay |
|---------|-------|
| Konum | **Portal board** uzerinde (ana board degil) |
| Tur | Generator (tap, enerji harcar) |
| Uretim | Sifa Iksiri (consumable benzeri item) |
| Merge | Simyacilar merge edilebilir (daha yuksek seviye = daha guclu iksir) |
| Merge (Iksir) | Iksirler merge edilebilir (Lvl1+Lvl1=Lvl2, daha fazla HP yeniler) |

**Iyilestirme Akisi:**
```
Savas bitti → Askerler hasarli (HP < %100)
       |
       v
Simyaciya tikla → Sifa Iksiri uretilir (portal board'a duser)
       |
       v
Iksiri hasarli askerin uzerine surukle-birak → HP yenilenir
       |
       v
Asker %100 HP → Merge edilebilir, savasa hazir
```

**Temel Kurallar:**
- Askerler **OLMEZ** — HP sifira dustugunde "yaralandi" durumuna gecer
- Yarali askerler (HP < %100) **merge edilemez** ve seviye atlayamaz
- Iyilestirme tamamen **surukle-birak** mekanigine dayanir (timer yok)
- Iksir seviyesi ne kadar yuksekse o kadar fazla HP yeniler
- Simyaci portal board'da oldugu icin iksir uretimi ve iyilestirme **ayni board uzerinde** gerceklesir (portal gecisi gerekmez)

Bu dongu onemlidir cunku:
- Merge ilerlemesi icin iyilestirme **zorunlu** = iksir uretimi surekli gerekli
- Simyaci enerji harcar = ekonomi sink
- Iksir merge'i = "kucuk iksir mi cok kullansam, yoksa merge edip buyuk iksir mi yapsam?" karari
- Portal board alani sinirli = iksir stoku vs kadro alani dengesi
- Timer yok, surukle-birak = aktif oynanis, daha az bekleme

### 2.8 Bina Gelistirme Sistemi

Binalar **merge edilmez**. Gelistirme UI paneli uzerinden yapilir:

```
Binaya tikla → Upgrade paneli acilir → "Gelistir" butonu
Maliyet: Materyal + Altin
```

- Binalar board'da merge ile seviye atlamaz (board kalabalik olmasin)
- Upgrade maliyeti: **Materyal + Altin** (iki kaynak birden harcanir)
- Belediye gate'i kontrol eder: bina seviyesi belediye seviyesini asamaz
- Upgrade paneli bina bilgilerini gosterir (mevcut stat, sonraki seviye bonusu, maliyet)

### 2.9 Generator Tipleri Ozet

| Bina | Tip | Board | Neden? |
|------|-----|-------|--------|
| Belediye | Generator (tap) | Ana | Degerli uretim, bilincli tiklama |
| Ev | **AutoGenerator** | Ana | Altin = temel yakit, surekli akmali |
| Taverna | Generator (tap) | Ana | Asker stratejik, oyuncu karar vermeli |
| Demirci | Generator (tap) | Ana | Ekipman degerli, bilincli uretim |
| Yemek Binasi | **AutoGenerator** | Ana | Yemek = savas bileti, surekli birikmeli |
| Maden | Generator (tap) | Ana | Materyal = upgrade kaynagi, degerli |
| Simyaci | Generator (tap) | **Portal** | Sifa iksiri uretimi, enerji harcar, surukle-birak iyilestirme |

**Idle birikim (offline) yoktur.** Retention, oyuncuyu geri getiren tetikleyicilerden gelir:
- Push notification: "Tavernan hazir, yeni asker uret!"
- Push notification: "Boss sandigin acildi!"
- Push notification: "Yeni siparisler geldi!"
- Generator cooldown ve sandik acilma sureleri

### 2.10 Bina Seviyeleri & Belediye Gate

Bina max seviyeleri ve belediye gate gereksinimleri **prototipte test edilecek (TBD)**.

Genel prensip:
- Belediye seviyesi arttikca yeni bina turleri acilir
- Her bina belirli bir belediye seviyesi gerektirir
- Portal **lvl 4 belediye** ile aktif olur

---

## 3. Asker & Ekipman Sistemi

### 3.1 Askerler

Tavernadan uretilen base askerler. Her askerin bir **irki** vardir (uretimde rastgele belirlenir).

| Irk | Ana Stat Bonusu | Aciklama |
|-----|----------------|----------|
| Insan | Dengeli | Tum stat'lar esit, her kadro icin uygun |
| Elf | Hiz + Buyu | Hizli saldiri, buyucu ekipmanla guclu |
| Cuce | Defans | Yuksek dayaniklilik, tank rolu |
| Ork | Atak | Yuksek hasar, cam top |

**Merge Zinciri:**
```
Acemi Asker (Lvl 1) → Cirak Asker (Lvl 2) → Deneyimli Asker (Lvl 3) → ... → Efsanevi Asker (Lvl N)
```

Her merge seviyesi base stat'lari arttirir (HP, Atak, Defans).

### 3.2 Ekipmanlar

Demirciden uretilir. Ekipman turu, askerin **savas sinifini** belirler.

| Ekipman | Sinif | Etki |
|---------|-------|------|
| Kilic | Savasci | Yuksek melee hasar, orta defans |
| Yay | Okcu | Ranged hasar, dusuk HP |
| Asa | Buyucu | AoE buyu hasari, dusuk defans |

**Merge Zinciri:**
```
Pasli Kilic (Lvl 1) → Celik Kilic (Lvl 2) → ... → Efsanevi Kilic (Lvl N)
```

Ekipman seviyesi stat bonusu arttirir.

### 3.3 Donanimli Asker Craft (Portal)

Portalda **recipe** ile birlestirilir:

```
Asker (herhangi irk/seviye) + Ekipman (herhangi tur/seviye) = Donanimli Asker
```

- Recipe ogrenilmis olmali (recipe scroll ile)
- Sonuc askerin irk stat'lari + ekipman stat bonusu + sinif ozelligi
- Donanimli asker portal board ust satirina yerlesir → kadro'ya otomatik eklenir

---

## 4. Portal & Savas Sistemi

### 4.1 Portal Seviyeleri

Portal board'da ozel bir item olarak durur (mevcut sistem).

| Portal Seviyesi | Durum | Gereksinim |
|----------------|-------|------------|
| Lvl 1 | Inaktif (insaat asamasi 1) | Baslangic |
| Lvl 2 | Inaktif (insaat asamasi 2) | Materyaller |
| Lvl 3 | Inaktif (insaat asamasi 3) | Materyaller |
| Lvl 4 | **Aktif** — savas ve crafting acilir | Materyaller + Belediye Lvl 4 |

Portal upgrade icin gereken materyaller: Maden/Atolye uretimi + belediye binasi rare drop'lari.

### 4.2 Portal Tema Sistemi

Her bolum (chapter) portalin gorselini ve temasini degistirir:

| Chapter | Tema | Gorsel | Guclu Sinerji |
|---------|------|--------|---------------|
| 1 | Orman | Yesil tonlar | Elf sinerjisi bonusu |
| 2 | Dag | Gri/kahve tonlar | Cuce sinerjisi bonusu |
| 3 | Karanlik | Mor/kirmizi tonlar | Ork sinerjisi bonusu |
| 4+ | ... | ... | ... |

Bu sistem oyuncuyu **kadro degistirmeye** zorlar: "Bu bolumde Elf guclu, Elf agirlikli kadro kurayim."
Portal'in rengi, arka plani ve yaratik tasarimlari temaya gore degisir.

### 4.3 Portal Board Yapisi

Portal acildiginda ikinci board — **ana board ile ayni 7x9 (63 slot) boyutunda:**

```
+-------+-------+-------+-------+-------+-------+-------+
| Kadro | Kadro | Kadro | Kadro | Kadro | Kadro | Kadro |  ← Satir 1: Kadro Slotlari (max 7)
+-------+-------+-------+-------+-------+-------+-------+
|       |       |       |       |       |       |       |  ← Satir 2-8: Craft + Iksir + Stok alani
|       |       |       |       |       |       |       |
|       |  [Simyaci]  |       |       |       |       |  ← Simyaci binasi burada bulunur
|       |       |       |       |       |       |       |
|       |       |       |       |       |       |       |
|       |       |       |       |       |       |       |
+-------+-------+-------+-------+-------+-------+-------+
| Satir 9: [Oto Yerlestir]  [Saldir]  [Ana Koy]      |  ← Butonlar
+-------+-------+-------+-------+-------+-------+-------+
```

- **Kadro Slotlari (Satir 1):** Donanimli askerler buraya yerlesir
- **Craft + Iksir Alani (Satir 2-8):** Asker+ekipman craft, simyaci iksir uretimi, iksir stoku
- **Simyaci:** Portal board'da yer alan generator, sifa iksiri uretir
- **Oto-Yerlestir Butonu:** Craft alanindaki donanimli askerleri otomatik kadro slotlarina tasir
- **Saldir Butonu:** Savas baslatir (yemek harcar)
- **Ana Koy Butonu:** Ana board'a doner + **bildirim rozeti** (hazir generator sayisi gosterir)
- Minimum 1 askerle savas baslatiabilir, max 7

### 4.3.1 Ortak Grid Mimarisi (BaseGridManager — DRY)

Her iki board da **ayni 7x9 grid yapisini** kullanir. Kod tekrarini onlemek icin ortak bir `BaseGridManager` abstract sinifi yazilir:

```
BaseGridManager (abstract)
├── Grid olusturma (7x9, slot spawn, pooling)
├── Drag & drop yonetimi
├── Item spawn/remove
├── Merge mekanigi (ayni ID kontrolu)
├── Modifier uygulamasi
└── Slot yonetimi

BoardManager : BaseGridManager          PortalBoardManager : BaseGridManager
├── Koy mekanikleri                     ├── Kadro slotlari
├── Bina sistemi                        ├── Recipe craft
├── Siparis entegrasyonu                ├── Simyaci/iksir sistemi
├── Stash entegrasyonu                  ├── Savas baslatma
└── Generator bildirim sistemi          └── Tema sistemi
```

**Toplam 126 slot** (63 ana + 63 portal) — performans icin bkz. Bolum 15.

### 4.4 Stage Sistemi

Her bolum (chapter) 10 normal yaratik + 1 boss icerir:

```
Stage 1-1:  Goblin          → Altin + XP
Stage 1-2:  Kurt            → Altin + XP + (%15 materyal sandigi)
Stage 1-3:  Iskelet         → Altin + XP
...
Stage 1-10: Trol            → Altin + XP + (%25 materyal sandigi)
Stage 1-11: BOSS: Ejderha   → Ekipman Sandigi (kesin) + Recipe Scroll (sans) + Rune Tasi (sans) + Altin + XP
```

Ilerleme lineerdir: bir yaratigi yenmeden sonrakine gecilemez.
Boss yenildiginde portal temasi bir sonraki chapter'a gecis yapar.

**Boss Kalici HP Sistemi:**
- Boss'lar yeniden spawn olmaz
- Boss'un HP'si savaslar arasinda **kaydedilir** (sifirlanmaz)
- Her savas boss'un kalan HP'sinden devam eder
- Boss yenilince → sonraki chapter acilir
- Ornek: Boss HP 1000 → 1. savas 400 hasar → kalan 600 → 2. savas 350 hasar → kalan 250 → 3. savas bitti

### 4.5 Savas Mekanigi

**Full otomatik, tur bazli:**

1. Oyuncu "Saldir" butonuna basar (yemek harcanir)
2. Kadrodaki askerler soldan saga sirayla saldiri animasyonu oynar
3. Her askerin hasari hesaplanir:
   - `Hasar = (Atak * SinifCarpani) - (YaratikDefans * 0.5)`
4. Yaratik da kadroya hasar verir:
   - `YaratikHasar = (YaratikAtak) - (KadroToplamDefans * 0.3)`
   - Hasar rastgele 1-2 askere dagilir
5. HP sifira dusen asker **OLMEZ** — "yarali" durumuna gecer (kirmizi HP bar, hareket edemez)
6. Yarali asker o savas boyunca **saldiri yapamaz** ama kadrodan cikmaz
7. Hayatta kalan askerler **hasarli kalir** (HP sifirlanmaz, iyilestirme gerekir)
8. Yaratik HP sifira duserse → **Kazandin!** → Oduller
9. Kadrodaki tum askerler yarali ise → **Kaybettin!** → Yemek harcanmis olur (askerler kaybolmaz)

**Savas Sonrasi Iyilestirme:**
- Hasarli/yarali askerler portal board'da kalir
- Simyacidan sifa iksiri uretilir
- Iksir askerin uzerine surukle-birak → HP yenilenir
- **HP < %100 olan asker merge edilemez / seviye atlayamaz**
- Bu kural oyuncuyu iyilestirmeye oncelik vermeye zorlar

**Savas Animasyonu (Basit):**
- Askerler sirasina gore az ileri gider (DOTween move)
- Yaratik uzerinde slash/hit efekti
- HP bar azalir (basit HP bar, askerlerin uzerinde)
- Yaratik saldirdiginda asker uzerinde hit efekti
- Kazanma/kaybetme ekrani + odul listesi

### 4.6 Savas Bileti: Yemek

| Kadro Gucu | Yemek Maliyeti |
|-----------|---------------|
| Dusuk (erken oyun) | 1-2 yemek |
| Orta | 3-5 yemek |
| Yuksek | 5-10 yemek |

Tam degerler prototipte balance edilecek.

---

## 5. Rune Sistemi

Rune'lar askerlere ekstra stat bonusu veren **modifier benzeri** itemlerdir.

### 5.1 Rune Turleri

| Rune | Bonus | Ikon Rengi |
|------|-------|------------|
| Guc Runu | +%Atak | Kirmizi |
| Kalkan Runu | +%Defans | Mavi |
| Can Runu | +%HP | Yesil |
| Sans Runu | +%Crit | Sari |

### 5.2 Rune Akisi

```
Rune Tasi duser (yaratik/boss loot olarak board'a gelir)
       |
       v
Board'da "Belirsiz Rune Tasi" olarak durur
       |
       v
Tikla → Rastgele rune turune donusur (Guc/Kalkan/Can/Sans)
       |
       ├─ Begenmediysen → Cope at veya sat
       ├─ Merge et → Daha guclu rune (Lvl 2, 3...)
       └─ Askere surukle → Takilir (kucuk ikon olarak gozukur)
              |
              v
       Askere cift tikla → Rune cikar (geri alinabilir)
```

### 5.3 Rune Kurallari

- Her askere **en fazla 1 rune** takilabilir
- Rune takildiginda askerin sprite'i degismez, sadece **kucuk bir ikon** gosterilir
- Rune'lar kendi aralarinda **merge edilebilir** (ayni tur + ayni seviye)
  - `Guc Runu Lvl1 + Guc Runu Lvl1 = Guc Runu Lvl2`
- Farkli turde rune'lar merge edilemez
- Rune askere suruklenerek takilir (modifier benzeri mekanik)
- Askere cift tikla → rune otomatik cikarilir (board'a geri duser)
- Belirsiz rune tasi tiklanmadan merge edilemez (once turunu belli etmeli)

### 5.4 Rune Kaynaklari

- **Boss:** Kesin rune tasi drop
- **Normal yaratik:** Dusuk sans ile rune tasi drop
- Ileride: Rune uretici generator (opsiyonel, Faz 3+)

---

## 6. Sinerji Sistemi

### 6.1 Genel Yapi

Kadroda ayni irktan veya ayni siniftan birden fazla asker olursa **sinerji bonusu** aktif olur.

**Iki katman:**
- **Irk Sinerjisi:** Ayni irktan 2+ asker
- **Sinif Sinerjisi:** Ayni siniftan 2+ asker (ekipman belirler)

Ek olarak, **portal temasi** aktif chapter'a gore belirli bir sinerjiye ekstra bonus verir.

### 6.2 Baslangic Sinerjileri (Basit)

| Sinerji | Kosul | Bonus |
|---------|-------|-------|
| Insan Birligi | 2+ Insan | Tum kadroya +%10 HP |
| Elf Cevikligi | 2+ Elf | Tum kadroya +%10 Hiz (ilk saldiri bonusu) |
| Cuce Dayanikliligi | 2+ Cuce | Tum kadroya +%15 Defans |
| Ork Ofkesi | 2+ Ork | Tum kadroya +%15 Atak |
| Savasci Durusu | 2+ Savasci | Savascilar +%20 Defans |
| Okcu Yamuru | 2+ Okcu | Okcular +%20 Atak |
| Buyu Frekansi | 2+ Buyucu | Buyuculer +%20 AoE hasari |

### 6.3 Portal Tema Bonusu

Aktif chapter temasina gore bir sinerji **ekstra %10-15 bonus** alir:
- Orman chapter'da: Elf sinerjisi +%10 ekstra
- Dag chapter'da: Cuce sinerjisi +%10 ekstra
- Karanlik chapter'da: Ork sinerjisi +%10 ekstra

Bu oyuncuyu her chapter icin **kadro degistirmeye** tesvik eder.

### 6.4 Gelecek Fazlar (Faz 3+)

- Kademeli sinerjiler: 2/4/6 asker icin artan bonus
- Ozel kombinasyon sinerjileri: "Cuce Savasci + Elf Okcu = Kale Savunmasi" gibi
- Negatif sinerjiler: Bazi irklar/siniflar birlikte daha kotu (opsiyonel, derinlik icin)

---

## 7. Loot & Odul Sistemi

### 7.1 Normal Yaratik Odulleri

Her yaratik yenildiginde:
- **Kesin:** Altin (miktar yaratik zorluguyla orantili) + XP
- **Sans bazli:** Materyal Sandigi (%10-25) + Rune Tasi (%5-10)

### 7.2 Boss Odulleri

Her boss yenildiginde:
- **Kesin:** Altin (yuksek) + XP (yuksek) + Ekipman Sandigi + Rune Tasi
- **Sans bazli:** Recipe Scroll (%30-50) + Ekstra Materyal Sandigi

### 7.3 Sandik Mekanigi

Sandilar board'a duser ve mevcut **Chest mekanigini** kullanir:

**Ekipman Sandigi (Boss'tan):**
- Board'da chest olarak durur
- **Stacklenebilir:** Ayni seviye sandik + sandik = ust seviye sandik
  - Lvl 1 Sandik: 1-2 ekipman parcasi
  - Lvl 2 Sandik: 2-3 ekipman parcasi + sans ile rare
  - Lvl 3 Sandik: 3-5 ekipman parcasi + kesin rare
- Acildiginda icinden ekipman ve/veya materyal cikar

**Materyal Sandigi:**
- Normal yaratik + boss'tan duser
- Stacklenebilir (ayni sekilde)
- Icinden bina/portal upgrade materyalleri cikar

### 7.4 Recipe Scroll

- Boss sandigindan duser (item olarak board'a gelir)
- **Consumable:** Cift tikla → recipe kalici olarak ogrenilir
- DiscoveryManager ile entegre (koleksiyon takibi)
- Ogrenilmemis recipe varsa portalda o craft yapilamaz
- Tekrar ayni scroll duserse: Altin/XP'ye donusur veya satilabilir

---

## 8. Siparis Sistemi

Mevcut siparis sistemi korunur ve genisletilir. Ayri siparis binasi **yoktur** — mevcut 6 bina hem kendi kaynagini hem siparis itemlerini uretir.

### 8.1 Siparis Kaynagi

| Bina | Siparis Itemleri |
|------|-----------------|
| Ev | Altin bazli itemler |
| Taverna | Asker bazli itemler |
| Demirci | Ekipman bazli itemler |
| Yemek Binasi | Yemek bazli itemler |
| Maden | Materyal bazli itemler |

### 8.2 Siparis Odulleri

- Altin, XP
- Bazen materyal veya yemek
- Nadir: Rune tasi veya recipe scroll

---

## 9. Tuccar Dukkani

Board disinda erisilen bir dukkan (mevcut Shop sistemi genisletilir). Tuccar, altinla satin alinabilen itemler sunar.

### 9.1 Tuccar Itemleri

| Item | Fiyat | Aciklama |
|------|-------|----------|
| Enerji Paketi | Altin | Aninda enerji doldurma |
| Kahraman Paketi | Altin / Elmas | FIFA tarzi rastgele kahraman cekme (bkz. Bolum 10) |
| Kahraman Ekipman Paketi | Altin / Elmas | Kahramana ozel ekipman cekme |
| Materyal Secimi | Altin | Belirli bir materyal turu satin alma |
| Rune Paketi | Altin | Rastgele rune tasi |
| Nadir Item'lar | Altin | Donen stok, her gun degisen ozel itemler |

### 9.2 Tuccar Ozellikleri

- Gunluk yenilenen stok (mevcut DailySpecial mekanigi)
- Bazi itemler sinirli adet (gunluk limit)
- Premium rafta elmasla alinan ozel itemler
- Tuccarin kendisi board'da yer kaplamaz, UI uzerinden erisim

---

## 10. Kahraman Sistemi (Faz 4+)

> Bu sistem endgame derinligi ve PvP icin tasarlanmistir. Ilk 3 fazdan sonra uygulanacaktir.

### 10.1 Genel

- Kahraman portal kadrosunun **4. slotunda** (orta) yer alir
- Board'da **sabit durur**, tasinamaz, silinemez
- Birden fazla kahraman edinilebilir, aktif olan degistirilebilir
- Kahramanlar **olmez**, savasda HP sifira duserse bayilir (sonraki savas icin full HP doner)

### 10.2 Kahraman Edinme: Paket Sistemi

FIFA tarzi gacha paket acma:

```
Tuccar Dukkani → Kahraman Paketi satin al (Altin veya Elmas)
       |
       v
Paket Acma Animasyonu (kart cevirme / isik efekti)
       |
       v
Rastgele Kahraman Karti (Normal / Rare / Epic / Legendary)
```

- **Altin Paket:** Dusuk sans ile iyi kahraman, f2p erisebilir
- **Elmas Paket:** Daha yuksek sans ile iyi kahraman, monetization
- Ayni kahraman tekrar gelirse: kahraman XP'sine donusur (yildiz/seviye sistemi)

### 10.3 Kahraman Ekipman Slotlari

Normal askerlerden farkli olarak kahramanin **ozel ekipman slotlari** vardir:
- Silah slotu
- Zirh slotu
- Aksesuar slotu

Kahraman ekipmanlari da paketlerden veya boss odullerinden elde edilir.

### 10.4 Kahraman Skill

Her kahramanin **benzersiz bir aktif skilli** vardir:
- Savas sirasinda otomatik tetiklenir (cooldown bazli)
- Ornek: "Ates Firtinasi — tum dusmanlara AoE hasar", "Sifa Aurasi — kadroya HP regen"
- Kahraman seviyesi arttikca skill guclenir

### 10.5 Kahraman Level-Up

- Ozel kaynak: **Kahraman Ozu** (boss loot, paket tekrari, ozel gorevler)
- Kahraman Ozu ile seviye atlar, stat'lar ve skill guclenir

---

## 11. Ekonomi

### 11.1 Kaynak Turleri

| Kaynak | Uretim | Tuketim |
|--------|--------|---------|
| **Altin** | Ev (AutoGen), yaratik odulu, siparis odulu, consumable | Bina upgrade, tuccar dukkani, kahraman paketi, enerji satin alma |
| **Yemek** | Yemek Binasi (AutoGen) | Savas bileti (kadro gucune gore artan maliyet) |
| **Materyal** | Maden/Atolye, belediye rare drop, boss/yaratik loot sandiklari | Bina upgrade, portal upgrade |
| **Enerji** | Zaman bazli regen (mevcut), **altinla satin alinabilir**, elmas/reklam ile | Generator kullanimi (Taverna, Demirci, Maden, Belediye), portal gecisi |
| **Elmas (Gems)** | IAP, ozel oduller | Premium paketler, ozel tuccar itemleri |
| **Kahraman Ozu** | Boss loot, paket tekrari, ozel gorevler | Kahraman level-up (Faz 4+) |

### 11.2 Altin Sink'leri (Harcama Yerleri)

Altinin surekli deger tasimasi icin yeterli harcama noktasi:

| Harcama | Aciklama |
|---------|----------|
| **Bina upgrade** | Materyal + Altin birlikte harcanir |
| **Tuccar dukkani** | Enerji, materyal, rune, ozel itemler |
| **Kahraman paketi** | Altin ile gacha paket acma |
| **Enerji satin alma** | Altinla enerji doldurmak (elmas yerine daha ucuz alternatif) |

### 11.4 Idle Birikim Yok

Offline kaynak birikimi **yoktur**. AutoGenerator'lar (Ev, Yemek Binasi) sadece oyun acikken uretir.

**Retention tetikleyicileri:**
- Generator cooldown sureleri (push notification)
- Sandik acilma sureleri (push notification)
- Siparis yenilenmesi (push notification)
- Stage ilerleme motivasyonu

Bu yaklasim:
- Oyuncuyu **aktif oynamaya** tesvik eder
- Balance etmesi daha kolay
- Merge2'nin aktif oynama ruhunu korur
- "Topla-cik" davranisini onler

---

## 12. Mevcut Sistemlerle Entegrasyon

### 12.1 Degismeyen Sistemler
- Board grid yapisi (7x9)
- Drag & drop mekanigi
- Merge mekanigi (ayni ID = birlestir)
- Modifier sistemi (makas/asa) — Rune bu sisteme eklenir
- Stash sistemi
- Magaza sistemi
- Enerji sistemi
- Object Pooling

### 12.2 Genisletilecek Sistemler

| Sistem | Degisiklik |
|--------|-----------|
| **MergeItemData** | Yeni kategori: `Soldier`, `Equipment`, `Building`, `Food`, `Material`, `RecipeScroll`, `LootChest`, `RuneStone` |
| **ItemCategory enum** | Yeni degerler eklenir |
| **PortalBoardManager** | 7x9 grid, kadro slotlari, simyaci, savas baslatma, oto-yerlestir, stage ilerleme, tema sistemi |
| **RecipeData** | Recipe unlock durumu (IsUnlocked → gercek kontrol) |
| **DiscoveryManager** | Recipe scroll entegrasyonu |
| **OrderManager** | Tum binalarin uretimlerini siparis olarak isteyebilir |
| **WalletManager** | Yemek, Materyal, Kahraman Ozu para birimleri + altinla enerji satin alma |
| **InfoPanelUI** | Asker/ekipman/bina/rune detaylari |
| **Modifier sistemi** | Rune turu eklenir (mevcut makas/asa yanina) |

### 12.3 Yeni Sistemler

| Sistem | Sorumluluk |
|--------|-----------|
| **BattleManager** | Savas mekanigi, hasar hesaplama, tur dongusu, animasyon yonetimi |
| **StageManager** | Stage ilerleme, yaratik verileri, odul dagilimi, chapter temasi |
| **SynergyManager** | Kadro analizi, aktif sinerji hesaplama, bonus uygulama |
| **BuildingManager** | Bina upgrade (materyal+altin), belediye gate kontrolu |
| **MerchantManager** | Tuccar dukkani, gunluk stok, altin/elmas ile satis |
| **ProductionManager** | Deaktif board'da uretim devami, bildirim rozeti, generator cooldown takibi |
| **BaseGridManager** | Ortak 7x9 grid altyapisi (BoardManager + PortalBoardManager miras alir) |
| **HeroManager** | Kahraman yonetimi, paket acma, ekipman, level-up (Faz 4+) |

---

## 13. Veri Yapilari (ScriptableObject)

### 13.1 Yeni SO'lar

```
SoldierData (ScriptableObject)
├── Race: SoldierRace (Insan/Elf/Cuce/Ork)
├── BaseHP, BaseAtk, BaseDef, BaseSpd: float
├── MergeLevel: int
├── NextLevelSoldier: SoldierData
├── PrevLevelSoldier: SoldierData
└── Sprite, AnimController: referanslar

EquipmentData (ScriptableObject)
├── EquipmentType: EquipmentType (Sword/Bow/Staff)
├── ClassType: SoldierClass (Warrior/Archer/Mage)
├── AtkBonus, DefBonus, SpdBonus: float
├── MergeLevel: int
├── NextLevelEquipment: EquipmentData
└── Sprite: referans

ArmedSoldierData (ScriptableObject)
├── BaseSoldier: SoldierData
├── Equipment: EquipmentData
├── EquippedRune: RuneData (nullable, max 1)
├── TotalHP, TotalAtk, TotalDef, TotalSpd: float (hesaplanmis)
└── Class: SoldierClass (ekipmandan gelir)

RuneData (ScriptableObject)
├── RuneType: RuneType (Power/Shield/Health/Luck)
├── BonusPercent: float
├── MergeLevel: int
├── NextLevelRune: RuneData
└── IconSprite: Sprite (kucuk overlay ikon)

CreatureData (ScriptableObject)
├── CreatureName: string
├── HP, Atk, Def: float
├── IsBoss: bool
├── StageIndex: int
├── LootTable: LootEntry[] (altin, XP, sandik, rune sanslari)
└── Sprite, AnimController: referanslar

SynergyData (ScriptableObject)
├── SynergyName: string
├── Type: SynergyType (Race/Class)
├── RequiredRace: SoldierRace (veya)
├── RequiredClass: SoldierClass
├── MinCount: int
├── Bonuses: StatBonus[]
└── Description: string

BuildingData (ScriptableObject)
├── BuildingType: BuildingType (TownHall/House/Tavern/Blacksmith/Kitchen/Mine/Alchemist)
├── Level: int
├── UpgradeMaterialCost: MaterialCost[]
├── UpgradeGoldCost: int
├── RequiredTownHallLevel: int
├── ProductionRate: float
└── NextLevelBuilding: BuildingData

HealingPotionData (ScriptableObject)
├── MergeLevel: int
├── HealAmount: float (yuzde olarak, orn %30)
├── NextLevelPotion: HealingPotionData
├── PrevLevelPotion: HealingPotionData
└── Sprite: referans

HeroData (ScriptableObject) — Faz 4+
├── HeroName: string
├── Rarity: HeroRarity (Normal/Rare/Epic/Legendary)
├── BaseHP, BaseAtk, BaseDef: float
├── SkillName: string
├── SkillDescription: string
├── SkillCooldown: float
├── Level: int
├── UpgradeCost: int (Kahraman Ozu)
├── WeaponSlot, ArmorSlot, AccessorySlot: EquipmentData
└── Sprite, AnimController: referanslar

MerchantItemData (ScriptableObject)
├── ItemName: string
├── CostType: ShopCostType (Gold/Gems)
├── CostAmount: int
├── RewardItem: MergeItemData (veya ozel odul)
├── DailyLimit: int
├── RequiredTownHallLevel: int
└── IconSprite: Sprite

ChapterData (ScriptableObject)
├── ChapterIndex: int
├── ThemeName: string (Orman/Dag/Karanlik...)
├── BoostedSynergyType: SynergyType
├── BoostedRace: SoldierRace
├── BonusPercent: float
├── Creatures: CreatureData[] (10 normal + 1 boss)
├── PortalVisuals: tema gorselleri referanslari
└── UnlockRequirement: int
```

---

## 14. Gelistirme Fazlari

### Faz 1: Koy & Uretim Sistemi
**Oncelik: Yuksek**

- [ ] Yeni ItemCategory degerleri: Soldier, Equipment, Building, Food, Material, RuneStone
- [ ] Belediye Binasi itemi + upgrade UI (modal panel)
- [ ] Ev AutoGenerator'u (altin uretimi, idle birikim yok)
- [ ] Taverna generator'u (4 irk, rastgele asker uretimi)
- [ ] Demirci generator'u (ekipman uretimi)
- [ ] Yemek Binasi AutoGenerator'u (yemek uretimi, idle birikim yok)
- [ ] Maden/Atolye generator'u (materyal uretimi)
- [ ] Simyaci binasi (portal board'da generator, sifa iksiri uretimi)
- [ ] HealingPotionData SO + iksir merge zinciri
- [ ] Surukle-birak iyilestirme mekanigi (iksir → asker)
- [ ] HP < %100 merge engeli kontrolu
- [ ] WalletManager'a Yemek ve Materyal eklenmesi
- [ ] BuildingManager: bina upgrade, belediye gate kontrolu
- [ ] Asker merge zincirleri (MergeItemData + SoldierData SO)
- [ ] Ekipman merge zincirleri (MergeItemData + EquipmentData SO)
- [ ] Materyal merge zincirleri
- [ ] Siparis sistemi genisletme (tum binalardan item isteme)
- [ ] Tuccar dukkani (mevcut Shop genisletmesi, altinla enerji/materyal/rune satin alma)
- [ ] MerchantManager + MerchantItemData SO
- [ ] Save/Load sistemi genisletme (bina durumlari)
- [ ] BaseGridManager abstract sinifi (BoardManager + PortalBoardManager DRY refactor)
- [ ] Portal board 7x9 genisletme (63 slot)
- [ ] ProductionManager (deaktif board'da uretim devami)
- [ ] Bildirim rozeti (badge) sistemi (Ana Koy / Portal butonlari)
- [ ] UI Culling (pasif board Canvas deaktivasyonu)
- [ ] 126 slot Prewarm optimizasyonu

### Faz 2: Portal Savas & Rune Sistemi
**Oncelik: Yuksek**

- [ ] Portal seviye sistemi (lvl 1-4, materyalle upgrade)
- [ ] Portal board kadro slotlari (ust satir)
- [ ] Oto-yerlestir butonu
- [ ] Portal tema sistemi (chapter bazli gorsel degisim)
- [ ] Recipe scroll item turu + DiscoveryManager entegrasyonu
- [ ] Recipe unlock mekanigi (IsUnlocked gercek kontrol)
- [ ] Asker + Ekipman = Donanimli Asker craft (portal recipe)
- [ ] ChapterData + CreatureData SO'lari
- [ ] StageManager: chapter/stage ilerleme
- [ ] BattleManager: savas dongusu, hasar hesaplama
- [ ] Savas UI: HP bar, basit animasyonlar, sonuc ekrani
- [ ] Loot sistemi: sandik drop, recipe scroll drop, rune tasi drop
- [ ] Ekipman Sandigi + Materyal Sandigi (stacklenebilir chest)
- [ ] Rune sistemi: 4 tur, belirsiz→rastgele donusum, merge, askere takilma
- [ ] Rune modifier entegrasyonu (mevcut modifier sistemi uzerine)
- [ ] Savas sonrasi odul dagitimi

### Faz 3: Sinerji, Balans & Derinlik
**Oncelik: Orta**

- [ ] SynergyManager: kadro analizi, bonus hesaplama
- [ ] SynergyData SO'lari (irk + sinif sinerjileri)
- [ ] Portal tema sinerjisi bonusu
- [ ] Sinerji UI gostergesi (savas oncesi + savas sirasi)
- [ ] Bina seviye detaylari ve belediye gate degerleri
- [ ] Yemek maliyet skalasi (kadro gucune gore)
- [ ] Stage zorluk egrisi
- [ ] Yaratik stat balance'i
- [ ] Asker/ekipman/rune stat balance'i
- [ ] Kademeli sinerjiler (2/4/6)

### Faz 4: Kahraman & PvP (Endgame)
**Oncelik: Dusuk (endgame icerigi)**

- [ ] HeroManager: kahraman yonetimi, aktif kahraman degistirme
- [ ] HeroData SO'lari (rarity, stat, skill)
- [ ] Kahraman paketi sistemi (gacha, paket acma animasyonu)
- [ ] Kahraman ekipman slotlari (silah/zirh/aksesuar)
- [ ] Kahraman Ozu kaynagi + level-up sistemi
- [ ] Kahraman skill mekanigi (savas sirasinda otomatik tetikleme)
- [ ] Kahraman board'da sabit slot (portal 4. kadro slotu)
- [ ] PvP sistemi (TBD)

---

## 15. Performans & Teknik Mimari

### 15.1 126 Slot Performans Stratejisi

Iki board (63+63 = 126 slot) ayni anda bellekte olabilir. Performans icin su stratejiler uygulanir:

**Object Pooling (Zorunlu):**
- Tum slot ve item objeleri `ObjectPoolManager.Get/Return` ile yonetilir
- Her iki board icin ayri `Prewarm` havuzlari (oyun basinda 126 slot + tahmini item sayisi)
- `Instantiate`/`Destroy` kullanan her kod **derhal** pool'a cevirilir
- Slot prefab'lari, MergeItem prefab'lari, UI elementleri dahil

**UI Culling (Pasif Board):**
- Oyuncu portal board'dayken ana board **deaktif** edilir (`gameObject.SetActive(false)` veya `Canvas.enabled = false`)
- Ayni sekilde portal board kapandiginda portal UI deaktif edilir
- Deaktif board'un Update/LateUpdate donguleri calismaz = CPU tasarrufu
- **Dikkat:** Deaktif board'daki uretim `ProductionManager` uzerinden devam eder (bkz. 15.3)

**Rendering Optimizasyonu:**
- Pasif board'un Canvas'i renderlanmaz (Canvas.enabled = false)
- Aktif board'da sadece gorunen slotlar icin sprite render

### 15.2 Teknik Borclari Durumu

| Borc | Durum |
|------|-------|
| Save/Load Sistemi (board + siparisler) | ✅ HALLEDILDI — BoardManager.SaveBoard/LoadBoard + OrderManager.SaveOrders/LoadOrders |
| PortalBoardManager Pooling | ✅ HALLEDILDI — Slot Instantiate→Get, Destroy→Return, SO cache, Prewarm |
| Recipe Cache | ✅ HALLEDILDI (onceden) — _allRecipesCache static field |
| MergeItem CanvasGroup Reset | ✅ HALLEDILDI (onceden) — SetData() icinde interactable=true |
| SpecialPackSlotUI Pooling | ✅ HALLEDILDI — Destroy→Return |
| OrderPanelUI/OrderSlotUI Pooling | ✅ HALLEDILDI (onceden) |
| BaseGridManager DRY refactor | ⬜ YAPILACAK — BoardManager + PortalBoardManager ortak base sinif |
| Portal board 7x9 genisletme | ⬜ YAPILACAK — Mevcut portal board'u 63 slota cikarma |
| ProductionManager | ⬜ YAPILACAK — Board deaktifken uretim devami |
| UI Culling | ⬜ YAPILACAK — Pasif board Canvas deaktivasyonu |

### 15.3 ProductionManager (Arka Plan Uretim Yoneticisi)

Board `SetActive(false)` yapildiginda o board'daki generator'larin `Update()` donguleri durur. Ancak uretim mantiksal olarak devam etmelidir.

**Cozum: ProductionManager (Singleton)**

```
ProductionManager.Instance
├── RegisterGenerator(generatorId, cooldownDuration, boardType)
├── UnregisterGenerator(generatorId)
├── Update() → Tum kayitli generator'larin cooldown'larini takip eder
├── GetReadyCount(boardType) → Hazir generator sayisini dondurur
└── CollectReady(generatorId) → Board aktif olunca biriken uretimi toplar
```

**Calisma Prensibi:**
1. Generator spawn olunca `ProductionManager`'a kaydolur
2. Board deaktif olsa bile `ProductionManager.Update()` cooldown sayaclarini isletir
3. Cooldown biten generator "hazir" olarak isaretlenir
4. Oyuncu o board'a donunce hazir generator'lar gorsel olarak guncellenir (titreme animasyonu vb.)

### 15.4 Bildirim Rozeti (Badge) Sistemi

Oyuncu portal board'undayken ana koydeki hazir generator'lari takip edebilmek icin:

```
[Ana Koy] butonu uzerinde bildirim rozeti:
  ┌─────────┐
  │ Ana Koy │ (3)  ← 3 generator hazir
  └─────────┘
```

- `ProductionManager.GetReadyCount(BoardType.Main)` ile hazir generator sayisi alinir
- Sayi > 0 ise buton uzerinde kirmizi rozet gosterilir
- Ayni mekanik tersten de calisir: ana board'dayken portal butonunda "Simyaci hazir" rozeti
- Rozet her saniye guncellenir (`ProductionManager` event'i ile)

---

## 16. Gelecek Fikirler (Faz 4+)

Simdilik scope disinda, ileriye donuk notlar:

- **PvP / Liderlik Tablosu** — Kahraman sistemiyle birlikte (Bolum 10)
- **Coklu Portal:** Farkli alemlere acilan portallar (Elf Diyari, Cuce Kralligi vb.)
- **Gizli Etkilesimler:** Belirli itemleri yan yana koyunca bonus tetikleme (easter egg)
- **Rune Kirma/Birlestirme:** 3 farkli turde rune → rastgele yuksek seviye rune
- **Tutorial / Yeni Oyuncu Rehberi**
- **Ses Sistemi / Haptic Feedback**
- **Analytics / A-B Test Altyapisi**

---

## 17. Acik Sorular (TBD)

- Bina max seviyeleri ve belediye gate degerleri
- Asker/ekipman merge zinciri uzunlugu (kac seviye?)
- Stage basina yaratik stat egrisi
- Yemek maliyet formulu
- Sinerji bonus yuzdeleri (final degerler)
- Sifa iksiri iyilestirme miktarlari (iksir seviyesine gore)
- Simyaci uretim cooldown ve enerji maliyeti
- Rune drop oranlari
- Retention / FOMO / Monetization stratejisi (ayri oturumda detaylandirilacak)
