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
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1E412F9-4EE5-4D7E-AFFB-EFBC04C63B33/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1E412F9-4EE5-4D7E-AFFB-EFBC04C63B33/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1E412F9-4EE5-4D7E-AFFB-EFBC04C63B33/0-16x9.jpg?width=1280"
  },
  {
    "title": "Drive",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/6CD09DBF-0D8E-4FA8-A4B0-43D16E60F115/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/6CD09DBF-0D8E-4FA8-A4B0-43D16E60F115/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/6CD09DBF-0D8E-4FA8-A4B0-43D16E60F115/0-16x9.jpg?width=1280"
  },
  {
    "title": "Aadi Shambhala",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/91B37D19-AF75-4184-884F-7C2EC2809368/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/91B37D19-AF75-4184-884F-7C2EC2809368/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/91B37D19-AF75-4184-884F-7C2EC2809368/0-16x9.jpg?width=1280"
  },
  {
    "title": "K-Ramp",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/22D9E841-D008-4F3F-9C3D-06C306209E9A/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/22D9E841-D008-4F3F-9C3D-06C306209E9A/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/22D9E841-D008-4F3F-9C3D-06C306209E9A/0-16x9.jpg?width=1280"
  },
  {
    "title": "Psych Siddhartha",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/0F598AED-27BE-451B-8B5D-3609D0A43767/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/0F598AED-27BE-451B-8B5D-3609D0A43767/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/0F598AED-27BE-451B-8B5D-3609D0A43767/0-16x9.jpg?width=1280"
  },
  {
    "title": "Bomb",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/95CE2E61-7BE1-4284-9654-ADE5EA63983B/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/95CE2E61-7BE1-4284-9654-ADE5EA63983B/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/95CE2E61-7BE1-4284-9654-ADE5EA63983B/0-16x9.jpg?width=1280"
  },
  {
    "title": "Phoenix Veezhan",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E12C8B32-C1B2-417B-8701-9FA9DDBFE390/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E12C8B32-C1B2-417B-8701-9FA9DDBFE390/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E12C8B32-C1B2-417B-8701-9FA9DDBFE390/0-16x9.jpg?width=1280"
  },
  {
    "title": "Mahasenha",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/B7D93DE1-91CA-48EC-B79E-BC0B8351C45A/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/B7D93DE1-91CA-48EC-B79E-BC0B8351C45A/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/B7D93DE1-91CA-48EC-B79E-BC0B8351C45A/0-16x9.jpg?width=1280"
  },
  {
    "title": "Premistunnaa",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/2427F26E-0FDA-40E5-BC8E-0E9123954A6D/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/2427F26E-0FDA-40E5-BC8E-0E9123954A6D/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/2427F26E-0FDA-40E5-BC8E-0E9123954A6D/0-16x9.jpg?width=1280"
  },
  {
    "title": "Paanch Minar",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F262E7FE-EE7A-4743-B06A-A5E3C71CDD67/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F262E7FE-EE7A-4743-B06A-A5E3C71CDD67/12-7x2.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F262E7FE-EE7A-4743-B06A-A5E3C71CDD67/0-16x9.jpg?width=1280"
  },
  {
    "title": "Ayalaan",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1C526B44-8389-4ED1-A5B1-0DF7F8433942/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1C526B44-8389-4ED1-A5B1-0DF7F8433942/12-7x2.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1C526B44-8389-4ED1-A5B1-0DF7F8433942/0-16x9.jpg?width=1280"
  },
  {
    "title": "Tantra",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/32A18797-B194-4029-9FF2-926859055787/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/32A18797-B194-4029-9FF2-926859055787/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/32A18797-B194-4029-9FF2-926859055787/0-16x9.jpg?width=1280"
  },
  {
    "title": "Prasanna Vadanam",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/5A523429-3E15-4CFE-9890-43EE9364FE28/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/5A523429-3E15-4CFE-9890-43EE9364FE28/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/5A523429-3E15-4CFE-9890-43EE9364FE28/0-16x9.jpg?width=1280"
  },
  {
    "title": "Balu Gani Talkies",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/418133EF-2181-44C8-85EB-ED6A2E049CD4/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/418133EF-2181-44C8-85EB-ED6A2E049CD4/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/418133EF-2181-44C8-85EB-ED6A2E049CD4/0-16x9.jpg?width=1280"
  },
  {
    "title": "Prathinidhi 2",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1A9B496-CF8B-45AD-8028-6B72759BE561/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1A9B496-CF8B-45AD-8028-6B72759BE561/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C1A9B496-CF8B-45AD-8028-6B72759BE561/0-16x9.jpg?width=1280"
  },
  {
    "title": "Gorre Puranam",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CFB78448-8432-4314-8305-13C141F44673/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CFB78448-8432-4314-8305-13C141F44673/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CFB78448-8432-4314-8305-13C141F44673/0-16x9.jpg?width=1280"
  },
  {
    "title": "Sevappi",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/77B28B04-998E-42FC-ADA3-058C139FCFC0/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/77B28B04-998E-42FC-ADA3-058C139FCFC0/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/77B28B04-998E-42FC-ADA3-058C139FCFC0/0-16x9.jpg?width=1280"
  },
  {
    "title": "Maruthi Nagar Police Station",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9A4F0439-E692-4D75-95F2-882FA61FEBA8/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9A4F0439-E692-4D75-95F2-882FA61FEBA8/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9A4F0439-E692-4D75-95F2-882FA61FEBA8/0-16x9.jpg?width=1280"
  },
  {
    "title": "Rathasaatchi",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1982E133-464E-42EF-8D2F-F6BF8C8011BF/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1982E133-464E-42EF-8D2F-F6BF8C8011BF/12-7x2.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1982E133-464E-42EF-8D2F-F6BF8C8011BF/0-16x9.jpg?width=1280"
  },
  {
    "title": "Writer",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F317B9E6-C92E-476D-94A1-0D44DE921F4B/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F317B9E6-C92E-476D-94A1-0D44DE921F4B/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F317B9E6-C92E-476D-94A1-0D44DE921F4B/0-16x9.jpg?width=1280"
  },
  {
    "title": "Sila Nerangalil Sila Manidhargal",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/71C1AC07-EFFC-4319-BB94-2B4C98A41632/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/71C1AC07-EFFC-4319-BB94-2B4C98A41632/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/71C1AC07-EFFC-4319-BB94-2B4C98A41632/0-16x9.jpg?width=1280"
  },
  {
    "title": "Udanpaal",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1E83ADA7-8332-4E2F-8AAB-D52A6140D1E4/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1E83ADA7-8332-4E2F-8AAB-D52A6140D1E4/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/1E83ADA7-8332-4E2F-8AAB-D52A6140D1E4/0-16x9.jpg?width=1280"
  },
  {
    "title": "Shanmukha",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/51D16FD5-F1F2-48E8-8DA4-591475005D93/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/51D16FD5-F1F2-48E8-8DA4-591475005D93/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/51D16FD5-F1F2-48E8-8DA4-591475005D93/0-16x9.jpg?width=1280"
  },
  {
    "title": "Hide N Seek",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BCB3316F-FEEE-4B66-9E6D-75F85333A7FE/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BCB3316F-FEEE-4B66-9E6D-75F85333A7FE/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BCB3316F-FEEE-4B66-9E6D-75F85333A7FE/0-16x9.jpg?width=1280"
  },
  {
    "title": "Marco",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CAB2DB04-1375-4CA2-BCF2-59413F10EAE5/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CAB2DB04-1375-4CA2-BCF2-59413F10EAE5/12-7x2.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CAB2DB04-1375-4CA2-BCF2-59413F10EAE5/0-16x9.jpg?width=1280"
  },
  {
    "title": "The Door",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C5EC1BD3-EBA4-49C0-968F-5F6E7147D76C/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C5EC1BD3-EBA4-49C0-968F-5F6E7147D76C/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/C5EC1BD3-EBA4-49C0-968F-5F6E7147D76C/0-16x9.jpg?width=1280"
  },
  {
    "title": "Guardian",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BE00C2BE-2EB1-40DD-954E-079E17B6C54B/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BE00C2BE-2EB1-40DD-954E-079E17B6C54B/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/BE00C2BE-2EB1-40DD-954E-079E17B6C54B/0-16x9.jpg?width=1280"
  },
  {
    "title": "Laandhar",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/EEB3E601-F59C-41C1-9FCF-DE23D4AA4DD1/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/EEB3E601-F59C-41C1-9FCF-DE23D4AA4DD1/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/EEB3E601-F59C-41C1-9FCF-DE23D4AA4DD1/0-16x9.jpg?width=1280"
  },
  {
    "title": "PA PA (O Naanna)",
    "language": "Tamil",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/907F39AA-DF0A-4734-B80F-BCBA3676FE92/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/907F39AA-DF0A-4734-B80F-BCBA3676FE92/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/907F39AA-DF0A-4734-B80F-BCBA3676FE92/0-16x9.jpg?width=1280"
  },
  {
    "title": "Eleven",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CE1D0BE3-EA7A-47C7-BAFC-076C46071884/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CE1D0BE3-EA7A-47C7-BAFC-076C46071884/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/CE1D0BE3-EA7A-47C7-BAFC-076C46071884/0-16x9.jpg?width=1280"
  },
  {
    "title": "Viswam",
    "language": "Telugu",
    "type": "movie",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9D13DDA3-E8DE-43E3-9837-2BBE2A02549B/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9D13DDA3-E8DE-43E3-9837-2BBE2A02549B/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/9D13DDA3-E8DE-43E3-9837-2BBE2A02549B/0-16x9.jpg?width=1280"
  },
  {
    "title": "Unstoppable with NBK",
    "language": "Telugu",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E51CB6A8-D3A9-474C-84E7-BDB6B2980239/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E51CB6A8-D3A9-474C-84E7-BDB6B2980239/12-7x2.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/E51CB6A8-D3A9-474C-84E7-BDB6B2980239/0-16x9.jpg?width=1280"
  },
  {
    "title": "Dhoolpet Police Station",
    "language": "Telugu",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/48C7DB18-7A84-46DE-9936-A7A69E681F9D/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/48C7DB18-7A84-46DE-9936-A7A69E681F9D/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/48C7DB18-7A84-46DE-9936-A7A69E681F9D/0-16x9.jpg?width=1280"
  },
  {
    "title": "SARKAAR",
    "language": "Telugu",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/836A0A87-656C-46FE-BBD1-F12BA6088F68/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/836A0A87-656C-46FE-BBD1-F12BA6088F68/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/836A0A87-656C-46FE-BBD1-F12BA6088F68/0-16x9.jpg?width=1280"
  },
  {
    "title": "3 Roses",
    "language": "Telugu",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/FDB72578-0715-4A8B-A93D-AAFAF1EBCABE/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/FDB72578-0715-4A8B-A93D-AAFAF1EBCABE/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/FDB72578-0715-4A8B-A93D-AAFAF1EBCABE/0-16x9.jpg?width=1280"
  },
  {
    "title": "Chef Mantra",
    "language": "Telugu",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/A7C4A8B8-B112-4C74-8AFC-6128093F71FC/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/A7C4A8B8-B112-4C74-8AFC-6128093F71FC/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/A7C4A8B8-B112-4C74-8AFC-6128093F71FC/0-16x9.jpg?width=1280"
  },
  {
    "title": "Arthamainda Arun Kumar",
    "language": "Telugu",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/11A86D05-C927-44E4-A2DA-EB9A1C6A003C/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/11A86D05-C927-44E4-A2DA-EB9A1C6A003C/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/11A86D05-C927-44E4-A2DA-EB9A1C6A003C/0-16x9.jpg?width=1280"
  },
  {
    "title": "Vera Maari Office",
    "language": "Tamil",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/4468077C-5945-40D4-8DF9-C6143BB158EE/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/4468077C-5945-40D4-8DF9-C6143BB158EE/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/4468077C-5945-40D4-8DF9-C6143BB158EE/0-16x9.jpg?width=1280"
  },
  {
    "title": "Ammuchi 2",
    "language": "Tamil",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/7B86315A-7598-4E5F-A4E3-2D5F8EA1EB15/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/7B86315A-7598-4E5F-A4E3-2D5F8EA1EB15/0-16x9.jpg?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/7B86315A-7598-4E5F-A4E3-2D5F8EA1EB15/0-16x9.jpg?width=1280"
  },
  {
    "title": "Madurai Paiyanum Chennai Ponnum",
    "language": "Tamil",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F2E3201D-E2C8-4BF0-927C-52DF484F8CBE/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F2E3201D-E2C8-4BF0-927C-52DF484F8CBE/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/F2E3201D-E2C8-4BF0-927C-52DF484F8CBE/0-16x9.jpg?width=1280"
  },
  {
    "title": "Sshhh",
    "language": "Tamil",
    "type": "original",
    "poster_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/44DE4301-BB38-42A8-918F-1853FACF8E1A/0-2x3.jpg?width=320",
    "thumbnail_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/44DE4301-BB38-42A8-918F-1853FACF8E1A/12-16x9.png?width=350",
    "banner_url": "https://image-resizer-cloud-api-ahacms.akamaized.net/image/44DE4301-BB38-42A8-918F-1853FACF8E1A/0-16x9.jpg?width=1280"
  }
];

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