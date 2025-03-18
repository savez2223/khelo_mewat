import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, onValue, off, update, remove } from "firebase/database";
import Container from "../components/Container/Container";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Cookies from "js-cookie";

const AppliedTeams = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableFilter, setTableFilter] = useState("cricketRegistrations");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const logoImage = "https://i.ibb.co/Zzqjn7Ht/logom.png";

  const sportOptions = [
    { value: "cricketRegistrations", label: "Cricket" },
    { value: "wrestlingRegistrations", label: "Wrestling" },
    { value: "raceRegistrations", label: "Race" },
    { value: "tugofwarRegistrations", label: "Tug of War" },
    { value: "volleyballRegistrations", label: "Volleyball" },
  ];

  // Race-specific event types and categories (from Race component)
  const raceEvents = {
    Running: [
      "100 Mtr.",
      "200 Mtr.",
      "400 Mtr.",
      "800 Mtr.",
      "1500 Mtr.",
      "3000 Mtr.",
    ],
    Jumping: ["Long Jump", "Triple Jump"],
    Throwing: ["Discus Throw", "Shot Put", "Javelin Throw"],
  };

  const collectionRefs = {
    cricketRegistrations: ref(db, "cricketRegistrations"),
    wrestlingRegistrations: ref(db, "wrestlingRegistrations"),
    raceRegistrations: ref(db, "raceRegistrations"),
    tugofwarRegistrations: ref(db, "tugofwarRegistrations"),
    volleyballRegistrations: ref(db, "volleyballRegistrations"),
  };

  useEffect(() => {
    if (!Cookies.get("auth")) {
      window.location.href = "/adminlogin";
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribeFunctions = [];

    const fetchData = (tableName, dbRef) => {
      return new Promise((resolve) => {
        const unsubscribe = onValue(
          dbRef,
          (snapshot) => {
            const data = snapshot.val();
            const registrationsArray = data
              ? Object.keys(data).map((key) => ({
                  id: key,
                  tableName,
                  ...data[key],
                }))
              : [];
            resolve(registrationsArray);
          },
          (err) => {
            setError(`Error fetching ${tableName}: ${err.message}`);
            console.error(err);
            resolve([]);
          }
        );
        unsubscribeFunctions.push(() => off(dbRef, "value", unsubscribe));
      });
    };

    const fetchAllData = async () => {
      try {
        const promises = Object.entries(collectionRefs).map(
          ([tableName, dbRef]) => fetchData(tableName, dbRef)
        );

        const results = await Promise.all(promises);
        const allRegistrations = results.flat();

        setRegistrations(allRegistrations);
        filterRegistrations(allRegistrations, startDate, endDate, tableFilter);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data: " + err.message);
        setLoading(false);
      }
    };

    fetchAllData();

    return () => unsubscribeFunctions.forEach((fn) => fn());
  }, [startDate, endDate, tableFilter]);

  const filterRegistrations = (data, start, end, table) => {
    let filtered = data.filter((reg) => reg.tableName === table);

    if (start || end) {
      filtered = filtered.filter((reg) => {
        const regDate = new Date(reg.timestamp);
        const startDateObj = start ? new Date(start) : null;
        const endDateObj = end ? new Date(end + "T23:59:59") : null;

        return (
          (!startDateObj || regDate >= startDateObj) &&
          (!endDateObj || regDate <= endDateObj)
        );
      });
    }

    setFilteredRegistrations(filtered);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    const downloadDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const logoWidth = 30;
    const logoHeight = 30;
    doc.addImage(logoImage, "PNG", 10, 10, logoWidth, logoHeight);

    doc.setFontSize(20);
    doc.setTextColor(57, 169, 53);
    doc.text(
      `${
        sportOptions.find((opt) => opt.value === tableFilter)?.label
      } Registrations Report`,
      50,
      25
    );
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${downloadDate}`, 50, 35);

    const columns = [
      { title: "Team", dataKey: "teamName" },
      { title: "Player", dataKey: "playerName" },
      { title: "Players Count", dataKey: "numPlayers" },
      ...(tableFilter === "raceRegistrations"
        ? [
            { title: "Event Type", dataKey: "eventType" },
            { title: "Event Category", dataKey: "eventCategory" },
          ]
        : []),
      { title: "Father's Name", dataKey: "fatherName" },
      { title: "Gender", dataKey: "gender" },
      { title: "DOB", dataKey: "dob" },
      { title: "Ward", dataKey: "ward" },
      { title: "Block", dataKey: "block" },
      { title: "Village", dataKey: "village" },
      { title: "Aadhaar", dataKey: "aadhaar" },
      { title: "Mobile", dataKey: "mobile" },
      { title: "Registered At", dataKey: "timestamp" },
    ].filter((col) => {
      if (
        col.dataKey === "numPlayers" &&
        !["cricketRegistrations", "tugofwarRegistrations"].includes(tableFilter)
      )
        return false;
      return true;
    });

    doc.autoTable({
      columns: columns,
      body: filteredRegistrations.map((reg) => ({
        teamName: reg.teamName || "N/A",
        playerName: reg.playerName || "N/A",
        numPlayers: reg.numPlayers || "N/A",
        eventType: reg.eventType || "N/A",
        eventCategory: reg.eventCategory || "N/A",
        fatherName: reg.fatherName || "N/A",
        gender: reg.gender || "N/A",
        dob: reg.dob || "N/A",
        ward: reg.wardNo || reg.ward || "N/A",
        block: reg.block || "N/A",
        village: reg.village || "N/A",
        aadhaar: reg.aadhaar || reg.aadhar || "N/A",
        mobile: reg.mobile || "N/A",
        timestamp: reg.timestamp
          ? new Date(reg.timestamp).toLocaleString()
          : "N/A",
      })),
      startY: 50,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: "linebreak",
        halign: "center",
      },
      headStyles: {
        fillColor: [57, 169, 53],
        textColor: 255,
        fontSize: 12,
        halign: "center",
      },
      bodyStyles: {
        textColor: 50,
        lineColor: [150, 150, 150],
      },
      columnStyles: {
        teamName: { cellWidth: 25 },
        playerName: { cellWidth: 25 },
        numPlayers: { cellWidth: 20 },
        eventType: { cellWidth: 25 },
        eventCategory: { cellWidth: 25 },
        fatherName: { cellWidth: 25 },
        gender: { cellWidth: 20 },
        dob: { cellWidth: 20 },
        ward: { cellWidth: 20 },
        block: { cellWidth: 20 },
        village: { cellWidth: 25 },
        aadhaar: { cellWidth: 25 },
        mobile: { cellWidth: 25 },
        timestamp: { cellWidth: 30 },
      },
      didDrawPage: (data) => {
        doc.setFontSize(10);
        doc.text(
          `Page ${doc.internal.getNumberOfPages()}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      },
    });

    doc.save(`${tableFilter}_report_${downloadDate}.pdf`);
  };

  const handleEdit = (registration) => {
    setEditingId(registration.id);
    setEditForm({
      ...registration,
      wardNo: registration.wardNo || registration.ward,
      aadhaar: registration.aadhaar || registration.aadhar,
      village: registration.village || "",
      eventType: registration.eventType || "",
      eventCategory: registration.eventCategory || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]:
        name === "numPlayers" || name === "weight"
          ? Math.max(0, parseInt(value) || 0)
          : value,
      ...(name === "eventType" && { eventCategory: "" }), // Reset category when type changes
    }));
  };

  const handleUpdate = async (id, tableName) => {
    try {
      const updates = { ...editForm };
      delete updates.id;
      delete updates.tableName;
      delete updates.timestamp;

      await update(ref(db, `${tableName}/${id}`), updates);
      setEditingId(null);
    } catch (error) {
      setError("Update failed: " + error.message);
    }
  };

  const handleDelete = async (id, tableName) => {
    if (window.confirm("Delete this registration permanently?")) {
      try {
        await remove(ref(db, `${tableName}/${id}`));
      } catch (error) {
        setError("Delete failed: " + error.message);
      }
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <Container>
        <SectionHeader heading="Applied Teams/Players Management" />

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
          <div>
            <label className="block mb-2 font-medium">Sport Category</label>
            <select
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {sportOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export PDF
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Team</th>
                <th className="p-3 text-left">Player</th>
                {["cricketRegistrations", "tugofwarRegistrations"].includes(
                  tableFilter
                ) && <th className="p-3 text-left">Players</th>}
                {tableFilter === "wrestlingRegistrations" && (
                  <th className="p-3 text-left">Weight</th>
                )}
                {tableFilter === "raceRegistrations" && (
                  <>
                    <th className="p-3 text-left">Event Type</th>
                    <th className="p-3 text-left">Event Category</th>
                  </>
                )}
                <th className="p-3 text-left">Father</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">DOB</th>
                <th className="p-3 text-left">Ward</th>
                <th className="p-3 text-left">Block</th>
                <th className="p-3 text-left">Village</th>
                <th className="p-3 text-left">Aadhaar</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Documents</th>
                <th className="p-3 text-left">Registered</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="border-b hover:bg-gray-50">
                  {editingId === reg.id ? (
                    <>
                      <td className="p-3">
                        <input
                          name="teamName"
                          value={editForm.teamName || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="playerName"
                          value={editForm.playerName || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      {["cricketRegistrations", "tugofwarRegistrations"].includes(
                        tableFilter
                      ) && (
                        <td className="p-3">
                          <input
                            type="number"
                            name="numPlayers"
                            value={editForm.numPlayers || 0}
                            onChange={handleEditChange}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                      )}
                      {tableFilter === "wrestlingRegistrations" && (
                        <td className="p-3">
                          <input
                            type="number"
                            name="weight"
                            value={editForm.weight || 0}
                            onChange={handleEditChange}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                      )}
                      {tableFilter === "raceRegistrations" && (
                        <>
                          <td className="p-3">
                            <select
                              name="eventType"
                              value={editForm.eventType || ""}
                              onChange={handleEditChange}
                              className="w-full p-1 border rounded"
                            >
                              <option value="">Select Event Type</option>
                              {Object.keys(raceEvents).map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3">
                            <select
                              name="eventCategory"
                              value={editForm.eventCategory || ""}
                              onChange={handleEditChange}
                              className="w-full p-1 border rounded"
                              disabled={!editForm.eventType}
                            >
                              <option value="">Select Event Category</option>
                              {editForm.eventType &&
                                raceEvents[editForm.eventType].map(
                                  (category) => (
                                    <option key={category} value={category}>
                                      {category}
                                    </option>
                                  )
                                )}
                            </select>
                          </td>
                        </>
                      )}
                      <td className="p-3">
                        <input
                          name="fatherName"
                          value={editForm.fatherName || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          name="gender"
                          value={editForm.gender || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="date"
                          name="dob"
                          value={editForm.dob || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="wardNo"
                          value={editForm.wardNo || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="block"
                          value={editForm.block || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="village"
                          value={editForm.village || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="aadhaar"
                          value={editForm.aadhaar || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="mobile"
                          value={editForm.mobile || ""}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-3">
                        <span className="text-gray-500">
                          (Files can't be edited)
                        </span>
                      </td>
                      <td className="p-3">
                        {new Date(reg.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => handleUpdate(reg.id, reg.tableName)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{reg.teamName || "N/A"}</td>
                      <td className="p-3">{reg.playerName || "N/A"}</td>
                      {["cricketRegistrations", "tugofwarRegistrations"].includes(
                        tableFilter
                      ) && <td className="p-3">{reg.numPlayers || "N/A"}</td>}
                      {tableFilter === "wrestlingRegistrations" && (
                        <td className="p-3">
                          {reg.weight ? `${reg.weight} kg` : "N/A"}
                        </td>
                      )}
                      {tableFilter === "raceRegistrations" && (
                        <>
                          <td className="p-3">{reg.eventType || "N/A"}</td>
                          <td className="p-3">{reg.eventCategory || "N/A"}</td>
                        </>
                      )}
                      <td className="p-3">{reg.fatherName || "N/A"}</td>
                      <td className="p-3">{reg.gender || "N/A"}</td>
                      <td className="p-3">{reg.dob || "N/A"}</td>
                      <td className="p-3">{reg.wardNo || reg.ward || "N/A"}</td>
                      <td className="p-3">{reg.block || "N/A"}</td>
                      <td className="p-3">{reg.village || "N/A"}</td>
                      <td className="p-3">
                        {reg.aadhaar || reg.aadhar || "N/A"}
                      </td>
                      <td className="p-3">{reg.mobile || "N/A"}</td>
                      <td className="p-3 space-x-2">
                        {reg.entryFormUrl && (
                          <a
                            href={reg.entryFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Entry
                          </a>
                        )}
                        {reg.sarpanchPerformaUrl && (
                          <a
                            href={reg.sarpanchPerformaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Performa
                          </a>
                        )}
                      </td>
                      <td className="p-3">
                        {new Date(reg.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => handleEdit(reg)}
                          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(reg.id, reg.tableName)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

          {filteredRegistrations.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No registrations found for selected criteria
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AppliedTeams;