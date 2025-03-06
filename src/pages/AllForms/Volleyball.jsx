import React, { useState } from "react";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import logo from "../../assets/logo/logom.png";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// const blockVillageData = {
//   Nuh: ["Untka", "Adbar", "Akera"],
//   Punahana: ["Aminabad", "Andhaki", "Badli"],
//   Pingwan: ["Akbarpur", "Anchwari", "Aoutha"],
// };

const blockVillageData = {
  Nuh: [
    "Untka",
    "Adbar",
    "Akera",
    "Alawal Pur",
    "Babupur",
    "Bai",
    "Bajhera",
    "Barka Alimudin",
    "Bar Oji",
    "Bhapawali",
    "Bibipur",
    "Binwa",
    "Birsika",
    "Chandeni",
    "Devlanangli",
    "Dhanduka",
    "Dihana",
    "Firozepur Namak",
    "Ghasera",
    "Husainpur",
    "Kalinjar",
    "Kherla",
    "Kotla",
    "Malab",
    "Marora",
    "Meoli",
    "Muradbas",
    "Nalhar",
    "Palla",
    "Rai Puri",
    "Ranika",
    "Rehna",
    "Rithora",
    "Sahpur Nangli",
    "Salaheri",
    "Salamba",
    "Sangail",
    "Shadai",
    "Sonkh",
    "Tain",
    "Tapkan",
    "Ujina",
  ],
  Punahana: [
    "Aminabad",
    "Andhaki",
    "Badli",
    "Bandholi",
    "Bhuriyaki",
    "Bichhor",
    "Bisru",
    "Chandanki",
    "Dudoli",
    "Fardari",
    "Gheeda",
    "Godhola",
    "Gubradi",
    "Gulalta",
    "Hathangaon",
    "Hazipur",
    "Indana",
    "Jadoli",
    "Jaiwant",
    "Jakhokar",
    "Jamalgarh",
    "Jehtana",
    "Jharokari",
    "Kherla Punhana",
    "Lafoori",
    "Leharwari",
    "Luhinga Kalan",
    "Madhiyaki",
    "Mubarikpur",
    "Naharpur",
    "Naheda",
    "Nai",
    "Neemka",
    "Newana",
    "Pemakhera",
    "Piproli",
    "Raipur",
    "Rajpur",
    "Samsabad Khurd",
    "Sihiri Singal Heri",
    "Singar",
    "Siroli",
    "Sunheda",
    "Thek",
    "Tirwara",
    "Tundlaka",
    "Tusaini",
    "Rahida",
    "Shikrawa",
    "Falendi",
    "Khori Shah Choka",
    "Badka",
    "Samsabad",
  ],
  Pingwan: [
    "Akbarpur",
    "Anchwari",
    "Aoutha",
    "Baded",
    "Basai Khanzada",
    "Bazidpur",
    "Bubalheri",
    "Chandraka",
    "Dhadolikalan",
    "Dhana",
    "Dondal",
    "Dungeja",
    "Dungra Shahazadpur",
    "Firozpur Meo",
    "Flendi",
    "Gangwani",
    "Gokalpur",
    "Hinganpur",
    "Jalika",
    "Jharpuri",
    "Jhimrawat",
    "Khanpur Ghati",
    "Khawajli Kalan",
    "Khedli Kalan",
    "Khori Shah Chokha",
    "Lahabas",
    "Malhaka",
    "Mamlika",
    "Manota",
    "Mohd. Pur Ter",
    "Mohlaka",
    "Mundheta",
    "Neemkhera",
    "Papra",
    "Pinagwan",
    "Raniyalapatakpur",
    "Rehpura",
    "Rithad",
    "Sikrawa",
    "Sultanpur Punhana",
    "Ter",
  ],
  Tauru: [
    "Bawla",
    "Beri Nisfi",
    "Bhajlaka",
    "Bhangoh",
    "Bissarakbarpur",
    "Buraka Tauru",
    "Chahalka",
    "Cheela",
    "Chharora",
    "Chilawali",
    "Dadu",
    "Dalawas",
    "Dhulawat",
    "Didhara",
    "Dingerheri",
    "Fatehpur",
    "Gogjaka",
    "Goyla",
    "Gudhi",
    "Gwarka",
    "Hasanpur",
    "Jafrab...",
    "Jalalpur Sohna",
    "Jaurasi",
    "Jhamuwas",
    "Kalarpuri",
    "Kaliyaka",
    "Kalwari",
    "Kharkhari",
    "Khori Kalan",
    "Khori Khurd",
    "Kota Khandewla",
    "M.P.Ahir",
    "Malhaka",
    "Mandarka",
    "Nizampur",
    "Pachgaon",
    "Padheni",
    "Para",
    "Raheri",
    "Rangala",
    "Raniyaki",
    "Rathwas",
    "Sabras",
    "Sahsola",
    "Salhaka",
    "Sarai",
    "Sewka",
    "Sheelkho",
    "Shikarpur",
    "Subaseri",
    "Sunari",
    "Sundh",
    "Uton",
  ],
  "Ferozepur Jhirka": [
    "Agon",
    "Ahmedbass",
    "Akhnaka",
    "Alipur Tigra",
    "Baghola",
    "Baikhera",
    "Basai Meo",
    "Bhakroj",
    "Bhond",
    "Biwan",
    "Chitora",
    "Dhamala",
    "Doha",
    "F. Jhirka",
    "Ghata Samsabad",
    "Gujar Nangla",
    "Hamjapur",
    "Hasanpur Bilonda",
    "Hirwari Bawanteri",
    "Ibrahimbass",
    "Kameda",
    "Kherla Khurd",
    "Kolgaon",
    "Luhinga Khurd",
    "Madapur",
    "Maholi",
    "Mahun",
    "Mohd. Bass (Buchaka)",
    "Mohd. Bass (Pol)",
    "Nasirbass",
    "Nawli",
    "Padla Shahpuri",
    "Patan Udaypuri",
    "Pathrali",
    "Patkhori",
    "Ranyala Ferozpur",
    "Ranyali",
    "Rawa",
    "Rawli",
    "Reegarh",
    "Sahapur",
    "Saimeerbass",
    "Sakarpuri",
    "Sakras",
    "Shekhpur",
    "Sidhrawat",
    "Sulela",
    "Tigaon",
  ],
  Nagina: [
    "Aklimpur",
    "Aklimpur Nuh",
    "Aterna Samsabad",
    "Badarpur",
    "Balai",
    "Banarsi",
    "Bhadas",
    "Bukharaka",
    "Ganduri",
    "Ghagas",
    "Gohana",
    "Gumat Bihari",
    "Hasanpur Nuh",
    "Imam Nagar",
    "Jaitaka",
    "Jalalpur Firozpur",
    "Jalalpur Nuh",
    "Kansali",
    "Karheda",
    "Karhedi",
    "Khan Mohammadpur",
    "Khedli Khurd",
    "Khedli Nuh",
    "Khushpuri",
    "Kultajpur Kalan",
    "Madhi",
    "Mandi Kheda",
    "Maroda",
    "Mohammad Nagar",
    "Moolthan",
    "Nagina",
    "Nai Nangla",
    "Nangal Mubarikpur",
    "Notki",
    "Rajaka",
    "Ranika",
    "Sadipur",
    "Santhawari",
    "Siswana Jatka",
    "Sukhpuri",
    "Sultanpur Nuh",
    "Uleta",
    "Umra",
    "Umri",
    "Basai",
  ],
  Indri: [
    "Alduka",
    "Atta",
    "Bainsi",
    "Bajarka",
    "Barota",
    "Basai",
    "Bhirawati",
    "Chhachera",
    "Chhapera",
    "Dhenkli",
    "Dubalu",
    "Gajarpur",
    "Gangoli",
    "Golpuri",
    "Hasanpur Sohana",
    "Hilalpur",
    "Hirmathla",
    "Indri",
    "Jai Singh Pur",
    "Kairaka",
    "Kaliyaka",
    "Kanwarsika",
    "Khanpur",
    "Khera Khalilpur",
    "Kheri Kankar",
    "Kherli Dosa",
    "Kira",
    "Kiranj",
    "Kiranj Patti Jattan",
    "Kontlaka",
    "Kurthala",
    "Kutubgarh",
    "Mahrola",
    "Manuwas",
    "Naushera",
    "Rahuka",
    "Rewasan",
    "Rozkameo",
    "Sudaka",
    "Udaka",
    "Uleta",
  ],
};

