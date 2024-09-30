import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
  template: {
    type: Object,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  query: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  }
}, { timestamps: true });

/**
 * Also make sure you are exporting your model the following way if you are using Next.js API routes. Because they will be deployed as serverless function while deploying to vercel, you want to make sure to do it the right way.
 * https://medium.com/@kaloraat/error-overwritemodelerror-cannot-overwrite-model-once-compiled-f6ceda528a47
 */
const Query = mongoose.models.Query || mongoose.model("Query", QuerySchema);
export default Query;