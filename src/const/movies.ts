export interface EpisodeDetail {
    id: number;
    episodeNumber: number;
    title: string;
    duration: number;
    description: string;
    thumbnail: string;
    progress?: number;
}

interface CommonMetadata {
    id: string;
    title: string;
    year: number;
    thumbnail: string;
    thumbnailLandscape: string;
    rating: number;
    ageRating: string;
    genres: string[];
    casts: string[];
    creators: string[];
    description: string;
    trailerUrl: string;
    progress?: number;
    isNewEpisode?: boolean;
    isPremium?: boolean;
    isTop10?: boolean;
}

export interface MovieType extends CommonMetadata {
    type: 'movie';
    duration: number;
    totalEpisodes?: never;
    episodes?: never;
}

export interface SeriesType extends CommonMetadata {
    type: 'series';
    totalEpisodes: number;
    episodes: EpisodeDetail[];
    lastWatchedEpisodeId?: number;
    duration?: never;
}

export type Movie = MovieType | SeriesType;

export const ALL_CONTENT: Record<number, Movie> = {
    // MOVIE SECTION
    1: {
        id: "1",
        type: 'movie',
        title: "Don't Look Up",
        year: 2021,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/dont-look-up.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/dont-look-up.png",
        rating: 4.3,
        ageRating: "18+",
        duration: 138,
        genres: ["Drama", "Komedi"],
        casts: ["Leonardo DiCaprio", "Jennifer Lawrence", "Meryl Streep", "Cate Blanchett"],
        creators: ["Adam McKay"],
        description: "Dua astronom tingkat rendah harus melakukan tur media raksasa untuk memperingatkan umat manusia tentang komet yang mendekat yang akan menghancurkan planet Bumi.",
    },
    2: {
        id: "2",
        type: 'movie',
        title: "A Man Called Otto",
        year: 2022,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/otto.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/otto.png",
        rating: 4.4,
        ageRating: "13+",
        duration: 126,
        genres: ["Drama", "Komedi"],
        casts: ["Tom Hanks", "Mariana Treviño", "Rachel Keller"],
        creators: ["Marc Forster"],
        description: "Otto adalah seorang pria paruh baya pemarah yang dunianya berubah saat sebuah keluarga muda yang ceria pindah ke sebelah rumahnya.",
        isPremium: true,
    },
    3: {
        id: "3",
        type: 'movie',
        title: "The Tomorrow War",
        year: 2021,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/tomorrow-war.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/tomorrow-war.png",
        rating: 4.2,
        ageRating: "18+",
        duration: 138,
        genres: ["Aksi", "Petualangan"],
        casts: ["Chris Pratt", "Yvonne Strahovski", "J.K. Simmons"],
        creators: ["Chris McKay"],
        description: "Seorang guru sekolah menengah dipanggil untuk bertempur di masa depan dalam perang global melawan spesies alien yang mematikan.",
        isTop10: true
    },
    4: {
        id: "4",
        type: 'movie',
        title: "Jurassic World Dominion",
        year: 2022,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/jurassic-world.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/jurassic-world.png",
        rating: 4.0,
        ageRating: "13+",
        duration: 147,
        genres: ["Aksi", "Petualangan"],
        casts: ["Chris Pratt", "Bryce Dallas Howard", "Laura Dern", "Jeff Goldblum"],
        creators: ["Colin Trevorrow"],
        description: "Empat tahun setelah kehancuran Isla Nublar, dinosaurus sekarang hidup—dan berburu—bersama manusia di seluruh dunia.",
    },
    5: {
        id: "5",
        type: 'movie',
        title: "Black Adam",
        year: 2022,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/black-adam.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/black-adam.png",
        rating: 3.9,
        ageRating: "13+",
        duration: 125,
        genres: ["Aksi", "Fantasi", "Sci-Fi"],
        casts: ["Dwayne Johnson", "Aldis Hodge", "Pierce Brosnan", "Noah Centineo"],
        creators: ["Jaume Collet-Serra"],
        description: "Setelah 5.000 tahun dianugerahi kekuatan maha kuasa dari dewa Mesir—dan dipenjara dengan cepat—Black Adam dibebaskan dari makam dunianya, siap untuk melepaskan bentuk keadilannya yang unik di dunia modern.",
        isTop10: true
    },
    6: {
        id: "6",
        type: 'movie',
        title: "Ant-Man and the Wasp: Quantumania",
        year: 2023,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/ant-man.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/ant-man.png",
        rating: 3.8,
        ageRating: "13+",
        duration: 124,
        genres: ["Aksi", "Petualangan"],
        casts: ["Paul Rudd", "Evangeline Lilly", "Jonathan Majors", "Kathryn Newton"],
        creators: ["Peyton Reed"],
        description: "Scott Lang dan Hope van Dyne, bersama orang tua Hope, menjelajahi Alam Kuantum, di mana mereka berinteraksi dengan makhluk aneh dan memulai petualangan yang melampaui batas apa pun yang mereka anggap mungkin.",
        isTop10: true
    },
    7: {
        id: "7",
        title: "Suzume",
        type: 'movie',
        year: 2022,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/suzume.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/suzume.png",
        rating: 4.9,
        ageRating: "13+",
        duration: 122,
        genres: ["Anime", "Petualangan"],
        casts: ["Nanoka Hara", "Hokuto Matsumura", "Eri Fukatsu"],
        creators: ["Makoto Shinkai"],
        description: "Seorang gadis remaja berusia 17 tahun bertemu pemuda misterius yang mencari pintu. Bersama-sama, mereka melakukan perjalanan melintasi Jepang untuk mengunci pintu-pintu yang melepaskan bencana.",
        isPremium: true
    },
    8: {
        id: "8",
        type: 'movie',
        title: "Sonic the Hedgehog 2",
        year: 2022,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/sonic-2.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/sonic-2.png",
        rating: 4.7,
        ageRating: "SU",
        duration: 122,
        genres: ["Aksi", "Komedi", "Petualangan"],
        casts: ["Ben Schwartz", "Idris Elba", "Jim Carrey", "James Marsden"],
        creators: ["Jeff Fowler"],
        description: "Setelah menetap di Green Hills, Sonic sangat ingin membuktikan bahwa dia memiliki apa yang diperlukan untuk menjadi pahlawan sejati, tepat saat Dr. Robotnik kembali bersama mitra baru, Knuckles.",
        isPremium: true,
        isTop10: true
    },
    9: {
        id: "9",
        type: 'movie',
        title: "Big Hero 6",
        year: 2014,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/big-hero-6.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/big-hero-6.png",
        rating: 4.8,
        ageRating: "SU",
        duration: 102,
        genres: ["Aksi", "Petualangan"],
        casts: ["Scott Adsit", "Ryan Potter", "Daniel Henney", "T.J. Miller"],
        creators: ["Don Hall", "Chris Williams"],
        description: "Ikatan khusus terjalin antara robot kesehatan berukuran besar bernama Baymax dan jenius teknologi Hiro Hamada, yang membentuk tim pahlawan teknologi untuk mengungkap misteri kriminal.",
    },
    10: {
        id: "10",
        type: 'movie',
        title: "Guardians of the Galaxy Vol. 3",
        year: 2023,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/gotg-3.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/gotg-3.png",
        rating: 4.8,
        ageRating: "13+",
        duration: 150,
        genres: ["Aksi", "Petualangan"],
        casts: ["Chris Pratt", "Chukwudi Iwuji", "Bradley Cooper", "Zoe Saldaña"],
        creators: ["James Gunn"],
        description: "Masih terguncang karena kehilangan Gamora, Peter Quill harus mengerahkan timnya untuk misi berbahaya demi menyelamatkan nyawa Rocket—misi yang jika gagal, bisa mengakhiri Guardians seperti yang kita kenal.",
        isTop10: true
    },
    11: {
        id: "11",
        type: 'movie',
        title: "Doctor Strange in the Multiverse of Madness",
        year: 2022,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/dr-strange.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/dr-strange.png",
        rating: 4.3,
        ageRating: "13+",
        duration: 126,
        genres: ["Aksi", "Fantasi", "Petualangan"],
        casts: ["Benedict Cumberbatch", "Elizabeth Olsen", "Xochitl Gomez", "Benedict Wong"],
        creators: ["Sam Raimi"],
        description: "Doctor Strange merapal mantra terlarang yang membuka pintu ke multiverse, termasuk versi alternatif dirinya, yang mengancam kemanusiaan dan memaksa dia bekerja sama dengan America Chavez.",
        isTop10: true
    },
    12: {
        id: "12",
        type: 'movie',
        title: "The Little Mermaid",
        year: 2023,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/little-mermaid.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/little-mermaid.png",
        rating: 4.1,
        ageRating: "SU",
        duration: 135,
        genres: ["Fantasi", "Petualangan"],
        casts: ["Halle Bailey", "Jonah Hauer-King", "Melissa McCarthy", "Javier Bardem"],
        creators: ["Rob Marshall"],
        description: "Ariel, putri duyung bungsu Raja Triton yang haus akan petualangan, membuat kesepakatan dengan penyihir laut jahat untuk merasakan kehidupan di daratan dan mengejar cinta sang pangeran.",
        isTop10: true
    },
    13: {
        id: "13",
        type: 'movie',
        title: "Missing",
        year: 2023,
        trailerUrl: "/assets/trailer/ant-man.mp4",
        thumbnail: "/assets/thumbnail/portrait/missing.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/missing.png",
        rating: 4.5,
        ageRating: "13+",
        duration: 111,
        genres: ["Drama", "Thriller"],
        casts: ["Storm Reid", "Nia Long", "Ken Leung"],
        creators: ["Will Merrick", "Nick Johnson"],
        description: "Setelah ibunya menghilang saat berlibur di Kolombia bersama kekasih barunya, June menggunakan alat digital terbaru untuk menemukannya sebelum terlambat, namun ia justru mengungkap rahasia yang mengerikan.",
    },
    // SERIES SECTION
    14: {
        id: "14",
        type: 'series',
        title: "All of Us Are Dead",
        year: 2022,
        trailerUrl: "/assets/trailer/duty-after-school.mp4",
        thumbnail: "/assets/thumbnail/portrait/all-of-us-are-dead.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/all-of-us-are-dead.png",
        rating: 4.5,
        ageRating: "18+",
        totalEpisodes: 12,
        genres: ["Aksi", "KDrama"],
        casts: ["Park Ji-hu", "Yoon Chan-young", "Cho Yi-hyun", "Lomon"],
        creators: ["Lee Jue-kyu", "Chun Sung-il"],
        description: "Sekelompok siswa terjebak di sekolah menengah mereka saat wabah virus zombie merebak. Mereka harus berjuang untuk bertahan hidup.",
        isTop10: true,
        lastWatchedEpisodeId: 1401,
        episodes: [
            {
                id: 1401,
                episodeNumber: 1,
                title: "Episode 1",
                duration: 67,
                description: "Di SMA Hyosan, seorang siswa digigit oleh tikus laboratorium, memicu rangkaian kejadian mengerikan yang mengubah sekolah menjadi medan perang.",
                thumbnail: "/assets/thumbnail/landscape/all-of-us-are-dead.png",
                progress: 60
            },
            {
                id: 1402,
                episodeNumber: 2,
                title: "Episode 2",
                duration: 70,
                description: "Virus menyebar dengan cepat ke seluruh sekolah. On-jo dan Cheong-san berjuang menyelamatkan diri saat kantin sekolah berubah menjadi lautan zombie.",
                thumbnail: "/assets/thumbnail/landscape/all-of-us-are-dead.png",
                progress: 1
            },
            {
                id: 1403,
                episodeNumber: 3,
                title: "Episode 3",
                duration: 67,
                description: "Di SMA Hyosan, seorang siswa digigit oleh tikus laboratorium, memicu rangkaian kejadian mengerikan yang mengubah sekolah menjadi medan perang.",
                thumbnail: "/assets/thumbnail/landscape/all-of-us-are-dead.png",
                progress: 60
            },
        ],
    },
    15: {
        id: "15",
        type: 'series',
        title: "Blue Lock",
        year: 2022,
        trailerUrl: "/assets/trailer/duty-after-school.mp4",
        thumbnail: "/assets/thumbnail/portrait/blue-lock.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/blue-lock.png",
        rating: 4.6,
        ageRating: "SU",
        totalEpisodes: 24,
        genres: ["Anime", "Thriller"],
        casts: ["Tasuku Kaito", "Kazuki Ura", "Yuki Ono"],
        creators: ["Tetsuaki Watanabe", "Muneyuki Kaneshiro"],
        description: "Keinginan Jepang untuk kejayaan Piala Dunia membawa Federasi Sepak Bola Jepang meluncurkan program pelatihan baru yang radikal untuk menemukan striker egois terbaik.",
        isNewEpisode: true,
        lastWatchedEpisodeId: 1501,
        episodes: [
            {
                id: 1501,
                episodeNumber: 1,
                title: "Dream",
                duration: 24,
                description: "Isagi Yoichi menghadapi dilema setelah kekalahan timnya dan menerima undangan ke fasilitas pelatihan misterius bernama Blue Lock.",
                thumbnail: "/assets/thumbnail/landscape/blue-lock.png",
                progress: 45
            }
        ],
    },
    16: {
        id: "16",
        type: 'series',
        title: "Alice in Borderland",
        year: 2020,
        trailerUrl: "/assets/trailer/duty-after-school.mp4",
        thumbnail: "/assets/thumbnail/portrait/alice-in-borderland.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/alice-in-borderland.png",
        rating: 4.8,
        ageRating: "18+",
        totalEpisodes: 16,
        genres: ["Aksi", "KDrama"],
        casts: ["Kento Yamazaki", "Tao Tsuchiya", "Nijiro Murakami"],
        creators: ["Shinsuke Sato"],
        description: "Seorang gamer yang terobsesi dan dua temannya menemukan diri mereka berada di Tokyo yang aneh dan kosong, di mana mereka harus menyelesaikan permainan berbahaya untuk bertahan hidup.",
        isTop10: true,
        lastWatchedEpisodeId: 1601,
        episodes: [
            {
                id: 1601,
                episodeNumber: 1,
                title: "Episode 1",
                duration: 50,
                description: "Arisu dan teman-temannya berlari ke toilet umum untuk bersembunyi dari polisi, tetapi saat mereka keluar, jalanan Tokyo tiba-tiba kosong melompong.",
                thumbnail: "/assets/thumbnail/landscape/alice-in-borderland.png",
                progress: 25
            }
        ],
    },
    17: {
        id: "17",
        type: 'series',
        title: "My Perfect Stranger",
        year: 2023,
        trailerUrl: "/assets/trailer/duty-after-school.mp4",
        thumbnail: "/assets/thumbnail/portrait/my-perfect-stranger.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/my-perfect-stranger.png",
        rating: 4.7,
        ageRating: "13+",
        totalEpisodes: 16,
        genres: ["Fantasi", "KDrama"],
        casts: ["Kim Dong-wook", "Jin Ki-joo", "Seo Ji-hye"],
        creators: ["Kang Soo-yeon", "Baek So-yeon"],
        description: "Yoon Hae-jun dan Baek Yoon-young terjebak di tahun 1987. Yang satu mencari kebenaran di balik kasus pembunuhan berantai, dan yang lain mencoba mencegah pernikahan orang tuanya.",
        isPremium: true,
        lastWatchedEpisodeId: 1701,
        episodes: [
            {
                id: 1701,
                episodeNumber: 1,
                title: "Episode 1",
                duration: 62,
                description: "Hae-jun menemukan sebuah mobil tua yang ternyata adalah mesin waktu. Sementara itu, Yoon-young mengalami hari yang buruk yang mengubah hidupnya selamanya.",
                thumbnail: "/assets/thumbnail/landscape/my-perfect-stranger.png",
                progress: 25
            }
        ],
    },
    18: {
        id: "18",
        type: 'series',
        title: "Ted Lasso",
        year: 2020,
        trailerUrl: "/assets/trailer/duty-after-school.mp4",
        thumbnail: "/assets/thumbnail/portrait/ted-lasso.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/ted-lasso.png",
        rating: 4.9,
        ageRating: "13+",
        totalEpisodes: 34,
        genres: ["Komedi", "Drama", "Olahraga"],
        casts: ["Jason Sudeikis", "Hannah Waddingham", "Brett Goldstein"],
        creators: ["Bill Lawrence", "Jason Sudeikis"],
        description: "Ted Lasso, seorang pelatih football perguruan tinggi Amerika dari Kansas, disewa untuk melatih tim sepak bola profesional di Inggris, meskipun tidak memiliki pengalaman melatih sepak bola.",
        isPremium: true,
        lastWatchedEpisodeId: 1801,
        episodes: [
            {
                id: 1801,
                episodeNumber: 1,
                title: "Pilot",
                duration: 30,
                description: "Pelatih sepak bola Amerika, Ted Lasso, disewa oleh pemilik klub kaya untuk melatih tim sepak bola Inggris, AFC Richmond.",
                thumbnail: "/assets/thumbnail/landscape/ted-lasso.png",
                progress: 30
            }
        ],
    },
    19: {
        id: "19",
        type: 'series',
        title: "Duty After School",
        year: 2023,
        trailerUrl: "/assets/trailer/duty-after-school.mp4",
        thumbnail: "/assets/thumbnail/portrait/duty-after-school.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/duty-after-school.png",
        rating: 4.4,
        ageRating: "18+",
        totalEpisodes: 10,
        genres: ["Aksi", "Thriller", "Sci-Fi"],
        casts: ["Shin Hyun-soo", "Lee Soon-won", "Lim Se-mi"],
        creators: ["Sung Yong-il"],
        description: "Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.",
        isNewEpisode: true,
        isTop10: true,
        lastWatchedEpisodeId: 1901,
        episodes: [
            {
                id: 1901,
                episodeNumber: 1,
                title: "Episode 1",
                duration: 73,
                description: "Saat bola-bola misterius mulai jatuh dari langit, pemerintah mengumumkan bahwa semua siswa SMA akan menerima pelatihan militer sebagai pengganti kegiatan ekstrakurikuler.",
                thumbnail: "/assets/thumbnail/landscape/duty-after-school.png",
                progress: 30
            }
        ],
    },
    20: {
        id: "20",
        type: 'series',
        title: "Happiness",
        year: 2021,
        trailerUrl: "/assets/trailer/duty-after-school.mp4",
        thumbnail: "/assets/thumbnail/portrait/happiness.png",
        thumbnailLandscape: "/assets/thumbnail/landscape/happiness.png",
        rating: 4.6,
        ageRating: "18+",
        totalEpisodes: 12,
        genres: ["Thriller", "Aksi", "Drama"],
        casts: ["Han Hyo-joo", "Park Hyung-sik", "Jo Woo-jin"],
        creators: ["Ahn Gil-ho", "Han Sang-woon"],
        description: "Sebuah gedung apartemen baru diisolasi setelah wabah penyakit menular yang membuat penderitanya haus darah muncul, memicu perjuangan psikologis dan fisik untuk bertahan hidup.",
        lastWatchedEpisodeId: 2001,
        episodes: [
            {
                id: 2001,
                episodeNumber: 1,
                title: "Episode 1",
                duration: 65,
                description: "Sae-bom mendapatkan kesempatan untuk memiliki apartemen impian melalui program khusus, namun ia harus berurusan dengan kasus penyakit aneh yang melibatkan obat misterius.",
                thumbnail: "/assets/thumbnail/landscape/happiness.png",
                progress: 30
            }
        ],
    },
};

