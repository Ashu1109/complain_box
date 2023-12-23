import mongoose from "mongoose";
const complainSchema = new mongoose.Schema(
  {
    flatno: {
      type: String,
      requied: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    complain: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    image: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    assigned: {
      type: String,
      default:"",
    },
    closeTime: {
      type: Date,
      default: new Date()
    }
  },
  { timestamps: true }
);

const Complain =
  mongoose.models.complains || mongoose.model("complains", complainSchema);
export default Complain;
