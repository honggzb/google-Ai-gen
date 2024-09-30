import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  sessionId: String,
  customerId: String,
  invoiceId: String,
  subscriptionId: String,
  mode: String,
  paymentStatus: String,
  customerEmail: String,
  amountTotal: Number,
  status: String,
}, { timestamps: true });

/**
 * Also make sure you are exporting your model the following way if you are using Next.js API routes. Because they will be deployed as serverless function while deploying to vercel, you want to make sure to do it the right way.
 * https://medium.com/@kaloraat/error-overwritemodelerror-cannot-overwrite-model-once-compiled-f6ceda528a47
 */
const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
export default Transaction;