export const CONTINUE_WATCHING: Movie[] = [
    { ...ALL_CONTENT[1], progress: 80 },
    { ...ALL_CONTENT[14] },
    { ...ALL_CONTENT[15] },
    { ...ALL_CONTENT[2], progress: 20 },
    { ...ALL_CONTENT[3], progress: 65 },
    { ...ALL_CONTENT[4], progress: 45 },
];

export const CONTINUE_WATCHING_MOVIES: Movie[] = [
    { ...ALL_CONTENT[1], progress: 80 },
    { ...ALL_CONTENT[2], progress: 20 },
    { ...ALL_CONTENT[3], progress: 65 },
    { ...ALL_CONTENT[4], progress: 45 },
    { ...ALL_CONTENT[5], progress: 75 },
    { ...ALL_CONTENT[6], progress: 15 },
];

export const CONTINUE_WATCHING_SERIES: Movie[] = [
    { ...ALL_CONTENT[16] },
    { ...ALL_CONTENT[17] },
    { ...ALL_CONTENT[14] },
    { ...ALL_CONTENT[18] },
    { ...ALL_CONTENT[19] },
    { ...ALL_CONTENT[15] },
];

export const TOP_RATING: Movie[] = [
    { ...ALL_CONTENT[19] },
    { ...ALL_CONTENT[7] },
    { ...ALL_CONTENT[14] },
    { ...ALL_CONTENT[4] },
    { ...ALL_CONTENT[8] },
    { ...ALL_CONTENT[9] },
];

