// PaymentOptions.js
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  Avatar,
  TextField,
  styled,
  Grid,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import JAZZCASH from "../../../../src/image/JAZZCASH.jpg";
import EASYPAISA from "../../../../src/image/EASYPAISA.jpg";
import CRYSTALSOLUTION from "../../../../src/image/logo.png";
import { useSnackbar } from "notistack";
import "./Header.css";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import { getOrganisationData } from "../../Auth";

const StyledTabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const UploadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const PreviewImage = styled(CardMedia)({
  height: 150,
  borderRadius: 8,
  marginTop: 16,
  backgroundSize: "contain",
});

function PaymentOptions({ open, onClose, onSubmitPayment }) {
  const organisation = getOrganisationData();

  const [tabValue, setTabValue] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Reset form when switching tabs
    setTransactionId("");
    setRemarks("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        enqueueSnackbar("Image size should be less than 2MB", {
          variant: "error",
        });
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const { apiLinks } = useTheme();
  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      FTrnId: transactionId,
      FTrnRem: remarks,
      FEmlAdd: "sohaibsaleem89@gmail.com",
      FColAmt: 2000, // You might want to pass this as prop
      code: organisation.code,
      FCstDsc: organisation.description,
    };

    const formData = new URLSearchParams(data).toString();

    try {
      const response = await axios.post(
        `${apiLinks}/SaveCrystalCustomerCollection.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // toast.dismiss("login-process");
      const { error, message, user, organisation } = response.data;
      if (error === 200) {
        enqueueSnackbar("Payment saved successfully!", { variant: "success" });
        onClose();

        // Reset form
        setTransactionId("");
        setRemarks("");
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        // toast.dismiss();
        // toast.error(`${message}`, {
        //   autoClose: 3000,
        // });
      }
    } catch (error) {
      // toast.error("An error occurred during login. Please try again.", {
      //   autoClose: 3000,
      // });
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      // dialogClassName="my-modal-PaymentOptions"
    >
      <DialogTitle
        sx={{
          backgroundColor: "#0A2744",
          color: "white",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          py: 2,
        }}
      >
        Payment Options
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="payment options tabs"
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#0A2744",
              height: 3,
            },
            "& .MuiTab-root": {
              color: "#0A2744",
              fontWeight: "bold",
              "&.Mui-selected": {
                color: "#0A2744",
              },
            },
          }}
        >
          <Tab label="JazzCash" icon={<QrCodeIcon />} />
          <Tab label="EasyPaisa" icon={<QrCodeIcon />} />
          <Tab label="Bank Account" icon={<AccountBalanceIcon />} />
        </Tabs>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            {tabValue === 0 && (
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#0A2744" }}
                  >
                    JazzCash QR Code
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px dashed #0A2744",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <img
                      src={JAZZCASH}
                      alt="JazzCash QR Code"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "250px",
                      }}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Scan this QR code to make payment via JazzCash
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor: "#f5f5f5",
                      p: 1,
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Account Number: 03218811400
                  </Typography>
                </CardContent>
              </Card>
            )}

            {tabValue === 1 && (
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#0A2744" }}
                  >
                    EasyPaisa QR Code
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px dashed #0A2744",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <img
                      src={EASYPAISA}
                      alt="EasyPaisa QR Code"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "250px",
                      }}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Scan this QR code to make payment via EasyPaisa
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor: "#f5f5f5",
                      p: 1,
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Account Number: 03218811400
                  </Typography>
                </CardContent>
              </Card>
            )}

            {tabValue === 2 && (
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#0A2744" }}
                  >
                    Bank Account Details
                  </Typography>
                  <Avatar
                    src={CRYSTALSOLUTION}
                    sx={{
                      width: 80,
                      height: 80,
                      margin: "0 auto 16px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Box
                    sx={{
                      textAlign: "left",
                      backgroundColor: "#f5f5f5",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ fontWeight: "500" }}
                    >
                      <strong>Bank Name:</strong> MEEZAN BANK ACCOUNT
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ fontWeight: "500" }}
                    >
                      <strong>Account Title:</strong> CRYSTAL SOLUTIONS
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ fontWeight: "500" }}
                    >
                      <strong>IBAN:</strong> PK32MEZN0002060109804512
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#0A2744",
                    mb: 3,
                  }}
                >
                  Payment Details
                </Typography>

                <TextField
                  fullWidth
                  label="Transaction ID/Number"
                  variant="outlined"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Customer Remarks (Optional)"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />

                <UploadButton
                  fullWidth
                  variant="contained"
                  startIcon={<ImageIcon />}
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Payment Receipt
                </UploadButton>

                {imagePreview && (
                  <PreviewImage
                    image={imagePreview}
                    title="Payment Receipt Preview"
                    component="img"
                  />
                )}

                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    mt: 1,
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  {selectedImage
                    ? `Selected file: ${selectedImage.name}`
                    : "Please upload a clear image of your payment receipt"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#0A2744",
            borderColor: "#0A2744",
            "&:hover": {
              borderColor: "#0A2744",
              backgroundColor: "rgba(10, 39, 68, 0.08)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#0A2744",
            "&:hover": {
              backgroundColor: "#0A1E33",
            },
          }}
        >
          Submit Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentOptions;
