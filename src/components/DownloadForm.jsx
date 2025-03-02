import React from "react";
import Container from "../components/Container/Container"; 
import SectionHeader from "../components/SectionHeader/SectionHeader"; 
import sarpanchPerforma from "../assets/Sarpanch-performa.pdf";
import entryForm from "../assets/Entry Form Khelo Mewat Mahakumbh.pdf";

const DownloadForms = () => {
  const handleDownload = (pdfUrl, fileName) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#F7F8FA] py-12">
      <Container>
        <div className="text-center mb-10">
          <SectionHeader
            heading={<span className="text-[#1A3C34] font-semibold">Downloadable Forms</span>}
          />
          <p className="text-gray-600 text-base mt-3 font-medium max-w-2xl mx-auto">
            Access and download essential forms conveniently from this section.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
          {/* Join Form */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-[#1A3C34] mb-6 border-b-2 border-[#D9E2DF] pb-2 text-center">
              Participation Form
            </h2>
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#1A3C34] cursor-pointer text-center"
              onClick={() => handleDownload(entryForm, "Participation Form")}
            >
              <button className="w-full px-5 py-2 bg-[#1A3C34] text-white font-medium rounded-md hover:bg-[#2E5C52] transition-colors duration-300">
                Download Participation Form
              </button>
            </div>
          </div>

          {/* Sarpanch Performa */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-[#1A3C34] mb-6 border-b-2 border-[#D9E2DF] pb-2 text-center">
              Sarpanch Performa
            </h2>
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#1A3C34] cursor-pointer text-center"
              onClick={() => handleDownload(sarpanchPerforma, "Sarpanch Performa")}
            >
              <button className="w-full px-5 py-2 bg-[#1A3C34] text-white font-medium rounded-md hover:bg-[#2E5C52] transition-colors duration-300">
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