export const TOP_RATING_MOVIES: Movie[] = [
    { ...ALL_CONTENT[8] },
    { ...ALL_CONTENT[2] },
    { ...ALL_CONTENT[3] },
    { ...ALL_CONTENT[7] },
    { ...ALL_CONTENT[4] },
    { ...ALL_CONTENT[6] },
];

export const TOP_RATING_SERIES: Movie[] = [
    { ...ALL_CONTENT[19] },
    { ...ALL_CONTENT[17] },
    { ...ALL_CONTENT[14] },
    { ...ALL_CONTENT[18] },
    { ...ALL_CONTENT[16] },
    { ...ALL_CONTENT[20] },
];

export const CHILL_EXCLUSIVE_MOVIES: Movie[] = [
    { ...ALL_CONTENT[7] },
    { ...ALL_CONTENT[4] },
    { ...ALL_CONTENT[8] },
    { ...ALL_CONTENT[9] },
    { ...ALL_CONTENT[2] },
    { ...ALL_CONTENT[11] },
];

export const CHILL_EXCLUSIVE_SERIES: Movie[] = [
    { ...ALL_CONTENT[17] },
    { ...ALL_CONTENT[19] },
    { ...ALL_CONTENT[18] },
    { ...ALL_CONTENT[14] },
    { ...ALL_CONTENT[16] },
    { ...ALL_CONTENT[20] },
];