const Volleyball = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [block, setBlock] = useState("");
  const [village, setVillage] = useState("");
  const [villages, setVillages] = useState([]);
  const [numPlayers, setNumPlayers] = useState(1);

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 12) {
      setAadhaar(value);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  const handleBlockChange = (e) => {
    const selectedBlock = e.target.value;
    setBlock(selectedBlock);
    setVillages(blockVillageData[selectedBlock] || []);
    setVillage("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] }); // Store the file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div
      className="bg-[#F5F6F5] pb-10 lg:pb-20 md:pt-12 mt-10"
      id="participate-now"
    >
      <Helmet>
        <title>Apply for Volleyball - Khelo Mewat</title>
      </Helmet>
      <ScrollPageTop />
      <Container>
        <SectionHeader
          heading={
            <span style={{ color: "#E87722" }}>Apply for Volleyball</span>
          }
        />

        {/* Logo Section */}
        <FadeInAnimation>
          <div className="flex justify-center items-center md:mb-10 mb-5">
            <Link to={"/"}>
              <img
                className="w-40 md:w-48"
                src={logo}
                alt="Khelo Mewat Logo"
                loading="lazy"
              />
            </Link>
          </div>
        </FadeInAnimation>

        {/* Cricket Participation Form */}
        <FadeInAnimation>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-[#39A935] mb-4">
              Volleyball Registration Form
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Team Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Team Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Name of Player</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Player's Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Number of Players</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  min="1"
                  max="12"
                  value={numPlayers}
                  onChange={(e) => setNumPlayers(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Father's Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Father's Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gender</label>
                <select
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Block</label>
                <select
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  value={block}
                  onChange={handleBlockChange}
                  required
                >
                  <option value="">Select Block</option>
                  {Object.keys(blockVillageData).map((blockName) => (
                    <option key={blockName} value={blockName}>
                      {blockName}
                    </option>
                  ))}
                </select>
              </div>
              {block && (
                <div className="mb-4">
                  <label className="block text-gray-700">Village</label>
                  <select
                    className="w-full p-2 border rounded-lg bg-white text-black"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    required
                  >
                    <option value="">Select Village</option>
                    {villages.map((villageName) => (
                      <option key={villageName} value={villageName}>
                        {villageName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700">Ward No</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Ward No"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  {" "}
                  Captain Aadhaar Number
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Aadhaar Number"
                  value={aadhaar}
                  onChange={handleAadhaarChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Captain Mobile Number
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChange={handleMobileChange}
                  required
                />

                <label className="block text-gray-700 font-medium">
                  Entry Form (PDF)
                </label>
                <input
                  type="file"
                  name="entryForm"
                  accept="application/pdf"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-black"
                  required
                />

                <label className="block text-gray-700 font-medium">
                  Sarpanch Performa (PDF)
                </label>
                <input
                  type="file"
                  name="sarpanchPerforma"
                  accept="application/pdf"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#E87722] text-white px-4 py-2 rounded-lg w-full hover:bg-[#39A935]"
              >
                Submit Application
              </button>
            </form>
          </div>
        </FadeInAnimation>
      </Container>
    </div>
  );
};

export default Volleyball;
