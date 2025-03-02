import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import cricket from "../../assets/banner images/cricket1.jpg";
import volleyball from "../../assets/banner images/volleyball1.jpg";
import tugofwar from "../../assets/banner images/Tugofwars1.jpg";
import runner from "../../assets/banner images/runner1.jpg";
import wrestling from "../../assets/banner images/wrestling1.jpg";
import { db } from "../../firebase/firebaseConfig";
import { ref, push } from "firebase/database";
import axios from "axios";

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

const Games = () => {
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
    <div className="bg-[#F5F6F5] pt-14 pb-10 md:pb-20" id="tournaments">
      <Container>
        <ScrollPageTop />
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
    ward: "",
    block: "",
    village: "",
    aadhar: "",
    mobile: "",
    entryForm: null, // For Entry Form PDF
    sarpanchPerforma: null, // For Sarpanch Performa PDF
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] }); // Store the file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary unsigned upload preset
    formData.append("cloud_name", "dadqwaqis"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dadqwaqis/upload", // Replace 'your_cloud_name'
        formData
      );
      return response.data.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
      throw new Error("Failed to upload file to Cloudinary: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (
      !formData.playerName ||
      !formData.fatherName ||
      !formData.gender ||
      !formData.dob ||
      !formData.ward ||
      !formData.block ||
      !formData.village ||
      !formData.aadhar ||
      !formData.mobile ||
      !formData.entryForm ||
      !formData.sarpanchPerforma
    ) {
      setError("Please fill in all required fields and upload both PDFs");
      return;
    }

    if (!/^\d{12}$/.test(formData.aadhar)) {
      setError("Aadhar number must be 12 digits");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Mobile number must be 10 digits");
      return;
    }

    try {
      // Upload PDFs to Cloudinary
      const entryFormUrl = await uploadToCloudinary(formData.entryForm);
      const sarpanchPerformaUrl = await uploadToCloudinary(
        formData.sarpanchPerforma
      );

      // Prepare data for Firebase
      const registrationData = {
        playerName: formData.playerName,
        fatherName: formData.fatherName,
        gender: formData.gender,
        dob: formData.dob,
        ward: formData.ward,
        block: formData.block,
        village: formData.village,
        aadhar: formData.aadhar,
        mobile: formData.mobile,
        entryFormUrl, // Store Cloudinary URL
        sarpanchPerformaUrl, // Store Cloudinary URL
        tournamentId: tournament.id,
        tournamentName: tournament.name,
        timestamp: new Date().toISOString(),
      };

      const registrationsRef = ref(db, "tournamentRegistrations");
      await push(registrationsRef, registrationData);

      setSuccess(true);
      setError(null);

      setFormData({
        playerName: "",
        fatherName: "",
        gender: "",
        dob: "",
        ward: "",
        block: "",
        village: "",
        aadhar: "",
        mobile: "",
        entryForm: null,
        sarpanchPerforma: null,
      });

      setTimeout(() => {
        setSuccess(false);
        onClose();
        navigate("/"); // Redirect to homepage
      }, 2000);
    } catch (error) {
      setError("Failed to register. Please try again.");
      console.error("Error submitting registration:", error);
    }
  };

  return (
    <>
      {/* Registration Form Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 ${
          success ? "hidden" : ""
        }`}
      >
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-gray-700 font-medium">
              Name of Player
            </label>
            <input
              type="text"
              name="playerName"
              placeholder="Name of Player"
              value={formData.playerName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black placeholder:text-black"
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
              className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black placeholder:text-black"
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
              <option value="">Select Gender</option>
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
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black"
              required
            />

            <label className="block text-gray-700 font-medium">Ward No</label>
            <input
              type="text"
              name="ward"
              placeholder="Ward No"
              value={formData.ward}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-300 border rounded-lg text-black placeholder:text-black"
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
                className="w-full bg-transparent px-2 py-2 text-black focus:outline-none placeholder:text-black"
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
                className="w-full bg-transparent px-2 py-2 text-black focus:outline-none placeholder:text-black"
                required
              />
            </div>

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

            {error && <p className="text-red-500 text-sm">{error}</p>}

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
                className="px-6 py-2 bg-[#E87722] hover:bg-[#39A935] text-white font-medium rounded-lg disabled:bg-gray-400"
                disabled={success}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl border border-gray-200 text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Registration Successful
            </h3>
            <p className="text-gray-600">
              You have been successfully registered for {tournament.name}.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Redirecting to homepage...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Games;
