import { forwardRef } from "react";
import { FiMail, FiPhone, FiPrinter } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { formatCurrency, formatDate, numberToWords } from "../utils/billUtils";

const BillPreview = forwardRef(({ billData }, ref) => {
   const amountInWords = numberToWords(Math.floor(billData.total));

   return (
      <div
         ref={ref}
         className="max-w-4xl mx-auto bg-white px-2 py-6 sm:p-8 shadow-lg"
         style={{ minHeight: "297mm" }}
      >
         {/* A4 Size Container - Responsive */}
         <div
            className="w-full max-w-none mx-auto"
            style={{
               width: "100%",
               maxWidth: "210mm",
               minHeight: "297mm",
            }}
         >
            {/* Header */}
            <div className="border-b-2 border-gray-800 pb-2 sm:pb-6 mb-2 sm:mb-6">
               {billData.showLogo ? (
                  <div className="flex justify-between items-center space-y-4">
                     {/* Logo section */}
                     <div className="flex flex-col space-y-4 items-start">
                        {/* Logo */}
                        <img
                           src={billData.companyLogo}
                           alt="Company Logo"
                           className="h-8 sm:h-16 object-contain self-start"
                           style={{ aspectRatio: "7/2" }}
                        />
                        {/* Contact info below logo */}
                        <div className="flex flex-wrap gap-1 sm:gap-4 text-[10px] sm:text-sm text-gray-600">
                           {billData.companyPhone && (
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                 <FiPhone className="w-3 h-3 sm:w-4 sm:h-4" />
                                 <span>{billData.companyPhone}</span>
                              </div>
                           )}
                           {billData.companyEmail && (
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                 <FiMail className="w-3 h-3 sm:w-4 sm:h-4" />
                                 <span className="break-all">
                                    {billData.companyEmail}
                                 </span>
                              </div>
                           )}
                           {billData.includeGST && billData.companyGST && (
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                 <HiOutlineOfficeBuilding className="w-3 h-3 sm:w-4 sm:h-4" />
                                 <span>GST: {billData.companyGST}</span>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* Invoice details */}
                     <div className="text-left sm:text-right">
                        <h2 className="text-[16px] sm:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">
                           INVOICE
                        </h2>
                        <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-sm text-gray-600">
                           <div>
                              <span className="font-medium">Invoice No:</span>{" "}
                              {billData.billNumber}
                           </div>
                           <div>
                              <span className="font-medium">Date:</span>{" "}
                              {formatDate(billData.billDate)}
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
                     <div className="flex-1">
                        <h1 className="text-[16px] sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                           {billData.companyName || "Company Name"}
                        </h1>
                        {billData.companyAddress && (
                           <p className="text-[10px] sm:text-base text-gray-600 mb-1 sm:mb-2 leading-relaxed">
                              {billData.companyAddress}
                           </p>
                        )}
                        <div className="flex flex-wrap gap-1 sm:gap-4 text-[10px] sm:text-sm text-gray-600">
                           {billData.companyPhone && (
                              <div className="flex items-center space-x-1">
                                 <FiPhone className="w-3 h-3 sm:w-4 sm:h-4" />
                                 <span>{billData.companyPhone}</span>
                              </div>
                           )}
                           {billData.companyEmail && (
                              <div className="flex items-center space-x-1">
                                 <FiMail className="w-3 h-3 sm:w-4 sm:h-4" />
                                 <span className="break-all">
                                    {billData.companyEmail}
                                 </span>
                              </div>
                           )}
                           {billData.includeGST && billData.companyGST && (
                              <div className="flex items-center space-x-1">
                                 <HiOutlineOfficeBuilding className="w-3 h-3 sm:w-4 sm:h-4" />
                                 <span>GST: {billData.companyGST}</span>
                              </div>
                           )}
                        </div>
                     </div>

                     <div className="text-left sm:text-right">
                        <h2 className="text-[16px] sm:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">
                           INVOICE
                        </h2>
                        <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-sm text-gray-600">
                           <div>
                              <span className="font-medium">Invoice No:</span>{" "}
                              {billData.billNumber}
                           </div>
                           <div>
                              <span className="font-medium">Date:</span>{" "}
                              {formatDate(billData.billDate)}
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>

            {/* Invoice To Section */}
            <div className="grid grid-cols-2 gap-2 sm:gap-8 mb-4 sm:mb-8">
               <div>
                  <h3 className="text-[11px] sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-3 pb-1 border-b border-gray-300">
                     Invoice To:
                  </h3>
                  <div className="space-y-1 sm:space-y-2">
                     <div className="font-medium text-gray-800 text-[10px] sm:text-base">
                        {billData.customerName || "Customer Name"}
                     </div>
                     {billData.customerAddress && (
                        <div className="text-gray-600 leading-relaxed text-[9px] sm:text-sm">
                           {billData.customerAddress}
                        </div>
                     )}
                     {billData.customerPhone && (
                        <div className="text-gray-600 text-[9px] sm:text-sm">
                           📞 {billData.customerPhone}
                        </div>
                     )}
                     {billData.includeGST && billData.customerGST && (
                        <div className="text-gray-600 text-[9px] sm:text-sm">
                           GST: {billData.customerGST}
                        </div>
                     )}
                  </div>
               </div>

               <div>
                  <h3 className="text-[11px] sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-3 pb-1 border-b border-gray-300">
                     Invoice From:
                  </h3>
                  <div className="space-y-1 sm:space-y-2">
                     <div className="font-medium text-gray-800 text-[10px] sm:text-base">
                        {billData.companyName || "Company Name"}
                     </div>
                     {billData.companyAddress && (
                        <div className="text-gray-600 leading-relaxed text-[9px] sm:text-sm">
                           {billData.companyAddress}
                        </div>
                     )}
                     {billData.includeGST && billData.companyGST && (
                        <div className="text-gray-600 text-[9px] sm:text-sm">
                           GST: {billData.companyGST}
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Items Table */}
            <div className="mb-4 sm:mb-8">
               <table className="w-full border-collapse border border-gray-400">
                  <thead>
                     <tr className="bg-gray-100">
                        <th className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-left font-semibold text-[9px] sm:text-base">
                           S.No
                        </th>
                        <th className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-left font-semibold text-[9px] sm:text-base">
                           Description
                        </th>
                        <th className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-center font-semibold text-[9px] sm:text-base">
                           Qty
                        </th>
                        <th className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-right font-semibold text-[9px] sm:text-base">
                           Rate
                        </th>
                        {billData.includeGST && (
                           <th className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-center font-semibold text-[9px] sm:text-base">
                              GST%
                           </th>
                        )}
                        <th className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-right font-semibold text-[9px] sm:text-base">
                           Amount
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {billData.items.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                           <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-center text-[9px] sm:text-base">
                              {index + 1}
                           </td>
                           <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-[9px] sm:text-base">
                              {item.description || "Item Description"}
                           </td>
                           <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-center text-[9px] sm:text-base">
                              {item.quantity}
                           </td>
                           <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-right text-[9px] sm:text-base">
                              {formatCurrency(item.rate)}
                           </td>
                           {billData.includeGST && (
                              <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-center text-[9px] sm:text-base">
                                 {item.gstPercentage}%
                              </td>
                           )}
                           <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-right font-medium text-[9px] sm:text-base">
                              {formatCurrency(item.amount)}
                           </td>
                        </tr>
                     ))}

                     {/* Empty rows for better formatting */}
                     {billData.items.length < 5 && (
                        <>
                           {Array(5 - billData.items.length)
                              .fill(0)
                              .map((_, index) => (
                                 <tr key={`empty-${index}`}>
                                    <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3">
                                       &nbsp;
                                    </td>
                                    <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3">
                                       &nbsp;
                                    </td>
                                    <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3">
                                       &nbsp;
                                    </td>
                                    <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3">
                                       &nbsp;
                                    </td>
                                    {billData.includeGST && (
                                       <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3">
                                          &nbsp;
                                       </td>
                                    )}
                                    <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3">
                                       &nbsp;
                                    </td>
                                 </tr>
                              ))}
                        </>
                     )}
                  </tbody>
               </table>
            </div>

            {/* Totals Section */}
            <div className="flex flex-row justify-between items-end mb-4 sm:mb-8 gap-1 sm:gap-0">
               {/* Amount in Words - Left side */}
               <div className="w-1/2 sm:w-1/2">
                  <div className="p-1 sm:p-3 bg-gray-50 border border-gray-300 rounded">
                     <div className="text-[9px] sm:text-sm font-medium text-gray-700">
                        Amount in Words:
                     </div>
                     <div className="text-[9px] sm:text-sm text-gray-800 font-medium">
                        {amountInWords} Rupees Only
                     </div>
                  </div>
               </div>

               {/* Totals Table - Right side */}
               <div className="w-1/2 sm:w-96">
                  <table className="w-full border-collapse border border-gray-400">
                     <tbody>
                        <tr>
                           <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-2 bg-gray-100 font-semibold text-[9px] sm:text-base">
                              Subtotal:
                           </td>
                           <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-2 text-right text-[9px] sm:text-base">
                              {formatCurrency(billData.subtotal)}
                           </td>
                        </tr>
                        {billData.includeGST && (
                           <tr>
                              <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-2 bg-gray-100 font-semibold text-[9px] sm:text-base">
                                 Total GST:
                              </td>
                              <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-2 text-right text-[9px] sm:text-base">
                                 {formatCurrency(billData.totalGST)}
                              </td>
                           </tr>
                        )}
                        <tr className="bg-blue-50">
                           <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 font-bold text-[10px] sm:text-lg">
                              Grand Total:
                           </td>
                           <td className="border border-gray-400 px-1 sm:px-4 py-1 sm:py-3 text-right font-bold text-[10px] sm:text-lg">
                              {formatCurrency(billData.total)}
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Footer with Signature */}
            <div className="flex justify-between items-end pt-8 border-t border-gray-300">
               <div className="text-[9px] sm:text-sm text-gray-600">
                  <p>Thank you for choosing us!</p>
                  <p className="mt-2">
                     Generated on:{" "}
                     {formatDate(new Date().toISOString().split("T")[0])}
                  </p>
               </div>

               {billData.signature && (
                  <div className="text-center">
                     <div className="border-t border-gray-400 pt-2 mt-16 w-48">
                        <p className="text-[10px] sm:text-sm font-medium text-gray-800">
                           {billData.signature}
                        </p>
                        <p className="text-[8px] sm:text-xs text-gray-600">
                           Authorized Signature
                        </p>
                     </div>
                  </div>
               )}
            </div>

            {/* Footer with computer generated text */}
            <div className="mt-8 text-center">
               <p className="text-[8px] sm:text-xs text-gray-500">
                  This is a computer generated invoice
               </p>
            </div>

            {/* Print Button Section - At the very bottom */}
            <div className="no-print flex justify-center mt-8 pt-6 border-t border-gray-200">
               <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
               >
                  <FiPrinter className="h-5 w-5" />
                  <span className="font-medium">Print Invoice</span>
               </button>
            </div>
         </div>
      </div>
   );
});

BillPreview.displayName = "BillPreview";

export default BillPreview;
