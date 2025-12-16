/**
 * Dynamic Legend Configuration
 * Defines specific interpretation for each layer parameter
 */

export const layerLegendConfig = {
  // Layer 1: Keteraturan Bangunan
  1: {
    name: "Keteraturan Bangunan",
    parameter: "Keteraturan Bangunan",
    classifications: {
      5: {
        label: "Sangat Teratur",
        description: "Bangunan tersusun sangat rapi dan teratur dengan pola yang konsisten",
        interpretation: "Optimal"
      },
      4: {
        label: "Teratur",
        description: "Bangunan tersusun cukup rapi dengan beberapa pola yang baik",
        interpretation: "Baik"
      },
      3: {
        label: "Cukup Teratur",
        description: "Bangunan memiliki keteraturan sedang dengan beberapa ketidakteraturan",
        interpretation: "Sedang"
      },
      2: {
        label: "Tidak Teratur",
        description: "Bangunan tersusun tidak teratur dengan banyak ketidakteraturan",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Tidak Teratur",
        description: "Bangunan sangat tidak teratur, acak dan tidak memiliki pola",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 2: Kepadatan Bangunan
  2: {
    name: "Kepadatan Bangunan",
    parameter: "Kepadatan Bangunan",
    classifications: {
      5: {
        label: "Sangat Rendah",
        description: "Kepadatan bangunan sangat rendah dengan jarak antar bangunan luas",
        interpretation: "Optimal"
      },
      4: {
        label: "Rendah",
        description: "Kepadatan bangunan rendah dengan jarak antar bangunan cukup",
        interpretation: "Baik"
      },
      3: {
        label: "Sedang",
        description: "Kepadatan bangunan sedang dengan jarak antar bangunan terbatas",
        interpretation: "Sedang"
      },
      2: {
        label: "Tinggi",
        description: "Kepadatan bangunan tinggi dengan jarak antar bangunan sempit",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Tinggi",
        description: "Kepadatan bangunan sangat tinggi, bangunan sangat berdempetan",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 3: Ketidaksesuaian dengan Rencana Tata Ruang
  3: {
    name: "Ketidaksesuaian dengan Rencana Tata Ruang",
    parameter: "Kesesuaian RTRW",
    classifications: {
      5: {
        label: "Sangat Sesuai",
        description: "Penggunaan lahan sangat sesuai dengan RTRW yang ditetapkan",
        interpretation: "Optimal"
      },
      4: {
        label: "Sesuai",
        description: "Penggunaan lahan sesuai dengan RTRW yang ditetapkan",
        interpretation: "Baik"
      },
      3: {
        label: "Cukup Sesuai",
        description: "Penggunaan lahan cukup sesuai dengan beberapa penyimpangan minor",
        interpretation: "Sedang"
      },
      2: {
        label: "Tidak Sesuai",
        description: "Penggunaan lahan tidak sesuai dengan RTRW yang ditetapkan",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Tidak Sesuai",
        description: "Penggunaan lahan sangat menyimpang dari RTRW yang ditetapkan",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 4: Kepadatan Penduduk
  4: {
    name: "Kepadatan Penduduk",
    parameter: "Kepadatan Penduduk",
    classifications: {
      5: {
        label: "Sangat Rendah",
        description: "Kepadatan penduduk sangat rendah, ideal untuk kualitas hidup",
        interpretation: "Optimal"
      },
      4: {
        label: "Rendah",
        description: "Kepadatan penduduk rendah, kondusif untuk kehidupan",
        interpretation: "Baik"
      },
      3: {
        label: "Sedang",
        description: "Kepadatan penduduk sedang, mulai ada tekanan infrastruktur",
        interpretation: "Sedang"
      },
      2: {
        label: "Padat",
        description: "Kepadatan penduduk tinggi, tekanan pada infrastruktur signifikan",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Padat",
        description: "Kepadatan penduduk sangat tinggi, over-capacity infrastruktur",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 5: Ketidaktersediaan Akses Aman Air Minum
  5: {
    name: "Ketidaktersediaan Akses Aman Air Minum",
    parameter: "Akses Air Minum",
    classifications: {
      5: {
        label: "Sangat Baik",
        description: "Akses air minum sangat baik, tersedia air bersih untuk semua",
        interpretation: "Optimal"
      },
      4: {
        label: "Baik",
        description: "Akses air minum baik, mayoritas penduduk terlayani",
        interpretation: "Baik"
      },
      3: {
        label: "Sedang",
        description: "Akses air minum sedang, sebagian penduduk kesulitan",
        interpretation: "Sedang"
      },
      2: {
        label: "Buruk",
        description: "Akses air minum buruk, banyak penduduk tidak terlayani",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Buruk",
        description: "Akses air minum sangat buruk, krisis air bersih",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 6: Ketidaktersediaan Akses Aman Air Sanitasi
  6: {
    name: "Ketidaktersediaan Akses Aman Air Sanitasi",
    parameter: "Akses Sanitasi",
    classifications: {
      5: {
        label: "Sangat Baik",
        description: "Sistem sanitasi sangat baik, semua rumah memiliki sanitasi layak",
        interpretation: "Optimal"
      },
      4: {
        label: "Baik",
        description: "Sistem sanitasi baik, mayoritas rumah tersanitasi",
        interpretation: "Baik"
      },
      3: {
        label: "Sedang",
        description: "Sistem sanitasi sedang, beberapa rumah kurang sanitasi",
        interpretation: "Sedang"
      },
      2: {
        label: "Buruk",
        description: "Sistem sanitasi buruk, banyak rumah tanpa sanitasi layak",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Buruk",
        description: "Sistem sanitasi sangat buruk, krisis sanitasi lingkungan",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 7: Pengelolaan Air Limbah
  7: {
    name: "Pengelolaan Air Limbah",
    parameter: "Pengelolaan Air Limbah",
    classifications: {
      5: {
        label: "Sangat Baik",
        description: "Pengelolaan air limbah sangat baik dengan sistem terpadu",
        interpretation: "Optimal"
      },
      4: {
        label: "Baik",
        description: "Pengelolaan air limbah baik dengan sistem yang memadai",
        interpretation: "Baik"
      },
      3: {
        label: "Sedang",
        description: "Pengelolaan air limbah sedang, perlu peningkatan",
        interpretation: "Sedang"
      },
      2: {
        label: "Buruk",
        description: "Pengelolaan air limbah buruk, limbah tidak terkelola baik",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Buruk",
        description: "Pengelolaan air limbah sangat buruk, pencemaran tinggi",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 8: Kualitas Permukaan Jalan Lingkungan
  8: {
    name: "Kualitas Permukaan Jalan Lingkungan",
    parameter: "Kualitas Jalan",
    classifications: {
      5: {
        label: "Sangat Baik",
        description: "Jalan beraspal mulus, kondisi prima dan terawat",
        interpretation: "Optimal"
      },
      4: {
        label: "Baik",
        description: "Jalan beraspal baik dengan sedikit kerusakan",
        interpretation: "Baik"
      },
      3: {
        label: "Sedang",
        description: "Jalan dengan kerusakan sedang, perlu perbaikan",
        interpretation: "Sedang"
      },
      2: {
        label: "Buruk",
        description: "Jalan rusak parah, banyak lubang dan tidak rata",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Buruk",
        description: "Jalan rusak total atau tanah tidak beraspal",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 9: Drainase Lingkungan
  9: {
    name: "Drainase Lingkungan",
    parameter: "Drainase Lingkungan",
    classifications: {
      5: {
        label: "Sangat Baik",
        description: "Sistem drainase sangat baik, tidak ada genangan air",
        interpretation: "Optimal"
      },
      4: {
        label: "Baik",
        description: "Sistem drainase baik, genangan minimal",
        interpretation: "Baik"
      },
      3: {
        label: "Sedang",
        description: "Sistem drainase sedang, sesekali terjadi genangan",
        interpretation: "Sedang"
      },
      2: {
        label: "Buruk",
        description: "Sistem drainase buruk, sering terjadi genangan",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Buruk",
        description: "Sistem drainase sangat buruk, genangan kronis",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 10: Penyediaan Proteksi Kebakaran
  10: {
    name: "Penyediaan Proteksi Kebakaran",
    parameter: "Proteksi Kebakaran",
    classifications: {
      5: {
        label: "Sangat Baik",
        description: "Proteksi kebakaran sangat lengkap dengan akses mudah",
        interpretation: "Optimal"
      },
      4: {
        label: "Baik",
        description: "Proteksi kebakaran baik dengan fasilitas memadai",
        interpretation: "Baik"
      },
      3: {
        label: "Sedang",
        description: "Proteksi kebakaran sedang, fasilitas terbatas",
        interpretation: "Sedang"
      },
      2: {
        label: "Buruk",
        description: "Proteksi kebakaran buruk, fasilitas sangat terbatas",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Buruk",
        description: "Proteksi kebakaran sangat buruk atau tidak ada",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 11: Tempat Pembuangan Sampah
  11: {
    name: "Tempat Pembuangan Sampah",
    parameter: "Pengelolaan Sampah",
    classifications: {
      5: {
        label: "Sangat Baik",
        description: "Sistem pengelolaan sampah sangat baik dan terpadu",
        interpretation: "Optimal"
      },
      4: {
        label: "Baik",
        description: "Sistem pengelolaan sampah baik dengan pengangkutan rutin",
        interpretation: "Baik"
      },
      3: {
        label: "Sedang",
        description: "Sistem pengelolaan sampah sedang, perlu peningkatan",
        interpretation: "Sedang"
      },
      2: {
        label: "Buruk",
        description: "Sistem pengelolaan sampah buruk, sampah menumpuk",
        interpretation: "Buruk"
      },
      1: {
        label: "Sangat Buruk",
        description: "Sistem pengelolaan sampah sangat buruk, sampah berserakan",
        interpretation: "Sangat Buruk"
      }
    }
  },

  // Layer 12: Indeks Kekumuhan Komposit (Gabungan)
  12: {
    name: "Indeks Kekumuhan Komposit",
    parameter: "Indeks Komposit",
    classifications: {
      5: {
        label: "Sangat Baik",
        description: "Kondisi permukiman sangat baik dengan semua parameter terpenuhi optimal",
        interpretation: "Permukiman Prima"
      },
      4: {
        label: "Baik",
        description: "Kondisi permukiman baik dengan mayoritas parameter terpenuhi",
        interpretation: "Permukiman Layak"
      },
      3: {
        label: "Sedang",
        description: "Kondisi permukiman sedang, beberapa parameter perlu perbaikan",
        interpretation: "Permukiman Cukup"
      },
      2: {
        label: "Kumuh",
        description: "Kondisi permukiman kumuh, banyak parameter di bawah standar",
        interpretation: "Kumuh Ringan"
      },
      1: {
        label: "Sangat Kumuh",
        description: "Kondisi permukiman sangat kumuh, memerlukan penanganan prioritas",
        interpretation: "Kumuh Berat"
      }
    }
  }
};

/**
 * Get legend configuration for specific layer
 * @param {number} layerId - Layer ID
 * @returns {object} - Legend configuration
 */
export function getLegendConfig(layerId) {
  return layerLegendConfig[layerId] || layerLegendConfig[12]; // Default to composite
}

/**
 * Get classification label for specific layer and value
 * @param {number} layerId - Layer ID
 * @param {number} value - Classification value (1-5)
 * @returns {object} - Classification details
 */
export function getClassificationForLayer(layerId, value) {
  const config = getLegendConfig(layerId);
  return config.classifications[value] || config.classifications[3]; // Default to medium
}