import { useEffect, useState } from "react";
import {
   FiChevronDown,
   FiChevronUp,
   FiPlus,
   FiShoppingCart,
   FiUpload,
   FiUser,
   FiX,
} from "react-icons/fi";
import { calculateBillTotals, calculateItemAmount } from "../utils/billUtils";

const BillForm = ({ billData, setBillData, onPreview }) => {
   const [activeTab, setActiveTab] = useState("details");
   const [expandedSections, setExpandedSections] = useState({
      company: true,
      customer: true,
      settings: false,
   });

   // Update totals whenever items change
   useEffect(() => {
      const totals = calculateBillTotals(billData.items, billData.includeGST);
      setBillData((prev) => ({
         ...prev,
         ...totals,
      }));
   }, [billData.items, billData.includeGST, setBillData]);

   const toggleSection = (section) => {
      setExpandedSections((prev) => ({
         ...prev,
         [section]: !prev[section],
      }));
   };

   const updateField = (field, value) => {
      setBillData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   const updateItem = (index, field, value) => {
      const newItems = [...billData.items];
      newItems[index] = {
         ...newItems[index],
         [field]: value,
      };

      // Calculate amount for this item
      if (
         field === "quantity" ||
         field === "rate" ||
         field === "gstPercentage"
      ) {
         const { totalAmount } = calculateItemAmount(
            newItems[index].quantity || 0,
            newItems[index].rate || 0,
            newItems[index].gstPercentage || 0,
            billData.includeGST
         );
         newItems[index].amount = totalAmount;
      }

      setBillData((prev) => ({
         ...prev,
         items: newItems,
      }));
   };

   const addItem = () => {
      const newItem = {
         id: billData.items.length + 1,
         description: "",
         quantity: 1,
         rate: 0,
         gstPercentage: 18,
         amount: 0,
      };
      setBillData((prev) => ({
         ...prev,
         items: [...prev.items, newItem],
      }));
   };

   const removeItem = (index) => {
      if (billData.items.length > 1) {
         setBillData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
         }));
      }
   };

   const tabs = [
      { id: "details", label: "Details", icon: FiUser },
      { id: "items", label: "Items", icon: FiShoppingCart },
   ];

   const validateForm = () => {
      // Company and customer names are required
      const required = ["companyName", "customerName"];

      return (
         required.every((field) => billData[field]?.trim()) &&
         billData.items.some((item) => item.description?.trim())
      );
   };

   return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
         {/* Enhanced Tab Navigation */}
         <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <nav className="flex max-w-md mx-auto sm:max-w-none">
               {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 px-4 sm:px-8 text-sm sm:text-base font-medium transition-all duration-300 relative group ${
                           activeTab === tab.id
                              ? "text-blue-600 bg-white shadow-sm"
                              : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                        }`}
                     >
                        <IconComponent
                           className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 ${
                              activeTab === tab.id
                                 ? "scale-110"
                                 : "group-hover:scale-105"
                           }`}
                        />
                        <span className="hidden sm:inline font-semibold">
                           {tab.label}
                        </span>
                        <span className="sm:hidden text-xs font-medium">
                           {tab.label}
                        </span>

                        {/* Active indicator */}
                        {activeTab === tab.id && (
                           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full"></div>
                        )}
                     </button>
                  );
               })}
            </nav>
         </div>

         {/* Tab Content with Slide Animation */}
         <div className="relative overflow-hidden">
            <div
               className="flex transition-transform duration-300 ease-in-out"
               style={{
                  transform: `translateX(-${activeTab === "items" ? 100 : 0}%)`,
               }}
            >
               {/* Details Tab - Company + Customer */}
               <div className="w-full flex-shrink-0 p-4 sm:p-6 space-y-6">
                  {/* Settings Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-blue-50 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-800">
                        Invoice Settings
                     </h3>
                     <div className="flex flex-col xs:flex-row gap-6">
                        <div className="flex items-center justify-between">
                           <span className="text-sm font-medium text-gray-700 flex-shrink-0 min-w-[80px]">
                              Show Logo
                           </span>
                           <button
                              onClick={() =>
                                 updateField("showLogo", !billData.showLogo)
                              }
                              className={`relative inline-flex h-8 w-20 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-4 ${
                                 billData.showLogo
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                              }`}
                           >
                              <span
                                 className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                                    billData.showLogo
                                       ? "translate-x-13"
                                       : "translate-x-1"
                                 }`}
                              />
                           </button>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-sm font-medium text-gray-700 flex-shrink-0 min-w-[80px]">
                              Include GST
                           </span>
                           <button
                              onClick={() =>
                                 updateField("includeGST", !billData.includeGST)
                              }
                              className={`relative inline-flex h-8 w-20 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-4 ${
                                 billData.includeGST
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                              }`}
                           >
                              <span
                                 className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                                    billData.includeGST
                                       ? "translate-x-13"
                                       : "translate-x-1"
                                 }`}
                              />
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Company Section */}
                  <div className="space-y-4">
                     <button
                        onClick={() => toggleSection("company")}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                     >
                        <h4 className="font-medium text-gray-800">
                           Company Information
                        </h4>
                        {expandedSections.company ? (
                           <FiChevronUp className="h-4 w-4 text-gray-600" />
                        ) : (
                           <FiChevronDown className="h-4 w-4 text-gray-600" />
                        )}
                     </button>

                     <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                           expandedSections.company
                              ? "max-h-[800px] opacity-100"
                              : "max-h-0 opacity-0"
                        }`}
                     >
                        <div className="space-y-4 pl-2 pt-4">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="sm:col-span-2">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name{" "}
                                    <span className="text-red-500">*</span>
                                 </label>
                                 <input
                                    type="text"
                                    value={billData.companyName}
                                    onChange={(e) =>
                                       updateField(
                                          "companyName",
                                          e.target.value
                                       )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    placeholder="Enter your company name"
                                 />
                              </div>

                              {billData.showLogo && (
                                 <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Company Logo
                                    </label>
                                    <div className="flex items-center gap-4">
                                       <img
                                          src={billData.companyLogo}
                                          alt="Company Logo"
                                          className="w-20 h-10 object-contain border border-gray-300 rounded bg-gray-50"
                                       />
                                       <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm">
                                          <FiUpload className="h-4 w-4" />
                                          <span>Upload</span>
                                          <input
                                             type="file"
                                             accept="image/*"
                                             onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                   const reader =
                                                      new FileReader();
                                                   reader.onload = (e) => {
                                                      updateField(
                                                         "companyLogo",
                                                         e.target.result
                                                      );
                                                   };
                                                   reader.readAsDataURL(file);
                                                }
                                             }}
                                             className="hidden"
                                          />
                                       </label>
                                    </div>
                                 </div>
                              )}

                              <div className="sm:col-span-2">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                 </label>
                                 <textarea
                                    value={billData.companyAddress}
                                    onChange={(e) =>
                                       updateField(
                                          "companyAddress",
                                          e.target.value
                                       )
                                    }
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    placeholder="Company address"
                                 />
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                 </label>
                                 <input
                                    type="tel"
                                    value={billData.companyPhone}
                                    onChange={(e) =>
                                       updateField(
                                          "companyPhone",
                                          e.target.value
                                       )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    placeholder="Phone number"
                                 />
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                 </label>
                                 <input
                                    type="email"
                                    value={billData.companyEmail}
                                    onChange={(e) =>
                                       updateField(
                                          "companyEmail",
                                          e.target.value
                                       )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    placeholder="Email address"
                                 />
                              </div>

                              {billData.includeGST && (
                                 <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       GST Number
                                    </label>
                                    <input
                                       type="text"
                                       value={billData.companyGST}
                                       onChange={(e) =>
                                          updateField(
                                             "companyGST",
                                             e.target.value
                                          )
                                       }
                                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                       placeholder="GST Number"
                                    />
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Customer Section */}
                  <div className="space-y-4">
                     <button
                        onClick={() => toggleSection("customer")}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                     >
                        <h4 className="font-medium text-gray-800">
                           Customer Information
                        </h4>
                        {expandedSections.customer ? (
                           <FiChevronUp className="h-4 w-4 text-gray-600" />
                        ) : (
                           <FiChevronDown className="h-4 w-4 text-gray-600" />
                        )}
                     </button>

                     <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                           expandedSections.customer
                              ? "max-h-[800px] opacity-100"
                              : "max-h-0 opacity-0"
                        }`}
                     >
                        <div className="space-y-4 pl-2 pt-4">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Customer Name{" "}
                                    <span className="text-red-500">*</span>
                                 </label>
                                 <input
                                    type="text"
                                    value={billData.customerName}
                                    onChange={(e) =>
                                       updateField(
                                          "customerName",
                                          e.target.value
                                       )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    placeholder="Customer name"
                                 />
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                 </label>
                                 <input
                                    type="tel"
                                    value={billData.customerPhone}
                                    onChange={(e) =>
                                       updateField(
                                          "customerPhone",
                                          e.target.value
                                       )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    placeholder="Customer phone"
                                 />
                              </div>

                              <div className="sm:col-span-2">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                 </label>
                                 <textarea
                                    value={billData.customerAddress}
                                    onChange={(e) =>
                                       updateField(
                                          "customerAddress",
                                          e.target.value
                                       )
                                    }
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    placeholder="Customer address"
                                 />
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Invoice Date
                                 </label>
                                 <input
                                    type="date"
                                    value={billData.billDate}
                                    onChange={(e) =>
                                       updateField("billDate", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                 />
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Invoice Number
                                 </label>
                                 <input
                                    type="text"
                                    value={billData.billNumber}
                                    onChange={(e) =>
                                       updateField("billNumber", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                    placeholder="Invoice #"
                                 />
                              </div>

                              {billData.includeGST && (
                                 <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Customer GST Number
                                    </label>
                                    <input
                                       type="text"
                                       value={billData.customerGST}
                                       onChange={(e) =>
                                          updateField(
                                             "customerGST",
                                             e.target.value
                                          )
                                       }
                                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                       placeholder="Customer GST Number"
                                    />
                                 </div>
                              )}
                           </div>

                           <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Authorized Signature
                              </label>
                              <input
                                 type="text"
                                 value={billData.signature}
                                 onChange={(e) =>
                                    updateField("signature", e.target.value)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                 placeholder="Name of authorized signatory"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Items Tab */}
               <div className="w-full flex-shrink-0 p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-lg font-semibold text-gray-800">
                        Items & Services
                     </h3>
                  </div>

                  <div className="space-y-3">
                     {billData.items.map((item, index) => (
                        <div
                           key={item.id}
                           className="border border-gray-200 rounded-lg p-4 space-y-3"
                        >
                           <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600">
                                 Item {index + 1}
                              </span>
                              {billData.items.length > 1 && (
                                 <button
                                    onClick={() => removeItem(index)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                 >
                                    <FiX className="h-4 w-4" />
                                 </button>
                              )}
                           </div>

                           <div className="space-y-3">
                              <div>
                                 <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Description
                                 </label>
                                 <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) =>
                                       updateItem(
                                          index,
                                          "description",
                                          e.target.value
                                       )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    placeholder="Item description"
                                 />
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                 <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                       Qty
                                    </label>
                                    <input
                                       type="number"
                                       value={item.quantity}
                                       onChange={(e) =>
                                          updateItem(
                                             index,
                                             "quantity",
                                             parseFloat(e.target.value) || 0
                                          )
                                       }
                                       className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center"
                                       min="0"
                                       step="0.01"
                                    />
                                 </div>

                                 <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                       Rate
                                    </label>
                                    <input
                                       type="number"
                                       value={item.rate}
                                       onChange={(e) =>
                                          updateItem(
                                             index,
                                             "rate",
                                             parseFloat(e.target.value) || 0
                                          )
                                       }
                                       className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center"
                                       min="0"
                                       step="0.01"
                                    />
                                 </div>

                                 {billData.includeGST && (
                                    <div>
                                       <label className="block text-xs font-medium text-gray-600 mb-1">
                                          GST%
                                       </label>
                                       <input
                                          type="number"
                                          value={item.gstPercentage}
                                          onChange={(e) =>
                                             updateItem(
                                                index,
                                                "gstPercentage",
                                                parseFloat(e.target.value) || 0
                                             )
                                          }
                                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center"
                                          min="0"
                                          max="100"
                                          step="0.01"
                                       />
                                    </div>
                                 )}

                                 <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                       Amount
                                    </label>
                                    <div className="px-2 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-center font-medium">
                                       ₹{item.amount.toFixed(2)}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Add Item Button */}
                  <div className="flex justify-center">
                     <button
                        onClick={addItem}
                        className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-md hover:shadow-lg"
                     >
                        <FiPlus className="h-4 w-4" />
                        Add Item
                     </button>
                  </div>

                  {/* Totals */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                     <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>₹{billData.subtotal.toFixed(2)}</span>
                     </div>
                     {billData.includeGST && (
                        <div className="flex justify-between text-sm">
                           <span>Total GST:</span>
                           <span>₹{billData.totalGST.toFixed(2)}</span>
                        </div>
                     )}
                     <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>₹{billData.total.toFixed(2)}</span>
                     </div>
                  </div>

                  {/* Items Tab Footer Actions */}
                  <div className="border-t border-gray-200 pt-4">
                     <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                           <button
                              onClick={() => setActiveTab("details")}
                              className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium min-h-[48px]"
                           >
                              Back: Details
                           </button>

                           <button
                              onClick={onPreview}
                              disabled={!validateForm()}
                              className={`w-full px-6 py-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                                 validateForm()
                                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                           >
                              Preview Invoice
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Footer Actions - Only for Details Tab */}
         {activeTab === "details" && (
            <div className="border-t border-gray-200 p-4 sm:p-6">
               <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                     <button
                        onClick={() => setActiveTab("items")}
                        className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium min-h-[48px]"
                     >
                        Next: Items
                     </button>

                     <button
                        onClick={onPreview}
                        disabled={!validateForm()}
                        className={`w-full px-6 py-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                           validateForm()
                              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                     >
                        Preview Invoice
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default BillForm;
