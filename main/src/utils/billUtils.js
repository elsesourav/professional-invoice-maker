// Generate a unique bill number
export const generateBillNumber = () => {
   const date = new Date();
   const year = date.getFullYear().toString().slice(-2);
   const month = (date.getMonth() + 1).toString().padStart(2, "0");
   const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
   return `INV${year}${month}${random}`;
};

// Calculate item amount
export const calculateItemAmount = (
   quantity,
   rate,
   gstPercentage,
   includeGST = true
) => {
   const baseAmount = quantity * rate;
   const gstAmount = includeGST ? (baseAmount * gstPercentage) / 100 : 0;
   return {
      baseAmount,
      gstAmount,
      totalAmount: baseAmount + gstAmount,
   };
};

// Calculate bill totals
export const calculateBillTotals = (items, includeGST = true) => {
   let subtotal = 0;
   let totalGST = 0;

   items.forEach((item) => {
      const { baseAmount, gstAmount } = calculateItemAmount(
         item.quantity || 0,
         item.rate || 0,
         item.gstPercentage || 0,
         includeGST
      );
      subtotal += baseAmount;
      totalGST += gstAmount;
   });

   return {
      subtotal: subtotal,
      totalGST: totalGST,
      total: subtotal + totalGST,
   };
};

// Format currency
export const formatCurrency = (amount) => {
   return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   }).format(amount || 0);
};

// Convert number to words (for amounts in words)
export const numberToWords = (num) => {
   const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
   ];
   const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
   ];
   const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
   ];

   if (num === 0) return "Zero";

   const convertHundreds = (n) => {
      let result = "";
      if (n >= 100) {
         result += ones[Math.floor(n / 100)] + " Hundred ";
         n %= 100;
      }
      if (n >= 20) {
         result += tens[Math.floor(n / 10)] + " ";
         n %= 10;
      } else if (n >= 10) {
         result += teens[n - 10] + " ";
         return result;
      }
      if (n > 0) {
         result += ones[n] + " ";
      }
      return result;
   };

   let result = "";
   let crores = Math.floor(num / 10000000);
   num %= 10000000;
   let lakhs = Math.floor(num / 100000);
   num %= 100000;
   let thousandsValue = Math.floor(num / 1000);
   num %= 1000;

   if (crores > 0) {
      result += convertHundreds(crores) + "Crore ";
   }
   if (lakhs > 0) {
      result += convertHundreds(lakhs) + "Lakh ";
   }
   if (thousandsValue > 0) {
      result += convertHundreds(thousandsValue) + "Thousand ";
   }
   if (num > 0) {
      result += convertHundreds(num);
   }

   return result.trim();
};

// Format date
export const formatDate = (dateString) => {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
   });
};
