import mongoose from "mongoose";
import dotenv from "dotenv";
import Content from "../models/Content.js";
import Menu from "../models/Menu.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

// ─────────────────────────────────────────────────────────────────
// All images from https://picsum.photos — free, no key, no login.
// poster_url  → 300 × 450   (portrait  — movie cards)
// banner_url  → 1280 × 720  (landscape — hero banners)
// ─────────────────────────────────────────────────────────────────

const menuData = [
  { name: "Home", slug: "home", contentType: "all", order: 1, isActive: true },
  { name: "Movies", slug: "movies", contentType: "movie", order: 2, isActive: true },
  { name: "Shows", slug: "shows", contentType: "show", order: 3, isActive: true },
  { name: "Originals", slug: "originals", contentType: "original", order: 4, isActive: true },
];

const contentData = [
  {
    "title": "Hotspot 2",
    "description": "An aspiring director presents three distinct narratives that satirically reflect on society, blending romance and comedy in an entertaining anthology.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1E412F9-4EE5-4D7E-AFFB-EFBC04C63B33/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1E412F9-4EE5-4D7E-AFFB-EFBC04C63B33/0-16x9.jpg?width=1280",
    "genre": ["Romance", "Comedy"],
    "release_year": 2026,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.0,
    "popularity": 88,
    "duration": "1h 58m",
    "cast": ["Ashwin Kumar", "Priya Bhavani Shankar", "MS Bhaskar", "Rakshan", "Thambi Ramaiah"]
  },
  {
    "title": "Drive",
    "description": "An unknown hacker targets a powerful media tycoon. What starts as a cyber attack turns into a profoundly personal nightmare, forcing him into a deadly mind game before everything crashes down.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/6CD09DBF-0D8E-4FA8-A4B0-43D16E60F115/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/6CD09DBF-0D8E-4FA8-A4B0-43D16E60F115/0-16x9.jpg?width=1280",
    "genre": ["Action", "Thriller"],
    "release_year": 2025,
    "type": "movie",
    "language": "Telugu",
    "rating": 7.4,
    "popularity": 84,
    "duration": "1h 46m",
    "cast": ["Aadi Pinishetty", "Madonna Sebastian", "Kamal Kamaraju", "Raja Chembolu"]
  },
  {
    "title": "Aadi Shambhala",
    "description": "When a mysterious meteor crashes into the superstitious village of Shambhala in the 1980s, strange events begin. An atheist scientist arrives to investigate, only to confront an ancient terror.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/91B37D19-AF75-4184-884F-7C2EC2809368/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/91B37D19-AF75-4184-884F-7C2EC2809368/0-16x9.jpg?width=1280",
    "genre": ["Action", "Horror", "Thriller"],
    "release_year": 2025,
    "type": "movie",
    "language": "Telugu",
    "rating": 7.1,
    "popularity": 80,
    "duration": "2h 24m",
    "cast": ["Aadi", "Archana Iyer", "Swasika Vijay", "Madhunandan", "Shiju"]
  },
  {
    "title": "K-Ramp",
    "description": "Kumar, a carefree Hyderabad student forced to study in Kerala, falls for a local girl named Mercy. Their love blossoms but faces obstacles from family, culture clashes and his troubled past.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/22D9E841-D008-4F3F-9C3D-06C306209E9A/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/22D9E841-D008-4F3F-9C3D-06C306209E9A/0-16x9.jpg?width=1280",
    "genre": ["Romance", "Comedy"],
    "release_year": 2025,
    "type": "movie",
    "language": "Telugu",
    "rating": 7.2,
    "popularity": 78,
    "duration": "2h 17m",
    "cast": ["Kiran Abbavaram", "Yukti Thareja", "Sai Kumar", "Naresh", "Ali", "Vennela Kishore"]
  },
  {
    "title": "Psych Siddhartha",
    "description": "Siddharth loses love, money, and self-respect, leading to a series of misadventures. Just when hope returns through Shravya, a strong single mother, his turbulent past threatens his fresh start.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/0F598AED-27BE-451B-8B5D-3609D0A43767/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/0F598AED-27BE-451B-8B5D-3609D0A43767/0-16x9.jpg?width=1280",
    "genre": ["Comedy", "Romance"],
    "release_year": 2026,
    "type": "movie",
    "language": "Telugu",
    "rating": 6.8,
    "popularity": 74,
    "duration": "1h 58m",
    "cast": ["Nandu", "Yamini Bhasker", "Priyanka Rebekah", "Simha N", "Sukesh Reddy"]
  },
  {
    "title": "Bomb",
    "description": "A dark comedy set in Kaalakammaipatti. When a dead atheist's body starts releasing gas, villagers believe it's a miracle. Two rival groups battle over it, creating hilarious chaos across the village.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/95CE2E61-7BE1-4284-9654-ADE5EA63983B/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/95CE2E61-7BE1-4284-9654-ADE5EA63983B/0-16x9.jpg?width=1280",
    "genre": ["Comedy", "Drama"],
    "release_year": 2025,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.5,
    "popularity": 82,
    "duration": "2h 13m",
    "cast": ["Arjun Das", "Shivathmika Rajashekar", "Kaali Venkat", "Nassar", "Abhirami"]
  },
  {
    "title": "Phoenix Veezhan",
    "description": "Surya, accused of political murder, is sent to a juvenile reformatory. Inside he faces a vengeful warden and enemies plotting his death. Can he survive and find a second chance at life?",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E12C8B32-C1B2-417B-8701-9FA9DDBFE390/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E12C8B32-C1B2-417B-8701-9FA9DDBFE390/0-16x9.jpg?width=1280",
    "genre": ["Action", "Drama"],
    "release_year": 2025,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.3,
    "popularity": 77,
    "duration": "1h 59m",
    "cast": ["Surya Sethupathi", "Varsha Viswanath", "Sampath Raj", "Varalaxmi Sarathkumar", "Harish Uthaman"]
  },
  {
    "title": "Mahasenha",
    "description": "A greedy forest officer and a smuggler conspire to steal a precious idol during a village festival. When his pet elephant goes missing, Senguttuvan must rally courage and faith to stop the criminals.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/B7D93DE1-91CA-48EC-B79E-BC0B8351C45A/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/B7D93DE1-91CA-48EC-B79E-BC0B8351C45A/0-16x9.jpg?width=1280",
    "genre": ["Action", "Thriller"],
    "release_year": 2025,
    "type": "movie",
    "language": "Tamil",
    "rating": 6.9,
    "popularity": 72,
    "duration": "2h 7m",
    "cast": ["Vimal", "Yogi Babu", "Shrusti Dangae", "Kabir Duhan Singh", "John Vijay"]
  },
  {
    "title": "Premistunnaa",
    "description": "A young man struggles to express his deep love to a girl who fails to understand his inner world. A heartfelt romantic drama about unspoken emotions and the burning desire for connection.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/2427F26E-0FDA-40E5-BC8E-0E9123954A6D/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/2427F26E-0FDA-40E5-BC8E-0E9123954A6D/0-16x9.jpg?width=1280",
    "genre": ["Drama", "Romance"],
    "release_year": 2025,
    "type": "movie",
    "language": "Telugu",
    "rating": 6.7,
    "popularity": 69,
    "duration": "2h 27m",
    "cast": ["Sathvik Varma", "Preethi Neha", "Viji Chandrashekar", "Subbu Panchu"]
  },
  {
    "title": "Paanch Minar",
    "description": "When Chotu's surprise party for his don father ends in tragedy, he inherits a criminal empire and uncovers his uncle's deceit. Meanwhile a pretend-deaf cab driver gets entangled with twin murderers.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F262E7FE-EE7A-4743-B06A-A5E3C71CDD67/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F262E7FE-EE7A-4743-B06A-A5E3C71CDD67/0-16x9.jpg?width=1280",
    "genre": ["Comedy", "Crime", "Thriller"],
    "release_year": 2025,
    "type": "movie",
    "language": "Telugu",
    "rating": 7.0,
    "popularity": 75,
    "duration": "2h 11m",
    "cast": ["Raj Tarun", "Rashi Singh", "Ajay Ghosh", "Brahmaji", "Srinivasa Reddy"]
  },
  {
    "title": "Ayalaan",
    "description": "Four friends stumble upon a lost alien and decide to help him return home. Things turn dangerous when a ruthless scientist hunts the alien to create a deadly bioweapon, threatening all of Earth.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1C526B44-8389-4ED1-A5B1-0DF7F8433942/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1C526B44-8389-4ED1-A5B1-0DF7F8433942/0-16x9.jpg?width=1280",
    "genre": ["Action", "Comedy", "Sci-Fi"],
    "release_year": 2024,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.3,
    "popularity": 79,
    "duration": "2h 31m",
    "cast": ["Sivakarthikeyan", "Rakul Preet Singh", "Isha Koppikar", "Sharad Kelkar", "Yogi Babu"]
  },
  {
    "title": "Tantra",
    "description": "A timid girl named Rekha, gifted with the ability to see spirits, is compelled to confront an evil tantric. Her childhood friend Teju stands by her as supernatural and social darkness converge around them.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/32A18797-B194-4029-9FF2-926859055787/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/32A18797-B194-4029-9FF2-926859055787/0-16x9.jpg?width=1280",
    "genre": ["Drama", "Horror", "Thriller"],
    "release_year": 2024,
    "type": "movie",
    "language": "Telugu",
    "rating": 5.2,
    "popularity": 65,
    "duration": "2h 14m",
    "cast": ["Ananya Nagalla", "Dhanush Raghumudri", "Saloni Aswani", "Temper Vamshi", "Meesala Lakshman"]
  },
  {
    "title": "Prasanna Vadanam",
    "description": "Surya is a radio jockey with face blindness who unexpectedly gets drawn into a suspenseful murder mystery. Can he overcome his rare condition to reveal the truth before he becomes the next victim?",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/5A523429-3E15-4CFE-9890-43EE9364FE28/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/5A523429-3E15-4CFE-9890-43EE9364FE28/0-16x9.jpg?width=1280",
    "genre": ["Thriller"],
    "release_year": 2024,
    "type": "movie",
    "language": "Telugu",
    "rating": 7.8,
    "popularity": 87,
    "duration": "2h 23m",
    "cast": ["Suhas", "Rashi Singh", "Payal Radhakrishna", "Harsha Chemudu", "Nithin Prasanna"]
  },
  {
    "title": "Balu Gani Talkies",
    "description": "Balu, a passionate cinephile, fights to save his late father's cinema theatre from his scheming uncle. When an old man dies on premiere night, Balu becomes the main suspect in a blackmail-murder case.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/418133EF-2181-44C8-85EB-ED6A2E049CD4/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/418133EF-2181-44C8-85EB-ED6A2E049CD4/0-16x9.jpg?width=1280",
    "genre": ["Comedy Drama", "Crime"],
    "release_year": 2024,
    "type": "movie",
    "language": "Telugu",
    "rating": 7.0,
    "popularity": 71,
    "duration": "2h 2m",
    "cast": ["Shivakumar Ramachandravarapu", "Saranya Sharma", "Raghu Kunche", "Sudhakar Reddy"]
  },
  {
    "title": "Prathinidhi 2",
    "description": "After the Chief Minister is assassinated in his office, honest journalist Chetan becomes the prime suspect. As a CBI officer probes the case, Chetan races to uncover the political conspiracy and clear his name.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1A9B496-CF8B-45AD-8028-6B72759BE561/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1A9B496-CF8B-45AD-8028-6B72759BE561/0-16x9.jpg?width=1280",
    "genre": ["Political Thriller", "Drama"],
    "release_year": 2024,
    "type": "movie",
    "language": "Telugu",
    "rating": 7.7,
    "popularity": 85,
    "duration": "2h 13m",
    "cast": ["Nara Rohit", "Siri Lella", "Jisshu Sengupta", "Sachin Khedekar", "Udaya Bhanu"]
  },
  {
    "title": "Gorre Puranam",
    "description": "A sheep named Ram dreams of a green meadow seen from a hilltop. Jailed to avoid sacrifice, he befriends inmate Suhas. Together they navigate village politics, media frenzy and a daring escape.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CFB78448-8432-4314-8305-13C141F44673/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CFB78448-8432-4314-8305-13C141F44673/0-16x9.jpg?width=1280",
    "genre": ["Comedy Drama"],
    "release_year": 2024,
    "type": "movie",
    "language": "Telugu",
    "rating": 7.2,
    "popularity": 73,
    "duration": "1h 41m",
    "cast": ["Suhas", "Vishika Kota", "Posani Krishna Murali", "Raghu Karumanchi"]
  },
  {
    "title": "Sevappi",
    "description": "A five-year-old boy in rural Tamil Nadu believes he has given birth to a red chicken named Sevappi. His innocent love for the bird ignites a family feud that escalates into a caste conflict across the village.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/77B28B04-998E-42FC-ADA3-058C139FCFC0/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/77B28B04-998E-42FC-ADA3-058C139FCFC0/0-16x9.jpg?width=1280",
    "genre": ["Drama"],
    "release_year": 2023,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.4,
    "popularity": 70,
    "duration": "1h 53m",
    "cast": ["Poornima Ravi", "Rishikanth", "Shravan Athvethan", "Sebastin Antony", "Thanesh Venkat"]
  },
  {
    "title": "Maruthi Nagar Police Station",
    "description": "A revenge suspense thriller set inside a police station. When one of five childhood friends is murdered nearby, cop Archana investigates and uncovers dark truths hidden within the station itself.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9A4F0439-E692-4D75-95F2-882FA61FEBA8/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9A4F0439-E692-4D75-95F2-882FA61FEBA8/0-16x9.jpg?width=1280",
    "genre": ["Crime", "Thriller"],
    "release_year": 2023,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.0,
    "popularity": 74,
    "duration": "1h 57m",
    "cast": ["Varalaxmi Sarathkumar", "Aarav Kizar", "Santhosh Prathap", "Mahat Raghavendra"]
  },
  {
    "title": "Rathasaatchi",
    "description": "Set in 1980s Andhra, activist Appu fights corrupt landlords and an oppressive system. When a vengeful cop hunts him, Appu flees into the forest, eventually choosing surrender to bring about lasting peace.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1982E133-464E-42EF-8D2F-F6BF8C8011BF/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1982E133-464E-42EF-8D2F-F6BF8C8011BF/0-16x9.jpg?width=1280",
    "genre": ["Political Thriller", "Social Drama"],
    "release_year": 2022,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.6,
    "popularity": 76,
    "duration": "2h 3m",
    "cast": ["Kanna Ravi", "Elango Kumaravel", "Kalyan Kumar", "Aarubala", "Madras Vinoth"]
  },
  {
    "title": "Writer",
    "description": "Thangaraj, a police station writer trying to unionise the department, gets unwittingly implicated in the unjust arrest of a PhD student. Consumed by guilt, he risks his career to save the innocent young man.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F317B9E6-C92E-476D-94A1-0D44DE921F4B/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F317B9E6-C92E-476D-94A1-0D44DE921F4B/0-16x9.jpg?width=1280",
    "genre": ["Crime", "Thriller"],
    "release_year": 2022,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.8,
    "popularity": 80,
    "duration": "2h 27m",
    "cast": ["Samuthirakani", "Ineya", "Harikrishnan Anbudurai", "Dileepan", "G.M. Sundar"]
  },
  {
    "title": "Sila Nerangalil Sila Manidhargal",
    "description": "Four strangers — an arrogant son, a disgruntled hotel attendant, an aspiring actor, and an IT professional — are unexpectedly bound together by a single incident, each undergoing a life-changing internal journey.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/71C1AC07-EFFC-4319-BB94-2B4C98A41632/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/71C1AC07-EFFC-4319-BB94-2B4C98A41632/0-16x9.jpg?width=1280",
    "genre": ["Drama"],
    "release_year": 2022,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.5,
    "popularity": 72,
    "duration": "2h 13m",
    "cast": ["Ashok Selvan", "Nassar", "Manikandan K", "K.S. Ravikumar", "Anju Kurian", "Riythvika"]
  },
  {
    "title": "Udanpaal",
    "description": "A struggling brother and sister scheme to claim government compensation after news of their father's death in a building collapse — only for their father to walk back home alive, triggering comic chaos.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1E83ADA7-8332-4E2F-8AAB-D52A6140D1E4/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1E83ADA7-8332-4E2F-8AAB-D52A6140D1E4/0-16x9.jpg?width=1280",
    "genre": ["Family Drama", "Comedy"],
    "release_year": 2022,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.3,
    "popularity": 68,
    "duration": "1h 53m",
    "cast": ["Linga", "Gayathri Shankar", "Vivek Prasanna", "VTM Charlie", "Abarnathi", "Dheena"]
  },
  {
    "title": "Shanmukha",
    "description": "Shanmukha, born with a deformed face, turns to black magic to heal himself. An investigative journalist discovers a disturbing pattern of missing women and dying boyfriends, all connected to him.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/51D16FD5-F1F2-48E8-8DA4-591475005D93/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/51D16FD5-F1F2-48E8-8DA4-591475005D93/0-16x9.jpg?width=1280",
    "genre": ["Drama", "Thriller"],
    "release_year": 2025,
    "type": "movie",
    "language": "Telugu",
    "rating": 6.8,
    "popularity": 71,
    "duration": "1h 59m",
    "cast": ["Aadi", "Avika Gor", "Aditya Om", "Chirag Jani", "Ariyana Glory"]
  },
  {
    "title": "Hide N Seek",
    "description": "In a peaceful town, mysterious murders shake the community. A compassionate medical student is framed for a killing and must form an unlikely alliance with a determined detective to unmask the true killer.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BCB3316F-FEEE-4B66-9E6D-75F85333A7FE/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BCB3316F-FEEE-4B66-9E6D-75F85333A7FE/0-16x9.jpg?width=1280",
    "genre": ["Crime", "Thriller"],
    "release_year": 2024,
    "type": "movie",
    "language": "Telugu",
    "rating": 6.9,
    "popularity": 70,
    "duration": "2h 14m",
    "cast": ["Viswant", "Shilpa Manjunath", "Rheaa Sachdeva", "Sumanth Verella", "Viva Raghava"]
  },
  {
    "title": "Marco",
    "description": "Marco, an adoptive son of the Adattu crime family, discovers his brother was brutally murdered. He launches a ruthless quest for vengeance, finding only betrayal and unimaginable brutality at every turn.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CAB2DB04-1375-4CA2-BCF2-59413F10EAE5/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CAB2DB04-1375-4CA2-BCF2-59413F10EAE5/0-16x9.jpg?width=1280",
    "genre": ["Action", "Thriller"],
    "release_year": 2024,
    "type": "movie",
    "language": "Telugu",
    "rating": 8.0,
    "popularity": 90,
    "duration": "2h 22m",
    "cast": ["Unni Mukundan", "Siddique", "Kabir Duhan Singh", "Anson Paul"]
  },
  {
    "title": "The Door",
    "description": "An architect at a cursed job site becomes entangled with a restless ghost, who forces her to uncover a decades-old murder with a shocking connection to her own family history.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C5EC1BD3-EBA4-49C0-968F-5F6E7147D76C/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C5EC1BD3-EBA4-49C0-968F-5F6E7147D76C/0-16x9.jpg?width=1280",
    "genre": ["Horror", "Thriller"],
    "release_year": 2025,
    "type": "movie",
    "language": "Tamil",
    "rating": 6.9,
    "popularity": 69,
    "duration": "2h 11m",
    "cast": ["Bhavana", "Ganesh Venkatraman", "Jayaprakash", "Sriranjini"]
  },
  {
    "title": "Guardian",
    "description": "Interior designer Aparna consults psychiatrist Rudran about strange events in her life. A vengeful ghost named Meera then appears, seeking Aparna's help to avenge those who murdered her.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BE00C2BE-2EB1-40DD-954E-079E17B6C54B/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BE00C2BE-2EB1-40DD-954E-079E17B6C54B/0-16x9.jpg?width=1280",
    "genre": ["Horror", "Thriller"],
    "release_year": 2024,
    "type": "movie",
    "language": "Telugu",
    "rating": 6.5,
    "popularity": 66,
    "duration": "1h 53m",
    "cast": ["Pradeep Rayan", "Hansika", "Suresh Menon", "Sriman", "Mottai Rajendran"]
  },
  {
    "title": "Laandhar",
    "description": "A one-night thriller in which fearless cop Aravind stops a liquor racket then comes home to his wife. Their night is disrupted by attacks from a mysterious raincoated figure that keeps eluding the police.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/EEB3E601-F59C-41C1-9FCF-DE23D4AA4DD1/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/EEB3E601-F59C-41C1-9FCF-DE23D4AA4DD1/0-16x9.jpg?width=1280",
    "genre": ["Drama", "Thriller"],
    "release_year": 2024,
    "type": "movie",
    "language": "Tamil",
    "rating": 6.6,
    "popularity": 64,
    "duration": "1h 55m",
    "cast": ["Vidharth", "Swetha Dorothy", "Sahana Chandrashekar"]
  },
  {
    "title": "PA PA (O Naanna)",
    "description": "A heartfelt family drama about a young couple who face an unexpected pregnancy. Despite challenges of teenage parenthood, their son Adithya's deep love for his father drives this emotional journey.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/907F39AA-DF0A-4734-B80F-BCBA3676FE92/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/907F39AA-DF0A-4734-B80F-BCBA3676FE92/0-16x9.jpg?width=1280",
    "genre": ["Family Drama"],
    "release_year": 2024,
    "type": "movie",
    "language": "Tamil",
    "rating": 7.1,
    "popularity": 70,
    "duration": "2h 9m",
    "cast": ["Kavin", "Aparna Das", "VTV Ganesh", "K. Bhagyaraj", "Aishwarya Bhaskaran"]
  },
  {
    "title": "Eleven",
    "description": "An intelligent cop is assigned to investigate a complex case. The more he probes, the deeper the mystery becomes, leading to a thrilling climax that finally unravels the true nature of the crime.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CE1D0BE3-EA7A-47C7-BAFC-076C46071884/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CE1D0BE3-EA7A-47C7-BAFC-076C46071884/0-16x9.jpg?width=1280",
    "genre": ["Thriller"],
    "release_year": 2025,
    "type": "movie",
    "language": "Telugu",
    "rating": 7.0,
    "popularity": 73,
    "duration": "2h 14m",
    "cast": ["Naveen Chandra", "Reyaa Hari", "Abhirami", "Aadukalam Naren"]
  },
  {
    "title": "Viswam",
    "description": "Anti-Terrorist Squad member Viswam returns to Hyderabad to clear his father's name. He falls in love while simultaneously uncovering a Pakistan ISI terrorist plot and protecting a young murder witness.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9D13DDA3-E8DE-43E3-9837-2BBE2A02549B/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9D13DDA3-E8DE-43E3-9837-2BBE2A02549B/0-16x9.jpg?width=1280",
    "genre": ["Action"],
    "release_year": 2024,
    "type": "movie",
    "language": "Telugu",
    "rating": 6.5,
    "popularity": 68,
    "duration": "2h 33m",
    "cast": ["Gopichand", "Kavya Thapar", "Sunil", "Vennela Kishore", "Jisshu Sengupta"]
  },
  {
    "title": "Unstoppable with NBK",
    "description": "An iconic talk show hosted by legendary actor Nandamuri Balakrishna featuring unfiltered and candid conversations with celebrities. The most entertaining, engaging and emotional ride with Balayya.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E51CB6A8-D3A9-474C-84E7-BDB6B2980239/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E51CB6A8-D3A9-474C-84E7-BDB6B2980239/0-16x9.jpg?width=1280",
    "genre": ["Talk Show", "Entertainment"],
    "release_year": 2023,
    "type": "original",
    "language": "Telugu",
    "rating": 8.5,
    "popularity": 95,
    "duration": "50m–1h 27m per episode",
    "cast": ["Nandamuri Balakrishna", "Nani", "Ravi Teja", "Rana Daggubati", "Mahesh Babu"]
  },
  {
    "title": "Dhoolpet Police Station",
    "description": "At Dhoolpet Police Station, ACP Vetrimaran and ACP Arjun work together to investigate a string of brutal decapitation murders in this gripping aha original crime thriller.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/48C7DB18-7A84-46DE-9936-A7A69E681F9D/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/48C7DB18-7A84-46DE-9936-A7A69E681F9D/0-16x9.jpg?width=1280",
    "genre": ["Crime", "Thriller"],
    "release_year": 2025,
    "type": "original",
    "language": "Telugu",
    "rating": 8.1,
    "popularity": 88,
    "duration": "22m–29m per episode",
    "cast": ["Getup Srinu", "Raghu Babu", "Maasani", "Maadhangi", "Praveen"]
  },
  {
    "title": "SARKAAR",
    "description": "A popular Telugu game show hosted by Sudigaali Sudheer where celebrities showcase their wit, betting strategies and entertainment in a fun-filled format across multiple seasons.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/836A0A87-656C-46FE-BBD1-F12BA6088F68/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/836A0A87-656C-46FE-BBD1-F12BA6088F68/0-16x9.jpg?width=1280",
    "genre": ["Game Show", "Comedy"],
    "release_year": 2021,
    "type": "original",
    "language": "Telugu",
    "rating": 7.6,
    "popularity": 80,
    "duration": "48m–58m per episode",
    "cast": ["Sudigaali Sudheer", "Kajal Agarwal", "Naveen Chandra", "Anand Devarakonda", "Tharun Bhaskar"]
  },
  {
    "title": "3 Roses",
    "description": "Three ambitious women — Ritu, Meghana, and Srishti — launch their own ad agency, navigating eccentric clients, financial hurdles and complicated personal relationships in a male-dominated industry.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/FDB72578-0715-4A8B-A93D-AAFAF1EBCABE/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/FDB72578-0715-4A8B-A93D-AAFAF1EBCABE/0-16x9.jpg?width=1280",
    "genre": ["Comedy", "Romance", "Drama"],
    "release_year": 2026,
    "type": "original",
    "language": "Telugu",
    "rating": 7.9,
    "popularity": 83,
    "duration": "29m–31m per episode",
    "cast": ["Pooja Ramachandran", "Gayathri Gupta", "Eesha Rebba", "Rahul Vijay", "Sai Raam Shankar"]
  },
  {
    "title": "Chef Mantra",
    "description": "A celebrity cooking talk show where stars cook their favourite dishes alongside friends, sharing personal stories, unheard secrets and loads of fun, hosted by Sreemukhi and later Suma Kanakala.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/A7C4A8B8-B112-4C74-8AFC-6128093F71FC/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/A7C4A8B8-B112-4C74-8AFC-6128093F71FC/0-16x9.jpg?width=1280",
    "genre": ["Talk Show", "Food"],
    "release_year": 2021,
    "type": "original",
    "language": "Telugu",
    "rating": 7.8,
    "popularity": 82,
    "duration": "38m–40m per episode",
    "cast": ["Sreemukhi", "Suma Kanakala", "Regina Cassandra", "Shriya Saran", "Suhas", "Adivi Sesh"]
  },
  {
    "title": "Arthamainda Arun Kumar",
    "description": "Arun Kumar, an ambitious fresh graduate from Amlapuram, moves to Hyderabad for his internship. He navigates office politics, a scheming Lady Boss, and workplace obstacles in this relatable office comedy-drama.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/11A86D05-C927-44E4-A2DA-EB9A1C6A003C/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/11A86D05-C927-44E4-A2DA-EB9A1C6A003C/0-16x9.jpg?width=1280",
    "genre": ["Comedy Drama"],
    "release_year": 2023,
    "type": "original",
    "language": "Telugu",
    "rating": 7.7,
    "popularity": 84,
    "duration": "18m–25m per episode",
    "cast": ["Rahul Ramakrishna", "Priyanka Thimmesh", "Shalini Vemuri", "Vennela Kishore"]
  },
  {
    "title": "Vera Maari Office",
    "description": "Due to digitalization, an e-commerce company branch faces downsizing. The show depicts the conflicts and friendships between experienced employees and freshers as they turn work problems into funny adventures.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/4468077C-5945-40D4-8DF9-C6143BB158EE/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/4468077C-5945-40D4-8DF9-C6143BB158EE/0-16x9.jpg?width=1280",
    "genre": ["Comedy", "Drama"],
    "release_year": 2023,
    "type": "original",
    "language": "Tamil",
    "rating": 7.4,
    "popularity": 76,
    "duration": "21m–37m per episode",
    "cast": ["Ramya", "Nisha", "Pankaj", "Algatz", "Leena", "Poorna"]
  },
  {
    "title": "Ammuchi 2",
    "description": "Whenever Arun visits Kodangipalayam, problems arise and the feisty Ammuchi seamlessly solves them. This time he helps his love Mithra, leading to village rivalries, festival contests and non-stop comedy.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/7B86315A-7598-4E5F-A4E3-2D5F8EA1EB15/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/7B86315A-7598-4E5F-A4E3-2D5F8EA1EB15/0-16x9.jpg?width=1280",
    "genre": ["Action", "Comedy"],
    "release_year": 2022,
    "type": "original",
    "language": "Tamil",
    "rating": 7.5,
    "popularity": 77,
    "duration": "22m–33m per episode",
    "cast": ["Arun", "Sasi", "Mithra", "Maakaali", "Mosanaai Mani"]
  },
  {
    "title": "Madurai Paiyanum Chennai Ponnum",
    "description": "Subash, a Madurai native thriving in Chennai as a bookstore employee and aspiring lyricist, meets Mira, who dreams of a terrace café. Their clashing dreams evolve into a heartfelt love story.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F2E3201D-E2C8-4BF0-927C-52DF484F8CBE/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F2E3201D-E2C8-4BF0-927C-52DF484F8CBE/0-16x9.jpg?width=1280",
    "genre": ["Romance", "Comedy"],
    "release_year": 2025,
    "type": "original",
    "language": "Tamil",
    "rating": 8.0,
    "popularity": 86,
    "duration": "21m–26m per episode",
    "cast": ["Subash", "Mira", "Saravanan", "Krishna", "Tanya"]
  },
  {
    "title": "Sshhh",
    "description": "A bold anthology series exploring the taboos and underlying desires of the current generation — covering sex education, addiction, infidelity, cyber exploitation and intimate relationships with raw honesty.",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/44DE4301-BB38-42A8-918F-1853FACF8E1A/0-16x9.jpg?width=400",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/44DE4301-BB38-42A8-918F-1853FACF8E1A/0-16x9.jpg?width=1280",
    "genre": ["Romance", "Drama"],
    "release_year": 2025,
    "type": "original",
    "language": "Tamil",
    "rating": 7.8,
    "popularity": 81,
    "duration": "27m–34m per episode",
    "cast": ["Tarangani", "Arjun", "Meera", "Vaanmathi", "Sakthivel"]
  }
]

// ─────────────────────────────────────────────
// Seed Function
// ─────────────────────────────────────────────
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📦  Connected to MongoDB...");

    await Content.deleteMany({});
    await Menu.deleteMany({});
    console.log("🗑️   Cleared existing Content and Menu collections.");

    await Menu.insertMany(menuData);
    console.log(`📋  Inserted ${menuData.length} menu items.`);

    await Content.insertMany(contentData);
    console.log(`🎬  Inserted ${contentData.length} content items.`);

    console.log("✅  Seeding complete!");
  } catch (error) {
    console.error("❌  Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌  Disconnected from MongoDB.");
  }
};

seedDB();