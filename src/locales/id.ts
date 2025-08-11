export const id = {
  categories: {
    underweight: {
      name: "Kurus",
      range: "BMI < 18.5",
      recommendations: [
        "Konsultasikan dengan tenaga kesehatan untuk menentukan apakah perlu menambah berat badan",
        "Fokus pada makanan bergizi untuk menambah berat badan secara sehat",
        "Pertimbangkan latihan kekuatan untuk membangun massa otot",
        "Pantau kondisi kesehatan yang mendasar",
      ],
    },
    normal_weight: {
      name: "Normal",
      range: "BMI 18.5 - 24.9",
      recommendations: [
        "Pertahankan berat badan saat ini melalui diet seimbang dan olahraga teratur",
        "Lanjutkan kebiasaan gaya hidup sehat",
        "Pemeriksaan kesehatan rutin untuk perawatan preventif",
        "Tetap aktif secara fisik dengan minimal 150 menit olahraga sedang per minggu",
      ],
    },
    overweight: {
      name: "Kelebihan Berat Badan",
      range: "BMI 25.0 - 29.9",
      recommendations: [
        "Pertimbangkan pengurangan berat badan melalui pembatasan kalori dan peningkatan aktivitas fisik",
        "Targetkan penurunan berat badan 5-10% sebagai tujuan awal",
        "Fokus pada perubahan gaya hidup yang berkelanjutan",
        "Konsultasikan dengan tenaga kesehatan untuk rencana manajemen berat badan yang dipersonalisasi",
      ],
    },
    obese_class_i: {
      name: "Obesitas Kelas I",
      range: "BMI 30.0 - 34.9",
      recommendations: [
        "Pengurangan berat badan direkomendasikan untuk mengurangi risiko kesehatan",
        "Gabungkan perubahan pola makan dengan aktivitas fisik teratur",
        "Pertimbangkan bimbingan profesional dari ahli gizi atau tenaga kesehatan",
        "Pantau kondisi kesehatan terkait obesitas (diabetes, hipertensi, dll.)",
      ],
    },
    obese_class_ii: {
      name: "Obesitas Kelas II",
      range: "BMI 35.0 - 39.9",
      recommendations: [
        "Pengurangan berat badan yang signifikan direkomendasikan untuk mengurangi risiko kesehatan serius",
        "Cari bimbingan medis profesional untuk manajemen berat badan yang komprehensif",
        "Pertimbangkan program penurunan berat badan yang diawasi medis",
        "Pemantauan rutin untuk komplikasi kardiovaskular dan metabolik",
      ],
    },
    obese_class_iii: {
      name: "Obesitas Kelas III (Obesitas Berat)",
      range: "BMI ≥ 40.0",
      recommendations: [
        "Konsultasi medis segera direkomendasikan untuk manajemen obesitas berat",
        "Pertimbangkan evaluasi operasi bariatrik jika metode lain telah gagal",
        "Perawatan medis komprehensif untuk komorbiditas terkait obesitas",
        "Pendekatan multidisiplin termasuk nutrisi, olahraga, dan dukungan psikologis",
      ],
    },
  },
  errors: {
    weight_positive: "Berat badan harus berupa angka positif dalam kilogram",
    height_positive: "Tinggi badan harus berupa angka positif dalam meter",
    height_unrealistic:
      "Tinggi badan tampak tidak realistis. Pastikan tinggi dalam meter, bukan sentimeter",
    weight_unrealistic:
      "Berat badan tampak tidak realistis. Pastikan berat dalam kilogram",
    cm_positive: "Tinggi badan dalam sentimeter harus berupa angka positif",
    lbs_positive: "Berat badan dalam pound harus berupa angka positif",
  },
  units: {
    kg: "kg",
    m: "m",
    cm: "cm",
    lbs: "lbs",
    feet: "kaki",
    inches: "inci",
  },
};
