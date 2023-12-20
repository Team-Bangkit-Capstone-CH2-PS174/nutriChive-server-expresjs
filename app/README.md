kelompok CH2-PS174
1 (ML) M312BSY0473 – Andika Kavin Septiano – Universitas Sebelas Maret - Active
2 (ML) M312BSY0914 – Muhammad Anang Fathur Rohman – Universitas Sebelas Maret
- Active
3 (ML) M312BSY1043 – Mohammad Al Furqon – Universitas Sebelas Maret - Active
4 (CC) C157BSY4206 – Dani Hidayat – Universitas Mayasari Bakti - Active
5 (CC) C183BSY3336 – Iqbal Dwi Nur Khoirul Anam – Universitas Amikom Yogyakarta -
Active
6 7 (MD) A157BSY2857 – Agung Muhammad Albaehaqi – Universitas Mayasari Bakti -
Active
8 (MD) A296BSX2632 – Aisyatuz Zahroh – Universitas Pembangunan Nasional Veteran
Jawa Timur - Active



# Nutrichive Backend
1. clone my project
2. npm install
3. npm run dev //for local database
4. npm run prod //for server database

## API Endpoints

## Auth
 | Method | Endpoint | Expectation | Code | Response Body | Result |
| --- | --- | --- | --- | --- | --- |
| POST | /auth/register | Bisa menambahkan data User | 201 | Access Token dan Satu data User | ✅ |
| POST | /auth/login | Bisa log In dengan Email dan Password | 200 | Access Token dan Satu data User | ✅ |

## Product
| Method | Endpoint | Expectation | Code | Response Body | Result |
| --- | --- | --- | --- | --- | --- |
| GET | /products | Bisa mengambil daftar data product | 200 | Array data Article | ✅ |
| GET | /products/{id} | Bisa mengambil salah satu data products | 200 | Satu data products | ✅ |

| GET | /products/listfavorite/ | Bisa mengambil salah satu data list favorite products | 200 | Satu data products | ✅ |

| POST | /products/favorite | Bisa menambah salah satu data products | 200 | Satu data products | ✅ |

| POST | /products/unfavorite | Bisa menghapus salah satu data favorite products | 200 | Satu data products | ✅ |

| GET | /products/searchFav?id_product | Bisa mencari salah satu data list favorite products | 200 | Satu data products | ✅ |

## technology
![Express.js](assets/Express.png)








