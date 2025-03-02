import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, onValue, off, update, remove } from "firebase/database";
import Container from "../components/Container/Container";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Cookies from "js-cookie";

const AppliedTeams = () => {
  useEffect(() => {
    if (!Cookies.get("auth")) {
      window.location.href = "/adminlogin";
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
      (err) => {
        setError("Failed to fetch registrations: " + err.message);
        console.error("Error fetching registrations:", err);
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

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    const downloadDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Logo URL (replace with your actual logo URL hosted on Cloudinary or elsewhere)
    const logoUrl = "https://i.ibb.co/0p2nGzc4/logom.png"; // Update with your logo

    try {
      // Load logo image
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "Anonymous"; // Handle CORS if needed
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("Failed to load logo"));
        image.src = logoUrl;
      });

      // Add logo at the top-left
      doc.addImage(img, "PNG", 14, 10, 30, 15); // Adjust size as needed (width: 30, height: 15)

      // Add title and date aligned to the right of the logo
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Applied Teams/Players Report", 50, 18);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Download Date: ${downloadDate}`, 50, 25);

      // Add a horizontal line below the header
      doc.setLineWidth(0.5);
      doc.setDrawColor(57, 169, 53); // #39A935
      doc.line(14, 30, 196, 30); // From (x1, y1) to (x2, y2)

      // Prepare table data
      const tableData = filteredRegistrations.map((reg) => [
        reg.playerName || "N/A",
        reg.tournamentName || "N/A",
        reg.fatherName || "N/A",
        reg.gender || "N/A",
        reg.ward || "N/A",
        reg.block || "N/A",
        reg.village || "N/A",
        reg.aadhar || "N/A",
        reg.mobile || "N/A",

        reg.timestamp ? new Date(reg.timestamp).toLocaleString() : "N/A",
      ]);

      // Generate table
      doc.autoTable({
        startY: 35,
        head: [
          [
            "Player Name",
            "Tournament",
            "Father's Name",
            "Gender",
            "Ward No",
            "Block",
            "Village",
            "Aadhar",
            "Mobile",

            "Registration Date",
          ],
        ],
        body: tableData,
        styles: {
          fontSize: 8,
          overflow: "linebreak",
          cellPadding: 2,
          textColor: [33, 33, 33], // Dark gray for readability
        },
        headStyles: {
          fillColor: [57, 169, 53], // #39A935
          textColor: 255,
          fontStyle: "bold",
          halign: "center",
        },
        columnStyles: {
          0: { cellWidth: 20 }, // Player Name
          1: { cellWidth: 20 }, // Tournament
          2: { cellWidth: 20 }, // Father's Name
          3: { cellWidth: 15 }, // Gender
          4: { cellWidth: 15 }, // Ward No
          5: { cellWidth: 15 }, // Block
          6: { cellWidth: 20 }, // Village
          7: { cellWidth: 20 }, // Aadhar
          8: { cellWidth: 20 }, // Mobile
          11: { cellWidth: 25 }, // Registration Date
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245], // Light gray for alternate rows
        },
        margin: { top: 35, left: 14, right: 14 },
      });

      // Add footer with page number
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(
          `Page ${i} of ${pageCount}`,
          14,
          doc.internal.pageSize.height - 10
        );
      }

      doc.save(`teams_report_${downloadDate.replace(/ /g, "_")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Fallback without logo if image fails
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Applied Teams/Players Report", 14, 20);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Download Date: ${downloadDate}`, 14, 28);
      doc.setLineWidth(0.5);
      doc.setDrawColor(57, 169, 53);
      doc.line(14, 30, 196, 30);

      const tableData = filteredRegistrations.map((reg) => [
        reg.playerName || "N/A",
        reg.tournamentName || "N/A",
        reg.fatherName || "N/A",
        reg.gender || "N/A",
        reg.ward || "N/A",
        reg.block || "N/A",
        reg.village || "N/A",
        reg.aadhar || "N/A",
        reg.mobile || "N/A",
        reg.timestamp ? new Date(reg.timestamp).toLocaleString() : "N/A",
      ]);

      doc.autoTable({
        startY: 35,
        head: [
          [
            "Player Name",
            "Tournament",
            "Father's Name",
            "Gender",
            "Ward No",
            "Block",
            "Village",
            "Aadhar",
            "Mobile",
            "Registration Date",
          ],
        ],
        body: tableData,
        styles: { fontSize: 8, overflow: "linebreak", cellPadding: 2 },
        headStyles: {
          fillColor: [57, 169, 53],
          textColor: 255,
          fontStyle: "bold",
        },
        columnStyles: {
          9: { cellWidth: 20 },
          10: { cellWidth: 25 },
        },
      });

      doc.save(`teams_report_${downloadDate.replace(/ /g, "_")}.pdf`);
    }
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
          heading={
            <span style={{ color: "#E87722" }}>Applied Teams/Players</span>
          }
        />
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Start Date
            </label>
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
          <p className="text-center text-gray-600 text-lg">
            No registrations found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-[#39A935] text-white">
                  <th className="py-3 px-4 text-left">Player Name</th>
                  <th className="py-3 px-4 text-left">Tournament</th>
                  <th className="py-3 px-4 text-left">Father's Name</th>
                  <th className="py-3 px-4 text-left">Gender</th>
                  <th className="py-3 px-4 text-left">Ward No</th>
                  <th className="py-3 px-4 text-left">Block</th>
                  <th className="py-3 px-4 text-left">Village</th>
                  <th className="py-3 px-4 text-left">Aadhar</th>
                  <th className="py-3 px-4 text-left">Mobile</th>
                  <th className="py-3 px-4 text-left">Entry Form</th>
                  <th className="py-3 px-4 text-left">Sarpanch Performa</th>
                  <th className="py-3 px-4 text-left">Registration Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr
                    key={registration.id}
                    className="border-b hover:bg-gray-100"
                  >
                    {editingId === registration.id ? (
                      <>
                        <td className="py-3 px-4">
                          <input
                            name="playerName"
                            value={editForm.playerName || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="tournamentName"
                            value={editForm.tournamentName || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="fatherName"
                            value={editForm.fatherName || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            name="gender"
                            value={editForm.gender || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="ward"
                            value={editForm.ward || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="block"
                            value={editForm.block || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="village"
                            value={editForm.village || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="aadhar"
                            value={editForm.aadhar || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="mobile"
                            value={editForm.mobile || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="entryFormUrl"
                            value={editForm.entryFormUrl || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            name="sarpanchPerformaUrl"
                            value={editForm.sarpanchPerformaUrl || ""}
                            onChange={handleEditChange}
                            className="px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          {registration.timestamp
                            ? new Date(registration.timestamp).toLocaleString()
                            : "N/A"}
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
                        <td className="py-3 px-4">
                          {registration.playerName || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {registration.tournamentName || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {registration.fatherName || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {registration.gender || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {registration.ward || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {registration.block || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {registration.village || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {registration.aadhar || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {registration.mobile || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {registration.entryFormUrl ? (
                            <a
                              href={registration.entryFormUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Download
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {registration.sarpanchPerformaUrl ? (
                            <a
                              href={registration.sarpanchPerformaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Download
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
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
