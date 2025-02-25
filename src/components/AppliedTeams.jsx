import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig"; // Adjust path as per your project structure
import { ref, onValue, off, update, remove } from "firebase/database";
import Container from "../components/Container/Container"; // Adjust path if needed
import SectionHeader from "../components/SectionHeader/SectionHeader"; // Adjust path if needed
import jsPDF from "jspdf";
import "jspdf-autotable"; // For table formatting in PDF
import Cookies from "js-cookie";

const AppliedTeams = () => {
    useEffect(() => {
        // Check authentication cookie
        if (!Cookies.get("auth")) {
          window.location.href = "/adminlogin"; // Redirect if not authenticated
          return;
        }
      }, []);
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});



  useEffect(() => {
    const registrationsRef = ref(db, "tournamentRegistrations");

    const unsubscribe = onValue(
      registrationsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const registrationsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setRegistrations(registrationsArray);
          filterByDate(registrationsArray, startDate, endDate);
        } else {
          setRegistrations([]);
          setFilteredRegistrations([]);
        }
        setLoading(false);
      },
      (error) => {
        setError("Failed to fetch registrations. Please try again.");
        console.error("Error fetching registrations:", error);
        setLoading(false);
      }
    );

    return () => off(registrationsRef, "value", unsubscribe);
  }, [startDate, endDate]);

  const filterByDate = (data, start, end) => {
    if (!start && !end) {
      setFilteredRegistrations(data);
      return;
    }
    const filtered = data.filter((reg) => {
      const regDate = new Date(reg.timestamp);
      const startFilter = start ? new Date(start) : null;
      const endFilter = end ? new Date(end) : null;
      return (
        (!startFilter || regDate >= startFilter) &&
        (!endFilter || regDate <= endFilter)
      );
    });
    setFilteredRegistrations(filtered);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Applied Teams/Players Report", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [
        [
          "Player Name",
          "Tournament",
          "Father's Name",
          "Gender",
          "School/College",
          "Block",
          "Village",
          "Aadhar",
          "Mobile",
          "Registration Date",
        ],
      ],
      body: filteredRegistrations.map((reg) => [
        reg.playerName,
        reg.tournamentName,
        reg.fatherName,
        reg.gender,
        reg.schoolOrVillage,
        reg.block,
        reg.village,
        reg.aadhar,
        reg.mobile,
        new Date(reg.timestamp).toLocaleString(),
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [57, 169, 53] }, // #39A935
    });
    doc.save("applied_teams_report.pdf");
  };

  const handleEdit = (registration) => {
    setEditingId(registration.id);
    setEditForm({ ...registration });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const registrationRef = ref(db, `tournamentRegistrations/${id}`);
      await update(registrationRef, editForm);
      setEditingId(null);
    } catch (error) {
      setError("Failed to update registration.");
      console.error("Error updating registration:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this registration?")) {
      try {
        const registrationRef = ref(db, `tournamentRegistrations/${id}`);
        await remove(registrationRef);
      } catch (error) {
        setError("Failed to delete registration.");
        console.error("Error deleting registration:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6F5] py-10 md:py-20">
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>Applied Teams/Players</span>}
        />
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-[#E87722] text-white rounded-lg hover:bg-[#39A935] self-end"
          >
            Download PDF
          </button>
        </div>
        {filteredRegistrations.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No registrations found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-[#39A935] text-white">
                  <th className="py-3 px-4 text-left">Player Name</th>
                  <th className="py-3 px-4 text-left">Tournament</th>
                  <th className="py-3 px-4 text-left">Father's Name</th>
                  <th className="py-3 px-4 text-left">Gender</th>
                  <th className="py-3 px-4 text-left">School/College</th>
                  <th className="py-3 px-4 text-left">Block</th>
                  <th className="py-3 px-4 text-left">Village</th>
                  <th className="py-3 px-4 text-left">Aadhar</th>
                  <th className="py-3 px-4 text-left">Mobile</th>
                  <th className="py-3 px-4 text-left">Registration Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="border-b hover:bg-gray-100">
                    {editingId === registration.id ? (
                      <>
                        <td className="py-3 px-4">
                          <input
                            name="playerName"
                            value={editForm.playerName}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="tournamentName"
                            value={editForm.tournamentName}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="fatherName"
                            value={editForm.fatherName}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            name="gender"
                            value={editForm.gender}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="schoolOrVillage"
                            value={editForm.schoolOrVillage}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="block"
                            value={editForm.block}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="village"
                            value={editForm.village}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="aadhar"
                            value={editForm.aadhar}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="mobile"
                            value={editForm.mobile}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          {new Date(registration.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleUpdate(registration.id)}
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4">{registration.playerName || "N/A"}</td>
                        <td className="py-3 px-4">{registration.tournamentName || "N/A"}</td>
                        <td className="py-3 px-4">{registration.fatherName || "N/A"}</td>
                        <td className="py-3 px-4">{registration.gender || "N/A"}</td>
                        <td className="py-3 px-4">{registration.schoolOrVillage || "N/A"}</td>
                        <td className="py-3 px-4">{registration.block || "N/A"}</td>
                        <td className="py-3 px-4">{registration.village || "N/A"}</td>
                        <td className="py-3 px-4">{registration.aadhar || "N/A"}</td>
                        <td className="py-3 px-4">{registration.mobile || "N/A"}</td>
                        <td className="py-3 px-4">
                          {registration.timestamp
                            ? new Date(registration.timestamp).toLocaleString()
                            : "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleEdit(registration)}
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(registration.id)}
                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AppliedTeams;