export const TRENDING: Movie[] = [
    { ...ALL_CONTENT[3] },
    { ...ALL_CONTENT[18] },
    { ...ALL_CONTENT[6] },
    { ...ALL_CONTENT[19] },
    { ...ALL_CONTENT[10] },
    { ...ALL_CONTENT[11] },
];

export const TRENDING_MOVIES: Movie[] = [
    { ...ALL_CONTENT[3] },
    { ...ALL_CONTENT[6] },
    { ...ALL_CONTENT[10] },
    { ...ALL_CONTENT[11] },
    { ...ALL_CONTENT[5] },
    { ...ALL_CONTENT[12] },
];

export const TRENDING_SERIES: Movie[] = [
    { ...ALL_CONTENT[18] },
    { ...ALL_CONTENT[19] },
    { ...ALL_CONTENT[17] },
    { ...ALL_CONTENT[16] },
    { ...ALL_CONTENT[15] },
    { ...ALL_CONTENT[20] },
];

export const NEW_RELEASE: Movie[] = [
    { ...ALL_CONTENT[6] },
    { ...ALL_CONTENT[19] },
    { ...ALL_CONTENT[13] },
    { ...ALL_CONTENT[14] },
    { ...ALL_CONTENT[5] },
    { ...ALL_CONTENT[20] },
];

export const NEW_RELEASE_MOVIES: Movie[] = [
    { ...ALL_CONTENT[6] },
    { ...ALL_CONTENT[13] },
    { ...ALL_CONTENT[5] },
    { ...ALL_CONTENT[12] },
    { ...ALL_CONTENT[11] },
    { ...ALL_CONTENT[8] },
];

export const NEW_RELEASE_SERIES: Movie[] = [
    { ...ALL_CONTENT[19] },
    { ...ALL_CONTENT[14] },
    { ...ALL_CONTENT[20] },
    { ...ALL_CONTENT[16] },
    { ...ALL_CONTENT[18] },
    { ...ALL_CONTENT[17] },
];

export const MY_LIST: Movie[] = [
    { ...ALL_CONTENT[7] },
    { ...ALL_CONTENT[19] },
    { ...ALL_CONTENT[4] },
    { ...ALL_CONTENT[17] },
    { ...ALL_CONTENT[1] },
    { ...ALL_CONTENT[15] },
    { ...ALL_CONTENT[9] },
    { ...ALL_CONTENT[18] },
    { ...ALL_CONTENT[6] },
    { ...ALL_CONTENT[20] },
    { ...ALL_CONTENT[2] },
    { ...ALL_CONTENT[14] },
];