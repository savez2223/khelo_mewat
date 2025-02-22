import React, { useState } from "react";
import Container from "../../../components/Container/Container";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import cricket from "../../../assets/banner images/cricket.jpg";
import volleyball from "../../../assets/banner images/volleyball.jpg";
import tugofwar from "../../../assets/banner images/Tugofwars.jpg";
import runner from "../../../assets/banner images/runner.jpg";
import wrestling from "../../../assets/banner images/wrestling.jpg";

const Courses = () => {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample tournament data (retained maxTeams and registeredTeams for logic, but not displayed)
  const tournaments = [
    { id: 1, name: "Cricket", image: cricket, maxTeams: 10, registeredTeams: 5 },
    { id: 2, name: "Volleyball", image: volleyball, maxTeams: 15, registeredTeams: 10 },
    { id: 3, name: "Tug of War", image: tugofwar, maxTeams: 10, registeredTeams: 8 },
    { id: 4, name: "Wrestling", image: wrestling, maxTeams: 12, registeredTeams: 6 },
    { id: 5, name: "Athletics (Race)", image: runner, maxTeams: 20, registeredTeams: 18 },
  ];

  const handleEnrollClick = (tournament) => {
    setSelectedTournament(tournament);
    setIsModalOpen(true);
  };

  const handleSubmitEnrollment = async (formData) => {
    try {
      const response = await fetch("/api/tournaments/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tournamentId: selectedTournament.id,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Enrollment failed");

      setIsModalOpen(false);
      console.log("Enrollment successful:", formData);
    } catch (error) {
      console.error("Enrollment error:", error.message);
      alert("Failed to register team. Please try again.");
    }
  };

  return (
    <div className="bg-[#F5F6F5] pb-10 md:pb-20" id="tournaments">
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>Upcoming Tournaments</span>}
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
            onSubmit={handleSubmitEnrollment}
          />
        )}
      </Container>
    </div>
  );
};

const TournamentCard = ({ tournament, onEnrollClick }) => {
  const { name, image, maxTeams, registeredTeams } = tournament;
  const spotsLeft = maxTeams - registeredTeams;

  return (
    <div className="relative max-w-96 h-96 bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden shadow-md transition-all duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-[#39A935]/80 to-transparent">
        {/* Sports Name on the Image */}
        <h2 className="text-white text-2xl font-bold drop-shadow-md text-center mt-20">
          {name}
        </h2>
        {/* Register Button at the Bottom */}
        <button
          onClick={() => onEnrollClick(tournament)}
          disabled={spotsLeft <= 0}
          className={`w-full py-2 font-semibold rounded-lg transition-colors duration-200 ${
            spotsLeft <= 0
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-[#E87722] hover:bg-[#39A935] text-white"
          }`}
        >
          {spotsLeft <= 0 ? "Registration Closed" : "Register Now"}
        </button>
      </div>
    </div>
  );
};

const EnrollmentModal = ({ tournament, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    teamName: "",
    captainName: "",
    contactEmail: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-gray-200">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="teamName"
            >
              Team Name
            </label>
            <input
              type="text"
              name="teamName"
              id="teamName"
              value={formData.teamName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E87722] focus:outline-none bg-gray-50 text-gray-700 placeholder-gray-400"
              placeholder="Enter team name"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="captainName"
            >
              Captain Name
            </label>
            <input
              type="text"
              name="captainName"
              id="captainName"
              value={formData.captainName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E87722] focus:outline-none bg-gray-50 text-gray-700 placeholder-gray-400"
              placeholder="Enter captain name"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="contactEmail"
            >
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              id="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E87722] focus:outline-none bg-gray-50 text-gray-700 placeholder-gray-400"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E87722] focus:outline-none bg-gray-50 text-gray-700 placeholder-gray-400"
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 font-medium rounded-lg hover:text-[#E87722] hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#E87722] hover:bg-[#39A935]"
              }`}
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Courses;