export function convertNumberToWordsIndian(num: number): string {
  if (num === 0) return "Zero Only";

  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  const formatTens = (n: number): string => {
    if (n < 20) return ones[n];
    const t = Math.floor(n / 10);
    const o = n % 10;
    return tens[t] + (o ? " " + ones[o] : "");
  };

  let result = "";

  const crore = Math.floor(num / 10000000);
  if (crore) {
    result += formatTens(crore) + " Crore ";
    num %= 10000000;
  }

  const lakh = Math.floor(num / 100000);
  if (lakh) {
    result += formatTens(lakh) + " Lakh ";
    num %= 100000;
  }

  const thousand = Math.floor(num / 1000);
  if (thousand) {
    result += formatTens(thousand) + " Thousand ";
    num %= 1000;
  }

  const hundred = Math.floor(num / 100);
  if (hundred) {
    result += ones[hundred] + " Hundred ";
    num %= 100;
  }

  if (num) {
    if (result !== "") result += "and ";
    result += formatTens(num) + " ";
  }

  return result.trim() + " Rupees Only";
}


