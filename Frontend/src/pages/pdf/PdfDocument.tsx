// PdfDocument.tsx
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import type { Order } from "../../types/Types";
import { formatPdfDate } from "../../lib/dateFormatter";
import { formatCurrency } from "../../lib/formatCurrency";
import { convertNumberToWordsIndian } from "../../lib/convertNumberToWord";
import { Font } from "@react-pdf/renderer";
import RobotoFont from "../../assets/fonts/Roboto.ttf";

Font.register({
  family: "Roboto",
  src: RobotoFont,
});

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Roboto",
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold", 
    fontSize: 10, 
    color: "#27272a", 
    marginBottom: 2 
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 4,
    fontSize: 9,
  },
  orderDetails: {
    marginBottom: 10,
  },
  text: {
    fontSize: 10, // similar to `text-md`
    color: "#27272a", // tailwind `text-zinc-800`
    marginBottom: 4,
  },

});

const PdfDocument = ({ order }: { order: Order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ display: "flex", alignItems: "center"}}>
            <Image src="/App/LogoWithName.png" style={{ width: 120, height: 40 }} />
        </View>
        <Text style={{ fontSize: 14, marginTop: 4 }}>Tax Invoice / Bill of Supply</Text>
        <Text style={{ fontSize: 12 }}>(Original for Recipient)</Text>
      </View>


      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        {/* Sold By Section */}
        <View>
            <Text style={styles.bold}>Sold By:</Text>
            <Text>Trendora Enterprises</Text>
            <Text>16th Main Rd, Lakshmi Layout, BTM Layout</Text>
            <Text>Bengaluru, Karnataka</Text>
            <Text>India - 560076</Text>
            <Text>Contact - 9597889163</Text>
        </View>

        {/* Shipping Address Section */}
        <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Text style={styles.bold}>Shipping Address:</Text>
            <Text>{order?.address?.name}</Text>
            <Text>{order?.address?.line1}, {order?.address?.line2}</Text>
            <Text>{order?.address?.city}, {order?.address?.state}</Text>
            <Text>India - {order?.address?.pincode}</Text>
            <Text>Contact - {order?.address?.phone}</Text>
        </View>
      </View>


      {/* Order Details */}
      <View style={styles.orderDetails}>
        <Text style={styles.text}>
          <Text style={styles.bold}>Order No: </Text>
          <Text>{order?.orderNo}</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Order Date: </Text>
          <Text>{formatPdfDate(order?.createdAt)}</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Total Amount: </Text>
          <Text>
            {order?.totalAmount != null ? formatCurrency(order.totalAmount) : "Not provided"}
          </Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Mode of Payment: </Text>
          <Text>{order?.paymentMethod}</Text>
        </Text>
      </View>

      {/* Order Table */}
      <View
        style={{
          display: "table",
          width: "100%",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "#9ca3af",
          marginTop: 10,
          marginBottom: 4,
          borderTopWidth: 1, 

        }}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", backgroundColor: "#d1d5db" }}>
          {["ID", "Product Name", "Description", "Unit Price", "Qty", "Total Amount"].map(
            (header, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  borderRightWidth: i < 6 ? 1 : 0, 
                  borderBottomWidth: 1,
                  borderColor: "#9ca3af",
                  paddingVertical: 6,
                  paddingHorizontal: 6,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopWidth: 1,
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: 500, textAlign: "center" }}>
                  {header}
                </Text>
              </View>
            )
          )}
        </View>

        {/* Rows */}
        {order?.orderDetails.map((detail, idx) => (
          <View key={idx} style={{ flexDirection: "row" }}>
            {[idx + 1, detail.product.name, truncateText(detail.product.description ?? "", 80),
              formatCurrency(detail.discountedPrice), detail.quantity, formatCurrency(detail.totalPrice)]
              .map((val, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    borderRightWidth: i < 5 ? 1 : 0, 
                    borderBottomWidth: 1, 
                    borderColor: "#9ca3af",
                    padding: 6,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>{val}</Text>
                </View>
              ))}
          </View>
        ))}

        {/* Footer: Total Amount */}
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 5,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#9ca3af",
              padding: 6,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 10 }}>Total Amount</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderColor: "#9ca3af",
              padding: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#2563eb", fontWeight: 600, fontSize: 10 }}>
              {order?.totalAmount != null ? formatCurrency(order.totalAmount) : "Not provided"}
            </Text>
          </View>
        </View>

        {/* Footer: Total in Words */}
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 6,
              padding: 6,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 10 }}>
              Total Amount in Words:{" "}
              <Text style={{ color: "#2563eb" }}>
                {convertNumberToWordsIndian(order?.totalAmount ?? 0)}
              </Text>
            </Text>
          </View>
        </View>
      </View>





      {/* Terms & Conditions */}
      <View style={{ marginBottom: 10 }}>
        {/* Title */}
        <Text style={{ fontWeight: "600", fontSize: 11, color: "#27272a" }}>
          Terms & Conditions:
        </Text>

        {/* List */}
        <View style={{ marginTop: 4, paddingLeft: 12 }}>
          <Text style={{ fontSize: 10, color: "#4b5563", marginBottom: 2 }}>• All orders are processed subject to availability and confirmation of payment.</Text>
          <Text style={{ fontSize: 10, color: "#4b5563", marginBottom: 2 }}>• Products once sold are non-refundable and can only be exchanged if damaged or defective upon delivery.</Text>
        </View>
      </View>

      {/* Authorized Signature */}
      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Image src="/App/Signature.png" style={{ width: 100, height: 40 }} />
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
