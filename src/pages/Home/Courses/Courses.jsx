import React, { useState } from "react";
import Container from "../../../components/Container/Container";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import cricket from "../../../assets/banner images/cricket.jpg";
import volleyball from "../../../assets/banner images/volleyball.jpg";
import tugofwar from "../../../assets/banner images/Tugofwars.jpg";
import runner from "../../../assets/banner images/runner.jpg";
import wrestling from "../../../assets/banner images/wrestling.jpg";

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

const Courses = () => {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tournaments = [
    { id: 1, name: "Cricket", image: cricket },
    { id: 2, name: "Volleyball", image: volleyball },
    { id: 3, name: "Tug of War", image: tugofwar },
    { id: 4, name: "Wrestling", image: wrestling },
    { id: 5, name: "Athletics (Race)", image: runner },
  ];

  const handleEnrollClick = (tournament) => {
    setSelectedTournament(tournament);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#F5F6F5] pb-10 md:pb-20" id="tournaments">
      <Container>
        <SectionHeader
          heading={
            <span style={{ color: "#E87722" }}>Upcoming Tournaments</span>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tournaments.map((tournament, index) => (
            <FadeInAnimation custom={index} key={tournament.id}>
              <TournamentCard
                tournament={tournament}
                onEnrollClick={handleEnrollClick}
              />
            </FadeInAnimation>
          ))}
        </div>

        {isModalOpen && (
          <EnrollmentModal
            tournament={selectedTournament}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Container>
    </div>
  );
};

const TournamentCard = ({ tournament, onEnrollClick }) => {
  return (
    <div className="relative max-w-96 h-96 bg-cover bg-center rounded-xl overflow-hidden shadow-md transition-all duration-300">
      <img
        src={tournament.image}
        alt={tournament.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-[#39A935]/80 to-transparent">
        <h2 className="text-white text-2xl font-bold text-center mt-20">
          {tournament.name}
        </h2>
        <button
          onClick={() => onEnrollClick(tournament)}
          className="w-full py-2 font-semibold rounded-lg bg-[#E87722] hover:bg-[#39A935] text-white"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

const EnrollmentModal = ({ tournament, onClose }) => {
  const [formData, setFormData] = useState({
    playerName: "",
    fatherName: "",
    gender: "",
    dob: "",
    schoolOrVillage: "",
    block: "",
    village: "",
    aadhar: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-gray-200 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-[#39A935]">
            Register for {tournament.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#E87722] text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <label className="block text-gray-700 font-medium">
            Name of Player
          </label>
          <input
            type="text"
            name="playerName"
            placeholder="Name of Player"
            value={formData.playerName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black"
            required
          />

          <label className="block text-gray-700 font-medium">
            Father's Name
          </label>
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black"
            required
          />

          <label className="block text-gray-700 font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="block text-gray-700 font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border rounded-lg"
            required
          />
          <label className="block text-gray-700 font-medium">
            Name of School/College
          </label>
          <input
            type="text"
            name="schoolOrVillage"
            placeholder="School/College Name"
            value={formData.schoolOrVillage}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black"
            required
          />

          <label className="block text-gray-700 font-medium">Block</label>
          <select
            name="block"
            value={formData.block}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black"
            required
          >
            <option value="">Select Block</option>
            {Object.keys(blockVillageData).map((block) => (
              <option key={block} value={block}>
                {block}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 font-medium">Village</label>
          <select
            name="village"
            value={formData.village}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black"
            required
            disabled={!formData.block}
          >
            <option value="">Select Village</option>
            {formData.block &&
              blockVillageData[formData.block].map((village) => (
                <option key={village} value={village}>
                  {village}
                </option>
              ))}
          </select>
          <label className="block text-gray-700 font-medium">
            Aadhar Number
          </label>
          <div className="flex items-center bg-gray-300 border rounded-lg px-4">
            <input
              type="text"
              name="aadhar"
              placeholder="Enter 12-digit Aadhar Number"
              value={formData.aadhar}
              onChange={handleChange}
              maxLength="12"
              pattern="\d{12}"
              className="w-full bg-transparent px-2 py-2 text-black focus:outline-none"
              required
            />
          </div>

          <label className="block text-gray-700 font-medium">
            Mobile Number
          </label>
          <div className="flex items-center bg-gray-300 border rounded-lg px-4">
            <input
              type="text"
              name="mobile"
              placeholder="Enter 10-digit Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
              pattern="\d{10}"
              className="w-full bg-transparent px-2 py-2 text-black focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 font-medium rounded-lg hover:text-[#E87722] hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E87722] hover:bg-[#39A935] text-white font-medium rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Courses;
