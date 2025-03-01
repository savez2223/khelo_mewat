import React from "react";
import Container from "../components/Container/Container"; // Adjust path
import SectionHeader from "../components/SectionHeader/SectionHeader"; // Adjust path
import sarpanchperforma from "../assets/Sarpanch-performa.pdf";
import Entryform from "../assets/Entry Form Khelo Mewat Mahakumbh.pdf";

const DownloadForms = () => {
  const handleDownload = (pdfUrl, title) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#F5F6F5] ">
      <Container>
        <div className="text-center mb-12">
          <SectionHeader
            heading={<span style={{ color: "#E87722" }}>Download Forms</span>}
          />
          <p className="text-gray-600 text-lg mt-2 font-light">
            Download important forms from here
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 justify-center items-center">
          {/* Join Form */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-[#39A935] mb-8 border-b-2 border-[#E87722] pb-3 tracking-tight text-center">
              Join Form
            </h2>
            <div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-l-4 border-[#39A935] cursor-pointer text-center"
              onClick={() => handleDownload(Entryform, "Join Form")}
            >
              <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-[#E87722] to-[#F5A623] text-white font-medium rounded-lg hover:from-[#39A935] hover:to-[#4CAF50] transition-all duration-300">
                Download Join Form
              </button>
            </div>
          </div>

          {/* Sarpanch Performa */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-[#39A935] mb-8 border-b-2 border-[#E87722] pb-3 tracking-tight text-center">
              Sarpanch Performa
            </h2>
            <div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-l-4 border-[#39A935] cursor-pointer text-center"
              onClick={() =>
                handleDownload(sarpanchperforma, "Sarpanch Performa")
              }
            >
              <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-[#E87722] to-[#F5A623] text-white font-medium rounded-lg hover:from-[#39A935] hover:to-[#4CAF50] transition-all duration-300">
                Download Sarpanch Performa
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DownloadForms;
