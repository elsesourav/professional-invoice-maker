import { useCallback, useRef, useState } from "react";
import { FiEdit, FiEye, FiGithub, FiMail, FiPlus } from "react-icons/fi";
import defaultLogo from "./assets/a-logo.png";
import appIcon from "./assets/icon.png";
import BillForm from "./components/BillForm";
import BillPreview from "./components/BillPreview";
import { generateBillNumber } from "./utils/billUtils";

// Initial bill data structure
const createInitialBillData = () => ({
   // Company Details
   companyName: "",
   companyAddress: "",
   companyPhone: "",
   companyEmail: "",
   companyGST: "",

   // Bill Details
   billNumber: generateBillNumber(),
   billDate: new Date().toISOString().split("T")[0],
   dueDate: "",

   // Customer Details
   customerName: "",
   customerAddress: "",
   customerPhone: "",
   customerGST: "",

   // Items
   items: [
      {
         id: 1,
         description: "",
         quantity: 1,
         rate: 0,
         gstPercentage: 18,
         amount: 0,
      },
   ],

   // Additional Details
   signature: "",

   // Company Logo
   companyLogo: defaultLogo,
   showLogo: true,

   // GST Settings
   includeGST: false,

   // Calculated totals
   subtotal: 0,
   totalGST: 0,
   total: 0,
});

function App() {
   const [billData, setBillData] = useState(createInitialBillData);
   const [currentView, setCurrentView] = useState("form");
   const billPreviewRef = useRef();

   // Memoized handlers for better performance
   const handleViewChange = useCallback((view) => {
      setCurrentView(view);
   }, []);

   const handleGenerateNewBill = useCallback(() => {
      setBillData((prevData) => ({
         ...createInitialBillData(),
         // Preserve company details from previous bill
         companyName: prevData.companyName,
         companyAddress: prevData.companyAddress,
         companyPhone: prevData.companyPhone,
         companyEmail: prevData.companyEmail,
         companyGST: prevData.companyGST,
         companyLogo: prevData.companyLogo,
         showLogo: prevData.showLogo,
         includeGST: prevData.includeGST,
      }));
      handleViewChange("form");
   }, [handleViewChange]);

   return (
      <div className="min-h-screen bg-dark-dotted">
         {/* Enhanced Sticky Header */}
         <header className="no-print sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
            <div className="mx-auto max-w-6xl px-3 sm:px-4">
               <div className="h-12 flex items-center justify-between">
                  {/* Left: Navigation */}
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-2 text-gray-800 font-semibold">
                        <img
                           src={appIcon}
                           alt="Invoice Maker"
                           className="h-6 w-6 object-contain rounded"
                        />
                     </div>
                  </div>

                  {/* Center: Enhanced Edit/Preview Toggle */}
                  <div className="relative">
                     <div className="relative flex items-center bg-gray-100 rounded-full p-1 select-none shadow-inner">
                        {/* Sliding background */}
                        <span
                           className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-md transition-all duration-300 ease-out ${
                              currentView === "preview"
                                 ? "translate-x-full"
                                 : "translate-x-0"
                           }`}
                           aria-hidden="true"
                        />
                        <button
                           onClick={() => handleViewChange("form")}
                           className={`relative cursor-pointer z-10 flex-1 inline-flex items-center justify-center gap-2 h-8 w-24 text-sm font-medium transition-all duration-200 rounded-full ${
                              currentView === "form"
                                 ? "text-blue-600"
                                 : "text-gray-600 hover:text-gray-800"
                           }`}
                           aria-pressed={currentView === "form"}
                        >
                           <FiEdit className="h-4 w-4" />
                           <span className="inline">Edit</span>
                        </button>
                        <button
                           onClick={() => handleViewChange("preview")}
                           className={`relative cursor-pointer z-10 flex-1 inline-flex items-center justify-center gap-2 h-8 w-24 text-sm font-medium transition-all duration-200 rounded-full ${
                              currentView === "preview"
                                 ? "text-blue-600"
                                 : "text-gray-600 hover:text-gray-800"
                           }`}
                           aria-pressed={currentView === "preview"}
                        >
                           <FiEye className="h-4 w-4" />
                           <span className="inline">Preview</span>
                        </button>
                     </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-2">
                     <button
                        onClick={handleGenerateNewBill}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 transition-all duration-200 shadow-sm"
                        title="Create new invoice"
                     >
                        <FiPlus className="h-4 w-4" />
                        <span className="hidden sm:inline">New</span>
                     </button>
                  </div>
               </div>
            </div>
         </header>

         {/* Main Content */}
         <main className="flex-1">
            {currentView === "form" ? (
               <div className="container mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-8">
                  <div className="max-w-4xl mx-auto">
                     {/* Hero Section */}
                     <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
                           Professional Invoice Maker
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                           Create professional invoices with GST calculation,
                           custom branding, and instant preview
                        </p>
                     </div>

                     {/* Form Component */}
                     <BillForm
                        billData={billData}
                        setBillData={setBillData}
                        onPreview={() => handleViewChange("preview")}
                     />
                  </div>

                  {/* Footer */}
                  <footer className="mt-16 pt-8 border-t border-gray-200">
                     <div className="max-w-4xl mx-auto text-center">
                        <div className="text-sm text-gray-600 space-y-3">
                           <p>© {new Date().getFullYear()} elsesourav</p>
                           <div className="flex justify-center items-center gap-6 text-xs">
                              <span className="text-gray-500">Support:</span>
                              <a
                                 href="https://github.com/elsesourav"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors hover:underline"
                              >
                                 <FiGithub className="h-4 w-4" />
                                 <span>elsesourav</span>
                              </a>
                              <a
                                 href="mailto:elsesourav@gmail.com"
                                 className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors hover:underline"
                              >
                                 <FiMail className="h-4 w-4" />
                                 <span>elsesourav</span>
                              </a>
                           </div>
                        </div>
                     </div>
                  </footer>
               </div>
            ) : (
               <div className="min-h-screen bg-white">
                  <BillPreview ref={billPreviewRef} billData={billData} />
               </div>
            )}
         </main>
      </div>
   );
}

export default App;
